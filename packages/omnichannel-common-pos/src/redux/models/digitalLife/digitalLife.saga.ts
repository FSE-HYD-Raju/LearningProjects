"use strict";

import * as qs from "querystring";
import { AppState } from "../../reducers";
import { get } from "lodash";
import { all, call, put, takeLatest, select } from "redux-saga/effects";
import PersonService from "../../services/PersonService";
import UsageService from "../../services/UsageService";
import { digitalLife, DigitalLifeActions, DigitalLifeActionPayload } from "./digitalLife.actions";
import { basket } from "../basket/basket.actions";
import { getActualProductUsageEvents, getPersonById, getAgreements, getOneTimeUsageEvents } from "./digitalLife.selectors";
import { user, UserActionPayload } from "../user/user.actions";
import {
	Agreement,
	Basket,
	BasketItem,
	BasketPaymentReceipt,
	Order,
	OrderItem,
	Shipment,
	UsageEvent,
} from "../../index";
import BasketService from "../../services/BasketService";
import { OrderStatusFilter, BasketLifecycleStatusEnum } from "../../types";
import { UsageEventCounterUtil } from "../../../utils/UsageEventCounterUtil";
import { getStoredCustomerModel, getUser } from "../user/user.selectors";
import actions, { b2cCheckout } from "../../actions";
import PhoneNumberService from "../../services/PhoneNumberService";
import ContactEmailService from "../../services/ContactEmailService";
import PostalAddressService from "../../services/PostalAddressService";

function* initAll(action: DigitalLifeActionPayload): Iterable<any> {
	try {
		yield put(digitalLife.updateInitQueryStatus(true));
		const personId = get(action.user, "id") as string;
		const response = yield call(() => {
			return PersonService.getPersons(personId, action.fields);
		});
		yield put(digitalLife.initAllComplete(response, action.user));
		const person = yield select(getPersonById(personId));
		if (person) {
			yield put(user.addPersonDataToUser(person.attributes));
			const state: AppState = yield select();
			if (!state.b2cCheckout.initiatedByLogin) {
				yield put(b2cCheckout.initializeUserInformation(getStoredCustomerModel(state) || {}, true));
			}
		}

		const basketSelectionEnabled = yield select((state: AppState): boolean => state.feature.enableBasketSelection);
		if (basketSelectionEnabled) {
			const individualId = get(action.user, "individualId") as string;
			yield put(basket.getUserBaskets(individualId));
		}
		yield put(actions.payment.getCustomerPaymentMethods(person.attributes.customerAccountId || (action.user && action.user.customerAccountId)));
		yield put(digitalLife.updateInitQueryStatus(false));
	} catch (e) {
		yield put(digitalLife.initAllFail(e));
		yield put(digitalLife.updateInitQueryStatus(false));
	}
}

class DigitalLifeYields {
	static onGetAgreements = function* (action: DigitalLifeActionPayload) {
		try {
			const { user } = action;
			if (!user) {
				console.error("Missing user parameter in DigitalLifeActions.GET_AGREEMENTS action");
				return;
			}
			const agreements = yield call(() => {
				return PersonService.getAgreements(user.id, action.filterArgs);
			});

			yield put(digitalLife.getAgreementsComplete(agreements, action.user));
		} catch (e) {
			yield put(digitalLife.getAgreementsFail(e));
		}
	};

	static onGetAgreementById = function* (action: DigitalLifeActionPayload) {
		try {
			const agreementId = action.agreementId as string;
			const agreement = yield call(() => {
				return PersonService.getAgreementById(agreementId);
			});

			yield put(digitalLife.getAgreementByIdComplete(agreement));
		} catch (e) {
			yield put(digitalLife.getAgreementByIdFail(e));
		}
	};

	static onGetTransactions = function* (action: DigitalLifeActionPayload) {
		try {
			const userId = action.userId as string;
			const agreementId = action.agreementId;
			const startDate = action.startDate as string;
			const endDate = action.endDate as string;
			const agreementIds: Array<string> = agreementId && [agreementId] ||
				(yield select(getAgreements())).map((a: Agreement) => a.id);
			const [ transactions, ...allUsageEvents ] = yield all([
				call(() => PersonService.getTransactions(userId, startDate, endDate)),
				...agreementIds.map((id: string) => call(() =>
					UsageService.getAgreementUsageEvents(id, startDate, endDate)
				))
			]);
			const oneTimeUsageEvents: Array<UsageEvent> = allUsageEvents.map(getOneTimeUsageEvents)
					.reduce((l: Array<UsageEvent>, r: Array<UsageEvent>) => [...l, ...r]);
			yield put(digitalLife.getTransactionsComplete(transactions, oneTimeUsageEvents));
		} catch (e) {
			yield put(digitalLife.getTransactionsFail(e));
		}
	};

	static onGetProductUsageCounters = function* (action: DigitalLifeActionPayload) {
		try {
			const { productId, startDate, endDate } = action as { productId: string; startDate: string; endDate: string };

			const usageCountersFromEvents = yield select(
				(state: AppState): boolean => state.consul.b2c_configuration.features.products.enable_usage_counters_from_events_calculation
			);
			if (!usageCountersFromEvents) {
				const counters = yield call(() => {
					return UsageService.getProductUsageCounters(productId, startDate, endDate);
				});
				yield put(digitalLife.getProductUsageCountersComplete(productId, counters));
			} else {
				yield put(digitalLife.getProductUsageCountersComplete(productId, undefined));
			}
		} catch (e) {
			yield put(digitalLife.getProductUsageCountersFail(e));
		}
	};

	static onGetAgreementUsageEvents = function* (action: DigitalLifeActionPayload) {
		try {
			const { agreementId, startDate, endDate } = action as { agreementId: string; startDate: string; endDate: string };
			const allUsageEvents = (yield call(() => {
				return UsageService.getAgreementUsageEvents(agreementId, startDate, endDate);
			})) as Array<UsageEvent>;
			const { usageEvents: filteredUsageEvents, usageCountersFromEvents } =
				yield select(getActualProductUsageEvents(allUsageEvents));
			const { usageEvents, usageEventCounters } =
				UsageEventCounterUtil.prepareResultingUsageEvents(filteredUsageEvents, usageCountersFromEvents);
			yield put(digitalLife.getAgreementUsageEventsComplete(agreementId, usageEvents, usageEventCounters));
		} catch (e) {
			yield put(digitalLife.getAgreementUsageEventsFail(e));
		}
	};

	static onGetPersonOrders = function* (action: DigitalLifeActionPayload) {
		try {
			const response: any = yield call(() => {
				return PersonService.getPersonOrders(action.personId!, action.queryParams);
			});

			const orders: Array<Order> = response.data;
			const includes: Array<any> = response.included;
			const orderItems: Array<OrderItem> = includes.filter(item => item.type === "orderItems");
			const shipments: Array<Shipment> = includes.filter(item => item.type === "shipments");
			const meta: any = response.meta;
			const orderFilters: Array<OrderStatusFilter> = meta.orderFilters || [];
			const paginationData = {
				first: meta.first && qs.parse(meta.first),
				next: meta.next && qs.parse(meta.next),
				prev: meta.prev && qs.parse(meta.prev),
				last: meta.last && qs.parse(meta.last),
				start: meta.start,
				end: meta.end,
				totalResourceCount: meta.totalResourceCount,
			};

			yield put(digitalLife.getPersonOrdersComplete({ orders, orderItems, orderFilters, paginationData, shipments }));
		} catch (e) {
			yield put(digitalLife.getPersonOrdersFail());
		}
	};

	static onGetBasketPaymentReceipts = function* (action: DigitalLifeActionPayload) {
		try {
			const basketId: string = action.basketId!;
			const basketPaymentReceipts: Array<BasketPaymentReceipt> = yield call(() => {
				return BasketService.getBasketPaymentReceipts(basketId);
			});

			yield put(digitalLife.getBasketPaymentReceiptsComplete({ [basketId]: basketPaymentReceipts }));
		} catch (e) {
			yield put(digitalLife.getBasketPaymentReceiptsFail());
		}
	};

	static onGetBaskets = function* (action: DigitalLifeActionPayload) {
		try {
			const userId: string = action.userId!;
			const response: any = yield call(() => {
				return PersonService.getBaskets(userId, [BasketLifecycleStatusEnum.OPEN, BasketLifecycleStatusEnum.COMMITTED], true, action.queryParams);
			});

			const baskets: Array<Basket> = response.data || [];
			const basketItems: Array<BasketItem> = response.included || [];

			yield put(digitalLife.getBasketsCompleted(baskets, basketItems));
		} catch (e) {
			yield put(digitalLife.getBasketsFail());
		}
	};

	static onUpdateContactPhone = function* (action: DigitalLifeActionPayload) {
		const { contactPhone, forceAddressUpdate } = action;
		if (!contactPhone || forceAddressUpdate === undefined) {
			window.console.error("Missing contactPhone in UserActionPayload");
			return;
		}
		const userId: string = action.userId!;
		try {
			const resp = yield call(PhoneNumberService.updateOrCreatePhoneNumber, {
				contactPhone,
				individualId: userId,
				forceAddressUpdate,
			});
			contactPhone.id = resp.id;
			yield put(actions.digitalLife.updatePhoneNumberComplete(contactPhone));
		} catch (e) {
			if (e.errorContainer) {
				yield put(actions.error.onPhoneNumberValidationError(e.errorContainer));
			}
		}
	};

	static onUpdateContactEmail = function* (action: DigitalLifeActionPayload) {
		const { contactEmail, forceAddressUpdate } = action;
		if (!contactEmail || forceAddressUpdate === undefined) {
			window.console.error("Missing contactEmail in UserActionPayload");
			return;
		}
		const userId: string = action.userId!;
		try {
			const resp = yield call(ContactEmailService.updateOrCreateContactEmail, {
				contactEmail,
				individualId: userId,
				forceAddressUpdate,
			});
			contactEmail.id = resp.id;
			yield put(actions.digitalLife.updateContactEmailComplete(contactEmail));
		} catch (e) {
			if (e.errorContainer) {
				yield put(actions.error.onContactEmailValidationError(e.errorContainer));
			}
		}
	};

	static onUpdatePostalAddress = function* (action: UserActionPayload) {
		const { postalAddress, forceAddressUpdate } = action;
		if (!postalAddress || forceAddressUpdate === undefined) {
			window.console.error("Missing postalAddress in UserActionPayload");
			return;
		}
		const user = yield select(getUser);
		if (!user) {
			return;
		}
		try {
			const resp = yield call(PostalAddressService.updateOrCreatePostalAddress, {
				postalAddress,
				individualId: user.id,
				forceAddressUpdate,
			});
			postalAddress.id = resp.id;
			yield put(actions.digitalLife.updatePostalAddressComplete(postalAddress));
			// TODO Will not work in multiple people mode
			yield put(actions.user.updatePostalAddressComplete(postalAddress));
		} catch (e) {
			if (e.errorContainer) {
				yield put(actions.error.onAddressValidationError(e.errorContainer));
			}
		}
	};
}

export function* digitalLifeSaga(): Iterable<any> {
	yield all([
		takeLatest(DigitalLifeActions.GET_PERSONS, initAll),
		takeLatest(DigitalLifeActions.GET_AGREEMENT, DigitalLifeYields.onGetAgreementById),
		takeLatest(DigitalLifeActions.GET_AGREEMENTS, DigitalLifeYields.onGetAgreements),
		takeLatest(DigitalLifeActions.GET_TRANSACTIONS, DigitalLifeYields.onGetTransactions),
		takeLatest(DigitalLifeActions.GET_PRODUCT_USAGE_COUNTERS, DigitalLifeYields.onGetProductUsageCounters),
		takeLatest(DigitalLifeActions.GET_AGREEMENT_USAGE_EVENTS, DigitalLifeYields.onGetAgreementUsageEvents),
		takeLatest(DigitalLifeActions.GET_PERSON_ORDERS, DigitalLifeYields.onGetPersonOrders),
		takeLatest(DigitalLifeActions.GET_BASKET_PAYMENT_RECEIPTS, DigitalLifeYields.onGetBasketPaymentReceipts),
		takeLatest(DigitalLifeActions.GET_BASKETS, DigitalLifeYields.onGetBaskets),
		takeLatest(DigitalLifeActions.UPDATE_PHONE_NUMBER, DigitalLifeYields.onUpdateContactPhone),
		takeLatest(DigitalLifeActions.UPDATE_CONTACT_EMAIL, DigitalLifeYields.onUpdateContactEmail),
		takeLatest(DigitalLifeActions.UPDATE_POSTAL_ADDRESS, DigitalLifeYields.onUpdatePostalAddress),
	]);
}

"use strict";

import { find, isEmpty, uniqBy } from "lodash";
import { DigitalLifeActionPayload, DigitalLifeActions } from "./digitalLife.actions";
import { DigitalLifeState } from "./digitalLife.types";
import {
	Agreement,
	ConsulValues,
	PersonsResponse,
	PostalAddress,
	User
} from "../../types";
import {
	extractValues,
	getBaskets,
	getOrders,
	mergeAgreements,
	readPersonData,
	sortAgreements,
	updateCharacteristicsForProduct,
	updateContactEmails,
	updatePersonOrderStatus,
	updatePhoneNumbers,
	filterExcludedProductsFromAgreements,
} from "./digitalLife.utils";
import { AuthActions } from "../../actions";
import SessionStorage, { SessionStorageKeysEnum } from "../../services/SessionStorage";

export { DigitalLifeState } from "./digitalLife.types";

const initialState: Partial<DigitalLifeState> = {
	agreements: [],
	baskets: [],
	basketPaymentReceipts: {},
	people: [],
	customerAccounts: [],
	usageDateRange: {
		startDate: null,
		endDate: null
	},
	usageCounters: {},
	personsOrderData: {
		orders: [],
		orderItems: [],
		orderFilters: [],
		paginationData: {
			start: 0,
			end: 10,
			totalResourceCount: 0
		},
		shipments: []
	},
	subscriptionPlanConfiguration: "",
	securitySettingsUrl: null,
	isBasketRefreshing: false,
};

// Returns object with fields to be cleaned out from state if auth token does not exist
const cleanupStateOnPageLoad = () => {
	return SessionStorage && !SessionStorage.getItem(SessionStorageKeysEnum.auth) && {
		data: {},
		agreements: [],
		baskets: [],
		personsOrderData: {},
		people: [],
		user: {},
	} || {};
};

const digitalLifeReducer = (state: Partial<DigitalLifeState> = initialState, action: DigitalLifeActionPayload) => {
	const { type } = action;
	if (type === DigitalLifeActions.FLUX_SYNC) {
		return { ...state, ...(action as DigitalLifeActionPayload).fluxState };
	} else if (type === DigitalLifeActions.CHANGE_MSISDN_REASONS) {
		const changeMsisdnReasons = action.reasons ? JSON.parse(action.reasons) : {};
		return { ...state, changeMsisdnReasons };
	} else if (type === DigitalLifeActions.SET_VALUES) {
		return {
			...state,
			...cleanupStateOnPageLoad(),
			...extractValues(action.values as ConsulValues),
		};
	} else if (type === DigitalLifeActions.GET_PERSONS_COMPLETE) {
		const data = readPersonData(action.resp as PersonsResponse, action.user as User);
		const includedAgreements = data.agreements ? data.agreements.map(fetchedItem) : [];
		const newAgreements = isEmpty(includedAgreements)
			? state.agreements
			: mergeAgreements(state.agreements as DigitalLifeState["agreements"], uniqBy(includedAgreements.concat(...(state.agreements as any)), "id"));
		return {
			...state,
			...data,
			agreements: filterExcludedProductsFromAgreements(newAgreements, state.productsExclusionConfiguration),
		};
	} else if (type === DigitalLifeActions.GET_AGREEMENTS) {
		return {
			...state,
			isBasketRefreshing: true,
		};
	} else if (type === DigitalLifeActions.GET_AGREEMENTS_COMPLETE) {
		const fetchedAgreements = filterFetched(state.agreements as DigitalLifeState["agreements"]);
		const allAgreements = mergeAgreements(fetchedAgreements, action.agreements);
		return {
			...state,
			isBasketRefreshing: false,
			agreements: sortAgreements(filterExcludedProductsFromAgreements(allAgreements, state.productsExclusionConfiguration)),
		};
	} else if (type === DigitalLifeActions.GET_AGREEMENTS_FAIL) {
		return {
			...state,
			isBasketRefreshing: false,
		};
	} else if (type === DigitalLifeActions.GET_AGREEMENT_COMPLETE) {
		const agreement = fetchedItem(action.agreement as Agreement);
		const agreements = (state.agreements as DigitalLifeState["agreements"]).slice();
		const exist = find(agreements, { id: agreement.id });
		const newAgreements = exist ?
			agreements.map(item => (item.id === agreement.id) ? agreement : item) :
			agreements.concat(agreement);
		return {
			...state,
			agreements: filterExcludedProductsFromAgreements(newAgreements, state.productsExclusionConfiguration),
		};
	} else if (type === DigitalLifeActions.GET_TRANSACTIONS_COMPLETE) {
		return {
			...state,
			transactionsEvents: action.transactionsEvents,
		};
	} else if (type === DigitalLifeActions.SET_USAGE_DATE_RANGE) {
		return {
			...state,
			usageDateRange: action.usageDateRange,
		};
	} else if (type === DigitalLifeActions.GET_PRODUCT_USAGE_COUNTERS_COMPLETE) {
		const productId = action.productId as string;
		const usageCounters = action.usageCounters ? { ...state.usageCounters, [productId]: action.usageCounters } : state.usageCounters;

		return {
			...state,
			usageCounters,
		};
	} else if (type === DigitalLifeActions.GET_AGREEMENT_USAGE_EVENTS_COMPLETE) {
		const agreementId = action.agreementId as string;
		const usageEvents = action.usageEvents ? Object.assign({}, state.usageEvents, { [agreementId]: action.usageEvents }) : state.usageEvents;

		const usageEventCounters = action.usageEventCounters
			? {
					...state.usageEventCounters,
					[agreementId]: action.usageEventCounters,
			  }
			: state.usageEventCounters;

		return {
			...state,
			usageEvents,
			usageEventCounters,
		};
	} else if (type === DigitalLifeActions.GET_PERSON_ORDERS) {
		return {
			...state,
			personsOrderData: {
				...state.personsOrderData,
				loadingOrders: true,
			},
		};
	} else if (type === DigitalLifeActions.GET_PERSON_ORDERS_COMPLETE) {
		const personsOrderData = action.personOrderData;
		if (!personsOrderData) {
			return state;
		}
		const { orders, orderItems } = personsOrderData;
		return {
			...state,
			personsOrderData: { ...personsOrderData, orders: getOrders(orders, orderItems), loadingOrders: false },
		};
	} else if (type === DigitalLifeActions.GET_PERSON_ORDERS_FAIL) {
		return {
			...state,
			personsOrderData: {
				...state.personsOrderData,
				orders: [],
				orderItems: [],
				paginationData: { start: 0, totalResourceCount: 0 },
				loadingOrders: false,
			},
		};
	} else if (type === DigitalLifeActions.GET_BASKET_PAYMENT_RECEIPTS_COMPLETE) {
		return {
			...state,
			basketPaymentReceipts: { ...state.basketPaymentReceipts, ...action.basketPaymentReceiptsRecord },
		};
	} else if (type === DigitalLifeActions.GET_BASKET_PAYMENT_RECEIPTS_FAIL) {
		return {
			...state,
			basketPaymentReceipts: {},
		};
	} else if (type === DigitalLifeActions.GET_BASKETS_COMPLETE) {
		return {
			...state,
			baskets: getBaskets(action.baskets!, action.basketItems!),
		};
	} else if (type === DigitalLifeActions.GET_BASKETS_FAIL) {
		return {
			...state,
			baskets: [],
		};
	} else if (type === DigitalLifeActions.UPDATE_POSTAL_ADDRESS_COMPLETE) {
		const { postalAddress } = action;
		if (!state.people || state.people.length === 0 || !postalAddress) {
			return state;
		}
		const oldPostalAddresses = state.people[0].attributes.postalAddresses || [];
		const oldPostalAddressesExceptUpdated = postalAddress.id
			? oldPostalAddresses.filter((address: PostalAddress) => address.id !== postalAddress.id)
			: oldPostalAddresses;
		const newPostalAddresses = [...oldPostalAddressesExceptUpdated, postalAddress];
		return {
			...state,
			people: [{ ...state.people[0], attributes: { ...state.people[0].attributes, postalAddresses: newPostalAddresses } }, ...state.people.slice(1)],
		};
	} else if (type === DigitalLifeActions.UPDATE_PHONE_NUMBER_COMPLETE) {
		const { contactPhone } = action;
		if (!state.people || !contactPhone) {
			return state;
		}
		let oldPhoneNumbers = (state.people && state.people[0].attributes.mobileNumbers) || [];
		oldPhoneNumbers = updatePhoneNumbers(oldPhoneNumbers, contactPhone);
		state.people[0] = { ...state.people[0], attributes: { ...state.people[0].attributes, mobileNumbers: oldPhoneNumbers } };
		return {
			...state,
			isPhoneNumberUpdated: true,
		};
	} else if (type === DigitalLifeActions.UPDATE_CONTACT_EMAIL_COMPLETE) {
		const { contactEmail } = action;
		if (!state.people || !contactEmail) {
			return state;
		}
		const oldContactEmail = (state.people && state.people[0].attributes.emails) || [];
		const newContactEmail = updateContactEmails(oldContactEmail, contactEmail);
		state.people[0] = { ...state.people[0], attributes: { ...state.people[0].attributes, emails: newContactEmail } };
		return {
			...state,
			isContactEmailUpdated: true,
		};
	} else if (type === DigitalLifeActions.UPDATE_CHARACTERISTICS_FOR_PRODUCT) {
		const { agreementId, productId, newCharacteristics } = action;
		const agreements = state.agreements as DigitalLifeState["agreements"];

		let agreementToUpdate = agreements.find(agreement => agreement.id === agreementId);

		if (agreementToUpdate && productId && newCharacteristics) {
			agreementToUpdate = updateCharacteristicsForProduct(agreementToUpdate, productId, newCharacteristics);
		}

		return {
			...state,
			agreements: agreementToUpdate ? agreements.map(item => (item.id === agreementToUpdate!.id ? agreementToUpdate : item)) : agreements,
		};
	} else if (type === DigitalLifeActions.UPDATE_INIT_QUERY_STATUS) {
		const { status } = action;
		return {
			...state,
			initQueryActive: status,
		};
	} else if (type === AuthActions.POST_LOGIN_CLEANUP) {
		return {
			...state,
			data: {},
			agreements: [],
			baskets: [],
			personsOrderData: {},
			people: [],
			user: {},
		};
	} else if (type === DigitalLifeActions.UPDATE_PERSON_ORDER_STATUS) {
		const personsOrderData = updatePersonOrderStatus(state.personsOrderData!, action.orderCancel);
		if (personsOrderData) {
			return {...state, personsOrderData};
		} else {
			return state;
		}
	} else {
		return state;
	}
};

export default digitalLifeReducer;
export { initialState as digitalLifeInitialState };

function fetchedItem<T>(item: T): T & { __fetched: boolean } {
	return Object.assign(item, { __fetched: true });
}

function filterFetched<T>(items: Array<T & { __fetched?: boolean }>): Array<T> {
	return items.filter(item => item.__fetched);
}

function rejectFetched<T>(items: Array<T & { __fetched?: boolean }>): Array<T> {
	return items.filter(item => !item.__fetched);
}

"use strict";

import { chain, find, flatten, get } from "lodash";
import * as moment from "moment";
import { AppState } from "../../reducers";
import {
	Agreement,
	AgreementLifecycleStatusEnum,
	Basket,
	CustomerPaymentMethod,
	EventType,
	FeatureIdentifierType,
	Order,
	Person,
	Product,
	ProductLifecycleStatus,
	RecurringTopUpCharacteristicsValue,
	RecurringTopUpModelType,
	RecurringTopUpProductType,
	SpecSubTypeEnum,
	SpecTypeEnum,
	TransactionItem,
	TransactionItemAttributes,
	TransactionItemEventDetails,
	UsageEvent,
} from "../../types";
import ProductUtil from "../../../utils/product/ProductUtil";
import PaymentUtil from "../../../utils/PaymentUtil";
import { Selectors } from "../../index";

export interface Characteristic {
	type?: string;
	thresholdValue?: string;
	amount?: string;
	monthlyLimit?: string;
	interval?: string;
	intervalCount?: string;
}

const DEFAULT_KEY = "CH_TopUp_Type";
const DEFAULT_VALUES = ["Threshold", "Time", "Smart"];
const LEGACY_REFERENCE_CUSTOMER_ID = "CH_Legacy_Reference_CustomerId";

const getPersonById = (personId: string) => {
	return (state: AppState): Person | void => {
		return find(state.digitalLife.people, { id: personId });
	};
};

const getRecurringTopUpValueFromCharacteristics = (
	characteristicAliases: RecurringTopUpCharacteristicsValue,
	productCharacteristics: Record<string, string>
): RecurringTopUpCharacteristicsValue => {
	const recurringTopUpCharacteristicsValue: RecurringTopUpCharacteristicsValue = {};
	if (characteristicAliases) {
		Object.keys(characteristicAliases).forEach((key: string) => {
			const characteristicsKey = characteristicAliases[key as keyof RecurringTopUpCharacteristicsValue];
			if (characteristicsKey && characteristicsKey in productCharacteristics) {
				recurringTopUpCharacteristicsValue[key as keyof RecurringTopUpCharacteristicsValue] = productCharacteristics[characteristicsKey];
			}
		});
	}
	return recurringTopUpCharacteristicsValue;
};

const getRecurringTopUpProducts = (
	state: AppState,
	agreement: Agreement,
	ecareRecurringTopUpsIdentifier?: FeatureIdentifierType,
	recurringTopUpsAliases?: Record<string, string>
): Array<RecurringTopUpProductType> => {
	const product: Product | undefined = ProductUtil.getSubscriptionFromAgreement(agreement);
	const key = (ecareRecurringTopUpsIdentifier && ecareRecurringTopUpsIdentifier.key) || DEFAULT_KEY;
	const values = (ecareRecurringTopUpsIdentifier && ecareRecurringTopUpsIdentifier.values) || DEFAULT_VALUES;
	const topUps: Array<Product> = ProductUtil.getProductFromAgreementByCharacteristicKey({
		agreement,
		characteristicKey: key,
		characteristicValues: values,
		productLifecycleStatus: ProductLifecycleStatus.ACTIVE,
	});
	return topUps.map(
		(topUpProduct: Product): RecurringTopUpProductType => {
			const characteristicsValue = getRecurringTopUpValueFromCharacteristics(recurringTopUpsAliases || {}, topUpProduct.characteristics);
			return {
				characteristicsValue,
				subscription: ProductUtil.getPhoneNumber(product),
				agreementId: topUpProduct.agreementId,
				productId: topUpProduct.id,
				productOfferingId: topUpProduct.productOfferingId,
				paymentMethod: getPaymentMethodById(characteristicsValue.customerPaymentMethod)(state),
			};
		}
	);
};
const getRecurringTopUpModelForAdd = (state: AppState): RecurringTopUpModelType => {
	const customerPaymentMethods = Selectors.digitalLife.getActiveCustomerPaymentMethods(state);
	const allowUsingNewCreditCard = state.digitalLife.allowUsingNewCreditCardForRecurringTopUp;
	const paymentMethod = customerPaymentMethods.length > 0 ? customerPaymentMethods[0].id : allowUsingNewCreditCard ? "use-new-card" : undefined;
	const phoneNumbers = ProductUtil.getPhoneNumbers(state.digitalLife.agreements);
	const subscription = phoneNumbers[0];
	// NOTE: take this from catalog
	const { ecareThresholdValues, ecareThresholdTopUpValues, ecareLimitInMonthValues, ecareWeeklyTopUpValues, ecareMonthlyTopUpValues } = state.feature;
	const thresholdValue = ecareThresholdValues && ecareThresholdValues[0];
	const limitInMonth = ecareLimitInMonthValues && ecareLimitInMonthValues[0];
	const topUpAmount = ecareThresholdTopUpValues && ecareThresholdTopUpValues[0];
	const topUpAmountWeekly = ecareWeeklyTopUpValues && ecareWeeklyTopUpValues[0];
	const topUpAmountMonthly = ecareMonthlyTopUpValues && ecareMonthlyTopUpValues[0];

	return {
		subscription,
		paymentMethod,
		thresholdValue,
		topUpAmount,
		limitInMonth,
		topUpAmountWeekly,
		topUpAmountMonthly
	};
};

const getPaymentMethodById = (paymentMethodId?: string): ((state: AppState) => CustomerPaymentMethod | undefined) => {
	return (state: AppState) => {
		if (!paymentMethodId) {
			return;
		}
		return PaymentUtil.getActiveCustomerPaymentMethods(state.payment.customerPaymentMethods)
			.find((paymentMethod: CustomerPaymentMethod) => paymentMethod.id === paymentMethodId);
	};
};

const getAgreementById = (agreementId: string): ((state: AppState) => Agreement | undefined) => {
	return (state: AppState) => {
		return state.digitalLife.agreements.find((agreement: Agreement) => agreement.id === agreementId);
	};
};

const getOrderByOrderId = (orderId: string): ((state: AppState) => Order | undefined) => {
	return (state: AppState) => {
		return state.digitalLife.personsOrderData.orders.find((order: Order) => order.id === orderId);
	};
};

const getBasketIdByOrderId = (orderId: string): ((state: AppState) => string | undefined) => {
	return (state: AppState) => {
		const currentOrder: Order | undefined = getOrderByOrderId(orderId)(state);
		return get(currentOrder, "relationships.basket.data.id");
	};
};

const getBaskets = (state: AppState): Basket[] => {
	const { hideBasketAfterXHours } = state.feature;
	return state.digitalLife.baskets.filter(item => {
		if (hideBasketAfterXHours && item.attributes.expiresAt) {
			return moment(item.attributes.expiresAt).isAfter();
		} if (hideBasketAfterXHours && item.attributes.modified) {
			return  moment(item.attributes.modified).add(hideBasketAfterXHours, "hours").isAfter();
		} else if (hideBasketAfterXHours) {
			return  moment(item.attributes.createdAt).add(hideBasketAfterXHours, "hours").isAfter();
		}
		return true;
	});
};

const getProductByAgreementIdProductId = (agreementId: string, productId: string): ((state: AppState) => Product | undefined) => {
	return (state: AppState) => {
		return chain(state)
			.thru(getAgreementById(agreementId))
			.get("attributes.products", [])
			.find((product: Product) => product.id === productId)
			.value();
	};
};

const getAgreementsByStatus = (status: AgreementLifecycleStatusEnum) => {
	return (state: AppState): Array<Agreement> => {
		return state.digitalLife.agreements.filter((agreement: Agreement) => agreement.attributes.lifeCycleStatus === status);
	};
};

const getAgreements = () => {
	return (state: AppState): Array<Agreement> => {
		return state.digitalLife.agreements;
	};
};

const hasCategory = (categoriesIds: Array<string>, addonsCategoriesIds: string[]): boolean => {
	return categoriesIds && addonsCategoriesIds.length > 0 && addonsCategoriesIds.every(elem => categoriesIds.indexOf(elem) > -1);
};
const getProductAndChildItems = (product: Product): Product[] => {
	return [product, ...flatten((product.childProducts || []).map(getProductAndChildItems))];
};
const isAddon = (childProducts: Array<Product>, state: AppState): Product[] => {
	const loanCategoryId = state.feature.ecareProductLoan && state.feature.ecareProductLoan.loanCategoryId;
	const addonsCategoriesIds = state.sales.addonsCategoryIds || [];

	return childProducts.filter(childProduct => {
		const categoriesIds = childProduct.categoriesIds;
		return (
			childProduct.lifeCycleStatus === ProductLifecycleStatus.ACTIVE &&
			childProduct.specType === SpecTypeEnum.PRODUCT &&
			(hasCategory(categoriesIds, addonsCategoriesIds) || childProduct.specSubType === SpecSubTypeEnum.ADDITIONAL) &&
			!(loanCategoryId && Selectors.productLoan.isProductLoan(childProduct, loanCategoryId))
		);
	});
};

const getActiveAddons = (subscription: Product, state: AppState): Product[] => {
	return (subscription && subscription.childProducts && isAddon(flatten(subscription.childProducts.map(getProductAndChildItems)), state)) || [];
};

const isSingleSubscriptionNavigationModeActive = (state: AppState): boolean => {
	return state.feature.singleSubscriptionNavigationActive ? state.digitalLife.agreements && state.digitalLife.agreements.length > 0 : false;
};

const getLegacyUserId = (state: AppState): string | undefined => {
	const { agreements, subscriptionPlanConfiguration } = state.digitalLife;
	let legacyUserId;
	agreements.map((agreement: Agreement) => {
		const product = ProductUtil.getSubscriptionFromAgreement(agreement, subscriptionPlanConfiguration);
		if (product && product.characteristics[LEGACY_REFERENCE_CUSTOMER_ID]) {
			legacyUserId = product.characteristics[LEGACY_REFERENCE_CUSTOMER_ID];
		}
	});
	return legacyUserId;
};

const isSingleUser = (state: AppState): boolean => {
	return state.digitalLife.people ? state.digitalLife.people.length === 1 : false;
};

const getActiveCustomerPaymentMethods = (state: AppState): CustomerPaymentMethod[] => {
	return PaymentUtil.getActiveCustomerPaymentMethods(state.payment.customerPaymentMethods);
};

const getActualProductUsageEvents = (allUsageEvents: Array<UsageEvent>) => {
	return (state: AppState): { usageEvents: Array<UsageEvent>; usageCountersFromEvents: boolean } => {
		const usageCountersFromEvents = state.consul.b2c_configuration.features.products.enable_usage_counters_from_events_calculation;
		const productUsageEventTypeExcludes = state.feature.productUsageEventTypeExcludes;
		const usageEvents = allUsageEvents.filter(ue => (
			!productUsageEventTypeExcludes.includes(ue.attributes && ue.attributes.eventType || "")
		));
		return {
			usageEvents,
			usageCountersFromEvents
		};
	};
};

const getOneTimeUsageEvents = (allUsageEvents: Array<UsageEvent>) =>
	allUsageEvents.filter(ue => ue.attributes && ue.attributes.eventType === EventType.ONE_TIME);

const getTransactionsEvents = (state: AppState): Array<TransactionItem> => {
	if (!state.digitalLife.transactionsEvents) {
		return [];
	}
	const { transactions, oneTimeUsageEvents } = state.digitalLife.transactionsEvents;

	if (oneTimeUsageEvents.length === 0) {
		return transactions;
	}

	const oneTimeTransactions: Array<TransactionItem> = [];

	oneTimeUsageEvents.forEach((ue: UsageEvent, idx: number) => {
		const agreement =
			state.digitalLife.agreements.find((a: Agreement) => a.id === (ue.attributes && ue.attributes.eventDetails.agreementId));

		const msisdns = agreement && ProductUtil.getPhoneNumbers([agreement]);

		if (msisdns && msisdns.length > 0 && ue.attributes) {
			const taxIncludedAmount = ue.attributes.amount && ue.attributes.amount.taxIncludedAmount
				&& -Math.abs(ue.attributes.amount.taxIncludedAmount);
			const taxFreeAmount = ue.attributes.amount && ue.attributes.amount.taxFreeAmount
				&& -Math.abs(ue.attributes.amount.taxFreeAmount);
			const eventDetails: Partial<TransactionItemEventDetails> = {
				amount: {
					currency: ue.attributes.amount && ue.attributes.amount.currency,
					taxIncludedAmount: taxIncludedAmount,
					taxFreeAmount: taxFreeAmount,
				},
			};
			const attributes: Partial<TransactionItemAttributes> = {
				time: ue.attributes.createdAt || "",
				type: ue.attributes.eventDetails.externalChargeType || "one-time",
				msisdn: msisdns[0] || "",
				"event-details": eventDetails as TransactionItemEventDetails,
			};
			const item: Partial<TransactionItem> = {
				attributes: attributes as TransactionItemAttributes,
			};
			oneTimeTransactions.push(item as TransactionItem);
		}
	});

	return [...transactions, ...oneTimeTransactions].sort((l: TransactionItem, r: TransactionItem) => {
		const timeL = moment(l.attributes.time);
		const timeR = moment(r.attributes.time);
		return -(timeL.isAfter(timeR) ? 1 :
			timeL.isBefore(timeR) ? -1 : 0);
	});
};

export {
	getPersonById,
	getAgreementById,
	getOrderByOrderId,
	getBasketIdByOrderId,
	getProductByAgreementIdProductId,
	getAgreementsByStatus,
	getAgreements,
	getActiveAddons,
	getLegacyUserId,
	isSingleSubscriptionNavigationModeActive,
	isSingleUser,
	getRecurringTopUpProducts,
	getPaymentMethodById,
	getActiveCustomerPaymentMethods,
	getRecurringTopUpModelForAdd,
	getActualProductUsageEvents,
	getOneTimeUsageEvents,
	getTransactionsEvents,
	getBaskets,
};

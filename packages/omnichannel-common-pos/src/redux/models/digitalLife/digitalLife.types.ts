"use strict";

import {
	Agreement,
	CustomerInteraction,
	ChangeResourceInitialization,
	Msisdn,
	Person,
	ProductOffering,
	Reason,
	Basket,
	BasketPaymentReceipt,
	PersonsOrderData,
	PersonsOrderState,
	User,
	SpecSubType,
	UsageCounters,
	ValidityPeriod,
	CustomerAccount,
	ChargingBalanceChanges,
	UsageEvent,
	UsageEventCounter,
} from "../../types";

type TopUpPaymentMethodsFilter = {
	type: string;
	matchTo: Array<{
		attributes: {
			type: string;
		};
	}>;
};

type TransactionItemEventDetails = {
	chargingBalanceChanges: ChargingBalanceChanges | null;
	channel: string | null;
	amount: {
		currency?: string;
		taxIncludedAmount?: number;
		taxFreeAmount?: number;
	};
};

type TransactionItemAttributes = {
	characteristics: null;
	balance: number | null;
	chargingBalanceChange: string | null;
	unitOfMeasure: string | null;
	time: string;
	type: string;
	msisdn: string;
	subscriptionName?: string;
	"agreement-id": string;
	"event-details"?: TransactionItemEventDetails;
};

type TransactionItem = {
	id: string;
	type: "transaction-events";
	attributes: TransactionItemAttributes;
};

type PresentationConfiguration = {
	specSubType: string;
	keys: Array<string>;
};

type ProductsExclusionConfiguration = {
	specSubTypes?: Array<SpecSubType>;
	categoriesIds?: Array<string>;
};

type DigitalLifeState = {
	user?: User;
	people?: Array<Person>;
	agreements: Array<Agreement>;
	baskets: Array<Basket>;
	basketPaymentReceipts: Record<string, Array<BasketPaymentReceipt>>;
	customerInteractions: Array<CustomerInteraction>;
	customerAccounts?: Array<CustomerAccount>;
	securitySettingsUrl?: string | null;
	personsOrderData: PersonsOrderData;
	personsOrderState: PersonsOrderState;
	changeMsisdnReasons: Array<Reason>;
	topUpPaymentMethodsFilters?: TopUpPaymentMethodsFilter;
	allowUsingNewCreditCardForOneTimeTopUp: boolean;
	allowUsingNewCreditCardForRecurringTopUp: boolean;
	agreementOverviewPresentationConfiguration?: Array<SpecSubType>;
	accessoryDetailsPresentationConfiguration?: Array<PresentationConfiguration>;
	deviceDetailsPresentationConfiguration?: Array<string>;
	detailSpecificationsVisibilityToggle?: Array<string>;
	subscriptionPlanConfiguration: string;
	initializedMsisdnChange?: ChangeResourceInitialization;
	numberClasses: Array<ProductOffering>;
	msisdns: Array<Msisdn>;
	transactionsEvents?: {
		transactions: Array<TransactionItem>;
		oneTimeUsageEvents: Array<UsageEvent>;
	};
	usageDateRange?: ValidityPeriod;
	usageCounters: Record<string, Array<UsageCounters>>;
	usageEvents?: Record<string, Array<UsageEvent>>;
	isPhoneNumberUpdated: boolean;
	isContactEmailUpdated: boolean;
	usageEventCounters?: Record<string, Array<UsageEventCounter>>;
	productsExclusionConfiguration?: ProductsExclusionConfiguration;
	initQueryActive: boolean;
	isBasketRefreshing: boolean;
};

export {
	DigitalLifeState,
	TopUpPaymentMethodsFilter,
	TransactionItem,
	TransactionItemAttributes,
	TransactionItemEventDetails,
	PresentationConfiguration,
	ProductsExclusionConfiguration,
};

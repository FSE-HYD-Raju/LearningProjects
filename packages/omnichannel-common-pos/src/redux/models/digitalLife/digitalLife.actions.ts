"use strict";

import { Action } from "redux";
import {
	ConsulValues,
	Person,
	PersonsResponse,
	Agreement,
	PersonsOrderData,
	BasketPaymentReceipt,
	Basket,
	BasketItem,
	PhoneNumber,
	EmailAddress,
	PostalAddress,
	OrderCancel,
	UsageEvent,
	TransactionItem
} from "../../types";
import { QueryParams } from "../../services/Rest";
import { AuthActions } from "../../actions";

enum DigitalLifeActions {
	FLUX_SYNC = "DigitalLife_FLUX_SYNC",
	SET_VALUES = "DigitalLife_SET_VALUES",
	CHANGE_MSISDN_REASONS = "DigitalLife_CHANGE_MSISDN_REASONS",

	GET_AGREEMENTS = "DigitalLife_GET_AGREEMENTS",
	GET_AGREEMENTS_COMPLETE = "DigitalLife_GET_AGREEMENTS_COMPLETE",
	GET_AGREEMENTS_FAIL = "DigitalLife_GET_AGREEMENTS_FAIL",

	GET_AGREEMENT = "DigitalLife_GET_AGREEMENT",
	GET_AGREEMENT_COMPLETE = "DigitalLife_GET_AGREEMENT_COMPLETE",
	GET_AGREEMENT_FAIL = "DigitalLife_GET_AGREEMENT_FAIL",

	GET_PERSONS = "DigitalLife_GET_PERSONS",
	GET_PERSONS_COMPLETE = "DigitalLife_GET_PERSONS_COMPLETE",
	GET_PERSONS_FAIL = "DigitalLife_GET_PERSONS_FAIL",

	GET_TRANSACTIONS = "DigitalLife_GET_TRANSACTIONS",
	GET_TRANSACTIONS_COMPLETE = "DigitalLife_GET_TRANSACTIONS_COMPLETE",
	GET_TRANSACTIONS_FAIL = "DigitalLife_GET_TRANSACTIONS_FAIL",

	SET_USAGE_DATE_RANGE = "DigitalLife_SET_USAGE_DATE_RANGE",
	GET_PRODUCT_USAGE_COUNTERS = "DigitalLife_GET_PRODUCT_USAGE_COUNTERS",
	GET_PRODUCT_USAGE_COUNTERS_COMPLETE = "DigitalLife_GET_PRODUCT_USAGE_COUNTERS_COMPLETE",
	GET_PRODUCT_USAGE_COUNTERS_FAIL = "DigitalLife_GET_PRODUCT_USAGE_COUNTERS_FAIL",

	GET_AGREEMENT_USAGE_EVENTS = "DigitalLife_GET_AGREEMENT_USAGE_EVENTS",
	GET_AGREEMENT_USAGE_EVENTS_COMPLETE = "DigitalLife_GET_AGREEMENT_USAGE_EVENTS_COMPLETE",
	GET_AGREEMENT_USAGE_EVENTS_FAIL = "DigitalLife_GET_AGREEMENT_USAGE_EVENTS_FAIL",

	GET_PERSON_ORDERS = "DigitalLife_GET_PERSON_ORDERS",
	GET_PERSON_ORDERS_COMPLETE = "DigitalLife_GET_PERSON_ORDERS_COMPLETE",
	GET_PERSON_ORDERS_FAIL = "DigitalLife_GET_PERSON_ORDERS_FAIL",

	GET_BASKET_PAYMENT_RECEIPTS = "DigitalLife_GET_BASKET_PAYMENT_RECEIPTS",
	GET_BASKET_PAYMENT_RECEIPTS_COMPLETE = "DigitalLife_GET_BASKET_PAYMENT_RECEIPTS_COMPLETE",
	GET_BASKET_PAYMENT_RECEIPTS_FAIL = "DigitalLife_GET_BASKET_PAYMENT_RECEIPTS_FAIL",

	GET_BASKETS = "DigitalLife_GET_BASKETS",
	GET_BASKETS_COMPLETE = "DigitalLife_GET_BASKETS_COMPLETE",
	GET_BASKETS_FAIL = "DigitalLife_GET_BASKETS_FAIL",

	UPDATE_POSTAL_ADDRESS = "User_UPDATE_POSTAL_ADDRESS",
	UPDATE_POSTAL_ADDRESS_COMPLETE = "User_UPDATE_POSTAL_ADDRESS_COMPLETE",
	UPDATE_PHONE_NUMBER = "User_UPDATE_PHONE_NUMBER",
	UPDATE_PHONE_NUMBER_COMPLETE = "User_UPDATE_PHONE_NUMBER_COMPLETE",
	UPDATE_CONTACT_EMAIL = "User_UPDATE_CONTACT_EMAIL",
	UPDATE_CONTACT_EMAIL_COMPLETE = "User_UPDATE_CONTACT_EMAIL_COMPLETE",
	UPDATE_CHARACTERISTICS_FOR_PRODUCT = "User_UPDATE_CHARACTERISTICS_FOR_PRODUCT",
	UPDATE_INIT_QUERY_STATUS = "DigitalLife_UPDATE_INIT_QUERY_STATUS",
	UPDATE_PERSON_ORDER_STATUS = "DigitalLife_UPDATE_PERSON_ORDER_STATUS",
}

interface DigitalLifeActionPayload extends Action<DigitalLifeActions | AuthActions> {
	fluxState?: any;
	reasons?: any;
	values?: ConsulValues;
	user?: Person;
	fields?: Array<string>;
	filterArgs?: string;
	resp?: PersonsResponse;
	agreements?: any;
	agreementId?: string;
	agreement?: Agreement;
	userId?: string;
	productId?: string;
	startDate?: string;
	endDate?: string;
	transactionsEvents?: {
		transactions: Array<TransactionItem>;
		oneTimeUsageEvents: Array<UsageEvent>;
	};
	usageDateRange?: { startDate: string; endDate: string };
	usageCounters?: any;
	usageEvents?: Array<any>;
	usageEventCounters?: any;
	error?: string;
	personId?: string;
	queryParams?: QueryParams;
	personOrderData?: PersonsOrderData;
	basketId?: string;
	basketPaymentReceiptsRecord?: Record<string, Array<BasketPaymentReceipt>>;
	baskets?: Array<Basket>;
	contactPhone?: PhoneNumber;
	contactEmail?: EmailAddress;
	forceAddressUpdate?: boolean;
	basketItems?: Array<BasketItem>;
	postalAddress?: PostalAddress;
	newCharacteristics?: Object;
	status?: boolean;
	orderCancel?: OrderCancel;
}

const digitalLife = {
	fluxSync: (fluxState: any) => ({ type: DigitalLifeActions.FLUX_SYNC, fluxState }),

	setValues: (values: any) => ({ type: DigitalLifeActions.SET_VALUES, values }),
	changeMsisdnReasons: (reasons: any) => ({ type: DigitalLifeActions.CHANGE_MSISDN_REASONS, reasons }),

	initAll: (user: Person, fields?: Array<string>) => ({ type: DigitalLifeActions.GET_PERSONS, user, fields }),
	initAllComplete: (resp: PersonsResponse, user?: Person) => ({ type: DigitalLifeActions.GET_PERSONS_COMPLETE, resp, user }),
	initAllFail: (error: any) => ({ type: DigitalLifeActions.GET_PERSONS_FAIL, error }),

	getAgreements: (user: Person, filterArgs?: string) => ({ type: DigitalLifeActions.GET_AGREEMENTS, user, filterArgs }),
	getAgreementsComplete: (agreements: any, user?: Person) => ({ type: DigitalLifeActions.GET_AGREEMENTS_COMPLETE, agreements, user }),
	getAgreementsFail: (error: any) => ({ type: DigitalLifeActions.GET_AGREEMENTS_FAIL, error }),

	getAgreementById: (agreementId: string) => ({ type: DigitalLifeActions.GET_AGREEMENT, agreementId }),
	getAgreementByIdComplete: (agreement: Agreement) => ({ type: DigitalLifeActions.GET_AGREEMENT_COMPLETE, agreement }),
	getAgreementByIdFail: (error: any) => ({ type: DigitalLifeActions.GET_AGREEMENT_FAIL, error }),

	getTransactions: (userId: string, startDate: string, endDate: string, agreementId?: string|null) =>
		({ type: DigitalLifeActions.GET_TRANSACTIONS, userId, agreementId, startDate, endDate }),
	getTransactionsComplete: (transactions: Array<TransactionItem>, oneTimeUsageEvents: Array<UsageEvent>) =>
		({ type: DigitalLifeActions.GET_TRANSACTIONS_COMPLETE, transactionsEvents: { transactions, oneTimeUsageEvents }}),
	getTransactionsFail: (error: any) => ({ type: DigitalLifeActions.GET_TRANSACTIONS_FAIL, error }),

	setUsageDateRange: (usageDateRange: DigitalLifeActionPayload["usageDateRange"]) => ({
		type: DigitalLifeActions.SET_USAGE_DATE_RANGE,
		usageDateRange
	}),

	getProductUsageCounters: (productId: string, startDate: string, endDate: string) => ({
		type: DigitalLifeActions.GET_PRODUCT_USAGE_COUNTERS,
		productId,
		startDate,
		endDate
	}),
	getProductUsageCountersComplete: (productId: string, usageCounters: any) => ({
		type: DigitalLifeActions.GET_PRODUCT_USAGE_COUNTERS_COMPLETE,
		productId,
		usageCounters
	}),
	getProductUsageCountersFail: (error: any) => ({ type: DigitalLifeActions.GET_PRODUCT_USAGE_COUNTERS_COMPLETE, error }),

	getAgreementUsageEvents: (agreementId: string, startDate: string, endDate: string) => ({
		type: DigitalLifeActions.GET_AGREEMENT_USAGE_EVENTS,
		agreementId,
		startDate,
		endDate
	}),
	getAgreementUsageEventsComplete: (agreementId: string, usageEvents: any, usageEventCounters: any) => ({
		type: DigitalLifeActions.GET_AGREEMENT_USAGE_EVENTS_COMPLETE,
		agreementId,
		usageEvents,
		usageEventCounters
	}),
	getAgreementUsageEventsFail: (error: any) => ({ type: DigitalLifeActions.GET_AGREEMENT_USAGE_EVENTS_FAIL, error }),

	getPersonOrders: (personId: string, queryParams: QueryParams) => ({
		type: DigitalLifeActions.GET_PERSON_ORDERS,
		personId,
		queryParams
	}),
	getPersonOrdersComplete: (data: PersonsOrderData) => ({
		type: DigitalLifeActions.GET_PERSON_ORDERS_COMPLETE,
		personOrderData: data
	}),
	getPersonOrdersFail: () => ({ type: DigitalLifeActions.GET_PERSON_ORDERS_FAIL }),
	updatePersonOrderStatus: (orderCancel: OrderCancel) => ({type: DigitalLifeActions.UPDATE_PERSON_ORDER_STATUS, orderCancel}),

	getBasketPaymentReceipts: (basketId: string) => ({ type: DigitalLifeActions.GET_BASKET_PAYMENT_RECEIPTS, basketId }),
	getBasketPaymentReceiptsComplete: (basketPaymentReceiptsRecord: Record<string, Array<BasketPaymentReceipt>>) => ({
		type: DigitalLifeActions.GET_BASKET_PAYMENT_RECEIPTS_COMPLETE,
		basketPaymentReceiptsRecord
	}),
	getBasketPaymentReceiptsFail: () => ({
		type: DigitalLifeActions.GET_BASKET_PAYMENT_RECEIPTS_FAIL
	}),

	getBaskets: (userId: string, queryParams?: QueryParams) => ({ type: DigitalLifeActions.GET_BASKETS, userId, queryParams }),
	getBasketsCompleted: (baskets: Array<Basket>, basketItems: Array<BasketItem>) => ({
		type: DigitalLifeActions.GET_BASKETS_COMPLETE,
		baskets,
		basketItems
	}),
	updatePhoneNumber: (contactPhone: PhoneNumber, forceAddressUpdate: boolean) => ({
		type: DigitalLifeActions.UPDATE_PHONE_NUMBER,
		contactPhone,
		forceAddressUpdate
	}),
	updatePhoneNumberComplete: (contactPhone: PhoneNumber) => ({
		type: DigitalLifeActions.UPDATE_PHONE_NUMBER_COMPLETE,
		contactPhone
	}),
	updateContactEmail: (contactEmail: EmailAddress, forceAddressUpdate: boolean) => ({
		type: DigitalLifeActions.UPDATE_CONTACT_EMAIL,
		contactEmail,
		forceAddressUpdate
	}),
	updateContactEmailComplete: (contactEmail: EmailAddress) => ({
		type: DigitalLifeActions.UPDATE_CONTACT_EMAIL_COMPLETE,
		contactEmail
	}),
	updatePostalAddress: (postalAddress: PostalAddress, forceAddressUpdate: boolean) => ({
		type: DigitalLifeActions.UPDATE_POSTAL_ADDRESS,
		postalAddress,
		forceAddressUpdate
	}),
	updatePostalAddressComplete: (postalAddress: PostalAddress) => ({
		type: DigitalLifeActions.UPDATE_POSTAL_ADDRESS_COMPLETE,
		postalAddress
	}),
	getBasketsFail: () => ({ type: DigitalLifeActions.GET_BASKETS_FAIL }),
	updateCharacteristicsForProduct: (agreementId: string, productId: string, newCharacteristics: Object) => ({
		type: DigitalLifeActions.UPDATE_CHARACTERISTICS_FOR_PRODUCT,
		agreementId,
		productId,
		newCharacteristics
	}),
	updateInitQueryStatus: (status: boolean) => ({
		type: DigitalLifeActions.UPDATE_INIT_QUERY_STATUS,
		status
	}),
};

export { DigitalLifeActions, DigitalLifeActionPayload, digitalLife };

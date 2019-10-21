/* eslint no-undef: 0 */
declare type BillType = {
	id: string,
	attributes: {
		amount: number,
		due: string,
		status: string
	}
};

declare type DigitalLifePaymentMethod = {
	id: string,
	name: string,
	type: string,
	number: string,
	lastUsed: string
};

declare type Place = {
	attributes?: { type: string, postalAddress: AddressType }
};

declare type DigitalLifeStoreType = {
	user: { id: string },
	people: [],
	agreements: [],
	relations: {},
	baskets: [],
	bills: BillType[],
	paymentMethods: DigitalLifePaymentMethod[],
	places?: Place[],
	usageDateRange: {
		startDate: ?string,
		endDate: ?string
	},
	usageEvents: {},
	usageEventCounters: {},
	usageCounters: {},
	basketPaymentReceipts: {},
	personsOrderData: {},
	billingBalances: [],
	subscriptionPlanConfiguration: string,
	initializedMsisdnChange: {}
};

export {
	BillType,
	DigitalLifePaymentMethod,
	Place,
	DigitalLifeStoreType
};

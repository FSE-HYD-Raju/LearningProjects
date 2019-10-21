import { UnitOfMeasureEnum, HasId } from "../index";

interface BillingBalanceAttributes extends HasId {
	balanceType?: string;
	value?: number;
	name?: string;
	customerAccountId?: string;
	billingAccountId?: string;
	billingBalanceEvents?: Array<any>;
	unitOfMeasure?: UnitOfMeasureEnum;
	currency?: string;
}

interface BillingBalance extends BillingBalanceAttributes {
	attributes?: BillingBalanceAttributes;
}

export {
	BillingBalanceAttributes,
	BillingBalance
};

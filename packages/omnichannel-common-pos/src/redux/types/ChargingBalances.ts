import { HasId, UnitOfMeasureEnum, ValidityPeriod } from "./index";
import { UnitOfMeasureType } from "./UnitOfMeasure";

enum ChargingBalancesTypeEnum {

	MAIN_BALANCE = "MainBalance",
	CASH_BALANCE = "CashBalance",
	BONUS_BALANCE = "BonusBalance"
}

interface ChargingBalancesAttributes extends HasId {
	id: string;
	balanceId?: string | null;
	balanceType?: string;
	name?: string;
	validFor?: ValidityPeriod;
	value?: number;
	billingAccountId?: string | null;
	productId?: string | null;
	serviceId?: string | null;
	currency?: string;
	unitOfMeasure?: UnitOfMeasureType;
}

interface ChargingBalances extends ChargingBalancesAttributes {
	attributes?: ChargingBalancesAttributes;
}

export {
	ChargingBalancesAttributes,
	ChargingBalances,
	ChargingBalancesTypeEnum
};

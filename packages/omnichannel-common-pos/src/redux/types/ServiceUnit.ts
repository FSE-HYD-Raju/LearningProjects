import { UnitOfMeasureEnum } from "./UnitOfMeasure";

interface ServiceUnit {
	amount?: number;
	currency?: string;
	unitOfMeasure?: UnitOfMeasureEnum;
	usageType?: ServiceUnitUsageTypeEnum;
}

enum ServiceUnitUsageTypeEnum {
	DURATION = "DURATION",
	TOTAL_DATA = "TOTAL_DATA",
	IN_DATA = "IN_DATA",
	OUT_DATA = "OUT_DATA",
	MONETARY = "MONETARY",
	SERVICE_SPECIFIC = "SERVICE_SPECIFIC",
}

export {
	ServiceUnit,
	ServiceUnitUsageTypeEnum,
};

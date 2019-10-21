import { UsageLimits } from "./UsageLimits";
import { ValidityPeriod } from "./ValidityPeriod";
import { UnitOfMeasureEnum } from "./UnitOfMeasure";
import { HasId, Service } from "./index";

interface UsageCountersAttributes extends HasId {
	counterId?: string;
	name?: string;
	value?: number;
	limits: Array<UsageLimits>;
	validFor?: ValidityPeriod;
	unitOfMeasure?: UnitOfMeasureEnum;
	currency?: string;
	category?: string;
	service?: Service;
}

interface UsageCounters extends UsageCountersAttributes {
	attributes?: UsageCountersAttributes;
}

export {
	UsageCounters,
	UsageCountersAttributes,
};

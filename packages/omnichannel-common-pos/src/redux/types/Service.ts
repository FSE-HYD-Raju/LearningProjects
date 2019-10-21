import { HasId } from "./HasId";
import { ValidityPeriod } from "./ValidityPeriod";
import { LifecycleChangeAction } from "./LifecycleChangeAction";
import { Specification } from "./Specification";
import { UsageCounters } from "./UsageCounters";
import { Characteristic } from "./Characteristic";
import { ServiceLifeCycleStatus } from "./ServiceLifeCycleStatus";

interface ServiceAttributes extends HasId {
	name?: string;
	primaryId?: string;
	validFor?: ValidityPeriod;
	lifeCycleStatus?: ServiceLifeCycleStatus;
	type?: string;
	specification?: Specification;
	allowedTransitions: Array<LifecycleChangeAction>;
	usageCounters: Array<UsageCounters>;
	characteristics: Record<string, string>;
	instanceCharacteristics: Record<string, Characteristic>;
	productOfferingId?: string; // where does it come from?
}

interface Service extends ServiceAttributes {
	attributes?: ServiceAttributes;
}

export {
	Service,
	ServiceAttributes,
};

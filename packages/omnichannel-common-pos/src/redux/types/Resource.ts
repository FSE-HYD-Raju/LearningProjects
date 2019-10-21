import { ValidityPeriod, Specification, HasId } from "./index";

export interface Resource extends HasId {
	primaryId?: string;
	validFor?: ValidityPeriod;
	lifeCycleStatus?: string;
	type: ResourceType;
	subType?: string;
	specification?: Specification;
	characteristics?: Record<string, string>;
}

export type ResourceTypeEnum = {
	MSISDN: "MSISDN",
	SIM: "SIM",
	DEVICE: "DEVICE",
	LOGICAL_RESOURCE: "LOGICAL-RESOURCE",
	PHYSICAL_RESOURCE: "PHYSICAL-RESOURCE";
};

export type ResourceType = keyof ResourceTypeEnum;

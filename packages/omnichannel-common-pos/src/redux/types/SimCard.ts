import { Msisdn } from "./Msisdn";
import { Resource } from "./Resource";

export interface SimCard extends Resource {
	simType: string;
	sku?: string;
	icc?: string;
	imsi?: string;
	pin1?: string;
	pin2?: string;
	puk1?: string;
	puk2?: string;
	simStatus: SimLifecycleStatus;
	reservedFor?: string;
	associatedWith?: string;
	ownedBy?: string;
	simTechnology?: string;
	msisdn?: Msisdn;
	errorCode?: string;
}

export enum SimLifecycleStatusEnum {
	available = "available",
	in_use = "in-use",
	retired = "retired",
	invalidated = "invalidated",
}

export type SimLifecycleStatus = keyof typeof SimLifecycleStatusEnum;

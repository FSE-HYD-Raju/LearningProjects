import { ValidityPeriod, SimCard, MsisdnLifecycleStatus, HasId } from "./index";

interface MsisdnAttributes extends HasId {
	primaryId: string;
	associatedWith: string;
	characteristics: Record<string, string>;
	number: string;
	numberType: string;
	reservedFor: string;
	validFor: ValidityPeriod;
	preactivatedSim: SimCard;
	lifecycleStatus: MsisdnLifecycleStatus;
}

interface Msisdn extends MsisdnAttributes {
	attributes: MsisdnAttributes;
	errorCode?: string;
}

interface MsisdnResponse {
	attributes?: MsisdnAttributes;
}

export {
	MsisdnAttributes,
	Msisdn,
	MsisdnResponse,
};

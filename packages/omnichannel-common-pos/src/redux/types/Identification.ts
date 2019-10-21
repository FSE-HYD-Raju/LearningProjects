import { ValidityPeriod, IssuingAuthority, HasId } from "./index";

interface IdentificationAttributes {
	identificationId: string;
	type: string;
	lifecycleStatus?: string;
	issuingAuthority?: IssuingAuthority;
	validityPeriod?: ValidityPeriod;
}

interface Identification extends IdentificationAttributes, HasId {
	type: string;
	attributes?: IdentificationAttributes;
}

export {
	IdentificationAttributes,
	Identification,
};

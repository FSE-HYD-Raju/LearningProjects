import { Product } from "./Product";
import { ValidityPeriod } from "./ValidityPeriod";
import { ChargingBalances } from "./ChargingBalances";
import { HasId } from "./HasId";

enum AgreementLifecycleStatusEnum {
	PENDING = "PENDING",
	ACTIVE = "ACTIVE",
	TERMINATED = "TERMINATED",
	DEACTIVATED = "DEACTIVATED"
}

type AgreementLifecycleStatus = keyof typeof AgreementLifecycleStatusEnum;

interface AgreementAttributes extends HasId {
	validFor: ValidityPeriod;
	referenceNumber: string;
	lifeCycleStatus: AgreementLifecycleStatus;
	products: Array<Product>;
	chargingBalances: Array<ChargingBalances>;
}

interface Agreement extends AgreementAttributes {
	attributes: AgreementAttributes;
}

export {
	Agreement,
	AgreementAttributes,
	AgreementLifecycleStatusEnum,
	AgreementLifecycleStatus
};

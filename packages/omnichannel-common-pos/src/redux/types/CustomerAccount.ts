import { HasId } from "./HasId";
import { ValidityPeriod } from "./ValidityPeriod";
import { CustomerAccountLifecycleStatus } from "./CustomerAccountLifecycleStatus";

interface CustomerAccountAttributes {
	accountId?: string;
	individualId?: string;
	name?: string;
	accountType?: string;
	characteristics?: Record<string, string>;
	validity?: ValidityPeriod;
	lifecycleStatus?: CustomerAccountLifecycleStatus;
}

interface CustomerAccount extends HasId {
	attributes?: CustomerAccountAttributes;
}

export {
	CustomerAccount,
	CustomerAccountAttributes,
};

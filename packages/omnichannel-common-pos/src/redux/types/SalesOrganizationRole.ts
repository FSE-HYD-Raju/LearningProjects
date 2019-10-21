import { HasId } from "./HasId";
import { ValidityPeriod } from "./ValidityPeriod";
import { Inventory } from "./Inventory";

/**
 * This type corresponds to SalesOrganizationRole.java on the BE
 */
interface SalesOrganizationRoleAttributes {
	statuses: Array<string>;
	validFor?: ValidityPeriod;
	code?: string;
	externalId?: string;
	inventories: Array<Inventory>;
}

interface SalesOrganizationRole extends SalesOrganizationRoleAttributes, HasId {
	attributes?: SalesOrganizationRoleAttributes;
}

export {
	SalesOrganizationRole,
	SalesOrganizationRoleAttributes
};

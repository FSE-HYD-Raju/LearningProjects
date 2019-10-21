import { Inventory, SalesOrganizationRole } from "../../types";

export interface SalesRepSessionActionsFlux {
	showModal: (visible: boolean) => void;
	setSelectedOrganization: (organization: SalesOrganizationRole, inventory: Inventory) => void;
	getActiveSalesOrganizationData: () => void;
	getOrganizations: () => void;
	getInventories: (organizationId: string) => void;
	revertSalesOrganizationAndInventory: () => void;
	getOrgsAndItsInventories: (poId: string) => void;
}

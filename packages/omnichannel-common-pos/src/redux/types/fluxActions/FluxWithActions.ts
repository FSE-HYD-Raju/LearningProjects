import { BasketActionsFlux } from "./BasketActionsFlux";
import { SalesActionsFlux } from "./SalesActionsFlux";
import { MsisdnActionsFlux } from "./MsisdnActionsFlux";
import { DigitalLifeActionsFlux } from "./DigitalLifeActionsFlux";
import { PaymentActionsFlux } from "./PaymentActionsFlux";
import { UserActionsFlux } from "./UserActionsFlux";
import { SalesRepSessionActionsFlux } from "./SalesRepSessionActionsFlux";
import { CustomerCaseActionsFlux } from "./CustomerCaseActionsFlux";
import { CustomerActionsFlux } from "./CustomerActionsFlux";

export interface FluxWithActions {
	actions: {
		BasketActions: BasketActionsFlux;
		SalesActions: SalesActionsFlux;
		DigitalLifeActions: DigitalLifeActionsFlux;
		MsisdnActions: MsisdnActionsFlux;
		CustomerCaseActions: CustomerCaseActionsFlux;
		CustomerActions: CustomerActionsFlux;
		PaymentActions: PaymentActionsFlux;
		UserActions: UserActionsFlux;
		SalesRepSessionActions: SalesRepSessionActionsFlux;
		CMSAdminActions: any;
	};
	stores: Record<string, any>;
	persist: () => void;
	recycle: (...args: any[]) => void;
	reduxStore: any;
}

import { serviceDeskActions, serviceDeskStores } from "omnichannel-service-desk";

const { CustomerActions, CustomerCaseActions } = serviceDeskActions;
const { CustomerStore, CustomerCaseStore } = serviceDeskStores;

const POSCheckoutActions = require("./checkout/POSCheckoutActions");
const POSCheckoutStore = require("./checkout/POSCheckoutStore");

import { CustomizationBootstrapType, history as browserHistory, AppState, Flux } from "omnichannel-common-pos";
const { alt } = Flux;

export const history = browserHistory;

const customActions = { CustomerActions, CustomerCaseActions, POSCheckoutActions };
const customStores = { CustomerStore, CustomerCaseStore, POSCheckoutStore };

export const getFlux: CustomizationBootstrapType<AppState>["getFlux"]  = ({ customizedStores, customizedActions }) =>
	alt(
		{ history },
		{ ...customActions, ...customizedActions },
		{ ...customStores, ...customizedStores }
	);

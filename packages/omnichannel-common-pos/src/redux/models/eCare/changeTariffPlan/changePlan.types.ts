"use strict";

import {Basket, Product, ProductOffering} from "../../../types";
import {InitializedAddon} from "../../../index";

type ChangePlanState = {
	availablePlanProductOfferingsByAgreement: Record<string, ProductOffering[]>;
	isChangePlanSummaryModalShown: boolean;
	agreementId?: string;
	currentPlan?: ProductOffering;
	selectedPlan?: ProductOffering;
// 	basket?: Basket;
	initializationResult?: InitializedAddon;
};
export { ChangePlanState };

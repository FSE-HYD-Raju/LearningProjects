"use strict";

import { Action } from "redux";
import { ProductOffering } from "../../../types";

enum SuspensionActions {
	FLUX_SYNC = "Suspension_FLUX_SYNC",

	GET_SUSPENSION_PRODUCT_OFFERINGS = "Suspension_GET_SUSPENSION_PRODUCT_OFFERINGS",
	GET_SUSPENSION_PRODUCT_OFFERINGS_COMPLETE = "Suspension_GET_SUSPENSION_PRODUCT_OFFERINGS_COMPLETE",
	GET_SUSPENSION_PRODUCT_OFFERINGS_FAIL = "Suspension_GET_SUSPENSION_PRODUCT_OFFERINGS_FAIL",

	DELETE_BASKET = "Suspension_DELETE_BASKET"
}

interface SuspensionActionPayload extends Action<SuspensionActions> {
	fluxState?: any;
	targetAgreementId?: string;
	categoryId?: string;
	suspensionProductOfferings?: Array<ProductOffering>;
	basketId?: string;
}

const suspension = {
	fluxSync: (fluxState: any) => ({ type: SuspensionActions.FLUX_SYNC, fluxState }),

	getSuspensionProductOfferings: (targetAgreementId: string, categoryId: string) => ({
		type: SuspensionActions.GET_SUSPENSION_PRODUCT_OFFERINGS,
		targetAgreementId,
		categoryId
	}),
	getSuspensionProductOfferingsComplete: (suspensionProductOfferings: Array<ProductOffering>) => ({
		type: SuspensionActions.GET_SUSPENSION_PRODUCT_OFFERINGS_COMPLETE,
		suspensionProductOfferings
	}),
	getSuspensionProductOfferingsFail: () => ({
		type: SuspensionActions.GET_SUSPENSION_PRODUCT_OFFERINGS_FAIL
	}),
	deleteBasket: (basketId: string) => ({
		type: SuspensionActions.DELETE_BASKET,
		basketId
	}),
};

export { SuspensionActions, SuspensionActionPayload, suspension };

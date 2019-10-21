"use strict";

import { ProductOfferingShippingMethod } from "../../../types/ShippingMethod";
import {
	Basket,
	ContextualPaymentMethod,
	PostalAddress,
	Product,
	ProductOffering,
	SimCard,
	User
} from "../../../types";

const CHANGE_SIM_INITIALIZE_LOADING_KEY = "change_sim_initialize_loading";

type ChangeSimState = {
	shippingMethods: ProductOfferingShippingMethod[];
	basketId?: string;
	basketItemIdToRemove?: string;
	paymentMethods: ContextualPaymentMethod[];
	selectedPaymentMethod?: string;
	selectedCustomerPaymentMethod?: string;
	selectedReason?: ProductOffering;
	reasons: ProductOffering[];
	selectedShippingMethod?: ProductOfferingShippingMethod;
	showingChangeSimModal: boolean;
	showingModifyAddressForm: boolean;
	deliveryAddress?: {
		postalAddress?: PostalAddress;
		forceCreation?: boolean;
	};
};
export interface ChangeSimActionInitializeRequest {
	subscription: Product;
	poId: string;
	user: User;
	targetAgreementId: string;
	reasonsPOIds: string[];
}

export { ChangeSimState, CHANGE_SIM_INITIALIZE_LOADING_KEY };

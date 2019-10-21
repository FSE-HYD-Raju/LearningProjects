"use strict";

import { Order, OrderItem } from "../../../types";

interface SimIccVerificationAttributes {
	orderRefId: string;
	iccid: string;
	successFlag: boolean;
	result?: string;
	description?: string;
}

interface ActivateSimOrderData {
	orders: Array<Order>;
	orderItems: Array<OrderItem>;
}

interface SimIccVerification {
	attributes: SimIccVerificationAttributes;
}

type ActivateSimState = {
	activateSimOrderData: ActivateSimOrderData;
	verificationResponse: SimIccVerification;
	verificationError: boolean;
};

export { ActivateSimOrderData, ActivateSimState, SimIccVerificationAttributes, SimIccVerification };

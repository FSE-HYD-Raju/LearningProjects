import { CustomerPaymentMethod } from "./payment/CustomerPaymentMethod";

interface TopUpCharacteristic {
	type?: string;
	thresholdValue?: string;
	amount?: string;
	monthlyLimit?: string;
	interval?: string;
	intervalCount?: string;
	paymentMethod: CustomerPaymentMethod | undefined;
}

export { TopUpCharacteristic };

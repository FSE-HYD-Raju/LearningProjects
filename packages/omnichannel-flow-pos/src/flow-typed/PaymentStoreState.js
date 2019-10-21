/* eslint no-undef: 0 */
declare type PaymentStoreState = {
	paymentInfo?: {
		paymentCompleted: boolean
	},
	contextualPaymentMethods: [], // here resides an Array<ContextualPaymentMethod>
	customerPaymentMethods: [], // here resides an Array<CustomerPaymentMethods>
	paymentStatus: string,
	paymentCancel: boolean
};

export {
	PaymentStoreState
};

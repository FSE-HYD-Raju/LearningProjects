/* eslint no-undef: 0 */
declare type PaymentActionsType = {
	selectPaymentMethod: (
		basketId: string,
		selectedPaymentMethod: string
	) => void,
	fetchReferenceNumberForCashPayment: (
		basketId: string,
		contextualPaymentMethodId: string
	) => void
};

export {
	PaymentActionsType
};

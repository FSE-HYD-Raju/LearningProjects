declare type POSCheckoutActionsType = { // eslint-disable-line
	showPOSDeliveryModal: (show: boolean) => void,
	setPOSDefaultStore: (store: Object) => void,
	setPOSDeliveryType: (type: string) => void,
	setPOSDeliveryAddress: (formData: ?Object, type?: string) => void,
	setPOSDeliveryMethodId: (id: string) => void
};

export {
	POSCheckoutActionsType
};

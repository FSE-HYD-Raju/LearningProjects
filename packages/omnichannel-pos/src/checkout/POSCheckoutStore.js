// @flow

import { Flux } from "omnichannel-common-pos";
const { BaseStore, ImmStore } = Flux;

class POSCheckoutStore extends BaseStore {
	constructor() {
		super();
		this.bindActions(this.alt.actions.POSCheckoutActions);

		this.state = {
			showPOSDeliveryModal: false,
			POSDefaultStore: null,
			POSDeliveryType: undefined,
			POSDeliveryMethodId: null,
			"store-pickup": null,
			"new-address": null,
			"known-address": null
		};
	}

	showPOSDeliveryModal(show: Boolean) {
		this.setState({
			showPOSDeliveryModal: show
		});
	}

	setPOSDefaultStore(store: Object) {
		this.setState({
			POSDefaultStore: store
		});
	}

	setPOSDeliveryType(type: Object) {
		this.setState({
			POSDeliveryType: type
		});
	}

	setPOSDeliveryMethodId(id: string) {
		this.setState({
			POSDeliveryMethodId: id
		});
	}

	setPOSDeliveryAddress({
		formData,
		type
	}: {
		formData: Object,
		type: string
	}) {
		this.setState({
			[type]: formData
		});
	}
}

export default ImmStore(POSCheckoutStore);

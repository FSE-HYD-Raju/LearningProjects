import { Flux } from "omnichannel-common-pos";
const { BaseActions } = Flux;

class POSCheckoutActions extends BaseActions {
	showPOSDeliveryModal = show => show;
	setPOSDefaultStore = store => store;
	setPOSDeliveryType = type => type;
	setPOSDeliveryAddress = payload => payload;
	setPOSDeliveryMethodId = id => id;
}

export default POSCheckoutActions;

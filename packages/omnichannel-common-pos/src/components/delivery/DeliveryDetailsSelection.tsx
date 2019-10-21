import * as R from "react";
import { PostalAddress, ProductOfferingShippingMethod, ShippingMethodType } from "../../redux/types";
import AddressedDeliveryDetailsContainer from "./AddressedDeliveryDetailsContainer";
import cssns from "../../utils/cssnsConfig";

const React = cssns("DeliveryDetailsSelection").React as typeof R;

interface DeliveryDetailsSelectionProps {
	selectedShippingMethod?: ProductOfferingShippingMethod;
	deliveryPostalAddress?: PostalAddress;
	storeSelectedShippingAddress?: (address: PostalAddress, forceUpdateAddress?: boolean) => void;
}

const DeliveryDetailsSelection: React.FC<DeliveryDetailsSelectionProps> = props => {
	if (!props.selectedShippingMethod) {
		return null;
	}
	switch (props.selectedShippingMethod.type) {
		case ShippingMethodType.HOME_DELIVERY:
			return (
				<AddressedDeliveryDetailsContainer
					postalAddress={props.deliveryPostalAddress}
					storeSelectedShippingAddress={props.storeSelectedShippingAddress}
				/>
			);
		default:
			return null;
	}
};

export default DeliveryDetailsSelection;
export {
	DeliveryDetailsSelectionProps,
};

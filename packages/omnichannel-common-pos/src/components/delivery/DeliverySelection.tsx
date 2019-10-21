import * as React from "react";
import messages from "./deliverySelection.messages";
import DeliveryMethodSelection from "./DeliveryMethodSelection";
import { PostalAddress, ProductOfferingShippingMethod } from "../../redux/types";
import DeliveryDetailsSelection from "./DeliveryDetailsSelection";
import FormattedMessage from "../../channelUtils/FormattedMessage";

export interface DeliverySelectionOwnProps {}
export interface DeliverySelectionStateProps {
	selectedShippingMethod: ProductOfferingShippingMethod | undefined;
	shippingMethods: ProductOfferingShippingMethod[];
	deliveryPostalAddress?: PostalAddress;
}
export type DeliverySelectionActionOnSelectShippingMethod = (selectedShippingMethod: ProductOfferingShippingMethod) => void;

export interface DeliverySelectionActionProps {
	actions: {
		onSelectShippingMethod: DeliverySelectionActionOnSelectShippingMethod;
		storeSelectedShippingAddress?: (address: PostalAddress, forceUpdateAddress?: boolean) => void;
	};
}
export interface DeliverySelectionProps
	extends DeliverySelectionOwnProps,
		DeliverySelectionStateProps,
		DeliverySelectionActionProps {}
const DeliverySelection: React.FC<DeliverySelectionProps> = props => (
	<div className="ChangeSim-general-delivery-container">
		<div className="ChangeSim-row ChangeSim-delivery-method-selection">
			<div className="ChangeSim-label">
				<FormattedMessage {...messages.methodLabel} />
			</div>
			<div className="ChangeSim-data">
				<DeliveryMethodSelection {...props} />
			</div>
		</div>
		{props.selectedShippingMethod && (
			<DeliveryDetailsSelection
				selectedShippingMethod={props.selectedShippingMethod}
				deliveryPostalAddress={props.deliveryPostalAddress}
				storeSelectedShippingAddress={props.actions.storeSelectedShippingAddress}/>
		)}
	</div>
);

export default DeliverySelection;

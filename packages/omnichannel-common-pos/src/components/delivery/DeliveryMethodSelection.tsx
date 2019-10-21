import * as R from "react";
import { ProductOfferingShippingMethod } from "../../redux/types/ShippingMethod";
import ProductOfferingUtil from "../../utils/ProductOfferingUtil";
import cssns from "../../utils/cssnsConfig";
const React = cssns("DeliveryMethodSelection").React as typeof R;
import OcInput from "../ocComponents/OcInput";

export interface DeliveryMethodSelectionOwnProps {
	selectedShippingMethod: ProductOfferingShippingMethod | undefined;
	shippingMethods: ProductOfferingShippingMethod[];
}
export interface DeliveryMethodSelectionStateProps {}
export interface DeliveryMethodSelectionActionProps {
	actions: {
		onSelectShippingMethod: (selectedShippingMethod: ProductOfferingShippingMethod) => void;
	};
}
export interface DeliveryMethodSelectionProps
	extends DeliveryMethodSelectionOwnProps,
		DeliveryMethodSelectionStateProps,
		DeliveryMethodSelectionActionProps {}

class DeliveryMethodSelection extends React.PureComponent<DeliveryMethodSelectionProps> {
	getContent() {
		const { selectedShippingMethod, shippingMethods, actions } = this.props;
		if (
			shippingMethods.length === 1 &&
			selectedShippingMethod &&
			selectedShippingMethod.id === shippingMethods[0].id
		) {
			const shippingMethod = shippingMethods[0];
			return <span>{ProductOfferingUtil.getPOName(shippingMethod.productOffering)}</span>;
		}
		return shippingMethods.map(shippingMethod => (
			<OcInput
				key={shippingMethod.id}
				type="radio"
				id={shippingMethod.id}
				label={ProductOfferingUtil.getPOName(shippingMethod.productOffering)}
				onChange={() => actions.onSelectShippingMethod(shippingMethod)}
				checked={selectedShippingMethod && selectedShippingMethod.id === shippingMethod.id}
			/>
		));
	}
	render() {
		return <div>{this.getContent()}</div>;
	}
}

export default DeliveryMethodSelection;
export { React };

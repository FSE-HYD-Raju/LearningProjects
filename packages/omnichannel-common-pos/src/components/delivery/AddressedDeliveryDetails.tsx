import * as React from "react";
import messages from "./deliverySelection.messages";
import classnames from "classnames";
import ChangeAddressButton from "./ChangeAddressButton";
import { PostalAddress } from "../../redux/types";
import FormattedMessage from "../../channelUtils/FormattedMessage";
import { ContextType, contextTypesValidationMap } from "../../types";
import PostalAddressUtil from "../../utils/user/PostalAddressUtil";
import ChangeDeliveryAddressContainerECare from "./ChangeDeliveryAddressContainerECare";

export interface AddressedDeliveryDetailsOwnProps {}
export interface AddressedDeliveryDetailsStateProps {
	postalAddress?: PostalAddress;
	isPostalAddressUpdated: boolean;
	showingChangeAddressForm: boolean;
}
export interface AddressedDeliveryDetailsActionProps {
	actions: {
		resetIsPostalAddressUpdated: () => void;
		setDeliveryAddressFormState: (show: boolean) => void;
		storeSelectedShippingAddress?: (address: PostalAddress, forceUpdateAddress?: boolean) => void;
		validateProposedDeliveryAddress: (address?: PostalAddress) => boolean;
	};
}
export interface AddressedDeliveryDetailsProps
	extends AddressedDeliveryDetailsOwnProps,
		AddressedDeliveryDetailsStateProps,
		AddressedDeliveryDetailsActionProps {}
class AddressedDeliveryDetails extends React.Component<AddressedDeliveryDetailsProps> {
	static contextTypes = contextTypesValidationMap;
	constructor(props: AddressedDeliveryDetailsProps, context: ContextType) {
		super(props, context);
		this.props.actions.setDeliveryAddressFormState(!this.props.actions.validateProposedDeliveryAddress(this.props.postalAddress));
	}
	componentDidMount() {
		if (this.props.isPostalAddressUpdated) {
			this.props.actions.resetIsPostalAddressUpdated();
		}
	}
	componentWillReceiveProps(newProps: AddressedDeliveryDetailsProps) {
		if (newProps.isPostalAddressUpdated && !this.props.isPostalAddressUpdated) {
			this.hideChangeAddressForm();
		}
	}
	showModal = () => {
		this.props.actions.resetIsPostalAddressUpdated();
		this.props.actions.setDeliveryAddressFormState(true);
	};
	hideChangeAddressForm = () => {
		this.props.actions.setDeliveryAddressFormState(false);
	};

	render() {
		const { postalAddress, showingChangeAddressForm } = this.props;
		const adressRowClasses = classnames({
			"ChangeSim-row": true,
			"ChangeSim-delivery-address-details": showingChangeAddressForm,
			"ChangeSim-delivery-address-one-line": !showingChangeAddressForm,
		});
		const detailComponent = showingChangeAddressForm ? (
			<ChangeDeliveryAddressContainerECare
				deliveryPostalAddress={this.props.postalAddress}
				storeSelectedShippingAddress={this.props.actions.storeSelectedShippingAddress} />
		) : (
			<>
				<div className="ChangeSim-label">
					<FormattedMessage {...messages.addressLabel} />
				</div>
				<div className="ChangeSim-postal-address">{PostalAddressUtil.formatPostalAddress(postalAddress)}</div>
				<ChangeAddressButton onClick={this.showModal} show={showingChangeAddressForm} />
			</>
		);
		return <div className={adressRowClasses}>{detailComponent}</div>;
	}
}

export default AddressedDeliveryDetails;
export { React };

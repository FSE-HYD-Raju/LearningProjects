import cssns from "../../utils/cssnsConfig";
import { get } from "lodash";
import countryMessages from "../../country.messages";
import DeliveryAddressType from "./DeliveryAddressType";
import { PostalAddress, User, StoredCustomerType, ContactMediaTypeEnum } from "../../redux";
import { ContextType, contextTypesValidationMap } from "../../types";
import { ProductOffering, ContactMediaType } from "../../redux/types";
import PostalAddressUtil from "../../utils/user/PostalAddressUtil";
import deliverySelectionMessages from "./deliverySelection.messages";
import OcInput from "../ocComponents/OcInput";
import ChangeDeliveryAddressContainerEShop from "./ChangeDeliveryAddressContainerEShop";
import { B2CComponentCustomizationPoints, withCustomization } from "../../customization";
import { Component, ReactNode, ValidationMap } from "react";
const { React } = cssns("CheckoutDelivery");

interface DeliveryAddressSelectionOwnProps {
	handleDeliveryAddressSelection: (deliveryType: DeliveryAddressType) => void;
}

interface DeliveryAddressSelectionStateProps {
	user?: User;
	storedCustomer?: StoredCustomerType;
	storedDeliveryAddress: PostalAddress;
	homeDeliveryProductIds?: string[];
	selectedShippingMethod?: ProductOffering;
}

interface DeliveryAddressSelectionActionProps {
	actions: {
		setDeliveryAddressRole: (role: ContactMediaType) => void;
	};
}

type DeliveryAddressSelectionProps = DeliveryAddressSelectionOwnProps & DeliveryAddressSelectionActionProps & DeliveryAddressSelectionStateProps;

interface DeliveryAddressSelectionState {
	isAnotherDeliveryAddressChecked: boolean;
}

class DeliveryAddressSelection extends Component<DeliveryAddressSelectionProps, DeliveryAddressSelectionState> {

	static displayName: string = "B2CCheckoutDeliveryAddress";
	static contextTypes: ValidationMap<ContextType> = contextTypesValidationMap;

	constructor(props: DeliveryAddressSelectionProps, context: ContextType) {
		super(props, context);
		this.renderHomeDeliveryOption = this.renderHomeDeliveryOption.bind(this);
		this.isHomeDeliveryDisabled = this.isHomeDeliveryDisabled.bind(this);

		this.state = {
			isAnotherDeliveryAddressChecked: false
		};
	}

	handleDeliveryChoice = (e: React.SyntheticEvent<any>) => {
		const value = get(e, "target.value", "");

		if (this.props.handleDeliveryAddressSelection) {
			this.props.handleDeliveryAddressSelection(value);
		}

		this.props.actions.setDeliveryAddressRole((value === DeliveryAddressType.NEW) ? ContactMediaTypeEnum.DELIVERY : ContactMediaTypeEnum.PRIMARY);
		this.setState({ isAnotherDeliveryAddressChecked: value === DeliveryAddressType.NEW });
	};

	public getAddressForDisplay(address?: PostalAddress): string {
		if (address) {
			const countryName = get(countryMessages, `countryName${address.country}.defaultMessage`, address.country);
			return `${address.street},
				${address.coAddress ? address.coAddress + "," : ""}
				${address.postalCode}
				${address.city},
				${address.stateOrProvince ? address.stateOrProvince + "," : ""}
				${countryName}`;
		}
		return "";
	}

	public isHomeDeliveryMethod(): boolean {
		return Boolean(
			this.props.homeDeliveryProductIds &&
			this.props.selectedShippingMethod &&
			this.props.homeDeliveryProductIds.includes(
				this.props.selectedShippingMethod.id
			)
		);
	}

	public isHomeDeliveryDisabled(): boolean {
		return false;
	}

	public renderHomeDeliveryOption(): ReactNode {
		const { isAnotherDeliveryAddressChecked } = this.state;

		const { formatMessage } = this.context.intl;
		const homeAddress = this.getAddressForDisplay(PostalAddressUtil.getAddressByRole(this.props.storedCustomer, ContactMediaTypeEnum.PRIMARY));

		return (
			<OcInput
				type="radio"
				name="residentialDeliveryAddress"
				disabled={this.isHomeDeliveryDisabled()}
				defaultValue={DeliveryAddressType.HOME}
				onChange={this.handleDeliveryChoice}
				label={`${formatMessage(
					deliverySelectionMessages.checkoutStepDeliveryHomeAddress
				)} (${homeAddress})`}
				checked={!isAnotherDeliveryAddressChecked}
				standalone={true}
				id="checkout-delivery-address-residential"
			/>
		);
	}

	render() {
		if (!this.props.user && !this.props.storedCustomer) {
			return null;
		}
		const { formatMessage } = this.context.intl;
		const { storedDeliveryAddress } = this.props;
		const { isAnotherDeliveryAddressChecked } = this.state;

		const deliveryAddress = storedDeliveryAddress
			? this.getAddressForDisplay(storedDeliveryAddress)
			: this.getAddressForDisplay(
				PostalAddressUtil.getAddressByRole(this.props.storedCustomer, ContactMediaTypeEnum.DELIVERY)
			);

		return (
			<fieldset className="section-address">
				<legend>
					<div className="legend-inner">
						<div className="legend-number">{1}</div>
						<h3 className="legend-title">{formatMessage(deliverySelectionMessages.checkoutStepDeliveryAddressHeaderMessage)}</h3>
					</div>
				</legend>
				<div className="section-body">
					{this.renderHomeDeliveryOption()}
					<OcInput
						type="radio"
						name="isAnotherDeliveryAddressChecked"
						defaultValue={DeliveryAddressType.NEW}
						onChange={this.handleDeliveryChoice}
						label={formatMessage(deliverySelectionMessages.checkoutStepDeliveryNewAddress)}
						checked={isAnotherDeliveryAddressChecked}
						standalone={true}
						id="checkout-delivery-address-new"
					/>
					{isAnotherDeliveryAddressChecked && <ChangeDeliveryAddressContainerEShop />}
				</div>
			</fieldset>
		);
	}
}

export {
	DeliveryAddressSelectionProps,
	DeliveryAddressSelectionState,
	DeliveryAddressSelectionOwnProps,
	DeliveryAddressSelectionActionProps,
	DeliveryAddressSelectionStateProps,
	DeliveryAddressSelection as DeliveryAddressSelectionBaseline,
};

export default withCustomization<DeliveryAddressSelectionProps>(
	B2CComponentCustomizationPoints.DELIVERY_ADDRESS_SELECTION,
	DeliveryAddressSelection
);

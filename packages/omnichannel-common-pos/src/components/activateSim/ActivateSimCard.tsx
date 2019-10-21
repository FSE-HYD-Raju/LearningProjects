import * as React from "react";
import {
	ActivateSimConfigurationType,
	ActivateSimOrderData,
	Order,
	OrderItem,
	User,
	SimIccVerification,
	SimIccVerificationAttributes
} from "../../redux/types";
import ActivateSimBanner from "./ActivateSimBanner";
import OrderUtil from "../../utils/order/OrderUtil";

export interface ActivateSimCardStateProps {
	activateSimOrderData?: ActivateSimOrderData;
	user?: User;
	configuration: ActivateSimConfigurationType;
	verificationResponse?: SimIccVerification;
	verificationError: boolean;
}

export interface ActivateSimCardActionProps {
	actions: {
		getInProgressOrders: (personId: string) => void;
		simIccVerification: (payload: SimIccVerificationAttributes) => void;
		onClose: () => void;
	};
}

export type ActivateSimCardProps = ActivateSimCardStateProps & ActivateSimCardActionProps;

export type SimCardActivationInfo = {
	iccid: string;
	orderReference: string;
	tocTocUrl: string;
	iccidVerification: boolean;
};

class ActivateSimCard extends React.PureComponent<ActivateSimCardProps> {
	constructor(props: ActivateSimCardProps) {
		super(props);
	}

	componentWillMount() {
		const { user, actions } = this.props;
		if (user && user.id) {
			actions.getInProgressOrders(user.id);
		}
	}

	getSimCardActivationInfo = (): SimCardActivationInfo[] => {
		const { activateSimOrderData, configuration } = this.props;
		const orders = activateSimOrderData && activateSimOrderData.orders;

		const result: SimCardActivationInfo[] = [];

		if (this.isConfigurationValid() && orders && orders.length) {
			orders.forEach((order: Order) => {
				const orderDetails = order.attributes && order.attributes.orderDetails;
				const orderReference = order.attributes && order.attributes.referenceNumber;

				const iccid =
					orderDetails &&
					orderDetails.msisdnIccid &&
					orderDetails.msisdnIccid.length &&
					orderDetails.msisdnIccid[0].iccid;

				const token = orderDetails && orderDetails.token;

				if (iccid && orderReference) {
					const allOrderItems = OrderUtil.getAllOrderItems(order);

					const activationItem = allOrderItems.find(item =>
						this.isItemContainsOneOfPOs(item, configuration.activatePOIds as string[])
					);

					const deliveryItem = allOrderItems.find(item =>
						this.isItemContainsOneOfPOs(item, configuration.deliveryPOIds as string[])
					);

					if (activationItem && deliveryItem) {
						const vcn = configuration.verificationCharacteristicName as string;
						const iccidVv = configuration.iccidVerificationValue as string;
						const videoVv = configuration.videoVerificationValue as string;

						const iccidVerification = this.isItemContainsCharacteristicWithValue(
							deliveryItem,
							vcn,
							iccidVv
						);
						const videoVerification = this.isItemContainsCharacteristicWithValue(
							deliveryItem,
							vcn,
							videoVv
						);

						if (iccidVerification || videoVerification) {
							result.push({
								iccid,
								orderReference,
								iccidVerification,
								tocTocUrl: `${token}`
							});
						}
					}
				}
			});
		}

		return result;
	};

	isConfigurationValid = () => {
		const { configuration } = this.props;

		return (
			configuration &&
			configuration.activatePOIds &&
			configuration.activatePOIds.length &&
			configuration.deliveryPOIds &&
			configuration.deliveryPOIds.length &&
			configuration.verificationCharacteristicName &&
			configuration.iccidVerificationValue &&
			configuration.videoVerificationValue
		);
	};

	isItemContainsOneOfPOs = (orderItem: OrderItem, pos: string[]): boolean => {
		const po = (orderItem.attributes && orderItem.attributes.productOffering) || orderItem.productOffering;

		return Boolean(po && pos.includes(po.id));
	};

	isItemContainsCharacteristicWithValue = (
		orderItem: OrderItem,
		characteristicName: string,
		characteristicValue: string
	): boolean => {
		const characteristics =
			(orderItem.attributes && orderItem.attributes.inputtedCharacteristics) || orderItem.inputtedCharacteristics;

		return Boolean(characteristics && characteristics[characteristicName] === characteristicValue);
	};

	render() {
		const { user } = this.props;

		const simCardActivationInfo = this.getSimCardActivationInfo();

		if (user && user.attributes && simCardActivationInfo.length) {
			const name = user.attributes.firstName;

			return (
				<ActivateSimBanner
					name={name}
					simCardActivationInfo={simCardActivationInfo}
					verificationResponse={this.props.verificationResponse}
					verificationError={this.props.verificationError}
					simIccVerification={this.props.actions.simIccVerification}
					onClose={this.props.actions.onClose}
				/>
			);
		} else {
			return null;
		}
	}
}

export default ActivateSimCard;

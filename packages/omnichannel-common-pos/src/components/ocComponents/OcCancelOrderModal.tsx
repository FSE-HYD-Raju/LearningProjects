import OcNotificationModal from "./OcNotificationModal";
import classnames from "classnames";
import cssns from "../../utils/cssnsConfig";
import { get } from "lodash";
import { Component } from "react";
import OcModal from "./OcModal";
import messages from "./OcComponents.messages";
import { Order, OrderLifeCycleStatusEnum, Reason } from "../../redux/types";
import FormattedMessage from "../../channelUtils/FormattedMessage";
import { OcButton, OcButtonType } from "./button/OcButton";

const { React } = cssns("OcCancelOrderModal");

interface OcCancelOrderModalProps {
	itemName: string;
	order: Order;
	reasons: Reason[];
	cancelOrder: (orderId: string, reason: string) => void;
}

interface OcCancelOrderModalState {
	modalOpen: boolean;
	selectedReason: string;
	notificationModalOpen: boolean;
}

class OcCancelOrderModal extends Component<OcCancelOrderModalProps, OcCancelOrderModalState> {
	constructor(props: OcCancelOrderModalProps) {
		super(props);

		this.state = {
			modalOpen: false,
			selectedReason: "default",
			notificationModalOpen: false
		};
	}

	formatStatus(status: string): string {
		return status.toLowerCase();
	}

	toggleModal = (open: boolean): void => {
		this.setState({
			modalOpen: open
		});
	};

	toggleNotificationModal = (open: boolean): void => {
		this.setState({
			notificationModalOpen: open
		});
	};

	parseReasons = (reasons: Reason[]) => {
		return Array.isArray(reasons) ? reasons : get(reasons, "reasons", []);
	};

	makeReasonList(reasonArray: Reason[]): React.ReactNode {
		return reasonArray.map((reason, index) => {
			return (
				<option
					key={`state_change_reason_select_${this.props.order.id}_${index}`}
					value={reason.attributes ? reason.attributes.value : reason.value}
					id={reason.id}
				>
					{reason.attributes ? reason.attributes.name : reason.name}
				</option>
			);
		});
	}

	confirmCancellation = () => {
		this.props.cancelOrder(this.props.order.id, this.state.selectedReason);
		this.toggleModal(false);
		this.toggleNotificationModal(true);
	}

	selectReason = (selection: any) => {
		this.setState({
			selectedReason: selection.target.value
		});
	};

	getModalFooter = (): React.ReactNode => {
		return (
			<div className="modal-footer justify-content-between">
				<button
					id="oc-modal-cancel-button"
					onClick={() => this.toggleModal(false)}
					className="btn btn-outline-primary"
				>
					<FormattedMessage
						{...messages.abortOrderCancellationButton}
					/>
				</button>
				<button
					id="confirm-order-cancellation-button"
					className="btn btn-primary"
					type="submit"
					onClick={() => this.confirmCancellation()}
				>
					<FormattedMessage{...messages.confirmOrderCancellationButton}/>
				</button>
			</div>
		);
	};

	render() {
		const reasonArray = this.parseReasons(this.props.reasons);
		const { itemName, order } = this.props;
		const orderStatus = get(order, "attributes.status");
		const classes = classnames({
			buttonHidden: this.state.modalOpen
		});
		return (
			<div className="container">
				{this.props.order.attributes &&
				this.props.order.attributes.status !== OrderLifeCycleStatusEnum.CANCELED &&
				this.props.order.attributes.cancelable && (
					<OcButton
						outline={true}
						buttonType={OcButtonType.PRIMARY}
						id="cancel-order-button"
						className={classes}
						onClick={() => this.toggleModal(true)}
					>
						<FormattedMessage {...messages.orderCancelButton} />
					</OcButton>
				)}
				<OcModal
					showModal={this.state.modalOpen}
					onClose={() => this.toggleModal(false)}
					fitScreen={false}
					largeModal={true}
					title={<FormattedMessage {...messages.cancelOrderModalTitle} />}
					keyboard={true}
					customFooter={this.getModalFooter()}
				>
					<FormattedMessage
						{...messages.youreAboutToCancel}
						values={{ itemName }}
					/>
					<div className="reasons-block">
						<FormattedMessage {...messages.cancelReasonSelectLabel} />
						<select
							id={`cancel_order_reason_${order.id}`}
							className="custom-select"
							value={this.state.selectedReason}
							onChange={this.selectReason}
						>
							<option value="default" disabled={true}>
								<FormattedMessage
									{...messages.cancelReasonSelectDropdownPlaceholder}
								/>
							</option>
							{this.makeReasonList(reasonArray)}
						</select>
					</div>
				</OcModal>
				<OcNotificationModal
					show={this.state.notificationModalOpen}
					status={this.formatStatus(orderStatus)}
					onClose={() => this.toggleNotificationModal(false)}
				/>
			</div>
		);
	}
}

export default OcCancelOrderModal;
export { OcCancelOrderModalProps, OcCancelOrderModalState };

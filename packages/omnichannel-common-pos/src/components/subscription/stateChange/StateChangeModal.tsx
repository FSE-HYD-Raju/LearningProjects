import cssns from "../../../utils/cssnsConfig";
import OcModal from "../../ocComponents/OcModal";
import SubscriptionState from "../SubscriptionState";
import {
	ProductModificationCombined,
	Reason,
	ServiceModificationCombined,
} from "../../../redux/types";
import { PureComponent } from "react";
import { LifecycleChangeAction } from "../../../redux/types";
import serviceMessages from "./StateChange.messages";
import StateChangeModalConfirmation from "./StateChangeModalConfirmation";
import { CommonCustomizationPoints, withCustomization } from "../../../customization";
import { FormattedMessage } from "../../../channelUtils";

const { React } = cssns("StateChangeModal");

interface StateChangeModalActionProps {
	actions: {
		acceptStateTransition: (reason: string, paymentMethodId?: string) => void;
		initializeStateTransition: (reason?: string, paymentMethodId?: string) => void;
		cancelLifecycleStatusChange: (basketId: string) => void;
		resetStateModificationResult: () => void;
	};
}

interface StateChangeModalOwnProps {
	phoneNumber: string | undefined;
	requirePaymentMethodSelection: boolean;
	requireReasonSelect: boolean;
}

interface StateChangeModalStateProps {
	isAddon: boolean;
	reasons: Array<Reason>;
	modification?: ProductModificationCombined | ServiceModificationCombined;
	currency: string;
	name: string;
	description: string;
	resultTransition: string | undefined;
	phoneNumber?: string;
	transition: LifecycleChangeAction;
	shouldInitializeStateTransition: boolean;
}

type StateChangeModalProps = StateChangeModalStateProps & StateChangeModalActionProps & StateChangeModalOwnProps;

interface StateChangeModalState {
	selectedPaymentMethod?: string;
	selectedReason: string;
	initializeStarted?: boolean;
}

class StateChangeModal extends PureComponent<StateChangeModalProps, StateChangeModalState> {

	static defaultProps: Partial<StateChangeModalProps> = {
		requireReasonSelect: true
	};

	constructor(props: StateChangeModalProps) {
		super(props);
		this.state = {
			selectedReason: "default"
		};
	}

	componentDidMount() {
		if (this.isDisableModal() || (this.props.shouldInitializeStateTransition && !this.state.initializeStarted)) {
			this.props.actions.initializeStateTransition();
			this.setState({ initializeStarted: true });
		}
	}

	handleSelectReason = (reason: string) => {
		this.setState({ selectedReason: reason });

		if (this.props.modification && this.props.modification.basket && this.props.modification.basket.id) {
			this.props.actions.cancelLifecycleStatusChange(this.props.modification.basket.id);
		}

		if (reason !== "default") {
			this.props.actions.initializeStateTransition(reason, this.state.selectedPaymentMethod);
		}
	};

	handleSelectPaymentMethod = (paymentMethodId: string | undefined) => {
		this.setState({selectedPaymentMethod: paymentMethodId});
	};

	handleOkClick = () => {
		this.props.actions.acceptStateTransition(this.state.selectedReason, this.state.selectedPaymentMethod);
	};

	handleClose = () => {
		if (this.props.modification && this.props.modification.basket) {
			this.props.actions.cancelLifecycleStatusChange(this.props.modification.basket.id);
		}
		this.handleModalClose();
	};

	handleModalClose = () => {
		this.props.actions.resetStateModificationResult();
		this.setState({ initializeStarted: false });
	};

	isDisableModal = () => {
		const { transition } = this.props;
		return transition && transition.id === "disable";
	};

	renderResult = (resultTransition: string, serviceName: string) => {
		return (
			<OcModal
				showModal={true}
				smallModal={true}
				title={<FormattedMessage {...serviceMessages.purchaseSummary}/>}
				onClose={this.handleModalClose}
			>
				<div className="modal-content">
					<FormattedMessage
						{...serviceMessages.serviceIsNow}
						values={{
							serviceName: (serviceName || ""),
							stateTransition: (
								<span className="state-transition-name">
									<SubscriptionState state={resultTransition} past={true}/>
								</span>
							)
						}}
					/>
				</div>
			</OcModal>
		);
	};

	render() {
		const { name, description, resultTransition, transition, isAddon } = this.props;

		if (resultTransition) {
			return this.renderResult(resultTransition, name);
		} else {
			const stateTransitionCode = (transition.name || "").toLowerCase();

			return (
				<StateChangeModalConfirmation
					showDisable={this.isDisableModal()}
					isAddon={isAddon}
					stateTransitionCode={stateTransitionCode}
					modification={this.props.modification}
					selectedReason={this.state.selectedReason}
					phoneNumber={this.props.phoneNumber}
					requireReasonSelect={this.props.requireReasonSelect}
					name={name}
					description={description || ""}
					currency={this.props.currency}
					reasons={this.props.reasons}
					handleOkClick={this.handleOkClick}
					handleClose={this.handleClose}
					handleSelectReason={this.handleSelectReason}
					handleSelectPaymentMethod={this.handleSelectPaymentMethod}
					selectedPaymentMethod={this.state.selectedPaymentMethod}
				/>
			);
		}
	}
}

export default withCustomization<StateChangeModalProps>(CommonCustomizationPoints.STATE_CHANGE_MODAL, StateChangeModal);

export {
	StateChangeModal as StateChangeModalBaseline,
	StateChangeModalOwnProps,
	StateChangeModalActionProps,
	StateChangeModalStateProps,
	StateChangeModalProps,
	StateChangeModalState,
};

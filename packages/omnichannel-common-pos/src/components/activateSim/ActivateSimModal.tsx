import * as R from "react";
import FormattedMessage from "../../channelUtils/FormattedMessage";
import activateSimMessages from "./activateSim.messages";
import classnames from "classnames";
import OcModal from "../ocComponents/OcModal";
import SimExampleView from "./simExampleView/SimExampleView";
import { SimCardActivationInfo } from "./ActivateSimCard";
import cssns from "../../utils/cssnsConfig";
import { ContextType, contextTypesValidationMap } from "../../types";
import { SimIccVerification, SimIccVerificationAttributes } from "../../redux";
import { CommonCustomizationPoints, withCustomization } from "../../customization";

const React = cssns("ActivateSimModal").React as typeof R;

interface ActivateSimModalProps {
	simCardActivationInfo: SimCardActivationInfo[];
	show: boolean;
	closeModal: () => void;
	verificationResponse?: SimIccVerification;
	verificationError: boolean;
	simIccVerification: (payload: SimIccVerificationAttributes) => void;
}

interface ActivateSimModalState {
	value: string;
	error: boolean;
	buttonDisabled: boolean;
	showIccidAlert: boolean;
	showVerificationAlert: boolean;
	verifying: boolean;
}

const ERROR_RE = /^\d{0,5}$/;
const DISABLED_RE = /^\d{5}$/;

const initialState: ActivateSimModalState = {
	value: "",
	error: false,
	buttonDisabled: true,
	showIccidAlert: false,
	showVerificationAlert: false,
	verifying: false
};

class ActivateSimModal extends React.PureComponent<ActivateSimModalProps, ActivateSimModalState> {
	static contextTypes: React.ValidationMap<ContextType> = contextTypesValidationMap;

	constructor(props: ActivateSimModalProps, context: ContextType) {
		super(props, context);
		this.state = {
			...initialState
		};
	}

	componentWillReceiveProps(newProps: ActivateSimModalProps) {
		if (this.state.verifying) {
			const { verificationResponse, verificationError } = newProps;

			const errorResponse =
				verificationError || (verificationResponse && verificationResponse.attributes.result !== "Success");

			if (errorResponse) {
				this.setState({
					showVerificationAlert: true,
					verifying: false
				});
			} else {
				this.onClose();
			}
		}
	}

	handleChange = (e: any) => {
		this.setState({
			error: !ERROR_RE.test(e.target.value),
			buttonDisabled: !DISABLED_RE.test(e.target.value),
			value: e.target.value
		});
	};

	handleActivate = () => {
		const activationInfo = this.props.simCardActivationInfo.find(info => info.iccid.endsWith(this.state.value));
		if (activationInfo) {
			if (activationInfo.iccidVerification) {
				this.props.simIccVerification({
					iccid: activationInfo.iccid,
					orderRefId: activationInfo.orderReference,
					successFlag: true
				});
				this.setState({
					verifying: true,
					showIccidAlert: false,
					showVerificationAlert: false
				});
			} else {
				this.onClose();
				window.open(activationInfo.tocTocUrl, "_blank");
			}
		} else {
			this.setState({
				showIccidAlert: true
			});
		}
	};

	onClose = () => {
		this.setState({
			...initialState
		});
		this.props.closeModal();
	};

	public getMainForm() {
		const inputClasses = classnames({
			inputNormal: true,
			error: this.state.error
		});
		return (
			<>
				<div className="verification-block">
					<label htmlFor="iccid-digits" className="label">
						<FormattedMessage { ...activateSimMessages.lastFiveDigits } />
					</label>
					<input
						className={inputClasses}
						id="iccid-digits"
						name="iccid-digits"
						value={this.state.value}
						onChange={this.handleChange}
						placeholder= {this.context.intl.formatMessage({ ...activateSimMessages.iccidDigitsPlaceholder })}
					/>
				</div>
				<div className="sim-block">
					<SimExampleView />
				</div>
			</>
		);
	}

	getContent() {
		const { showIccidAlert, showVerificationAlert } = this.state;
		return (
			<div className="container">
				{this.getMainForm()}
				{(showIccidAlert || showVerificationAlert) && (
					<div className="error-alert">
						<i className="fa fa-exclamation-triangle" />
						<FormattedMessage
							{...(showIccidAlert
								? activateSimMessages.invalidIccidMessage
								: activateSimMessages.verificationErrorMessage)}
						/>
					</div>
				)}
			</div>
		);
	}

	render() {
		return (
			<OcModal
				className="ActivateSim"
				showModal={this.props.show}
				largeModal={true}
				title={<FormattedMessage {...activateSimMessages.activateSimButton} />}
				onClose={this.onClose}
				onOk={this.handleActivate}
				okDisabled={this.state.buttonDisabled}
				okButtonLabel={<FormattedMessage {...activateSimMessages.activate} />}
			>
				{this.getContent()}
			</OcModal>
		);
	}
}

export default withCustomization(CommonCustomizationPoints.ACTIVATE_SIM_MODAL, ActivateSimModal);

export { ActivateSimModal, ActivateSimModalProps, ActivateSimModalState };

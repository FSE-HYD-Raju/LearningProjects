import * as R from "react";
import cssns from "../../utils/cssnsConfig";
import messages from "./activateSim.messages";
import ActivateSimModal from "./ActivateSimModal";
import { SimCardActivationInfo } from "./ActivateSimCard";
import { SimIccVerification, SimIccVerificationAttributes } from "../../redux/types";
import FormattedMessage from "../../channelUtils/FormattedMessage";
import { OcButton, OcButtonType } from "../ocComponents";
const React: typeof R = cssns("ActivateSimBanner").React;

export interface ActivateSimBannerProps {
	name: string;
	simCardActivationInfo: SimCardActivationInfo[];
	verificationResponse?: SimIccVerification;
	verificationError: boolean;
	simIccVerification: (payload: SimIccVerificationAttributes) => void;
	onClose: () => void;
}

export interface ActivateSimBannerState {
	showModal: boolean;
}

class ActivateSimBanner extends (React as typeof R).PureComponent<ActivateSimBannerProps, ActivateSimBannerState> {
	constructor(props: ActivateSimBannerProps) {
		super(props);

		this.state = {
			showModal: false
		};
	}

	toggleModal = (show: boolean) => this.setState({ showModal: show });

	render() {
		return (
			<>
				<div className="container">
					<h3 className="header">
						<FormattedMessage {...messages.activateSimBannerHeader} values={{ name: this.props.name }} />
					</h3>
					<p className="message">
						<FormattedMessage {...messages.activateSimBannerMessage} />
					</p>
					<OcButton
						buttonType={OcButtonType.PRIMARY}
						id="activate-sim-button"
						onClick={() => this.toggleModal(true)}
					>
						<FormattedMessage {...messages.activateSimButton} />
					</OcButton>
				</div>
				<ActivateSimModal
					show={this.state.showModal}
					simCardActivationInfo={this.props.simCardActivationInfo}
					closeModal={() => {
						this.toggleModal(false);
						this.props.onClose();
					}}
					verificationResponse={this.props.verificationResponse}
					verificationError={this.props.verificationError}
					simIccVerification={this.props.simIccVerification}
				/>
			</>
		);
	}
}

export default ActivateSimBanner;

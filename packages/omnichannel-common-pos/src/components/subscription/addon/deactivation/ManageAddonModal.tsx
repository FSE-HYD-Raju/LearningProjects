import { Component } from "react";
import cssns from "../../../../utils/cssnsConfig";
import { CommercialEnrichmentNameEnum, Product } from "../../../../redux/types";
import { FormattedMessage } from "../../../../channelUtils";
import OcModal from "../../../ocComponents/OcModal";
import MsisdnUtil from "../../../../utils/MsisdnUtil";
import addonMessages from "../Addon.messages";
import ProductOfferingUtil from "../../../../utils/ProductOfferingUtil";

const { React } = cssns("ManageAddonModal");

interface ManageAddonModalStateProps {
	addon: Product;
	showModal: boolean;
	msisdn?: string;
}

interface ManageAddonModalActionProps {
	actions: {
		deactivateAddon: () => void;
		closeModal: () => void;
	};
}

type ManageAddonModalProps = ManageAddonModalStateProps & ManageAddonModalActionProps;

interface ManageAddonModalState {
	showConfirmationDisclaimer: boolean;
}

const initState: ManageAddonModalState = {
	showConfirmationDisclaimer: false,
};

class ManageAddonModal extends Component<ManageAddonModalProps, ManageAddonModalState> {
	constructor(props: ManageAddonModalProps) {
		super(props);

		this.state = {
			...initState,
		};
	}

	onCancel = () => {
		this.setState({
			...initState
		});
		this.props.actions.closeModal();
	};

	onConfirm = () => {
		const { showConfirmationDisclaimer } = this.state;

		if (showConfirmationDisclaimer) {
			this.props.actions.deactivateAddon();
			this.onCancel();
		} else {
			this.setState({
				showConfirmationDisclaimer: true
			});
		}
	};

	render() {
		const { addon } = this.props;
		const name = ProductOfferingUtil.getPOName(addon);
		const { showConfirmationDisclaimer } = this.state;
		const description = ProductOfferingUtil.getCommercialEnrichmentValueFromPO(addon, CommercialEnrichmentNameEnum.descriptions, "short-description");

		const msisdn = this.props.msisdn && MsisdnUtil.getMsisdnWithSeparatedAreaCode(this.props.msisdn);
		const okButtonLabel = showConfirmationDisclaimer ?
			<FormattedMessage {...addonMessages.deactivateConfirm} /> :
			<FormattedMessage {...addonMessages.deactivate} />;

		return (
			<OcModal
				showModal={this.props.showModal}
				smallModal={true}
				title={<FormattedMessage {...addonMessages.manageAddon} />}
				onClose={this.onCancel}
				className="this"
				okButtonLabel={okButtonLabel}
				onOk={this.onConfirm}
			>
				{(this.state.showConfirmationDisclaimer && (
					<div className="disclaimer">
						<i className="fab fa-exclamation-circle" />
						<FormattedMessage {...addonMessages.deactivateDisclaimerText} />
					</div>
				)) || (
					<div className="main-container">
						<div className="info-container">
							<div className="label">
								<FormattedMessage {...addonMessages.configurationMsisdn} />
							</div>
							<span className="phone-number">{msisdn}</span>
						</div>
						<div className="info-container new-section">
							<div className="label">
								<FormattedMessage {...addonMessages.configurationServiceName} />
							</div>
							<span className="name">{name}</span>
						</div>
						<div className="info-container">
							<div className="label">
								<FormattedMessage {...addonMessages.configurationDescription} />
							</div>
							<span className="description">{description}</span>
						</div>
					</div>
				)}
			</OcModal>
		);
	}
}

export default ManageAddonModal;

export {
	ManageAddonModalStateProps,
	ManageAddonModalActionProps,
	ManageAddonModalProps,
	ManageAddonModalState,
};

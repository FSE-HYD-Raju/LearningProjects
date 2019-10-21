import { FC } from "react";
import FormattedMessage from "../../channelUtils/FormattedMessage";
import cssns from "../../utils/cssnsConfig";
import messages from "./ChangeSim.messages";
import OcModal from "../ocComponents/OcModal";
import ocMessages from "../ocComponents/OcComponents.messages";

const { React } = cssns("ChangeSimConfirmationModal");

export interface ChangeSimConfirmationModalProps {
	showModal: boolean;
	closeModal: () => void;
	onConfirm: () => void;
}

const ChangeSimConfirmationModal: FC<ChangeSimConfirmationModalProps> = props => {
	return (
		<OcModal
			className="ChangeSimConfirmationModal"
			showModal={props.showModal}
			largeModal={true}
			title={<FormattedMessage {...messages.modalTitle} />}
			onClose={props.closeModal}
			okDisabled={false}
			onOk={props.onConfirm}
			okButtonLabel={<FormattedMessage {...ocMessages.modalConfirmButton} />}
		>
			<div className="info-header">
				<span className="exclamation-circle">
					<i className="fa fa-exclamation-circle" />
				</span>
				<FormattedMessage {...messages.confirmationMessage} />
			</div>
		</OcModal>
	);
};

export default ChangeSimConfirmationModal;

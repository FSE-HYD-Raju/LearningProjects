import { FC } from "react";
import FormattedMessage from "../../channelUtils/FormattedMessage";
import cssns from "../../utils/cssnsConfig";
import messages from "./RecurringTopUp.messages";
import OcModal from "../ocComponents/OcModal";

const { React } = cssns("RecurringTopUpNoPaymentMethodModal");

interface RecurringTopUpNoPaymentMethodModalProps {
	show: boolean;
	closeModal: () => void;
}

const RecurringTopUpNoPaymentMethodModal: FC<RecurringTopUpNoPaymentMethodModalProps> = props => {
	return (
		<OcModal
			className="RecurringTopUpNoPaymentMethodModal"
			showModal={props.show}
			largeModal={true}
			title={<FormattedMessage {...messages.addTopUp} />}
			onClose={props.closeModal}
		>
			<div className="info-header">
				<span className="exclamation-circle">
					<i className="fa fa-exclamation-circle" />
				</span>
				<FormattedMessage {...messages.cannotAddTopUp} />
			</div>
		</OcModal>
	);
};

export default RecurringTopUpNoPaymentMethodModal;
export { RecurringTopUpNoPaymentMethodModalProps };

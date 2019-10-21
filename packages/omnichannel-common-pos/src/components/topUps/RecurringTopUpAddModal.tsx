import * as R from "react";
import messages from "./RecurringTopUp.messages";
import FormattedMessage from "../../channelUtils/FormattedMessage";
import OcModal from "../ocComponents/OcModal";
import cssns from "../../utils/cssnsConfig";
import { RecurringTopUpModelType } from "../../redux/types/RecurringTopUpModelType";
import RecurringTopUpAddFormContainer from "./forms/RecurringTopUpAddFormContainer";

const React = cssns("RecurringTopUpAddModal").React as typeof R;

interface RecurringTopUpAddModalProps {
	show: boolean;
	closeModal: (basketHasBeenSubmitted: boolean) => void;
	initialModel: RecurringTopUpModelType;
}
class RecurringTopUpAddModal extends React.Component<RecurringTopUpAddModalProps> {
	render() {
		const { show, closeModal, initialModel } = this.props;
		return (
			<OcModal
				title={<FormattedMessage {...messages.addRecurringTopUpModalTitle} />}
				showModal={show}
				smallModal={true}
				onClose={() => closeModal(false)}
				noFooter={true}
			>
				<RecurringTopUpAddFormContainer topUpAmountPresetsPerRow={4} initialModel={initialModel} onClose={() => closeModal(false)} />
			</OcModal>
		);
	}
}

export { RecurringTopUpAddModalProps };
export default RecurringTopUpAddModal;

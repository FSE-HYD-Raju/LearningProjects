import * as R from "react";
import messages from "./RecurringTopUp.messages";
import FormattedMessage from "../../channelUtils/FormattedMessage";
import OcModal from "../ocComponents/OcModal";
import cssns from "../../utils/cssnsConfig";
import { RecurringTopUpModelType } from "../../redux/types/RecurringTopUpModelType";
import RecurringTopUpEditFormContainer from "./forms/RecurringTopUpEditFormContainer";

const React = cssns("RecurringTopUpEditModal").React as typeof R;

interface RecurringTopUpEditModalProps {
	show: boolean;
	closeModal: (basketHasBeenSubmitted: boolean) => void;
	initialModel: RecurringTopUpModelType;
}
class RecurringTopUpEditModal extends React.Component<RecurringTopUpEditModalProps> {
	render() {
		const { show, closeModal, initialModel } = this.props;
		return (
			<OcModal
				title={<FormattedMessage {...messages.editRecurringTopUpModalTitle} />}
				showModal={show}
				smallModal={true}
				onClose={() => closeModal(false)}
				noFooter={true}
			>
				<RecurringTopUpEditFormContainer topUpAmountPresetsPerRow={4} initialModel={initialModel} onClose={() => closeModal(false)} />
			</OcModal>
		);
	}
}

export { RecurringTopUpEditModalProps };
export default RecurringTopUpEditModal;

import * as React from "react";
import OcModal from "../../../ocComponents/OcModal";
import { Basket } from "../../../../redux/types";
import messages from "../Plans.messages";
import FormattedMessage from "../../../../channelUtils/FormattedMessage";

interface PlanChangeResultModalStateProps {
	paymentInfo?: {
		paymentErrorCode: string;
		paymentForm: string;
		paymentCompleted: boolean;
	};
	submittedBasket?: Basket;
}

interface PlanChangeResultModalActionProps {
	actions: {
		handleBack: () => void,
		handleClose: () => void,
	};
}

type PlanChangeResultModalProps = PlanChangeResultModalStateProps & PlanChangeResultModalActionProps;

const PlanChangeResultModal: React.FC<PlanChangeResultModalProps> = (props: PlanChangeResultModalProps) => {
	const { paymentInfo, submittedBasket } = props;
	const title = (<FormattedMessage {...messages.changeResult} />);

	return (
		<OcModal
			showModal={true}
			title={title}
			onClose={props.actions.handleClose}
			className="modal"
		>
			<div className="message-container">
				{submittedBasket || (paymentInfo && paymentInfo.paymentCompleted) ? (
					<FormattedMessage {...messages.purchaseSuccessful} />
				) : (
					<FormattedMessage {...messages.purchaseFailed} />
				)}
			</div>
		</OcModal>
	);
};

export default PlanChangeResultModal;
export {
	PlanChangeResultModalProps,
	PlanChangeResultModalStateProps,
	PlanChangeResultModalActionProps,
};

import changeSimModalMessages from "./ChangeSim.messages";
import { default as ChangeSimDeliverySelectionContainer } from "./ChangeSimDeliverySelectionContainer";
import cssns from "../../utils/cssnsConfig";
import FormattedMessage from "../../channelUtils/FormattedMessage";
import ChangeSimPaymentSelectionContainer from "./ChangeSimPaymentSelectionContainer";
import { default as ChangeSimFeeContainer } from "./ChangeSimFeeContainer";
import ChangeSimReasonSelectionContainer from "./ChangeSimReasonSelectionContainer";
import { ChangeSimServiceSubmitData } from "../../redux/services/ChangeSimService";
import OcFileAttachment from "../ocComponents/OcFileAttachment";
import { Component } from "react";
import OcModal from "../ocComponents/OcModal";
import ChangeSimConfirmationModal from "./ChangeSimConfirmationModal";

const { React } = cssns("ChangeSim");

interface ChangeSimModalStateProps {
	canProceed: boolean;
	submitData: ChangeSimServiceSubmitData | undefined;
	basketId: string | undefined;
	showPaymentSelection: boolean;
}

interface ChangeSimModalActionProps {
	actions: {
		onProceed: (submitData: ChangeSimServiceSubmitData) => void;
		onClose: (basketId?: string) => void;
	};
}

interface ChangeSimModalState {
	showConfirmationModal: boolean;
}

type ChangeSimModalProps = ChangeSimModalStateProps & ChangeSimModalActionProps;

class ChangeSimModal extends Component<ChangeSimModalProps, ChangeSimModalState> {
	private fileAttachmentsRef = React.createRef<OcFileAttachment>();

	constructor(props: ChangeSimModalProps) {
		super(props);
		this.state = {
			showConfirmationModal: false,
		};
	}

	getAttachmentFiles = (): File[] => {
		const fileAttachmentsComponent = this.fileAttachmentsRef.current;
		if (!fileAttachmentsComponent) {
			return [];
		}
		return fileAttachmentsComponent.getFiles();
	};
	onProceed = () => {
		if (this.props.submitData) {
			this.props.actions.onProceed({ ...this.props.submitData, caseAttachments: this.getAttachmentFiles() });
		}
	};

	getContent() {
		const { showPaymentSelection } = this.props;

		return (
			<div>
				<ChangeSimReasonSelectionContainer />
				<OcFileAttachment ref={this.fileAttachmentsRef} />
				<ChangeSimDeliverySelectionContainer />
				<ChangeSimFeeContainer />
				{showPaymentSelection && <ChangeSimPaymentSelectionContainer />}
			</div>
		);
	}

	onClickOrder = () => {
		this.setState({
			showConfirmationModal: true,
		});
	};

	onCloseModal = () => {
		this.props.actions.onClose(this.props.basketId);
	};

	onCloseConfirmationModal = () => {
		this.props.actions.onClose(this.props.basketId);
	};

	render() {
		return (
			<div>
				<OcModal
					className="ChangeSim"
					showModal={!this.state.showConfirmationModal}
					largeModal={true}
					title={<FormattedMessage {...changeSimModalMessages.modalTitle} />}
					onClose={this.onCloseModal}
					onOk={this.onClickOrder}
					okDisabled={!this.props.canProceed}
					okButtonLabel={<FormattedMessage {...changeSimModalMessages.orderButtonLabel} />}
				>
					{this.getContent()}
				</OcModal>
				{this.state.showConfirmationModal && (
					<ChangeSimConfirmationModal showModal={true} closeModal={this.onCloseConfirmationModal} onConfirm={this.onProceed} />
				)}
			</div>
		);
	}
}

export default ChangeSimModal;
export { ChangeSimModalProps, ChangeSimModalStateProps, ChangeSimModalActionProps };

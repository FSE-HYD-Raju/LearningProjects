import cssns from "../../utils/cssnsConfig";
import { FormattedMessage } from "../../channelUtils";
import OcFileAttachment from "../ocComponents/OcFileAttachment";
import OcModal from "../ocComponents/OcModal";
import OcSelect from "../ocComponents/OcSelect";
import { SupportCaseCategoryType, User } from "../../redux/types";
import { PureComponent, RefObject } from "react";
import messages from "./SupportRequest.messages";
import { CreateCustomerCasePayload } from "../../redux/models/support/support.types";
import { ContextType, contextTypesValidationMap } from "../../types";

const { React } = cssns("NewSupportCaseModal");

class NewSupportCaseModal extends PureComponent<NewSupportRequestProps, NewSupportCaseModalState> {
	static contextTypes = contextTypesValidationMap;
	private fileAttachmentsRef: RefObject<OcFileAttachment> = React.createRef<OcFileAttachment>();

	constructor(props: NewSupportRequestProps, context: ContextType) {
		super(props, context);
		this.state = {
			selectedCategoryId: "",
			descriptionValue: ""
		};
	}

	setSelectedCategoryId = (value: string) => {
		this.setState({
			selectedCategoryId: value
		});
	};

	cleanup = () => {
		this.setState({
			descriptionValue: "",
			selectedCategoryId: ""
		});
	};

	getAttachmentFiles = (): File[] => {
		const fileAttachmentsComponent = this.fileAttachmentsRef.current;
		if (!fileAttachmentsComponent) {
			return [];
		}
		return fileAttachmentsComponent.getFiles();
	};

	onSend = () => {
		if (!this.props.user) {
			return;
		}
		this.props.actions.postCustomerCase({
			actorId: this.props.user.id,
			description: this.state.descriptionValue,
			categoryId: this.state.selectedCategoryId,
			formattedName: this.props.user.attributes.formattedName,
			attachments: this.getAttachmentFiles()
		});
		this.props.actions.closeModal();
		this.cleanup();
	};

	setDescriptionValue = (value: string) => {
		this.setState({
			descriptionValue: value
		});
	};

	onCancel = () => {
		this.props.actions.closeModal();
		this.cleanup();
	};

	getOption = () => {
		return (
			this.props.supportCaseCategories &&
			this.props.supportCaseCategories.map((caseCategory: SupportCaseCategoryType) => {
				return (
					<option id={caseCategory.id} key={`category-option-${caseCategory.id}`} value={caseCategory.id}>
						{caseCategory.name}
					</option>
				);
			})
		);
	};

	render() {
		return (
			<OcModal
				showModal={this.props.showModal}
				largeModal={true}
				title={<FormattedMessage {...messages.newSupportRequest} />}
				onClose={this.onCancel}
				onOk={this.onSend}
				okButtonLabel={<FormattedMessage {...messages.supportSendButton} />}
				okDisabled={!this.state.selectedCategoryId || !this.state.descriptionValue}
			>
				<div className="support-case-modal-container">
					<div className="info-container">
						<div className="label">
							<FormattedMessage className="text-danger" {...messages.asteriskSign} />
						</div>
						<div className="content-side">
							<div className="content">
								<OcSelect
									value={this.state.selectedCategoryId}
									onChange={(event: any) => this.setSelectedCategoryId(event.target.value)}
								>
									<option key="category_0" value="" id="select-case-category-empty" disabled={true}>
										{this.context.intl.formatMessage({...messages.chooseRequestCategory})}
									</option>
									{this.getOption()}
								</OcSelect>
							</div>
						</div>
					</div>
					<div className="info-container">
						<div className="label">
							<FormattedMessage {...messages.supportDescriptionRequest} />
							<FormattedMessage className="text-danger" {...messages.asteriskSign} />
						</div>
						<div className="content description-margin">
							<textarea
								className="content form-control"
								id="support-requests-text-area"
								value={this.state.descriptionValue}
								onChange={(event: any) => this.setDescriptionValue(event.target.value)}
							/>
						</div>
					</div>
					<OcFileAttachment maxFiles={3} ref={this.fileAttachmentsRef} />
				</div>
			</OcModal>
		);
	}
}

export interface NewSupportCaseModalActionProps {
	actions: {
		closeModal: () => void;
		postCustomerCase: (customerCase: CreateCustomerCasePayload) => void;
	};
}

export interface NewSupportCaseModalProps {
	showModal?: boolean;
	supportCaseCategories: Array<SupportCaseCategoryType>;
	user?: User;
}

export interface NewSupportCaseModalState {
	selectedCategoryId: string;
	descriptionValue: string;
}

export type NewSupportRequestProps = NewSupportCaseModalProps & NewSupportCaseModalActionProps;
export default NewSupportCaseModal;

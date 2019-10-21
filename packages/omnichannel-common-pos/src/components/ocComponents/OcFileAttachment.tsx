import * as R from "react";
import FormattedMessage from "../../channelUtils/FormattedMessage";
import cssns from "../../utils/cssnsConfig";
import { contextTypesValidationMap, ContextType } from "../../types/ContextType";
import messages from "./ocFileAttachment.messages";
import { OcButton, OcButtonType } from "./button/OcButton";
const React = cssns("OcFileAttachment").React as typeof R;

interface OcFileAttachmentProps {
	maxFiles?: number;
}
interface OcFileAttachmentState {
	files: Array<File>;
	disabled: boolean;
}

class OcFileAttachment extends (React as typeof R).Component<OcFileAttachmentProps, OcFileAttachmentState> {
	static contextTypes = contextTypesValidationMap;

	static defaultProps = {
		maxFiles: 1,
	};

	constructor(props: OcFileAttachmentProps, context: ContextType) {
		super(props, context);
		this.state = {
			files: [],
			disabled: false,
		};
	}

	validateFileSize = (files: Array<File>) => {
		return files.filter((file: File) => {
			return file.size <= 20971520;
		});
	};
	getFiles(): File[] {
		return this.state.files;
	}

	handleFileUpload = (event: any) => {
		const uploadedFiles: Array<File> = Array.from(event.target.files);
		const maxFiles = this.props.maxFiles!;
		event.target.value = "";
		this.setState(({ files }) => {
			const newFiles = files.length >= maxFiles ? files : files.concat(uploadedFiles);
			const validatedFiles = this.validateFileSize(newFiles);
			return {
				files: validatedFiles,
				disabled: validatedFiles.length >= maxFiles,
			};
		});
	};

	handleFileDelete = (passedIndex: number) => {
		this.setState(({ files }) => {
			const updatedFiles = files.filter((file, index) => index !== passedIndex);
			const maxFiles = this.props.maxFiles!;
			return {
				files: updatedFiles,
				disabled: updatedFiles.length >= maxFiles,
			};
		});
	};

	renderFileList = (files: Array<File>) => {
		return files.map((file: File, index: number) => {
			return (
				<div key={index} className="file-uploaded">
					<span className="file-name">{file.name}</span>
					<OcButton
						buttonType={OcButtonType.LINK}
						id="OcFileAttachment-delete-btn"
						htmlBtnType="button"
						onClick={() => this.handleFileDelete(index)}
					>
						<i className="fas fa-times" />
					</OcButton>
				</div>
			);
		});
	};

	renderAttachmentHint = (maxFiles: OcFileAttachmentProps["maxFiles"]) => {
		return this.context.intl.formatMessage(messages.fileAttachmentHintMessage, { maxFiles });
	};

	render() {
		return (
			<div className="container">
				<div className="label">
					<FormattedMessage {...messages.fileAttachmentInputLabel} />
				</div>
				<div className="data">
					<div className="file-list" id="OcFileAttachment-files-uploaded-list">
						{this.renderFileList(this.state.files)}
					</div>
					<form className="file-form">
						<input
							disabled={this.state.disabled}
							className="OcFileAttachment-hidden-input"
							id="OcFileAttachment-fileItem"
							type="file"
							onChange={this.handleFileUpload}
						/>
						<OcButton
							buttonType={OcButtonType.LINK}
							className="attach-file-btn"
							id="OcFileAttachment-fileItem-btn"
							htmlBtnType="button"
							disabled={this.state.disabled}
						>
							<FormattedMessage {...messages.fileAttachmentAttachFileBtnLabel} />
						</OcButton>
						<div className="attachment-hint">{this.renderAttachmentHint(this.props.maxFiles)}</div>
					</form>
				</div>
			</div>
		);
	}
}

export default OcFileAttachment;
export { OcFileAttachmentProps, OcFileAttachmentState };

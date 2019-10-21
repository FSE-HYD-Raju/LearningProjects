import * as R from "react";
import cssns from "../../utils/cssnsConfig";
import { contextTypesValidationMap, ContextType } from "../../types/ContextType";
import classNames from "classnames";
const React = cssns("OcFileUpload").React as typeof R;
const DropZone = require("react-dropzone");
import { FormattedMessage, FormattedMessageDescriptor } from "../../channelUtils";
import messages from "./ocFileUpload.messages";

interface OcFileUploadProps {
	children: React.ReactElement<any>;
	className?: string;
	successMessage?: FormattedMessageDescriptor;
	failureMessage?: FormattedMessageDescriptor;
	action: (files: Array<File>, isVerified: boolean | undefined) => void;
	acceptedFileTypes: Array<string>;
	acceptMultipleFiles?: boolean;
}
interface OcFileUploadState {
	files: Array<File>;
	isFileValidated: boolean;
}

class OcFileUpload extends (React as typeof R).Component<OcFileUploadProps, OcFileUploadState> {
	static contextTypes = contextTypesValidationMap;

	defaultProps = {
		children: []
	};

	constructor(props: OcFileUploadProps, context: ContextType) {
		super(props, context);
		this.state = {
			files: [],
			isFileValidated: false
		  };
	}

	 validateFile = (files: any[]) => {
		const { acceptedFileTypes } = this.props;
		if (files && files.length > 0) {
			const file = files[0];
			const fileType = file.type;
			if (acceptedFileTypes.length > 0 && !acceptedFileTypes.includes(fileType)) {
			    return false;
			}
			return true;
		}
		return true;
	}

	handleFilesUpload = (files: any[], rejectedFiles: any) => {
		if (rejectedFiles && rejectedFiles.length > 0) {
		    this.validateFile(rejectedFiles);
		}
		if (files && files.length > 0) {
			const isFileValidated = this.validateFile(files);
			this.setState({
				files,
				isFileValidated
			});
		this.props.action(files, isFileValidated);
		}
	}

	removeUploadedFile = () => {
		this.setState({
			files: [],
			isFileValidated: false
		});
		this.props.action([], false);
	}

	renderFileDetails() {
			const { failureMessage, successMessage } = this.props;
			const { files, isFileValidated } = this.state;
			if (!files.length) {
				return null;
			}
			const file = files[0];

			return (
				<div className="file-details">
					<span className={isFileValidated ? "text-success" : ""}>{file.name}</span>
					<i className="far fa-trash-alt trash-icon" onClick = {this.removeUploadedFile}/>
					{!isFileValidated &&
					(<h6 className="text-failed">
							<FormattedMessage {...failureMessage || messages.paymentSummaryUploadFileFailed} />
					</h6>)}
					{isFileValidated && successMessage &&
					(<h6 className="text-success">
							<FormattedMessage {...successMessage || messages.paymentSummaryUploadFileSuccess} />
					</h6>)}
				</div>
			);
	}

	render() {
		const { children, className, acceptMultipleFiles, acceptedFileTypes } = this.props;
		return (
			<div>
				<DropZone
					onDrop={this.handleFilesUpload}
					className={classNames("file-dropzone", className)}
					multiple={acceptMultipleFiles || false}
					accept={acceptedFileTypes}
				>
					{children}
				</DropZone>
				{this.renderFileDetails()}
			</div>
		);
	}
}

export default OcFileUpload;
export { OcFileUploadProps, OcFileUploadState };

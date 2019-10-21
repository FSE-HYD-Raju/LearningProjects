import {
	cssns,
	FormattedMessage,
	OcButton,
	OcButtonType,
} from "omnichannel-common-pos";
import { Component } from "react";
import messages from "../posMessages";

const { React } = cssns("POSDigitalSignature");

interface DigitalSignatureMapProps {
	documentId: string;
	documentFailed: boolean;
	documentSignedStatus: boolean;
	documentSigned: boolean;
	digitalSignatureTemplateId: string;
	activeBasketId: string | undefined;
	activeBasketReference: string | undefined;
	userIndividualId: string | undefined;
	customerCaseId: string | undefined;
}

interface DigitalSignaturePayload {
	digitalSignatureTemplateId: string;
	activeBasketId: string | undefined;
	userIndividualId: string | undefined;
	customerCaseId: string | undefined;
	activeBasketReference: string | undefined;
}

interface DigitalSignatureContainerActionProps {
	actions: {
		generateDocument: (data: DigitalSignaturePayload) => void;
		getGeneratedDocumentSignedStatus: (id: string) => void;
		resetGenerateDocument: () => void;
    };
}
type DigitalSignatureProps = DigitalSignatureMapProps & DigitalSignatureContainerActionProps;

class POSDigitalSignature extends Component<DigitalSignatureProps> {
	componentWillUnmount() {
		this.props.actions.resetGenerateDocument();
	}

	createDocument =  () => {
		const digitalSignatureTemplateId = this.props.digitalSignatureTemplateId;
		const activeBasketId = this.props.activeBasketId;
		const userIndividualId = this.props.userIndividualId;
		const customerCaseId = this.props.customerCaseId;
		const activeBasketReference = this.props.activeBasketReference;
		const data = {
			digitalSignatureTemplateId,
			activeBasketId,
			userIndividualId,
			customerCaseId,
			activeBasketReference
		};
		this.props.actions.generateDocument(data);
	};

	checkGeneratedDocumentSignedStatus =  (): void => {
		const documentId =  this.props.documentId;
		this.props.actions.getGeneratedDocumentSignedStatus(documentId);
	};

 	render() {
		const generatedDocumentId =  this.props.documentId;
		const generateDocumentFailed = this.props.documentFailed;

        return (
			<div className="container">
				<div className="container-btn">
					<div>
						<OcButton
							id="button"
							onClick={this.createDocument}
							buttonType={OcButtonType.PRIMARY}
							htmlBtnType="submit"
							disabled={!!this.props.documentId}
						>
							<FormattedMessage {...messages.createForm} />
						</OcButton>
					</div>
					{generatedDocumentId &&
						<div className="text-success message">
							<FormattedMessage {...messages.successGenerate} />
						</div>
					}
					{generateDocumentFailed &&
						<div className="text-failed message">
							<FormattedMessage {...messages.failedGenerateCheckstatus} />
						</div>
					}
				</div>
				<div className="container-btn">
					{generatedDocumentId &&
						<div>
							<OcButton
								id="button"
								onClick={this.checkGeneratedDocumentSignedStatus}
								buttonType={OcButtonType.PRIMARY}
								htmlBtnType="submit"
								disabled = {this.props.documentSignedStatus && this.props.documentSigned}
							>
								<FormattedMessage {...messages.successGenerateCheckStatus} />
							</OcButton>
						</div>
					}
					{this.props.documentSignedStatus && !this.props.documentSigned &&
						<div className="text-failed message">
							<FormattedMessage {...messages.documentYetSigned} />
						</div>
					}
					{this.props.documentSignedStatus && this.props.documentSigned &&
						<div className="text-success message">
							<FormattedMessage {...messages.documentSigned} />
						</div>
					}
				</div>
			</div>
		);
	}
}

 export {
	DigitalSignatureProps,
	DigitalSignatureMapProps,
	DigitalSignatureContainerActionProps,
	DigitalSignaturePayload
 };
export default POSDigitalSignature;

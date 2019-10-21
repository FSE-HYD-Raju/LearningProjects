import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { get } from "lodash"
import { AppState, actions } from "omnichannel-common-pos";

import {
	DigitalSignatureContainerActionProps,
	DigitalSignatureMapProps,
	DigitalSignaturePayload,
	default as POSDigitalSignature
} from "./POSDigitalSignature";

 const mapStateToProps = (state: AppState): DigitalSignatureMapProps  => {
	 const userIndividualId = get(state.customerCase, "activeCustomerCase.attributes.activeCustomer.id");
	 const activeBasketId = get(state.basket.activeBasket, "id");
	 const activeBasketReference = get(state.basket.activeBasket, "attributes.referenceNumber");
	 return {
		documentId: state.document.id,
		documentFailed: state.document.documentFailed,
		documentSignedStatus: state.document.signedStatus,
		documentSigned: state.document.signed,
		digitalSignatureTemplateId: state.feature.digitalSignatureTemplateId,
		activeBasketId,
		activeBasketReference,
		userIndividualId,
		customerCaseId: state.customerCase.customerAccountId,
	 };
 };

 const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DigitalSignatureContainerActionProps => {
	return {
		actions: {
			generateDocument: (data: DigitalSignaturePayload) => dispatch(actions.document.generateDocument(data)),
			getGeneratedDocumentSignedStatus: (id: string) => dispatch(actions.document.getGeneratedDocumentSignedStatus(id)),
			resetGenerateDocument: () => dispatch(actions.document.resetGenerateDocument()),
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(POSDigitalSignature);


import { BasketItem, Document } from "../../types";
import { DocumentActionPayload, DocumentActions } from "./document.actions";
import { getNewDocument } from "./document.utils";
import { get } from "lodash";

export interface DocumentState {
	documents: Record<string, Document>;
	id: string;
	isAvailableForNextStep: boolean;
	documentFailed: boolean;
	signed: boolean;
	signedStatus: boolean;
	uploadSuccess: boolean;
	uploadFailed: boolean;
}

const initialState = {
	isAvailableForNextStep: false,
	documentFailed: false,
	signedStatus: false,
	uploadFailed: false,
	uploadSuccess: false,
};

const documentReducer = (state: Partial<DocumentState> = initialState, action: DocumentActionPayload) => {
	const { type } = action;
	switch (type) {
		case DocumentActions.FLUX_SYNC:
			return { ...state, ...action.fluxState };
		case DocumentActions.GET_DOCUMENT:
			const newDocument = getNewDocument(action.documentId);
			return { ...state, documents: { ...state.documents, [action.documentId]: newDocument } };
		case DocumentActions.GENERATE_DOCUMENT_COMPLETE:
			return { ...state, id: action.generateDocumentResponse.id };
		case DocumentActions.GENERATE_DOCUMENT_FAILED:
			return { ...state, documentFailed: true };
		case DocumentActions.GENERATE_DOCUMENT_SIGNED_STATUS_COMPLETE:
			const isAvailableForNextStep = DocumentsUtils.isAvailableForNextStep({
				basketItems: action.basketItems,
				showDigitalSignature: action.showDigitalSignature,
				signed: get(action.generateDocumentResponse, "attributes.signed")
			});
			return {
				...state,
				signed: get(action.generateDocumentResponse, "attributes.signed"),
				isAvailableForNextStep,
				signedStatus: true
			};
		case DocumentActions.RESET_GENERATE_DOCUMENT:
			return {
				...state,
				id: "",
				signedStatus: false,
				documentFailed: false,
				signed: false
			};
		case DocumentActions.UPLOAD_DOCUMENT_COMPLETE:
			return {
				...state,
				uploadSuccess: true,
				id: action.documentId,
				uploadFailed: false
			};
		case DocumentActions.UPLOAD_DOCUMENT_FAILED:
			return {
				...state,
				uploadFailed: true,
				uploadSuccess: false
			};
		case DocumentActions.RESET_UPLOAD_DOCUMENT_FAILED:
			return {
				...state,
				uploadFailed: initialState.uploadFailed,
			};
		case DocumentActions.RESET_UPLOAD_DOCUMENT:
			return {
				...initialState,
			};
		default:
			return state;
	}
};

export default documentReducer;

interface DocumentConfig {
	basketItems: Array<BasketItem> | undefined;
	signed: boolean;
	showDigitalSignature: boolean | undefined;
}

class DocumentsUtils {
	static isAvailableForNextStep = (config: DocumentConfig) => {
		const { showDigitalSignature, basketItems, signed } = config;
		const documentGenerateButtonState = basketItems && basketItems.find(basketItem => {
			const childBasketItems = get(basketItem, "attributes.childBasketItems", []);
			return childBasketItems.find((childBasketItem: Array<object>) =>
				get(childBasketItem, "inputtedCharacteristics.CH_PortInNumberResource", false));
		});
		return (showDigitalSignature && documentGenerateButtonState && signed);
	};
}

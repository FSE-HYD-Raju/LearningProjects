"use strict";

import { Action } from "redux";
import { BasketItem, CreateDocumentPayload, Document } from "../../types";

export enum DocumentActions {
	FLUX_SYNC = "Document_FLUX_SYNC",
	GET_DOCUMENT = "Document_GET_DOCUMENT",
	GENERATE_DOCUMENT = "Document_GENERATE_DOCUMENT",
	GENERATE_DOCUMENT_COMPLETE = "Document_GENERATE_DOCUMENT_COMPLETE",
	GENERATE_DOCUMENT_FAILED = "Document_GENERATE_DOCUMENT_FAILED",
	GENERATE_DOCUMENT_SIGNED_STATUS = "Document_GENERATE_DOCUMENT_SIGNED_STATUS",
	GENERATE_DOCUMENT_SIGNED_STATUS_COMPLETE = "Document_GENERATE_DOCUMENT_SIGNED_STATUS_COMPLETE",
	RESET_GENERATE_DOCUMENT = "Document_RESET_GENERATE_DOCUMENT",
	UPLOAD_DOCUMENT = "Document_UPLOAD_DOCUMENT",
	UPLOAD_DOCUMENT_COMPLETE = "Document_UPLOAD_DOCUMENT_COMPLETE",
	UPLOAD_DOCUMENT_FAILED = "Document_UPLOAD_DOCUMENT_FAILED",
	RESET_UPLOAD_DOCUMENT_FAILED = "Document_RESET_UPLOAD_DOCUMENT_FAILED",
	RESET_UPLOAD_DOCUMENT = "Document_RESET_UPLOAD_DOCUMENT",
}

export interface DocumentActionPayload extends Action<DocumentActions> {
	fluxState?: any;
	error?: string;
	documentId: string;
	digitalSignatureTemplateId: string;
	activeBasketId: string | undefined;
	userIndividualId: string | undefined;
	customerCaseId: string | undefined;
	activeBasketReference: string | undefined;
	uuid: string;
	createDocumentData: CreateDocumentPayload;
	generateDocumentResponse: Document;
	basketItems?: Array<BasketItem>;
	showDigitalSignature?: boolean;
	uploadDocumentFile: File;
	documentDetails: Document;
}

export const document = {
	fluxSync: (fluxState: any) => ({ type: DocumentActions.FLUX_SYNC, fluxState }),
	getDocument: (documentId: string) => ({ type: DocumentActions.GET_DOCUMENT, documentId }),
	generateDocument: (createDocumentData?: CreateDocumentPayload | undefined) =>
		({
			type: DocumentActions.GENERATE_DOCUMENT,
			createDocumentData
		}),
	generateDocumentComplete: (generateDocumentResponse: Document) =>
		({
			type: DocumentActions.GENERATE_DOCUMENT_COMPLETE,
			generateDocumentResponse
		}),
	generateDocumentFailed: (error: any) =>
		({
			type: DocumentActions.GENERATE_DOCUMENT_FAILED,
			error
		}),
	getGeneratedDocumentSignedStatus: (uuid?: string) =>
		({
			type: DocumentActions.GENERATE_DOCUMENT_SIGNED_STATUS,
			uuid
		}),
	generateDocumentSignedStatusComplete: (
		generateDocumentResponse: Document,
		basketItems: Array<BasketItem>,
		showDigitalSignature: boolean) =>
		({
			type: DocumentActions.GENERATE_DOCUMENT_SIGNED_STATUS_COMPLETE,
			generateDocumentResponse,
			basketItems,
			showDigitalSignature
		}),
	resetGenerateDocument: () => ({ type: DocumentActions.RESET_GENERATE_DOCUMENT }),
	uploadDocument: (
		uploadDocumentFile: File, customerCaseId: string) =>
		({
			type: DocumentActions.UPLOAD_DOCUMENT,
			uploadDocumentFile, customerCaseId
		}),
	uploadDocumentComplete: (documentDetails: Document) =>
		({
			type: DocumentActions.UPLOAD_DOCUMENT_COMPLETE,
			documentId: documentDetails.id
		}),
	uploadDocumentFailed: (error: any) => ({
		type: DocumentActions.UPLOAD_DOCUMENT_FAILED,
		error
	}),
	resetUploadDocumentFailed: () => ({
		type: DocumentActions.RESET_UPLOAD_DOCUMENT_FAILED,
	}),
	resetUploadDocument: () => ({
		type: DocumentActions.RESET_UPLOAD_DOCUMENT,
	}),
};

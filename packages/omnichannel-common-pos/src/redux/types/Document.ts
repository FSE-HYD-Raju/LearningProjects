import { HasId } from "./index";

interface File {
	url: string;
	filename: string;
	filetype: string;
}

interface Document extends HasId, DocumentAttributes {
	files: Array<File>;
	attributes?: DocumentAttributes;
}

interface  CreateDocumentPayload {
	digitalSignatureTemplateId: string;
	activeBasketId: string | undefined;
	userIndividualId: string | undefined;
	customerCaseId: string | undefined;
	activeBasketReference: string | undefined;
}

interface DocumentAttributes {
	name: string;
	size: string;
	type: string;
	downloadUrl?: string;
	signed: boolean;
}

export {
	File,
	Document,
	CreateDocumentPayload,
	DocumentAttributes
};

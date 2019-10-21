import type { DocumentType } from "./DocumentType";

declare type DocumentStoreType = {// eslint-disable-line
	documents: { [documentId: string]: DocumentType }
};

export {
	DocumentStoreType
};

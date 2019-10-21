export interface ImageType {
	attributes?: {
		commercialEnrichments?: Array<HasMedia>
	};
	commercialEnrichments?: Array<HasMedia>;
}

export interface HasMedia {
	media: string;
}

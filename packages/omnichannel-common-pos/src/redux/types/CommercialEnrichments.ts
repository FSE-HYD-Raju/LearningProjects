interface CommercialEnrichments {
	conditions: Record<string, string>;
	descriptions: Record<string, string>;
	media: Record<string, string>;
	names: Record<string, string>;
	language?: string;
}

const CommercialEnrichmentKeys = {
	MEDIA: "media",
	Media: {
		THUMBNAIL_IMAGE: "thumbnail-image"
	}
};

export { CommercialEnrichments, CommercialEnrichmentKeys };

enum CommercialEnrichmentNameEnum {
	conditions = "conditions",
	descriptions = "descriptions",
	media = "media",
	names = "names",
}

type CommercialEnrichmentName = keyof typeof CommercialEnrichmentNameEnum;

export { CommercialEnrichmentNameEnum, CommercialEnrichmentName };

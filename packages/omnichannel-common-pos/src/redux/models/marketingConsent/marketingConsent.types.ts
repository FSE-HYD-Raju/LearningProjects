interface MarketingConsentFormModel {
	[key: string]: boolean;
    ownMarketing: boolean;
    thirdPartyMarketing: boolean;
    geoLocalization: boolean;
    profiling: boolean;
    thirdPartyEnrichment: boolean;
    thirdPartyTransfer: boolean;
}

interface MarketingConsentCharacteristics {
    [key: string]: boolean;
    CH_MCP_Own_Marketing: boolean;
    CH_MCP_3rd_Party_Marketing: boolean;
    CH_MCP_Geo_Localization: boolean;
    CH_MCP_Profiling: boolean;
    CH_MCP_3rd_Party_Enrichment: boolean;
    CH_MCP_3rd_Party_Transfer: boolean;
}

type MarketingConsentState = {
	marketingConsentFormModel: MarketingConsentFormModel,
	marketingConsentCHModel: MarketingConsentCharacteristics,
    showAll: boolean,
    acceptAll: boolean
};

export {
    MarketingConsentFormModel,
	MarketingConsentCharacteristics,
	MarketingConsentState
};

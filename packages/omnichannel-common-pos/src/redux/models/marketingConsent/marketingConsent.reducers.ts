"use strict";

import { MarketingConsentActions, MarketingConsentActionPayload } from "./marketingConsent.actions";
import { MarketingConsentState } from "./marketingConsent.types";

export { MarketingConsentState } from "./marketingConsent.types";

const initialState = {
	marketingConsentFormModel: {
		ownMarketing: false,
		thirdPartyMarketing: false,
        geoLocalization: false,
        profiling: false,
		thirdPartyEnrichment: false,
		thirdPartyTransfer: false
	},
	marketingConsentCHModel: {
        CH_MCP_Own_Marketing: false,
        CH_MCP_3rd_Party_Marketing: false,
        CH_MCP_Geo_Localization: false,
        CH_MCP_Profiling: false,
        CH_MCP_3rd_Party_Enrichment: false,
        CH_MCP_3rd_Party_Transfer: false,
    },
    showAll: false,
    acceptAll: false
};

const marketingConsentReducer = (state: Partial<MarketingConsentState> = initialState, action: MarketingConsentActionPayload) => {
	const { type } = action;
	switch (type) {
		case MarketingConsentActions.SET_MARKETING_CONSENT_FORM_MODEL:
			return {
				...state,
				marketingConsentFormModel: action.marketingConsentFormModel
			};
		case MarketingConsentActions.SET_MARKETING_CONSENT_CH_MODEL:
			return {
				...state,
				marketingConsentCHModel: action.marketingConsentCHModel
			};
		case MarketingConsentActions.SET_SHOW_ALL:
			return {
				...state,
				showAll: action.showAll
            };
        case MarketingConsentActions.SET_ACCEPT_ALL:
			return {
				...state,
                acceptAll: action.acceptAll
			};

		default:
			return state;
	}
};

export default marketingConsentReducer;

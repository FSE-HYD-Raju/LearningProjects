"use strict";

import { Action } from "redux";
import { MarketingConsentFormModel, MarketingConsentCharacteristics } from "./marketingConsent.types";

export enum MarketingConsentActions {
    SET_MARKETING_CONSENT_FORM_MODEL = "Basket_SET_MARKETING_CONSENT_FORM_MODEL",

    SET_MARKETING_CONSENT_CH_MODEL = "Basket_SET_MARKETING_CONSENT_CH_MODEL",

    SET_SHOW_ALL = "Basket_SET_SHOW_ALL",

    SET_ACCEPT_ALL = "Basket_SET_ACCEPT_ALL"
}

export interface MarketingConsentActionPayload extends Action<MarketingConsentActions> {
    marketingConsentFormModel?: MarketingConsentFormModel;
    marketingConsentCHModel?: MarketingConsentCharacteristics;
    showAll?: boolean;
    acceptAll?: boolean;
}

export const marketingConsent = {
    setMarketingConsentFormModel: (marketingConsentFormModel: MarketingConsentFormModel) => (
        {type: MarketingConsentActions.SET_MARKETING_CONSENT_FORM_MODEL, marketingConsentFormModel}
    ),
    setMarketingConsentCHModel: (marketingConsentCHModel: MarketingConsentCharacteristics) => (
        {type: MarketingConsentActions.SET_MARKETING_CONSENT_CH_MODEL, marketingConsentCHModel}
    ),
    setShowAll: (showAll: boolean) => ({type: MarketingConsentActions.SET_SHOW_ALL, showAll}),
    setAcceptAll: (acceptAll: boolean) => ({type: MarketingConsentActions.SET_ACCEPT_ALL, acceptAll})
};

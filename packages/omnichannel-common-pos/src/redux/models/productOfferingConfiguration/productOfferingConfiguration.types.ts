"use strict";

import { ProductOffering, Configurations, Msisdn, SimCard, MsisdnSofReservationInfo } from "../../types";

// TODO: should probably have another name
interface NominationType {
	msisdn?: Msisdn;
	sim?: SimCard;
	number?: number;
	productOffering?: ProductOffering;
	nominationSearchStarted: boolean;
}

type ProductOfferingConfigurationState = {
	configurations: Configurations;
	configurableInstallationTime: object;
	msisdnSoftReservation: MsisdnSofReservationInfo | undefined;
	characteristicsConfigurationContext?: any;
	nominationSubscriptionInformation: Record<string, NominationType>;
	synchronizeEnhancedCharacteristics: boolean;
};

interface ProductOfferingsConfigObject {
	id: string;
	inputtedCharacteristics: Record<string, string>;
	enhancedCharacteristics: Record<string, Array<{value: string}> | Array<string>>;
	productOfferings: Array<ProductOfferingsConfigObject | ProductOffering>;
	productOfferingGroups: Array<ProductOfferingsConfigObject | ProductOffering>;
	optionalProductOfferings: Array<ProductOfferingsConfigObject | ProductOffering>;
	selected?: boolean;
}

interface NominationSearchResult {
	sim?: SimCard;
	msisdn?: Msisdn;
	associatedWith?: string;
	productOfferingId?: string;
}

export {
	ProductOfferingConfigurationState,
	NominationType,
	ProductOfferingsConfigObject,
	NominationSearchResult,
};

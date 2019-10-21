"use strict";

export type PosCheckoutState = {
	showPOSDeliveryModal: boolean;
	POSDefaultStore?: object;
	POSDeliveryType: string;
	POSDeliveryMethodId: string;
	customerDetailsConfirmationStatus: string;
	installationAddressDefaultLocationType: string;
	privacyConsentId: string;
};

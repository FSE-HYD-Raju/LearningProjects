"use strict";

import { get } from "lodash";
import { ConsulValues } from "../consul/consul.types";
import { PosCheckoutState } from "./posCheckout.types";
import { getValue } from "../../utils";

function extractValues(payload: ConsulValues, state: Partial<PosCheckoutState>): Partial<PosCheckoutState> {

	const installationAddressDefaultLocationType = getValue(get(payload, "features/installation-address/default_location_type"), state.installationAddressDefaultLocationType);
	const privacyConsentId = getValue(get(payload, "features/customer_privacy_consent/privacy_consent_id"), state.privacyConsentId);
	return {
		installationAddressDefaultLocationType,
		privacyConsentId,
	} as Partial<PosCheckoutState>;
}

export { extractValues };

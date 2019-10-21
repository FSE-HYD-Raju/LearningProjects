import { get } from "lodash";
import { ActivateSimConfigurationType } from "../../feature/feature.types";
import { ConsulValues } from "../../consul/consul.types";
import { getParsedValue } from "../../../utils";

export function extractActivateSimValues(payload: ConsulValues): ActivateSimConfigurationType {
	return {
		verificationCharacteristicName: get(payload, "features/ecare/activate_sim/verification_characteristic"),
		iccidVerificationValue: get(payload, "features/ecare/activate_sim/iccid_verification"),
		videoVerificationValue: get(payload, "features/ecare/activate_sim/video_verification"),
		activatePOIds: getParsedValue(get(payload, "features/ecare/activate_sim/activate_product_offerings")),
		deliveryPOIds: getParsedValue(get(payload, "features/ecare/activate_sim/delivery_product_offerings"))
	};
}

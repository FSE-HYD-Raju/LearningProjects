import { get } from "lodash";
import { SuspensionConfigurationType } from "../../feature/feature.types";
import { ConsulValues } from "../../consul/consul.types";

export function extractSuspensionValues(payload: ConsulValues): SuspensionConfigurationType {
	return {
		suspensionCharacteristicName: get(payload, "features/ecare/suspension/characteristic_name"),
		categoryId: get(payload, "features/ecare/suspension/category_id"),
		purpose: get(payload, "features/ecare/suspension/purpose", "activate")
	};
}

import { get } from "lodash";
import { ChangeSimConfigurationType } from "../../feature/feature.types";
import { ConsulValues } from "../../consul/consul.types";
import { getSafeParsedValue } from "../../../utils";

const CHANGE_SIM_CONFIGURATION_KEY = "features/ecare/change_sim/configuration";

function extractChangeSimValues(payload: ConsulValues): ChangeSimConfigurationType {
	return getSafeParsedValue<ChangeSimConfigurationType>(get(payload, CHANGE_SIM_CONFIGURATION_KEY), {});
}

export { CHANGE_SIM_CONFIGURATION_KEY, extractChangeSimValues };

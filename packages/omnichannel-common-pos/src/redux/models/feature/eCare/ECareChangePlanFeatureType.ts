import { ConsulValues } from "../../consul/consul.types";
import { getSafeParsedValue } from "../../../utils/index";

interface ECareChangePlanFeatureType {
	changePlanPurpose: string | undefined;
	changePlanProductOfferingsCategoriesIds: string[];
}

const CHANGE_PLAN_PURPOSE_CONSUL_KEY = "features/ecare/change_plan/change_plan_purpose";
const CHANGE_PLAN_PRODUCT_OFFERINGS_CATEGORIES_IDS_CONSUL_KEY = "features/ecare/change_plan/change_plan_product_offerings_categories_ids";

const parseChangePlan = (payload: ConsulValues): ECareChangePlanFeatureType => {
	return {
		changePlanPurpose: payload[CHANGE_PLAN_PURPOSE_CONSUL_KEY],
		changePlanProductOfferingsCategoriesIds: getSafeParsedValue<string[]>(payload[CHANGE_PLAN_PRODUCT_OFFERINGS_CATEGORIES_IDS_CONSUL_KEY], []),
	};
};

export { ECareChangePlanFeatureType, parseChangePlan, CHANGE_PLAN_PURPOSE_CONSUL_KEY, CHANGE_PLAN_PRODUCT_OFFERINGS_CATEGORIES_IDS_CONSUL_KEY };

import { get } from "lodash";
import { ECareFeatureType } from "./ECareFeatureType";
import { ConsulValues } from "../../consul/consul.types";
import { ECareRecurringTopUpFeatureType } from "./ECareRecurringTopUpFeatureType";
import { getSafeParsedValue } from "../../../utils";
import {
	DEFAULT_BASKET_ITEMS_COLUMNS,
	DEFAULT_BASKETS_COLUMNS,
	DEFAULT_ORDERS_COLUMNS,
	DEFAULT_ORDER_ITEMS_COLUMNS,
	DEFAULT_PRODUCT_USAGE_COLUMNS,
} from "../../../types";
import { parseChangePlan } from "./ECareChangePlanFeatureType";

const NEW_TOP_UP_PRODUCT_OFFERINGS_PURPOSE_CONSUL_KEY = "features/ecare/recurring_top_ups/new_top_up_product_offerings_purpose";
const NEW_TOP_UP_PRODUCT_OFFERINGS_CATEGORIES_IDS_CONSUL_KEY = "features/ecare/recurring_top_ups/new_top_up_product_offerings_categories_ids";
const TFORM_NAME_TO_RECURRING_TOP_UP_TYPE_MAP_CONSUL_KEY = "features/ecare/recurring_top_ups/tform_name_to_recurring_top_up_type_map";

const parseRecurringTopUp = (payload: ConsulValues): ECareRecurringTopUpFeatureType => {
	return {
		newTopUpProductOfferingsPurpose: payload[NEW_TOP_UP_PRODUCT_OFFERINGS_PURPOSE_CONSUL_KEY],
		newTopUpProductOfferingsCategoriesIds: getSafeParsedValue(payload[NEW_TOP_UP_PRODUCT_OFFERINGS_CATEGORIES_IDS_CONSUL_KEY], []),
		TFormNameToRecurringTopUpTypeMap: getSafeParsedValue(payload[TFORM_NAME_TO_RECURRING_TOP_UP_TYPE_MAP_CONSUL_KEY], {}),
	};
};
const eCareFeatureParser = (payload: ConsulValues): ECareFeatureType => {
	return {
		recurringTopUp: parseRecurringTopUp(payload),
		changePlan: parseChangePlan(payload),
		basketItemsColumns: getSafeParsedValue(get(payload, "features/ecare/basket_items_columns"), DEFAULT_BASKET_ITEMS_COLUMNS),
		orderItemsColumns: getSafeParsedValue(get(payload, "features/ecare/order_items_columns"), DEFAULT_ORDER_ITEMS_COLUMNS),
		ordersColumns: getSafeParsedValue(get(payload, "features/ecare/orders_columns"), DEFAULT_ORDERS_COLUMNS),
		basketsColumns: getSafeParsedValue(get(payload, "features/ecare/baskets_columns"), DEFAULT_BASKETS_COLUMNS),
		orderItemsFilterByCategoriesIds: getSafeParsedValue(get(payload, "features/ecare/order_items_filter_by_categories_ids"), []),
		basketItemsFilterByCategoriesIds: getSafeParsedValue(get(payload, "features/ecare/basket_items_filter_by_categories_ids"), []),
		orderItemsIconsByCategoriesIds: getSafeParsedValue(get(payload, "features/ecare/orderItemsIconsByCategoriesIds"), {}),
		basketItemsIconsByCategoriesIds: getSafeParsedValue(get(payload, "features/ecare/basketItemsIconsByCategoriesIds"), {}),
		productUsageColumns: getSafeParsedValue(get(payload, "features/ecare/productUsageColumns"), DEFAULT_PRODUCT_USAGE_COLUMNS),
	};
};
export {
	eCareFeatureParser,
	NEW_TOP_UP_PRODUCT_OFFERINGS_PURPOSE_CONSUL_KEY,
	NEW_TOP_UP_PRODUCT_OFFERINGS_CATEGORIES_IDS_CONSUL_KEY,
	TFORM_NAME_TO_RECURRING_TOP_UP_TYPE_MAP_CONSUL_KEY,
};

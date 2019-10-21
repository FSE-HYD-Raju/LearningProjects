import { ECareFeatureType } from "./ECareFeatureType";
import {
	DEFAULT_BASKET_ITEMS_COLUMNS,
	DEFAULT_BASKETS_COLUMNS,
	DEFAULT_ORDER_ITEMS_COLUMNS,
	DEFAULT_ORDERS_COLUMNS,
	DEFAULT_PRODUCT_USAGE_COLUMNS,
} from "../../../types";

const ECareFeatureInitialValue: ECareFeatureType = {
	recurringTopUp: {
		newTopUpProductOfferingsCategoriesIds: [],
		newTopUpProductOfferingsPurpose: undefined,
		TFormNameToRecurringTopUpTypeMap: {},
	},
	changePlan: {
		changePlanPurpose: undefined,
		changePlanProductOfferingsCategoriesIds: [],
	},
	basketItemsColumns: DEFAULT_BASKET_ITEMS_COLUMNS,
	orderItemsColumns: DEFAULT_ORDER_ITEMS_COLUMNS,
	ordersColumns: DEFAULT_ORDERS_COLUMNS,
	basketsColumns: DEFAULT_BASKETS_COLUMNS,
	orderItemsFilterByCategoriesIds: [],
	basketItemsFilterByCategoriesIds: [],
	basketItemsIconsByCategoriesIds: {},
	orderItemsIconsByCategoriesIds: {},
	productUsageColumns: DEFAULT_PRODUCT_USAGE_COLUMNS,
};

export { ECareFeatureInitialValue };

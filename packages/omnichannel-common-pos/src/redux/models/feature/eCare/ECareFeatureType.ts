import { ECareRecurringTopUpFeatureType } from "./ECareRecurringTopUpFeatureType";
import {
	BasketItemsColumn,
	BasketsColumn,
	OrderItemsColumn,
	OrdersColumn,
	ProductUsageColumn,
} from "../../../types";
import { ECareChangePlanFeatureType } from "./ECareChangePlanFeatureType";

interface ECareFeatureType {
	recurringTopUp: ECareRecurringTopUpFeatureType;
	changePlan: ECareChangePlanFeatureType;
	basketItemsColumns: BasketItemsColumn[];
	orderItemsColumns: OrderItemsColumn[];
	ordersColumns: OrdersColumn[];
	basketsColumns: BasketsColumn[];
	orderItemsFilterByCategoriesIds: string[];
	basketItemsFilterByCategoriesIds: string[];
	basketItemsIconsByCategoriesIds: Record<string, Array<string>>;
	orderItemsIconsByCategoriesIds: Record<string, Array<string>>;
	productUsageColumns: ProductUsageColumn[];
}
export { ECareFeatureType };

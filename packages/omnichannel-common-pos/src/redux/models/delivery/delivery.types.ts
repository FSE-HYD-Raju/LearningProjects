"use strict";

import { ProductOfferingShippingMethod, BasketShippingMethod } from "../../types/ShippingMethod";

type DeliveryState = {
	shippingMethods: Record<string, Array<ProductOfferingShippingMethod>>;
	basketShippingMethods: Record<string, Array<BasketShippingMethod>>;
	activeQueries: Record<string, boolean>;
};

export { DeliveryState };

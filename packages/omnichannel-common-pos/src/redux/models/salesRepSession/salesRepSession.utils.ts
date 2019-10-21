"use strict";

import { get } from "lodash";
import { ConsulValues } from "../consul/consul.types";

export function extractValues(payload: ConsulValues) {
	const showSalesOrganizationModal = payload.show_sales_organization_modal;
	const defaultStockLevel = parseInt(get(payload, "default_stock_level", "0"), 10) || 0;

	return {
		showSalesOrganizationModal: showSalesOrganizationModal === "true",
		consulValuesLoaded: true,
		defaultStockLevel
	};
}

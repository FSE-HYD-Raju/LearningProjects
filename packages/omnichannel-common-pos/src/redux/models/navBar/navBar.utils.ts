"use strict";

import { get } from "lodash";
import { getParsedValue } from "../../utils";
import { ConsulValues } from "../consul/consul.types";

export function extractValues(payload: ConsulValues) {
	return {
		showBasket: getParsedValue(get(payload, "features/display_shopping_basket"), false),
		brandLink: get(payload, "features/navbar_brand_link", "/"),
	};
}

export function getViewportSize(widthInPixels: number): string {
	if (widthInPixels <= 480) {
		return "mobile";
	}
	if (widthInPixels <= 768) {
		return "tablet";
	} else {
		return "desktop";
	}
}

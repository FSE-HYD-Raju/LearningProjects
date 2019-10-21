"use strict";

import { get } from "lodash";
import { ComparisonState } from "./comparison.types";
import { ConsulValues } from "../../models/consul/consul.types";
import { getParsedValue } from "../../utils";
import { ProductOffering } from "../../types";

export function extractValues(data: ConsulValues): Partial<ComparisonState> {
	const comparisonCharacteristics = getParsedValue(get(data, "comparison_characteristics"), {});
	return {
		comparisonCharacteristics
	};
}

export const getNewItems = (items?: Array<ProductOffering>, item?: ProductOffering): Array<ProductOffering> | undefined => {
	if (!items || !item) {
		return items;
	}

	const filteredItems = items.filter((value) => value.id !== (item.id));
		return filteredItems.length === items.length ? [...items, item] : filteredItems

};

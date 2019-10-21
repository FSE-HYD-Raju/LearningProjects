"use strict";

import { ProductOffering } from "../../types";

export type ComparisonState = {
	items: ProductOffering[];
	comparisonCharacteristics: object | void | null;
	open: boolean;
	showConfigurationModalForProduct: string;
};

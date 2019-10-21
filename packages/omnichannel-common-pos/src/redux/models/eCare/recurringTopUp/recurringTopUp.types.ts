"use strict";

import { ProductOffering } from "../../../types";

type RecurringTopUpState = {
	newTopUpProductOfferingsByAgreement: Record<string, ProductOffering[]>;
	isBasketSubmitted: boolean;
};
export { RecurringTopUpState };

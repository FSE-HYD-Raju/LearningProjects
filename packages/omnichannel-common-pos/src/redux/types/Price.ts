import { BillingInterval } from "./BillingInterval";
import { PriceType } from "./PriceType";
import { ServiceUnit } from "./ServiceUnit";
import { SimplePrice } from "./SimplePrice";
import { CommercialEnrichments } from "./CommercialEnrichments";

export interface Price extends SimplePrice { // actually maps to CommonProductPrice.java
	type: PriceType;
	priority?: number;
	commercialEnrichment?: CommercialEnrichments;
	name?: string | null;
	chargedUnit?: ServiceUnit;
	recurringChargePeriod?: BillingInterval;
	conditions?: Record<string, string> | null;
	originalPrice?: Price | null; // FIXME is this necessary?
	isUpfront?: boolean;
}

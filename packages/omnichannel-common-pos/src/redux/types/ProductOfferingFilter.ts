import { ProductOfferingFilterMatcher } from "./ProductOfferingFilterMatcher";

export interface ProductOfferingFilter {
	type: "collection" | "price-range";
	matchers: Array<ProductOfferingFilterMatcher>;
	displayType: "dropdown" | "slider" | "checkbox" | "combined-checkbox";
}

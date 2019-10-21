import { PriceRange } from "./PriceRange";

/* Q: any way to do this without explicitly listing all price types? (using PriceTypeEnum perhaps?) */
export interface PriceRangeBoundaries {
	characteristic: string;
	// ALLPRICES?: PriceRange;
	// ONE_TIME?: PriceRange;
	// RECURRENT?: PriceRange;
	// USAGE?: PriceRange;
	allPrices?: PriceRange;
	upfront?: PriceRange;
	recurring?: PriceRange;
	usage?: PriceRange;
}

import { Price } from "./Price";

export interface UsagePrice extends Price {
	taxAmounts: Map<number, number>;
	taxExcludedAmount: number;
}

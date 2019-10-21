export enum PriceAttributeEnum {
	TAXFREEAMOUNT = "taxFreeAmount",
	TAXINCLUDEDAMOUNT = "taxIncludedAmount"
}

export type PriceAttribute = keyof PriceAttributeEnum;

// the following price interfaces are temporary, will be removed/merged soon
export interface SimplePrice {
	taxFreeAmount?: number;
	taxIncludedAmount?: number;
	currency?: string;
	interval?: string;
	taxAmount?: number;
	taxRate?: number;
	[index: string]: any;
}

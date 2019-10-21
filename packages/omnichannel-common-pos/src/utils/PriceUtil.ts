import { HasPrices, PriceTypeEnum, SimplePrice } from "../redux/types";
import { Price } from "../redux/types/Price";
import { values } from "lodash";

class PriceUtil {
	static sumPrices(price1: SimplePrice, price2: SimplePrice): SimplePrice {
		const taxFreeAmount = (price1.taxFreeAmount || 0) + (price2.taxFreeAmount || 0);
		const taxAmount = (price1.taxAmount || 0) + (price2.taxAmount || 0);
		const taxIncludedAmount = (price1.taxIncludedAmount || 0) + (price2.taxIncludedAmount || 0);
		return {
			taxFreeAmount,
			taxAmount,
			taxIncludedAmount,
			taxRate: (taxAmount / taxFreeAmount) * 100,
			currency: price1.currency || price2.currency,
		};
	}
	static sumPricesByType(prices: Price[]): Price[] {
		const pricesSumByTypes: { [key: string]: Price } = {};
		prices.forEach(price => {
			const priceType = price.type + String(Boolean(price.isUpfront));
			const currentTotalByPriceType = pricesSumByTypes[priceType] || {};
			pricesSumByTypes[priceType] = { ...price, ...PriceUtil.sumPrices(price, currentTotalByPriceType) };
		});
		return values(pricesSumByTypes).filter(x => x) as Price[];
	}
	static getPriceSumInList(prices: Price[], type: PriceTypeEnum): SimplePrice | undefined {
		const filteredPrices = PriceUtil.findPricesInList(prices, type) as SimplePrice[];
		return filteredPrices.length > 0 ? filteredPrices.reduce(PriceUtil.sumPrices) : undefined;
	}
	static getRecurrentPriceSumInList(prices: Price[]): Price | undefined {
		const filteredPrices = PriceUtil.findPricesInList(prices, PriceTypeEnum.RECURRENT);
		return filteredPrices.length > 0 ? { ...filteredPrices[0], ...(filteredPrices as SimplePrice[]).reduce(PriceUtil.sumPrices) } : undefined;
	}
	static getOneTimePriceSumInList(prices: Price[]): Price | undefined {
		const filteredPrices = PriceUtil.findPricesInList(prices, PriceTypeEnum.ONE_TIME);
		return filteredPrices.length > 0 ? { ...filteredPrices[0], ...(filteredPrices as SimplePrice[]).reduce(PriceUtil.sumPrices) } : undefined;
	}
	static getUpfrontPrices(prices: Price[]): Price[] {
		return prices.filter(price => price.isUpfront);
	}
	static getSimplePriceSum(prices: SimplePrice[]): SimplePrice | undefined {
		return prices.length > 0 ? prices.reduce(PriceUtil.sumPrices) : undefined;
	}
	static getUpfrontPriceSumInList(prices: Price[]): SimplePrice | undefined {
		const oneTimePricesSum = PriceUtil.getPriceSumInList(prices, PriceTypeEnum.ONE_TIME);
		const recurrentPricesSum = PriceUtil.getPriceSumInList(PriceUtil.getUpfrontPrices(prices), PriceTypeEnum.RECURRENT);
		return oneTimePricesSum && recurrentPricesSum ? PriceUtil.sumPrices(oneTimePricesSum, recurrentPricesSum) : oneTimePricesSum || recurrentPricesSum;
	}

	static findPricesInList(prices: Price[], type: PriceTypeEnum): Price[] {
		return prices.filter(price => price.type === type) || [];
	}

	static findPriceInItem(item: HasPrices, priceType: PriceTypeEnum): Price | undefined {
		const prices: Array<Price> | undefined = item.attributes ? item.attributes.prices : item.prices;
		if (!prices) {
			return undefined;
		}
		return prices.find(
			(price: Price): boolean => {
				return price.type === priceType;
			}
		);
	}

	static findPrice(prices: Price[], type: PriceTypeEnum): Price | undefined {
		return prices.find(price => price.type === type);
	}

	static getOneTimePrice(amount: number, currency?: string): Price {
		return { ...PriceUtil.getPrice(amount, currency), type: PriceTypeEnum.ONE_TIME };
	}

	static getRecurrentPrice(amount: number, currency?: string, isUpfront: boolean = true): Price {
		return {
			...PriceUtil.getPrice(amount, currency),
			type: PriceTypeEnum.RECURRENT,
			recurringChargePeriod: { count: 1, interval: "MONTH" },
			isUpfront,
		};
	}

	static getOneTimePriceWithTax(taxFreeAmount: number, taxRate: number, currency: string): Price {
		return { ...PriceUtil.getPriceWithTax(taxFreeAmount, taxRate, currency), type: PriceTypeEnum.ONE_TIME };
	}

	static getRecurrentPriceWithTax(taxFreeAmount: number, taxRate: number, currency: string): Price {
		return {
			...PriceUtil.getPriceWithTax(taxFreeAmount, taxRate, currency),
			type: PriceTypeEnum.RECURRENT,
			recurringChargePeriod: { count: 1, interval: "MONTH" },
			isUpfront: true,
		};
	}

	static getPrice(amount: number, currency?: string): SimplePrice {
		return {
			taxFreeAmount: amount,
			taxIncludedAmount: amount,
			taxAmount: 0,
			currency,
			taxRate: 0,
		};
	}
	static getPriceWithTax(taxFreeAmount: number, taxRate: number, currency: string): SimplePrice {
		const taxAmount = (taxFreeAmount * taxRate) / 100.0;
		return {
			taxFreeAmount,
			taxIncludedAmount: taxFreeAmount + taxAmount,
			taxAmount,
			currency,
			taxRate,
		};
	}
	static getZeroPrice(currency?: string): SimplePrice {
		return PriceUtil.getPrice(0, currency);
	}
}

export default PriceUtil;

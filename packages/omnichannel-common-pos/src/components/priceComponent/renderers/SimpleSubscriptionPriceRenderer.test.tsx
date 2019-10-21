import * as React from "react";
import { isNumber, isNil } from "lodash";
import { Price, PriceType, PriceRange } from "../../../redux/types";
import ProductOfferingUtil from "../../../utils/ProductOfferingUtil";
import { ProductOffering } from "../../../redux/types";
import { SimplePrice, PriceParts } from "../../../redux/types";
import TestUtils, { mountWithContext, shallowWithContext } from "../../../testUtils";
import SimpleSubscriptionPriceRenderer from "./SimpleSubscriptionPriceRenderer";
import { ComplexPriceRendererProps, ProductToPriceMap } from "../ComplexPriceComponent";
import { PriceComponentPriceType } from "../model/PriceComponentPriceType";

const poBase: any = require("../../../../fixtures/PO_Base");
const poBaseConfiguration = require("../../../../fixtures/PO_Base_configuration");

export type PriceInfo = SimplePrice | PriceRange;
export type PriceExtractorFunctionType = (product: ProductOffering, priceType: PriceType) => PriceInfo;

describe("SimpleSubscriptionPriceRenderer", () => {
	const context = {
		flux: {
			actions: {}
		},
		store: TestUtils.mockReduxStore({
			navBar: {
				viewportSize: ""
			},
			category: {},
			feature: {},
			cms: {},
		})
	};

	const getPriceValue = (price: PriceComponentPriceType): number => {
		return parseInt(price.integer, 10) + parseInt(price.fraction, 10) * 0.01;
	};

	const pickPrice = (price: PriceInfo): number | undefined => {
		return price ? (isNumber((price as PriceRange).min)
			? (price as PriceRange).min
			: (price as SimplePrice).taxIncludedAmount) : undefined;
	};

	const breakPrice = (args: {
		amount: number;
		currency: string;
		priceType: PriceType;
		originalPrice?: Price;
		simplePrice?: PriceInfo;
		priority?: number;
	}): PriceParts => {
		const { amount, currency, priceType, originalPrice, simplePrice, priority } = args;
		const parts = amount.toFixed(2).split(".");
		return {
			integer: parts[0],
			fraction: parts[1],
			currency,
			priority,
			priceType,
			simplePrice,
			originalPrice
		};
	};

	const pricePriorityAscComparator = (product1: ProductToPriceMap, product2: ProductToPriceMap): number => {
		const priority1 = !product1.price || isNil(product1.price.priority) ? Infinity : product1.price.priority;
		const priority2 = !product2.price || isNil(product2.price.priority) ? Infinity : product2.price.priority;

		if (priority1 < priority2) {
			return -1;
		} else if (priority1 > priority2) {
			return 1;
		}
		return 0;
	};

	const getPricesSortedByPriority = (
		products: ProductOffering[],
		priceExtractor: PriceExtractorFunctionType,
	): ProductToPriceMap[] => {
		return products.reduce(
			(stack: ProductToPriceMap[], po: ProductOffering) => {
				const copyOfPo = {...po};
				const filteredPrices = po.prices ? po.prices : null;
				if (!filteredPrices) {
					return stack;
				}
				const resultPrices = filteredPrices.map((filteredPrice) => {
					copyOfPo.prices = [filteredPrice];
					const priceType = filteredPrice.type;
					// otherwise it's always will be 1t price
					const simplePrice: PriceInfo = priceExtractor(copyOfPo, priceType);
					const priceAmount = pickPrice(simplePrice);

					if (priceAmount) {
						return {
							product: po,
							price: breakPrice({
								amount: priceAmount,
								priority: filteredPrice.priority,
								currency: filteredPrice.currency!,
								priceType, simplePrice,
								originalPrice: filteredPrice
							})
						};
					} else {
						return null;
					}
				});
				const filteredResulPrices: Array<ProductToPriceMap> = resultPrices.filter(price => price !== null) as Array<ProductToPriceMap>;
				if (filteredResulPrices.length === 0) {
					return stack;
				}
				return stack.concat(filteredResulPrices);
			}, [])
			.sort(pricePriorityAscComparator);
	};
	const productConfiguration: any = (poBaseConfiguration[poBase.id] || {}) as any as any;
	const selectedPOsInProduct = ProductOfferingUtil
		.getSelectedPOsInProduct(poBase, productConfiguration, false)
		.filter((po: ProductOffering) => po.id !== poBase.id)
		;

	const productsToSortedPrices = getPricesSortedByPriority(selectedPOsInProduct,  ProductOfferingUtil.getSimplePrice);
	const messages: any = {
		now: {
			id: "shop-product-price-tag-now",
			description: "Shop product price, price now",
			defaultMessage: "now"
		},
		monthShorthand: {
			id: "shop-product-price-tag-mnth",
			description: "Shop product price, per month price shorthand",
			defaultMessage: "mo"
		},
		monthly: {
			id: "shop-product-price-tag-monthly",
			description: "Shop product price, per month price",
			defaultMessage: "monthly"
		},
		starting: {
			id: "shop-product-price-starting-from-label",
			description: "Shop product price, starting from label",
			defaultMessage: "Starting from"
		},
		payNow: {
			id: "complex-shop-product-price-single-product-page-tag-now",
			description: "Shop product price, price now (for single product page view)",
			defaultMessage: "Pay now"
		},
		payNowAdditionalText: {
			id: "complex-shop-product-price-single-product-page-tag-now-additional-text",
			description: "Shop product price, price now additional text",
			defaultMessage: "+ first month fees"
		},
		monthlyFees: {
			id: "complex-shop-product-price-single-product-page-tag-monthly-fees",
			description: "Shop product price, monthly fees (for single product page view)",
			defaultMessage: "Monthly fees"
		},
		monthlyFeesAdditionalText: {
			id: "complex-shop-product-price-single-product-page-tag-monthly-fees-additional-text",
			description: "Shop product price, monthly fees additional text)",
			defaultMessage: "from second month"
		},
		totalInfoRecurring: {
			id: "complex-shop-product-price-single-product-page-tag-total-info-recurring",
			description: "eShop - Product Page - PO_YoungDigitalEdition - Price banner - Monthly fee - tooltip",
			defaultMessage: "eShop - Product Page - PO_YoungDigitalEdition - Price banner - Monthly fee - tooltip"
		},
		totalInfoOnetime: {
			id: "complex-shop-product-price-single-product-page-tag-total-info-onetime",
			description: "eShop - Product Page - PO_YoungDigitalEdition - Price banner - Pay now - tooltip",
			defaultMessage: "eShop - Product Page - PO_YoungDigitalEdition - Price banner - Pay now - tooltip"
		}
	};

	const minProps: ComplexPriceRendererProps = {
		product: poBase,
		priceValueCalculator: getPriceValue,
		upfrontPricesTotal: null,
		productsToSortedPrices: [],
		recurringPricesTotal: null,
		messages,
	};

	const feasibleProps: ComplexPriceRendererProps = {
		product: poBase,
		priceValueCalculator: getPriceValue,
		upfrontPricesTotal: {
			currency: "EUR",
			fraction: "00",
			integer: "20",
			originalPrice: undefined,
			priceType: "ONE_TIME",
			simplePrice: undefined
		} as PriceParts,
		productsToSortedPrices: productsToSortedPrices,
		recurringPricesTotal: {
			currency: "EUR",
			fraction: "90",
			integer: "16",
			originalPrice: undefined,
			priceType: "RECURRENT",
			simplePrice: undefined
		} as PriceParts,
		messages,
	};

	it("renders as empty element with shallow mount and without prices", () => {
		const wrapper = shallowWithContext(<SimpleSubscriptionPriceRenderer {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at shallow mount with minimum feasible props", () => {
		const wrapper = shallowWithContext(<SimpleSubscriptionPriceRenderer {...feasibleProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		mountWithContext(<SimpleSubscriptionPriceRenderer {...minProps} />, { context });
	});

	it("succeeds at deep mount with minimum feasible props", () => {
		mountWithContext(<SimpleSubscriptionPriceRenderer {...feasibleProps} />, { context });
	});

	it("presents sum of one-time prices on the 'Pay now' row", () => {
		const wrapper = mountWithContext(<SimpleSubscriptionPriceRenderer {...feasibleProps} />, { context });

		// tslint:disable-next-line:quotemark
		const onetimeBlock = wrapper.find('[data-test-name="one-time-price-block"]');

		// tslint:disable-next-line:quotemark
		const oneTimeSum = onetimeBlock.find('[data-test-name="one-time-sum"]');
		expect(oneTimeSum.text()).toContain(feasibleProps.upfrontPricesTotal!.integer);
		expect(oneTimeSum.text()).toContain(feasibleProps.upfrontPricesTotal!.fraction);
	});

	it("presents sum of recurring prices on the 'Recurring fee' row", () => {
		const wrapper = mountWithContext(<SimpleSubscriptionPriceRenderer {...feasibleProps} />, { context });

		// tslint:disable-next-line:quotemark
		const recurringBlock = wrapper.find('[data-test-name="recurring-price-block"]');

		// tslint:disable-next-line:quotemark
		const recurringSum = recurringBlock.find('[data-test-name="recurring-sum"]');
		expect(recurringSum.text()).toContain(feasibleProps.recurringPricesTotal!.integer);
		expect(recurringSum.text()).toContain(feasibleProps.recurringPricesTotal!.fraction);
	});

	it("presents -1 priority price on the first row", () => {
		const wrapper = mountWithContext(<SimpleSubscriptionPriceRenderer {...feasibleProps} />, { context });

		// tslint:disable-next-line:quotemark
		const oneTimeBlock = wrapper.find('[data-test-name="pricelines-container"]');
		// tslint:disable-next-line:quotemark
		const amounts = oneTimeBlock.find('[data-test-name="amount"]');
		const integer0 = amounts.at(0).text().match(/€([0-9]+).*/)[1];
		expect(integer0).toEqual("40");
	});

	it("presents 0 priority price on the second row", () => {
		const wrapper = mountWithContext(<SimpleSubscriptionPriceRenderer {...feasibleProps} />, { context });

		// tslint:disable-next-line:quotemark
		const oneTimeBlock = wrapper.find('[data-test-name="pricelines-container"]');
		// tslint:disable-next-line:quotemark
		const amounts = oneTimeBlock.find('[data-test-name="amount"]');
		const integer0 = amounts.at(1).text().match(/€([0-9]+).*/)[1];
		expect(integer0).toEqual("20");
	});

	it("presents null/undefined priority price on the last row", () => {
		const wrapper = mountWithContext(<SimpleSubscriptionPriceRenderer {...feasibleProps} />, { context });

		// tslint:disable-next-line:quotemark
		const oneTimeBlock = wrapper.find('[data-test-name="pricelines-container"]');
		// tslint:disable-next-line:quotemark
		const amounts = oneTimeBlock.find('[data-test-name="amount"]');
		const integer0 = amounts.at(amounts.length - 1).text().match(/€([0-9]+).*/)[1];
		expect(integer0).toEqual("30");
	});

	it("presents highest priority price on the row before null/undefined priority", () => {
		const wrapper = mountWithContext(<SimpleSubscriptionPriceRenderer {...feasibleProps} />, { context });

		// tslint:disable-next-line:quotemark
		const oneTimeBlock = wrapper.find('[data-test-name="pricelines-container"]');
		// tslint:disable-next-line:quotemark
		const amounts = oneTimeBlock.find('[data-test-name="amount"]');
		const integer0 = amounts.at(amounts.length - 2).text().match(/-€([0-9]+).*/)[0];
		expect(integer0).toEqual("-€19");
	});

});

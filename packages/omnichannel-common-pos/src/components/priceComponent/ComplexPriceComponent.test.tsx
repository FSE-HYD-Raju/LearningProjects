import * as React from "react";
import { get } from "lodash";
import TestUtils, { mountWithContext, shallowWithContext } from "../../testUtils";
import ComplexPriceComponent, { ComplexPriceComponentProps, ProductToPriceMap } from "./ComplexPriceComponent";
import ProductOfferingUtil from "../../utils/ProductOfferingUtil";
import { PriceTypeEnum } from "../../redux/types";

const poBase: any = require("../../../fixtures/PO_Base_with_taxIncludedAmount_prices");
const poBaseConfiguration = require("../../../fixtures/PO_Base_configuration");

describe("ComplexPriceComponent", () => {
	const context = {
		flux: {
			actions: {}
		},
		store: TestUtils.mockReduxStore({
			navBar: {
				viewportSize: ""
			},
			category: {},
			cms: {},
			feature: {},
		})
	};

	const minProps: ComplexPriceComponentProps = {
		configurations: poBaseConfiguration,
		product: ProductOfferingUtil.makeDefaultSelections([poBase])[0],
		priceAttribute: "taxIncludedAmount",
	};

	it("succeeds at shallow mount with minimal props", () => {
		const wrapper = shallowWithContext(<ComplexPriceComponent {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimal props", () => {
		mountWithContext(<ComplexPriceComponent {...minProps} />, { context });
	});

	it("passes selected child products and their price of given product to renderer", () => {
		const wrapper = mountWithContext(<ComplexPriceComponent {...minProps} />, { context });

		const renderer = wrapper.find("SimpleSubscriptionPriceRenderer");

		const productsToSortedPrices = renderer.prop("productsToSortedPrices");

		expect(productsToSortedPrices.length).toBeGreaterThan(0);

		productsToSortedPrices.forEach((entry: ProductToPriceMap) => {
			expect(Object.keys(entry).sort()).toEqual(["product", "price"].sort());
			expect(entry.product).toEqual(expect.any(Object));
			expect(entry.price).toEqual(expect.any(Object));
		});
	});

	const calculateSumOfRecurringPrices = (productsToPriceMap: ProductToPriceMap[]): number => {
		const sum = productsToPriceMap
			.filter((entry: ProductToPriceMap) => entry.price.priceType === PriceTypeEnum.RECURRENT)
			.reduce((acc: number, entry: ProductToPriceMap) => {
				const thisAmount = get(entry.price, "originalPrice.taxIncludedAmount", 0);
				return acc + thisAmount;
			}, 0);

		return sum;
	};

	it("calculates recurring prices sum correctly", () => {
		const wrapper = mountWithContext(<ComplexPriceComponent {...minProps} />, { context });

		const renderer = wrapper.find("SimpleSubscriptionPriceRenderer");

		const recurringPricesTotal = renderer.prop("recurringPricesTotal");
		const productsToSortedPrices = renderer.prop("productsToSortedPrices");

		const recurringPricesTotalNumber = Number(`${recurringPricesTotal.integer}.${recurringPricesTotal.fraction}`);
		const productsToSortedPricesSum = calculateSumOfRecurringPrices(productsToSortedPrices);

		expect(recurringPricesTotalNumber).toEqual(productsToSortedPricesSum);
	});

	it("calls priceExtractor provided in props", () => {
		const extractor = jest.fn();
		const props = {...minProps, priceExtractor: extractor};

		mountWithContext(<ComplexPriceComponent {...props} />, { context });
		expect(extractor).toHaveBeenCalled();
		expect(extractor).toHaveBeenCalledTimes(5);
	});
});

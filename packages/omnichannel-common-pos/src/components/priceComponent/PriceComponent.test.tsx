import * as React from "react";
import { mountWithContext, shallowWithContext } from "../../testUtils";
import ProductOfferingUtil from "../../utils/ProductOfferingUtil";
import { ProductOffering } from "../../redux/types";
import PriceComponent, { PriceComponentProps } from "./PriceComponent";
import GridPriceRenderer from "./renderers/GridPriceRenderer";
import StandardPriceRenderer from "./renderers/StandardPriceRenderer";

describe("PriceComponent", () => {
	const product: ProductOffering = {
		id: "myProduct",
		name: "myProductName",
		inputCharacteristics: {},
		selected: false,
	} as ProductOffering;

	const minProps: PriceComponentProps = {
		configurations: {},
		product: product,
		priceAttribute: "taxIncludedAmount",
		renderer: StandardPriceRenderer,
	};

	it("succeeds at shallow mount with minimal props", () => {
		const wrapper = shallowWithContext(<PriceComponent {...minProps}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimal props", () => {
		mountWithContext(<PriceComponent {...minProps}/>);
	});

	it("uses provided renderer", () => {
		const wrapper = mountWithContext(<PriceComponent {...minProps}/>);
		expect(wrapper.find("StandardPriceRenderer").length).toBeGreaterThan(0);
	});

	it("renders itself using proper renderer", () => {
		const props = {...minProps, renderer: GridPriceRenderer};
		const wrapper = mountWithContext(<PriceComponent {...props}/>);
		expect(wrapper.find("GridPriceRenderer").length).toEqual(1);
		expect(wrapper.find("StandardPriceRenderer").length).toEqual(0);
	});

	it("calls priceExtractor provided in props", () => {
		const extractor = jest.fn();
		const props = {...minProps, priceExtractor: extractor};
		mountWithContext(<PriceComponent {...props}/>);
		expect(extractor).toHaveBeenCalledTimes(2);
	});

	it("calls priceExtractor provided in props", () => {
		ProductOfferingUtil.getPrice = jest.fn();
		const props = {...minProps, priceExtractor: ProductOfferingUtil.getPrice};
		mountWithContext(<PriceComponent {...props}/>);
		expect(ProductOfferingUtil.getPrice).toHaveBeenCalledTimes(2);
	});

	describe("getPriceValue", () => {
		it("gives correct price from negative price", () => {
			const props = { ...minProps, renderer: GridPriceRenderer };
			const price = {
				currency: "EUR",
				fraction: "99",
				integer: "-19",
				originalPrice: undefined,
				priceType: "upfront",
				simplePrice: undefined,
			};
			const component = mountWithContext(<PriceComponent {...props}/>);
			const { priceValueCalculator } = component.find(GridPriceRenderer).props();
			expect(priceValueCalculator(price)).toEqual(-19.99);
		});

		it("gives correct price from positive price", () => {
			const props = { ...minProps, renderer: GridPriceRenderer };
			const price = {
				currency: "EUR",
				fraction: "99",
				integer: "19",
				originalPrice: undefined,
				priceType: "upfront",
				simplePrice: undefined,
			};
			const component = mountWithContext(<PriceComponent {...props}/>);
			const { priceValueCalculator } = component.find(GridPriceRenderer).props();
			expect(priceValueCalculator(price)).toEqual(19.99);
		});
	});
});

import * as React from "react";
import {
	ProductOfferingUtil,
	mountWithContext,
	shallowWithContext,
	ProductOffering
} from "omnichannel-common-pos";

import ProductTableColumn, { ProductTableColumnProps } from "./ProductTableColumn";

const product: ProductOffering = {
	id: "asdf"
} as ProductOffering;

const minProps: ProductTableColumnProps = {
	col: { type: "", flex: 1 },
	product: product
};

describe("ProductTableColumn", () => {
	it("succeeds at shallow mount with minimal props", () => {
		const wrapper = shallowWithContext(<ProductTableColumn {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimal props", () => {
		mountWithContext(<ProductTableColumn {...minProps} />);
	});

	it("is empty when currency is given but price is not", () => {
		const props: ProductTableColumnProps = {
			...minProps,
			col: { type: "PRICE-RANGE", flex: 1 }
		};

		const wrapper = mountWithContext(
			<ProductTableColumn {...props} />
		);

		expect(wrapper.text()).toEqual("");
	});

	it("renders product attribute correctly", () => {
		const props: ProductTableColumnProps = {
			col: {
				...minProps.col,
				attribute: "name"
			},
			product: {
				...minProps.product,
				name: "VIP Product"
			}
		};
		const wrapper = mountWithContext(
			<ProductTableColumn {...props} />
		);

		expect(wrapper.find(".ProductTableColumn").text()).toContain("VIP Product");
	});

	it("renders price range", () => {
		const product: ProductOffering = {
			id: "asdf",
			attributes: {
				prices: [
					{
						taxFreeAmount: 66.6,
						currency: "EUR",
						type: "ONE_TIME"
					},
					{
						taxFreeAmount: 99.9,
						currency: "USD",
						type: "ONE_TIME"
					}
				]
			}
		} as ProductOffering;
		const props: ProductTableColumnProps = {
			col: {
				...minProps.col,
				type: "PRICE-RANGE",
				attribute: "Zamzung Qalaxy",
				valueGetter: ProductOfferingUtil.getUpfrontPriceRange
			},
			product: product
		};

		const wrapper = mountWithContext(
			<ProductTableColumn {...props} />
		);

		const productTableColumn = wrapper
			.find(".ProductTableColumn")
			.hostNodes();
		expect(productTableColumn.text()).toContain("from");
		expect(productTableColumn.text()).toContain("66");
		expect(productTableColumn.text()).toContain("60");
	});
});

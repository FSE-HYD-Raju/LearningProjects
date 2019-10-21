import * as React from "react";
import ProductTableRow, { ProductTableRowProps } from "./ProductTableRow";
import { ProductOffering, mountWithContext, shallowWithContext } from "omnichannel-common-pos";

const product: ProductOffering = {
	id: "asdf"
} as ProductOffering;

const minProps: ProductTableRowProps = {
	product: product,
	columns: [],
	category: "",
	isItemInComparison: () => false,
	actions: {
		toggleItem: jest.fn(),
		addProductToBasket: jest.fn(),
	}
};

describe("ProductTableRow", () => {
	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(
			<ProductTableRow {...minProps}/>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		mountWithContext(
			<ProductTableRow {...minProps}/>
		);
	});
});

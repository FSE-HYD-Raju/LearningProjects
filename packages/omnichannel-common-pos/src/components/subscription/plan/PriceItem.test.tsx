import * as React from "react";
import { default as PriceItem, PriceItemProps } from "./PriceItem";
import { mountWithContext, shallowWithContext } from "../../../../src/testUtils";

describe("PriceItem", () => {
	let props: PriceItemProps;

	beforeEach(() => {
		props = {
			price: {},
		};
	});

	it("succeeds at shallow mount with min props", () => {
		const wrapper = shallowWithContext(<PriceItem {...props} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with min props", () => {
		mountWithContext(<PriceItem {...props} />);
	});
});

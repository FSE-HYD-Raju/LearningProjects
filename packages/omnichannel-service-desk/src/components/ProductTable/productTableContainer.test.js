import React from "react";
import { shallowWithContext, TestUtils } from "omnichannel-common-pos";
import _ProductTableContainer from "../../../src/components/ProductTable/ProductTableContainer";
const { makeActions } = TestUtils;
const ProductTableContainer = _ProductTableContainer.WrappedComponent;

describe("ProductTableContainer", () => {
	const context = {
		flux: {
			stores: {},
			actions: {
				BasketActions: makeActions("flux.actions.BasketActions")
			}
		}
	};
	const minProps = {
		filterProducts: jest.fn()
	};
	it("should mount with min props", () => {
		const wrapper = shallowWithContext(
			<ProductTableContainer {...minProps} />,
			{ context }
		);
		expect(wrapper).toMatchSnapshot();
	});
});

import React from "react";
import ProductTableError from "../../../src/components/ProductTable/ProductTableError";
import { shallowWithContext, mountWithContext } from "omnichannel-common-pos";

describe("ProductTableError", () => {
	it("should display an error message on the UI", () => {
		const wrapper = mountWithContext(
			<ProductTableError
				errorToBeShownOnProductTable={{ code: "unmapped-error" }}
			/>
		);
		const productTableError = wrapper.find(".product-error");
		expect(wrapper).toMatchSnapshot();
		expect(productTableError.text().toLowerCase()).toContain(
			"An unrecognized error has occurred".toLowerCase()
		);
	});

	it("should call to clear error message when unmounted", () => {
		const mockedClearError = jest.fn();

		const wrapper = shallowWithContext(
			<ProductTableError clearErrorOnProductTable={mockedClearError} />
		);

		const componentWillUnmount = jest.spyOn(
			wrapper.instance(),
			"componentWillUnmount"
		);

		wrapper.unmount();
		expect(componentWillUnmount).toHaveBeenCalled();
		expect(mockedClearError).toHaveBeenCalled();
	});
});

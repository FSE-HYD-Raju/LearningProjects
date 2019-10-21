import React from "react";
import { mountWithContext, shallowWithContext } from "omnichannel-common-pos";
import columns from "../tableHeaderColumns";

import ProductTableHeaderBuilder from "../../../src/components/ProductTable/ProductTableHeaderBuilder";

describe("ProductTableHeaderBuilder", () => {
	const props = {
		columns,
		handleSort: () => {
			console.log("MOCKED props.handleSort()");
		}
	};

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(
			<ProductTableHeaderBuilder {...props} />
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount without props", () => {
		mountWithContext(<ProductTableHeaderBuilder {...props} />);
	});

	it("Renders default attributes to table header", () => {
		const wrapper = mountWithContext(
			<ProductTableHeaderBuilder {...props} />
		);

		const headers = wrapper.find(".ProductTable-header-cell");

		expect(
			headers
				.first()
				.first()
				.text()
		).toContain("Name");
		expect(
			headers
				.at(1)
				.first()
				.text()
		).toContain("Contains");
		expect(
			headers
				.at(2)
				.first()
				.text()
		).toContain("Recurring");
		expect(
			headers
				.at(3)
				.first()
				.text()
		).toContain("Upfront");
		expect(
			headers
				.at(4)
				.first()
				.text()
		).toContain("Compare");
	});

	it("Calls given handleSort function when table cell is clicked", () => {
		const handleSortSpy = jest.fn();

		const wrapper = mountWithContext(
			<ProductTableHeaderBuilder {...props} handleSort={handleSortSpy} />
		);

		const headers = wrapper.find(".ProductTable-header-cell");
		headers
			.first()
			.first()
			.simulate("click");

		expect(handleSortSpy).toHaveBeenCalled();
	});
});

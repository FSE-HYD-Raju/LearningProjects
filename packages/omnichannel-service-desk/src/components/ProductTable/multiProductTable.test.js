import React from "react";
import {
	shallowWithContext,
	mountWithContext,
	mountWithContextAndRouterProps
} from "omnichannel-common-pos";
import MultiProductTable from "../../../src/components/ProductTable/MultiProductTable";

describe("MultiProductTable", () => {
	const subCategories = [
		{
			type: "sub-category",
			attributes: {
				regex: null,
				productOfferings: null,
				title: "Voice Services",
				category: ["Minutes"]
			}
		},
		{
			type: "sub-category",
			attributes: {
				regex: null,
				productOfferings: null,
				title: "Message Services",
				category: ["SMS"]
			}
		},
		{
			type: "sub-category",
			attributes: {
				regex: null,
				productOfferings: null,
				title: "Data Services",
				category: [
					"Internet",
					"Internet_POS",
					"Internet_Night",
					"Internet_End_Month"
				]
			}
		}
	];
	it("should shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(
			<MultiProductTable subCategories={subCategories} columns={[]} />
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("should deep mount with minimum props", () => {
		mountWithContext(<MultiProductTable subCategories={[]} columns={[]} />);
	});

	it("should render ProductTables", () => {
		const multiProductTableWrapper = mountWithContextAndRouterProps(
			<MultiProductTable subCategories={subCategories} columns={[]} />
		);

		expect(multiProductTableWrapper.find("ProductTable").length).toEqual(
			subCategories.length
		);
	});
});

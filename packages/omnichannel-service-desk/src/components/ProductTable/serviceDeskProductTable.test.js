import React from "react";
import {
	shallowWithContext,
	shallowWithContextAndRouterProps,
	TestUtils
} from "omnichannel-common-pos";
import ServiceDeskProductTable from "../../../src/components/ProductTable/ServiceDeskProductTable";

describe("ServiceDeskProductTable", () => {
	const parentAPI = jest.fn();
	const minProps = {
		match: { params: {} },
		getProductsFromCategory: parentAPI,
		switchPriceType: jest.fn(),
		selectedCategoryId: "cat-b2c-mobile-device",
		categoriesBlacklist: ["cat-b2c-mobile-device"],
		activeAgreementId: null,
		SalesStore: {
			productCategory: "some-category"
		},
		selectedCurrency: "EUR",
		addressValidation: {
			address: null
		},
		mainCategories: []
	};
	it("should mount with min props", () => {
		const wrapper = shallowWithContext(
			<ServiceDeskProductTable {...minProps} />
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("should call getProductsFromCategory when language is changed", () => {
		const wrapper = shallowWithContextAndRouterProps(
			<ServiceDeskProductTable {...minProps} />
		);
		const mockedRouterProps = TestUtils.getMockedRouterOptions().props();
		const newProps = Object.assign(minProps, {
			locale: "fi",
			...mockedRouterProps
		});
		const component = wrapper.instance();
		component.componentWillReceiveProps(newProps);
		expect(parentAPI).toHaveBeenCalled();
	});

	it("should prompt to select an agreement if category is blacklisted", () => {
		const wrapper = shallowWithContext(
			<ServiceDeskProductTable {...minProps} />
		);

		expect(
			wrapper.find("FormattedMessageWrapper").filterWhere(item => {
				return (
					item.prop("defaultMessage") ===
					"Please select an agreement."
				);
			}).length
		).toEqual(1);
	});
});

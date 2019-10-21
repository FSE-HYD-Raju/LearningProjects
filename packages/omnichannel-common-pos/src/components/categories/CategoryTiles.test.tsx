import * as React from "react";
import { shallowWithContext, mountWithContext } from "../../testUtils";

import { CategoryTiles, CategoryTilesProps } from "./CategoryTiles";
import { Category } from "../../redux";

const categories: Array<Category> = [
		{
			id: "cat-b2c-mobile-accessory",
			attributes: { name: "Accessory", useLocationEligibility: false}
		},
		{
			id: "cat-b2c-mobile-device",
			attributes: { name: "Device", useLocationEligibility: false}
		},
		{
			id: "cat-b2c-mobile-plan-prepaid",
			attributes: {name: "Prepaid plans", useLocationEligibility: false}
		},
		{
			id: "cat-b2c-mobile-plan-postpaid",
			attributes: { name: "Postpaid plans", useLocationEligibility: false}
		}
] as any as Array<Category>;

const minProps: CategoryTilesProps = {
	actions: {
		updateMainCategories: jest.fn()
	},
	mainCategories: [],
	locale: "en",
};

describe("CategoryTiles", () => {
	beforeEach(() => {
		(minProps.actions.updateMainCategories as any).mockReset();
	});

	it("should succeed at shallow mount with minimal props", () => {
		const wrapper = shallowWithContext(<CategoryTiles {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("should succeed at deep mount with minimal props", () => {
		mountWithContext(<CategoryTiles {...minProps}/>);
	});

	it("should render items", () => {
		const wrapper = mountWithContext(<CategoryTiles {...minProps} mainCategories={categories} />);
		const tiles = wrapper.find(".CategoryTiles-link").hostNodes();

		expect(tiles.length).toEqual(categories.length);

		expect(minProps.actions.updateMainCategories).toHaveBeenCalled();
	});

	it("should fetch categories when locale is changed", () => {
		const props: CategoryTilesProps = {
			...minProps,
			locale: "fi"
		};

		const wrapper = shallowWithContext(<CategoryTiles {...props} />);
		const newProps = {...props,  locale: "en"};
		wrapper.instance().componentWillReceiveProps(newProps);
		expect(minProps.actions.updateMainCategories).toHaveBeenCalled();
	});
});

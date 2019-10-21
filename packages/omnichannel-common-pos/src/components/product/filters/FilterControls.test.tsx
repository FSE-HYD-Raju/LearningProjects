import * as React from "react";
import FilterControls, { FilterControlsProps } from "./FilterControls";
import { shallowWithContext } from "../../../testUtils";
import { ProductFilter, ProductOffering } from "../../../redux/types";

// TODO: update tests to test at least something
describe("FilterControls", () => {
	const minProps: FilterControlsProps = {
		products: [] as any as Array<ProductOffering>,
		activeFilters: [] as any as Array<ProductFilter>,
		filters: [] as any as Array<ProductFilter>,
		showFilterControls: true,
		applyIncludedMinutesFilter: false,
		combinedFilters: {},
		onlyFilterUpdated: false,
		actions: {
			getBoundariesForPriceRange: jest.fn(),
			updatePriceRange: jest.fn(),
			switchPriceType: jest.fn(),
			handlePriceRangeSlider: jest.fn(),
			updateMinutesFilterValues: jest.fn(),
			toggleFilter: jest.fn(),
			toggleCombinedFilter: jest.fn(),
			toggleApplyIncludedMinutesFilter: jest.fn(),
		}
	} as any as FilterControlsProps;

	it("succeeds at shallow mount without props", () => {
		const wrapper = shallowWithContext(<FilterControls {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});

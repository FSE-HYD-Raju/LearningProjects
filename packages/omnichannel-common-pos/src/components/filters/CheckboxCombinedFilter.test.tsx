import * as React from "react";
import { shallowWithContext, mountWithContext } from "../../testUtils";
import CheckboxCombinedFilter, { CheckboxCombinedFilterProps } from "./CheckboxCombinedFilter";
import { ReactWrapper } from "enzyme";
import { ProductFilter } from "../../redux/types";

describe("CheckboxCombinedFilter", () => {
	const minProps: CheckboxCombinedFilterProps = {
		filter: {
			filterLabel: "test",
		} as any as ProductFilter,
		combinedFilters: {},
		toggleCombinedFilter: jest.fn()
	};
	const findCheckbox = (wrapper: ReactWrapper) => {
		return wrapper.find("#shop-container-filters-show-only-test");
	};

	it("succeeds at shallow mount with min props", () => {
		const wrapper = shallowWithContext(
			<CheckboxCombinedFilter {...minProps} />
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("when filter in combinedFilters should be checked", () => {
		const props = {
			...minProps,
			combinedFilters: { test: minProps.filter }
		};
		const wrapper = shallowWithContext(<CheckboxCombinedFilter {...props} />);
		expect(findCheckbox(wrapper).props().checked).toBeTruthy();
	});

	it("when filter in combinedFilters should not be checked", () => {
		const props = {
			...minProps,
			combinedFilters: { otherFilter: {} } as any as Record<string, ProductFilter>
		};
		const wrapper = shallowWithContext(<CheckboxCombinedFilter {...props} />);
		expect(findCheckbox(wrapper).props().checked).toBeFalsy();
	});

	it("when checkbox clicked should call toggle callback", () => {
		const wrapper = mountWithContext(
			<CheckboxCombinedFilter {...minProps} />
		);
		findCheckbox(wrapper)
			.hostNodes()
			.simulate("click");
		expect(minProps.toggleCombinedFilter).toHaveBeenCalled();
	});
});

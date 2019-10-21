import * as React from "react";
import { shallowWithContext } from "../../testUtils";
import CheckboxListProductFilter from "./CheckboxListProductFilter";
import { ProductFilter } from "../../redux/types";

describe("CheckboxListProductFilter", () => {
	const minProps = {
		filter: {} as any as ProductFilter,
		toggleFilter: jest.fn(),
	};

	it("succeeds at shallow mount without props", () => {
		const wrapper = shallowWithContext(<CheckboxListProductFilter {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});

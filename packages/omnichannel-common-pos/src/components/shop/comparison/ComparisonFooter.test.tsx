import * as React from "react";

import { mountWithContext, shallowWithContext } from "../../../testUtils";
import ComparisonFooter, { ComparisonFooterProps } from "./ComparisonFooter";
import { ProductOffering } from "../../../redux/types";

describe("ComparisonFooter", () => {
	const minProps: ComparisonFooterProps = {
		items: [] as any as Array<ProductOffering>,
		actions: {
			show: jest.fn(),
			clear: jest.fn(),
			toggleItem: jest.fn(),
		}
	};

	it("succeeds at shallow mount with minimal props", () => {
		const wrapper = shallowWithContext(<ComparisonFooter {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimal props", () => {
		mountWithContext(<ComparisonFooter {...minProps} />);
	});
});

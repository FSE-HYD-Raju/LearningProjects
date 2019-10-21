import * as React from "react";
import { shallowWithContext } from "../../testUtils";
import ProductOfferingConfigurationPrice from "./ProductOfferingConfigurationPrice";

describe("ProductOfferingConfigurationPrice", () => {
	it("should shallow mount without props", () => {
		const wrapper = shallowWithContext(
			<ProductOfferingConfigurationPrice />
		);
		expect(wrapper).toMatchSnapshot();
	});
});

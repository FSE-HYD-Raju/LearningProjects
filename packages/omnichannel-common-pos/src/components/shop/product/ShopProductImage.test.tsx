import * as React from "react";

import { mountWithContext, shallowWithContext } from "../../../testUtils";
import ShopProductImage, { ShopProductImageProps } from "./ShopProductImage";
import { ProductOffering } from "../../../redux/types";

describe("ShopProductImage", () => {
	const minimumProps: ShopProductImageProps = {
		product: {
			id: "ac7a8d35-8ff4-4d1b-ab92-ce64a257a849",
			attributes: {
				commercialEnrichments: []
			}
		} as any as ProductOffering
	};

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(
			<ShopProductImage {...minimumProps} />
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		mountWithContext(<ShopProductImage {...minimumProps} />);
	});
});

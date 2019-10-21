import * as React from "react";
import { mountWithContext, shallowWithContext } from "omnichannel-common-pos";
import BarcodeInput from "./BarcodeInput";

describe("BarcodeInput", () => {
	const minProps = {
		barcode: "",
		productNotFound: false,
		actions: {
			findProduct: jest.fn(),
			saveBarcode: jest.fn(),
		}
	};

	it("succeeds at shallow mount with minimal props", () => {
		const wrapper = shallowWithContext(<BarcodeInput {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimal props", () => {
		mountWithContext(<BarcodeInput {...minProps} />);
	});
});

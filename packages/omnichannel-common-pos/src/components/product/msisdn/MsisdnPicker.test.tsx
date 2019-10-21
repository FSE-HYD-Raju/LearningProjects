import * as React from "react";
import { shallowWithContext } from "../../../testUtils";

import MsisdnPicker, { MsisdnPickerProps } from "./MsisdnPicker";

const props: MsisdnPickerProps = {
	selectNumber: () => {},
	selectedNumber: "1234567",
	msisdns: ["1234567", "1232323", "2132132"]
};

describe("MsisdnPicker", () => {
	it("succeeds at shallow mount without props", () => {
		const wrapper = shallowWithContext(<MsisdnPicker {...props} />);
		expect(wrapper).toMatchSnapshot();
	});
});

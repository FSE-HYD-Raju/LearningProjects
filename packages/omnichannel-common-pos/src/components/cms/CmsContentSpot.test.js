import React from "react";
import { CmsContentSpot } from "./CmsContentSpot";
import { shallowWithContext } from "../../testUtils/custom-mounters";

describe("CmsContentSpot", () => {
	it("succeeds at shallow mount with minimum props", () => {
		const minProps = {
			publishTarget: "btc"
		};
		const wrapper = shallowWithContext( <CmsContentSpot {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});

import * as React from "react";
import { mountWithContext, shallowWithContext } from "../../../testUtils";
import MsisdnPatternSearch, { MsisdnPatternSearchProps } from "./MsisdnPatternSearch";

describe("MsisdnPatternSearch", () => {
	const minimalProps = {
		validationPattern: "^[0-9\\?\\*]*$",
		validateInput: jest.fn(),
		required: true,
		onGetNewSet: jest.fn(),
		errors: {
			invalidPattern: false,
			invalidLength: false
		}
	} as MsisdnPatternSearchProps;

	it("succeeds at shallow mount with simple props", () => {
		const wrapper = shallowWithContext(<MsisdnPatternSearch {...minimalProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with simple props", () => {
		mountWithContext(<MsisdnPatternSearch {...minimalProps} />);
	});

	it("triggers onChange event on valid input", () => {
		const testMsisdn = "*040?1230000";
		const wrapper = mountWithContext(<MsisdnPatternSearch {...minimalProps} />);
		wrapper.find("input").simulate("change", { target: { value: testMsisdn } });
		expect(wrapper.state("invalidPattern")).toBeFalsy();
		setTimeout(() => {
			expect(minimalProps.validateInput).toHaveBeenCalledTimes(1);
		});
	});
});

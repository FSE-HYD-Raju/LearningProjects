import * as React from "react";
import CharacteristicsNotifications from "./CharacteristicsNotifications";
import { shallowWithContext, mountWithContext } from "../../../testUtils";

describe("CharacteristicsNotifications", () => {
	const minProps = {
		targetCharacteristic: "CH_Friend_Number",
		clearProductOfferingErrors: jest.fn(),
	};

	it("should display an error message below a specific characteristic input field", () => {
		const mockedProductOfferingError = [
			{
				errCode: "ERR_MSISDN_DOES_NOT_BELONG_TO_OPERATOR",
				messageId: "msisdnDoesNotBelongToOperator",
				target: "",
				characteristic: "CH_Friend_Number"
			}
		];
		const props = {
			...minProps,
			mappedProductOfferingErrors: mockedProductOfferingError,
		};

		const wrapper = mountWithContext(<CharacteristicsNotifications {...props}/>);

		const characteristicsNotificiation = wrapper.find("#error-id-ERR_MSISDN_DOES_NOT_BELONG_TO_OPERATOR");
		expect(wrapper).toMatchSnapshot();
		expect(characteristicsNotificiation.text().toLowerCase()).toContain("Msisdn does not belong to the operator".toLowerCase());
	});

	it("should call to clear error messages when unmounted", () => {
		const mockedClearError = jest.fn();
		const wrapper = shallowWithContext(<CharacteristicsNotifications {...minProps} clearProductOfferingErrors={mockedClearError}/>);

		const componentWillUnmount = jest.spyOn(wrapper.instance(), "componentWillUnmount");

		wrapper.unmount();
		expect(componentWillUnmount).toHaveBeenCalled();
		expect(mockedClearError).toHaveBeenCalled();
	});
});

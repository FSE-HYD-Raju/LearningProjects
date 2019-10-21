import * as React from "react";
import { defineMessages } from "react-intl";

import { mountWithContext, shallowWithContext } from "../../testUtils";

import TranslatedComponent from "./TranslatedComponent";

describe("TranslatedComponents", () => {
	const messages = defineMessages({
		passport_identification: {
			id: "passport-identification-name",
			description: "service-desk, new customer, label passport",
			defaultMessage: "Passport"
		},
		drivingLicense_identification: {
			id: "drivers-licence-identification-name",
			description: "service-desk, new customer, label drivers licence",
			defaultMessage: "Drivers licence"
		}
	});

	const minProps = {
		value: "123",
		id: "123"
	};

	it("succeeds at shallow mount without props", () => {
		const wrapper = shallowWithContext(<TranslatedComponent {...minProps}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at full mount without props", () => {
		mountWithContext(<TranslatedComponent {...minProps}/>);
	});

	it("renders given option with given translation and not with option.value or formatted message", () => {
		const props = {
			...minProps,
			value: "drivingLicense",
			wrapper: "option",
			translation: "Driving licence",
			formattedMessage: messages.passport_identification
		};
		const wrapper = mountWithContext(<TranslatedComponent {...props} />);
		expect(wrapper.find("option").text()).toBe("Driving licence");
		expect(wrapper.find("option").prop("value")).toBe("drivingLicense");
	});

	it("renders given option with formatted message and not as option.value since translation is not given", () => {
		const props = {
			...minProps,
			value: "drivingLicense",
			wrapper: "option",
			formattedMessage: messages.drivingLicense_identification
		};
		const wrapper = mountWithContext(<TranslatedComponent {...props} />);
		expect(wrapper.find("option").text()).toBe("Drivers licence");
		expect(wrapper.find("option").prop("value")).toBe("drivingLicense");
	});

	it("renders given option with option.value since formatted message or translation map value can't be found", () => {
		const props = {
			...minProps,
			value: "passport",
			wrapper: "option"
		};
		const wrapper = mountWithContext(<TranslatedComponent {...props} />);
		expect(wrapper.find("option").text()).toBe("passport");
	});
});

import * as React from "react";
import { mountWithContext, shallowWithContext, } from "omnichannel-common-pos";

import SelectPrivacyConsent, { SelectPrivacyConsentProps } from "./SelectPrivacyConsent";

describe("SelectPrivacyConsent", () => {
	let props: SelectPrivacyConsentProps;
	beforeEach(() => {
		props = ({
			name: "Encuestas TIGO SMS",
			description: "Encuestas TIGO SMS",
			changeHandler: jest.fn(),
			inputCharacteristicKey: "CH_survey_marketing_SMS",
		} as any) as SelectPrivacyConsentProps;
	});

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(<SelectPrivacyConsent {...props} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		mountWithContext(<SelectPrivacyConsent {...props} />);
	});

	it("displays privacy consents name passed via props", () => {
		const wrapper = mountWithContext(<SelectPrivacyConsent {...props} />);
		const headerText = wrapper.find(".SelectPrivacyConsent-privacy-consent-input-label").at(0);
		const expectedText = new RegExp(props.name);
		expect(headerText.text()).toMatch(expectedText);
	});

	it("displays privacy consents description passed via props", () => {
		const wrapper = mountWithContext(<SelectPrivacyConsent {...props} />);
		const headerText = wrapper.find(".SelectPrivacyConsent-privacy-consent-input-description").at(0);
		const expectedText = new RegExp(props.description);
		expect(headerText.text()).toMatch(expectedText);
	});

	it("renders privacy consents input characteristics items", () => {
		const wrapper = mountWithContext(<SelectPrivacyConsent {...props}/>);

		expect(wrapper.text()).toContain("Encuestas TIGO SMS");
		expect(wrapper.text()).toContain("Encuestas TIGO SMS");
		expect(wrapper.text()).toContain("Yes");
		expect(wrapper.text()).toContain("No");
	});
});

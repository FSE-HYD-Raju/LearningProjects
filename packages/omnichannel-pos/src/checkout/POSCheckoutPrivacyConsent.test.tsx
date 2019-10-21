import * as React from "react";
import { mountWithContext, shallowWithContext, } from "omnichannel-common-pos";
import POSCheckoutPrivacyConsent, { POSCheckoutPrivacyConsentProps, } from "./POSCheckoutPrivacyConsent";

describe("POSCheckoutPrivacyConsent", () => {
	let props: POSCheckoutPrivacyConsentProps;
	beforeEach(() => {
		props = ({
			privacyConsents: [],
			privacyConsentKeys: [],
			changeHandler: jest.fn(),
			selectedConsents: { "CH_survey_marketing_SMS": true },
		} as any) as POSCheckoutPrivacyConsentProps;
	});

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(<POSCheckoutPrivacyConsent {...props} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		mountWithContext(<POSCheckoutPrivacyConsent {...props} />);
	});
});

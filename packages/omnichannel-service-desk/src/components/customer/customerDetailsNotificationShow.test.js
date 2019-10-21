import React from "react";
import { shallow } from "enzyme";
import { mountWithContext } from "omnichannel-common-pos";

import CustomerDetailsNotificationsShow from "../../../src/components/customer/CustomerDetailsNotificationsShow";

describe("CustomerDetailsNotificationsShow", () => {
	it("succeeds at shallow mount without props", () => {
		const wrapper = shallow(<CustomerDetailsNotificationsShow />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount without props", () => {
		mountWithContext(<CustomerDetailsNotificationsShow />);
	});

	it("renders marketing permissions correctly if there is no settings to be found", () => {
		const wrapper = mountWithContext(<CustomerDetailsNotificationsShow />);

		// Own marketing permissions
		const email = wrapper
			.find(".CustomerDetailsView-marketing-not-allowed")
			.first();
		const sms = wrapper
			.find(".CustomerDetailsView-marketing-not-allowed")
			.at(1);

		expect(email.text()).toEqual("Email");
		expect(sms.text()).toEqual("SMS");

		// 3rd party

		const email3rd = wrapper
			.find(".CustomerDetailsView-marketing-not-allowed")
			.at(2);
		const sms3rd = wrapper
			.find(".CustomerDetailsView-marketing-not-allowed")
			.at(3);
		expect(email3rd.text()).toEqual("Email");
		expect(sms3rd.text()).toEqual("SMS");
	});

	it("renders marketing permissions correctly - both email marketings allowed", () => {
		const wrapper = mountWithContext(
			<CustomerDetailsNotificationsShow
				privacySettings={{
					"own-marketing-email": true,
					"third-party-marketing-email": true
				}}
			/>
		);

		const emailOwn = wrapper
			.find(".CustomerDetailsView-marketing-allowed")
			.at(0);

		const email3rd = wrapper
			.find(".CustomerDetailsView-marketing-allowed")
			.at(1);

		expect(emailOwn.text()).toEqual("Email");
		expect(email3rd.text()).toEqual("Email");
	});
});

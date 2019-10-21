import React from "react";

import { mountWithContext, shallowWithContext } from "omnichannel-common-pos";

import CustomerDetailsNotificationsEdit from "../../../src/components/customer/CustomerDetailsNotificationsEdit";

describe("CustomerDetailsNotificationsEdit", () => {
	it("succeeds at shallow mount without props", () => {
		const wrapper = shallowWithContext(
			<CustomerDetailsNotificationsEdit />
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount without props", () => {
		mountWithContext(<CustomerDetailsNotificationsEdit />);
	});

	it("renders all 4 togglers", () => {
		const wrapper = mountWithContext(<CustomerDetailsNotificationsEdit />);

		const togglers = wrapper
			.find(".CustomerDetailsNotificationsEdit-toggler")
			.hostNodes();

		expect(togglers.length).toEqual(4);
	});

	it("#toggleValue with 'own-marketing-email' toggles states own-marketing-email value when clicked (no privacySettings from props)", () => {
		const wrapper = mountWithContext(<CustomerDetailsNotificationsEdit />);

		const marketing = wrapper
			.find(
				"#CustomerDetailsNotificationsEdit-toggler-own-marketing-email"
			)
			.hostNodes();

		marketing.simulate("click");

		const stateData = wrapper.state();
		expect(!stateData.privacySettings["own-marketing-email"]).toEqual(
			false
		);
	});

	it("#toggleValue with 'third-party-marketing-email' toggles states third-party-marketing-email value when clicked (privacySettings from props)", () => {
		const props = {
			privacySettings: {
				"third-party-marketing-email": true
			}
		};

		const wrapper = mountWithContext(
			<CustomerDetailsNotificationsEdit {...props} />
		);

		const marketing = wrapper
			.find(
				"#CustomerDetailsNotificationsEdit-toggler-third-party-marketing-email"
			)
			.hostNodes();

		marketing.simulate("click");

		const stateData = wrapper.state();

		expect(!stateData.privacySettings["third-party-marketing-email"]).toEqual(
			true
		);
	});
});

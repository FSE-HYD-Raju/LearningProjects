import React from "react";
import {
	mountWithContext,
	shallowWithContext,
	TestUtils
} from "omnichannel-common-pos";

import SampleCmsContentSpots from "./SampleCmsContentSpots";

describe("SampleCmsContentSpots", () => {
	const { makeStore } = TestUtils;
	const props = {
		CMSAdminStore: {
			...makeStore("context.flux.stores.CmsAdminStore"),
			previewData: () => true
		},
		UserStore: {
			...makeStore("context.flux.stores.UserStore"),
			isLoggedIn: () => true
		}
	};
	const context = {
		flux: {
			actions: {}
		},
		store: TestUtils.mockReduxStore({
			auth: {},
			user: { user: { firstName: "Test" } },
		})
	};

	it("succeeds at shallow mount without props", () => {
		const wrapper = shallowWithContext(<SampleCmsContentSpots />, {
			context
		});
		expect(
			wrapper
				.find("div")
				.at(0)
				.hasClass("oc-max-width")
		).toBe(true);
	});

	it("succeeds at shallow mount with props", () => {
		const wrapper = shallowWithContext(
			<SampleCmsContentSpots {...props} />,
			{ context }
		);
		expect(wrapper).toMatchSnapshot();
		expect(
			wrapper
				.find("div")
				.at(0)
				.hasClass("oc-max-width")
		).toBe(true);
	});

	it("succeeds at deep mount with props", () => {
		const wrapper = mountWithContext(<SampleCmsContentSpots {...props} />, {
			context
		});
		expect(wrapper).toMatchSnapshot();
		expect(
			wrapper
				.find("div")
				.at(0)
				.hasClass("oc-max-width")
		).toBe(true);
	});
});

import * as React from "react";
import { mountWithContext, shallowWithContext } from "../../../testUtils";
import HasActiveLoanTopUpBanner, { HasActiveLoanTopUpBannerProps } from "./HasActiveLoanTopUpBanner";

describe("HasActiveLoanTopUpBanner", () => {
	let props: HasActiveLoanTopUpBannerProps;
	beforeEach(() => {
		props = {
			hasActiveLoan: true
		} as HasActiveLoanTopUpBannerProps;
	});

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(<HasActiveLoanTopUpBanner {...props} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		mountWithContext(<HasActiveLoanTopUpBanner {...props} />);
	});

	it("doesn't render message if there's no active loan (hasActiveLoan is false)", () => {
		props = ({
			hasActiveLoan: false
		} as any) as HasActiveLoanTopUpBannerProps;
		const wrapper = mountWithContext(<HasActiveLoanTopUpBanner {...props} />);
		expect(wrapper.instance()).toBe(null);
	});

	it("shows message with passed loan amount", () => {
		props = ({
			hasActiveLoan: true,
			loanAmountToPayBack: {
				taxFreeAmount: 25,
				currency: "USD"
			}
		} as any) as HasActiveLoanTopUpBannerProps;
		const wrapper = mountWithContext(<HasActiveLoanTopUpBanner {...props} />);
		const message = wrapper.find("#loan-priority-message-test-id").at(0);
		expect(message.text()).toContain("$25");
	});
});

import * as React from "react";
import { shallowWithContext, mountWithContext } from "omnichannel-common-pos";
import { default as CashPaymentCompleted, CashPaymentCompletedStateProps, CashPaymentCompletedActionProps } from "./CashPaymentCompleted";

describe("CashPaymentCompleted", () => {
	let minimumProps: any;
	beforeEach(() => {
		minimumProps = {
			personId: "8ef900db-33e4-40d6-b81a-348b31d3f0a7",
			referenceNumber: "3631",
			actions: {
				createBasket: jest.fn(),
			}
		} as CashPaymentCompletedStateProps & CashPaymentCompletedActionProps;
	});
	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(<CashPaymentCompleted { ...minimumProps } / > );
		expect(wrapper).toMatchSnapshot();
	});
	it("succeeds at deep mount with minimum props", () => {
		mountWithContext(<CashPaymentCompleted { ...minimumProps } / >);
	});
});

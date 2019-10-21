import * as React from "react";
import SubscriptionCreditInfo, { SubscriptionCreditInfoProps } from "./SubscriptionCreditInfo";
import { shallowWithContext, mountWithContext } from "../../../testUtils";
import {
	ProductLifecycleStatus,
	SimplePrice
} from "../../../redux/types";

const getPrice = (cost: number): SimplePrice => ({ taxFreeAmount: cost, currency: "EUR" });

describe("SubscriptionCreditInfo", () => {
	const props: SubscriptionCreditInfoProps = {
		loanDescription: "test description",
		activeLoanDetails: {
			loanFee: getPrice(1),
			loanedBalance: getPrice(2),
			remainingLoanAmount: getPrice(3),
			loanAmountToPayBack: getPrice(4),
			loanFeeToPayBack: getPrice(5),
			totalAmountToPayBack: getPrice(6),
			dueDate: new Date("October 30, 2018 23:15:30 GMT+02:00")
		},
		actions: {
			openTopUpModal: jest.fn()
		}
	};

	it("succeeds at shallow mount with minimal props", () => {
		const wrapper = shallowWithContext(<SubscriptionCreditInfo {...props} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("should render null when no active loan", () => {
		const wrapper = shallowWithContext(<SubscriptionCreditInfo {...{ ...props, activeLoanDetails: undefined }} />);
		expect(wrapper.getElement()).toBeNull();
	});
	it("should show modal when clicked on info circle", () => {
		const wrapper = mountWithContext(<SubscriptionCreditInfo {...props} />);
		wrapper.find("#credit-info-button").simulate("click");
		wrapper.update();
		expect(wrapper.find("CreditInfoModal").props().showModal).toBeTruthy();
	});
	it("should hide modal when clicked modal close button", () => {
		const wrapper = mountWithContext(<SubscriptionCreditInfo {...props} />);
		wrapper.find("#credit-info-button").simulate("click");
		wrapper.update();
		wrapper.find(".modal-header button").simulate("click");
		wrapper.update();
		expect(wrapper.find("CreditInfoModal").props().showModal).toBeFalsy();
	});
});

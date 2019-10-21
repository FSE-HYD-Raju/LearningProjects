import * as React from "react";
import { mountWithContext, shallowWithContext, TestUtils } from "../../../testUtils";
const { getModalContents } = TestUtils;
import CreditInfoModal, { CreditInfoModalProps } from "./CreditInfoModal";

describe("CreditInfoModal", () => {
	let props: CreditInfoModalProps;
	const getPrice = (amount: number) => { return {taxFreeAmount: amount, currency: "EUR"}; };
	beforeEach(() => {
		props = {
			showModal: true,
			loanDescription: "test description",
			originalLoanAmount: getPrice(25),
			originalLoanFee: getPrice(5),
			remainingLoanAmount: getPrice(18.45),
			loanAmountToPayBack: getPrice(-25),
			loanFeeToPayBack: getPrice(-5),
			totalRemainingCredit: getPrice(-30),
			dueDate: new Date("October 30, 2018 23:15:30 GMT+02:00"),
			onClose: jest.fn(),
			onPayBack: jest.fn()
		} ;
	});

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(
			<CreditInfoModal {...props} />
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		mountWithContext(<CreditInfoModal {...props} />);
	});

	it("should call onClose after click on Cancel button", () => {
		const wrapper = mountWithContext(<CreditInfoModal {...props} />);
		const modalContents = getModalContents(wrapper);
		const btn = modalContents.find("#oc-modal-cancel-button").hostNodes();
		btn.simulate("click");

		expect(props.onClose).toBeCalled();
	});
	it("should call onPayBack after click on PayBack button", () => {
		const wrapper = mountWithContext(<CreditInfoModal {...props} />);
		const modalContents = getModalContents(wrapper);
		const btn = modalContents.find("#oc-modal-action-button").hostNodes();
		btn.simulate("click");

		expect(props.onPayBack).toBeCalled();
	});

});

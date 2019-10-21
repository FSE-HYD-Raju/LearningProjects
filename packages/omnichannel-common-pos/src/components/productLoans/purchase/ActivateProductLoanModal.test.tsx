import * as React from "react";
import { mountWithContext, shallowWithContext, TestUtils } from "../../../testUtils";
import ActivateProductLoanModal from "./ActivateProductLoanModal";
import { ActivateProductLoanModalProps } from "./ActivateProductLoanModalProps";

describe("ActivateProductLoanModal", () => {
	let props: ActivateProductLoanModalProps;
	beforeEach(() => {
		props = {
			actions: { closeModal: () => {}, confirm: () => {} },
			msisdn: "+38 099 1234 567",
			initializeAddonConfig: undefined,
			loanedBalance: {
				taxFreeAmount: 25,
				currency: "EUR"
			},
			fee: {
				taxFreeAmount: 5,
				currency: "EUR"
			},
			totalCredit: {
				taxFreeAmount: -30,
				currency: "EUR"
			}
		};
	});

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(<ActivateProductLoanModal {...props} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		mountWithContext(<ActivateProductLoanModal {...props} />);
	});

	it("enables Confirm button when input is checked", () => {
		const { getModalContents } = TestUtils;
		const wrapper = mountWithContext(<ActivateProductLoanModal {...props} />);
		let modalContents = getModalContents(wrapper);
		modalContents.find("input").simulate("change", { target: { value: true } });
		modalContents = getModalContents(wrapper);
		const btn = modalContents.find("#oc-modal-action-button").hostNodes();
		expect(btn.prop("disabled")).toEqual(false);
	});
});

import * as React from "react";
import { mountWithContext, shallowWithContext } from "../../../testUtils";
import { CreditCardSelectionList, CreditCardStorageSelectionProps } from "./CreditCardSelectionList";
import { CustomerPaymentMethod } from "../../../redux";

const customerPaymentMethods: CustomerPaymentMethod[] = require("./testData/paymentMethods.json");

describe("CreditCardSelectionList", () => {
	let props: CreditCardStorageSelectionProps;

	beforeEach(() => {
		props = ({
			onChangeCreditCard: () => {},
			customerPaymentMethods: []
		} as any) as CreditCardStorageSelectionProps;
	});

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(<CreditCardSelectionList {...props} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		mountWithContext(<CreditCardSelectionList {...props} />);
	});

	it("should show only valid credit cards", () => {
		const wrapper = mountWithContext(
			<CreditCardSelectionList {...props} customerPaymentMethods={customerPaymentMethods} />
		);

		expect(wrapper.find("OcInput").length).toBe(1);
	});
});

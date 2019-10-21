import { ProductOffering } from "../../redux";
import { shallowWithContext } from "../../testUtils";
import CheckoutMonthlyTopUpForm, { CheckoutMonthlyTopUpFormProps } from "./CheckoutMonthlyTopUpForm";
import * as React from "react";

describe("CheckoutMonthlyTopUpForm", () => {
	const context = {
		intl: {
			formatMessage: () => ""
		}
	};
	const productOffering = {
		inputCharacteristics: {
			CH_TopUp_Amount: {
				values: [{
					name: "10",
					value: "10"
				},
				{
					name: "20",
					value: "20"
				}]
			}
		}
	} as any as ProductOffering;

	const props = {
		productOffering,
		topUpAmount: "CH_TopUp_Amount"
	} as CheckoutMonthlyTopUpFormProps;

	it("succeeds at shallow mount with minimal props", () => {
		const wrapper = shallowWithContext(<CheckoutMonthlyTopUpForm {...props} />,
			{ context });
		expect(wrapper).toMatchSnapshot();
	});

	it("should render correct amount of options", () => {
		const wrapper = shallowWithContext(<CheckoutMonthlyTopUpForm {...props} />, { context });

		const select = wrapper.find("#RecurringTopUpConfigurationForm-monthly-top-up-amount-field");

		expect(select.find("option").length).toEqual(3);
	});
});

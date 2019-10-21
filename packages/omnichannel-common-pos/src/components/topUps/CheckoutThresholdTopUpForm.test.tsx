import { ProductOffering } from "../../redux";
import { shallowWithContext } from "../../testUtils";
import CheckoutThresholdTopUpForm, { CheckoutThresholdTopUpFormProps } from "./CheckoutThresholdTopUpForm";
import * as React from "react";

describe("CheckoutThresholdTopUpForm", () => {
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
			},
			CH_Threshold_Value: {
				values: [{
					name: "10",
					value: "10"
				},
				{
					name: "15",
					value: "15"
				},
				{
					name: "20",
					value: "20"
				}]
			},
			CH_Monthly_TopUp_Limit: {
				values: [{
					name: "10",
					value: "10"
				},
				{
					name: "20",
					value: "20"
				},
				{
					name: "30",
					value: "30"
				},
				{
					name: "40",
					value: "40"
				}]
			},
		}
	} as any as ProductOffering;

	const props = {
		productOffering,
		checkoutTopUpConfiguration: {
			topUpAmount: "CH_TopUp_Amount",
			thresholdValue: "CH_Threshold_Value",
			monthlyLimit: "CH_Monthly_TopUp_Limit",
		}
	} as CheckoutThresholdTopUpFormProps;

	it("succeeds at shallow mount with minimal props", () => {
		const wrapper = shallowWithContext(<CheckoutThresholdTopUpForm {...props} />,
			{ context });
		expect(wrapper).toMatchSnapshot();
	});

	it("should render correct amount of options", () => {
		const wrapper = shallowWithContext(<CheckoutThresholdTopUpForm {...props} />, { context });

		const thresholdValueOptions = wrapper.find("[name='thresholdValue'] option");
		const topUpAmountOptions = wrapper.find("[name='topUpAmount'] option");
		const limitInMonthOptions = wrapper.find("[name='limitInMonth'] option");

		expect(topUpAmountOptions.length).toBe(3);
		expect(thresholdValueOptions.length).toBe(4);
		expect(limitInMonthOptions.length).toBe(5);
	});
});

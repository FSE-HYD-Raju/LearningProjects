import * as React from "react";
import { shallowWithContext, mountWithContext } from "../../testUtils";
import PaymentSelection, { PaymentSelectionProps } from "./PaymentSelection";
import { ContextualPaymentMethod } from "../../redux/types";

const minProps: PaymentSelectionProps = {
	paymentMethods: [],
	customerPaymentMethods: [],
	cashPaymentIdentifiers: [],
	changePaymentMethod: jest.fn()
};

describe("PaymentSelection", () => {
	it("succeeds at shallow mount with minimal props", () => {
		const wrapper = shallowWithContext(<PaymentSelection {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimal props", () => {
		mountWithContext(<PaymentSelection {...minProps} />);
	});

	it("should call binded method on payment method selection", () => {
		const paymentMethods: Array<ContextualPaymentMethod> = [
			{ id: "balance", label: "Balance" },
			{ id: "paypal", label: "Paypal" }
		] as any as Array<ContextualPaymentMethod>;

		const changePaymentMethod = jest.fn();

		const wrapper = mountWithContext(
			<PaymentSelection changePaymentMethod={changePaymentMethod} paymentMethods={paymentMethods}/>
		);

		const paymentInputs = wrapper.find("input[name=\"balance\"]");

		paymentInputs.first().simulate("click"); // , { target: { checked: true } });
		expect(changePaymentMethod).toHaveBeenCalled();
	});

	it("renders all payment methods; Balance, Paypal", () => {
		const props: PaymentSelectionProps = {
			...minProps,
			paymentMethods: [
				{ id: "balance", label: "Balance" },
				{ id: "paypal", label: "Paypal" }
			] as any as Array<ContextualPaymentMethod>
		};

		const wrapper = mountWithContext(<PaymentSelection {...props} />);

		const paymentMethodsCount = Object.keys(props.paymentMethods).length;

		const radios = wrapper.find("input[type=\"radio\"]");
		expect(radios.length).toEqual(paymentMethodsCount);
	});

	it("renders monetary balance amount when balance payment is used", () => {
		const props: PaymentSelectionProps = {
			...minProps,
			mainBalance: "30",
			selectedCurrency: "EUR",
			paymentMethods: [
				{ id: "balance", label: "Balance" },
				{ id: "paypal", label: "Paypal" }
			] as any as Array<ContextualPaymentMethod>
		};

		const wrapper = mountWithContext(<PaymentSelection {...props} />);
		const balanceLabel = wrapper.find("[htmlFor=\"balance\"]");

		expect(balanceLabel.text()).toEqual("Balance (30 EUR)");
	});

	it("renders cash payment if cash payment is enabled", () => {
		const props: PaymentSelectionProps = {
			...minProps,
			paymentMethods: [
				{ id: "balance", label: "Balance" },
				{ id: "paypal", label: "Paypal" },
				{ id: "cash", label: "Cash on delivery" }
			] as any as Array<ContextualPaymentMethod>,
			cashPaymentIdentifiers: ["cash"],
			cashPaymentEnabled: true
		};

		const wrapper = mountWithContext(<PaymentSelection {...props} />);

		const radios = wrapper.find("input[type=\"radio\"]");
		const cashRadio = radios.find("#cash");
		expect(cashRadio.length).toEqual(1);
	});

	it("does not render cash payment if it is disabled", () => {
		const props: PaymentSelectionProps = {
			...minProps,
			paymentMethods: [
				{ id: "balance", label: "Balance" },
				{ id: "paypal", label: "Paypal" },
				{ id: "cash", label: "Cash on delivery" }
			] as any as Array<ContextualPaymentMethod>,
			cashPaymentIdentifiers: ["cash"],
			cashPaymentEnabled: false
		};

		const wrapper = mountWithContext(<PaymentSelection {...props} />);

		const radios = wrapper.find("input[type=\"radio\"]");
		const cashRadio = radios.find("#cash");
		expect(cashRadio.length).toEqual(0);
	});

	it("renders message with info if user clicks on payment on delivery", () => {
		const props: PaymentSelectionProps = {
			...minProps,
			paymentMethods: [
				{id: "creditcard", label: "Credit card"},
				{id: "cashOnDelivery", label: "Payment on delivery"},
			] as any as Array<ContextualPaymentMethod>,
			selectedPaymentMethod: "cashOnDelivery",
			cashPaymentEnabled: true
		};
		const wrapper = mountWithContext(<PaymentSelection {...props} />);
		const radios = wrapper.find("input[type=\"radio\"]");
		const cashOnDeliveryRadio = radios.find("#cashOnDelivery");
		cashOnDeliveryRadio.first().simulate("click");
		const paymentOnDeliveryContainer = wrapper.find(".PaymentSelection-payment-on-delivery-container");
		expect(paymentOnDeliveryContainer.length).toEqual(1);
	});

	it("renders link to checkout step if user clicks on payment on delivery", () => {
		const props: PaymentSelectionProps = {
			...minProps,
			paymentMethods: [
				{id: "creditcard", label: "Credit card"},
				{id: "cashOnDelivery", label: "Payment on delivery"},
			] as any as Array<ContextualPaymentMethod>,
			selectedPaymentMethod: "cashOnDelivery",
			cashPaymentEnabled: true
		};
		const wrapper = mountWithContext(<PaymentSelection {...props} />);
		const radios = wrapper.find("input[type=\"radio\"]");
		const cashOnDeliveryRadio = radios.find("#cashOnDelivery");
		cashOnDeliveryRadio.first().simulate("click");
		const linkToCheckout = wrapper.find("a");
		expect(linkToCheckout.prop("href")).toEqual("/checkout");
		expect(linkToCheckout.text()).toEqual(" Customer info step");
	});

});

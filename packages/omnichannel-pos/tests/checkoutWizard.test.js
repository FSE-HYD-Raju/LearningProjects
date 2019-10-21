import React from "react";
import toJson from "enzyme-to-json";

import { mountWithContext, shallowWithContext } from "omnichannel-common-pos";

import CheckoutWizard from "../src/checkout/CheckoutWizard";

describe("CheckoutWizard", () => {
	const context = {
		flux: {
			actions: {
				BasketActions: {
					getActiveBasket: userId => {
						console.log(
							"MOCKED getActiveBasket(), userId:",
							userId
						);
					},
					getActiveBasketByBasketId: activeBasketId => {
						console.log(
							"MOCKED getActiveBasketByBasketId(), activeBasketId:",
							activeBasketId
						);
					}
				}
			}
		}
	};

	/* the component would render without user, but then sessionStorage is required.
     */
	const props = {
		BasketStore: {},
		UserStore: {
			user: {
				id: 1
			}
		},
		PaymentStore: {}
	};

	it("succeeds at shallow mount without props", () => {
		const wrapper = shallowWithContext(<CheckoutWizard />);
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it("succeeds at deep mount without props", () => {
		mountWithContext(<CheckoutWizard />);
	});

	it("renders as null with minimum props", () => {
		const wrapper = mountWithContext(<CheckoutWizard {...props} />, {
			// attachTo: document.body,
			context
		});

		const checkoutWizard_steps = wrapper.find(".CheckoutWizard-steps");
		expect(checkoutWizard_steps.length).toEqual(
			1,
			".CheckoutWizard-steps not found or there were more than one"
		);

		const steps = checkoutWizard_steps.find(".CheckoutWizard-step");
		expect(steps.length).toEqual(
			4,
			"There should be 4 .CheckoutWizard-step elements, found " +
				steps.length
		);
	});

	it("should initially render all steps as incomplete", () => {
		const wrapper = mountWithContext(<CheckoutWizard {...props} />, {
			// attachTo: document.body,
			context
		});

		const checkoutWizard_steps = wrapper.find(".CheckoutWizard-steps");
		expect(checkoutWizard_steps.length).toEqual(
			1,
			".CheckoutWizard-steps not found or there were more than one"
		);

		const steps = checkoutWizard_steps.find(".CheckoutWizard-step");
		expect(steps.length).toEqual(
			4,
			"There should be 4 .CheckoutWizard-step elements, found " +
				steps.length
		);

		steps.forEach(n => {
			expect(n.hasClass("CheckoutWizard-incomplete-step")).toEqual(
				true,
				"Every .CheckoutWizard-step should also have class CheckoutWizard-incomplete-step"
			);
		});
	});

	describe("step", () => {
		const stepData = [
			{
				name: "one",
				label: "Configuration",
				type: "Configure your services"
			},
			{
				name: "two",
				label: "Delivery",
				type: "Select your delivery methods"
			},
			{
				name: "three",
				label: "Summary",
				type: "Review your order and accept the related contract"
			},
			{
				name: "four",
				label: "Payment",
				type: "Pay for your order"
			}
		];
		let wrapper = null;
		let checkoutWizard_steps = null;
		let steps = null;
		let numberContainers = null;
		function chekcStepDataRenderedCorrectrly(
			numberContainers,
			stepData,
			wrapper,
			idx
		) {
			const numberContainer = numberContainers
				.find(".CheckoutWizard-" + stepData[idx].name)
				.parent();
			expect(numberContainer.length).toEqual(
				1,
				".CheckoutWizard-" +
					stepData[idx].name +
					" not found or there were more than one"
			);

			const body = wrapper.find(".CheckoutWizard-body").at(idx);

			const label = wrapper.find(".CheckoutWizard-label").at(idx);

			expect(label.text().toLowerCase()).toEqual(
				stepData[idx].label.toLowerCase()
			);

			const type = body.find(".CheckoutWizard-type");
			expect(type.length).toEqual(
				1,
				".CheckoutWizard-type not found or there were more than one"
			);
			expect(type.text().toLowerCase()).toEqual(
				stepData[idx].type.toLowerCase()
			);
		}

		beforeEach(() => {
			wrapper = mountWithContext(<CheckoutWizard {...props} />, {
				// attachTo: document.body,
				context
			});

			checkoutWizard_steps = wrapper.find(".CheckoutWizard-steps");
			expect(checkoutWizard_steps.length).toEqual(
				1,
				".CheckoutWizard-steps not found or there were more than one"
			);

			steps = checkoutWizard_steps.find(".CheckoutWizard-step");
			expect(steps.length).toBeGreaterThan(
				0,
				"There should be more than zero .CheckoutWizard-step elements"
			);

			numberContainers = steps.find(".CheckoutWizard-number-container");
			expect(numberContainers.length).toBeGreaterThan(
				0,
				"There should be more than zero .CheckoutWizard-number-container elements"
			);
		});

		it("CheckoutWizard-body length equal stepData.length", () => {
			const body = wrapper.find(".CheckoutWizard-body");
			expect(body.length).toEqual(
				stepData.length,
				".CheckoutWizard-body not found or there were more than one"
			);
		});
		it("CheckoutWizard-label length equal stepData.length", () => {
			const label = wrapper.find(".CheckoutWizard-label");
			expect(label.length).toEqual(
				stepData.length,
				".CheckoutWizard-label not found or there were more than one"
			);
		});

		it("stepData name=one is rendered correctly", () => {
			chekcStepDataRenderedCorrectrly(
				numberContainers,
				stepData,
				wrapper,
				0
			);
		});

		it("stepData name=two is rendered correctly", () => {
			chekcStepDataRenderedCorrectrly(
				numberContainers,
				stepData,
				wrapper,
				1
			);
		});

		it("stepData name=three is rendered correctly", () => {
			chekcStepDataRenderedCorrectrly(
				numberContainers,
				stepData,
				wrapper,
				2
			);
		});

		it("stepData name=four is rendered correctly", () => {
			chekcStepDataRenderedCorrectrly(
				numberContainers,
				stepData,
				wrapper,
				3
			);
		});
	});

	describe("calls given saveCheckoutConfigurationToBasket() with correct arguments", () => {
		const stepData = [
			{
				numeralName: "one",
				name: "SETUP",
				url: "/servicedesk/checkout/setup"
			},
			{
				numeralName: "two",
				name: "DELIVERY",
				url: "/servicedesk/checkout/delivery"
			},
			{
				numeralName: "three",
				name: "SUMMARY",
				url: "/servicedesk/checkout/summary"
			},
			{
				numeralName: "four",
				name: "PAYMENT",
				url: "/servicedesk/checkout/payment"
			}
		];
		let wrapper = null;
		let checkoutWizard_steps = null;
		let steps = null;
		let numberContainers = null;
		let currentStepEntry = null;
		let fnDone = null;

		function saveCheckoutConfigurationToBasket(url, stepName) {
			console.log(
				"MOCKED saveCheckoutConfigurationToBasket(), url, stepName:",
				url,
				stepName
			);
			expect(url).toEqual(currentStepEntry.url);
			expect(stepName).toEqual(currentStepEntry.name);
			fnDone();
		}

		beforeEach(() => {
			wrapper = mountWithContext(
				<CheckoutWizard
					{...props}
					saveCheckoutConfigurationToBasket={
						saveCheckoutConfigurationToBasket
					}
				/>,
				{
					// attachTo: document.body,
					context
				}
			);

			checkoutWizard_steps = wrapper.find(".CheckoutWizard-steps");
			expect(checkoutWizard_steps.length).toEqual(
				1,
				".CheckoutWizard-steps not found or there were more than one"
			);

			steps = checkoutWizard_steps.find(".CheckoutWizard-step");
			expect(steps.length).toBeGreaterThan(
				0,
				"There should be more than zero .CheckoutWizard-step elements"
			);

			numberContainers = steps.find(".CheckoutWizard-number-container");
			expect(numberContainers.length).toBeGreaterThan(
				0,
				"There should be more than zero .CheckoutWizard-number-container elements"
			);
		});

		function numeralNameRenderedCorrectly(done, idx) {
			currentStepEntry = stepData[idx];
			fnDone = done;

			const numberContainer = wrapper.find(
				".CheckoutWizard-" + stepData[idx].numeralName
			);
			expect(numberContainer.length).toEqual(
				1,
				".CheckoutWizard-" +
					stepData[idx].numeralName +
					" not found or there were more than one"
			);
			numberContainer.simulate("click");
		}

		it("stepData numeralName=one is rendered correctly", done => {
			numeralNameRenderedCorrectly(done, 0);
		});
		it("stepData numeralName=two is rendered correctly", done => {
			numeralNameRenderedCorrectly(done, 1);
		});
		it("stepData numeralName=three is rendered correctly", done => {
			numeralNameRenderedCorrectly(done, 2);
		});
		it("stepData numeralName=four is rendered correctly", done => {
			numeralNameRenderedCorrectly(done, 3);
		});
	});
});

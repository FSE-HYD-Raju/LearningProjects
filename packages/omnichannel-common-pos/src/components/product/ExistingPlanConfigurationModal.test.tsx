import * as React from "react";
import {
	attachWithContext,
	mountWithContext,
	shallowWithContext,
	TestUtils
} from "../../testUtils";

import ExistingPlanConfigurationModal, { ExistingPlanConfigurationModalProps } from "./ExistingPlanConfigurationModal";
import { Basket, ProductOffering } from "../../redux/types";

describe("ExistingPlanConfigurationModal", () => {
	const { getModalContents } = TestUtils;
	const individualId = "juanita";
	const plan = {
		id: "fav-num-po",
		attributes: {
			name: "Favorite numbers"
		}
	} as any as ProductOffering;

	const planConfiguration = {
		number1: "+358 50 1234567"
	};

	const context = {
		flux: {
			actions: {
			},
			stores: {
				ConsulStore: {
					msisdnReservationRequired: true
				},
			}
		},
		store: TestUtils.mockReduxStore({
			productOfferingConfiguration: {
				configurations: {
					[plan.id]: {
						inputtedCharacteristics: planConfiguration
					}
				}
			},
			feature: {},
			consul: {
				msisdnReservationRequired: true
			},
			workforce: {},
		})
	};

	const minProps: ExistingPlanConfigurationModalProps = {
		showModal: false,
		plan: {} as any as ProductOffering,
		parentProductId: "",
		productConfigurationErrors: {},
		actions: {
			submitProductConfiguration: jest.fn(),
			terminateProductConfiguration: jest.fn(),
		}
	};

	it("succeeds at shallow mount with min props", () => {
		const wrapper = shallowWithContext(<ExistingPlanConfigurationModal {...minProps} />, { context });
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with min props", () => {
		mountWithContext(<ExistingPlanConfigurationModal {...minProps} />, { context });
	});

	it("renders as configuration prompt", () => {
		const wrapper = attachWithContext(
			<ExistingPlanConfigurationModal
				individualId={individualId}
				plan={plan}
				parentProductId="juanita-agreement1-sub"
				actions={{
					submitProductConfiguration: jest.fn(),
					terminateProductConfiguration: jest.fn(),
				}}
			/>,
			{ context }
		);

		const modalContents = getModalContents(wrapper, context);
		expect(modalContents.find("ProductOfferingConfiguration").length).toEqual(1);

		wrapper.detach();
	});

	it("submits plan configuration", () => {
		const submitProductConfiguration = jest.fn();
		const productId = "juanita-agreement1-sub";

		const wrapper = attachWithContext(
			<ExistingPlanConfigurationModal
				individualId={individualId}
				plan={plan}
				parentProductId={productId}
				actions={{
					submitProductConfiguration: submitProductConfiguration,
					terminateProductConfiguration: jest.fn(),
				}}
			/>,
			{ context }
		);

		const modalContents = getModalContents(wrapper, context);
		modalContents.find("form").simulate("submit");

		expect(submitProductConfiguration).toHaveBeenCalled();
		expect(submitProductConfiguration).toHaveBeenCalledWith({
			individualId,
			productId,
			inputtedCharacteristics: {},
			enhancedCharacteristics: {},
		});

		wrapper.detach();
	});

	it("cancels plan configuration", () => {
		const terminateProductConfiguration = jest.fn();

		const wrapper = attachWithContext(
			<ExistingPlanConfigurationModal
				individualId={individualId}
				plan={plan}
				parentProductId="juanita-agreement1-sub"
				actions={{
					submitProductConfiguration: jest.fn(),
					terminateProductConfiguration: terminateProductConfiguration,
				}}
			/>,
			{ context }
		);

		const modalContents = getModalContents(wrapper, context);
		modalContents
			.find("#buttonCancelPlanConfiguration")
			.hostNodes()
			.simulate("click");

		expect(terminateProductConfiguration).toHaveBeenCalled();

		wrapper.detach();
	});

	it("renders as configuration success", () => {
		const wrapper = attachWithContext(
			<ExistingPlanConfigurationModal
				individualId={individualId}
				plan={plan}
				parentProductId="juanita-agreement1-sub"
				productConfigurationSummary={{
					characteristics: planConfiguration,
					product: {} as any as ProductOffering,
					resultBasket: {} as any as Basket,
					updatedProduct: {} as any as ProductOffering,
				}}
				actions={{
					submitProductConfiguration: jest.fn(),
					terminateProductConfiguration: jest.fn(),
				}}
			/>,
			{ context }
		);

		const modalContents = getModalContents(wrapper);
		expect(modalContents.find("ProductOfferingConfiguration").length).toEqual(0);
		expect(modalContents.text().toLowerCase()).toContain(
			`Plan ${plan.attributes!.name} configured`.toLowerCase()
		);

		wrapper.detach();
	});

	it("closes configuration success", () => {
		const terminateProductConfiguration = jest.fn();

		const wrapper = attachWithContext(
			<ExistingPlanConfigurationModal
				individualId={individualId}
				plan={plan}
				parentProductId="juanita-agreement1-sub"
				productConfigurationSummary={{
					characteristics: planConfiguration,
					product: {} as any as ProductOffering,
					resultBasket: {} as any as Basket,
					updatedProduct: {} as any as ProductOffering,
				}}
				actions={{
					submitProductConfiguration: jest.fn(),
					terminateProductConfiguration: terminateProductConfiguration,
				}}
			/>,
			{ context }
		);

		const modalContents = getModalContents(wrapper);
		modalContents
			.find("#oc-modal-close-button")
			.hostNodes()
			.simulate("click");

		expect(terminateProductConfiguration).toHaveBeenCalled();

		wrapper.detach();
	});

	it("renders configuration failure", () => {
		const wrapper = attachWithContext(
			<ExistingPlanConfigurationModal
				individualId={individualId}
				plan={plan}
				parentProductId="juanita-agreement1-sub"
				productConfigurationErrors={{
					status: 403
				}}
				actions={{
					submitProductConfiguration: jest.fn(),
					terminateProductConfiguration: jest.fn(),
				}}
			/>,
			{ context }
		);

		const modalContents = getModalContents(wrapper);
		expect(modalContents.text().toLowerCase()).toContain(
			`Configuring ${plan.attributes!.name} failed`.toLowerCase()
		);

		wrapper.detach();
	});
});

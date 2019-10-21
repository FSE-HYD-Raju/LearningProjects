import * as React from "react";
import {
	attachWithContext,
	mountWithContext,
	shallowWithContext,
	TestUtils
} from "../../../../testUtils";

import AddonConfigurationModal, { AddonConfigurationModalProps } from "./AddonConfigurationModal";
import { Basket, ProductOffering, Configurations } from "../../../../redux/types";

jest.mock("../../../product/ProductOfferingConfiguration", () => {return { default: () => <div id="ProductOfferingConfiguration"/>};});

describe("AddonConfigurationModal", () => {
	const { getModalContents } = TestUtils;
	const redux = TestUtils.mockReduxStore({
		feature: {},
		consul: {},
		workforce: {},
	});

	const context = {
		flux: {},
		store: redux
	};

	const addonConfiguration = {
		number1: "+358 50 1234567"
	};

	const addon = {
		id: "fav-num-po",
		attributes: {
			name: "Favorite numbers",
			specSubType: "ADDITIONAL",
			inputtedCharacteristics: addonConfiguration,
			inputCharacteristics: {
				number1: { values: {value: addonConfiguration.number1}, hidden: false}
			}
		}
	} as any as ProductOffering;

	const individualId = "juanita";

	const minProps: AddonConfigurationModalProps = {
		actions: {
			submitProductConfiguration: jest.fn(),
			terminateProductConfiguration: jest.fn(),
		},
		configurations: {} as any as Configurations,
	};

	it("succeeds at shallow mount with min props", () => {
		const wrapper = shallowWithContext(<AddonConfigurationModal {...minProps}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with min props", () => {
		mountWithContext(<AddonConfigurationModal {...minProps}/>);
	});

	it("renders as configuration prompt for an Add-on", () => {
		const wrapper = attachWithContext(
			<AddonConfigurationModal
				{...minProps}
				individualId={individualId}
				product={addon}
				productId="juanita-agreement1-sub"
			/>, { context });

		const modalContents = getModalContents(wrapper, context);
		expect(modalContents.find("#ProductOfferingConfiguration").length).toEqual(1);

		wrapper.detach();
	});

	it("submits addon configuration", () => {
		const submitProductConfigurationSpy = minProps.actions.submitProductConfiguration;
		const productId = "juanita-agreement1-sub";

		const wrapper = attachWithContext(
			<AddonConfigurationModal
				{...minProps}
				individualId={individualId}
				product={addon}
				productId={productId}
			/>, { context }
		);

		const modalContents = getModalContents(wrapper, context);
		modalContents.find("form").simulate("submit");

		expect(submitProductConfigurationSpy).toHaveBeenCalled();
		expect(submitProductConfigurationSpy).toHaveBeenCalledWith({
			individualId,
			productId,
			inputtedCharacteristics: addonConfiguration,
			enhancedCharacteristics: {},
		});

		wrapper.detach();
	});

	it("cancels addon configuration", () => {
		const terminateProductConfiguration = minProps.actions.terminateProductConfiguration;

		const wrapper = attachWithContext(
			<AddonConfigurationModal
				{...minProps}
				individualId={individualId}
				product={addon}
				productId="juanita-agreement1-sub"
			/>, { context }
		);

		const modalContents = getModalContents(wrapper, context);
		modalContents
			.find("#buttonCancelAddonConfiguration")
			.hostNodes()
			.simulate("click");

		expect(terminateProductConfiguration).toHaveBeenCalled();

		wrapper.detach();
	});

	it("renders as configuration success", () => {
		const wrapper = attachWithContext(
			<AddonConfigurationModal
				{...minProps}
				individualId={individualId}
				product={addon}
				productId="juanita-agreement1-sub"
				productConfigurationSummary={{
					characteristics: addonConfiguration,
					product: {} as any as ProductOffering,
					resultBasket: {} as any as Basket,
					updatedProduct: {} as any as ProductOffering,
				}}
			/>,
		);

		const modalContents = getModalContents(wrapper, context);
		expect(modalContents.find("#ProductOfferingConfiguration").length).toEqual(0);
		expect(modalContents.text().toLowerCase()).toContain(`Addon ${addon.attributes!.name} configured`.toLowerCase());

		wrapper.detach();
	});

	it("closes configuration success", () => {
		const terminateProductConfiguration = minProps.actions.terminateProductConfiguration;

		const wrapper = attachWithContext(
			<AddonConfigurationModal
				{...minProps}
				individualId={individualId}
				product={addon}
				productId="juanita-agreement1-sub"
				productConfigurationSummary={{
					characteristics: addonConfiguration,
					product: {} as any as ProductOffering,
					resultBasket: {} as any as Basket,
					updatedProduct: {} as any as ProductOffering,
				}}
			/>
		);

		const modalContents = getModalContents(wrapper, context);
		modalContents
			.find("#oc-modal-close-button")
			.hostNodes()
			.simulate("click");

		expect(terminateProductConfiguration).toHaveBeenCalled();

		wrapper.detach();
	});

	it("renders configuration failure", () => {
		const wrapper = attachWithContext(
			<AddonConfigurationModal
				{...minProps}
				individualId={individualId}
				product={addon}
				productId="juanita-agreement1-sub"
				productConfigurationErrors={{
					status: 403
				}}
			/>,
		);

		const modalContents = getModalContents(wrapper, context);
		expect(modalContents.text().toLowerCase()).toContain(`Configuring ${addon.attributes!.name} failed`.toLowerCase());

		wrapper.detach();
	});
});

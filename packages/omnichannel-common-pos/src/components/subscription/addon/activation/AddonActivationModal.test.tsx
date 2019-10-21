import * as React from "react";
import {
	attachWithContext,
	mountWithContext,
	shallowWithContext,
	TestUtils
} from "../../../../testUtils";

import { AddonActivationModal, AddonActivationModalProps } from "./AddonActivationModal";
import { InitializedAddon, Price, PriceType, PriceTypeEnum, Product } from "../../../../redux";
import { ProductOffering } from "../../../../redux/types";

jest.mock("../../../product/ProductOfferingConfigurationContainer", () => {
	return {default: () => <div id="ProductOfferingConfigurationContainer"/>};
});

let context: any;

describe("AddonActivationModal", () => {
	const { getModalContents, makeActions, makeStore } = TestUtils;

	const personId = "juanita";
	const paymentMethodId = "balance";

	const addon: ProductOffering = {
		id: "fav-num-po",
		attributes: {
			name: "Favorite numbers",
			specSubType: "ADDITIONAL"
		}
	} as any as ProductOffering;

	let initializedAddon: InitializedAddon = {} as any as InitializedAddon;

	const minProps: AddonActivationModalProps = {
		product: {
			id: "fav-num-po"
		} as Product,
		planCategoriesIds: [],
		targetAgreementId: "",
		addon,
		showModal: true,
		msisdn: undefined,
		onModalClose: jest.fn(),
		initializedAddon: undefined,
		addonInitializeInProgress: false,
		addonEnableError: undefined,
		personId,
		configurations: {},
		actions: {
			initializeAddonEnabling: jest.fn(),
			discardBackendBasket: jest.fn(),
			cancelAddonActivation: jest.fn(),
			enableAddon: jest.fn()
		}
	};

	beforeEach(() => {
		context = {
			flux: {
				stores: {
					ConsulStore: makeStore("flux.stores.ConsulStore"),
				}
			},
			store: TestUtils.mockReduxStore({
				productOfferingConfiguration: {
					configurations: {}
				},
				consul: {},
				feature: {},
			})
		};

		initializedAddon = {
			id: "88269FA5-4201-4685-A71B-6EB84DE346C8",
			basketId: "88269FA5-4201-4685-A71B-6EB84DE346C8",
			basketItems: [
				{
					attributes: {
						totalPrices: [
							{
								type: "ONE_TIME",
								taxIncludedAmount: 7.9,
								currency: "EUR",
								isUpfront: true,
							} as Partial<Price> as Price
						]
					}
				}
			],
			paymentMethods: [{ id: paymentMethodId }, { id: "credit-card" }]
		} as any as InitializedAddon;
	});

	it("succeeds at shallow mount without props", () => {
		const wrapper = shallowWithContext(<AddonActivationModal {...minProps} />, { context});
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount without props", () => {
		mountWithContext(<AddonActivationModal {...minProps}/>, { context });
	});

	it("renders activation modal as configuration prompt for an Add-on", () => {
		const configurableAddon: ProductOffering = {
			...addon,
			attributes: {
				...addon.attributes,
				inputCharacteristics: {
					field1: {
						hidden: false
					}
				}
			}
		} as any as ProductOffering;
		const wrapper = attachWithContext(
			<AddonActivationModal
				{...minProps}
				showModal={true}
				personId={personId}
				addon={configurableAddon}
				initializedAddon={initializedAddon}
			/>,
			{ context }
		);

		const modalContents = getModalContents(wrapper, context);
		expect(modalContents.find("#ProductOfferingConfigurationContainer").length).toEqual(1);

		wrapper.detach();
	});

	it("renders correct amount for Total fees (requires a payment method selected)", () => {
		const wrapper = attachWithContext(
			<AddonActivationModal
				{...minProps}
				showModal={true}
				personId={personId}
				addon={addon}
				initializedAddon={initializedAddon}
			/>,
			{ context }
		);

		let modalContents = getModalContents(wrapper, context);

		const paymentMethodInput = modalContents.find(`#addonActivationSetPaymentMethod-${paymentMethodId}`).hostNodes();
		paymentMethodInput.simulate("click");
		modalContents = getModalContents(wrapper, context).hostNodes();

		const totalFeesAmount = modalContents.find("[data-test-name='total-fees-amount']");
		expect(Math.abs(totalFeesAmount.find("OcCurrency").prop("cost"))).toEqual(
			initializedAddon.basketItems[0].attributes!.totalPrices[0].taxIncludedAmount
		);

		wrapper.detach();
	});

	it("displays balance error alert", () => {
		const wrapper = attachWithContext(
			<AddonActivationModal
				{...minProps}
				showModal={true}
				personId={personId}
				addon={addon}
				initializedAddon={initializedAddon}
				addonEnableError="balance-limit-surpassed"
			/>,
			{ context }
		);

		const modalContents = getModalContents(wrapper, context);
		expect(modalContents.find("BalanceError").length).toEqual(1);

		wrapper.detach();
	});

	it("cancels addon activation", () => {
		const cancelAddonActivation = jest.fn();

		const wrapper = attachWithContext(
			<AddonActivationModal
				{...minProps}
				showModal={true}
				addon={addon}
				initializedAddon={initializedAddon}
				onModalClose={cancelAddonActivation}
			/>,
			{ context }
		);

		const modalContents = getModalContents(wrapper, context);
		modalContents.find("#oc-modal-cancel-button").hostNodes().simulate("click");

		expect(cancelAddonActivation).toHaveBeenCalled();

		wrapper.detach();
	});

	it("submits addon enablement confirmation for an addon with a non-zero price", () => {
		const wrapper = attachWithContext(
			<AddonActivationModal
				{...minProps}
				showModal={true}
				personId={personId}
				addon={addon}
				initializedAddon={initializedAddon}
			/>,
			{ context }
		);

		const modalContents = getModalContents(wrapper, context);
		const paymentMethodInput = modalContents.find(`#addonActivationSetPaymentMethod-${paymentMethodId}`);
		paymentMethodInput.hostNodes().simulate("click");

		modalContents.find("form").simulate("submit");

		wrapper.detach();
	});

	it("should render payment method selection when have only upfront recurrent price", () => {
		initializedAddon.basketItems[0].attributes!.totalPrices[0].type = PriceTypeEnum.RECURRENT;
		const wrapper = attachWithContext(
			<AddonActivationModal
				{...minProps}
				showModal={true}
				personId={personId}
				addon={addon}
				initializedAddon={initializedAddon}
			/>,
			{ context }
		);

		const modalContents = getModalContents(wrapper, context);
		expect(modalContents.find(`#addonActivationSetPaymentMethod-${paymentMethodId}`).exists()).toBeTruthy();
		wrapper.detach();
	});

	// TODO: properly implement test method, it tests nothing
	xit("submits addon enablement confirmation for an addon that has a zero price", () => {
		initializedAddon.basketItems[0].attributes!.totalPrices[0].taxIncludedAmount = 0;

		const wrapper = attachWithContext(
			<AddonActivationModal
				{...minProps}
				showModal={true}
				personId={personId}
				addon={addon}
				initializedAddon={initializedAddon}
			/>,
			{ context }
		);

		const modalContents = getModalContents(wrapper, context);

		modalContents.find("form").simulate("submit");

		wrapper.detach();
	});

	// TODO: properly implement test method, it tests nothing
	xit("submits addon enablement confirmation for an addon without a price", () => {
		initializedAddon.basketItems[0].attributes!.totalPrices = [];

		const wrapper = attachWithContext(
			<AddonActivationModal
				{...minProps}
				showModal={true}
				personId={personId}
				addon={addon}
				initializedAddon={initializedAddon}
			/>,
			{ context }
		);

		const modalContents = getModalContents(wrapper, context);
		const paymentMethodInput = modalContents
			.find(`#addonActivationSetPaymentMethod-${paymentMethodId}`)
			.hostNodes();
		paymentMethodInput.simulate("click");

		modalContents.find("form").simulate("submit");

		wrapper.detach();
	});

	it("does not render payment methods when none available (and addon has a non-zero upfront price)", () => {
		initializedAddon.paymentMethods = undefined;

		const wrapper = attachWithContext(
			<AddonActivationModal
				{...minProps}
				showModal={true}
				addon={addon}
				initializedAddon={initializedAddon}
				onModalClose={() => {}}
			/>,
			{ context }
		);

		const modalContents = getModalContents(wrapper, context);
		const paymentMethodInput = modalContents.find(
			"#addonActivationSetPaymentMethod"
		);

		expect(paymentMethodInput.length).toBe(0);

		wrapper.detach();
	});
});

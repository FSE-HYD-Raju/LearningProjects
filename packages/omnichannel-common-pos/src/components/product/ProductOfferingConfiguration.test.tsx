import * as React from "react";
import { set } from "lodash";
import {
	shallowWithContext,
	mountWithContext,
	TestUtils,
} from "../../testUtils";
import ProductOfferingConfiguration, { ProductOfferingConfigurationProps } from "./ProductOfferingConfiguration";
import {
	MsisdnConfig,
	ProductOffering,
} from "../../redux/types";
import { productOfferingConfiguration } from "../../redux/models/productOfferingConfiguration/productOfferingConfiguration.actions";
jest.mock("./characteristics/AutoCharacteristicConfiguration", () => {
	return {default: () => {
		const text: string = "AutoCharacteristicConfiguration";
		const AutoCharacteristicConfiguration = () => <div>{text}</div>;
		return <AutoCharacteristicConfiguration/>;
	}};
});

jest.mock("./ProductOfferingConfigurationContainer", () => {
	return {default: () => "ProductOfferingConfigurationContainer"};
});

const { makeActions, makeStore } = TestUtils;

const productMock = (): ProductOffering => ({
	id: "1",
	attributes: {
		inputCharacteristics: {
			"awesomness-level": {
				name: "Awesomness level",
				description: "Set your awesomness level",
				valueRegulator: "MUST_BE_PERSONALIZED",
				values: [],
				hidden: false
			},
			CH_SMS_Dialogue: {
				name: "CH_SMS_Dialogue",
				description: "",
				valueRegulator: null,
				values: [],
				source: "Internal",
				hidden: false,
				mandatory: false
			}
		}
	}
} as any as ProductOffering);

const SalesStore = {
	productCategory: "additional"
};

const setInputtedCharacteristic = jest.fn();

const getContext = () => ({
	flux: {
		actions: {
			BasketActions: {
				resetValidIcc: jest.fn(),
			}
		},
		stores: {
			SalesStore: makeStore("context.flux.stores.SalesStore", SalesStore),
		},
	},
	store: TestUtils.mockReduxStore({
		error: {
			productOfferingErrors: [],
			addressValidationError: "aaa",
		},
		productOfferingConfiguration: {
			configurations: {},
			inputtedCharacteristics: {}
		},
		feature: {
			internalCharacteristicsConfiguration: {
				config: [
					{
						source: "Internal",
						hidden: true,
						mandatory: true,
						characteristics: {
							CH_NumberResource: {
								valueFrom: "MSISDN_OF_SUBSCRIPTION"
							},
							CH_ReservedFor: {
								valueFrom: "RESERVED_FOR"
							},
							CH_Activation_model: {
								valueFrom: "FLOW_BASED"
							},
							CH_Parent_ID: {
								valueFrom: "SUBSCRIPTION_PRODUCT_UUID"
							},
							CH_Payment_Method: {
								exactValue: null
							}
						}
					},
					{
						source: "Internal",
						hidden: true,
						mandatory: false,
						characteristics: {
							CH_Already_Paid: {
								exactValue: null
							},
							CH_SMS_Dialogue: {
								exactValue: "true"
							}
						}
					}
				]
			}
		},
	}),
});

describe("ProductOfferingConfiguration", () => {
	let context: any;
	const minProps: ProductOfferingConfigurationProps = {
		product: productMock(),
		path: [],
		msisdnModalVisible: false,
		userOpened: false,
		icc_subtype_display: {
			dropdown: [],
			radio: []
		},
		isAddonVisible: false,
		msisdnConfig: {} as any as MsisdnConfig,
		nominationPOCharacteristics: null,
		toggleMsisdnModal: jest.fn(),
		workforceAvailableAppointments: [],
		actions: {
			clearProductOfferingErrors: jest.fn(),
			toggleProductOffering: jest.fn(),
			setInputtedCharacteristic: jest.fn(),
			setEnhancedCharacteristics: jest.fn(),
			selectProductOffering: jest.fn(),
			makeMsisdnSoftReservation: jest.fn(),
			updateMsisdnSoftReservation: jest.fn(),
			resetMsisdnSoftReservation: jest.fn(),
			setConfigurableInstallationTime: jest.fn(),
			getWorkforceAvailableAppointments: jest.fn(),
			resetWorkforceAvailableAppointments: jest.fn(),
		}
	};

	beforeEach(() => {
		setInputtedCharacteristic.mockClear();
		context = getContext();
	});

	it("succeeds at shallow mount without props", () => {
		const wrapper = shallowWithContext(<ProductOfferingConfiguration {...minProps} />, { context });
		expect(wrapper).toMatchSnapshot();
	});

	it("should render inputCharacteristic with valueRegulator MUST_BE_PERSONALIZED", () => {
		productOfferingConfiguration.setInputtedCharacteristic = jest.fn();
		const wrapper = mountWithContext(<ProductOfferingConfiguration {...minProps} />, { context });
		const input = wrapper.find("[placeholder=\"Awesomness level\"]");
		expect(input.exists()).toBeTruthy();
	});

	it("should render inputCharacteristic with valueRegulator CAN_BE_PERSONALIZED", () => {
		const product = { ...productMock() };
		set(product, [
			"attributes",
			"inputCharacteristics",
			"awesomness-level",
			"valueRegulator"
		], "CAN_BE_PERSONALIZED");

		const wrapper = mountWithContext(
			<ProductOfferingConfiguration
				{...minProps}
				product={product}
			/>,
			{ context }
		);
		const input = wrapper.find("[placeholder=\"Awesomness level\"]");
		expect(input.exists()).toBeTruthy();
	});

	it("should render inputCharacteristic with valueRegulator null", () => {
		const product = { ...productMock() };
		set(product, [
			"attributes",
			"inputCharacteristics",
			"awesomness-level",
			"valueRegulator"
		], null);
		const wrapper = mountWithContext(
			<ProductOfferingConfiguration
				{...minProps}
				product={product}
			/>,
			{ context }
		);
		const input = wrapper.find("[title=\"Set your awesomness level\"]");
		expect(input.exists()).toBeTruthy();
	});

	it("should NOT render inputCharacteristic with valueRegulator NO_PERSONALIZATION", () => {
		const product = { ...productMock() };
		set(product, [
			"attributes",
			"inputCharacteristics",
			"awesomness-level",
			"valueRegulator"
		], "NO_PERSONALIZATION");
		const wrapper = shallowWithContext(
			<ProductOfferingConfiguration
				{...minProps}
				product={product}
			/>,
			{ context }
		);
		const input = wrapper.find("[placeholder=\"Awesomness level\"]");
		expect(input.exists()).toBeFalsy();
	});

	it("should render inputCharacteristic with hidden true", () => {
		const product = { ...productMock() };
		set(product, [
			"attributes",
			"inputCharacteristics",
			"awesomness-level",
			"hidden"
		], "true");
		const wrapper = mountWithContext(<ProductOfferingConfiguration {...minProps} product={product} />, { context });
		const input = wrapper.find("[placeholder=\"Awesomness level\"]");
		expect(input.exists()).toBeFalsy();
	});
});

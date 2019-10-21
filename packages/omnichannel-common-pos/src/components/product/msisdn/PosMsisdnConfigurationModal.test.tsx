import * as React from "react";
import { mountWithContext, shallowWithContext, default as TestUtils } from "../../../testUtils";
import props from "./testdata/PosMsisdnConfigurationModal.test.data";
import PosMsisdnConfigurationModal from "./PosMsisdnConfigurationModal";
import productOfferings from "./testdata/PosMsisdn.test.data.product.offerings";
import stocks from "./testdata/PosMsisdn.test.data.stocks";
import inventories from "./testdata/PosMsisdn.test.data.inventories";
import { ProductOffering } from "../../../redux/types";

const minimumProps = {
	msisdnUseInventories: true,
	msisdnPog: {
		cardinality: {
			max: 1,
			min: 0
		},
		commercialEnrichments: null,
		id: "GRP_PO_Elige_tu_Numero",
		name: "GRP_PO_Elige_tu_Numero",
		msisdnGroup: true,
		productOfferings: productOfferings,
	},
	stocks: stocks,
	inventories: inventories,
};

// we don't have PortInState in old flux store, so mocking redux store here instead
const redux = TestUtils.mockReduxStore({
	portIn: {
		portInDecisions: {}
	},
	feature: {
		portInPhoneNumberLength: 12,
	}
});

const context = {
	flux: {
		actions: {},
		stores: {},
	},
	store: redux,
};

describe("PosMsisdnConfigurationModal", () => {

	// Skipped because date changes on render
	it.skip("succeeds at shallow mount minimum props", () => {
		const wrapper = shallowWithContext(
			<PosMsisdnConfigurationModal {...minimumProps as any} />
		);
		expect(wrapper).toMatchSnapshot();
	});

	// Skipped because date changes on render
	it.skip("succeeds at shallow mount with all props", () => {
		const wrapper = shallowWithContext(
			<PosMsisdnConfigurationModal {...props as any} />
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("Check that inventory has values", () => {
		const wrapper = shallowWithContext(<PosMsisdnConfigurationModal {...props} />);

		const inventoryOptions = wrapper.find("#inventorySelect");
		const selectedOption = inventoryOptions.find("option").at(13);

		expect(inventoryOptions.children().length).toEqual(15);
		expect(selectedOption.text()).toBe("Santa Cruz");
	});

	it("Check that category has values", () => {
		const wrapper = shallowWithContext(<PosMsisdnConfigurationModal {...props} />);

		const categoryOptions = wrapper.find("#categorySelect");
		const selectedOption = categoryOptions.find("option").at(4);

		expect(categoryOptions.children().length).toEqual(5);
		expect(selectedOption.text()).toBe("Super Faciles");
	});

	/* RUBT-67608 */
	it("close manually opened modal after saving MSISDN number", () => {
		const updatedProps = {
			...props,
			getMsisdnBundle: () => {},
			msisdns: {
				testNumber: ["1234567", "1232323", "2132132"]
			},
			product: {
				id: "msisdn-po",
				inputtedCharacteristics: {
					number: ""
				}
			} as any as ProductOffering,
			saveNumber: () => {},
			selectedNumber: "",
			userOpened: true,
			handleClose: () => {},
			msisdnUseInventories: false,
		};

		const newProps = {
			...updatedProps,
			product: {
				inputtedCharacteristics: {
					number: updatedProps.msisdns.testNumber[0]
				}
			},
		};

		// handleClose spy after updating component props
		const handleSpy = jest.spyOn(newProps, "handleClose");

		const wrapper = mountWithContext(<PosMsisdnConfigurationModal {...updatedProps} />, { context });

		// Select number from "radiobutton" array
		wrapper.instance().selectNumber(newProps.msisdns.testNumber[0]);

		const stateData = wrapper.state();
		expect(stateData.selectedNumber).toEqual(newProps.msisdns.testNumber[0]);

		wrapper.instance().componentWillReceiveProps(newProps);

		console.log("Expect handleClose to have been called");
		expect(handleSpy).toHaveBeenCalled();
	});

	it("has port in number and nip,selectedNumber,scheduledTime -> button disabled false", () => {
		const wrapper = shallowWithContext(<PosMsisdnConfigurationModal {...minimumProps as any} />);
		wrapper.setState({
			CH_Scheduled_Time: new Date(),
			CH_NIP: { nip: "nip" },
			selectedNumber: "1234567890",
			isPortInNumber: true
		});
		const instance = wrapper.instance();
		expect(instance.handleMsisdnDisabled()).toBe(false);
	});

	it("has only selectedNumber -> button disabled false", () => {
		const wrapper = shallowWithContext(<PosMsisdnConfigurationModal {...minimumProps as any} />);
		wrapper.setState({
			CH_Scheduled_Time: undefined,
			CH_NIP: undefined,
			selectedNumber: "1234567890",
			isPortInNumber: undefined
		});
		const instance = wrapper.instance();
		expect(instance.handleMsisdnDisabled()).toBe(false);
	});

	it("has port in number and selectedNumber -> button disabled true", () => {
		const wrapper = shallowWithContext(<PosMsisdnConfigurationModal {...minimumProps as any} />);
		wrapper.setState({
			CH_Scheduled_Time: undefined,
			CH_NIP: undefined,
			selectedNumber: "1234567890",
			isPortInNumber: true
		});
		const instance = wrapper.instance();
		expect(instance.handleMsisdnDisabled()).toBe(true);
	});

	it("has state undefined -> button disabled true", () => {
		const wrapper = shallowWithContext(<PosMsisdnConfigurationModal {...minimumProps as any} />);
		wrapper.setState({
			CH_Scheduled_Time: undefined,
			CH_NIP: undefined,
			selectedNumber: undefined,
			isPortInNumber: undefined
		});
		const instance = wrapper.instance();
		expect(instance.handleMsisdnDisabled()).toBe(true);
	});

	it("has state null -> button disabled true", () => {
		const wrapper = shallowWithContext(<PosMsisdnConfigurationModal {...minimumProps as any} />);
		wrapper.setState({
			CH_Scheduled_Time: null,
			CH_NIP: null,
			selectedNumber: null,
			isPortInNumber: null
		});
		const instance = wrapper.instance();
		expect(instance.handleMsisdnDisabled()).toBe(true);
	});

});

import * as React from "react";
import { shallowWithContext, mountWithContext } from "../../testUtils";
import AddressValidationHandler from "./AddressValidationHandler";
import OcModal from "../ocComponents/OcModal";

describe("AddressValidationHandler", () => {
	const minimumProps = {
		address: {},
		proposals: null,
		containerRef: null,
		className: "",
		displayConfirmation: false,
		skipProposals: false,
		isValidationFailed: true,
		validationMandatory: false,
		actions: {
			proposalSelected: jest.fn(),
			cancel: jest.fn(),
			createCustomer: jest.fn(),
			onClose: jest.fn()
		}
	};

	const mikonkatuHelsinki = {
		street: "Mikonkatu 1",
		postalCode: "00100",
		city: "Helsinki",
		country: "FI"
	};

	const feasibleProps = {
		...minimumProps,
		address: {
			street: "Testikatu 1",
			postalCode: "00100",
			city: "Helsinki",
			country: "FI"
		},
		proposals: [
			mikonkatuHelsinki
		],
	};

	it("succeeds at shallow mount with minimum props", () => {
		const props = {
			...minimumProps,
			address: mikonkatuHelsinki
		};
		const wrapper = shallowWithContext(<AddressValidationHandler {...props} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("renders a modal with minimum feasible props", () => {
		const wrapper = mountWithContext(<AddressValidationHandler {...feasibleProps} />);
		expect(wrapper.find(OcModal)).toHaveLength(1);
	});

	it("renders a 'popover' with minimum feasible props", () => {
		const props = {
			...feasibleProps,
			handlerType: "dropdown"
		} as any;

		const wrapper = mountWithContext(
			<AddressValidationHandler {...props} />
		);
		expect(wrapper.find("AddressValidationDropdown")).toHaveLength(1);
	});

	it("renders a modal", () => {
		const props = {
			...feasibleProps,
			handlerType: "modal"
		} as any;

		const wrapper = mountWithContext(
			<AddressValidationHandler {...props} />
		);
		expect(wrapper.find(OcModal)).toHaveLength(1);
	});

	it("renders 'address not found' message in modal with entered address next to it when there are no proposals and validation is mandatory", () => {
		const props = {
			...feasibleProps,
			proposals: [],
			address: {
				street: "Testikatu 1"
			},
			handlerType: "modal",
			validationMandatory: true
		} as any;

		const wrapper = mountWithContext(
			<AddressValidationHandler {...props} />
		);

		const modalContents = wrapper.find("Portal");

		expect(modalContents.find("[data-test-name=\"address-not-found-message\"]")).toHaveLength(1);

		Object.keys(props.address).forEach(key => {
			expect(modalContents.find("[data-test-name=\"address-not-found-message\"]").text()).toContain(props.address[key]);
		});
	});

	it("renders AddressValidationHandlerProposals in modal when there are proposals", () => {
		const props = {
			...feasibleProps,
			address: {
				street: "Testikatu 1"
			},
			handlerType: "modal",
		} as any;

		const wrapper = mountWithContext(
			<AddressValidationHandler {...props} />
		);

		const modalContents = wrapper.find("Portal");

		expect(modalContents.find("AddressValidationHandlerProposals")).toHaveLength(1);
	});

	it("in modal, asks user to confirm unfound address to be stored when there are no proposals and validation is not mandatory", () => {
		const props = {
			...feasibleProps,
			proposals: [],
			address: {
				street: "Testikatu 1"
			},
			handlerType: "modal",
			validationMandatory: false
		} as any;

		const wrapper = mountWithContext(
			<AddressValidationHandler {...props} />
		);

		const modalContents = wrapper.find("Portal");

		expect(modalContents.find("[data-test-name=\"address-not-found-save-anyway-question\"]")).toHaveLength(1);
	});
});

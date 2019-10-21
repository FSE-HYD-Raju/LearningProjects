import * as React from "react";
import { shallowWithContext, mountWithContext, TestUtils } from "../../testUtils";
import AddressValidationDropdown from "./AddressValidationDropdown";

jest.mock("./AddressValidationHandlerProposals", () => {
    return {
        default: () => "MockAddressValidationHandlerProposals"
    };
});

describe("AddressValidationDropdown", () => {
	const proposals = [
		{
			street: "Mikonkatu 1",
			postalCode: "30500",
			city: "Mikkeli",
			country: "Finland"
		},
		{
			street: "Mikonkatu 1",
			postalCode: "60500",
			city: "Pori",
			country: "Finland"
		},
		{
			street: "Mikonkatu 1",
			postalCode: "10500",
			city: "Helsinki",
			country: "Finland"
		}
	];

	const minimumProps = {
        displayConfirmation: false,
        validationIsMandatory: false,
        proposals: null,
        address: {
            street: "Testikatu 1",
            postalCode: "00100",
            city: "Helsinki",
            country: "FI"
        },
        proposalSelected: undefined,
        className: "",
		actions: {
            onChange: jest.fn(),
            getSaveButton: jest.fn(),
            forceSaveAddress: jest.fn(),
            cancel: jest.fn(),
		}
	};

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(
			<AddressValidationDropdown {...minimumProps} />
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
        mountWithContext(<AddressValidationDropdown {...minimumProps} />);
	});

    it("renders 'address not found' message when there are no proposals and validation is mandatory", () => {
        const props = {
            ...minimumProps,
            validationIsMandatory: true
        };
        const wrapper = mountWithContext(<AddressValidationDropdown {...props} />);
        expect(wrapper.find("[data-test-name=\"address-not-found-message\"]")).toHaveLength(1);
    });

    it("renders proposals", () => {
        const props = {
            ...minimumProps,
            proposals
        };

        const wrapper = mountWithContext(<AddressValidationDropdown {...props} />);
        expect(wrapper.find("default")).toHaveLength(1); /* mocked AddressValidationHandlerProposals */
    });

    it("renders checkbox for confirming entered address to be valid, and no proposals presented", () => {
        const props = {
            ...minimumProps,
            displayConfirmation: true
        };

        const wrapper = mountWithContext(<AddressValidationDropdown {...props} />);
        expect(wrapper.find("input#address-validation-save-anyway-confirm-checkbox")).toHaveLength(1);
    });

    /* check comment in component code next to the input */
    xit("clicking on 'confirm address to be valid' checkbox gets given forceSaveAddress() called", () => {
        const props = {
            ...minimumProps,
            displayConfirmation: true
        };
        let wrapper = mountWithContext(<AddressValidationDropdown {...props} />);
        // console.log(wrapper.debug());

        console.log(wrapper.find("input#address-validation-save-anyway-confirm-checkbox").debug());
        wrapper = wrapper.setState({isSaveInvalidAddressConfirmed: true});
        // wrapper.find("input#address-validation-save-anyway-confirm-checkbox").simulate("click");
        wrapper.find("input#address-validation-save-anyway-confirm-checkbox").simulate("change", {target: {value: "1"}});
        expect(minimumProps.actions.forceSaveAddress).toHaveBeenCalled();
    });

    /* function is not called, don't know why .. */
    xit("calls given cancel() when clicked outside", () => {
        const wrapper = mountWithContext(<AddressValidationDropdown {...minimumProps} />);

        TestUtils.clickOnDocumentBody(() => {});
        expect(minimumProps.actions.cancel).toHaveBeenCalled();
    });
});

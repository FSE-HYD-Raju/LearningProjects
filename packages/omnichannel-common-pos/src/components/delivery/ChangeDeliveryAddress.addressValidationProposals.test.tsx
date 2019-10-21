import * as React from "react";
import { mountWithContext, SimpleDataMock } from "../../testUtils";
import ChangeDeliveryAddress, {
	ChangeDeliveryAddressProps,
} from "./ChangeDeliveryAddress";

jest.mock("./forms/PersonDetailsPostalAddressForm", () => {
    return {
        default: (props: any) => {
            TsGlobals.PersonDetailsPostalAddressForm.props = props;
            return "MockPersonDetailsPostalAddressForm";
        }
    };
});

jest.mock("../addressValidationHandler/AddressValidationHandlerContainer", () => {
    return {
        default: (props: any) => {
            console.log("props to AddressValidationHandlerContainer");
            TsGlobals.AddressValidationHandlerContainer.props = props;
            return "MockAddressValidationHandlerContainer";
        }
    };
});

type ChangeDeliveryAddressPropsWithoutSchema = Pick<
	ChangeDeliveryAddressProps,
	Exclude<keyof ChangeDeliveryAddressProps, "schema">
>;

const TsGlobals: any = {
	AddressValidationHandlerContainer: {},
	PersonDetailsPostalAddressForm: {}
};

describe("ChangeDeliveryAddress", () => {
	const context = SimpleDataMock.getConsulContextMock();

	let props: ChangeDeliveryAddressPropsWithoutSchema;

	beforeEach(() => {
		props = {
			storedDeliveryAddress: {
				id: "postal_address_1",
				role: "PRIMARY",
				street: "Sportivnaya",
				coAddress: "1",
				postalCode: "00003",
				city: "Kyiv",
				country: "UA",
				stateOrProvince: "kyivskaya"
			},
			isLoggedIn: true,
			storedCustomer: undefined,
			storeValidAddressOnChange: false,
			countries: [{ name: "Italy", code: "IT", locale: "ita" }, { name: "Ukraine", code: "UA", locale: "ukr" }],
			addressValidationError: undefined,
			actions: {
				storeSelectedShippingAddress: jest.fn(),
				clearAddressValidationError: jest.fn(),
				validateAddress: jest.fn()
			}
		};
	});

	describe("address validation service usage", () => {
		it("clears address validation error when an address proposal is selected", () => {
			mountWithContext(<ChangeDeliveryAddress {...props} />, { context });

			console.log("TsGlobals.AddressValidationHandlerContainer", TsGlobals.AddressValidationHandlerContainer);
			TsGlobals.AddressValidationHandlerContainer.props.actions.proposalSelected();

			expect(props.actions.clearAddressValidationError).toHaveBeenCalled();
		});

		it("stores selected address proposal to app state", () => {
			mountWithContext(<ChangeDeliveryAddress {...props} />, { context });

			TsGlobals.AddressValidationHandlerContainer.props.actions.proposalSelected(props.storedDeliveryAddress);

			expect(props.actions.storeSelectedShippingAddress).toHaveBeenCalledWith(props.storedDeliveryAddress);
		});

		/* skipped because feature not implemented yet -> TODO */
		xit("shows loader when address validation begins", (done) => {
			const myProps = {
				...props,
				actions: {
					...props.actions,
					showAddressValidationLoader: done
				}
			};

			mountWithContext(<ChangeDeliveryAddress {...myProps} />, { context });

			TsGlobals.PersonDetailsPostalAddressForm.props.handleInputChange(props.storedDeliveryAddress);
		});

		/* skipped because feature not implemented yet -> TODO */
		xit("hides loader when address validation ends", () => {
			const initialProps = {
				...props,
				validatingAddress: true
			};

			const wrapper = mountWithContext(<ChangeDeliveryAddress {...initialProps} />, { context });
			wrapper.setProps({
				validatingAddress: false
			});

			expect(initialProps.actions.hideAddressValidationLoader).toBeCalled();
		});
	});
});

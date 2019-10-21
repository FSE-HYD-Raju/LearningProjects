import * as React from "react";
import { mountWithContext, shallowWithContext, SimpleDataMock, TestUtils } from "../../testUtils";
import ChangeDeliveryAddress, {
	ChangeDeliveryAddressProps,
} from "./ChangeDeliveryAddress";
import PersonDetailsPostalAddressForm from "./forms/PersonDetailsPostalAddressForm";

const DEBOUNCE_TIME = 850;
const INVALID_POSTAL_CODE = "99001";

type ChangeDeliveryAddressPropsWithoutSchema = Pick<
	ChangeDeliveryAddressProps,
	Exclude<keyof ChangeDeliveryAddressProps, "schema">
>;

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

	const cityInput = (wrapper: any) => wrapper.find("input#PersonDetailsPostalAddressForm-postalAddress-city-field");
	const postalCodeInput = (wrapper: any) =>
		wrapper.find("input#PersonDetailsPostalAddressForm-postalAddress-postalCode-field");

	const isSaveButtonEnabled = (wrapper: any) => wrapper.find(PersonDetailsPostalAddressForm).props().enableSaveButton;

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(<ChangeDeliveryAddress {...props} />, { context });
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		mountWithContext(<ChangeDeliveryAddress {...props} />, { context });
	});

	it("when user submits changed address, address validation error is cleared, address is stored to app state and it is validated", async () => {
		const wrapper = mountWithContext(<ChangeDeliveryAddress {...(props as any)} />, { context });
		expect(isSaveButtonEnabled(wrapper)).toBeTruthy();
		cityInput(wrapper).simulate("change", { target: { value: "Lviv" } });
		await TestUtils.sleep(DEBOUNCE_TIME);
		wrapper.update();
		// should not store address on change
		expect(props.actions.storeSelectedShippingAddress).not.toBeCalled();
		(props.actions.storeSelectedShippingAddress as any).mockClear();

		// submit form
		const saveAddressButton = wrapper.find("#add-delivery-address-submit-button").find("button");
		saveAddressButton.simulate("submit");
		await TestUtils.sleep(DEBOUNCE_TIME);
		wrapper.update();

		// should clear validation errors, store address
		expect(props.actions.clearAddressValidationError).toBeCalled();
		expect(props.actions.storeSelectedShippingAddress).toHaveBeenLastCalledWith(
			expect.objectContaining({ country: "UA", city: "Lviv" }),
			false
		);
		expect(props.actions.validateAddress).toBeCalled();
		wrapper.unmount();
	});

	describe("in eCare", () => {
		describe("on address validation error", () => {
			const addressValidationError = {
				errors: [
					{
						code: "invalid-postal-address",
						meta: {
							proposals: [
								{
									country: "IT"
								}
							]
						}
					}
				]
			};

			let eCareProps: ChangeDeliveryAddressPropsWithoutSchema;

			beforeEach(() => {
				eCareProps = {
					...props,
					displayConfirmation: true,
					groupPostalAddressFormFields: false,
					skipProposals: true,
					mode: "change-sim"
				};
			});

			it("'Save address' button is disabled and is re-enabled when address is corrected, validity confirmation checkbox is rendered, and error is cleared on input", async () => {
				const wrapper = mountWithContext(<ChangeDeliveryAddress {...(eCareProps as any)} />, { context });
				expect(isSaveButtonEnabled(wrapper)).toBeTruthy();

				postalCodeInput(wrapper).simulate("change", { target: { value: "99001" } });
				await TestUtils.sleep(DEBOUNCE_TIME);
				wrapper.update();

				// submit form
				const saveAddressButton = wrapper.find("#add-delivery-address-submit-button").find("button");
				saveAddressButton.simulate("submit");
				await TestUtils.sleep(DEBOUNCE_TIME);
				wrapper.update();

				wrapper.setProps({
					...eCareProps,
					addressValidationError,
					skipProposals: false,
				} as ChangeDeliveryAddressPropsWithoutSchema);
				wrapper.update();

				expect(isSaveButtonEnabled(wrapper)).toBeFalsy();
				expect(wrapper.find("input#address-validation-save-anyway-confirm-checkbox").exists()).toBeTruthy();

				// any input should enable save button and remove validation error
				(props.actions.clearAddressValidationError as any).mockClear();

				cityInput(wrapper).simulate("change", { target: { value: "Lviv" } });
				await TestUtils.sleep(DEBOUNCE_TIME);
				wrapper.update();
				expect(props.actions.clearAddressValidationError).toBeCalled();

				(props.actions.clearAddressValidationError as any).mockClear();
				expect(isSaveButtonEnabled(wrapper)).toBeTruthy();
				wrapper.unmount();
			});

			it("storing invalid address to app state is allowed once user confirms it valid", async () => {
				const wrapper = mountWithContext(<ChangeDeliveryAddress {...(eCareProps as any)} />, { context });
				expect(isSaveButtonEnabled(wrapper)).toBeTruthy();

				postalCodeInput(wrapper).simulate("change", { target: { value: INVALID_POSTAL_CODE } });
				await TestUtils.sleep(DEBOUNCE_TIME);
				wrapper.update();

				// submit form
				const saveAddressButton = wrapper.find("#add-delivery-address-submit-button").find("button");
				saveAddressButton.simulate("submit");
				await TestUtils.sleep(DEBOUNCE_TIME);
				wrapper.update();

				wrapper.setProps({
					...eCareProps,
					addressValidationError,
					skipProposals: false,
				} as ChangeDeliveryAddressPropsWithoutSchema);
				wrapper.update();

				expect(isSaveButtonEnabled(wrapper)).toBeFalsy();
				(props.actions.storeSelectedShippingAddress as any).mockClear();
				(props.actions.clearAddressValidationError as any).mockClear();
				(props.actions.validateAddress as any).mockClear();

				const confirmSaveAnywayCheckbox = wrapper.find("input#address-validation-save-anyway-confirm-checkbox");
				// confirmSaveAnywayCheckbox.simulate("change", { target: { checked: true } });
				confirmSaveAnywayCheckbox.simulate("click", { target: { checked: true } });
				await TestUtils.sleep(DEBOUNCE_TIME);
				wrapper.update();

				expect(props.actions.clearAddressValidationError).toBeCalled();
				expect(props.actions.storeSelectedShippingAddress).toHaveBeenLastCalledWith(
					expect.objectContaining({ postalCode: INVALID_POSTAL_CODE }),
					true // (forceAddressUpdate) expected to be true
				);
				expect(props.actions.validateAddress).toBeCalled();

				wrapper.unmount();
			});
		});
	});

	describe("in eShop", () => {
		it("should store address on every change when storeValidAddressOnChange=true", async () => {
			const wrapper = mountWithContext(<ChangeDeliveryAddress {...({ ...props, storeValidAddressOnChange: true } as any)} />, {
				context
			});
			expect(wrapper.find(PersonDetailsPostalAddressForm).props().enableSaveButton).toBeTruthy();
			cityInput(wrapper).simulate("change", { target: { value: "Lviv" } });
			await TestUtils.sleep(DEBOUNCE_TIME);
			wrapper.update();

			const storeAddressCalls = (props.actions.storeSelectedShippingAddress as any).mock.calls;
			expect(storeAddressCalls[storeAddressCalls.length - 1][0]).toMatchObject({ country: "UA", city: "Lviv" });
			wrapper.unmount();
		});
	});

	it("should disable saveAddress button when entered data is invalid", async () => {
		const wrapper = mountWithContext(<ChangeDeliveryAddress {...(props as any)} />, {
			context
		});
		expect(wrapper.find(PersonDetailsPostalAddressForm).props().enableSaveButton).toBeTruthy();
		cityInput(wrapper).simulate("change", { target: { value: "" } });
		await TestUtils.sleep(DEBOUNCE_TIME);
		wrapper.update();

		expect(wrapper.find(PersonDetailsPostalAddressForm).props().enableSaveButton).toBeFalsy();
		wrapper.unmount();
	});
});

import { set, cloneDeep } from "lodash";
import * as React from "react";

import { ContactMediaType, Country, PersonAttributes, StoredCustomerType, ContactMediaTypeEnum } from "../../redux/types";
import TestUtils, { shallowWithContext, mountWithContext } from "../../testUtils";

import DeliveryAddressSelection, { DeliveryAddressSelectionProps } from "./DeliveryAddressSelection";

describe("DeliveryAddressSelection", () => {
	const schemaStore: any = TestUtils.makeStore("context.flux.stores", {
		state: {
			schemas: {
				deliveryAddress: {
					$schema: "http://json-schema.org/draft-04/schema#",
					title: "deliveryAddress",
					type: "object",
					properties: {
						street: {
							type: "string",
							required: true
						},
						coAddress: {
							type: "string",
							required: false
						},
						postalCode: {
							type: "string",
							required: true
						},
						city: {
							type: "string",
							required: true
						},
						country: {
							type: "string",
							required: true
						},
						stateOrProvince: {
							type: "string",
							required: false
						}
					}
				}
			}
		}
	});

	const deliveryAddress = {
		city: "City",
		country: "Finland",
		postalCode: "40283",
		street: "Kauppakatu 1",
		coAddress: "c/o 007",
		stateOrCounty: "Rock",
		role: "DELIVERY" as ContactMediaType
	};

	const primaryAddress = {
		city: "New Yourk",
		country: "USA",
		postalCode: "555",
		street: "110th street",
		coAddress: "Jackie Brown",
		stateOrCounty: "NY",
		role: "PRIMARY" as ContactMediaType
	};

	const attributes: PersonAttributes = {
		id: "EEE42918-02FD-406B-8093-6AB923CD4661",
		gender: "female",
		birthDay: "Wed Aug 29 2000 12:26:19 GMT+0300 (EEST)",
		emails: [{ email: "t.t@test.com" }],
		mobileNumbers: [{ number: "2398457" }],
		firstName: "Teppo",
		lastName: "Tester",
		placeOfBirth: "Home",
		nationality: "Finland",
		countryOfBirth: "Finland",
		postalAddresses: [primaryAddress]
	};

	const baseUser = {
		email: "teppo.tester@test.com",
		firstName: "Teppo",
		lastName: "Tester",
		birthDay: new Date(),
		emails: [{ email: "t.t@test.com" }],
		mobileNumber: "2398457",
		placeOfBirth: "Home",
		countryOfBirth: "Finland",
		phoneNumber: "",
		gender: "male",
		address: primaryAddress,
		identifications: {
			identificationId: "",
			identificationExpiryDate: new Date(),
			identificationIssuingDate: new Date(),
			identificationIssuingAuthority: "",
			identificationIssuingAuthorityCountry: "",
			identificationType: "",
		},
	} as StoredCustomerType;

	let simpleProps: DeliveryAddressSelectionProps;

	const fillForm = (wrapper: any) => {
		wrapper
			.find("input#PersonDetailsPostalAddressForm-postalAddress-city-field")
			.simulate("change", { target: { value: deliveryAddress.city } });

		wrapper
			.find("input#PersonDetailsPostalAddressForm-postalAddress-postalCode-field")
			.simulate("change", { target: { value: deliveryAddress.postalCode } });

		wrapper
			.find("input#PersonDetailsPostalAddressForm-street-field")
			.simulate("change", { target: { value: deliveryAddress.street } });

		wrapper
			.find("select#PersonDetailsPostalAddressForm-postalAddress-country-field.custom-select")
			.simulate("change", { target: { value: deliveryAddress.country } });
	};
	let context: any;
	let user: StoredCustomerType;

	beforeEach(() => {
		user = cloneDeep(baseUser);

		simpleProps = {
			storedCustomer: user,
			handleDeliveryAddressSelection: jest.fn(),
			storedDeliveryAddress: deliveryAddress,
			homeDeliveryProductIds: [],
			selectedShippingMethod: undefined,
			actions: {
				setDeliveryAddressRole: jest.fn()
			}
		};

		context = {
			flux: {
				stores: {
					SchemaStore: schemaStore,
					UserStore: TestUtils.makeStore("context.flux.stores", {
						state: {
							user: user
						}
					}),
					ConsulStore: TestUtils.makeStore("context.flux.stores", {
						state: {
							countries: [
								{
									code: "fin",
									name: "Finland",
									locale: "fi_FI"
								}
							] as Array<Country>,
							logSchemaDiscrepancies: true,
						}
					})
				},
				actions: {
					UserActions: {
						updateUserAddresses: jest.fn()
					},
				}
			},
			store: TestUtils.mockReduxStore({
				error: {
					addressValidationError: "",
				}
			})
		};
		context.flux.actions.UserActions.updateUserAddresses = jest.fn().mockReturnValue(Promise.resolve(user));
	});

	it("succeeds at shallow mount with minimal props", () => {
		const wrapper = shallowWithContext(<DeliveryAddressSelection {...simpleProps} />, { context });
		expect(wrapper).toMatchSnapshot();
	});

	it("should hide the address form when delivery to residential address is selected", () => {
		const handleDeliveryAddressSelectionMock = jest.fn();

		const wrapper = mountWithContext(
			<DeliveryAddressSelection
				{...simpleProps}
				handleDeliveryAddressSelection={handleDeliveryAddressSelectionMock}
			/>,
			{ context }
		);

		let postalAddressForm = wrapper.find("form.PersonDetailsPostalAddressForm-form");
		expect(postalAddressForm.length).toEqual(0);

		const homeAddressSelection = wrapper.find("input#checkout-delivery-address-residential");
		expect(homeAddressSelection.length).toEqual(1);
		homeAddressSelection.simulate("click");
		expect(handleDeliveryAddressSelectionMock).toHaveBeenCalledTimes(1);

		postalAddressForm = wrapper.find("form.PersonDetailsPostalAddressForm-form");
		expect(postalAddressForm.length).toEqual(0);
	});

	it("should display the address form when new address is selected", async () => {
		const handleDeliveryAddressSelectionMock = jest.fn();

		const wrapper = mountWithContext(
			<DeliveryAddressSelection
				{...simpleProps}
				handleDeliveryAddressSelection={handleDeliveryAddressSelectionMock}
			/>,
			{ context }
		);

		let postalAddressForm = wrapper.find("form.PersonDetailsPostalAddressForm-form");
		expect(postalAddressForm.length).toEqual(0);

		const newAddressSelection = wrapper.find("input#checkout-delivery-address-new");
		expect(newAddressSelection.length).toEqual(1);

		newAddressSelection.simulate("click");
		expect(handleDeliveryAddressSelectionMock).toHaveBeenCalledTimes(1);

		postalAddressForm = wrapper.find("form.PersonDetailsPostalAddressForm-form");
		expect(postalAddressForm.length).toEqual(1);
	});

	/* TODO this test should be moved to another test suite. maybe several. */
	it("should enable submit button if required fields have been filled", async () => {
		const handleDeliveryAddressSelectionMock = jest.fn();
		const wrapper = mountWithContext(
			<DeliveryAddressSelection
				{...simpleProps}
				handleDeliveryAddressSelection={handleDeliveryAddressSelectionMock}
			/>,
			{ context }
		);

		const newAddressSelection = wrapper.find("input#checkout-delivery-address-new");
		expect(newAddressSelection.length).toEqual(1);
		newAddressSelection.simulate("click");

		fillForm(wrapper);
		await TestUtils.sleep(200);
		wrapper.update();

		expect(wrapper.find("#add-delivery-address-submit-button").find("button").props().disabled).toBe(true);
	});

	it("should only display address in the residential delivery radio button if another delivery address has not been set", () => {
		const handleDeliveryAddressSelectionMock = jest.fn();

		const wrapper = mountWithContext(
			<DeliveryAddressSelection
				{...simpleProps}
				handleDeliveryAddressSelection={handleDeliveryAddressSelectionMock}
			/>,
			{ context }
		);

		expect(wrapper.find("[htmlFor=\"checkout-delivery-address-residential\"]").text()).toContain(
			primaryAddress.street
		);
		expect(wrapper.find("[htmlFor=\"checkout-delivery-address-new\"]").text()).not.toContain(deliveryAddress.street);
	});

	it("should update the user delivery address when clicking the Save address -button", async () => {
		const handleDeliveryAddressSelectionMock = jest.fn();

		const props = { ...simpleProps };

		const wrapper = mountWithContext(
			<DeliveryAddressSelection {...props} handleDeliveryAddressSelection={handleDeliveryAddressSelectionMock} />,
			{ context }
		);

		const newAddressSelection = wrapper.find("input#checkout-delivery-address-new");
		expect(newAddressSelection.length).toEqual(1);
		newAddressSelection.simulate("click");

		expect(handleDeliveryAddressSelectionMock).toHaveBeenCalledTimes(1);

		fillForm(wrapper);

		const postalAddressForm = wrapper.find("form.PersonDetailsPostalAddressForm-form");
		postalAddressForm.simulate("submit");

		await TestUtils.sleep(200);
		wrapper.update();

		// TODO: assert redux action call. ChangeDeliveryAddressContainerEShop passes clearAddressValidationError as actions.error.clearAddressValidationError
		// expect(context.flux.actions.ErrorActions.clearAddressValidationError).toHaveBeenCalledTimes(1);
	});

    it("calls given setDeliveryAddressRole() when delivery choice changes", () => {
		const wrapper = mountWithContext(
			<DeliveryAddressSelection
				{...simpleProps}
			/>,
			{ context }
		);

		expect(simpleProps.actions.setDeliveryAddressRole).toHaveBeenCalledTimes(0);

		wrapper.find("input#checkout-delivery-address-new").simulate("click");
		expect(simpleProps.actions.setDeliveryAddressRole).toHaveBeenCalledTimes(1);
		expect(simpleProps.actions.setDeliveryAddressRole).toHaveBeenCalledWith(ContactMediaTypeEnum.DELIVERY);

		wrapper.find("input#checkout-delivery-address-residential").simulate("click");
		expect(simpleProps.actions.setDeliveryAddressRole).toHaveBeenCalledTimes(2);
		expect(simpleProps.actions.setDeliveryAddressRole).toHaveBeenCalledWith(ContactMediaTypeEnum.PRIMARY);
    });
});

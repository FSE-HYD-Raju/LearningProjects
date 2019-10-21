import React from "react";
import moment from "moment";
import {
	shallowWithContext,
	mountWithContext,
	TestUtils,
	ReactWidgetsTestUtils,
	//Time,
	SimpleDataMock,
	withSchema
} from "omnichannel-common-pos";

import { PersonDetailsForm } from "../src/checkout/PersonDetailsForm";

describe("PersonDetailsForm", () => {
	const delay = 500;
	let context, consulStore, basketStore, minimalProperties, isValid;

	beforeEach(() => {
		consulStore = SimpleDataMock.getConsulStoreMock();
		basketStore = { basketItems: [{}] };

		context = SimpleDataMock.getPersonDetailsFormContextMock();

		minimalProperties = {
			BasketActions: {
				activateCheckoutStep: () => { },
				commitBasket: () => { }
			},
			BasketStore: basketStore,
			ConsulStore: {
				...consulStore,
				locale: "en"
			},
			UserActions: {
				createUser: () => { },
				updateUser: () => { }
			},
			isValid: () => { },
			birthDayAgeLimit: "0",
			person: {
				firstName: "Kathri",
				lastName: "K",
				birthDay: {},
				gender: "female",
				language: "eng",
				emails: [{ email: "kathrin.k@qvantel.com" }],
				mobileNumbers: [{ number: "2398457" }],
				identifications: [
					{
						type: "passport",
						identificationId: "1234",
						issuingAuthority: {
							name: "police"
						},
						validityPeriod: {
							startDate: "2018-06-10T00:00:00.000Z",
							endDate: "2023-06-10T00:00:00.000Z"
						}
					}
				]
			},
			postalAddress: {
				street: "1 Test Street",
				description: "Test Co.",
				postalCode: "90210",
				city: "Test city",
				stateOrProvince: "Test stateOrProvince",
				country: "Mock country"
			},
			schema: {
				isValid: () => { },
				validate: () => { }
			},
			defaultIdentificationType: "passport",
			actions: {
				resetConfirmCustomerDetails: jest.fn(),
			}
		};
		isValid = valid => {
			console.log("MOCKED isValid(), valid:", valid);
		};
	});

	it("succeeds at shallow mount with minimal props", () => {
		const WithSchema = withSchema(["personDetailsForm"])(PersonDetailsForm);
		const wrapper = shallowWithContext(
			<WithSchema
				{...minimalProperties}
			/>,
			{
				context
			}
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("click Save button after changing DATA should enable contract button", done => {
		const testInputValue = "foo";
		const person = minimalProperties.person;
		person.birthDay = new Date();
		const postalAddress = minimalProperties.postalAddress;

		const WithSchema = withSchema(["personDetailsForm"])(PersonDetailsForm);
		const wrapper = mountWithContext(
			<WithSchema
				{...minimalProperties}
				person={person}
				postalAddress={postalAddress}
				isValid={isValid}
			/>,
			{
				context
			}
		);

		const personDetailsForm = wrapper.find(
			".PersonDetailsForm-details-form"
		);
		const form = personDetailsForm.find("form");

		let bContracts = form.find("#buttonGoToContractsInCheckoutSetup");
		let bSave = form
			.find("#PersonDetailsForm-save-information-button")
			.hostNodes();
		expect(bSave.props().disabled).toEqual(
			true,
			"The Save button should be disabled before form interaction"
		);

		const textInputs = form.find(".form-group").filterWhere(n => {
			if (!n.hasClass("PersonDetailsForm-date-of-birth")) {
				return n.find("input").length > 0;
			}
			return null;
		});

		textInputs
			.find('[name="firstName"]')
			.find("input")
			.simulate("change", { target: { value: testInputValue } });

		expect.assertions(3);

		setTimeout(() => {
			bSave = wrapper
				.update()
				.find("#PersonDetailsForm-save-information-button")
				.hostNodes();
			expect(bSave.props().disabled).toEqual(
				false,
				"The Save button should be enabled after input change"
			);

			bSave.simulate("click");

			setTimeout(() => {
				bContracts = wrapper
					.find("#buttonGoToContractsInCheckoutSetup")
					.hostNodes();
				expect(bContracts.props().disabled).toEqual(
					true,
					"The Go to contracts button should be disabled after information is saved"
				);
				done();
			}, delay);
		}, delay);
	});

	it.skip(
		"must mark gender, email, phone as required and be given by user (among other required ones) to enable the SAVE button",
		done => {
			const WithSchema = withSchema(["personDetailsForm"])(
				PersonDetailsForm
			);
			const wrapper = mountWithContext(
				<WithSchema
					{...minimalProperties}
					ConsulStore={consulStore}
					addressIsRequired={true}
				/>,
				{
					context
				}
			);

			const personDetailsForm = wrapper.find(
				".PersonDetailsForm-details-form"
			);
			expect(personDetailsForm.hostNodes()).toHaveLength(
				1,
				".PersonDetailsForm-details-form not found or there were more than one"
			);

			const form = personDetailsForm.find("form");
			expect(form.hostNodes()).toHaveLength(
				1,
				"form element not found or there were more than one"
			);

			const gGender = wrapper.find("OcSelect").filterWhere(node => {
				return node.find("#PersonDetailsForm-gender-gender").length > 0;
			});
			expect(gGender.hostNodes()).toHaveLength(
				1,
				"There should be only one select with id #PersonDetailsForm-gender-gender, multiple found"
			);

			const gEmail = wrapper.find("OcInput").filterWhere(node => {
				return node.find("#PersonDetailsForm-email-field").length > 0;
			});
			expect(gEmail.hostNodes()).toHaveLength(
				1,
				"#PersonDetailsForm-email-field input not found or there were more than one"
			);

			const gPhone = wrapper.find("OcInput").filterWhere(node => {
				return node.find("#PersonDetailsForm-phone-field").length > 0;
			});
			expect(gPhone.hostNodes()).toHaveLength(
				1,
				".form-group for phone not found or there were more than one"
			);

			const bSave = form
				.find("OcButton")
				.filterWhere(node => {
					return (
						node.find("#PersonDetailsForm-save-information-button")
							.length > 0
					);
				})
				.hostNodes();
			expect(bSave).toHaveLength(
				1,
				"#PersonDetailsForm-save-information-button not found in form or there were more than one"
			);
			expect(bSave.instance()).toHaveProperty(
				"disabled",
				true,
				"Save button should be disabled"
			);

			expect(gGender.hostNodes().instance()).toHaveProperty(
				"required",
				true,
				"Gender field should be marked as required"
			);

			expect(gEmail.hostNodes().instance()).toHaveProperty(
				"required",
				true,
				"Email field should be marked as required"
			);
			expect(gPhone.hostNodes().instance()).toHaveProperty(
				"required",
				true,
				"Phone field should be marked as required"
			);

			wrapper
				.find('[name="firstName"]')
				.find("input")
				.simulate("change", { target: { value: "John" } });

			wrapper
				.find('[name="firstName"]')
				.find("input")
				.simulate("change", { target: { value: "Smith" } });

			const genderOptions = gGender
				.find("select option")
				.filterWhere(node => {
					const disabled =
						"disabled" in node.props() && node.props().disabled;
					return !disabled;
				});

			gGender.find("select").simulate("change", {
				target: { value: genderOptions.at(0).prop("value") }
			});

			wrapper.find('[name="email"] input').simulate("change", {
				target: { value: "john.smith@qvantel.com" }
			});

			gPhone
				.find("input")
				.simulate("change", { target: { value: "340976758" } });

			const gStreet = wrapper.find('[name="street"]');
			expect(gStreet.hostNodes()).toHaveLength(
				1,
				".form-group for street address not found or there were more than one"
			);
			gStreet
				.find("input")
				.simulate("change", { target: { value: "1 Test St" } });

			const gPostalCode = wrapper.find('[name="postalCode"]').hostNodes();
			expect(gPostalCode).toHaveLength(
				1,
				".form-group for postalCode not found or there were more than one"
			);
			gPostalCode
				.find("input")
				.simulate("change", { target: { value: "12340" } });
			const gStateOrProvince = wrapper.find('[name="stateOrProvince"]');
			expect(gStateOrProvince.hostNodes()).toHaveLength(
				1,
				".form-group for stateOrProvince not found or there were more than one"
			);
			gStateOrProvince
				.find("input")
				.simulate("change", { target: { value: "Test stateOrProvince" } });
			const gCity = wrapper.find('[name="city"]');
			expect(gCity.hostNodes()).toHaveLength(
				1,
				".form-group for city not found or there were more than one"
			);
			gCity
				.find("input")
				.simulate("change", { target: { value: "Test City" } });

			const gCountry = wrapper.find('[name="country"]');
			expect(gCountry.hostNodes()).toHaveLength(
				1,
				".form-group for country not found or there were more than one"
			);
			expect(!gCountry.find('[name="country"]').is("select")).toEqual(
				false,
				"Country input element should be a select element"
			);

			const countryOptions = gCountry
				.find("select option")
				.filterWhere(node => {
					const disabled =
						"disabled" in node.props() && node.props().disabled;
					return !disabled;
				});
			gCountry.find("select").simulate("change", {
				target: { value: countryOptions.at(0).prop("value") }
			});
			wrapper.update();

			expect.assertions(16);
			setTimeout(() => {
				expect(bSave.props().disabled).toEqual(
					false,
					"Save button should be enabled"
				);
				done();
			}, delay);
		}
	);

	it("enables the Save button and disables Go to contracts button on input to a random field", done => {
		const testInputValue = "foo";
		const person = minimalProperties.person;
		person.birthDay = new Date();
		const postalAddress = minimalProperties.postalAddress;

		const WithSchema = withSchema(["personDetailsForm"])(PersonDetailsForm);
		const wrapper = mountWithContext(
			<WithSchema
				{...minimalProperties}
				person={person}
				postalAddress={postalAddress}
				setupDone={{}}
				isValid={isValid}
			/>,
			{
				context
			}
		);

		const personDetailsForm = wrapper
			.find(".PersonDetailsForm-details-form")
			.hostNodes();
		expect(personDetailsForm.length).toEqual(
			1,
			".PersonDetailsForm-details-form not found or there were more than one"
		);

		const form = personDetailsForm.find("form");
		expect(form.length).toEqual(
			1,
			"form element not found or there were more than one"
		);

		const textInputs = form.find(".form-group").filterWhere(n => {
			if (!n.hasClass("PersonDetailsForm-date-of-birth")) {
				return n.find("input").length > 0;
			}
			return null;
		});
		expect(textInputs.length).toBeGreaterThan(
			0,
			"There should be several input elements, found none"
		);

		expect(
			wrapper.find("#PersonDetailsForm-save-information-button").length
		).toBeGreaterThan(
			0,
			"Button #PersonDetailsForm-save-information-button not found"
		);

		const bSave = form
			.find("#PersonDetailsForm-save-information-button")
			.hostNodes();
		expect(bSave.length).toEqual(
			1,
			"#PersonDetailsForm-save-information-button not found in form or there were more than one"
		);
		expect(bSave.props().disabled).toEqual(
			true,
			"The Save information button should be disabled before any value is changed"
		);

		const bContracts = form
			.find("#buttonGoToContractsInCheckoutSetup")
			.hostNodes();
		expect(bContracts.length).toEqual(
			1,
			"#buttonGoToContractsInCheckoutSetup not found in form or there were more than one"
		);
		expect(bContracts.props().disabled).toEqual(
			false,
			"The Go to contracts button should be enabled when user information is complete and valid and setup is done"
		);

		const pickedInput = textInputs.find('[name="firstName"]').find("input");
		pickedInput.simulate("change", { target: { value: testInputValue } });

		expect.assertions(9);

		setTimeout(() => {
			expect(
				wrapper
					.update()
					.find("#PersonDetailsForm-save-information-button")
					.hostNodes()
					.props().disabled
			).toEqual(
				false,
				"The Save information button should be enabled after a value is changed"
			);
			done();
		}, delay);
	});

	it("succeeds at full mount with minimal props", () => {
		const WithSchema = withSchema(["personDetailsForm"])(PersonDetailsForm);
		mountWithContext(<WithSchema {...minimalProperties} />, {
			context
		});
	});

	it("presents all given countries", () => {
		// TODO: This test needs to refactored to test the facelifted form. Many of the assertions
		// in this test make almost no sense to me. This tests the shape of the markup more than it tests functionality

		const { getValueAndTextFromSelectOptions } = TestUtils;

		const WithSchema = withSchema(["personDetailsForm"])(PersonDetailsForm);
		const wrapper = mountWithContext(
			<WithSchema
				{...minimalProperties}
			/>,
			{
				context
			}
		);

		/* Another anonymous writes: I hope this is easy to read and understand what is being done */
		const renderedCountries = getValueAndTextFromSelectOptions(
			wrapper
				.find("OcSelectCountry")
				.filterWhere(n => {
					return (
						n.find("#PersonDetailsForm-postalAddress-country-field")
							.length > 0
					);
				})
				.find("select"),
			true
		).map(entry => {
			return {
				code: entry.value,
				name: entry.text
			};
		});

		expect.assertions(1 + consulStore.countries.length);

		expect(renderedCountries.length).toEqual(
			consulStore.countries.length,
			"Component rendered " +
			renderedCountries.length +
			" countries, expected " +
			consulStore.countries.length
		);

		renderedCountries.forEach(country => {
			expect(
				consulStore.countries.some(element => {
					return element.code === country.code;
				})
			).toBe(true);
		});
	});

	it("presents genders from ConsulStore", () => {
		const { getValueAndTextFromSelectOptions } = TestUtils;

		const WithSchema = withSchema(["personDetailsForm"])(PersonDetailsForm);
		const wrapper = mountWithContext(
			<WithSchema
				{...minimalProperties}
				ConsulStore={consulStore}
			/>,
			{
				context
			}
		);

		const personDetailsForm = wrapper.find(
			".PersonDetailsForm-details-form"
		);
		expect(personDetailsForm.hostNodes()).toHaveLength(
			1,
			".PersonDetailsForm-details-form not found or there were more than one"
		);

		const form = personDetailsForm.find("form");
		expect(form.hostNodes()).toHaveLength(
			1,
			"form element not found or there were more than one"
		);

		const genders = getValueAndTextFromSelectOptions(
			wrapper.find("#PersonDetailsForm-gender"),
			true
		);
		expect(genders.length).toEqual(
			consulStore.genders.length,
			"Expected " +
			consulStore.genders.length +
			" genders, got " +
			genders.length
		);

		expect.assertions(3 + consulStore.genders.length);
		genders.forEach(entry => {
			expect(consulStore.genders).toEqual(
				expect.arrayContaining([entry.value])
			);
		});
	});

	it("passes the whole model to parent on submit including person and postalAddress as top level properties", done => {
		const person = minimalProperties.person;
		person.birthDay = new Date();
		const postalAddress = minimalProperties.postalAddress;
		const userActions = minimalProperties.UserActions;

		const isValid = valid => {
			console.log("MOCKED isValid(), valid:", valid);
		};

		const WithSchema = withSchema(["personDetailsForm"])(PersonDetailsForm);
		const wrapper = mountWithContext(
			<WithSchema
				{...minimalProperties}
				person={person}
				postalAddress={postalAddress}
				ConsulStore={consulStore}
				BasketStore={basketStore}
				UserActions={userActions}
				isValid={isValid}
			/>,
			{
				context
			}
		);

		const personDetailsForm = wrapper.find(
			".PersonDetailsForm-details-form"
		);
		expect(personDetailsForm.hostNodes()).toHaveLength(
			1,
			".PersonDetailsForm-details-form not found or there were more than one"
		);

		const form = personDetailsForm.find("form");
		expect(form.hostNodes()).toHaveLength(
			1,
			"form element not found or there were more than one"
		);

		const textInputs = form.find(".form-group").filterWhere(n => {
			return !n.hasClass("PersonDetailsForm-date-of-birth");
		});
		expect(textInputs.hostNodes().length).toBeGreaterThan(
			0,
			"There should be several input elements, found none"
		);

		const bSave = form.find("#PersonDetailsForm-save-information-button");
		expect(bSave.hostNodes()).toHaveLength(
			1,
			"#PersonDetailsForm-save-information-button not found in form or there were more than one"
		);

		const pickedInput = textInputs.find('[name="firstName"]').find("input");

		const testValue = person.firstName;
		pickedInput.simulate("change", { target: { value: testValue } });
		wrapper.update();

		expect.assertions(5);

		setTimeout(() => {
			expect(bSave.hostNodes().instance()).toHaveProperty(
				"disabled",
				false,
				"The Save button is disabled, can not continue this test"
			);
			done();
		}, delay);
	});

	it("overwrites birthDay in future to today's date.", done => {
		const { openDateTimePicker } = ReactWidgetsTestUtils;
		const person = minimalProperties.person;
		person.birthDay = new Date();
		const postalAddress = minimalProperties.postalAddress;

		const WithSchema = withSchema(["personDetailsForm"])(PersonDetailsForm);
		const wrapper = mountWithContext(
			<WithSchema
				{...minimalProperties}
				ConsulStore={consulStore}
				BasketStore={basketStore}
				ErrorStore={{
					addressValidationError: () => { }
				}}
				addressIsRequired={true}
				person={person}
				postalAddress={postalAddress}
				isValid={valid => {
					console.log("MOCKED isValid(), valid:", valid);
				}}
			/>,
			{
				context
			}
		);

		const fBirthDay = wrapper.find(".PersonDetailsForm-date-of-birth");
		const dateTimePicker = fBirthDay.find("DateTimePicker");

		const today = new Date();

		const todayNextYear = new Date(today);
		todayNextYear.setFullYear(todayNextYear.getFullYear() + 1);
		openDateTimePicker(dateTimePicker);

		const todayNextYearStr = moment(todayNextYear).format("LL");
		dateTimePicker
			.find("input")
			.simulate("change", { target: { value: todayNextYearStr } })
			.simulate("blur");
		wrapper.update();

		setTimeout(() => {
			expect(dateTimePicker.props().value.toJSON()).not.toEqual(
				todayNextYear.toJSON()
			);
			done();
		}, delay);
	});

	it("updates buttons disabled properties on submit reponse and keeps user entered values in input fields", done => {
		const person = minimalProperties.person;
		person.birthDay = new Date();
		const postalAddress = minimalProperties.postalAddress;
		const userActions = minimalProperties.UserActions;

		const WithSchema = withSchema(["personDetailsForm"])(PersonDetailsForm);
		const wrapper = mountWithContext(
			<WithSchema
				{...minimalProperties}
				person={person}
				postalAddress={postalAddress}
				ConsulStore={consulStore}
				BasketStore={basketStore}
				UserActions={userActions}
				isValid={isValid}
			/>,
			{
				context
			}
		);

		const personDetailsForm = wrapper.find(
			".PersonDetailsForm-details-form"
		);
		expect(personDetailsForm.hostNodes()).toHaveLength(
			1,
			".PersonDetailsForm-details-form not found or there were more than one"
		);

		const form = personDetailsForm.find("form");
		expect(form.hostNodes()).toHaveLength(
			1,
			"form element not found or there were more than one"
		);

		const textInputs = form.find(".form-group").filterWhere(n => {
			return !n.hasClass("PersonDetailsForm-date-of-birth");
		});
		expect(textInputs.length).toBeGreaterThan(
			0,
			"There should be several input elements, found none"
		);

		const bSave = form.find("#PersonDetailsForm-save-information-button");
		expect(bSave.hostNodes()).toHaveLength(
			1,
			"#PersonDetailsForm-save-information-button not found in form or there were more than one"
		);

		const bContracts = form.find("#buttonGoToContractsInCheckoutSetup");
		expect(bContracts.hostNodes()).toHaveLength(
			1,
			"#buttonGoToContractsInCheckoutSetup not found in form or there were more than one"
		);

		const pickedInput = textInputs.find('[name="firstName"]').find("input");

		const testValue = `${person.firstName}-Maria`;
		pickedInput.simulate("change", { target: { value: testValue } });
		wrapper.update();

		expect(bSave.hostNodes().instance()).toHaveProperty(
			"disabled",
			true,
			"The Save button is disabled, can not continue this test"
		);

		form.simulate("submit");
		wrapper.update();

		expect.assertions(11);

		setTimeout(() => {
			expect(bSave.hostNodes().instance()).toHaveProperty(
				"disabled",
				false,
				"#PersonDetailsForm-save-information-button must be enabled before server responds"
			);

			expect(bContracts.hostNodes().instance()).toHaveProperty(
				"disabled",
				true,
				"#buttonGoToContractsInCheckoutSetup must be disabled before server responds"
			);

			expect(pickedInput.hostNodes().instance()).toHaveProperty(
				"value",
				testValue,
				"picked input value doesn't reflect user changes"
			);

			const newPerson = Object.assign({}, person, {
				firstName: testValue
			});
			wrapper.setProps(
				Object.assign({}, wrapper.get(0).props, {
					person: newPerson,
					setupDone: {}
				})
			);

			expect(bSave.hostNodes().instance()).toHaveProperty(
				"disabled",
				true,
				"#PersonDetailsForm-save-information-button must be disabled after successful server response"
			);

			expect(bContracts.hostNodes().instance()).toHaveProperty(
				"disabled",
				false,
				"#buttonGoToContractsInCheckoutSetup must be enabled after successful server response"
			);

			done();
		}, delay);
	});

	it("should render identification type selection with specific values and identification id fields", () => {

		const WithSchema = withSchema(["personDetailsForm"])(PersonDetailsForm);
		const wrapper = mountWithContext(
			<WithSchema
				{...minimalProperties}
			/>,
			{
				context
			}
		);

		const identificationIdTextField = wrapper.find(
			"input#PersonDetailsForm-identificationId"
		);

		const identificationIssuingAuthorityTextField = wrapper.find(
			"input#PersonDetailsForm-identificationIssuingAuthority"
		);

		// const identificationIssuingDate = wrapper.find(
		// 	"input#identificationIssuingDate"
		// );

		// const identificationExpiryDate = wrapper.find(
		// 	"input#identificationExpiryDate"
		// );
		expect(identificationIdTextField.length).toBe(1);
		expect(identificationIssuingAuthorityTextField.length).toBe(1);
		//expect(identificationIssuingDate.length).toBe(1);
		//expect(identificationExpiryDate.length).toBe(1);
	});

	it("should render identification type selection and identification id fields with prefilled values from props person", () => {
		const WithSchema = withSchema(["personDetailsForm"])(PersonDetailsForm);
		const wrapper = mountWithContext(
			<WithSchema
				{...minimalProperties}
			/>,
			{
				context
			}
		);

		const identificationIdTextField = wrapper.find(
			"input#PersonDetailsForm-identificationId"
		);

		const identificationIssuingAuthorityTextField = wrapper.find(
			"input#PersonDetailsForm-identificationIssuingAuthority"
		);

		// const identificationIssuingDate = wrapper.find(
		// 	"input#identificationIssuingDate"
		// );

		// const identificationExpiryDate = wrapper.find(
		// 	"input#identificationExpiryDate"
		// );
		expect(identificationIdTextField.length).toBe(1);
		expect(identificationIdTextField.props().value).toEqual("1234");
		expect(identificationIssuingAuthorityTextField.props().value).toEqual(
			"police"
		);
		//expect(identificationIssuingDate.props().value).toEqual(moment("10 June 2018").format(Time.dateConfig().DATE));
		//expect(identificationExpiryDate.props().value).toEqual(moment("10 June 2023").format(Time.dateConfig().DATE));
	});
});

import * as React from "react";
import yup, { Schema } from "yup";
import { mountWithContext, shallowWithContext, ReactWidgetsTestUtils, TestUtils, withSchema, Gender, SimpleDataMock } from "omnichannel-common-pos";
import CustomerDataForm, { CustomerDataFormProps } from "./CustomerDataForm";
import { ReactWrapper } from "enzyme";

describe("CustomerDataForm", () => {
	const context = SimpleDataMock.getConsulContextMock();

	const minProps: CustomerDataFormProps = {
		schema: {} as any as Schema<any> & { fields: Array<any> },
		requiredFields: [],
		additionalFields: [],
		validationErrors: [],
		customerToCreate: {},
		genders: [] as any as Array<Gender>,
		features: {},
		displayOptions: {
			organizationIdentification: {},
			identification: [{
				backendValue: "CC",
				identificationExpiryDate: true,
				localisation: {
					en: "Personal Identification Card",
					fi: "Henkilökortti",
					sv: "identitetskort"
				}
			},
			{
				backendValue: "FP",
				identificationExpiryDate: true,
				localisation: {
					en: "Foreign Passport",
					fi: "Ulkomaalainen Passi",
					sv: "Utländskt Pass"
				}
			},
			{
				backendValue: "PP",
				identificationExpiryDate: true,
				localisation: {
					en: "Passport",
					fi: "Passi",
					sv: "Pass"
				}
			},
			{
				backendValue: "DE",
				identificationExpiryDate: true,
				localisation: {
					en: "Foreign ID",
					fi: "Ulkomaalainen ID",
					sv: "Utländskt ID"
				}
			}
			],
			customerDataForm: {},
		},
		locale: "en",
		locations: {},
		countries: [],
		customerIdValidationStatus: false,
		customerIdValidationStatusForNamesField: false,
		actions: {
			onBlur: jest.fn(),
			onSubmit: jest.fn(),
		},
		dateFormat: "",
	};

	const mockSchema: Schema<any> & { fields: Array<any> } = yup.object({
		firstName: yup.string(),
		lastName: yup.string(),
		gender: yup.string(),
		email: yup.string().required().email(),
		format:yup.string(),
		mobileNumber: yup.string(),
		fixedLineNumber: yup.string(),
		identificationType: yup.string(),
		identificationId: yup.string(),
		identificationIssuingAuthority: yup.string(),
		identificationIssuingAuthorityCity: yup.string(),
		identificationIssuingDate: yup.date(),
		identificationExpiryDate: yup.date().nullable(true),
		street: yup.string(),
		postalCode: yup.string(),
		city: yup.string(),
		country: yup.string(),
		additionalName: yup.string()
	}) as any as Schema<any> & { fields: Array<any> };

	it("succeeds at shallow mount with minimum props", () => {
		shallowWithContext(<CustomerDataForm {...minProps} />, { context });
		/* no point taking a snapshot because passport fields' date value is not fixed and trying to mock Date just hangs this script -Jussi */
	});

	it("succeeds at deep mount with minimum props", () => {
		const WithSchema = withSchema(["customerDataForm"])(CustomerDataForm);
		mountWithContext(<WithSchema {...minProps} />, { context });
	});

	it("renders with minimum props", () => {
		const WithSchema = withSchema(["customerDataForm"])(CustomerDataForm);
		const wrapper = mountWithContext(<WithSchema {...minProps} />, { context });

		const customerDataForm = wrapper.find(".CustomerDataForm");
		expect(customerDataForm.hostNodes()).toHaveLength(1);

		const hPersonalInfo = customerDataForm.find("legend").filterWhere((n: any) => {
			return n.text().toLowerCase() === "Personal information".toLowerCase();
		});
		expect(hPersonalInfo.length).toEqual(1);

		const hContactInfo = customerDataForm.find("legend").filterWhere((n: any) => {
			return n.text().toLowerCase() === "Contact information".toLowerCase();
		});
		expect(hContactInfo.length).toEqual(1);

		expect(wrapper.find("#inputFirstNameIntoCustomerDataForm").hostNodes()).toHaveLength(1);
		expect(wrapper.find("#inputLastNameIntoCustomerDataForm").hostNodes()).toHaveLength(1);
		expect(wrapper.find("#inputEmailIntoCustomerDataForm").hostNodes()).toHaveLength(1);
		expect(wrapper.find("#inputMobileNumberIntoCustomerDataForm").hostNodes()).toHaveLength(1);
		expect(wrapper.find("#inputFixedLineNumberIntoCustomerDataForm").hostNodes()).toHaveLength(1);
		expect(wrapper.find("#inputGenderIntoCustomerDataForm").hostNodes()).toHaveLength(1);
		expect(wrapper.find("#inputStreetIntoCustomerDataForm").hostNodes()).toHaveLength(1);
		expect(wrapper.find("#inputPostalCodeIntoCustomerDataForm").hostNodes()).toHaveLength(1);
		expect(wrapper.find("#inputCityIntoCustomerDataForm").hostNodes()).toHaveLength(1);
	});

	/* RUBT-59349
	 * NOTE at the time of writing this, the 'mobile number' field was called 'phone'. -Jussi
	 *
	 * 29.6.2017, RUBT-56116: this should be moved to customerSearchForm-test.js.
	 *	The changes in this ticket must be tested with NewCustomerInfo too.
	 * 		-Jussi
	 *
	 * 30.6.2017: skipping this test until there is a specification for mobile number validation.
	 */
	it.skip("will present error message about invalid mobile number only on submit", done => {
		const { getDelayedPromise } = TestUtils;

		const schema: Schema<any> & { fields: Array<any> } = yup.object({
			firstName: yup.string().required(),
			lastName: yup.string().required(),
			email: yup.string().email().required(),
			gender: yup.string().required(),
			street: yup.string(),
			coAddress: yup.string(),
			postalCode: yup.string(),
			city: yup.string(),
			country: yup.string()
		}) as any as Schema<any> & { fields: Array<any> };

		const wrapper = mountWithContext(<CustomerDataForm {...minProps} schema={schema} />, { context });

		const fMobileNumber = wrapper.find(".form-group").filterWhere((node: any) => node.find("#inputMobileNumberIntoCustomerDataForm").length > 0);

		fMobileNumber.find("input").simulate("change", { target: { value: "+" } });

		getDelayedPromise(300).then(() => {
			const errorMsg = fMobileNumber.find(".help-block");

			if (errorMsg.length === 1) {
				if (errorMsg.text() !== "[object Object]") {
					/* a workaround for something that seems like a bug in weasel-react. -Jussi */
					expect(errorMsg.length).toEqual(0);
				}
			}

			wrapper.find("form").simulate("submit");

			getDelayedPromise(300).then(() => {
				const errorMsg = fMobileNumber.find(".help-block");
				expect(errorMsg.length).toBeGreaterThan(0);
				expect(errorMsg.text()).not.toEqual("");
				done();
			});
		});
	});
	function getFPassportExpiryDate(wrapper: ReactWrapper): ReactWrapper {
		return wrapper.find(".OcDatePicker").filterWhere(node =>
			node.find("#inputIdentificationExpiryDateIntoCustomerDataForm").length > 0);
	}

	/* RND-9051 */
	it("expiry date should be selectable for today", () => {
		const { openDateTimePicker, getValidElementInOpenedDateTimePicker } = ReactWidgetsTestUtils;

		const WithSchema = withSchema(["customerDataForm"])(CustomerDataForm);
		const wrapper = mountWithContext(<WithSchema {...minProps} />, { context });

		let fPassportExpiryDate = getFPassportExpiryDate(wrapper);
		openDateTimePicker(fPassportExpiryDate);
		wrapper.update();
		fPassportExpiryDate = getFPassportExpiryDate(wrapper);

		const firstAvailableDateCell = getValidElementInOpenedDateTimePicker(fPassportExpiryDate, 0);

		const firstAvailableDate = new Date(firstAvailableDateCell.prop("title") as string);
		const today = new Date();
		today.setDate(today.getDate());
		today.setHours(0);
		today.setMinutes(0);
		today.setSeconds(0);
		today.setMilliseconds(0);
		expect(firstAvailableDate.toString()).toEqual(today.toString());
	});

	function getFPassportIssuingDate(wrapper: ReactWrapper) {
		return wrapper.find(".OcDatePicker").filterWhere(node => node.find("#inputIdentificationIssuingDateIntoCustomerDataForm").length > 0);
	}
	/* skipping this test issuing date should be select current date.
	*/
	it.skip("passport issuing date should be selectable for no later than yesterday", () => {
		const { openDateTimePicker, selectLastValidElementInOpenedDateTimePicker } = ReactWidgetsTestUtils;

		const WithSchema = withSchema(["customerDataForm"])(CustomerDataForm);
		const wrapper = mountWithContext(<WithSchema {...minProps} />, { context });

		let fPassportIssuingDate = getFPassportIssuingDate(wrapper);
		openDateTimePicker(fPassportIssuingDate);
		wrapper.update();

		fPassportIssuingDate = getFPassportIssuingDate(wrapper);
		const lastAvailableDateCell = selectLastValidElementInOpenedDateTimePicker(fPassportIssuingDate);

		const lastAvailableDate = new Date(lastAvailableDateCell.prop("title") as string);
		const yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 1);
		yesterday.setHours(0);
		yesterday.setMinutes(0);
		yesterday.setSeconds(0);
		yesterday.setMilliseconds(0);

		expect(lastAvailableDate.toString()).toEqual(yesterday.toString());
	});

	it("presents all given countries in country select", () => {
		const { getValueAndTextFromSelectOptions } = TestUtils;

		const WithSchema = withSchema(["customerDataForm"])(CustomerDataForm);
		const wrapper = mountWithContext(<WithSchema {...minProps} />, {
			context
		});

		const countries = getValueAndTextFromSelectOptions(wrapper.find("select#inputCountryIntoCustomerDataForm"), true).map((entry: any) => {
			return {
				code: entry.value,
				name: entry.text
			};
		});

		expect(countries.length).toEqual(minProps.countries.length);
		countries.forEach((country: any) => {
			expect(minProps.countries).toEqual(expect.arrayContaining([country]));
		});
	});

	it("marks those fields required that were declared as required", () => {
		const requiredFields = ["firstName", "lastName", "email", "mobileNumber", "fixedLineNumber", "gender", "street", "postalCode", "city", "country"];

		const WithSchema = withSchema(["customerDataForm"])(CustomerDataForm);
		const wrapper = mountWithContext(<WithSchema {...minProps} requiredFields={requiredFields} />, { context });

		[
			"inputFirstNameIntoCustomerDataForm",
			"inputLastNameIntoCustomerDataForm",
			"inputEmailIntoCustomerDataForm",
			"inputMobileNumberIntoCustomerDataForm",
			"inputFixedLineNumberIntoCustomerDataForm",
			"inputGenderIntoCustomerDataForm",
			"inputStreetIntoCustomerDataForm",
			"inputPostalCodeIntoCustomerDataForm",
			"inputCityIntoCustomerDataForm",
			"inputCountryIntoCustomerDataForm"
		].forEach(id => {
			const element = wrapper.find("#" + id).hostNodes();
			console.log(id);
			expect(element).toHaveLength(1);
			expect(element.prop("required")).toEqual(true);
		});
	});

	function assertFieldsRequired(fields: any, required: any) {
		fields.forEach((field: any) => {
			expect(field.hostNodes().prop("required")).toEqual(required);
		});
	}

	it("marks only name fields as required and submits form with data entered in those only", done => {
		const requiredFields = ["firstName", "lastName"];

		const mockSchema: Schema<any> & { fields: Array<any> } = yup.object({
			firstName: yup.string().required(),
			additionalName: yup.string(),
			lastName: yup.string().required(),
			lastName2: yup.string(),
			inputEmailIntoCustomerDataForm: yup.string(),
			email: yup.string(),
			fixedLineNumber: yup.string(),
			gender: yup.string(),
			birthDay: yup.date(),
			identificationType: yup.string(),
			identificationId: yup.string(),
			identificationIssuingAuthority: yup.string(),
			identificationIssuingAuthorityCity: yup.string(),
			identificationIssuingDate: yup.date(),
			identificationExpiryDate: yup.date().nullable(true),
			street: yup.string(),
			addressDetails: yup.string(),
			province: yup.string(),
			city: yup.string(),
			postalCode: yup.string(),
			apartment: yup.string(),
			building: yup.string(),
			country: yup.string()
		}) as any as Schema<any> & { fields: Array<any> };

		const wrapper = mountWithContext(
			<CustomerDataForm
				{...minProps}
				schema={mockSchema}
				requiredFields={requiredFields}
			/>,
			{ context }
		);

		const expectedRequiredFields = ["inputFirstNameIntoCustomerDataForm", "inputLastNameIntoCustomerDataForm"];

		assertFieldsRequired(expectedRequiredFields.map(id => wrapper.find("#" + id)), true);

		const expectedOptionalFields = [
			"inputEmailIntoCustomerDataForm",
			"inputMobileNumberIntoCustomerDataForm",
			"inputFixedLineNumberIntoCustomerDataForm",
			"inputStreetIntoCustomerDataForm",
			"inputPostalCodeIntoCustomerDataForm",
			"inputCityIntoCustomerDataForm",
			"inputCountryIntoCustomerDataForm"
		];

		assertFieldsRequired(expectedOptionalFields.map(id => wrapper.find("#" + id)), false);

		const iFirstName = wrapper.find("#inputFirstNameIntoCustomerDataForm").hostNodes();
		const iLastName = wrapper.find("#inputLastNameIntoCustomerDataForm").hostNodes();

		iFirstName.simulate("change", { target: { value: "John" } });

		iLastName.find("input").simulate("change", { target: { value: "Smith" } });

		const submitSpy = minProps.actions.onSubmit;

		wrapper.find("form").simulate("submit");
		setTimeout(() => {
			expect(submitSpy).toHaveBeenCalledWith({ firstName: "John", lastName: "Smith" });
			done();
		}, 1000);
	});

	it("will not allow form to be submitted when only a Form.Field is marked required (and schema field is not)", done => {
		const { getDelayedPromise } = TestUtils;

		const requiredFields = ["firstName"];
		const submitSpy = minProps.actions.onSubmit;
		(submitSpy as any).mockClear();

		const mockSchema: Schema<any> & { fields: Array<any> } = yup.object({
			firstName: yup.string().required(),
			additionalName: yup.string(),
			lastName: yup.string().required(),
			lastName2: yup.string(),
			inputEmailIntoCustomerDataForm: yup.string(),
			email: yup.string(),
			fixedLineNumber: yup.string(),
			gender: yup.string(),
			birthDay: yup.date(),
			identificationType: yup.string(),
			identificationId: yup.string(),
			identificationIssuingAuthority: yup.string(),
			identificationIssuingAuthorityCity: yup.string(),
			identificationIssuingDate: yup.date(),
			identificationExpiryDate: yup.date().nullable(true),
			street: yup.string(),
			addressDetails: yup.string(),
			province: yup.string(),
			city: yup.string(),
			postalCode: yup.string(),
			apartment: yup.string(),
			building: yup.string(),
			country: yup.string()
		}) as any as Schema<any> & { fields: Array<any> };

		const wrapper = mountWithContext(
			<CustomerDataForm
				{...minProps}
				schema={mockSchema}
				requiredFields={requiredFields}
			/>,
			{ context }
		);

		const expectedRequiredFields = ["inputFirstNameIntoCustomerDataForm"];
		assertFieldsRequired(expectedRequiredFields.map(id => wrapper.find("#" + id)), true);

		const iFirstName = wrapper.find("#inputFirstNameIntoCustomerDataForm").hostNodes();
		iFirstName.simulate("change", { target: { value: "John" } });

		getDelayedPromise(300).then(() => {
			wrapper.find("form").simulate("submit");
			expect(submitSpy).not.toHaveBeenCalled();
			done();
		});
	});

	it("should render additional fields according to additionalFields property", () => {
		const localProps = {
			...minProps,
			customerIdValidationStatus: false,
			customerIdValidationStatusForNamesField: false,
			customerIdValidationError: "",
			validationServiceDown: false,
			requiredFields: [],
			additionalFields: [
				{
					label: "Additional name",
					name: "additionalName",
					required: "true"
				}
			]
		};

		const wrapper = mountWithContext(
			<CustomerDataForm
				{...localProps}
				schema={mockSchema}
				requiredFields={[]}
			/>,
			{ context }
		);

		expect(wrapper.find("#field-additionalName").hostNodes()).toHaveLength(1);
	});

	describe("RUBT-56116", () => {
		const caseProps = {
			...minProps,
			schema: mockSchema,
			requiredFields: ["firstName", "lastName", "gender", "email", "mobileNumber", "fixedLineNumber", "street", "postalCode", "city", "country"],
		};

		it("only a valid key-value pair should be passed to given onBlur handler", (done) => {
			const email = "john.smith@qvantel.com";
			const blurMock = jest.fn((partialModel) => {
				expect(partialModel).toEqual({ email });
				done();
			});

			const wrapper = mountWithContext(<CustomerDataForm {...caseProps} actions={{ ...caseProps.actions, onBlur: blurMock }} />, { context });
			const iEmail = wrapper.find("#inputEmailIntoCustomerDataForm").hostNodes();

			iEmail.simulate("blur", {
				target: {
					name: iEmail.prop("name"),
					value: email
				}
			});
		});

		it("given onBlur handler must not be called if field value is invalid", () => {
			const blurSpy = caseProps.actions.onBlur;
			(blurSpy as any).mockClear();
			const wrapper = mountWithContext(<CustomerDataForm {...caseProps} />, { context });

			const iEmail = wrapper.find("#inputEmailIntoCustomerDataForm").hostNodes();
			iEmail.simulate("blur", {
				target: {
					name: iEmail.prop("name"),
					value: "john"
				}
			});

			setTimeout(() => {
				expect(blurSpy).not.toHaveBeenCalled();
			}, 1000);
		});

		it("error message of invalid email should be presented on blur", () => {
			const wrapper = mountWithContext(<CustomerDataForm {...caseProps} />, { context });
			const fEmail = wrapper.find("Field").filterWhere((n: any) => n.prop("name") === "email");

			const iEmail = fEmail.find("#inputEmailIntoCustomerDataForm").hostNodes();
			iEmail.simulate("blur", {
				target: {
					name: iEmail.prop("name"),
					value: "john"
				}
			});

			return new Promise(resolve => {
				setTimeout(() => {
					wrapper.update();
					resolve(wrapper.find(".invalid-feedback"));
				}, 500);
			}).then((wrapper: any) => expect(wrapper.length).toEqual(1));
		});

		it("given onSubmit handler is not called for invalid data and errors should be presented next to fields with invalid data", () => {
			const submitSpy = jest.fn();

			const mySchema: Schema<any> & { fields: Array<any> } = yup.object({
				firstName: yup.string().required(),
				additionalName: yup.string(),
				lastName: yup.string().required(),
				lastName2: yup.string(),
				email: yup.string().required().email(),
				mobileNumber: yup.string().required(),
				fixedLineNumber: yup.string().required(),
				gender: yup.string().required(),
				birthDay: yup.date(),
				identificationType: yup.string(),
				identificationId: yup.string(),
				identificationIssuingAuthority: yup.string(),
				identificationIssuingAuthorityCity: yup.string(),
				identificationIssuingDate: yup.date(),
				identificationExpiryDate: yup.date().nullable(false),
				street: yup.string().required(),
				addressDetails: yup.string(),
				province: yup.string(),
				city: yup.string().required(),
				postalCode: yup.string().required(),
				apartment: yup.string(),
				building: yup.string(),
				country: yup.string().required()
			}) as any as Schema<any> & { fields: Array<any> };

			const customerToCreate = {
				firstName: "",
				lastName: "",
				gender: "",
				email: "",
				mobileNumber: "",
				fixedLineNumber: "",
				street: "",
				postalCode: "",
				city: "",
				country: ""
			};

			const wrapper = mountWithContext(<CustomerDataForm {...caseProps} schema={mySchema} />, { context });

			wrapper.find("form").simulate("submit");

			expect(submitSpy).not.toHaveBeenCalled();

			return new Promise(resolve => {
				setTimeout(() => {
					wrapper.update();
					resolve(wrapper.find(".invalid-feedback"));
				}, 500);
			}).then((wrapper: any) => {
				expect(wrapper.length).toEqual(Object.keys(customerToCreate).length);
			});
		});

		it("error message about the email should be hidden when that field regains focus", () => {
			const wrapper = mountWithContext(<CustomerDataForm {...caseProps} />, { context });

			const fEmail = wrapper.find("Field").filterWhere((n: ReactWrapper) => n.prop("name") === "email");

			const iEmail = fEmail.find("#inputEmailIntoCustomerDataForm").hostNodes();
			iEmail.simulate("blur", {
				target: {
					name: iEmail.prop("name"),
					value: "john"
				}
			});

			return new Promise(resolve => {
				setTimeout(() => {
					wrapper.update();
					resolve(wrapper.find(".invalid-feedback"));
				}, 500);
			}).then((invalidityMessage: any) => {
				expect(invalidityMessage.length).toEqual(1);

				wrapper.find("#inputMobileNumberIntoCustomerDataForm").hostNodes().simulate("focus");

				return new Promise(resolve => {
					wrapper.update();
					resolve(wrapper.find(".invalid-feedback"));
				}).then((invalidityMessage: any) => {
					expect(invalidityMessage.length).toBeGreaterThan(0);
					expect(invalidityMessage.length).toBeLessThan(2);

					iEmail.simulate("focus");

					return new Promise(resolve => {
						wrapper.update();
						resolve(wrapper.find(".invalid-feedback"));
					}).then((invalidityMessage: any) => {
						expect(invalidityMessage.length).toEqual(0);
					});
				});
			});
		});
	});
});

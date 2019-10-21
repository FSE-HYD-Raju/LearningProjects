import * as React from "react";
import { TestUtils, shallowWithContext, mountWithContext, SimpleDataMock } from "omnichannel-common-pos";
import CustomerSearchForm, { CustomerSearchFormProps } from "./CustomerSearchForm";

describe("CustomerSearchForm", () => {
	const customCustomerDataForm = {
		$schema: "http://json-schema.org/draft-04/schema#",
		title: "customerDataForm",
		type: "object",
		properties: {
			firstName: {
				type: "string",
				required: true,
				editable: true
			},
			lastName: {
				type: "string",
				required: true,
				editable: true
			},
			email: {
				type: "string",
				required: true,
				editable: true,
				validation: {
					email: true
				}
			},
			mobileNumber: {
				type: "string",
				required: false,
				editable: true
			},
			fixedLineNumber: {
				type: "string",
				required: false,
				editable: true
			},
			birthDay: {
				type: "date",
				required: false,	
				editable: false,
				nullable: true,
				format: ""
			},
			gender: {
				type: "string",
				required: true,
				editable: true
			},
			passportNumber: {
				type: "string",
				required: true,
				editable: true
			},
			passportExpiryDate: {
				type: "string",
				required: true,
				editable: true
			},
			street: {
				type: "string",
				required: false
			},
			coAddress: {
				type: "string",
				required: false
			},
			postalCode: {
				type: "string",
				required: false
			},
			city: {
				type: "string",
				required: false
			},
			country: {
				type: "string",
				required: false
			}
		}
	};

	const context = SimpleDataMock.getConsulContextMock();
	context.store = TestUtils.mockReduxStore({
		schema: {
			schemas: {
				customerDataForm: customCustomerDataForm
			},
		},
		consul: {
			customerCreationMandatoryFields: ["firstname", "lastname", "gender"],
			displayOptions: {
				identification: [],
				organizationIdentification: {},
				customerDataForm: {},
			},
		},
		feature: {},
		cms: {},
	});

	const minProps: CustomerSearchFormProps = {
		displayOptions: {
			identification: [],
			organizationIdentification: {},
			customerDataForm: {},
		},
		matchForIdTypeAndNumber: [],
		customerIdValidationStatus: false,
		customerIdentificationValidationEnabled: false,
		additionalFields: [],
		customerToCreate: {},
		actions: {
			createCustomer: jest.fn(),
			searchCustomers: jest.fn(),
			saveSearchTerms: jest.fn(),
			validateIdentification: jest.fn(),
			searchCustomerWithSingleTerm: jest.fn()
		}
	};

	it("succeeds at shallow mount with min props", () => {
		const wrapper = shallowWithContext(<CustomerSearchForm {...minProps} />, { context });
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		const wrapper = mountWithContext(<CustomerSearchForm {...minProps} />, { context });

		const searchForm = wrapper.find(".new-customer-search");
		expect(searchForm.length).toEqual(1);

		const customerDataForm = searchForm.find(".CustomerDataForm");
		expect(customerDataForm.hostNodes()).toHaveLength(1);
	});

	/* CustomerActions.saveSearchTerms() should be called with object that contains the value in email field
	 * data should be found from CustomerStore, but that's not in scope of this test.
	 */
	describe("RUBT-56116", () => {
		it("CustomerActions.saveSearchTerms() should be called at onBlur event with a key-value pair from email field merged with the rest of data", done => {
			let partialModel: any;
			const newProps = {
				...minProps,
				customerToCreate: {
					firstName: "John",
					lastName: "Smith",
					gender: "male",
					email: "",
					mobileNumber: "1234",
					fixedLineNumber: "2345",
					street: "1 Test St.",
					postalCode: "12340",
					city: "Test City",
					country: "Testia"
				},
				customerIdValidationStatus: false,
				customerIdValidationError: "",
				validationServiceDown: false,
				actions: {
					...minProps.actions,
					saveSearchTerms: (model: any) => {
						expect(Object.keys(model)).toContain(partialModel.name);
						expect(model[partialModel.name]).toEqual(partialModel.value);
						done();
					}
				}
			};

			const wrapper = mountWithContext(<CustomerSearchForm {...newProps}/>, { context });

			const iEmail = wrapper.find("#inputEmailIntoCustomerDataForm").hostNodes();

			partialModel = {
				name: iEmail.prop("name"),
				value: "john.smith@qvantel.com"
			};

			iEmail.simulate("blur", { target: partialModel });
			wrapper.update();
		});
	});
});

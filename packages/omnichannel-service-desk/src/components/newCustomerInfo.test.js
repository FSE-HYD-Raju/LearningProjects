import React from "react";

import {
	shallowWithContext,
	mountWithContext,
	SimpleDataMock,
} from "omnichannel-common-pos";

import NewCustomerInfo from "../../src/components/newcustomer/NewCustomerInfo";

describe("NewCustomerInfo", () => {
	const consulContextMock = SimpleDataMock.getConsulContextMock();

	const contextForFullFunctionality = consulContextMock;

	const consulStore = {
		features: {
			pos: {
				customerDataForm: {
					apartment: true,
					building: true,
					lastName2: true
				}
			}
		}
	};

	const minProps = {
		CustomerActions: {
			clearSearch: () => {},
			createCustomer: () => {},
			saveSearchTerms: () => {}
		},
		ConsulStore: consulStore,
		UserStore: {},
		createdCustomer: {
			attributes: {
				firstName: "Thomas",
				lastName: "Anderson",
				gender: "male",
				email: {
					email: "dummy@mail.com"
				},
				fixedLineNumber: {
					number: "12"
				},
				mobileNumber: {
					number: "123456789"
				}
			}
		},
		CustomerStore: {
			customerToCreate: {}
		},
		schema: {}
	};

	it("succeeds at shallow mount minimum props", () => {
		const wrapper = shallowWithContext(<NewCustomerInfo {...minProps} />, {
			context: contextForFullFunctionality
		});
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		mountWithContext(<NewCustomerInfo {...minProps} />, {
			context: contextForFullFunctionality
		});
	});

	it("renders read-only Customer data fields for customer creation", () => {
		const wrapper = mountWithContext(
			<NewCustomerInfo
				{...minProps}
				CustomerStore={{
					customerToCreate: {
						firstName: "John",
						lastName: "Smith"
					}
				}}
			/>,
			{ context: contextForFullFunctionality }
		);

		const bBack = wrapper
			.find("#buttonBackToCustomerFromNewCustomerInfo")
			.hostNodes();
		expect(bBack.length).toEqual(
			1,
			"#buttonBackToCustomerFromNewCustomerInfo not found or there were more than one"
		);

		const bCreate = wrapper
			.find("#buttonCreateCustomerInNewCustomerInfo")
			.hostNodes();
		expect(bCreate.length).toEqual(
			1,
			"#buttonCreateCustomerInNewCustomerInfo not found or there were more than one"
		);
	});

	it("should call given clearSearch()", done => {
		const wrapper = mountWithContext(
			<NewCustomerInfo
				{...minProps}
				CustomerActions={{
					createCustomer: model => {
						console.log(
							"MOCKED props.CustomerActions.createCustomer(), model:",
							model
						);
					},
					clearSearch: () => {
						console.log(
							"MOCKED props.CustomerActions.clearSearch()"
						);
						done();
						return true;
					},
					saveSearchTerms: () => {}
				}}
				CustomerStore={{
					customerToCreate: {
						firstName: "John",
						lastName: "Smith"
					}
				}}
			/>,
			{ context: contextForFullFunctionality }
		);

		wrapper
			.find("#buttonBackToCustomerFromNewCustomerInfo")
			.hostNodes()
			.simulate("click");
	});

	it("should render additional fields according to additionalFields property", () => {
		const wrapper = mountWithContext(
			<NewCustomerInfo
				{...minProps}
				CustomerStore={{
					customerToCreate: {
						additionalName: "seppo"
					}
				}}
				additionalFields={[
					{
						label: "Additional name",
						name: "additionalName",
						required: "true"
					}
				]}
			/>,
			{ context: contextForFullFunctionality }
		);

		expect(
			wrapper.find("#additional-field-additionalName").hostNodes()
		).toHaveLength(1, "Additional name was not rendered");
	});
});

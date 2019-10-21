import React from "react";

import {
	withSchema,
	shallowWithContext,
	mountWithContext,
	SimpleDataMock,
} from "omnichannel-common-pos";

import CreateOrganizationForm from "../../src/components/organization/CreateOrganizationForm";

describe("CreateOrganizationForm", () => {
	const context = SimpleDataMock.getConsulContextMock();

	const minProps = {
		schema: {},
		onBlur: () => {},
		actions: {},
		createCustomer: () => {},
		organizationIdentification: [
			{
				"localisation": {
					 "fi": "IT",
					 "sv": "IT",
					 "en": "NIT",
					 "es": "NIT"
				 },
				 "backendValue": "IT",
				 "identificationIssuingAuthority": true,
				 "identificationExpiryDate": true
			}
		],
		locale: "en"
	};

	const props = {
		...minProps,
		requiredFields: [],
		defaultValues: {
			customertoCreate: {}
		}
	};

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(
			<CreateOrganizationForm {...minProps} />,
			{ context }
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		const WithSchema = withSchema(["createOrganizationForm"])(
			CreateOrganizationForm
		);
		mountWithContext(<WithSchema {...props} />, {
			context
		});
	});

	it("renders with minimum props", () => {
		const WithSchema = withSchema(["createOrganizationForm"])(
			CreateOrganizationForm
		);

		const wrapper = mountWithContext(<WithSchema {...props} />, {
			context
		});

		const customerDataForm = wrapper.find(".CreateOrganizationForm");

		expect(customerDataForm.hostNodes()).toHaveLength(
			1,
			".CreateOrganizationForm not found or there were more than one"
		);

		expect(
			wrapper.find("#inputIdTypeIntoCreateOrganizationForm").hostNodes()
		).toHaveLength(
			1,
			"input for Id type not found or there were more than one"
		);

		expect(
			wrapper.find("#inputIdNumberIntoCreateOrganizationForm").hostNodes()
		).toHaveLength(
			1,
			"input for Id number not found or there were more than one"
		);

		expect(
			wrapper
				.find("#inputCompanyNameIntoCreateOrganizationForm")
				.hostNodes()
		).toHaveLength(
			1,
			"input for company name not found or there were more than one"
		);

		expect(
			wrapper
				.find("#CreateorganizationForm-identification-option-IT")
				.hostNodes()
		).toHaveLength(
			1,
			"IT option not found for organization creation identification type"
		);
	});
});

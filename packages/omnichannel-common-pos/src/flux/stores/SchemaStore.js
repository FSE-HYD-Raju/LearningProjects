// @flow

import _ from "lodash";

import BaseStore from "./BaseStore";
import ImmStore from "../seamless-alt";

import { deprecated } from "../../redux/decorators";
import {
	withSchemaCustomization,
	CommonSchemaCustomizationPoints,
	B2CSchemaCustomizationPoints
} from "../../customization";
import {
	B2cPersonDetailsFormSchema,
	ContactInformationSchema,
	PersonalInformationSchema,
	DocumentsInformationSchema,
	CreateOrganizationFormSchema,
	CredentialsSchema,
	CustomerDataFormSchema,
	MarketingConsentSchema,
	PaymentFormWrapperSchema,
	PersonDetailsFormSchema,
	PersonSchema,
	PhoneDirectoryRegistrationSchema,
	Wind3PortInSchema,
	POSCheckoutDeliverySchema,
	PostalAddressSchema,
	PortInSchema,
	RecurringTopUpSchema,
	RegistrationSchema,
	RegistrationPageSchema,
	DeliveryAddressSchema
} from "../../schemas";

@ImmStore
class SchemaStore extends BaseStore {
	constructor() {
		super();

		this.bindActions(this.alt.actions.ConsulActions);
		this.defaultSchemas = {
			b2cPersonDetailsForm: withSchemaCustomization(
				B2CSchemaCustomizationPoints.PERSON_DETAILS_FORM,
				B2cPersonDetailsFormSchema
			),
			ContactInformation: withSchemaCustomization(
				B2CSchemaCustomizationPoints.CONTACT_INFORMATION,
				ContactInformationSchema
			),
			PersonalInformation: withSchemaCustomization(
				B2CSchemaCustomizationPoints.PERSONAL_INFORMATION,
				PersonalInformationSchema
			),
			DocumentsInformation: withSchemaCustomization(
				B2CSchemaCustomizationPoints.DOCUMENTS_INFORMATION,
				DocumentsInformationSchema
			),
			createOrganizationForm: CreateOrganizationFormSchema,
			credentials: CredentialsSchema,
			customerDataForm: CustomerDataFormSchema,
			marketingConsent: MarketingConsentSchema,
			paymentFormWrapper: PaymentFormWrapperSchema,
			personDetailsForm: PersonDetailsFormSchema,
			person: PersonSchema,
			phoneDirectoryRegistration: PhoneDirectoryRegistrationSchema,
			portIn: PortInSchema,
			wind3PortIn: Wind3PortInSchema,
			posCheckoutDelivery: POSCheckoutDeliverySchema,
			postalAddress: withSchemaCustomization(
				B2CSchemaCustomizationPoints.POSTAL_ADDRESS,
				PostalAddressSchema
			),
			recurringTopUpForm: RecurringTopUpSchema,
			registration: RegistrationSchema,
			registrationPage: RegistrationPageSchema,
			deliveryAddress: withSchemaCustomization(
				CommonSchemaCustomizationPoints.DELIVERY_ADDRESS,
				DeliveryAddressSchema
			),
		};

		/* set default schemas as fallback if retrieval from Consul fails for any reason */
		this.state = {
			schemas: this.defaultSchemas,
			defaultSchemas: this.defaultSchemas
		};
	}

	/* receives Consul values and picks schemas from the payload. */
	@deprecated("Covered by consul.saga and consul.getValues()")
	getValues(payload: Object) {
		const schemaKeys = _.filter(Object.keys(payload), o => {
			return o.includes("schemas/");
		});
		const consulSchemas = {};

		schemaKeys.forEach((key, index, schemaKeys) => {
			consulSchemas[
				_.replace(schemaKeys[index], "schemas/", "")
			] = this.getConsulSchemas(payload[key]);
		});

		const combinedSchemas = _.reduce(
			this.defaultSchemas,
			(result, defaultSchema, key: string) => {
				const consulSchema = _.get(consulSchemas, key);
				result[key] = consulSchema || defaultSchema;

				return result;
			},
			{}
		);
		this.setState({ schemas: combinedSchemas });
	}

	@deprecated()
	getConsulSchemas(consulValues: any) {
		try {
			return JSON.parse(consulValues);
		} catch (e) {
			console.log(
				"Parsing 'schemas' configuration object failed, default schemas will be used.",
				consulValues
			);
			return null;
		}
	}
}

export default SchemaStore;

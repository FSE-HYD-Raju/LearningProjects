"use strict";

import { ConsulValues } from "../consul/consul.types";
import { SchemaActions, SchemaActionPayload } from "./schema.actions";
import { SchemaState } from "./schema.types";
import { extractValues } from "./schema.utils";
import {
	B2CSchemaCustomizationPoints,
	CommonSchemaCustomizationPoints,
	POSSchemaCustomizationPoints,
	withSchemaCustomization
} from "../../../customization";
import {
	B2cPersonDetailsFormSchema,
	ContactInformationSchema,
	CreateOrganizationFormSchema,
	CredentialsSchema,
	CustomerDataFormSchema, DeliveryAddressSchema,
	DocumentsInformationSchema,
	MarketingConsentSchema,
	PaymentFormWrapperSchema,
	PersonalInformationSchema,
	PersonDetailsFormSchema,
	PersonSchema,
	PhoneDirectoryRegistrationSchema,
	PortInSchema,
	POSCheckoutDeliverySchema, PostalAddressSchema, RecurringTopUpSchema, RegistrationPageSchema, RegistrationSchema,
	Wind3PortInSchema,
	InstallationAddressSearchFormSchema,
	msisdnTransferFromDonorOperatorSchema,
} from "../../../schemas";

export { SchemaState } from "./schema.types";

const defaultSchemas = () => ({
	b2cPersonDetailsForm: B2cPersonDetailsFormSchema,
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
	InstallationAddressSearchForm: InstallationAddressSearchFormSchema,
	msisdnTransferFromDonorOperator: withSchemaCustomization(
		POSSchemaCustomizationPoints.MSISDN_TRANSFER,
		msisdnTransferFromDonorOperatorSchema
	),
});

export const initialState = (): Partial<SchemaState> => ({
	schemas: defaultSchemas(),
	defaultSchemas: defaultSchemas()
});
const schemaReducer = (state: Partial<SchemaState> = initialState(), action: SchemaActionPayload) => {
	const { type } = action;
	switch (type) {
		case SchemaActions.FLUX_SYNC:
			const schemas = {
				...state.schemas,
				...action.fluxState.schemas
			};

			return {
				...state,
				...action.fluxState,
				schemas
			};
		case SchemaActions.SET_VALUES:
			return {...state, ...extractValues(action.values as ConsulValues, state)};
		default:
			return state;
	}
};

export default schemaReducer;

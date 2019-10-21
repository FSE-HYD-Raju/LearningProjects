"use strict";

const B2cPersonDetailsFormSchema = require("./b2c-personDetailsForm.schema");
const ContactInformationSchema = require("./contactInformation.schema.js");
const PersonalInformationSchema = require("./personalInformation.schema.js");
const DocumentsInformationSchema = require("./documentsInformation.schema.js");
const CredentialsSchema = require("./credentials.schema");
const CustomerDataFormSchema = require("./customerDataForm.schema");
const MarketingConsentSchema = require("./marketing-consent.schema");
const PaymentFormWrapperSchema = require("./paymentFormWrapper.schema");
const PersonDetailsFormSchema = require("./personDetailsForm.schema");
const PersonSchema = require("./person.schema");
const PhoneDirectoryRegistrationSchema = require("./phoneDirectoryRegistration.schema");
const PortInSchema = require("./portIn.schema");
const Wind3PortInSchema = require("./wind3-portIn.schema");
const POSCheckoutDeliverySchema = require("./posCheckoutDelivery.schema");
const PostalAddressSchema = require("./postal-address.schema");
const RecurringTopUpSchema = require("./recurringTopUpForm.schema");
const RegistrationSchema = require("./registration.schema");
const RegistrationPageSchema = require("./registrationPage.schema");
const CreateOrganizationFormSchema = require("./createOrganizationForm.schema");
const DeliveryAddressSchema = require("./deliveryAddress.schema");
const InstallationAddressSearchFormSchema = require("./installationAddressSearchForm.schema");
const withSchema = require("./withSchema");
const SchemaUtil = require("./SchemaUtil");
import SchemaRequirementMessages from "./SchemaRequirement.messages";
import msisdnTransferFromDonorOperatorSchema from "./msisdnTransferFromDonorOperator.schema";
import SchemaInvalidityMessages from "./SchemaInvalidity.messages";
import withSchemaTS from "./withSchemaTS";

export {
	B2cPersonDetailsFormSchema,
	ContactInformationSchema,
	PersonalInformationSchema,
	DocumentsInformationSchema,
	CredentialsSchema,
	CustomerDataFormSchema,
	MarketingConsentSchema,
	PaymentFormWrapperSchema,
	PersonDetailsFormSchema,
	PersonSchema,
	PhoneDirectoryRegistrationSchema,
	PortInSchema,
	Wind3PortInSchema,
	POSCheckoutDeliverySchema,
	PostalAddressSchema,
	RecurringTopUpSchema,
	RegistrationPageSchema,
	RegistrationSchema,
	CreateOrganizationFormSchema,
	DeliveryAddressSchema,
	InstallationAddressSearchFormSchema,
	withSchema,
	SchemaUtil,
	SchemaRequirementMessages,
	SchemaInvalidityMessages,
	msisdnTransferFromDonorOperatorSchema,
	withSchemaTS
};

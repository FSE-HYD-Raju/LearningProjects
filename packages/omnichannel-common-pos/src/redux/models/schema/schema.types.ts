"use strict";

type SchemaValidationOptions = {
	strict?: boolean;
	abortEarly?: boolean;
	stripUnknown?: boolean;
	recursive?: boolean;
	context?: object;
};

type SchemaItem = {
	title: string;
	type: string;
	properties: Record<string, any>;
	fields: Record<string, SchemaItem>;
	$schema: string;
	validate: (model: any, options?: SchemaValidationOptions) => Promise<any>;
    isValid: (model: any) => Promise<any>;
};

type SchemasType = {
	b2cPersonDetailsForm: SchemaItem;
	ContactInformation: SchemaItem;
	PersonalInformation: SchemaItem;
	credentials: SchemaItem;
	customerDataForm: SchemaItem;
	marketingConsent: SchemaItem;
	paymentFormWrapper: SchemaItem;
	personDetailsForm: SchemaItem;
	person: SchemaItem;
	phoneDirectoryRegistration: SchemaItem;
	portIn: SchemaItem;
	wind3PortIn: SchemaItem;
	posCheckoutDelivery: SchemaItem;
	postalAddress: SchemaItem;
	recurringTopUpForm: SchemaItem;
	registration: SchemaItem;
};

type SchemaState = {
	defaultSchemas: SchemasType;
	schemas: SchemasType;
};

interface SchemaErrorMessage {
	type: string;
	message: string;
}

type PersonDetailsFormModel = {
	city: string,
	mobileNumber: string,
	email: string,
	country: string,
	postalCode: string,
	street: string,
	firstName: string,
	lastName: string,
	gender: string,
	birthDay: string
};

type StringSchema = {
	tests: Array<Function>;
	transforms: Array<Function>;
};

type ObjectSchema = StringSchema & {
	fields: Record<string, StringSchema>;
	_nodes: Array<string>;
};

export {
	SchemaErrorMessage,
	SchemaItem,
	SchemaState,
	SchemaValidationOptions,
	SchemasType,
	PersonDetailsFormModel,
	ObjectSchema,
	StringSchema
};

import {
	PhoneNumber,
	PostalAddress,
	PrivacySettings,
	Identification,
	HasId,
	EmailAddress,
	Gender,
	CustomerAccount,
} from "../../types";

export type Customer = CustomerAttributes & HasId & {
	type?: string;
	links?: Record<string, string>;
	attributes?: CustomerAttributes;
	customerAccounts?: Array<CustomerAccount>;
};

export interface CustomerAttributes {
	additionalName?: string;
	addresses?: string;
	avatar?: string;
	billingAccountId?: string;
	birthDay?: string;
	characteristics?: object;
	countryOfBirth?: string;
	customerAccountId: string;
	emails: Array<EmailAddress>;
	firstName: string;
	fixedLineNumbers: Array<PhoneNumber>;
	formattedName: string;
	gender: Gender;
	identifications?: Array<Identification>;
	lastName: string;
	maritalStatus?: string;
	mobileNumbers: Array<PhoneNumber>;
	postalAddresses: Array<PostalAddress>;
	privacySettings?: PrivacySettings;
}

export interface CustomerBase {
	firstName: string;
	lastName: string;
	street: string;
	postalCode: string;
	city: string;
	country: string;
	gender: string;
}

export interface Phone {
	id: string;
	number: string;
}

export interface Email {
	id: string;
	email: string;
}

export interface CreatedCustomer extends CustomerBase {
	email: Email;
	phone: Phone;
}

export interface NewCustomer extends CustomerBase {
	additionalName: string;
	lastName2: string;
	email: string;
	nationality: string;
	phone: string;
	identificationId: string;
	identificationIssuingDate?: Date;
	identificationExpiryDate?: Date;
	identificationIssuingAuthorityCity: string;
	identificationLifecycleStatus: string;
	identificationType: string;
	marketingOwnPartyMarketing: boolean;
	marketingOwnPartyMarketingSms: boolean;
	marketingOwnPartyMarketingEmail: boolean;
	marketingOwnPartyMarketingLetter: boolean;
	marketingOwnPartyMarketingTelemarketing: boolean;
}

export interface CustomerState {
	singleTerm: string;
	singleTermCustomers: Array<Customer>;
	searchTerms: string[];
	matchForIdTypeAndNumber: Array<Customer>;
	customerIdValidationError: string;
	customerToCreate: NewCustomer;
	createdCustomer: CreatedCustomer;
	customerIdValidationStatus: boolean;
	customerIdValidationStatusForNamesField: boolean;
	searchingForSingleCustomer?: boolean;
	customerCreated: boolean;
	forceUpdateAddress: boolean;
	validationServiceDown: boolean;
	searchActive: boolean;
	goToComms: boolean;
	newCustomer?: unknown;
	customers?: Array<Customer>;
	activeCustomerAccount?: CustomerAccount;
}

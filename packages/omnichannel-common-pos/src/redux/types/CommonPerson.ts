import { EmailAddress, PhoneNumber, PostalAddress, Identification, PersonToPersonRelationship, HasId } from "./index";

type PrivacySettingItem = "third-party-marketing" | "third-party-marketing-sms" | "third-party-marketing-email"
	| "own-marketing" | "own-marketing-sms" | "own-marketing-email";
type PrivacySettings = Record<PrivacySettingItem, boolean>;

// TODO: merge this with type from user.types in redux folder
interface CommonPerson extends HasId {
	individualId?: string;
	avatar?: string;
	customerAccountId?: string;
	billingAccountId?: string;
	firstName: string;
	lastName: string;
	formattedName?: string;
	birthDay: string;
	placeOfBirth: string;
	honorificSuffix?: string;
	nationality: string;
	countryOfBirth: string;
	emails?: Array<EmailAddress>;
	mobileNumbers?: Array<PhoneNumber>;
	fixedLineNumbers?: Array<PhoneNumber>;
	postalAddresses?: Array<PostalAddress>;
	identifications?: Array<Identification>;
	honorificPrefix?: string;
	additionalName?: string;
	gender?: string;
	maritalStatus?: string;
	language?: string;
	characteristics?: Record<string, string>;
	privacySettings?: PrivacySettings;
	personRelationships?: Array<PersonToPersonRelationship>;
}

export {
	CommonPerson,
	PrivacySettingItem,
	PrivacySettings
};

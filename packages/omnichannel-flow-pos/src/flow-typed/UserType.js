/* eslint no-undef: 0 */
declare type UserType = {
	roles: Array<{
		name: string
	}>,
	id: string,
	individualId: ?string,
	customerAccountId: ?string,
	firstName: string,
	lastName: string,
	email: string,
	password: ?string,
	created: ?string,
	modified: ?string,
	locale: ?string,
	attributes: {
		lastName: string,
		birthDay: string,
		placeOfBirth: string,
		characteristics: {
			interests: string
		},
		mobileNumbers: Array<PhoneNumberType>,
		gender: "male" | "female" | "other",
		fixedLineNumbers?: Array<PhoneNumberType>,
		formattedName: string,
		honorificPrefix: string,
		language: string,
		avatar: string,
		privacySettings: {
			"third-party-marketing": boolean,
			"third-party-marketing-sms": boolean,
			"third-party-marketing-email": boolean,
			"own-marketing": boolean,
			"own-marketing-sms": boolean,
			"own-marketing-email": boolean
		},
		postalAddresses: Array<PostalAddressType>,
		identifications: Array<IdentificationType>,
		emails: Array<EmailType>,
		firstName: string,
		honorificSuffix: ?string,
		customerAccountId: string,
		nationality: string,
		countryOfBirth: string,
		personRelationShips: Array<{
			role: string,
			type: string,
			direction: string,
			relatedPersonId: string
		}>,
		addionalName: string,
		maritalStatus: string
	}
};

declare type IdentificationType = {
	id: string,
	identificationId: string,
	type: string
};

export { UserType };

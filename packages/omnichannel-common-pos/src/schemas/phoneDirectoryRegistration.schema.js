const phoneDirectoryRegistrationSchema = {
	$schema: "http://json-schema.org/draft-04/schema#",
	title: "phoneDirectoryRegistration",
	type: "object",
	properties: {
		titleOrSpecialization: {
			type: "string",
			required: false,
			nullable: false
		},
		professionOrDepartment: {
			type: "string",
			required: false,
			nullable: false
		},
		street: {
			type: "string",
			required: false,
			nullable: false
		},
		postal_code: {
			type: "string",
			required: false,
			nullable: false
		},
		city: {
			type: "string",
			required: false,
			nullable: false
		},
		stateOrProvince: {
			type: "string",
			required: false,
			nullable: false
		},
		publishShortenedName: {
			type: "boolean",
			required: true,
			nullable: false
		},
		postalAdvertising: {
			type: "boolean",
			required: true,
			nullable: false
		},
		searchByPhoneNumberOnly: {
			type: "boolean",
			required: true,
			nullable: false
		},
		onlineListingOnly: {
			type: "boolean",
			required: true,
			nullable: false
		}
	}
};

export default phoneDirectoryRegistrationSchema;

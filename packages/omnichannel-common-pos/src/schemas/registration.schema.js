const registrationSchema = {
	$schema: "http://json-schema.org/draft-04/schema#",
	title: "registration",
	type: "object",
	properties: {
		firstName: {
			type: "string",
			required: true,
			editable: true
		},
		lastName: {
			type: "string",
			required: true,
			editable: true
		},
		gender: {
			type: "string",
			required: true,
			editable: true
		},
		birthDay: {
			type: "date",
			nullable: true,
			required: false,
			editable: true
		},
		language: {
			type: "string",
			required: true,
			editable: true
		},
		email: {
			type: "string",
			required: true,
			editable: true
		},
		mobileNumber: {
			type: "string",
			required: true,
			editable: true
		},
		fixedLineNumber: {
			type: "string",
			required: true,
			editable: true
		},
		street: {
			type: "string",
			required: true
		},
		coAddress: {
			type: "string",
			required: false
		},
		postalCode: {
			type: "string",
			required: true
		},
		city: {
			type: "string",
			required: true
		},
		country: {
			type: "string",
			required: true
		}
	}
};

export default registrationSchema;

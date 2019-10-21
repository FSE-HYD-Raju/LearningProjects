const personSchema = {
	$schema: "http://json-schema.org/draft-04/schema#",
	title: "person",
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
		language: {
			type: "string",
			required: true,
			editable: true
		},
		birthDay: {
			type: "date",
			nullable: true,
			required: true,
			editable: true,
			validation: {
				max: "now"
			}
		},
		countryOfBirth: {
			type: "string",
			required: true,
			editable: true
		},
		passportNumber: {
			type: "string",
			required: true,
			editable: true
		},
		passportExpiryDate: {
			type: "string",
			required: true,
			editable: true
		},
		maritalStatus: {
			type: "string",
			required: false,
			editable: true,
			validation: {
				enum: ["single", "married", "divorced", "widowed", "cohabiting"]
			}
		},
		email: {
			type: "string",
			required: true,
			editable: true,
			validation: {
				regexp: "/.+\\@.+\\..+/"
			}
		},
		phone: {
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
		privacy1: {
			type: "boolean",
			editable: true
		},
		privacy2: {
			type: "boolean",
			editable: true
		}
	}
};

export default personSchema;

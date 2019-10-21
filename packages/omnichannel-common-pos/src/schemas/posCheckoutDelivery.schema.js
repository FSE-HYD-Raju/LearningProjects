const posCheckoutDeliverySchema = {
	$schema: "http://json-schema.org/draft-04/schema#",
	title: "posCheckoutDelivery",
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
			editable: true
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
			type: "date",
			required: false,
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

export default posCheckoutDeliverySchema;

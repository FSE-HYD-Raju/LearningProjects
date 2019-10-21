const registrationModal = {
	$schema: "http://json-schema.org/draft-04/schema#",
	title: "registrationModal",
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
		email: {
			type: "string",
			required: true,
			editable: true,
			validation: {
				email: true
			}
		},
		street: {
			type: "string",
			required: true
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
		},
		termsAndConditions: {
			type: "boolean",
			required: true
		}
	}
};

export default registrationModal;

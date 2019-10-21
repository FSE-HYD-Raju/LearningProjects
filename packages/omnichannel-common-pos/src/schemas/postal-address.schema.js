const postalAddressSchema = {
	$schema: "http://json-schema.org/draft-04/schema#",
	title: "postal-address",
	type: "object",
	properties: {
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

export default postalAddressSchema;

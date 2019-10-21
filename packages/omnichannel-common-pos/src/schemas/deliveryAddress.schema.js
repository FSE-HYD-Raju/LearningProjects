const deliveryAddress = {
	$schema: "http://json-schema.org/draft-04/schema#",
	title: "deliveryAddress",
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
		},
		stateOrProvince: {
			type: "string",
			required: false
		},
		description: {
			type: "string",
			required: false
		}
	}
};

export default deliveryAddress;

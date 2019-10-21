const InstallationAddressSearchForm = {
	$schema: "http://json-schema.org/draft-04/schema#",
	title: "InstallationAddressSearchForm",
	type: "object",
	properties: {
		street: {
			type: "string",
			required: true,
			editable: true
		},
		coAddress: {
			type: "string",
			required: false,
			editable: true
		},
		postalCode: {
			type: "string",
			required: false,
			editable: true
		},
		city: {
			type: "string",
			required: false,
			editable: true
		},
		country: {
			type: "string",
			required: false,
			editable: true
		},
		county: {
			type: "string",
			required: false,
			editable: true
		},
		description: {
			type: "string",
			required: false,
			editable: true
		},
		postOfficeBox: {
			type: "string",
			required: false,
			editable: true
		},
		stateOrProvince: {
			type: "string",
			required: false,
			editable: true
		},
		addressRegisterId: {
			type: "string",
			required: false,
			editable: true
		},
		apartment: {
			type: "string",
			required: false,
			editable: true
		},
		building: {
			type: "string",
			required: false,
			editable: true
		}
	}
};

export default InstallationAddressSearchForm;
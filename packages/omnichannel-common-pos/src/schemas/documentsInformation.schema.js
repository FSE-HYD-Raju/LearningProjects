const DocumentsInformation = {
	$schema: "http://json-schema.org/draft-04/schema#",
	title: "DocumentsInformation",
	type: "object",
	properties: {
		identificationType: {
			type: "string",
			required: true
		},
		identificationId: {
			type: "string",
			required: true
		},
		identificationIssuingAuthority: {
			type: "string",
			required: true
		},
		identificationIssuingAuthorityCountry: {
			type: "string",
			required: false
		},
		identificationIssuingDate: {
			type: "date",
			required: true,
			editable: false,
			nullable: true
		},
		identificationExpiryDate: {
			type: "date",
			required: false,
			editable: false,
			nullable: true
		}
	}
};

export default DocumentsInformation;

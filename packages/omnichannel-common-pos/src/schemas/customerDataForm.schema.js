const customerDataFormSchema = {
	$schema: "http://json-schema.org/draft-04/schema#",
	title: "customerDataForm",
	type: "object",
	properties: {
		firstName: {
			type: "string",
			required: true,
			editable: true
		},
		additionalName: {
			type: "string",
			required: false,
			editable: true
		},
		lastName: {
			type: "string",
			required: true,
			editable: true
		},
		lastName2: {
			type: "string",
			required: false,
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
		nationality: {
			type: "string",
			required: false,
			editable: true,
		},
		mobileNumber: {
			type: "string",
			required: true,
			editable: true,
			validation: {
				phone: true
			}
		},
		fixedLineNumber: {
			type: "string",
			required: true,
			editable: true,
			validation: {
				phone: true
			}
		},
		gender: {
			type: "string",
			required: true,
			editable: true
		},
		birthDay: {
			type: "date",
			required: true,
			editable: false,
			nullable: true
		},
		identificationType: {
			type: "string",
			required: true,
			editable: true
		},
		identificationId: {
			type: "string",
			required: true,
			editable: true
		},
		identificationIssuingAuthority: {
			type: "string",
			required: true,
			editable: true
		},
		identificationIssuingAuthorityCity: {
			type: "string",
			required: false,
			editable: true
		},
		identificationIssuingDate: {
			type: "date",
			required: false,
			editable: false,
			nullable: true
		},
		identificationExpiryDate: {
			type: "date",
			required: false,
			editable: false,
			nullable: true
		},
		street: {
			type: "string",
			required: true
		},
		addressDetails: {
			type: "string",
			required: false
		},
		coAddress: {
			type: "string",
			required: false
		},
		postalCode: {
			type: "string",
			required: true
		},
		province: {
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
		building: {
			type: "string",
			required: false
		},
		apartment: {
			type: "string",
			required: false
		},
		marketingOwnPartyMarketing: {
			type: "boolean",
			required: false
		},
		marketingOwnPartyMarketingSms: {
			type: "boolean",
			required: false
		},
		marketingOwnPartyMarketingEmail: {
			type: "boolean",
			required: false
		},
		marketingOwnPartyMarketingLetter: {
			type: "boolean",
			required: false
		},
		marketingOwnPartyMarketingTelemarketing: {
			type: "boolean",
			required: false
		}
	}
};

export default customerDataFormSchema;

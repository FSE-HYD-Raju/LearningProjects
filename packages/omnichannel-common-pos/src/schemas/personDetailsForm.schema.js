const personDetailsForm = {
	$schema: "http://json-schema.org/draft-04/schema#",
	title: "personDetailsForm",
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
		birthDay: {
			type: "date",
			required: false,
			nullable: true,
			editable: true,
			validation: {
				length: {
					max: "now"
				}
			}
		},
		gender: {
			type: "string",
			required: true,
			editable: true
		},
		mobileNumber: {
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
		description: {
			type: "string",
			required: false,
			nullable: true
		},
		postalCode: {
			type: "string",
			required: true
		},
		city: {
			type: "string",
			required: true
		},
		stateOrProvince: {
			type: "string",
			required: true
		},
		country: {
			type: "string",
			required: true
		},
		identificationType: {
			type: "string",
			required: false
		},
		identificationId: {
			type: "string",
			required: false
		},
		identificationIssuingAuthority: {
			type: "string",
			required: false
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

export default personDetailsForm;

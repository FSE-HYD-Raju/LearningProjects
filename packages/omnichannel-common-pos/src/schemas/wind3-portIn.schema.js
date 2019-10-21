const portIn = {
	$schema: "http://json-schema.org/draft-04/schema#",
	title: "portIn",
	type: "object",
	properties: {
		MSISDN: {
			type: "string",
			required: true,
			nullable: false,
			validation: {
				phone: true,
				msisdn: true
			}
		},
		operatorId: {
			type: "string",
			required: true,
			nullable: false
		},
		previousContractType: {
			type: "string",
			required: true,
			nullable: false,
			validation: {
				enum: ["prepaid", "postpaid"]
			}
		},
		iccid: {
			type: "string",
			required: true,
			nullable: false,
			validation: {
				regexp: "^8939[a-zA-Z0-9]{15,16}$"
			}
		}
	}
};

export default portIn;

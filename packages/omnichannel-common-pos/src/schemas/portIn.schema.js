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
		transferCredit: {
			type: "boolean",
			required: false,
			nullable: true
		}
	}
};

export default portIn;

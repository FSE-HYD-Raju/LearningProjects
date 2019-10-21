const msisdnTransferFromDonorOperatorSchema: any = {
	$schema: "http://json-schema.org/draft-04/schema#",
	title: "msisdnTransferFromDonorOperator",
	type: "object",
	properties: {
		msisdn: {
			type: "string",
				required: true,
				nullable: false,
				validation: {
					phone: true,
					msisdn: true
			}
		}
	}
};

export default msisdnTransferFromDonorOperatorSchema;

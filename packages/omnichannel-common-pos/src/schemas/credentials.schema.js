const credentialsSchema = {
	$schema: "http://json-schema.org/draft-04/schema#",
	title: "credentials",
	type: "object",
	properties: {
		email: {
			type: "string",
			required: true,
			editable: true,
			validation: {
				email: true
			}
		},
		password: {
			type: "string",
			required: true,
			editable: true,
			validation: {
				length: {
					min: 8
				}
			}
		}
	}
};

export default credentialsSchema;

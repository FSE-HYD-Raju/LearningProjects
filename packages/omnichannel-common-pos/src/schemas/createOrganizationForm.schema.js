const createOrganizationFormSchema = {
	$schema: "http://json-schema.org/draft-04/schema#",
	title: "createOrganizationForm",
	type: "object",
	properties: {
		idType: {
			type: "string",
			required: true,
			editable: true
		},
		idNumber: {
			type: "string",
			required: true,
			editable: true
		},
		companyName: {
			type: "string",
			required: true,
			editable: true
		}
	}
};

export default createOrganizationFormSchema;

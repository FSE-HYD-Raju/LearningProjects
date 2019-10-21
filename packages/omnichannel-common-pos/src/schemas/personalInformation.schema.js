const PersonalInformation = {
	$schema: "http://json-schema.org/draft-04/schema#",
	title: "PersonalInformation",
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
			editable: true
		},
		gender: {
			type: "string",
			required: true,
			editable: true
		}
	}
};

export default PersonalInformation;
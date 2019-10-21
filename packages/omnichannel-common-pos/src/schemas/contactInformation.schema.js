const ContactInformation = {
	$schema: "http://json-schema.org/draft-04/schema#",
	title: "ContactInformation",
	type: "object",
	properties: {
		mobileNumber: {
			type: "string",
			required: true,
			editable: true,
			validation: {
				regex: "^$|^(\\+?)([0-9 ]+)$"
			}
		},
		email: {
			type: "string",
			required: true,
			editable: true,
			validation: {
				email: true
			}
		}
	}
};

export default ContactInformation;

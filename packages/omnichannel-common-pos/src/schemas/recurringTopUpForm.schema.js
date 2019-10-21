const recurringTopUpForm = {
	$schema: "http://json-schema.org/draft-04/schema#",
	title: "recurringTopUpForm",
	type: "object",
	properties: {
		recurringTopUp: {
			type: "string",
			required: true,
			nullable: false
		},
		thresholdValue: {
			type: "number",
			editable: true,
			validation: {
				number: true,
				min: 0
			}
		},
		topUpAmount: {
			type: "number",
			editable: true,
			validation: {
				number: true,
				min: 0
			}
		},
		limitInMonth: {
			type: "number",
			editable: true,
			validation: {
				number: true,
				min: 0
			}
		},
		topUpAmountWeekly: {
			type: "number",
			editable: true,
			validation: {
				number: true,
				min: 0
			}
		}
	}
};

export default recurringTopUpForm;

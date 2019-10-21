enum ValueRegulatorEnum {
	SELECTION = "SELECTION",
	CAN_BE_PERSONALIZED = "CAN_BE_PERSONALIZED",
	MUST_BE_PERSONALIZED = "MUST_BE_PERSONALIZED",
	NO_PERSONALIZATION = "NO_PERSONALIZATION"
}

type ValueRegulator = keyof typeof ValueRegulatorEnum;

export {
	ValueRegulator,
	ValueRegulatorEnum
};

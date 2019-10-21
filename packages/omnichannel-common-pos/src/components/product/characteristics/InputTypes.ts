enum InputTypesEnum {
	DATE = "date",
	TIME = "time",
	DATE_TIME = "date-time",
	DATE_TIME_PERIOD = "date-time-period",
	TIME_OF_THE_DAY_PERIOD = "time-of-the-day-period",
	DROPDOWN = "dropdown",
	RADIO = "radio",
	TEXT = "text",
}

type InputTypes = keyof typeof InputTypesEnum;
export {
	InputTypesEnum,
	InputTypes,
};

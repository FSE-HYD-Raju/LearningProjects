import { InputTypesEnum } from "./InputTypes";

class CharacteristicsDateUtil {
	static getDateISOstring = (date?: Date) => {
		const isoString = date && date.toISOString ? date.toISOString() : "";
		return isoString;
	};

	static formattedDateTimePeriod = (stateStartDate: Date, stateEndDate?: Date) => {
		const startDate = CharacteristicsDateUtil.getDateISOstring(stateStartDate);
		const endDate = CharacteristicsDateUtil.getDateISOstring(stateEndDate);
		return `from ${startDate} to ${endDate}`;
	};

	static formattedTimeOfDayPeriod = (stateStartDate: Date, stateEndDate?: Date) => {
		const startDate = CharacteristicsDateUtil.getDateISOstring(stateStartDate);
		const endDate = CharacteristicsDateUtil.getDateISOstring(stateEndDate);
		const startTime = CharacteristicsDateUtil.getTimePart(startDate);
		const endTime = CharacteristicsDateUtil.getTimePart(endDate);
		return `from ${startTime} to ${endTime}`;
	};

	static getFormattedDateTime = (inputType: string | undefined, stateStartDate: Date, stateEndDate?: Date) => {
		const isoString = CharacteristicsDateUtil.getDateISOstring(stateStartDate);

		switch (inputType) {
			case InputTypesEnum.DATE:
				return CharacteristicsDateUtil.getDatePart(isoString);
			case InputTypesEnum.TIME:
				return CharacteristicsDateUtil.getTimePart(isoString);
			case InputTypesEnum.DATE_TIME:
				return isoString;
			case InputTypesEnum.DATE_TIME_PERIOD:
				return CharacteristicsDateUtil.formattedDateTimePeriod(stateStartDate, stateEndDate);
			case InputTypesEnum.TIME_OF_THE_DAY_PERIOD:
				return CharacteristicsDateUtil.formattedTimeOfDayPeriod(stateStartDate, stateEndDate);
			default:
				return isoString;
		}
	};

	static getDatePart = (isoString: string) => {
		const formattedDateTime = isoString.split("T")[0];
		return formattedDateTime;
	};

	static getTimePart = (isoString: string) => {
		const formattedDateTime = isoString.split("T")[1];
		return formattedDateTime;
	};

	static enableCalendar = (inputType?: string) => {
		return (
			inputType === InputTypesEnum.DATE ||
			inputType === InputTypesEnum.DATE_TIME ||
			inputType === InputTypesEnum.DATE_TIME_PERIOD
		);
	};

	static withClock = (inputType?: string) => {
		return (
			inputType === InputTypesEnum.TIME ||
			inputType === InputTypesEnum.DATE_TIME ||
			inputType === InputTypesEnum.TIME_OF_THE_DAY_PERIOD ||
			inputType === InputTypesEnum.DATE_TIME_PERIOD
		);
	};

	static isDateTimePeriod = (inputType?: string) => {
		return (
			inputType === InputTypesEnum.DATE_TIME_PERIOD ||
			inputType === InputTypesEnum.TIME_OF_THE_DAY_PERIOD
		);
	};
}

export default CharacteristicsDateUtil;

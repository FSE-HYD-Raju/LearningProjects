import { UnitOfMeasureEnum } from "../redux/types";

const moment = require("moment");
const momentDurationFormatSetup = require("moment-duration-format");
momentDurationFormatSetup(moment);

const DefaultFormat = "h [hr] m [min] s [sec]";

const format = (amount: number, unitOfMeasure: UnitOfMeasureEnum, template: string = DefaultFormat): string => {
	let durationUnits;
	switch (unitOfMeasure) {
		case UnitOfMeasureEnum.SECONDS:
			durationUnits = "seconds";
			break;
		case UnitOfMeasureEnum.MINUTES:
			durationUnits = "minutes";
			break;
		case UnitOfMeasureEnum.DAYS:
			durationUnits = "days";
			break;
		case UnitOfMeasureEnum.HOURS:
			durationUnits = "hours";
			break;
		case UnitOfMeasureEnum.WEEKS:
			durationUnits = "weeks";
			break;
		case UnitOfMeasureEnum.MONTHS:
			durationUnits = "months";
			break;
		default:
			throw new Error(`Unexpected unit of measure ${unitOfMeasure} for duration`);
	}

	return moment.duration(amount, durationUnits).format(template);
};

class DurationUtil {
	static format = format;
}

export {
	DurationUtil
};

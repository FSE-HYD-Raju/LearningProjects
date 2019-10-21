const moment = require("moment");
require("twix"); // https://momentjs.com/docs/#/plugins/twix/

/**
 * Returns date range in nice format, for ex:
 * ("2019-06-06T15:56:27.999+05:30", "2019-06-07T15:56:27.999+05:30") --> Jun 6, 3:56 PM - Jun 7, 3:56 PM
 * ("2019-06-06T15:56:27.999+05:30", "2020-06-07T15:56:27.999+05:30") --> Jun 6, 2019, 3:56 PM - Jun 7, 2020, 3:56 PM
 * ("2019-06-06T15:56:27.999+05:30", "2019-06-06T15:57:27.999+05:30") --> Jun 6, 3:56 - 3:57 PM
 * ("2019-06-06T02:56:27.999+05:30", "2019-06-06T15:57:27.999+05:30") --> Jun 6, 2:56 AM - 3:57 PM
 * ("2019-06-06T02:56:27.999+05:30", "2019-06-06T02:56:27.999+05:30") --> ""
 * @param startDateTime
 * @param endDateTime 
 */
const format = (startDateTime: string, endDateTime: string): string => {
	return moment(startDateTime).twix(endDateTime).format();
};

class DateRangeUtil {
	static format = format;
}

export {
	DateRangeUtil
};

import * as moment from "moment";

class DateUtil {
	static dateWithTimezoneOffset = (date?: Date) => {
		if (!date) {
			return date;
		}

		return moment(date).add(moment(date).utcOffset(), "minutes").toDate();
	}
};

export default DateUtil;

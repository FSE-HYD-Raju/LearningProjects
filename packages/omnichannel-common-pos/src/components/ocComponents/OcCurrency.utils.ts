import { OcCurrencyMessagesType } from "./OcCurrency.messages";
import { IntervalType } from "../../redux/types/BillingInterval";
import { OcCurrencyShortIntervalNameMessagesType } from "./OcCurrencyShortIntervalName.messages";
import { FormattedMessageDescriptor } from "../../channelUtils/FormattedMessage";

type MessageMap = Record<IntervalType, FormattedMessageDescriptor>;

function getIntervalsMessageMap(msg: OcCurrencyMessagesType | OcCurrencyShortIntervalNameMessagesType): MessageMap {
	return {
		HOUR: msg.recurringIntervalHour,
		DAY: msg.recurringIntervalDay,
		WEEK: msg.recurringIntervalWeek,
		HALF_MONTH: msg.recurringIntervalHalfMonth,
		MONTH: msg.recurringIntervalMonth,
		QUARTER: msg.recurringIntervalQuarter,
		HALF_YEAR: msg.recurringIntervalHalfYear,
		YEAR: msg.recurringIntervalYear
	};
}

export { getIntervalsMessageMap, MessageMap };

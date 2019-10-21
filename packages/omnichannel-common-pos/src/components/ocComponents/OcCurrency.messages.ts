/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface OcCurrencyMessagesType {
	intervalSeparator: FormattedMessage.MessageDescriptor;
	noPrice: FormattedMessage.MessageDescriptor;
	recurringIntervalDay: FormattedMessage.MessageDescriptor;
	recurringIntervalDefault: FormattedMessage.MessageDescriptor;
	recurringIntervalHalfMonth: FormattedMessage.MessageDescriptor;
	recurringIntervalHalfYear: FormattedMessage.MessageDescriptor;
	recurringIntervalHour: FormattedMessage.MessageDescriptor;
	recurringIntervalMonth: FormattedMessage.MessageDescriptor;
	recurringIntervalQuarter: FormattedMessage.MessageDescriptor;
	recurringIntervalWeek: FormattedMessage.MessageDescriptor;
	recurringIntervalYear: FormattedMessage.MessageDescriptor;
}
const OcCurrencyMessages: OcCurrencyMessagesType = defineMessages({
	intervalSeparator: {
		id: "ocCurrency-interval-separator",
		description: "ocCurrency-interval-separator",
		defaultMessage: "/"
	},
	noPrice: {
		id: "ocCurrency-no-price-available",
		description: "ocCurrency-no-price-available",
		defaultMessage: "-"
	},
	recurringIntervalDay: {
		id: "ocCurrency-full-recurring-interval-day",
		description: "ocCurrency recurring interval day",
		defaultMessage: "day"
	},
	recurringIntervalDefault: {
		id: "ocCurrency-recurring-interval-default",
		description: "ocCurrency default (not defined) recurring interval",
		defaultMessage: "{value}"
	},
	recurringIntervalHalfMonth: {
		id: "ocCurrency-full-recurring-interval-half-month",
		description: "ocCurrency recurring interval half-month",
		defaultMessage: "half-month"
	},
	recurringIntervalHalfYear: {
		id: "ocCurrency-full-recurring-interval-half-year",
		description: "ocCurrency recurring interval half-year",
		defaultMessage: "half-year"
	},
	recurringIntervalHour: {
		id: "ocCurrency-full-recurring-interval-hour",
		description: "ocCurrency recurring interval hour",
		defaultMessage: "hour"
	},
	recurringIntervalMonth: {
		id: "ocCurrency-full-recurring-interval-month",
		description: "ocCurrency recurring interval month",
		defaultMessage: "month"
	},
	recurringIntervalQuarter: {
		id: "ocCurrency-full-recurring-interval-quarter",
		description: "ocCurrency recurring interval quarter",
		defaultMessage: "quarter"
	},
	recurringIntervalWeek: {
		id: "ocCurrency-full-recurring-interval-week",
		description: "ocCurrency recurring interval week",
		defaultMessage: "week"
	},
	recurringIntervalYear: {
		id: "ocCurrency-full-recurring-interval-year",
		description: "ocCurrency recurring interval year",
		defaultMessage: "year"
	},
});

export default OcCurrencyMessages;
export { OcCurrencyMessages, OcCurrencyMessagesType };

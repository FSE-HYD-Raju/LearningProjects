"use strict";

import * as moment from "moment";
import { Moment } from "moment";
import UnitOfTimeMessages from "./UnitOfTime.messages";

interface TimeConfig  {
	DATE: string;
	TIME: string;
	TIME_SECONDS: string;
}

declare global {
	interface Window { dateConfig: TimeConfig; }
}

export const DEFAULT_DATE_TIME_CONFIG: TimeConfig =  { DATE: "DD/MM/YYYY", TIME: "HH:mm", TIME_SECONDS: "HH:mm:ss" };

const FORMAT = {
	YEAR: "YYYY",
	DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
	DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
	MONTH: "YYYY-MM",
	TIME_MS: "HH:mm:ss.SSS",
	WEEK: "YYYY-[W]WW",
	DAY: "dddd",
	LTS: "LTS",
	LT: "LT",
	L: "L",
	LL: "LL",
	LLL: "LLL",
	LLLL: "LLLL",
	l: "l",
	ll: "ll",
	lll: "lll",
	llll: "llll",
};

const PERIOD = {
	HOUR: UnitOfTimeMessages.HOUR,
	HOURS: UnitOfTimeMessages.HOURS,
	DAY: UnitOfTimeMessages.DAY,
	DAYS: UnitOfTimeMessages.DAYS,
	WEEK: UnitOfTimeMessages.WEEK,
	WEEKS: UnitOfTimeMessages.WEEKS,
	MONTH: UnitOfTimeMessages.MONTH,
	MONTHS: UnitOfTimeMessages.MONTHS,
	YEAR: UnitOfTimeMessages.YEAR,
	YEARS: UnitOfTimeMessages.YEARS,
};

export type TimeType = Moment|Date|number|string;

const isValid = (date: any): boolean => moment(date).isValid();

/**
 * @param {TimeType} date
 * @param {string} format 	// DD.MM.YYYY HH:mm
 * @returns {string} 		// "03.10.2018 12:00"
 */
const formatTime = (date: TimeType, format: string): string => moment.isMoment(date) ? date.format(format) : moment(date).format(format);

/**
 * @param {TimeType} date
 * @returns {string} 		// 2018-10-03T09:00:49.667Z
 */
const toISO = (date: TimeType): string => moment.isMoment(date) ? date.toISOString() : moment(date).toISOString();

const COMMON_FORMATS: Array<string> = [
	"YYYY-MM-DD",
	"DD-MM-YYYY",
	"DD/MM/YYYY",
	"YYYY/MM/DD",
	"DD.MM.YYYY"
];

export default class Time {
	// use DEFAULT_DATE_TIME_CONFIG in case if config is not loaded from consul but script already loaded, need to prevent script load fail
	static dateConfig = (): TimeConfig => {
		return window.dateConfig ? window.dateConfig : DEFAULT_DATE_TIME_CONFIG;
	};
	static formatDate = (date: TimeType) => formatTime(date, Time.dateConfig().DATE);
	static formatDateTimeHourMin = (date: TimeType) => formatTime(date, `${Time.dateConfig().DATE} ${Time.dateConfig().TIME}`);
	static formatDateTimeHourMinSec = (date: TimeType) => formatTime(date, `${Time.dateConfig().DATE} ${Time.dateConfig().TIME_SECONDS}`);

	static parseDateFromString(inputDate?: string, stringFormat?: string): Date | undefined {
		if (!inputDate) {
			return;
		}

		if (stringFormat) {
			return moment.utc(inputDate, stringFormat).toDate();
		}

		// Then handle custom defined commonly used date formats
		const parsedDate = moment.utc(inputDate, COMMON_FORMATS);
		if (parsedDate.isValid()) {
			return parsedDate.toDate();
		}

		return;
	}

	static PERIOD = PERIOD;
	static FORMAT = FORMAT;
	static isValid = isValid;
	static format = formatTime;
	static toISO = toISO;

	static create = moment;

	private _date: Moment;

	constructor(date?: TimeType) {
		this._date = Time.create(date);
	}

	format(format: string): string {
		return formatTime(this._date, format);
	}

	toISO(): string {
		return toISO(this._date);
	}

}

export { TimeConfig };

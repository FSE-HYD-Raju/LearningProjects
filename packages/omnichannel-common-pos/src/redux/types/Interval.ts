export type IntervalEnum = {
    HOUR: "hour",
    DAY: "day",
    WEEK: "week",
    HALF_MONTH: "half-month",
    MONTH: "month",
    QUARTER: "quarter",
    HALF_YEAR: "half-year",
    YEAR: "year"
};

export type Interval = keyof IntervalEnum;

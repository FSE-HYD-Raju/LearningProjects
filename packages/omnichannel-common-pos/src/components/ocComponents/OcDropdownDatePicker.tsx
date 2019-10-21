import * as R from "react";
import * as moment from "moment";
import { get, map } from "lodash";
import { ChangeEvent } from "react";
import cssns from "../../utils/cssnsConfig";
const SchemaUtil = require("../../schemas/SchemaUtil").getInstance();

const React = cssns("OcDropdownDatePicker").React as typeof R;

interface OcDropdownDatePickerProps {
	id?: string;
	required?: boolean;
	onChange?: (date: Date) => void;
	value?: string | Date;
	minYear?: number;
	maxYear?: number;
	name?: string;
	placeholder?: string;
	meta?: any;
	locale?: string;
}

interface OcDropdownDatePickerState {
	dayList: string[];
	monthList: string[];
	selectDay: number | "";
	selectMonth: string | "";
	selectYear: number | "";
	yearList: string[];
	value: Date | null;
}

class OcDropdownDatePicker extends (React as typeof R).Component<OcDropdownDatePickerProps, OcDropdownDatePickerState> {
	static displayName = "OcDropdownDatePicker";

	constructor(props: OcDropdownDatePickerProps) {
		super(props);
		const { locale, value } = props;
		moment.locale(locale || "en");
		const maxYear = props.maxYear ? props.maxYear : new Date().getFullYear();
		const minYear = props.minYear ? props.minYear : maxYear - 100;

		function* range(start: number, end: number, step: number = 1) {
			while (end >= start) {
				yield end.toString();
				end -= step;
			}
		}

		const selectedDate = value ? new Date(value) : null;

		this.state = {
			dayList: [""].concat(Array.from(Array(31), (_, x) => (x + 1).toString())),
			monthList: [""].concat(moment.monthsShort()),
			yearList: [""].concat(Array.from(range(minYear, maxYear))),
			selectDay: selectedDate ? selectedDate.getDate() : "",
			selectMonth: selectedDate ? moment.monthsShort()[selectedDate.getMonth()] : "",
			selectYear: selectedDate ? selectedDate.getFullYear() : "",
			value: selectedDate
		};
	}

	componentWillReceiveProps(nextProps: OcDropdownDatePickerProps) {
		if (nextProps.value) {
			const { value } = nextProps;

			const valueAsDate =
				value instanceof Date ? value : moment.utc(value).toDate();

			this.setState({
				selectDay: valueAsDate.getDate(),
				selectMonth: moment.monthsShort()[valueAsDate.getMonth()],
				selectYear: valueAsDate.getFullYear(),
				value: valueAsDate // moment(valueAsDate).format("YYYY-MM-DD")
			});
		}
	}

	changeDate = (e: ChangeEvent<HTMLSelectElement>, type: string) => {
		let { selectDay, selectMonth, selectYear } = this.state;

		if (type === "selectDay") {
			selectDay = parseInt(e.target.value, 10);
		} else if (type === "selectMonth") {
			selectMonth = e.target.value;
		} else if (type === "selectYear") {
			selectYear = parseInt(e.target.value, 10);
		}

		const date = this.selectionsToDate(selectDay as number, selectMonth, selectYear as number);

		this.setState({
			selectDay,
			selectMonth,
			selectYear,
			value: date
		});

		if (date instanceof Date && this.props.onChange) {
			this.props.onChange(date);
		}
	};

	selectionsToDate(day: number | undefined, monthAbbr: string | undefined, year: number | undefined): Date | null {
		if (!day || !monthAbbr || !year) {
			return null;
		}
		const month: number = moment.monthsShort().indexOf(monthAbbr);
		if (month < 0) {
			return null;
		}
		const daysInMonth = moment
			.utc({ year, month, date: 1 })
			.daysInMonth();
		if (day > daysInMonth) {
			return null;
		}
		return moment.utc({ year, month, day }).toDate();
	}

	render() {
		const { id, name, placeholder } = this.props;
		const errorMessage = map(
			get(this.props, "meta.errors." + name),
			error => error.message
		).join(", ");

		const { dayList, monthList, selectDay, selectMonth, selectYear, yearList } = this.state;

		const required = SchemaUtil.checkRequiredFromSchemaField(this.props.meta && this.props.meta.schema) || this.props.required;

		return (
			<div className="form-group this">
				<label htmlFor={id}>
					{placeholder}
					{required && (
						<i className="fa fa-asterisk required-field-icon" />
					)}
				</label>
				<div className="picker-container form-row">
					<div className="picker-select col">
						<select
							id={id}
							className="custom-select month"
							defaultValue={selectMonth || ""}
							value={selectMonth || ""}
							onChange={e => this.changeDate(e, "selectMonth")}
						>
							{map(monthList, (month, id) => {
								return (
									<option value={month} key={id}>
										{month}
									</option>
								);
							})}
						</select>
					</div>
					<div className="picker-select col">
						<select
							className="custom-select day"
							defaultValue={selectDay.toString()}
							value={selectDay.toString()}
							onChange={e => this.changeDate(e, "selectDay")}
						>
							{map(dayList, (day, id) => {
								return (
									<option value={day} key={id}>
										{day}
									</option>
								);
							})}
						</select>
					</div>
					<div className="picker-select col">
						<select
							className="custom-select year"
							defaultValue={selectYear.toString()}
							value={selectYear.toString()}
							onChange={e => this.changeDate(e, "selectYear")}
						>
							{map(yearList, (year, id) => {
								return (
									<option value={year} key={id}>
										{year}
									</option>
								);
							})}
						</select>
					</div>
				</div>

				{errorMessage && (
					<div className="invalid-feedback">{errorMessage}</div>
				)}
			</div>
		);
	}
}

export default OcDropdownDatePicker;
export { OcDropdownDatePickerProps, OcDropdownDatePickerState };

import * as R from "react";
import cssns from "../../utils/cssnsConfig";
import { get } from "lodash";

import * as moment from "moment";
import * as classnames from "classnames";
const React = cssns("OcInput").React as typeof R;
const momentLocalizer = require("react-widgets/lib/localizers/moment");
const { DateTimePicker } = require("react-widgets");
const SchemaUtil = require("../../schemas/SchemaUtil").getInstance();

momentLocalizer(moment);

interface OcDatePickerProps {
	selectedDate: Date;
	calendar?: boolean;
	className?: string;
	defaultCurrentDate?: (date: Date) => void;
	disabled?: boolean;
	dropUp?: boolean;
	editFormat?: string;
	errorMessage?: string;
	format?: string;
	id?: string;
	label?: React.ReactNode;
	labelPosition?: "left";
	labelWidth?: string;
	max?: Date;
	meta?: any;
	min?: Date;
	name?: string;
	onChange?: (date: Date) => void;
	onSelect?: () => void;
	placeholder?: string;
	required?: boolean;
	returnEndOfDay?: boolean;
	step?: number;
	value?: Date;
	withClock?: boolean;
}
interface OcDatePickerState {
	changedSelectedDate?: Date;
}

class OcDatePicker extends (React as typeof R).Component<OcDatePickerProps, OcDatePickerState> {
	static displayName = "OcDatePicker";

	static defaultProps = {
		id: "defaultDatePickerId",
		dropUp: true,
		step: 30,
		calendar: true
	};

	constructor(props: OcDatePickerProps) {
		super(props);
		this.state = {
			changedSelectedDate: undefined,
		};
	}

	checkConstraints = (value: Date | moment.Moment): Date => {
		const date = moment(value);
		if (this.props.min) {
			const min = moment(this.props.min);
			if (min.isValid() && date.isBefore(min)) {
				return min.toDate();
			}
		}
		if (this.props.max) {
			const max = moment(this.props.max);
			if (max.isValid() && date.isAfter(max)) {
				return max.toDate();
			}
		}
		return date.toDate();
	};

	onChange = (value: Date) => {
		let newValue = value ? this.checkConstraints(value) : value;
		// return end of day if wanted
		if (this.props.returnEndOfDay) {
			newValue = moment(newValue.getTime())
				.endOf("day")
				.toDate();
		}

		this.setState({ changedSelectedDate: newValue });

		if (this.props.onChange) {
			this.props.onChange(newValue);
		}
	};

	onCurrentDateChange = (date: Date) => {
		this.setState({ changedSelectedDate: this.checkConstraints(date) });
	};

	render() {
		const { className, id, label, name, disabled, value } = this.props;
		const errors = get(this.props, ["meta", "errors"]);
		const errs = errors && errors[`${name}`];
		const errorMessage =
			(errs && errs.map((error: { message: string }) => error.message).join(", ")) ||
			this.props.errorMessage;

		const classNamesObject = {
			OcDatePicker: true,
			"label-set": !!this.props.label,
			"label-set-horizontal":
				this.props.label &&
				this.props.labelPosition &&
				this.props.labelPosition === "left",
		};

		const pickerParentDivClass = this.props.label
			? this.props.labelPosition && this.props.labelPosition === "left"
				? "label-on-left"
				: ""
			: "this";

		const datePickerStyle = this.props.label
			? { width: "100%", height: "41px" }
			: { width: "100%" };

		const required = SchemaUtil.checkRequiredFromSchemaField(this.props.meta && this.props.meta.schema) || this.props.required;

		// For some reason this components value prop is passed from some components as string instead of Date, dirty quick fix for it.
		const fixDate = (inputDate?: Date | string): Date | undefined => {
			if (!inputDate) {
				return undefined;
			}
			if (inputDate instanceof Date) {
				return this.checkConstraints(inputDate);
			}

			const newDate = moment(inputDate);
			if (newDate.isValid()) {
				return this.checkConstraints(newDate.toDate());
			}

			return undefined;
		};

		return (
			<div
				className={classnames(classNamesObject, className)}
				id={id ? id : undefined}
			>
				{label && (
					<label
						className="control-label"
						style={this.props.labelWidth ? { minWidth: this.props.labelWidth } : undefined}
					>
						{label}

						{required && (
							<i className="fa fa-asterisk required-field-icon" />
						)}
					</label>
				)}
				<div className={pickerParentDivClass}>
					{required &&
						(!label || label === null) &&
						!fixDate(value) && (
							<i className="fa fa-asterisk required-field-icon" />
						)}

					<DateTimePicker
						id={this.props.id + "_inner"}
						onSelect={this.onChange}
						onChange={this.onChange}
						time={this.props.withClock}
						step={this.props.step}
						value={fixDate(
							this.props.selectedDate ||
							this.state.changedSelectedDate ||
							value
						)}
						onCurrentDateChange={this.onCurrentDateChange}
						min={this.props.min}
						max={this.props.max}
						name={this.props.name}
						dropUp={this.props.dropUp}
						style={datePickerStyle}
						editFormat={this.props.editFormat}
						format={this.props.format || "DD.MM.YYYY"}
						placeholder={this.props.placeholder}
						defaultCurrentDate={this.props.defaultCurrentDate}
						calendar={this.props.calendar}
						disabled={!!disabled}
					/>

					{errorMessage && (
						<div className="invalid-feedback">{errorMessage}</div>
					)}
				</div>
			</div>
		);
	}
}

export default OcDatePicker;
export { OcDatePickerProps, OcDatePickerState };
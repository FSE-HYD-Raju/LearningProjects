import { PureComponent } from "react";
import Flatpickr from "react-flatpickr";
import cssns from "../../utils/cssnsConfig";
import { Instance as FlatpickrInstance } from "flatpickr/dist/types/instance";

const { React } = cssns("OcFlatDatePicker");

interface OcFlatDatePickerProps {
	onChange: (value: [Date, Date]) => void;
	date: string | [Date | string, Date | string];
	mode?: "range" | "multiple" | "single";
	label?: string;
	id?: string;
	minDate?: Date | string | number;
	maxDate?: Date | string | number;
}

class OcFlatDatePicker extends PureComponent<OcFlatDatePickerProps> {
	static displayName: string = "OcFlatDatePicker";

	onChange = (dates: Date[], dateStr: string, pickerInstance: FlatpickrInstance) => {
		const [startDate, endDate] = dates;
		this.props.onChange([startDate, endDate]);
		if (startDate && endDate) {
			pickerInstance.close();
		}
	};

	onClose = (selectedDates: Date[]) => {
		const [startDate] = selectedDates;
		if(selectedDates.length === 1) {
			this.props.onChange([startDate, startDate]);
		}
	};

	render() {
		const {id, date, label, mode, minDate, maxDate} = this.props;
		return (
			<div className="form-group">
				{label && (
					<label htmlFor={id}>{label}</label>
				)}
				<div className="flatpickerContainer">
					<Flatpickr
						value={date as string}
						className="form-control"
						options={{
							mode,
							minDate,
							maxDate,
							enableTime: false,
							allowInput: true,
							dateFormat: "d/m/Y"
						}}
						onChange={this.onChange}
						onClose={this.onClose}
					/>
				</div>
			</div>
		);
	}
}

export default OcFlatDatePicker;
export { OcFlatDatePickerProps };
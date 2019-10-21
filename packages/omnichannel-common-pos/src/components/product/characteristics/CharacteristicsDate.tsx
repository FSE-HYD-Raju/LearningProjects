import cssns from "../../../utils/cssnsConfig";
import OcDatePicker from "../../ocComponents/OcDatePicker";
import classnames from "classnames";
import { PureComponent } from "react";
import { Characteristic, ProductPath } from "../../../redux/types";
import CharacteristicsDateUtil from "./CharacteristicsDateUtil";
import withProductOfferingConfigurationActions, {
	WithProductOfferingConfigurationActionsProps,
	WithProductOfferingConfigurationStateProps,
} from "../withProductOfferingConfigurationActions";

const { React } = cssns("CharacteristicsDate");

interface CharacteristicsDateProps extends WithProductOfferingConfigurationActionsProps, WithProductOfferingConfigurationStateProps {
	inputCharacteristic?: Characteristic;
	characteristicKey: string;
	path: ProductPath;
	inputType?: string;
}

interface CharacteristicsDateState {
	startDate: Date;
	endDate: Date;
	today: Date;
}

class CharacteristicsDate extends PureComponent<CharacteristicsDateProps, CharacteristicsDateState> {

	constructor(props: CharacteristicsDateProps) {
		super(props);
		const currentDate = new Date();
		this.state = {
			startDate: currentDate,
			endDate: currentDate,
			today: currentDate,
		};
	}

	handleDate = (startDate: Date | null) => {
		if (startDate) {
			this.setState({startDate}, this.setDate);
		}
	};

	handleEndDate = (endDate: Date | null) => {
		if (endDate) {
			this.setState({endDate}, this.setDate);
		}
	};

	setDate = () => {
		const date = CharacteristicsDateUtil.getFormattedDateTime(this.props.inputType, this.state.startDate, this.state.endDate);
		const {
			path,
			characteristicKey,
		} = this.props;
		this.props.actions.setInputtedCharacteristic(path, characteristicKey, date);
	};

	render() {
		const { inputCharacteristic, inputType } = this.props;
		const { startDate, endDate, today } = this.state;
		const description = inputCharacteristic && inputCharacteristic.description;
		return (
			<div className="container">
				<div className="description">{description}</div>
				<div className="datepickers">
					<div
						className={classnames({
							"period-datepicker-container": CharacteristicsDateUtil.isDateTimePeriod(inputType),
							"single-datepicker-container": !CharacteristicsDateUtil.isDateTimePeriod(inputType)
						})}
					>
						<OcDatePicker
							id="CharacteristicsDate-datepicker"
							labelPosition="left"
							dropUp={false}
							selectedDate={startDate}
							onChange={this.handleDate}
							withClock={CharacteristicsDateUtil.withClock(inputType)}
							step={1}
							min={today}
							calendar={CharacteristicsDateUtil.enableCalendar(inputType)}
						/>
					</div>
					{CharacteristicsDateUtil.isDateTimePeriod(inputType) && (
						<div className="period-end">
							<OcDatePicker
								dropUp={false}
								selectedDate={endDate}
								onChange={this.handleEndDate}
								withClock={CharacteristicsDateUtil.withClock(inputType)}
								step={1}
								min={today}
								calendar={CharacteristicsDateUtil.enableCalendar(inputType)}
							/>
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default withProductOfferingConfigurationActions<CharacteristicsDateProps>(CharacteristicsDate);
export {
	CharacteristicsDateProps,
	CharacteristicsDateState,
	CharacteristicsDate
};

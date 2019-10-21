import cssns from "../../../../utils/cssnsConfig";
import Slider, { Marks } from "rc-slider";
const { React } = cssns("SliderConfigurationView");

type SliderConfigurationProps = {
	values: number[];
	selectedValue?: number;
	unit: string;
	selectionMessage: React.ReactElement<any>;
	unlimitedMessage: React.ReactElement<any>;
	iconClassName: string;
	onChange: (value: number) => void;
};

const getFormattedValue = (value: number | undefined, unlimitedMessage: React.ReactElement<any>, unit: string): React.ReactElement<any> | string => {
	if (value === undefined) {
		return "";
	}
	if (value === -1) {
		return unlimitedMessage;
	}
	if (value >= 0 && unit) {
		return `${value} ${unit}`;
	}
	return "";
};

const getSliderValue = (values: Array<number>, selectedValue: number = -1) => {
	if (Array.isArray(values)) {
		return Math.max(values.indexOf(selectedValue, 0));
	}
	return 0;
};

const SliderConfigurationView: React.FC<SliderConfigurationProps> = (props: SliderConfigurationProps) => {
	const { values, selectedValue, unit, onChange, selectionMessage, iconClassName, unlimitedMessage } = props;

	const max: number | undefined = Array.isArray(values) ? values.length - 1 : undefined;

	const marks: Marks = {};
	if (Array.isArray(values)) {
		values.reduce((marks: Marks, value: number, index: number): any => {
			marks[index] = getFormattedValue(value, unlimitedMessage, unit);
			return marks;
		}, marks);
	}

	const value: number = getSliderValue(values, selectedValue);
	const classNames = `selection-icon ${iconClassName}`;

	return (
		<div className="this">
			<div className="selection">
				<div className="selection-title">
					<div className={classNames} />
					<div className="selection-message">{selectionMessage}</div>
				</div>
				<div className="selection-value">{getFormattedValue(selectedValue, unlimitedMessage, unit)}</div>
			</div>
			<div className="slider">
				<Slider value={value} min={0} max={max} marks={marks} onChange={onChange} />
			</div>
		</div>
	);
};

export default SliderConfigurationView;
export {
	SliderConfigurationProps
};

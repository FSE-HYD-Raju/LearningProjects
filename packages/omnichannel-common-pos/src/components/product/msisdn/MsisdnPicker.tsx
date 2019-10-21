import OcInput from "../../ocComponents/OcInput";
import cssns from "../../../utils/cssnsConfig";
import { FC } from "react";
const { React } = cssns("MsisdnPicker");

interface MsisdnPickerProps {
	msisdns: Array<string>;
	selectNumber: (a: string) => void;
	selectedNumber?: string | number;
}

const MsisdnPicker: FC<MsisdnPickerProps> = (props: MsisdnPickerProps) => {
	const { msisdns } = props;
	return (
		<div>
			<div className="msisdnSelectTable">
				{msisdns && msisdns.length > 0 && msisdns.map((aNumber: string, idx: number) => {
					return (
						<OcInput
							id={`choosePickNewNumber-${idx}`}
							key={`choosePickNewNumber-${idx}`}
							type="radio"
							name="numberSelect"
							checked={aNumber === props.selectedNumber}
							label={aNumber}
							className="msisdn-input"
							onChange={() => props.selectNumber(aNumber)}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default MsisdnPicker;
export {
	MsisdnPickerProps
};

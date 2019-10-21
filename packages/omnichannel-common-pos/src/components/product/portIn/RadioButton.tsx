import { FC, ReactNode } from "react";
import cssns from "../../../utils/cssnsConfig";
const { React } = cssns("RadioButton");

interface RadioButtonProps {
	id: string;
	name: string;
	value: string;
	checked: boolean;
	onChange: (e: any) => void;
	label: ReactNode;
}

const RadioButton: FC<RadioButtonProps> = (props: RadioButtonProps) => {
	return (
		<div className="radiobutton">
			<label>
				<input
					id={props.id}
					type="radio"
					name={props.name}
					value={props.value}
					checked={props.checked}
					onChange={props.onChange}
				/>
				{props.label}
			</label>
		</div>
	);
};

export default RadioButton;
export {
	RadioButtonProps,
};

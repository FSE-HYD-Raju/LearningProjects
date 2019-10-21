import * as React from "react";
import withFormal, { FormalOcInputProps } from "./withFormal";

interface FormalCheckboxProps {
	errorMessage?: string;
	id?: string;
	label?: string | React.ReactNode;
	labelPosition?: "right" | "left";
	name?: string;
	onChange: (param: boolean) => void;
	value?: string | string[] | number;
	checked: boolean;
}

const FormalCheckbox: React.FC<FormalCheckboxProps> = props => {
	const {
		errorMessage,
		value,
		onChange,
		labelPosition,
		label,
		checked,
		...rest
	} = props;

	return (
		<div className={"form-group" + (errorMessage ? " has-error" : "")}>
			<label>
				{labelPosition === "left" && (
					<span style={{ paddingRight: "6px" }}>{label}</span>
				)}
				<input
					{...rest}
					type="checkbox"
					checked={checked}
					onChange={() => onChange(!checked)}
				/>
				{labelPosition === "right" && (
					<span style={{ paddingLeft: "6px" }}>{label}</span>
				)}
			</label>
			{errorMessage && (
				<div
					className="floating-help-block help-block"
					style={{ opacity: 1 }}
				>
					{errorMessage}
				</div>
			)}
		</div>
	);
};

FormalCheckbox.defaultProps = {
	labelPosition: "right"
};

export default withFormal(FormalCheckbox);
export { FormalCheckboxProps };

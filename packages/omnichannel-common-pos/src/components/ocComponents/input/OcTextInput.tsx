import * as classnames from "classnames";
import cssns from "../../../utils/cssnsConfig";
import {
	ChangeEvent,
	FC,
	InputHTMLAttributes,
} from "react";
import { OcInputContainer, OcInputContainerProps } from "./OcInputContainer";
const { React } = cssns("OcTextInput");

interface OcTextInputProps extends OcInputContainerProps, InputHTMLAttributes<HTMLInputElement> {
	small?: boolean;
	inputType?: "text" | "email" | "number" | "search" | "url";
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	id?: string;
	className?: string;
	style?: Record<string, string | number>;
}

const OcTextInput: FC<OcTextInputProps> = props => {
	const { small, inputType = "text", id, className = "", onChange, ...rest } = props;
	const inputClasses = classnames({
		"input-control": true,
		"form-control": true,
		"input-sm": small,
		[className]: Boolean(className)
	});
	return (
		<OcInputContainer {...props} className={`${className} container`}>
			<input
				className={inputClasses}
				type={inputType}
				onChange={onChange}
				id={id}
				{...rest}
			/>
		</OcInputContainer>);
};
OcTextInput.displayName = "OcTextInput";

export {
	OcTextInputProps,
	OcTextInput
};

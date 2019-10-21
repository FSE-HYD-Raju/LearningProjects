"use strict";

import cssns from "../../../../../utils/cssnsConfig";
import { FC, SyntheticEvent } from "react";
import messages from "./FaF.messages";
import { FormattedMessage } from "../../../../../channelUtils";
import { OcTextInput } from "../../../../ocComponents/input/OcTextInput";
import { OcInputLabelPosition } from "../../../../ocComponents/input/OcInputContainer";
import { OcButton, OcButtonType } from "../../../../ocComponents/button/OcButton";
import { ContextType, contextTypesValidationMap } from "../../../../../types";

const { React } = cssns("FaFNumberModal");

interface FaFNumberModalAddNumberProps {
	save: () => void;
	close: () => void;
	onChange: (event: SyntheticEvent<HTMLInputElement>) => void;
	validationPattern?: string;
}

const FaFNumberModalAddNumber: FC<FaFNumberModalAddNumberProps> = (props: FaFNumberModalAddNumberProps, context: ContextType) => {
	return (
		<div className="addNumberComponent">
			<form
				onSubmit={(event: SyntheticEvent<HTMLFormElement>) => {
					event.preventDefault();
					props.save();
				}}
			>
				<div className="inputContainer">
					<OcTextInput
						className="NewFaFNumberInput"
						label={<FormattedMessage {...messages.number} />}
						labelPosition={OcInputLabelPosition.LEFT}
						id="new_faf_number_input"
						placeholder={context.intl.formatMessage(messages.number)}
						required={true}
						onChange={props.onChange}
						pattern={props.validationPattern}
					/>
					<OcButton
						id="buttonSaveFaFNumber"
						buttonType={OcButtonType.PRIMARY}
						htmlBtnType="submit"
					>
						<FormattedMessage {...messages.save} />
					</OcButton>
					<OcButton
						id="buttonCloseAddField"
						buttonType={OcButtonType.DEFAULT}
						onClick={props.close}
					>
						<FormattedMessage {...messages.cancel} />
					</OcButton>
				</div>
			</form>
		</div>
	);
};
FaFNumberModalAddNumber.contextTypes = contextTypesValidationMap;
export default FaFNumberModalAddNumber;

export {
	FaFNumberModalAddNumberProps
};

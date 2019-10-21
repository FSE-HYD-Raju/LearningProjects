import * as R from "react";
import messages from "../RecurringTopUpConfigurationForm.messages";
import cssns from "../../../utils/cssnsConfig";
import { RecurringTopUpType } from "../../../redux/types/RecurringTopUpModelType";
import { FormattedMessageDescriptor } from "../../../channelUtils";
import FormattedMessage from "../../../channelUtils/FormattedMessage";
import OcInput from "../../ocComponents/OcInput";
import withFormal from "../../ocComponents/withFormal";
const React = cssns("RecurringTopUpModelConfigurationForm").React as typeof R;
const Form = require("react-formal");
const FormalRadioInput = withFormal(OcInput, { inputType: "radio" });

interface RecurringTopUpTypeRadioInputProps {
	isLastSelected: boolean;
	recurringTopUpType: RecurringTopUpType;
	labelMessage: FormattedMessageDescriptor;
}
const RecurringTopUpTypeRadioInput: React.FC<RecurringTopUpTypeRadioInputProps> = props => {
	const { labelMessage, isLastSelected, recurringTopUpType } = props;
	const labels = [
		<span key="main-message-span">
			<FormattedMessage {...labelMessage} />
		</span>
	];
	if (isLastSelected) {
		labels.push(
			<span key="current-selections-map" className="current-selection">
				<FormattedMessage {...messages.recurringTopUpCurrentSelection} />
			</span>
		);
	}
	return (
		<Form.Field
			id={`RecurringTopUpConfigurationForm-${recurringTopUpType}-radio`}
			name="recurringTopUp"
			type={FormalRadioInput}
			label={labels}
			defaultValue={recurringTopUpType}
			radioButtonGroupValue={recurringTopUpType}
			required={true}
		/>
	);
};

export { RecurringTopUpTypeRadioInputProps };
export default RecurringTopUpTypeRadioInput;

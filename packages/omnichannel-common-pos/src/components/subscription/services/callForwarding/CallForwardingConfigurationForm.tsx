import withFormal from "../../../ocComponents/withFormal";
import OcInput from "../../../ocComponents/OcInput";
import OcSelect from "../../../ocComponents/OcSelect";
import OcToggle from "../../../ocComponents/OcToggle";
import cssns from "../../../../utils/cssnsConfig";
const Form = require("react-formal");
import { CallForwardingCharacteristic, CallForwardingService, CallForwardingType } from "./CallForwardingConstants";
import { Schema } from "yup";
import { FC } from "react";
import callForwardingMessages from "./CallForwarding.messages";
import { CallForwardingConfigurationModel } from "./CallForwardingConfigurationState";
import { CharacteristicValue } from "../../../../redux/types";
import { FormattedMessage } from "../../../../channelUtils";

const { React } = cssns("CallForwardingConfigurationForm");
const FormalOcInput = withFormal(OcInput);
const FormalSelect = withFormal(OcSelect);

interface CallForwardingConfigurationFormProps {
	handleTypeChange: (type: CallForwardingType) => void;
	handleModelChange: (model: CallForwardingConfigurationModel) => void;
	handleSuperSwitchToggle: () => void;
	model: CallForwardingConfigurationModel;
	schema: Schema<CallForwardingConfigurationModel>;
	timeValues: Array<CharacteristicValue>;
}

const CallForwardingConfigurationForm: FC<CallForwardingConfigurationFormProps> = (props: CallForwardingConfigurationFormProps) => {
	const { handleTypeChange, model, timeValues, schema} = props;

	if (!model || !schema) {
		return null;
	}

	return (
		<div className="this">
			<Form
				value={model}
				onChange={props.handleModelChange}
				schema={schema}
			>
				<div className="toggle-super-switch-container">
					<div>
						<OcToggle
							id="call-forwarding-toggle-super-switch"
							active={model.superSwitch}
							handleClick={props.handleSuperSwitchToggle}
							enabledLabel={<FormattedMessage {...callForwardingMessages.toggleOn}/>}
							disabledLabel={<FormattedMessage {...callForwardingMessages.toggleOff}/>}
						/>
					</div>
				</div>
				<div className="forward-all-calls-container">
					<div className="radio-button">
						<OcInput
							id="call-forward-radio-forward-all-calls"
							type="radio"
							label={<FormattedMessage {...callForwardingMessages.forwardAllCalls}/>}
							checked={model.type === CallForwardingType.FORWARD_ALL}
							onChange={() => handleTypeChange(CallForwardingType.FORWARD_ALL)}
							disabled={model.forwardIfDisabled && model.forwardAllDisabled}
						/>
					</div>
					<div className="phone-number">
						<Form.Field
							id="forwardAllCallsPhoneNumber"
							placeholder={<FormattedMessage {...callForwardingMessages.phoneNumber}/>}
							name={`configuration.${CallForwardingService.CFUFWD}.inputtedCharacteristics.${CallForwardingCharacteristic.CFMSISDN}`}
							type={FormalOcInput}
							inputType="text"
							disabled={model.forwardAllDisabled}
							required={true}
						/>
					</div>
				</div>
				<div className="forward-if-busy-container">
					<div className="radio-button">
						<OcInput
							id="call-forward-radio-forward-if-busy"
							type="radio"
							label={<FormattedMessage {...callForwardingMessages.forwardIfBusy}/>}
							checked={model.type === CallForwardingType.FORWARD_IFBUSY}
							onChange={() => handleTypeChange(CallForwardingType.FORWARD_IFBUSY)}
							disabled={model.forwardIfDisabled && model.forwardAllDisabled}
						/>
					</div>
					<div className="phone-number">
						<Form.Field
							id="forwardIfBusyPhoneNumber"
							placeholder={<FormattedMessage {...callForwardingMessages.busyPhoneNumber}/>}
							name={`configuration.${CallForwardingService.CFBFWD}.inputtedCharacteristics.${CallForwardingCharacteristic.CFMSISDN}`}
							type={FormalOcInput}
							inputType="text"
							disabled={model.forwardIfDisabled}
							required={true}
						/>
					</div>
				</div>
				<div className="forward-if-out-of-reach-container">
					<div className="forward-if-out-of-reach-title">
						<FormattedMessage {...callForwardingMessages.ifOutOfReach}/>
					</div>
					<div className="phone-number">
						<Form.Field
							id="forwardIfOutOfReachPhoneNumber"
							placeholder={<FormattedMessage {...callForwardingMessages.ifOutOfReachPhoneNumber}/>}
							name={`configuration.${CallForwardingService.CFNRYFWD}.inputtedCharacteristics.${CallForwardingCharacteristic.CFMSISDN}`}
							type={FormalOcInput}
							inputType="text"
							disabled={model.forwardIfDisabled}
							required={true}
						/>
					</div>
				</div>
				<div className="forward-if-no-answer-container">
					<div className="forward-if-no-answer-title">
						<FormattedMessage {...callForwardingMessages.ifNoAnswer}/>
					</div>
					<div className="forward-if-no-answer-opt">
						<Form.Field
							name={`configuration.${CallForwardingService.CFNRYFWD}.inputtedCharacteristics.${CallForwardingCharacteristic.CFTIME}`}
							id="forwardIfNoAnswerOpt"
							type={FormalSelect}
							defaultValue=""
							placeholder={<FormattedMessage {...callForwardingMessages.ifBusySelect}/>}
							disabled={model.forwardIfDisabled}
						>
							{timeValues.map((data, idx) => {
								return (<option key={`value_${idx}`} value={data.value}>{data.name}</option>);
							})}
						</Form.Field>
					</div>
					<div className="forward-if-no-answer-phone-number">
						<Form.Field
							id="forwardIfNoAnswerPhoneNumber"
							placeholder={<FormattedMessage {...callForwardingMessages.ifNoAnswerPhoneNumber}/>}
							name={`configuration.${CallForwardingService.CFNRCFWD}.inputtedCharacteristics.${CallForwardingCharacteristic.CFMSISDN}`}
							type={FormalOcInput}
							inputType="text"
							disabled={model.forwardIfDisabled}
							required={true}
						/>
					</div>
				</div>
			</Form>
		</div>
	);
};

CallForwardingConfigurationForm.displayName = "CallForwardingConfigurationForm";

export default CallForwardingConfigurationForm;
export {
	CallForwardingConfigurationFormProps,
};

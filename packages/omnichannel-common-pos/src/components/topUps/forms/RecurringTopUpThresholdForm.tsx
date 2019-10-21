import * as R from "react";
import RecurringTopUpTypeRadioInput from "./RecurringTopUpTypeRadioInput";
import messages from "../RecurringTopUpConfigurationForm.messages";
import cssns from "../../../utils/cssnsConfig";
import withFormal from "../../ocComponents/withFormal";
import OcSelect from "../../ocComponents/OcSelect";
import { FormattedHTMLMessage, FormattedMessage } from "../../../channelUtils/";
const React = cssns("RecurringTopUpModelConfigurationForm").React as typeof R;
const Form = require("react-formal");
const FormalOcSelect = withFormal(OcSelect);
import { contextTypesValidationMap } from "../../../types";
import { FormFieldType } from "../../FormFieldType";
import { RecurringTopUpType } from "../../../redux/types";
import RecurringTopUpAmountContainer from "./RecurringTopUpAmountContainer";
import CurrencyUtil from "../../../utils/CurrencyUtil";

interface RecurringTopUpThresholdFormOwnProps {
	isCurrentlySelected: boolean;
	editMode: boolean;
	isLastSelected: boolean;
	topUpAmountPresetsPerRow: number;
	setAmount: (amount: number) => void;
	currency: string;
}
interface RecurringTopUpThresholdFormStateProps {
	thresholdValues: Array<number>;
	thresholdTopUpValues: Array<number>;
	limitInMonthValues: Array<number>;
}
interface RecurringTopUpThresholdFormProps extends RecurringTopUpThresholdFormOwnProps, RecurringTopUpThresholdFormStateProps {}
class RecurringTopUpThresholdForm extends React.Component<RecurringTopUpThresholdFormProps> {
	static contextTypes = contextTypesValidationMap;
	private amountFieldRef: React.RefObject<FormFieldType> = React.createRef<FormFieldType>();

	renderThresholdField() {
		const { thresholdValues, currency } = this.props;
		const { formatMessage } = this.context.intl;
		return (
			<div className="select-form">
				<Form.Field
					name="thresholdValue"
					id="RecurringTopUpConfigurationForm-threshold-value-select"
					type={FormalOcSelect}
					label={<FormattedMessage {...messages.recurringTopUpThresholdValue} />}
				>
					<option key="threshold_0" value="" id="RecurringTopUpConfigurationForm-threshold-option-empty" disabled={true}>
						{formatMessage({ ...messages.chooseThreshold })}
					</option>
					{thresholdValues.map((threshold: number, idx: number) => {
						return (
							<option key={`threshold_${idx}`} value={threshold} id={`RecurringTopUpConfigurationForm-threshold-option-${threshold}`}>
								{CurrencyUtil.getFormattedString(this.context, threshold, currency)}
							</option>
						);
					})}
				</Form.Field>
			</div>
		);
	}
	onClickAmountPriceHolder = (price: number) => {
		const { setAmount } = this.props;
		setAmount(Number(price));
		if (this.amountFieldRef.current) {
			this.amountFieldRef.current.input.onBlur();
		}
	};
	renderAmountField() {
		const { thresholdTopUpValues, topUpAmountPresetsPerRow } = this.props;
		return (
			<RecurringTopUpAmountContainer
				className="column-group-row select-form"
				id="RecurringTopUpConfigurationForm-threshold-top-up-amount-field"
				name="topUpAmount"
				message={messages.recurringTopUpThresholdAmount}
				fieldRef={this.amountFieldRef}
				events={["onBlur"]}
				values={thresholdTopUpValues}
				topUpAmountPresetsPerRow={topUpAmountPresetsPerRow}
				onClick={this.onClickAmountPriceHolder}/>
		);
	}
	renderLimitInMonthField() {
		const { limitInMonthValues, currency } = this.props;
		const { formatMessage } = this.context.intl;
		return (
			<div className="select-form">
				<Form.Field
					name="limitInMonth"
					id="RecurringTopUpConfigurationForm-threshold-limit-select"
					type={FormalOcSelect}
					label={<FormattedMessage {...messages.recurringTopUpLimitInMonth} />}
				>
					<option key="limit-in-month_0" value="" id="RecurringTopUpConfigurationForm-limit-in-month-option-empty" disabled={true}>
						{formatMessage({ ...messages.chooseLimitInAMonthValue })}
					</option>
					{limitInMonthValues.map((limit: number, idx: number) => {
						return (
							<option key={`limit-in-month_${idx}`} value={limit} id={`RecurringTopUpConfigurationForm-limit-in-month-option-${limit}`}>
								{CurrencyUtil.getFormattedString(this.context, limit, currency)}
							</option>
						);
					})}
				</Form.Field>
			</div>
		);
	}

	renderExplanationText() {
		return (
			<div className="explanation-text">
				<FormattedHTMLMessage {...messages.recurringTopUpThresholdExplanation} />
			</div>
		);
	}

	render() {
		const { isLastSelected, isCurrentlySelected } = this.props;
		return (
			<>
				<RecurringTopUpTypeRadioInput
					labelMessage={messages.recurringTopUpThreshold}
					recurringTopUpType={RecurringTopUpType.THRESHOLD}
					isLastSelected={isLastSelected}
				/>
				{isCurrentlySelected && (
					<div className="column-group" data-test-name="threshold-field-group">
						{this.renderThresholdField()}
						{this.renderAmountField()}
						{this.renderLimitInMonthField()}
						{this.renderExplanationText()}
					</div>
				)}
			</>
		);
	}
}
export { RecurringTopUpThresholdFormOwnProps, RecurringTopUpThresholdFormStateProps, RecurringTopUpThresholdFormProps };
export default RecurringTopUpThresholdForm;

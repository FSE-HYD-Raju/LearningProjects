import cssns from "../../utils/cssnsConfig";
import {
	ProductOffering, CheckoutTopUpConfiguration,
} from "../../redux/types";
import { ContextType, contextTypesValidationMap } from "../../types";
import messages from "./RecurringTopUpConfigurationForm.messages";
import withFormal from "../ocComponents/withFormal";
import OcSelect from "../ocComponents/OcSelect";
import { intlShape } from "react-intl";

const Form = require("react-formal");
const FormalOcSelect = withFormal(OcSelect);
const { React } = cssns("CheckoutThresholdTopUpForm");
import { Component } from "react";
import { ascendingCharacteristicValueByNumericValueSorter } from "../../utils/CharacteristicsSorters";
interface CheckoutThresholdTopUpFormProps {
	productOffering: ProductOffering;
	checkoutTopUpConfiguration: CheckoutTopUpConfiguration;
}

class CheckoutThresholdTopUpForm extends Component<CheckoutThresholdTopUpFormProps> {
	static displayName = "CheckoutThresholdTopUpForm";
	static contextTypes = contextTypesValidationMap;

	constructor(props: CheckoutThresholdTopUpFormProps, context: ContextType) {
		super(props, context);
	}

	render() {
		const { formatMessage } = this.context.intl;
		const { productOffering, checkoutTopUpConfiguration } = this.props;
		const inputCharacteristics = (productOffering && (productOffering.attributes && productOffering.attributes.inputCharacteristics ||
			productOffering.inputCharacteristics)) || {};

		if (!inputCharacteristics) {
			return null;
		}

		const topUpAmountInputCharacteristic = inputCharacteristics[checkoutTopUpConfiguration.topUpAmount];
		const topUpAmounts = topUpAmountInputCharacteristic.values || [];
		const thresholdInputCharacteristic = inputCharacteristics[checkoutTopUpConfiguration.thresholdValue];
		const thresholdValues = thresholdInputCharacteristic && thresholdInputCharacteristic.values || [];
		const monthlyLimitInputCharacteristic = inputCharacteristics[checkoutTopUpConfiguration.monthlyLimit];
		const monthlyLimitValues = monthlyLimitInputCharacteristic && monthlyLimitInputCharacteristic.values || [];

		if (topUpAmounts.length === 0 || thresholdValues.length === 0 || monthlyLimitValues.length === 0) {
			return null;
		}

		return (<div
			className="column-group"
			data-test-name="threshold-field-group"
		>
			<Form.Field
				name="thresholdValue"
				id="RecurringTopUpConfigurationForm-threshold-value-select"
				type={FormalOcSelect}
				label={formatMessage({ ...messages.recurringTopUpThresholdValue })}
				alwaysShowLabel={true}
			>
				<option
					key="threshold_0"
					value=""
					id="RecurringTopUpConfigurationForm-threshold-option-empty"
				>
					{formatMessage({ ...messages.chooseThreshold })}
				</option>
				{thresholdValues.sort(ascendingCharacteristicValueByNumericValueSorter).map(
					(threshold, idx: number) => {
						return (
							<option
								key={`threshold_${idx}`}
								value={threshold.value}
								id={`RecurringTopUpConfigurationForm-threshold-option-${threshold.value}`}
							>
								{threshold.name || threshold.value}
							</option>
						);
					}
				)}
			</Form.Field>
			<Form.Field
				name="topUpAmount"
				id="RecurringTopUpConfigurationForm-threshold-top-up-amount-field"
				type={FormalOcSelect}
				label={formatMessage({ ...messages.recurringTopUpThresholdAmount })}
				alwaysShowLabel={true}
			>
				<option
					key="topup_amount_0"
					value=""
					id="RecurringTopUpConfigurationForm-threshold-amount-option-empty"
				>
					{formatMessage({ ...messages.chooseAmount })}
				</option>
				{topUpAmounts.sort(ascendingCharacteristicValueByNumericValueSorter).map(
					(amount, idx: number) => {
						return (
							<option
								key={`threshold_${idx}`}
								value={amount.value}
								id={`RecurringTopUpConfigurationForm-threshold-option-${amount.value}`}
							>
								{amount.name || amount.value}
							</option>
						);
					}
				)}
			</Form.Field>
			<Form.Field
				name="limitInMonth"
				id="RecurringTopUpConfigurationForm-threshold-limit-select"
				type={FormalOcSelect}
				label={formatMessage({ ...messages.recurringTopUpLimitInMonth })}
				alwaysShowLabel={true}
			>
				<option
					key="limit-in-month_0"
					value=""
					id="RecurringTopUpConfigurationForm-limit-in-month-option-empty"
					disabled={true}
				>
					{formatMessage({ ...messages.chooseLimitInAMonthValue })}
				</option>
				{monthlyLimitValues.sort(ascendingCharacteristicValueByNumericValueSorter).map(
					(limit, idx: number) => {
						return (
							<option
								key={`limit-in-month_${idx}`}
								value={limit.value}
								id={`RecurringTopUpConfigurationForm-limit-in-month-option-${limit.value}`}
							>
								{limit.name || limit.value}
							</option>
						);
					}
				)}
			</Form.Field>
		</div>);
	}
}

export default CheckoutThresholdTopUpForm;
export { CheckoutThresholdTopUpFormProps };

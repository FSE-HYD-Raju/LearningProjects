import cssns from "../../utils/cssnsConfig";
import {
	ProductOffering,
} from "../../redux/types";
import { ContextType, contextTypesValidationMap } from "../../types";
import messages from "./RecurringTopUpConfigurationForm.messages";
import withFormal from "../ocComponents/withFormal";
import OcSelect from "../ocComponents/OcSelect";
import { ascendingCharacteristicValueByNumericValueSorter } from "../../utils/CharacteristicsSorters";
import { intlShape } from "react-intl";

const Form = require("react-formal");
const FormalOcSelect = withFormal(OcSelect);
const { React } = cssns("CheckoutMonthlyTopUpForm");
import { Component } from "react";

interface CheckoutMonthlyTopUpFormProps {
	productOffering: ProductOffering;
	topUpAmount: string;
}
class CheckoutMonthlyTopUpForm extends Component<CheckoutMonthlyTopUpFormProps> {
	static displayName = "CheckoutMonthlyTopUpForm";
	static contextTypes = contextTypesValidationMap;

	constructor(props: CheckoutMonthlyTopUpFormProps, context: ContextType) {
		super(props, context);
	}

	render() {
		const { formatMessage } = this.context.intl;
		const { productOffering, topUpAmount } = this.props;

		if (!productOffering) {
			return null;
		}

		const topUpAmountInputCharacteristic = (productOffering.attributes && productOffering.attributes.inputCharacteristics[topUpAmount])
			|| productOffering.inputCharacteristics[topUpAmount];
		const topUpAmounts = topUpAmountInputCharacteristic.values || [];

		if (topUpAmounts.length === 0) {
			return null;
		}

		return (<div
			className="column-group"
			data-test-name="monthly-field-group"
		>
			<Form.Field
				name="topUpAmountMonthly"
				id="RecurringTopUpConfigurationForm-monthly-top-up-amount-field"
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
				{topUpAmounts.sort(ascendingCharacteristicValueByNumericValueSorter).map(
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

export default CheckoutMonthlyTopUpForm;
export { CheckoutMonthlyTopUpFormProps };

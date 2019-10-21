import * as R from "react";
import cssns from "../../../utils/cssnsConfig";
import messages from "../RecurringTopUpConfigurationForm.messages";
import { RecurringTopUpType } from "../../../redux/types/RecurringTopUpModelType";
import RecurringTopUpTypeRadioInput from "./RecurringTopUpTypeRadioInput";
const React = cssns("RecurringTopUpModelConfigurationForm").React as typeof R;
import { FormFieldType } from "../../FormFieldType";
import RecurringTopUpAmountContainer from "./RecurringTopUpAmountContainer";

interface RecurringTopUpMonthlyFormOwnProps {
	isCurrentlySelected: boolean;
	editMode: boolean;
	isLastSelected: boolean;
	topUpAmountPresetsPerRow: number;
	setAmount: (amount: number) => void;
}
interface RecurringTopUpMonthlyFormStateProps {
	monthlyTopUpValues: number[];
}
interface RecurringTopUpMonthlyFormActionProps {}
interface RecurringTopUpMonthlyFormProps extends RecurringTopUpMonthlyFormOwnProps, RecurringTopUpMonthlyFormStateProps, RecurringTopUpMonthlyFormActionProps {}
class RecurringTopUpMonthlyForm extends React.Component<RecurringTopUpMonthlyFormProps> {
	private amountFieldRef: React.RefObject<FormFieldType> = React.createRef<FormFieldType>();

	onClickAmountPriceHolder = (price: number) => {
		const { setAmount } = this.props;
		setAmount(Number(price));
		if (this.amountFieldRef.current) {
			this.amountFieldRef.current.input.onBlur();
		}
	};

	renderAmountField() {
		const { monthlyTopUpValues, topUpAmountPresetsPerRow } = this.props;
		return (
			<RecurringTopUpAmountContainer
				className="column-group-row"
				id="RecurringTopUpConfigurationForm-monthly-top-up-amount-field"
				name="topUpAmountMonthly"
				message={messages.recurringTopUpMonthlyAmount}
				fieldRef={this.amountFieldRef}
				events={["onBlur"]}
				values={monthlyTopUpValues}
				topUpAmountPresetsPerRow={topUpAmountPresetsPerRow}
				onClick={this.onClickAmountPriceHolder}/>
		);
	}

	render() {
		const { isLastSelected, isCurrentlySelected } = this.props;
		return (
			<>
				<RecurringTopUpTypeRadioInput
					labelMessage={messages.recurringTopUpMonthly}
					recurringTopUpType={RecurringTopUpType.MONTHLY}
					isLastSelected={isLastSelected}
				/>
				{isCurrentlySelected && (
					<div className="column-group" data-test-name="monthly-field-group">
						{this.renderAmountField()}
					</div>
				)}
			</>
		);
	}
}

export { RecurringTopUpMonthlyFormOwnProps, RecurringTopUpMonthlyFormStateProps, RecurringTopUpMonthlyFormActionProps, RecurringTopUpMonthlyFormProps };
export default RecurringTopUpMonthlyForm;

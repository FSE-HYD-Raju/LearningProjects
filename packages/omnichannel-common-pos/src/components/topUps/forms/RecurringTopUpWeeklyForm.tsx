import * as R from "react";
import cssns from "../../../utils/cssnsConfig";
import messages from "../RecurringTopUpConfigurationForm.messages";
import RecurringTopUpTypeRadioInput from "./RecurringTopUpTypeRadioInput";
const React = cssns("RecurringTopUpModelConfigurationForm").React as typeof R;
import { FormFieldType } from "../../FormFieldType";
import { RecurringTopUpType } from "../../../redux/types/RecurringTopUpModelType";
import RecurringTopUpAmountContainer from "./RecurringTopUpAmountContainer";

interface RecurringTopUpWeeklyFormOwnProps {
	editMode: boolean;
	isCurrentlySelected: boolean;
	isLastSelected: boolean;
	topUpAmountPresetsPerRow: number;
	setAmount: (amount: number) => void;
}
interface RecurringTopUpWeeklyFormStateProps {
	weeklyTopUpValues: number[];
}
interface RecurringTopUpWeeklyFormActionProps {}
interface RecurringTopUpWeeklyFormProps extends RecurringTopUpWeeklyFormOwnProps, RecurringTopUpWeeklyFormStateProps, RecurringTopUpWeeklyFormActionProps {}
class RecurringTopUpWeeklyForm extends React.Component<RecurringTopUpWeeklyFormProps> {
	private amountFieldRef: React.RefObject<FormFieldType> = React.createRef<FormFieldType>();

	onClickAmountPriceHolder = (price: number) => {
		const { setAmount } = this.props;
		setAmount(Number(price));
		if (this.amountFieldRef.current) {
			this.amountFieldRef.current.input.onBlur();
		}
	};

	renderAmountField() {
		const { weeklyTopUpValues, topUpAmountPresetsPerRow } = this.props;

		return (
			<RecurringTopUpAmountContainer
				className="column-group-row"
				id="RecurringTopUpConfigurationForm-weekly-top-up-amount-field"
				name="topUpAmountWeekly"
				message={messages.recurringTopUpWeeklyAmount}
				fieldRef={this.amountFieldRef}
				events={["onBlur"]}
				values={weeklyTopUpValues}
				topUpAmountPresetsPerRow={topUpAmountPresetsPerRow}
				onClick={this.onClickAmountPriceHolder}/>
		);
	}

	render() {
		const { isLastSelected, isCurrentlySelected } = this.props;
		return (
			<>
				<RecurringTopUpTypeRadioInput
					labelMessage={messages.recurringTopUpWeekly}
					recurringTopUpType={RecurringTopUpType.WEEKLY}
					isLastSelected={isLastSelected}
				/>
				{isCurrentlySelected && (
					<div className="column-group" data-test-name="weekly-field-group">
						{this.renderAmountField()}
					</div>
				)}
			</>
		);
	}
}

export { RecurringTopUpWeeklyFormOwnProps, RecurringTopUpWeeklyFormStateProps, RecurringTopUpWeeklyFormActionProps, RecurringTopUpWeeklyFormProps };
export default RecurringTopUpWeeklyForm;

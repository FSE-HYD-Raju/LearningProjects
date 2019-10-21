import * as R from "react";
import cssns from "../../../utils/cssnsConfig";
import RecurringTopUpThresholdFormContainer from "./RecurringTopUpThresholdFormContainer";
import classnames from "classnames";
import RecurringTopUpMonthlyFormContainer from "./RecurringTopUpMonthlyFormContainer";
import RecurringTopUpWeeklyFormContainer from "./RecurringTopUpWeeklyFormContainer";
import { RecurringTopUpType } from "../../../redux/types";
import messages from "../RecurringTopUpConfigurationForm.messages";
import RecurringTopUpTypeRadioInput from "./RecurringTopUpTypeRadioInput";

const React = cssns("RecurringTopUpModelConfigurationForm").React as typeof R;

interface RecurringTopUpModelConfigurationFormOwnProps {
	recurringTopUpTypes: RecurringTopUpType[];
	editMode: boolean;
	selectedRecurringTopUpType: RecurringTopUpType;
	lastRecurringTopUpType?: RecurringTopUpType;
	topUpAmountPresetsPerRow: number;
	setThresholdAmount: (amount: number) => void;
	setMonthlyAmount: (amount: number) => void;
	setWeeklyAmount: (amount: number) => void;
	className?: string;
}
interface RecurringTopUpModelConfigurationFormStateProps {}
interface RecurringTopUpModelConfigurationFormActionProps {}
interface RecurringTopUpModelConfigurationFormProps
	extends RecurringTopUpModelConfigurationFormOwnProps,
		RecurringTopUpModelConfigurationFormStateProps,
		RecurringTopUpModelConfigurationFormActionProps {}
class RecurringTopUpModelConfigurationForm extends React.Component<RecurringTopUpModelConfigurationFormProps> {
	renderRecurringTopUp = (recurrentTopUpType: RecurringTopUpType) => {
		const {
			setThresholdAmount,
			setMonthlyAmount,
			setWeeklyAmount,
			selectedRecurringTopUpType,
			lastRecurringTopUpType,
			topUpAmountPresetsPerRow,
			editMode,
		} = this.props;
		switch (recurrentTopUpType) {
			case RecurringTopUpType.THRESHOLD:
				return (
					<RecurringTopUpThresholdFormContainer
						key={recurrentTopUpType}
						editMode={editMode}
						topUpAmountPresetsPerRow={topUpAmountPresetsPerRow}
						isLastSelected={recurrentTopUpType === lastRecurringTopUpType}
						isCurrentlySelected={recurrentTopUpType === selectedRecurringTopUpType}
						setAmount={setThresholdAmount}
					/>
				);
			case RecurringTopUpType.WEEKLY:
				return (
					<RecurringTopUpWeeklyFormContainer
						key={recurrentTopUpType}
						editMode={editMode}
						topUpAmountPresetsPerRow={topUpAmountPresetsPerRow}
						isLastSelected={recurrentTopUpType === lastRecurringTopUpType}
						isCurrentlySelected={recurrentTopUpType === selectedRecurringTopUpType}
						setAmount={setWeeklyAmount}
					/>
				);
			case RecurringTopUpType.MONTHLY:
				return (
					<RecurringTopUpMonthlyFormContainer
						key={recurrentTopUpType}
						editMode={editMode}
						topUpAmountPresetsPerRow={topUpAmountPresetsPerRow}
						isLastSelected={recurrentTopUpType === lastRecurringTopUpType}
						isCurrentlySelected={recurrentTopUpType === selectedRecurringTopUpType}
						setAmount={setMonthlyAmount}
					/>
				);
			case RecurringTopUpType.REMOVE:
				return (<RecurringTopUpTypeRadioInput
						labelMessage={messages.recurringTopUpRemove}
						recurringTopUpType={RecurringTopUpType.REMOVE}
						isLastSelected={false}
					/>
				);
			default:
				return null;
		}
	};

	render() {
		const { recurringTopUpTypes, className } = this.props;
		return (
			<div className={classnames({ "main-form-container": true, [className!]: Boolean(className) })}>
				{recurringTopUpTypes.map(this.renderRecurringTopUp)}
			</div>
		);
	}
}

export {
	RecurringTopUpModelConfigurationFormOwnProps,
	RecurringTopUpModelConfigurationFormStateProps,
	RecurringTopUpModelConfigurationFormActionProps,
	RecurringTopUpModelConfigurationFormProps,
};
export default RecurringTopUpModelConfigurationForm;

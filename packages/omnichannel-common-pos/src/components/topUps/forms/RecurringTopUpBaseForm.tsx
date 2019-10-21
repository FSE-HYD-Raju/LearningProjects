import * as R from "react";
import cssns from "../../../utils/cssnsConfig";
import { RecurringTopUpModelType, RecurringTopUpType } from "../../../redux/types/RecurringTopUpModelType";
import messages from "../RecurringTopUpConfigurationForm.messages";
import FormattedMessage from "../../../channelUtils/FormattedMessage";
import RecurringTopUpModelConfigurationForm from "./RecurringTopUpModelConfigurationForm";
import { contextTypesValidationMap } from "../../../types";
import { HasSchema } from "../../../redux/types";
import RecurringTopUpPaymentFormContainer from "./RecurringTopUpPaymentFormContainer";
import { RecurringTopUpUtil } from "../RecurringTopUpUtil";
import { CommonCustomizationPoints, withCustomization } from "../../../customization";
import { OcModalFooter } from "../../ocComponents/OcModalFooter";

const React = cssns("RecurringTopUpBaseForm").React as typeof R;
const Form = require("react-formal");

interface RecurringTopUpBaseFormProps {
	initialModel: RecurringTopUpModelType;
	topUpAmountPresetsPerRow: number;
	onClose: () => void;
}
interface RecurringTopUpBaseFormState {
	model: RecurringTopUpModelType;
	isValidForm: boolean;
	editMode: boolean;
}
interface RecurringTopUpBaseFormPropsWithSchema extends RecurringTopUpBaseFormProps, HasSchema {}
abstract class RecurringTopUpBaseForm<P extends RecurringTopUpBaseFormPropsWithSchema = RecurringTopUpBaseFormPropsWithSchema> extends React.Component<
	P,
	RecurringTopUpBaseFormState
> {
	static contextTypes: typeof contextTypesValidationMap = contextTypesValidationMap;
	constructor(props: P) {
		super(props);
		const model = { ...props.initialModel };
		this.state = {
			model,
			isValidForm: this.isValidTopUpModel(model),
			editMode: false
		};
	}

	abstract getRecurringTopUpTypes(): RecurringTopUpType[];
	abstract renderPhoneNumberForm(): React.ReactNode;
	abstract handleSubmit(model: RecurringTopUpModelType): void;

	ensureModelRecurringTopUpType(recurringTopUpTypes: RecurringTopUpType[]) {
		const { model } = this.state;
		if (!model.recurringTopUp || recurringTopUpTypes.indexOf(model.recurringTopUp) === -1) {
			const newModel = { ...model, recurringTopUp: recurringTopUpTypes[0] };
			this.setState({ model: newModel, isValidForm: this.isValidTopUpModel(newModel) });
		}
	}

	public isValidTopUpModel(model: RecurringTopUpModelType): boolean {
		return RecurringTopUpUtil.isValidTopUpModel(model);
	}

	public renderPhoneNumberSection() {
		return (
			<div className="section-container subscription-container">
				<div className="section-label">
					<FormattedMessage {...messages.recurringTopUpSubscription} />
				</div>
				<div className="section-data">{this.renderPhoneNumberForm()}</div>
			</div>
		);
	}
	public renderTopUpSection() {
		const { initialModel, topUpAmountPresetsPerRow } = this.props;
		const { model } = this.state;
		return (
			<div className="section-container">
				<div className="section-label">
					<FormattedMessage {...messages.topUpType} />
				</div>
				<div className="section-data">
					<RecurringTopUpModelConfigurationForm
						className="model-form"
						editMode={this.state.editMode}
						setThresholdAmount={this.setThresholdAmount}
						setMonthlyAmount={this.setMonthlyAmount}
						setWeeklyAmount={this.setWeeklyAmount}
						topUpAmountPresetsPerRow={topUpAmountPresetsPerRow}
						lastRecurringTopUpType={initialModel && initialModel.recurringTopUp}
						selectedRecurringTopUpType={model.recurringTopUp || RecurringTopUpType.THRESHOLD}
						recurringTopUpTypes={this.getRecurringTopUpTypes()}
					/>
				</div>
			</div>
		);
	}
	public renderPaymentSection() {
		return (
			<div className="section-container payment-container">
				<div className="section-label">
					<FormattedMessage {...messages.recurringTopUpPaymentMethod} />
				</div>
				<div className="section-data payment-select">
					<RecurringTopUpPaymentFormContainer />
				</div>
			</div>
		);
	}
	public renderActions() {
		const { onClose } = this.props;
		const { isValidForm } = this.state;
		return (
			<OcModalFooter
				onClose={onClose}
				actionMessage={<FormattedMessage {...messages.confirm} />}
				actionDisabled={!isValidForm}
			/>
		);
	}
	render() {
		return (
			<Form
				className="this"
				schema={this.props.schema}
				debug={true}
				noValidate={true}
				onChange={this.handleInputChange}
				value={this.state.model}
				onSubmit={(model: any) => {
					this.handleSubmit(model);
				}}
			>
				<div className="container">
					<div className="content">
						{this.renderPhoneNumberSection()}
						{this.renderTopUpSection()}
						{this.renderPaymentSection()}
					</div>
					{this.renderActions()}
				</div>
			</Form>
		);
	}
	protected onModelChange(prevModel: RecurringTopUpModelType, nextModel: RecurringTopUpModelType) {}
	private handleInputChange = (model: RecurringTopUpModelType): void => {
		const newModel: RecurringTopUpModelType = {
			...this.state.model,
			recurringTopUp: model.recurringTopUp,
			thresholdValue: model.thresholdValue && Number(model.thresholdValue),
			topUpAmount: model.topUpAmount && Number(model.topUpAmount),
			limitInMonth: model.limitInMonth && Number(model.limitInMonth),
			topUpAmountWeekly: model.topUpAmountWeekly && Number(model.topUpAmountWeekly),
			topUpAmountMonthly: model.topUpAmountMonthly && Number(model.topUpAmountMonthly),
			paymentMethodType: model.paymentMethodType,
			paymentMethod: model.paymentMethod,
			subscription: model.subscription,
		};
		this.onModelChange(this.state.model, newModel);
		this.setState({
			model: newModel,
			isValidForm: this.isValidTopUpModel(newModel),
		});
	};
	private setThresholdAmount = (amount: number) => {
		this.handleInputChange({
			...this.state.model,
			topUpAmount: amount,
		});
	};
	private setMonthlyAmount = (amount: number) => {
		this.handleInputChange({
			...this.state.model,
			topUpAmountMonthly: amount,
		});
	};
	private setWeeklyAmount = (amount: number) => {
		this.handleInputChange({
			...this.state.model,
			topUpAmountWeekly: amount,
		});
	};
}

export { RecurringTopUpBaseFormProps, RecurringTopUpBaseForm };

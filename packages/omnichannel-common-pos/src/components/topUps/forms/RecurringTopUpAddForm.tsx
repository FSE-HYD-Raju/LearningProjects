import * as R from "react";
import { RecurringTopUpBaseForm, RecurringTopUpBaseFormProps } from "./RecurringTopUpBaseForm";
import cssns from "../../../utils/cssnsConfig";
import messages from "../RecurringTopUpConfigurationForm.messages";
import OcSelect from "../../ocComponents/OcSelect";
import withFormal from "../../ocComponents/withFormal";
import { Agreement, HasSchema, RecurringTopUpType } from "../../../redux/types";
import withSchemaTS from "../../../schemas/withSchemaTS";
import { RecurringTopUpModelType } from "../../../redux/types/RecurringTopUpModelType";
import { ReactUtil } from "../../../utils/product/ReactUtil";
import MsisdnUtil from "../../../utils/MsisdnUtil";

const React = cssns("RecurringTopUpBaseForm").React as typeof R;
const Form = require("react-formal");
const FormalOcSelect = withFormal(OcSelect);

interface RecurringTopUpAddFormStateProps {
	phoneNumbersToAgreements: Record<string, Agreement>;
	recurringTopUpTypesByAgreementsIds: Record<string, RecurringTopUpType[]>;
	isBasketSubmitted: boolean;
}
interface RecurringTopUpAddFormActionProps {
	actions: {
		initialize: () => void;
		getNewTopUpProductOfferings: (agreementId: string) => void;
		submitTopUp: (model: RecurringTopUpModelType) => void;
	};
}
interface RecurringTopUpAddFormProps extends RecurringTopUpBaseFormProps, HasSchema, RecurringTopUpAddFormStateProps, RecurringTopUpAddFormActionProps {}
class RecurringTopUpAddForm extends RecurringTopUpBaseForm<RecurringTopUpAddFormProps> {
	componentDidMount() {
		this.props.actions.initialize();
		if (this.state.model.subscription) {
			this.onChangeSubscription(this.state.model.subscription);
		}
	}

	handleSubmit = (model: RecurringTopUpModelType) => {
		this.props.actions.submitTopUp(model);
	};

	componentWillReceiveProps(nextProps: RecurringTopUpAddFormProps) {
		if (ReactUtil.isPropChanged<RecurringTopUpAddFormProps>(this.props, nextProps, "recurringTopUpTypesByAgreementsIds")) {
			this.ensureModelRecurringTopUpType(this.getRecurringTopUpTypes(nextProps));
		}
		if (ReactUtil.isPropChanged<RecurringTopUpAddFormProps>(this.props, nextProps, "isBasketSubmitted") && nextProps.isBasketSubmitted) {
			this.props.onClose();
		}
	}

	getRecurringTopUpTypes(props?: RecurringTopUpAddFormProps) {
		const { recurringTopUpTypesByAgreementsIds, phoneNumbersToAgreements } = props || this.props;
		const { model } = this.state;
		const agreement = model.subscription && phoneNumbersToAgreements[model.subscription];
		return (agreement && recurringTopUpTypesByAgreementsIds[agreement.id]) || [];
	}

	renderPhoneNumberForm() {
		const { formatMessage } = this.context.intl;
		const { phoneNumbersToAgreements } = this.props;
		return (
			<Form.Field name="subscription" id="RecurringTopUpConfigurationForm-subscription-select" type={FormalOcSelect} label={""}>
				<option key="subscription_0" value="" id="RecurringTopUpConfigurationForm-subscription-option-empty" disabled={true}>
					{formatMessage({ ...messages.chooseSubscription })}
				</option>
				{Object.keys(phoneNumbersToAgreements).map((phoneNumber: string, idx: number) => {
					return (
						<option key={`subscription_${idx}`} value={phoneNumber} id={`RecurringTopUpConfigurationForm-subscription-option-${phoneNumber}`}>
							{MsisdnUtil.getMsisdnWithSeparatedAreaCode(phoneNumber || "")}
						</option>
					);
				})}
			</Form.Field>
		);
	}

	onChangeSubscription(newPhoneNumber: string) {
		const agreement = this.props.phoneNumbersToAgreements[newPhoneNumber];
		if (agreement) {
			this.props.actions.getNewTopUpProductOfferings(agreement.id);
		}
	}

	onModelChange(prevModel: RecurringTopUpModelType, nextModel: RecurringTopUpModelType) {
		if (prevModel.subscription !== nextModel.subscription && nextModel.subscription) {
			this.onChangeSubscription(nextModel.subscription);
		}
	}
}

export { RecurringTopUpAddFormProps, RecurringTopUpAddFormActionProps, RecurringTopUpAddFormStateProps };
export default withSchemaTS<RecurringTopUpAddFormProps>(["recurringTopUpForm"])(RecurringTopUpAddForm);

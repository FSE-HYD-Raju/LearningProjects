import * as R from "react";
import messages from "../RecurringTopUpConfigurationForm.messages";
import { ContextualPaymentMethod, CREDIT_CARD_IDENTIFIER, CustomerPaymentMethod } from "../../../redux/types";
import cssns from "../../../utils/cssnsConfig";
const React = cssns("RecurringTopUpPaymentForm").React as typeof R;
import { uniqBy } from "lodash";
import withFormal from "../../ocComponents/withFormal";
import OcSelect from "../../ocComponents/OcSelect";
import { contextTypesValidationMap } from "../../../types";
import PaymentUtil, { CreditCardPresentation } from "../../../utils/PaymentUtil";
const Form = require("react-formal");
const FormalOcSelect = withFormal(OcSelect);

interface RecurringTopUpPaymentFormStateProps {
	allowUsingNewCreditCard: boolean;
	customerPaymentMethods: CustomerPaymentMethod[];
}
interface RecurringTopUpPaymentFormProps extends RecurringTopUpPaymentFormStateProps {}
class RecurringTopUpPaymentForm extends React.Component<RecurringTopUpPaymentFormProps> {
	static contextTypes = contextTypesValidationMap;

	getCreditCardsOptions = () => {
		const { customerPaymentMethods } = this.props;
		const activePaymentMethods = PaymentUtil.getActiveCustomerPaymentMethods(customerPaymentMethods);
		return PaymentUtil.getCreditCardsPresentation(activePaymentMethods).map((creditCardPresentation: CreditCardPresentation, idx: number) => {
			return (
				<option value={creditCardPresentation.id} key={`credit_card_${idx}`}>
					{this.context.intl.formatMessage(
						{ ...messages.recurringTopUpCardDescription },
						{ cardType: creditCardPresentation.cardType, cardEnding: creditCardPresentation.cardEnding }
					)}
				</option>
			);
		});
	};
	render() {
		const { formatMessage } = this.context.intl;
		const { allowUsingNewCreditCard } = this.props;
		return (
			<>
				<Form.Field name="paymentMethod" id="RecurringTopUpConfigurationForm-payment-method-select" type={FormalOcSelect} label={""}>
					<option key={"method_0"} value="" id={"RecurringTopUpConfigurationForm-payment-method-option-empty"} disabled={true}>
						{formatMessage({ ...messages.recurringTopUpSelectCard })}
					</option>
					{this.getCreditCardsOptions()}
					{allowUsingNewCreditCard && (
						<option key="use-new-card" value="use-new-card">
							{formatMessage({ ...messages.topUpModalUseNewCreditCardOption })}
						</option>
					)}
				</Form.Field>
			</>
		);
	}
}

export { RecurringTopUpPaymentFormStateProps, RecurringTopUpPaymentFormProps };
export default RecurringTopUpPaymentForm;

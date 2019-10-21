import cssns from "../../utils/cssnsConfig";
import { PureComponent } from "react";
import { ContextualPaymentMethod, CustomerPaymentMethod } from "../../redux/types";
import FormattedMessage, { FormattedMessageDescriptor } from "../../channelUtils/FormattedMessage";
import PaymentSelection from "../payment/PaymentSelection";
import changeSimModalMessages from "./ChangeSim.messages";
import paymentMessages, { PaymentMessagesType } from "../payment/Payment.messages";
import ChangeSimPaymentDetailsContainer from "./ChangeSimPaymentDetailsContainer";

const { React } = cssns("ChangeSimPaymentSelection");

interface ChangeSimPaymentSelectionStateProps {
	paymentMethods: ContextualPaymentMethod[];
	selectedPaymentMethod: string | undefined;
	selectedCustomerPaymentMethod: string | undefined;
	cashPaymentEnabled: boolean;
	cashPaymentIdentifiers: string[];
	customerPaymentMethods?: Array<CustomerPaymentMethod>;
}

interface ChangeSimPaymentSelectionActionProps {
	actions: {
		onSelectPaymentMethod: (selectedPaymentMethod: string) => void;
		onSelectCustomerPaymentMethod: (selectedCustomerPaymentMethodId: string) => void;
	};
}

type ChangeSimPaymentSelectionProps = ChangeSimPaymentSelectionStateProps & ChangeSimPaymentSelectionActionProps;

class ChangeSimPaymentSelection extends PureComponent<ChangeSimPaymentSelectionProps> {
	changePaymentMethod = (paymentMethodId: string) => {
		this.props.actions.onSelectPaymentMethod(paymentMethodId);
	};

	handleCreditCardChange = (selectedCustomerPaymentMethod: CustomerPaymentMethod) => {
		this.props.actions.onSelectCustomerPaymentMethod(selectedCustomerPaymentMethod && selectedCustomerPaymentMethod.id);
	};

	getLabel = (paymentMethods: ContextualPaymentMethod[]): FormattedMessageDescriptor => {
		const firstPaymentMethod = paymentMethods && paymentMethods[0];
		const label =
			firstPaymentMethod && firstPaymentMethod.attributes && firstPaymentMethod.attributes.label
				? firstPaymentMethod.attributes.label
				: paymentMethods[0].label;
		const id =
			firstPaymentMethod && firstPaymentMethod.attributes && firstPaymentMethod.attributes.id ? firstPaymentMethod.attributes.id : paymentMethods[0].id;
		const paymentLabel = {
			...paymentMessages[id as keyof PaymentMessagesType] || {
				id: `digitallife-payment-method-${id}`,
				description: `Payment method for change sim with id ${id}`,
				defaultMessage: label,
			},
		};
		return paymentLabel;
	};

	render() {
		const {
			paymentMethods,
			selectedPaymentMethod,
			selectedCustomerPaymentMethod,
			cashPaymentEnabled,
			cashPaymentIdentifiers,
			customerPaymentMethods,
		} = this.props;
		return (
			<div className="ChangeSim-payment-container">
				<div className="ChangeSim-row ChangeSim-payment-method-container">
					<div className="ChangeSim-label">
						<FormattedMessage {...changeSimModalMessages.selectPaymentLabel} />
					</div>
					<div className="ChangeSim-data">
						{paymentMethods && paymentMethods.length == 1 ? (
							<FormattedMessage {...this.getLabel(paymentMethods)} />
						) : (
							<PaymentSelection
								parentClass="ChangeSim"
								paymentMethods={[...paymentMethods]}
								changePaymentMethod={this.changePaymentMethod}
								onChangeCreditCard={this.handleCreditCardChange}
								selectedPaymentMethod={selectedPaymentMethod}
								cashPaymentEnabled={cashPaymentEnabled}
								cashPaymentIdentifiers={cashPaymentIdentifiers}
								customerPaymentMethods={customerPaymentMethods}
								selectedCustomerPaymentMethod={selectedCustomerPaymentMethod}
								showCreditCards={true}
							/>
						)}
					</div>
				</div>
				<ChangeSimPaymentDetailsContainer />
			</div>
		);
	}
}

export default ChangeSimPaymentSelection;
export { ChangeSimPaymentSelectionProps, ChangeSimPaymentSelectionStateProps, ChangeSimPaymentSelectionActionProps };

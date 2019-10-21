import { FC } from "react";
import { ContextualPaymentMethod, InitializedAddon } from "../../../../redux/types";
import addonMessages from "../Addon.messages";
import paymentMessages, { PaymentMessagesType } from "../../../payment/Payment.messages";
import OcInput from "../../../ocComponents/OcInput";
import cssns from "../../../../utils/cssnsConfig";
import FormattedMessage, { FormattedMessageDescriptor } from "../../../../channelUtils/FormattedMessage";

const { React } = cssns("AddonActivationModal");

interface AddonActivationPaymentMethodsProps {
	initializedAddon: InitializedAddon | undefined;
	selectedPaymentMethod: ContextualPaymentMethod | undefined;
	handleSelect: (paymentMethod: ContextualPaymentMethod) => void;
}

const AddonActivationPaymentMethods: FC<AddonActivationPaymentMethodsProps> = props => {
	const { initializedAddon, selectedPaymentMethod } = props;
	if (!initializedAddon) {
		return null;
	}

	const paymentMethods: Array<ContextualPaymentMethod> = initializedAddon.paymentMethods || [];
	const getLabel = (paymentMethod: ContextualPaymentMethod): FormattedMessageDescriptor => {
		const paymentLabel: FormattedMessageDescriptor = {
			...(paymentMessages[paymentMethod.id as keyof PaymentMessagesType] || {
				id: `digitallife-payment-method-${paymentMethod.id}`,
				description: `Payment method for change sim with id ${paymentMethod.id}`,
				defaultMessage: paymentMethod.label,
			}),
		};
		return paymentLabel;
	};

	return (
		<div className="payment-container">
			<div className="label">
				<FormattedMessage {...addonMessages.configurationPayment} />
			</div>

			<div className="payments">
				{initializedAddon && !paymentMethods && <FormattedMessage {...addonMessages.configurationNoPaymentMethods} />}
				{paymentMethods && paymentMethods.length === 1 && selectedPaymentMethod && <FormattedMessage {...getLabel(selectedPaymentMethod)} />}
				{paymentMethods &&
					paymentMethods.length > 1 &&
					paymentMethods.map((method: ContextualPaymentMethod, index: number) => (
						<OcInput
							id={`addonActivationSetPaymentMethod-${method.id}`}
							key={`addonActivationSetPaymentMethod-${index}`}
							type="radio"
							onChange={() => props.handleSelect(method)}
							checked={props.selectedPaymentMethod && props.selectedPaymentMethod.id === method.id}
							label={<span>{method.label}</span>}
						/>
					))}
			</div>
		</div>
	);
};

export { AddonActivationPaymentMethods, AddonActivationPaymentMethodsProps };

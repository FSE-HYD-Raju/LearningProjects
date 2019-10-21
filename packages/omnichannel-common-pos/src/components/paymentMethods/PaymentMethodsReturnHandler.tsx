import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Component } from "react";
import PaymentMessages from "../payment/Payment.messages";
import { User } from "../../redux";
import { commonDigitalLifeRoutes } from "../../routes/commonRoutesMap";
import { contextTypesValidationMap } from "../../types";

interface PaymentMethodsReturnHandlerStateProps extends RouteComponentProps<any> {
	user?: User;
	contextualPaymentMethodId: string;
}

interface PaymentMethodsReturnHandlerActionProps {
	actions: {
		paymentMethodsVerificationToaster: (msg: string) => void;
		validatePaymentResultAfterReturningFromTheSIA: (
			contextualPaymentMethodId: string,
			paymentParams: object,
			customerAccountId: string
		) => void;
		historyPush: (token: string) => void;
	};
}

type PaymentMethodsReturnHandlerProps = PaymentMethodsReturnHandlerStateProps & PaymentMethodsReturnHandlerActionProps;

class PaymentMethodsReturnHandler extends Component<PaymentMethodsReturnHandlerProps> {
	static contextTypes = contextTypesValidationMap;

	async componentWillMount(): Promise<void> {

		// TODO: Add handler for SUCCESS and REJECT statuses
		await this.props.actions.historyPush(commonDigitalLifeRoutes.DIGITAL_LIFE_PAYMENT_METHODS.createLink());

		const { formatMessage } = this.context.intl;
		const searchParams: URLSearchParams = new URLSearchParams(this.props.location.search);
		const paymentParams: any = {};
		// @ts-ignore - we are using URLSearchParams entries() method to iterate over key-value pairs. TS doesn't know about this
		const it = searchParams.entries();
		let iter = it.next();
		while (!iter.done) {
			paymentParams[iter.value[0]] = iter.value[1];
			iter = it.next();
		}

		const customerAccountId = this.props.user && this.props.user.customerAccountId ? this.props.user.customerAccountId : "";
		this.props.actions.validatePaymentResultAfterReturningFromTheSIA(
			this.props.contextualPaymentMethodId,
			paymentParams,
			customerAccountId
		);

		const paymentMethodsVerificationMessageText = formatMessage(PaymentMessages.paymentMethodsVerification);
		if (paymentMethodsVerificationMessageText) {
			this.props.actions.paymentMethodsVerificationToaster(paymentMethodsVerificationMessageText);
		}
	}

	render() {
		return null;
	}
}

export default PaymentMethodsReturnHandler;
export {
	PaymentMethodsReturnHandlerProps,
	PaymentMethodsReturnHandlerStateProps,
	PaymentMethodsReturnHandlerActionProps,
};

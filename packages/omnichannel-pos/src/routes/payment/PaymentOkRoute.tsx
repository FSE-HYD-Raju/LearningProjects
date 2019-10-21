import * as React from "react";
import { Route } from "react-router-dom";
import { PaymentReturnHandlerContainer, PaymentReturnHandlerContainerOwnProps, ContextType, contextTypesValidationMap } from "omnichannel-common-pos";

const PaymentOkRoute: React.FC = (props: {}, context: ContextType) => {
	const flux = context.flux;
	const paymentProps: PaymentReturnHandlerContainerOwnProps = {
		flux,
		successRoute: "/payment/success",
		rejectRoute: "/servicedesk/checkout/payment",
		receiptCreateFailedRoute: "/payment/success",
	};
	return (
		<Route
			key="payment_ok"
			path="/payment/paymentOk"
			render={() => {
				return (
					<PaymentReturnHandlerContainer {...paymentProps} />
				);
			}}
		/>
	);
};
PaymentOkRoute.contextTypes = contextTypesValidationMap;

export default PaymentOkRoute;

import React from "react";
import { pick } from "lodash";
import { Route } from "react-router-dom";
import { AltContainer, contextTypesValidationMap } from "omnichannel-common-pos";
import POSOrderCanceled from "../../checkout/POSOrderCanceled";

const PaymentCancelRoute = (props, context) => {
	const flux = context.flux;
	return (
		<Route
			key="payment_cancel"
			path="/payment/paymentCancel"
			render={props => (
				<AltContainer
					actions={{
						PaymentActions: flux.actions.PaymentActions
					}}
					transform={({ PaymentActions }) => {
						return {
							...pick(PaymentActions, "handlePaymentCancel")
						};
					}}
				>
					<POSOrderCanceled {...props} />
				</AltContainer>
			)}
		/>
	);
};
PaymentCancelRoute.contextTypes = contextTypesValidationMap;

export default PaymentCancelRoute;

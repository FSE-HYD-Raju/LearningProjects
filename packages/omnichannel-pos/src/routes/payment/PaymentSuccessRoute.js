import React from "react";
import { AltContainer, contextTypesValidationMap, actions } from "omnichannel-common-pos";
import { Route } from "react-router-dom";
import { pick, get } from "lodash";
import POSOrderCompleted from "../../checkout/POSOrderCompleted";

const PaymentSuccessRoute = (props, context) => {
	const flux = context.flux;
	return (
		<Route
			key="payment_success"
			path="/payment/success"
			render={props => (
				<AltContainer
					actions={{
						BasketActions: flux.actions.BasketActions,
						PaymentActions: flux.actions.PaymentActions,
					}}
					stores={{
						BasketStore: flux.stores.BasketStore,
						PaymentStore: flux.stores.PaymentStore,
						CustomerCaseStore: flux.stores.CustomerCaseStore
					}}
					transform={({
						BasketActions,
						PaymentActions,
						BasketStore,
						PaymentStore,
						CustomerCaseStore
					}) => {
						const paymentStatus = get(
							PaymentStore,
							"paymentInfo.paymentStatus"
						)
							? get(PaymentStore, "paymentInfo.paymentStatus")
							: PaymentStore.paymentStatus;
						const personId = get(
							CustomerCaseStore,
							"activeCustomerCase.attributes.activeCustomer.customerAccountId"
						)
							? get(
									CustomerCaseStore,
									"activeCustomerCase.attributes.activeCustomer.id"
								)
							: undefined;
						return {
							...pick(
								BasketActions,
								"getBasketIncludeBasketItems",
								"createBasket"
							),
							...pick(PaymentActions, "resetPaymentStore"),
							resetConfigurations: () => {
								flux.reduxStore.dispatch(actions.productOfferingConfiguration.resetConfigurations());
							},
							...pick(
								BasketStore,
								"submittedBasket",
								"submittedBasketItems"
							),
							personId,
							paymentStatus
						};
					}}
				>
					<POSOrderCompleted {...props} />
				</AltContainer>
			)}
		/>
	);
};
PaymentSuccessRoute.contextTypes = contextTypesValidationMap;

export default PaymentSuccessRoute;

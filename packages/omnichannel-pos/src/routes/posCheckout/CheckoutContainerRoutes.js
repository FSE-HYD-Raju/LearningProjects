// @flow
import React from "react";
import POSCheckoutSummary from "../../checkout/POSCheckoutSummary";
import POSCheckoutDelivery from "../../checkout/POSCheckoutDelivery";
import POSCheckoutPayment from "../../checkout/POSCheckoutPayment";
import POSCheckoutSetup from "../../checkout/CheckoutSetup";
import { Route } from "react-router-dom";
import { AltContainer } from "omnichannel-common-pos";

type Props = {
	flux: Object,
	saveCheckoutConfigurationToBasket: Function
};

const CheckoutContainerRoutes = (props: Props) => {
	const { flux, saveCheckoutConfigurationToBasket } = props;
	return (
		<div>
			<Route
				exact={true}
				path="/servicedesk/checkout"
				render={props => (
					<AltContainer
						stores={{
							BasketStore: flux.stores.BasketStore,
							CustomerCaseStore: flux.stores.CustomerCaseStore,
							DigitalLifeStore: flux.stores.DigitalLifeStore,
							POSCheckoutStore: flux.stores.POSCheckoutStore,
							UserStore: flux.stores.UserStore
						}}
						actions={{
							BasketActions: flux.actions.BasketActions,
							CustomerCaseActions: flux.actions.CustomerCaseActions,
							POSCheckoutActions: flux.actions.POSCheckoutActions,
							UserActions: flux.actions.UserActions
						}}
					>
						<POSCheckoutSetup
							{...props}
							saveCheckoutConfigurationToBasket={
								saveCheckoutConfigurationToBasket
							}
						/>
					</AltContainer>
				)}
			/>
			<Route
				path="/servicedesk/checkout/setup"
				render={props => (
					<AltContainer
						stores={{
							UserStore: flux.stores.UserStore,
							BasketStore: flux.stores.BasketStore,
							DigitalLifeStore: flux.stores.DigitalLifeStore,
							POSCheckoutStore: flux.stores.POSCheckoutStore,
							CustomerCaseStore: flux.stores.CustomerCaseStore,
						}}
						actions={{
							UserActions: flux.actions.UserActions,
							BasketActions: flux.actions.BasketActions,
							POSCheckoutActions: flux.actions.POSCheckoutActions,
							CustomerCaseActions: flux.actions.CustomerCaseActions,
						}}
					>
						<POSCheckoutSetup
							{...props}
							error={flux.reduxStore.getState().error.error}
							saveCheckoutConfigurationToBasket={
								saveCheckoutConfigurationToBasket
							}
						/>
					</AltContainer>
				)}
			/>
			<Route
				path="/servicedesk/checkout/details"
				render={props => (
					<AltContainer
						stores={{
							UserStore: flux.stores.UserStore,
							BasketStore: flux.stores.BasketStore,
							DigitalLifeStore: flux.stores.DigitalLifeStore,
							POSCheckoutStore: flux.stores.POSCheckoutStore
						}}
						actions={{
							BasketActions: flux.actions.BasketActions,
							POSCheckoutActions: flux.actions.POSCheckoutActions
						}}
					>
						<POSCheckoutDelivery
							{...props}
							saveCheckoutConfigurationToBasket={
								saveCheckoutConfigurationToBasket
							}
						/>
					</AltContainer>
				)}
			/>
			<Route
				path="/servicedesk/checkout/summary"
				render={props => (
					<AltContainer
						stores={{
							BasketStore: flux.stores.BasketStore,
							DigitalLifeStore: flux.stores.DigitalLifeStore,
							UserStore: flux.stores.UserStore,
							CustomerCaseStore: flux.stores.CustomerCaseStore,
						}}
						actions={{
							BasketActions: flux.actions.BasketActions,
							PaymentActions: flux.actions.PaymentActions
						}}
					>
						<POSCheckoutSummary
							{...props}
							error={flux.reduxStore.getState().error.error}
							saveCheckoutConfigurationToBasket={saveCheckoutConfigurationToBasket}
						/>
					</AltContainer>
				)}
			/>
			<Route
				path="/servicedesk/checkout/payment"
				render={props => (
					<AltContainer
						stores={{
							BasketStore: flux.stores.BasketStore,
							UserStore: flux.stores.UserStore,
							PaymentStore: flux.stores.PaymentStore,
						}}
						actions={{
							DigitalLifeActions: flux.actions.DigitalLifeActions,
							PaymentActions: flux.actions.PaymentActions,
							BasketActions: flux.actions.BasketActions
						}}
					>
						<POSCheckoutPayment
							{...props}
							saveCheckoutConfigurationToBasket={
								saveCheckoutConfigurationToBasket
							}
						/>
					</AltContainer>
				)}
			/>
		</div>
	);
};

export default CheckoutContainerRoutes;
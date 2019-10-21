import React, { ComponentType } from "react";
import { Route } from "react-router-dom";
import { AltContainer, ContextType, contextTypesValidationMap, Flex, FormattedMessage } from "omnichannel-common-pos";
import { get, pick } from "lodash";
import CategoryListContainer from "../components/CategoryListContainer";
import { ConnectedCustomerDetailsContainer } from "../components/customer/CustomerDetailsContainer";
import messages from "./ServiceDeskContainer.messages";

type Props = {
	flux: any,
	posCheckoutRoute?: ComponentType<any>
};

const ServiceDeskContainerRoutes = (props: Props, context: ContextType) => {
	const { flux, posCheckoutRoute } = props;

	const PosCheckoutRoute = posCheckoutRoute || null;
	return (
		<main id="w-app-body">
			{PosCheckoutRoute && <PosCheckoutRoute />}
			<Route
				key="servicedesk"
				exact={true}
				path="/servicedesk"
				render={() => (
					<CategoryListContainer flux={context.flux}/>
				)}
			/>
			<Route
				key="customer"
				path="/servicedesk/customer"
				render={props => (
					<AltContainer
						actions={{
							UserActions: flux.actions.UserActions
						}}
						stores={{
							ConsulStore: flux.stores.ConsulStore,
							CustomerCaseStore: flux.stores.CustomerCaseStore,
							CustomerStore: flux.stores.CustomerStore,
							SalesStore: flux.stores.SalesStore,
							UserStore: flux.stores.UserStore
						}}
						transform={({
							ConsulStore,
							CustomerCaseActions,
							CustomerCaseStore,
							UserActions,
							UserStore
						}) => {
							return {
								...pick(
									ConsulStore,
									"genders",
									"languages",
									"countries"
								),
								...pick(CustomerCaseActions, "getAgreements"),
								...pick(
									CustomerCaseStore,
									"activeCustomerCase",
									"activeCustomerCase.attributes.activeCustomer",
									"agreements",
									"getCustomerOffers",
									"getSidebarNotifications"
								),
								...pick(
									UserActions,
									"updateUserDemoGraphicInfo",
									"updateUserAddresses",
									"updateUserPreferences",
									"updateUserPrivacySettings",
								),
								...pick(UserStore, "updatingUser"),
								privacySettingsKeys: context.flux.reduxStore.getState().privacySettingsKeys,
							};
						}}
					>
						<ConnectedCustomerDetailsContainer {...props} />
					</AltContainer>
				)}
			/>
			<Route
				key="toolmode"
				path="/servicedesk/toolmode"
				render={() => {
					const userId = get(
						flux.stores.CustomerCaseStore,
						"state.activeCustomerCase.attributes.activeCustomer.id"
					);

					const csrtb = get(
						flux.stores.ConsulStore,
						"state.csrtb_service_name"
					);

					if (userId && csrtb && csrtb.address && csrtb.port) {
						return (
							<iframe
								style={{ border: 0 }}
								src={`http://${csrtb.address}:${csrtb.port}/individual/${userId}`}
								width={1680}
								height={768}
								title="pos-csrtb-iframe"
							/>
						);
					} else {
						return (
							<Flex
								style={{
									minHeight: 240,
									background: "#f8f8f8"
								}}
								alignItems="center"
								justifyContent="center"
								flex={1}
							>
								<h2>
									<FormattedMessage {...messages.toolModeNotConfigured} />
								</h2>
							</Flex>
						);
					}
				}}
			/>
			<Route
				key="shop"
				path="/servicedesk/shop/:category?"
				render={() => (
					<CategoryListContainer flux={context.flux} />
				)}
			/>
		</main>
	);
};

ServiceDeskContainerRoutes.contextTypes = contextTypesValidationMap;

export default ServiceDeskContainerRoutes;

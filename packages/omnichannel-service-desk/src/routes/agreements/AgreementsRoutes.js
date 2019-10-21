// @flow
import React from "react";
import { Route } from "react-router-dom";
import { AltContainer } from "omnichannel-common-pos";
import CustomerDetailsSubscriptionDetails from "../../components/customer/subscriptions/CustomerDetailsSubscriptionDetails";
import getSubscriptionComponent from "./../getSubscriptionComponent";
import ServiceDeskServiceConfigurationRoute from "./ServiceDeskServiceConfigurationRoute";

type Props = {
	flux: Object
};

const AgreementsRoutes = (props: Props) => {
	const flux = props.flux;

	return (
		<div>
			<AltContainer>
				<Route
					key="agreements"
					path="/servicedesk/customer/agreements"
					exact={true}
					render={props =>
						getSubscriptionComponent(flux, CustomerDetailsSubscriptionDetails, props)}
				/>
				<Route
					key="subscription"
					path="/servicedesk/customer/agreements/:agreementId/:subscriptionId"
					render={props =>
						getSubscriptionComponent(flux, CustomerDetailsSubscriptionDetails, props)}
				/>
				<ServiceDeskServiceConfigurationRoute {...props} flux={flux} />
			</AltContainer>
		</div>
	);
};

export default AgreementsRoutes;

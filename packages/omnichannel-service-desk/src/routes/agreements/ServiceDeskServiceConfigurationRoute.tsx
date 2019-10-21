import * as React from "react";
import { Route } from "react-router-dom";
import { ConfigureModalProviderContainer, HasFlux } from "omnichannel-common-pos";

const ServiceDeskServiceConfigurationRoute: React.FC<HasFlux> = (routeProps: HasFlux) => {
	const flux = routeProps.flux;
	return (
		<Route
			path="/servicedesk/customer/agreements/:agreementId/:subscriptionId/service-plan/configure/:serviceId/:productOfferingId"
			key="serviceDeskConfigureServiceId-productOfferingId"
			exact={true}
			render={() => {
				return (
					<ConfigureModalProviderContainer
						flux={flux}
						forCustomer={true}
					/>
				);
			}}
		/>
	);
};

export default ServiceDeskServiceConfigurationRoute;

import * as React from "react";
import { Route } from "react-router-dom";
import {
	MessageBox,
	HasFlux,
	FormattedMessage,
	OcRouteAuthContainer, AuthUtils
} from "omnichannel-common-pos";
import messages from "./ServiceDeskContainer.messages";
import ServiceDeskReduxContainer from "../components/ServiceDeskReduxContainer";

interface Props extends HasFlux {
	posCheckoutRoute: React.ComponentType<any>;
}

const ServiceDeskRoute: React.FC<Props> = (props: Props) => {
	const { flux, posCheckoutRoute } = props;
	return (
		<Route
			key="servicedesk"
			path="/servicedesk"
			render={() => {
				return (
						<OcRouteAuthContainer flux={flux}>
							{!AuthUtils.doesUserHavePermission("pos", flux.reduxStore.getState()) ? (
								<MessageBox
									boxType="pos"
									title={<FormattedMessage {...messages.pointOfSales}/>}
									message={<FormattedMessage {...messages.insufficientPermissions}/>}
								/>
							) : (
								<ServiceDeskReduxContainer
									flux={flux}
									posRoutes={posCheckoutRoute}
								/>
							)}
						</OcRouteAuthContainer>
				);
			}}
		/>
	);
};

export default ServiceDeskRoute;

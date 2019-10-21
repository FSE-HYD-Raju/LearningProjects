import * as React from "react";
import { RouteComponentProps, RouteProps, Switch, withRouter, StaticContext } from "react-router";
import { Route } from "react-router-dom";
import {
	ConnectedToStoreRouteParamHandlerOwnProps,
	ConnectedToStoreRouteParamHandlerActionProps,
	default as ConnectedToStoreRouteParamHandler
} from "./ConnectedToStoreRouteParamHandler";

class NoneSelectedRouteParamHandler extends ConnectedToStoreRouteParamHandler {
	getNewValue() {
		return null;
	}
}
export interface StoreConnectedRouteStateProps extends ConnectedToStoreRouteParamHandlerOwnProps {
	path?: string;
	pathname: string;
	nullable?: boolean;
}
export interface StoreConnectedRouteActionProps extends ConnectedToStoreRouteParamHandlerActionProps {}
export interface StoreConnectedRouteProps extends StoreConnectedRouteStateProps, StoreConnectedRouteActionProps {}
const StoreConnectedRoute: React.FC<StoreConnectedRouteProps & RouteComponentProps<any>> = props => {
	const path = props.path ? `${props.match.url}/${props.path}/:value` : `${props.match.url}/:value`;
	const location = {
		pathname: props.pathname,
		search: "",
		state: {},
		hash: ""
	};
	const routeComponent = (
		<Route
			key={props.pathname}
			location={location}
			path={path}
			render={routeProps => <ConnectedToStoreRouteParamHandler {...props} {...routeProps} />}
		/>
	);

	if (props.nullable) {
		const noneSelectedRouteComponent = (
			<Route
				key={"nullable_" + props.pathname}
				location={location}
				path={props.match.url}
				exact={true}
				render={routeProps => <NoneSelectedRouteParamHandler {...props} {...routeProps} />}
			/>
		);
		return (
			<Switch location={location}>
				{noneSelectedRouteComponent}
				{routeComponent}
			</Switch>
		);
	} else {
		return routeComponent;
	}
};
StoreConnectedRoute.defaultProps = {
	nullable: false
};

const StoreConnectedRouteWithRouter: React.ComponentClass<StoreConnectedRouteProps> = withRouter(StoreConnectedRoute);
export default StoreConnectedRouteWithRouter;

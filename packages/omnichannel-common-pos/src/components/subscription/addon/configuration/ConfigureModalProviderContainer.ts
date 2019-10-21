"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { AppState, HasFlux } from "../../../../redux";
import ConfigureModalProvider, {
	ConfigureModalProviderActionProps, ConfigureModalProviderProps,
	ConfigureModalProviderStateProps
} from "./ConfigureModalProvider";

interface ConfigureModalProviderContainerProps extends HasFlux, RouteComponentProps<any> {
	forCustomer?: boolean;
}

type ConfigureModalProviderContainerOwnProps = ConfigureModalProviderContainerProps & RouteComponentProps<any>;

const mapStateToProps = (state: AppState): ConfigureModalProviderStateProps => {
	return {
		agreements: state.digitalLife.agreements,
		productToConfigure: state.sales.productToConfigure,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: ConfigureModalProviderContainerOwnProps): ConfigureModalProviderActionProps => {
	const flux = ownProps.flux;
	return {
		actions: {
			getProductToConfigure: flux.actions.SalesActions.getProductToConfigure,
		}
	};
};

const mergeProps = (stateProps: ConfigureModalProviderStateProps, dispatchProps: ConfigureModalProviderActionProps,
					ownProps: ConfigureModalProviderContainerOwnProps): ConfigureModalProviderProps => {

	const { flux, ...restOwnProps } = ownProps;

	return {
		...restOwnProps,
		...stateProps,
		...dispatchProps
	};
};

const ConfigureModalProviderConnected: React.ComponentClass<ConfigureModalProviderContainerProps> =
	connect(mapStateToProps, mapDispatchToProps, mergeProps)(ConfigureModalProvider);

const ConfigureModalProviderConnectedWithRouter: React.ComponentClass<HasFlux & { forCustomer?: boolean }> = withRouter(ConfigureModalProviderConnected);
export default ConfigureModalProviderConnectedWithRouter;

export {
	ConfigureModalProviderContainerOwnProps,
	ConfigureModalProviderContainerProps
};

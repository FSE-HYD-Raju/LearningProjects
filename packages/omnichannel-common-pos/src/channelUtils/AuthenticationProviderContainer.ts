"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import AuthenticationProvider, {
	AuthenticationProviderStateProps,
	AuthenticationProviderActionProps,
	AuthenticationProviderStatePropsOwnProps
} from "./AuthenticationProvider";
import { AppState } from "../redux/reducers";
import { HasFlux } from "../redux/types";
import { actions } from "../redux";

const mapStateToProps = (state: AppState): AuthenticationProviderStateProps => {
	return {
		isAnonymousAuthenticationEnabled: state.auth.anonymousAuthenticationEnabled,
		isAuthenticated: !!state.auth.token,
		location: state.router.location,
		securedRoutes: state.feature.securedRoutes,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): AuthenticationProviderActionProps => {
	return {
		login: (anonymousUser?: boolean, loginHint?: string) => {
			dispatch(actions.user.aaLogin({ anonymousUser, loginHint }));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AuthenticationProvider));

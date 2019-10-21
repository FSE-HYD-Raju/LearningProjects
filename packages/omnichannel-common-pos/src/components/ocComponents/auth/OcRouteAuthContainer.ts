"use strict";

import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, AnyAction } from "redux";
import { AppState, HasFlux } from "../../../index";
import { RouteComponentProps, withRouter, StaticContext } from "react-router";
import { OcRouteAuth, OcRouteAuthActionProps, OcRouteAuthOwnProps, OcRouteAuthStateProps } from "./OcRouteAuth";
import * as Selectors from "../../../redux/selectors";
import actions from "../../../redux/actions";

const mapStateToProps = (state: AppState, ownProps: RouteComponentProps<any> & HasFlux & OcRouteAuthOwnProps):
						OcRouteAuthStateProps & OcRouteAuthOwnProps & RouteComponentProps<any> => ({
	anonymous: !!ownProps.anonymous,
	anonymousAuthenticationEnabled: Selectors.auth.isAnonymousAuthenticationEnabled()(state),
	// from user
	isLoggedIn: Selectors.user.isLoggedIn()(state),
	userOrAnonymousSet: Selectors.user.isUserOrAnonymous()(state),
	history: ownProps.history,
	location: ownProps.location,
	match: ownProps.match,
	staticContext: ownProps.staticContext
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: HasFlux): OcRouteAuthActionProps => {
	return {
		actions: {
			aaLogin: ownProps.flux.actions.UserActions.aaLogin,
			setAnonymousUser: ownProps.flux.actions.UserActions.setAnonymousUser,
			persistToStorage: () => dispatch(actions.session.persistToStorage()),
		}
	};
};

const OcRouteAuthContainer: React.ComponentClass<HasFlux & OcRouteAuthOwnProps> =
		  withRouter<RouteComponentProps<any> & HasFlux & OcRouteAuthOwnProps>(connect(mapStateToProps, mapDispatchToProps)(OcRouteAuth));

export default OcRouteAuthContainer;

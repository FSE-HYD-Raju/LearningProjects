"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps, StaticContext } from "react-router";
import { HasFlux } from "../../redux/types";
import { AppState } from "../../redux/reducers";
import actions from "../../redux/actions";
import {
	LoginContainer,
	LoginContainerActionProps,
	LoginContainerOwnProps,
	LoginContainerStateProps
} from "./LoginContainer";

const mapStateToProps = (state: AppState, ownProps: LoginContainerOwnProps & HasFlux): LoginContainerStateProps & LoginContainerOwnProps => ({
	user: state.user.user,
	error: state.user.error,
	alternativeRoute: ownProps.alternativeRoute,
	hideLogin: ownProps.hideLogin,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: LoginContainerOwnProps & HasFlux): LoginContainerActionProps => ({
	actions: {
		login: ownProps.flux.actions.UserActions.login,
		logout: () => {dispatch(actions.user.logout()); },
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

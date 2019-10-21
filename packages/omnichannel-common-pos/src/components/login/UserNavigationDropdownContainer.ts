"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import {
	UserNavigationDropdown,
	UserNavigationDropdownActionProps, UserNavigationDropdownProps,
	UserNavigationDropdownStateProps
} from "./UserNavigationDropdown";
import { AppState } from "../../redux/reducers";
import actions from "../../redux/actions";

const mapStateToProps = (state: AppState): UserNavigationDropdownStateProps => ({
	userId: state.user.user ? state.user.user.id : "",
	changePasswordUrl: state.feature.changePasswordUrl,
	editProfileUrl: state.feature.editProfileUrl,
	serviceLocations: state.consul.serviceLocations,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): UserNavigationDropdownActionProps => ({
	actions: {
		toggleLogin: () => {
			dispatch(actions.navBar.toggleLogin());
		},
		handleLogout: () => {dispatch(actions.user.logout()); }
	}
});

const mergeProps = (stateProps: UserNavigationDropdownStateProps, dispatchProps: UserNavigationDropdownActionProps): UserNavigationDropdownProps => {

	return {
		...stateProps,
		...dispatchProps
	};
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(UserNavigationDropdown);

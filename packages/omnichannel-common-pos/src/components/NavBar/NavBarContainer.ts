"use strict";
import * as React from "react";
import { connect } from "react-redux";
import { AppState, AuthUtils } from "../../redux";
import NavBar, { NavBarStateProps } from "./NavBar";

const mapStateToProps = (state: AppState): NavBarStateProps => {
	return {
		user: state.user.user,
		salesRepUser: state.user.salesRepUser,
		logo: state.consul.logo,
		hasUserPOSPermission: !!AuthUtils.doesUserHavePermission("pos", state),
		showMobileNavigation: state.navBar.showMobileNavigation,
		brandLink: state.navBar.brandLink,
		showStartSessionButton: state.feature.showStartSessionButton
	};
};

export default connect(mapStateToProps)(NavBar);

"use strict";
import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import actions from "../../../redux/actions";
import { connect } from "react-redux";
import NavBarMobile, { NavBarMobileActionProps, NavBarMobileMergedProps, NavBarMobileStateProps } from "./NavBarMobile";
import { Selectors, PostalAddress, AppState, LocationInfo, HasFlux } from "../../../redux";
import PostalAddressUtil from "../../../utils/user/PostalAddressUtil";

export interface NavBarMobileContainerProps extends HasFlux {
	isMobileViewActive?: boolean;
}

const mapStateToProps = (state: AppState): NavBarMobileStateProps => {
	const { postalAddressRoleForDefaultLocationSearch, postalAddressPartsToUseInQuery } = state.location;
	const { user } = state.user;
	const locationSearchAddress =
		user && PostalAddressUtil.getAddressByRole(user, postalAddressRoleForDefaultLocationSearch);
	const customerAddress =
		locationSearchAddress &&
		PostalAddressUtil.isAddressCompleteEnoughForLocationQuery(locationSearchAddress, postalAddressPartsToUseInQuery)
			? PostalAddressUtil.prepareAddressForLocationSearch(locationSearchAddress, postalAddressPartsToUseInQuery)
			: undefined;
	return {
		changePasswordUrl: state.feature.changePasswordUrl,
		user: state.user.user,
		mainCategories: state.category.mainCategories,
		fetchingLocations: Boolean(state.location.fetchingLocations),
		fetchingDefaultLocation: Boolean(state.location.fetchingDefaultLocation),
		defaultLocationAddress: state.location.defaultLocationAddress,
		customerAddress,
		isUserLoggedIn: Selectors.user.isLoggedIn()(state),
		locationListVisible: state.location.locationListVisible,
		selectedLocation: state.location.selectedLocation,
		locations: state.location.locations,
		locationSelectionEnabled: state.location.locationSelectionEnabled
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: NavBarMobileContainerProps): NavBarMobileActionProps => {
	return {
		actions: {
			aaLogin: () => {
				ownProps.flux.actions.UserActions.aaLogin(undefined);
			},
			logout: ownProps.flux.actions.UserActions.logout,
			toggleMobileNavigation: () => {
				dispatch(actions.navBar.toggleMobileNavigation());
			},
			getLocations: (address?: PostalAddress, additionalParameters?: string) =>
				dispatch(actions.location.getLocations(address, additionalParameters)),
			getDefaultLocation: (address: PostalAddress, isUserLoggedIn: boolean) =>
				dispatch(actions.location.getDefaultLocation(address, isUserLoggedIn)),
			setLocationListVisible: (value: boolean) => dispatch(actions.location.setLocationListVisible(value)),
			setLocation: (location: LocationInfo) => dispatch(actions.location.setLocation(location)),
			toggleLocationList: () => dispatch(actions.location.toggleLocationList()),
			setDefault: () => dispatch(actions.location.setDefault())
		}
	};
};

const mergeProps = (stateProps: NavBarMobileStateProps, dispatchProps: NavBarMobileActionProps,
					ownProps: NavBarMobileContainerProps): NavBarMobileMergedProps => {

	const { flux, ...restOwnProps } = ownProps;

	return {
		...stateProps,
		...dispatchProps,
		...restOwnProps,
	};

};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(NavBarMobile);

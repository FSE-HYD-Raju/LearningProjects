import * as React from "react";
import { connect } from "react-redux";
import { get } from "lodash";
import { Dispatch, AnyAction } from "redux";
import { AppState, HasFlux, actions, PostalAddressUtil, LocationInfo, PostalAddress  } from "omnichannel-common-pos";
import TopBar, { TopBarActionProps, TopBarStateProps, TopBarProps } from "./TopBar";

// TODO: check if this can be merged with TopBarContainer from common
const mapStateToProps = (state: AppState): TopBarStateProps => {

	const activeCustomerCase = state.customerCase.activeCustomerCase;
	const activeCustomer = get(activeCustomerCase, "attributes.activeCustomer");
	const {
		postalAddressRoleForDefaultLocationSearch,
		postalAddressPartsToUseInQuery
	} = state.location;

	const locationSearchAddress = activeCustomer && PostalAddressUtil.getAddressByRole(activeCustomer, postalAddressRoleForDefaultLocationSearch);

	const customerAddress = locationSearchAddress &&
		PostalAddressUtil.isAddressCompleteEnoughForLocationQuery(locationSearchAddress, postalAddressPartsToUseInQuery)
			? PostalAddressUtil.prepareAddressForLocationSearch(locationSearchAddress, postalAddressPartsToUseInQuery)
			: undefined;

	return {
		defaultLocationAddress: state.location.defaultLocationAddress,
		customerAddress: customerAddress,
		fetchingLocations: Boolean(state.location.fetchingLocations),
		fetchingDefaultLocation: Boolean(state.location.fetchingDefaultLocation),
		activeCustomerId: activeCustomer && activeCustomer.id,
		locationListVisible: state.location.locationListVisible,
		selectedLocation: state.location.selectedLocation,
		locations: state.location.locations,
		locationSelectionEnabled: state.location.locationSelectionEnabled,
		shouldCallDefaultLocation: state.location.shouldCallDefaultLocation,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): TopBarActionProps => {
	return {
		actions: {
			getLocations: (address?: PostalAddress, additionalParameters?: string) => {
				dispatch(actions.location.getLocations(address, additionalParameters));
			},
			getDefaultLocation: (address: PostalAddress, activeCustomerId: boolean) => {
				dispatch(actions.location.getDefaultLocation(address, activeCustomerId));
			},
			setLocationListVisible: (value: boolean) => {
				dispatch(actions.location.setLocationListVisible(value));
			},
			setLocation: (location: LocationInfo) => {
				dispatch(actions.location.setLocation(location));
			},
			toggleLocationList: () => {
				dispatch(actions.location.toggleLocationList());
			},
			setDefault: () => {
				dispatch(actions.location.setDefault());
			},
			resetLocations: () => {
				dispatch(actions.location.resetLocations());
			},
		}
	}
};


const mergeProps = (stateProps: TopBarStateProps, dispatchProps: TopBarActionProps, ownProps: HasFlux): TopBarProps => {

	return {
		...ownProps,
		...stateProps,
		...dispatchProps
	};
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(TopBar);

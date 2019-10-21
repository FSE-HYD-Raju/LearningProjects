
import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import {
	AppState,
	actions,
	withCustomization,
	POSComponentCustomizationPoints,
	PostalAddress,
} from "omnichannel-common-pos";
import {
	InstallationAddressSearchFormActionProps,
	InstallationAddressSearchFormStateProps,
	default as InstallationAddressSearchForm
} from "./InstallationAddressSearchForm";

const mapStateToProps = (state: AppState): Partial<InstallationAddressSearchFormStateProps> => {
	return {
		addressValidation: state.location.addressValidation,
		installationAddressDisplayFieldsTemplate: state.feature.installationAddressDisplayFieldsTemplate,
		cities: state.location.cities,
		selectedCityId: state.location.cityId,
		selectedCounty: state.location.county,
		counties: state.location.counties ,
		streets: state.location.streets,
		addresses: state.location.addresses,
		streetBlock: state.location.streetBlock,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): InstallationAddressSearchFormActionProps => {
	return {
		actions: {
			validateAddress: (address: PostalAddress) =>
				dispatch(actions.location.validateAddress(address)),
			getCities : () =>
				dispatch(actions.location.getCities()),
			getCounties : (city: string) =>
				dispatch(actions.location.getCounties(city)),
			getStreets: (city: string, countyName: string) =>
				dispatch(actions.location.getStreets(city, countyName)),
			getAddresses: (city: string, countyName: string, streetName: string, streetBlock: string) =>
				dispatch(actions.location.getAddresses(city, countyName, streetName, streetBlock)),
		}
	};
};

const mergeProps = (
	stateProps: Pick<Partial<InstallationAddressSearchFormStateProps>, Exclude<keyof Partial<InstallationAddressSearchFormStateProps>, "schema">>,
	dispatchProps: InstallationAddressSearchFormActionProps): Pick<Partial<InstallationAddressSearchFormStateProps>,
		Exclude<keyof Partial<InstallationAddressSearchFormStateProps>, "schema">> & InstallationAddressSearchFormActionProps => {

	return {
		...stateProps,
		...dispatchProps
	};
};

export default withCustomization<any>(
	POSComponentCustomizationPoints.INSTALLATION_ADDRESS_SEARCH_FORM_CONTAINER,
	connect(mapStateToProps, mapDispatchToProps, mergeProps)(InstallationAddressSearchForm)
);

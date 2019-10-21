import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { actions as reduxActions } from "../../redux";
import {
	HasFlux,
	ProductOffering,
	ProductPath,
} from "../../redux/types";
import { AppState } from "../../redux/reducers";
import ProductOfferingConfiguration, {
	ProductOfferingConfigurationActionProps,
	ProductOfferingConfigurationProps,
	ProductOfferingConfigurationStateProps
} from "./ProductOfferingConfiguration";
import { ProductOfferingMsisdnConfigurationProps } from "./configuration/utils/ProductOfferingMsisdnConfigurationProps";
import actions from "../../redux/actions";

interface VeryOwnProps extends HasFlux {
	product: ProductOffering;
	isAddonVisible?: boolean;
	path?: ProductPath;
}

interface ProductOfferingConfigurationContainerOwnProps extends ProductOfferingMsisdnConfigurationProps, VeryOwnProps {
	product: ProductOffering;
}

const mapStateToProps = (state: AppState, ownProps: ProductOfferingConfigurationContainerOwnProps): ProductOfferingConfigurationStateProps => {
	return {
		marketingConsent: state.feature.marketingConsent,
		paymentGatewayIdentifier: state.feature.paymentGatewayIdentifier,
		phoneDirectoryRegistrationConsentIdentifier: state.feature.phoneDirectoryRegistrationConsentIdentifier,
		recurringTopUpsIdentifier: state.feature.recurringTopUpsIdentifier,
		deliveryOptionsGroup: state.feature.deliveryOptionsGroup,
		icc_subtype_display: state.consul.icc_subtype_display,
		msisdnReservationRequired: state.consul.msisdnReservationRequired || true,
		product: ownProps.product,
		isAddonVisible: ownProps.isAddonVisible || true,
		msisdnModalVisible: Boolean(ownProps.msisdnModalVisible),
		userOpened: ownProps.userOpened,
		msisdnConfig: ownProps.msisdnConfig,
		path: ownProps.path || [],
		nominationPOCharacteristics: state.feature.nominationPOCharacteristics,
		toggleMsisdnModal: ownProps.toggleMsisdnModal,
		installationTimeslotFeatureConfiguration: state.feature.installationTimeslotConfiguration,
		workforceAvailableAppointments: state.workforce.availableAppointments,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): ProductOfferingConfigurationActionProps => {

	return {
		actions: {
			setInputtedCharacteristic: (path: ProductPath, key: string, value: string) => {
				dispatch(actions.productOfferingConfiguration.setInputtedCharacteristic(path, key, value));
			},
			setEnhancedCharacteristics: (path: ProductPath, key: string, valueArray: Array<{value: string}> | Array<string>) => {
				dispatch(actions.productOfferingConfiguration.setEnhancedCharacteristics(path, key, valueArray));
			},
			setConfigurableInstallationTime: (path: ProductPath, key: string) => {
				dispatch(actions.productOfferingConfiguration.setConfigurableInstallationTime(path, key));
			},
			selectProductOffering: (path: ProductPath, value: string, productOfferings: ProductOffering[]) => {
				dispatch(actions.productOfferingConfiguration.selectProductOffering(path, value, productOfferings));
			},
			toggleProductOffering: (path: ProductPath, forceToggle?: boolean) => {
				dispatch(actions.productOfferingConfiguration.toggleProductOffering(path, forceToggle));
			},
			clearProductOfferingErrors: () => {
				dispatch(reduxActions.error.clearProductOfferingErrors());
			},
			makeMsisdnSoftReservation: (path: ProductPath, key: string, value: string, id: string) => {
				dispatch(actions.productOfferingConfiguration.makeMsisdnSoftReservation(path, key, value, id));
			},
			updateMsisdnSoftReservation: (path: ProductPath, key: string, value: string, id: string) => {
				dispatch(actions.productOfferingConfiguration.updateMsisdnSoftReservation(path, key, value, id));
			},
			resetMsisdnSoftReservation: () => {
				dispatch(actions.productOfferingConfiguration.resetMsisdnSoftReservation());
			},
			getWorkforceAvailableAppointments: (productOfferingId: string) => dispatch(actions.workforce.getAvailability(productOfferingId)),
			resetWorkforceAvailableAppointments: () => dispatch(actions.workforce.resetAvailability()),
		}
	};
};

const mergeProps = (stateProps: ProductOfferingConfigurationStateProps, dispatchProps: ProductOfferingConfigurationActionProps,
					ownProps: ProductOfferingConfigurationContainerOwnProps): ProductOfferingConfigurationProps => {

	const { flux, ...restOwnProps } = ownProps;
	return {
		...restOwnProps,
		...stateProps,
		...dispatchProps
	};
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ProductOfferingConfiguration);
export {
	ProductOfferingConfigurationContainerOwnProps,
	VeryOwnProps,
};

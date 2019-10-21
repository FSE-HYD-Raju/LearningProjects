import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { get } from "lodash";
import { HasFlux, MessagePack } from "../../../../redux/types";
import { AppState } from "../../../../redux/reducers";
import {
	AddonActivationModal,
	AddonActivationModalActionProps,
	AddonActivationModalOwnProps, AddonActivationModalProps,
	AddonActivationModalStateProps
} from "./AddonActivationModal";
import actions from "../../../../redux/actions";
import { EnableAddonConfig, InitializeAddonConfig } from "../../../../redux/services/AddonService";

const mapStateToProps = (state: AppState): AddonActivationModalStateProps => {
	const personId = state.customerCase.activeCustomerCase
		? get(state.customerCase.activeCustomerCase, "attributes.activeCustomer.id")
		: get(state.user, "user.id");

	return {
		personId,
		planCategoriesIds: state.feature.ecarePlanCategoriesIds,
		configurations: state.productOfferingConfiguration.configurations,
		addonEnableError: state.basket.addonEnableError,
		addonInitializeInProgress: !!state.basket.addonInitializeInProgress,
		initializedAddon: state.basket.initializedAddon,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: HasFlux & AddonActivationModalOwnProps): AddonActivationModalActionProps => {
	return {
		actions: {
			initializeAddonEnabling: (params: InitializeAddonConfig) => {
				dispatch(actions.basket.initializeEnableAddon(params));
			},
			enableAddon: (config: EnableAddonConfig, messages: MessagePack) => {
				dispatch(actions.basket.enableAddon(config, messages));
			},
			discardBackendBasket: ownProps.flux.actions.BasketActions.discardBackendBasket,
			cancelAddonActivation: (basketId?: string) => {
				if (basketId) {
					ownProps.flux.actions.BasketActions.discardBackendBasket(basketId, true);
				}
				dispatch(actions.basket.clearAddonInitialization());
				dispatch(actions.productOfferingConfiguration.resetConfigurations());
			},
		}
	};
};

// this is required to omit flux property in component
const mergeProps = (stateProps: AddonActivationModalStateProps,
					dispatchProps: AddonActivationModalActionProps,
					ownProps: HasFlux & AddonActivationModalOwnProps):
	AddonActivationModalProps => {
	const { flux, ...restOwnProps } = ownProps;
	return {
		...stateProps,
		...dispatchProps,
		...restOwnProps,
	};
};

const AddonActivationModalContainer: React.ComponentClass<AddonActivationModalOwnProps & HasFlux> =
	connect(mapStateToProps, mapDispatchToProps, mergeProps)(AddonActivationModal);
export default AddonActivationModalContainer;

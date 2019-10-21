"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { BasketActionAddProductToBasket, HasFlux } from "../../../redux";

import {
	AppState,
	ProductOffering,
	ProductPath,
	MsisdnConfiguration
} from "../../../redux";

import MsisdnConfigurationModal, {
	MsisdnConfigurationModalActionProps, MsisdnConfigurationModalProps, MsisdnConfigurationModalStateProps
} from "./MsisdnConfigurationModal";
import actions from "../../../redux/actions";

interface MsisdnConfigurationModalContainerProps extends HasFlux {
	product: ProductOffering;
	saveMsisdn: (key: string, msisdnNumber: string, path: ProductPath) => void;
	userOpened: boolean;
	addProduct: BasketActionAddProductToBasket;
	toggleMsisdnModal: (visibility: boolean, userOpened?: boolean) => void;
	path: ProductPath;
	selectedNumber?: string;
	msisdnConfig: MsisdnConfiguration;
}

const mapStateToProps = (state: AppState, props: MsisdnConfigurationModalContainerProps): MsisdnConfigurationModalStateProps => {
	return {
		product: props.product,
		userOpened: props.userOpened,
		path: props.path,
		msisdnConfig: props.msisdnConfig,
		selectedMsisdn: state.msisdnSelection.selectedMsisdn,
		priceAttribute: state.feature.priceAttribute,
		configurations: state.productOfferingConfiguration.configurations
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, props: MsisdnConfigurationModalContainerProps): MsisdnConfigurationModalActionProps => ({
	actions: {
		saveNumber: (path: ProductPath, key: string, value: string) => {
			dispatch(actions.productOfferingConfiguration.setInputtedCharacteristic(path, key, value));
		},
		addProduct: props.flux.actions.BasketActions.addProductToBasket,
		handleClose: () => props.toggleMsisdnModal(false),
		selectProductOffering: (path: ProductPath, value: string, productOfferings: ProductOffering[]) => {
			dispatch(actions.productOfferingConfiguration.selectProductOffering(path, value, productOfferings));
		},
	}
});

const mergeProps = (stateProps: MsisdnConfigurationModalStateProps, dispatchProps: MsisdnConfigurationModalActionProps,
					ownProps: MsisdnConfigurationModalContainerProps): MsisdnConfigurationModalProps => {

	const { flux, ...restOwnProps } = ownProps;

	return {
		...restOwnProps,
		...stateProps,
		...dispatchProps
	};

};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(MsisdnConfigurationModal);
export { MsisdnConfigurationModalContainerProps };

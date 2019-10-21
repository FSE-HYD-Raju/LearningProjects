"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";

import {
	ProductOfferingGroupMsisdnSelectionStateProps,
	ProductOfferingGroupMsisdnSelectionActionProps,
	default as ProductOfferingGroupMsisdnSelection,
	ProductOfferingGroupMsisdnSelectionProps
} from "./ProductOfferingGroupMsisdnSelection";
import {
	AppState,
	ProductOffering,
	SimplePrice,
	ProductOfferingGroup,
	ProductPath,
	HasFlux, AddProductToBasketProps, MsisdnSofReservationInfo,
} from "../../../../redux";
import { ProductOfferingMsisdnConfigurationProps } from "../utils/ProductOfferingMsisdnConfigurationProps";
import BasketSelectors from "../../../../selectors/basket/BasketSelectors";
import actions from "../../../../redux/actions";

export interface ProductOfferingGroupMsisdnSelectionContainerProps extends HasFlux, ProductOfferingMsisdnConfigurationProps {
	msisdnReservationRequired?: boolean;
	product: ProductOffering;
	pog: ProductOfferingGroup;
	path: ProductPath;
	upfrontPrice?: SimplePrice;
	recurringPrice?: SimplePrice;
}

const mapStateToProps = (state: AppState, ownProps: ProductOfferingGroupMsisdnSelectionContainerProps):
	ProductOfferingGroupMsisdnSelectionStateProps & AddProductToBasketProps => {
	const validationPOs: Array<string> = state.feature.ICCIDPreactivationValidationPOs;
	const validIcc: boolean = !validationPOs || !validationPOs.includes(ownProps.product.id) || Boolean(state.basket.validIcc);
	return ({
		userOpened: ownProps.userOpened,
		validIcc,
		product: ownProps.product,
		pog: ownProps.pog,
		path: ownProps.path,
		upfrontPrice: ownProps.upfrontPrice,
		recurringPrice: ownProps.recurringPrice,
		msisdnConfig: ownProps.msisdnConfig,
		toggleMsisdnModal: ownProps.toggleMsisdnModal,
		msisdnModalVisible: ownProps.msisdnModalVisible,
		selectedMsisdn: state.msisdnSelection.selectedMsisdn,
		activeBasket: state.basket.activeBasket,
		activeReservationId: state.msisdn.activeReservationId,
		configurations: state.productOfferingConfiguration.configurations,
		...BasketSelectors.constructAddToBasketFunction(state, ownProps)
	});
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, props: ProductOfferingGroupMsisdnSelectionContainerProps):
	ProductOfferingGroupMsisdnSelectionActionProps => ({
	actions: {
		selectProductOffering: (path: ProductPath, value: string, productOfferings: ProductOffering[]) => {
			dispatch(actions.productOfferingConfiguration.selectProductOffering(path, value, productOfferings));
		},
		releaseMsisdn: (releaseId: string, reservedFor: string) => {
			dispatch(actions.msisdn.releaseMsisdn(releaseId, reservedFor));
		},
		// this prop will be remapped in mergeProps()
		addProduct: props.flux.actions.BasketActions.addProductToBasket,
		addProductToBasket: props.flux.actions.BasketActions.addProductToBasket,
		saveMsisdn: (key: string, msisdnNumber: string | number | undefined, path: ProductPath) => {
			dispatch(actions.productOfferingConfiguration.setInputtedCharacteristic(path, key, msisdnNumber + ""));
		}
	}
});

const mergeProps = (stateProps: ProductOfferingGroupMsisdnSelectionStateProps & AddProductToBasketProps,
					dispatchProps: ProductOfferingGroupMsisdnSelectionActionProps): ProductOfferingGroupMsisdnSelectionProps => {

	const { onAddToBasket, ...restStateProps } = stateProps;
	dispatchProps.actions.addProduct = onAddToBasket;

	return {
		...restStateProps,
		...dispatchProps
	};
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ProductOfferingGroupMsisdnSelection);

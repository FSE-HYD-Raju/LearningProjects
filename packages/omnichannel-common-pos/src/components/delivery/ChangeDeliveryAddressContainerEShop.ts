"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";

import { AppState, PostalAddress, Selectors, actions } from "../../redux";
import ChangeDeliveryAddress, {
	ChangeDeliveryAddressActionProps,
	ChangeDeliveryAddressOwnProps,
	ChangeDeliveryAddressStateProps
} from "./ChangeDeliveryAddress";
import { withCustomization } from "../../customization";
import { B2CComponentCustomizationPoints } from "../../customization";

export interface ChangeDeliveryAddressContainerEShopProps {}

const mapStateToProps = (state: AppState): Pick<ChangeDeliveryAddressStateProps, Exclude<keyof ChangeDeliveryAddressStateProps, "schema">> &
	ChangeDeliveryAddressOwnProps => ({
	countries: state.consul.countries,
	addressValidationError: state.error.addressValidationError,
	isLoggedIn: Selectors.user.isLoggedIn()(state),
	storedDeliveryAddress: state.b2cCheckout.storedDeliveryAddress,
	storedCustomer: state.b2cCheckout.storedCustomer,
	storeValidAddressOnChange: true
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): ChangeDeliveryAddressActionProps => ({
	actions: {
		clearAddressValidationError: () => dispatch(actions.error.clearAddressValidationError()),
		storeSelectedShippingAddress: (address: PostalAddress) => dispatch(actions.b2cCheckout.storeSelectedShippingAddress(address)),
		validateAddress: (address: Partial<PostalAddress>) => dispatch(actions.b2cCheckout.validateAddress(address)),
	}
});

export default withCustomization(
	B2CComponentCustomizationPoints.CHANGE_DELIVERY_ADDRESS_CONTAINER,
	connect(mapStateToProps, mapDispatchToProps)(ChangeDeliveryAddress)
);

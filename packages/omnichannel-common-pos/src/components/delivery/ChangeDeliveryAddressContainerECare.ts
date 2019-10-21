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
import PostalAddressUtil from "../../utils/user/PostalAddressUtil";
import { B2CComponentCustomizationPoints, withCustomization } from "../../customization";

export interface ChangeDeliveryAddressContainerECareProps {
	deliveryPostalAddress?: PostalAddress;
	storeSelectedShippingAddress?: (address: PostalAddress, forceUpdateAddress?: boolean) => void;
}
const mapStateToProps = (state: AppState, props: ChangeDeliveryAddressContainerECareProps):
	Pick<ChangeDeliveryAddressStateProps, Exclude<keyof ChangeDeliveryAddressStateProps, "schema">> & ChangeDeliveryAddressOwnProps => {

	const user = Selectors.user.getUser(state);
	const deliveryAddress = props.deliveryPostalAddress ||
		(user ? PostalAddressUtil.getPrimaryAddressAsTemplate(user) : {});
	return {
		countries: state.consul.countries,
		// user,
		addressValidationError: state.error.addressValidationError,
		groupPostalAddressFormFields: false,
		displayConfirmation: true,
		skipProposals: true,
		isLoggedIn: true,
		storedDeliveryAddress: deliveryAddress,
		storedCustomer: undefined,
		mode: "change-sim",
		storeValidAddressOnChange: false
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: ChangeDeliveryAddressContainerECareProps): ChangeDeliveryAddressActionProps => ({
	actions: {
		clearAddressValidationError: () => dispatch(actions.error.clearAddressValidationError()),
		storeSelectedShippingAddress: ownProps.storeSelectedShippingAddress || ((address: PostalAddress, forceUpdateAddress?: boolean) =>
			dispatch(actions.user.updatePostalAddress(address, Boolean(forceUpdateAddress)))),
		validateAddress: () => {} // validation implemented in storeSelectedShippingAddress
	}
});

export default withCustomization(
	B2CComponentCustomizationPoints.CHANGE_DELIVERY_ADDRESS_CONTAINER_ECARE,
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(ChangeDeliveryAddress)
);

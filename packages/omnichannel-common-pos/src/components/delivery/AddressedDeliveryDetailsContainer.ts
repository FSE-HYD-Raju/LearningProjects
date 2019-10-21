"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";

import {
	AddressedDeliveryDetailsStateProps,
	AddressedDeliveryDetailsActionProps,
	default as AddressedDeliveryDetails,
	AddressedDeliveryDetailsOwnProps
} from "./AddressedDeliveryDetails";
import { AppState } from "../../redux/reducers";
import actions from "../../redux/actions";
import { PostalAddress } from "../../redux/types";
import { B2CFunctionCustomizationPoints, withFunctionCustomization } from "../../customization";

const validateProposedDeliveryAddress = withFunctionCustomization(B2CFunctionCustomizationPoints.PROPOSED_DELIVERY_ADDRESS_VALIDATION,
	Boolean);

interface AddressedDeliveryDetailsContainerProps {
	postalAddress?: PostalAddress;
	storeSelectedShippingAddress?: (address: PostalAddress, forceUpdateAddress?: boolean) => void;
}

const mapStateToProps = (state: AppState, ownProps: AddressedDeliveryDetailsContainerProps):
	AddressedDeliveryDetailsStateProps & AddressedDeliveryDetailsOwnProps => ({
	postalAddress: ownProps.postalAddress,
	isPostalAddressUpdated: state.user.isPostalAddressUpdated,
	showingChangeAddressForm: state.changeSim.showingModifyAddressForm,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: AddressedDeliveryDetailsContainerProps): AddressedDeliveryDetailsActionProps => ({
	actions: {
		resetIsPostalAddressUpdated: () => dispatch(actions.user.resetIsPostalAddressUpdated()),
		setDeliveryAddressFormState: (show: boolean) => dispatch(actions.changeSim.showChangeDeliveryAddressModal(show)),
		storeSelectedShippingAddress: ownProps.storeSelectedShippingAddress,
		validateProposedDeliveryAddress,
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressedDeliveryDetails);

export {
	AddressedDeliveryDetailsContainerProps,
};

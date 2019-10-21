"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import {
	DeliverySelectionStateProps,
	DeliverySelectionActionProps,
	default as DeliverySelection,
	DeliverySelectionOwnProps
} from "../delivery/DeliverySelection";
import { AppState } from "../../redux/reducers";
import { changeSim } from "../../redux/models/eCare/changeSim/changeSim.actions";
import { PostalAddress } from "../../redux/types";

const mapStateToProps = (state: AppState): DeliverySelectionStateProps & DeliverySelectionOwnProps => ({
	selectedShippingMethod: state.changeSim.selectedShippingMethod,
	shippingMethods: state.changeSim.shippingMethods,
	deliveryPostalAddress: state.changeSim.deliveryAddress && state.changeSim.deliveryAddress.postalAddress,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DeliverySelectionActionProps => ({
	actions: {
		onSelectShippingMethod: selectedShippingMethod =>
			dispatch(changeSim.selectShippingMethod(selectedShippingMethod)),
		storeSelectedShippingAddress: (address: PostalAddress, forceUpdateAddress?: boolean) =>
			dispatch(changeSim.changeDeliveryAddress(address, Boolean(forceUpdateAddress))),
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(DeliverySelection);

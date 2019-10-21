import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { AppState, HasFlux } from "omnichannel-common-pos";
import BarcodeInput, { BarcodeInputActionProps, BarcodeInputProps, BarcodeInputStateProps } from "./BarcodeInput";

const mapStateToProps = (state: AppState): BarcodeInputStateProps => {
	return {
		barcode: "",
		activeCustomerCase: state.customerCase.activeCustomerCase,
		activeBasket: state.basket.activeBasket,
		productNotFound: false,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: HasFlux): BarcodeInputActionProps => ({
	actions: {
		findProduct: ownProps.flux.actions.SalesActions.findProduct,
		saveBarcode: ownProps.flux.actions.SalesActions.saveBarcode,
	}
});

const mergeProps = (stateProps: BarcodeInputStateProps, dispatchProps: BarcodeInputActionProps, ownProps: HasFlux): BarcodeInputProps => {
	return {
		...stateProps,
		...dispatchProps
	};
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(BarcodeInput);

"use strict";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, AnyAction } from "redux";
import { AppState } from "../../../redux/reducers";
import CheckoutRecurringTopUpConfiguration, {
	Props,
	CheckoutRecurringTopUpConfigurationStateProps,
	CheckoutRecurringTopUpConfigurationActionProps,
} from "./CheckoutRecurringTopUpConfiguration";
import { actions } from "../../../redux";

const mapStateToProps = (state: AppState): CheckoutRecurringTopUpConfigurationStateProps => {
	return {
		basketItems: state.basket.basketItems || state.basket.committedBasketItems || state.basket.submittedBasketItems,
		productsWithTopUps: state.basket.productsWithTopUps,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): CheckoutRecurringTopUpConfigurationActionProps => ({
	actions: {
		handleStoreCustomerPaymentMethodSelection: (isStored: boolean) => {
			dispatch(actions.payment.handleStoreCustomerPaymentMethodSelection(isStored));
		}
	}
});

const mergeProps = (stateProps: CheckoutRecurringTopUpConfigurationStateProps, dispatchProps: CheckoutRecurringTopUpConfigurationActionProps): Props => {
	return {
		...stateProps,
		...dispatchProps
	};
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CheckoutRecurringTopUpConfiguration);

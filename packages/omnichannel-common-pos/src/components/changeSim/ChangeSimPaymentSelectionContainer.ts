"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import {
	ChangeSimPaymentSelectionStateProps,
	ChangeSimPaymentSelectionActionProps,
	default as ChangeSimPaymentSelection,
} from "./ChangeSimPaymentSelection";
import { AppState } from "../../redux/reducers";
import { changeSim } from "../../redux/models/eCare/changeSim/changeSim.actions";

const mapStateToProps = (state: AppState): ChangeSimPaymentSelectionStateProps => ({
	selectedPaymentMethod: state.changeSim.selectedPaymentMethod,
	selectedCustomerPaymentMethod: state.changeSim.selectedCustomerPaymentMethod,
	paymentMethods: state.changeSim.paymentMethods,
	cashPaymentEnabled: false, // TODO: implement
	cashPaymentIdentifiers: [], // TODO: implement,
	customerPaymentMethods: state.payment.customerPaymentMethods
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): ChangeSimPaymentSelectionActionProps => ({
	actions: {
		onSelectPaymentMethod: (selectedPaymentMethod?: string) =>
			dispatch(changeSim.selectPaymentMethod(selectedPaymentMethod)),
		onSelectCustomerPaymentMethod: (selectedCustomerPaymentMethodId?: string) =>
			dispatch(changeSim.selectCustomerPaymentMethod(selectedCustomerPaymentMethodId))
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeSimPaymentSelection);

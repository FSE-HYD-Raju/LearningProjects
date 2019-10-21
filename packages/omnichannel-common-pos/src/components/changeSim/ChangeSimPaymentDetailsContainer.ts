"use strict";

import * as React from "react";
import { connect } from "react-redux";
import { default as PaymentDetails, PaymentDetailsProps } from "../payment/PaymentDetails";
import { AppState } from "../../redux/reducers";
import { Selectors } from "../../redux";

const mapStateToProps = (state: AppState): PaymentDetailsProps => {
	return {
		selectedPaymentMethod: state.changeSim.selectedPaymentMethod,
		feeProduct: state.changeSim.selectedReason,
		mainBalance: Selectors.changeSim.getMonetaryChargingBalance(state)
	};
};

export default connect(mapStateToProps)(PaymentDetails);

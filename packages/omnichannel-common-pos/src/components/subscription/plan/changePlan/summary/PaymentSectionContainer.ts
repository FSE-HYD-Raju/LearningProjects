"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";

import { PaymentSectionProps, PaymentSection } from "./PaymentSection";
import { AppState } from "../../../../../redux/reducers/index";
import { Selectors } from "../../../../../redux";
import PaymentUtil from "../../../../../utils/PaymentUtil";

interface PaymentSectionContainerProps {}

const mapStateToProps = (state: AppState, ownProps: PaymentSectionContainerProps): PaymentSectionProps => {
	const selectedPaymentMethod = Selectors.changePlan.getSelectedPaymentMethod(state);
	return {
		isSelectedMethodBalance: (selectedPaymentMethod && PaymentUtil.isBalancePaymentMethod(selectedPaymentMethod)) || false,
		paymentMethodName: (selectedPaymentMethod && selectedPaymentMethod.label) || "",
	};
};

const PaymentSectionContainer = connect(mapStateToProps)(PaymentSection);
export { PaymentSectionContainer, PaymentSectionContainerProps };

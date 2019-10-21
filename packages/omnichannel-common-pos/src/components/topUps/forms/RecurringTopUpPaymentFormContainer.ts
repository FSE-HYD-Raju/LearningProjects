"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";

import { RecurringTopUpPaymentFormStateProps, default as RecurringTopUpPaymentForm } from "./RecurringTopUpPaymentForm";
import { AppState } from "../../../redux/reducers";
import { Selectors } from "../../../redux";

const mapStateToProps = (state: AppState): RecurringTopUpPaymentFormStateProps => ({
	customerPaymentMethods: Selectors.digitalLife.getActiveCustomerPaymentMethods(state),
	allowUsingNewCreditCard: state.digitalLife.allowUsingNewCreditCardForRecurringTopUp,
});

export default connect(mapStateToProps)(RecurringTopUpPaymentForm);

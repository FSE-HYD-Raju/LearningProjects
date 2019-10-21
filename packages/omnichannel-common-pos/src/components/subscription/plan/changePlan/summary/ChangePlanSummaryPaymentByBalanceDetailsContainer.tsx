"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { AppState } from "../../../../../redux/reducers/index";
import { PaymentByBalanceDetails, PaymentByBalanceDetailsProps, PaymentFee } from "../../../../payment/PaymentByBalanceDetails";
import { Selectors } from "../../../../../redux";
import FormattedMessage from "../../../../../channelUtils/FormattedMessage";
import messages from "./ChangePlanSummary.messages";

interface ChangePlanSummaryPaymentByBalanceDetailsContainerProps {}

const mapStateToProps = (state: AppState, ownProps: ChangePlanSummaryPaymentByBalanceDetailsContainerProps): PaymentByBalanceDetailsProps => {
	const activationFee: PaymentFee = {
		label: <FormattedMessage {...messages.changePlanFeePaymentRowLabel} />,
		price: Selectors.changePlan.getChangePlanFee(state),
	};
	const firstMonthFee: PaymentFee = {
		label: <FormattedMessage {...messages.newPlanFirstMonthFeePaymentRowLabel} values={{value: Selectors.changePlan.getSelectedPlanName(state)}}/>,
		price: Selectors.changePlan.getChangePlanFirstMonthFee(state),
	};
	return {
		fees: [activationFee, firstMonthFee],
		mainBalance: Selectors.changePlan.getBalance(state),
	};
};

const ChangePlanSummaryPaymentByBalanceDetailsContainer = connect(mapStateToProps)(PaymentByBalanceDetails);
export { ChangePlanSummaryPaymentByBalanceDetailsContainer, ChangePlanSummaryPaymentByBalanceDetailsContainerProps };

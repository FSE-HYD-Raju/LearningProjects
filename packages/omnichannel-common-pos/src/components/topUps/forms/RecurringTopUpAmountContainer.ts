"use strict";

import * as React from "react";
import { connect } from "react-redux";

import {
	RecurringTopUpAmountProps,
	RecurringTopUpAmount,
} from "./RecurringTopUpAmount";
import { AppState } from "../../../redux/reducers";

type RecurringTopUpAmountContainerProps = Pick<RecurringTopUpAmountProps, Exclude<keyof RecurringTopUpAmountProps, "currency">>;

const mapStateToProps = (state: AppState, ownProps: RecurringTopUpAmountContainerProps): RecurringTopUpAmountProps => ({
	...ownProps,
	currency: state.currency.selectedCurrency,
});

export { RecurringTopUpAmountProps };
export default connect(mapStateToProps)(RecurringTopUpAmount);

"use strict";

import * as React from "react";
import { connect } from "react-redux";

import {
	RecurringTopUpThresholdFormProps,
	RecurringTopUpThresholdFormOwnProps,
	default as RecurringTopUpThresholdForm,
} from "./RecurringTopUpThresholdForm";
import { AppState } from "../../../redux/reducers";
import { RecurringTopUpUtil } from "../RecurringTopUpUtil";

type RecurringTopUpThresholdFormContainerProps = Pick<RecurringTopUpThresholdFormOwnProps, Exclude<keyof RecurringTopUpThresholdFormOwnProps, "currency">>;

const mapStateToProps = (state: AppState, viewOwnProps: RecurringTopUpThresholdFormContainerProps): RecurringTopUpThresholdFormProps => ({
	...viewOwnProps,
	thresholdValues:  RecurringTopUpUtil.getThresholdValues(state, viewOwnProps.editMode) || [],
	thresholdTopUpValues: RecurringTopUpUtil.getThresholdTopUpValues(state, viewOwnProps.editMode) || [],
	limitInMonthValues: RecurringTopUpUtil.getThresholdLimitInMonthValues(state, viewOwnProps.editMode) || [],
	currency: state.currency.selectedCurrency,
});

export { RecurringTopUpThresholdFormContainerProps };
export default connect(mapStateToProps)(RecurringTopUpThresholdForm);

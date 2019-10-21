"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";

import {
	RecurringTopUpMonthlyFormProps,
	RecurringTopUpMonthlyFormOwnProps,
	RecurringTopUpMonthlyFormActionProps,
	default as RecurringTopUpMonthlyForm
} from "./RecurringTopUpMonthlyForm";
import { AppState } from "../../../redux/reducers";
import { RecurringTopUpUtil } from "../RecurringTopUpUtil";

const mapStateToProps = (state: AppState, viewOwnProps: RecurringTopUpMonthlyFormOwnProps): RecurringTopUpMonthlyFormProps => ({
	...viewOwnProps,
	monthlyTopUpValues: RecurringTopUpUtil.getMonthlyTopUpValues(state, viewOwnProps.editMode) || [],
});

export default connect(mapStateToProps)(RecurringTopUpMonthlyForm);

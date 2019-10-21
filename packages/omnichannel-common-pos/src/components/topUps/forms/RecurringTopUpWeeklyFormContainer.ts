"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";

import {
	RecurringTopUpWeeklyFormProps,
	RecurringTopUpWeeklyFormOwnProps,
	RecurringTopUpWeeklyFormActionProps,
	default as RecurringTopUpWeeklyForm
} from "./RecurringTopUpWeeklyForm";
import { AppState } from "../../../redux/reducers";
import { RecurringTopUpUtil } from "../RecurringTopUpUtil";

const mapStateToProps = (state: AppState, viewOwnProps: RecurringTopUpWeeklyFormOwnProps): RecurringTopUpWeeklyFormProps => ({
	...viewOwnProps,
	weeklyTopUpValues: RecurringTopUpUtil.getWeeklyTopUpValues(state, viewOwnProps.editMode) || [],
});

export default connect(mapStateToProps)(RecurringTopUpWeeklyForm);

"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";

import {
	ChangePlanSummaryModalProps,
	ChangePlanSummaryModalStateProps,
	ChangePlanSummaryModalActionProps,
	ChangePlanSummaryModal,
} from "./ChangePlanSummaryModal";
import { AppState, Selectors } from "../../../../../redux/index";
import actions from "../../../../../redux/actions/index";

interface ChangePlanModalSummaryContainerProps {
	backLinkPath: string;
}

const mapStateToProps = (state: AppState, ownProps: ChangePlanModalSummaryContainerProps): ChangePlanSummaryModalStateProps => ({
	isProceedWithChangePlanEnabled: Selectors.changePlan.canProceedWithChangePlan(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: ChangePlanModalSummaryContainerProps): ChangePlanSummaryModalActionProps => ({
	actions: {
		cancel: () => {
			dispatch(actions.changePlan.cancelChangePlan());
		},
		proceed: () => {
			dispatch(actions.changePlan.proceedChangePlan(ownProps.backLinkPath));
		},
	},
});

const ChangePlanSummaryModalContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ChangePlanSummaryModal);
export { ChangePlanSummaryModalContainer, ChangePlanModalSummaryContainerProps };

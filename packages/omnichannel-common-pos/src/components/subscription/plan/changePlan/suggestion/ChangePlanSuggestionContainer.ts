"use strict";

import { ChangePlanSuggestion, ChangePlanSuggestionProps } from "./ChangePlanSuggestion";
import { connect } from "react-redux";
import { AppState } from "../../../../../redux";
import { Selectors } from "../../../../../redux/index";

interface ChangePlanSuggestionContainerProps {
	backLinkPath: string;
}

const mapStateToProps = (state: AppState, ownProps: ChangePlanSuggestionContainerProps): ChangePlanSuggestionProps => {
	return {
		backLinkPath: ownProps.backLinkPath,
		phoneNumber: Selectors.changePlan.getCurrentPlanPhoneNumber(state),
		isChangePlanModalShown: state.changePlan.isChangePlanSummaryModalShown,
		isInitialized: !!state.changePlan.agreementId,
	};
};

const ChangePlanSuggestionContainer = connect(mapStateToProps)(ChangePlanSuggestion);
export { ChangePlanSuggestionContainer, ChangePlanSuggestionContainerProps };

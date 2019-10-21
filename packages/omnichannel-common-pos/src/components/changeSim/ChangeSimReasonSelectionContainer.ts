"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";

import {
	ChangeSimReasonSelectionStateProps,
	ChangeSimReasonSelectionActionProps,
	default as ChangeSimReasonSelection
} from "./ChangeSimReasonSelection";
import { ProductOffering } from "../../redux/types";
import { changeSim } from "../../redux/models/eCare/changeSim/changeSim.actions";
import { AppState } from "../../redux/reducers";

const mapStateToProps = (state: AppState): ChangeSimReasonSelectionStateProps => {
	return {
		reasons: state.changeSim.reasons,
		selectedReason: state.changeSim.selectedReason
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): ChangeSimReasonSelectionActionProps => ({
	actions: {
		onSelectReason: (selectedReason?: ProductOffering) => dispatch(changeSim.selectReason(selectedReason))
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeSimReasonSelection);

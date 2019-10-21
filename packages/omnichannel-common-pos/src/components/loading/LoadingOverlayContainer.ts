"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import LoadingOverlay, { LoadingOverlayActionProps, LoadingOverlayStateProps } from "./LoadingOverlay";
import { AppState } from "../../redux/reducers";
import actions from "../../redux/actions";

const mapStateToProps = (state: AppState): LoadingOverlayStateProps => ({
	ongoingRequests: state.loadingOverlay.ongoingRequests,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): LoadingOverlayActionProps => ({
	actions: {
		resetLoadingOverlay: () => {dispatch(actions.loadingOverlay.resetLoadingOverlay()); }
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadingOverlay);

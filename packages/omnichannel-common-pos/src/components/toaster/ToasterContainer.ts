"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import Toaster, { ToasterActionProps, ToasterOwnProps, ToasterStateProps } from "./Toaster";
import { AppState } from "../../redux/reducers";
import actions from "../../redux/actions";

const mapStateToProps = (state: AppState, ownProps: ToasterOwnProps): ToasterStateProps & ToasterOwnProps => ({
	...ownProps,
	success: state.toaster.success,
	error: state.toaster.error,
	info: state.toaster.info,
	warning: state.toaster.warning,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): ToasterActionProps => ({
	actions: {
		clearMessages: () => dispatch(actions.toaster.clearMessages()),
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Toaster);

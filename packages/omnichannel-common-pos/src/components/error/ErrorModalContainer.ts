"use strict";

import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../../redux/reducers";
import ErrorModal from "./ErrorModal";
import { ErrorModalContentsProps } from "./ErrorModalContents";

const mapStateToProps = (state: AppState, ownProps: ErrorModalContentsProps): ErrorModalContentsProps => ({
	error: ownProps.error ? ownProps.error : state.error.error,
	onClose: ownProps.onClose
});

export default connect(mapStateToProps)(ErrorModal);

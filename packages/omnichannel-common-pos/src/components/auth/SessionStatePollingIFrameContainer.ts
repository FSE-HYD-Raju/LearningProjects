import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { AppState } from "../../redux/reducers";
import actions from "../../redux/actions";
import SessionStatePollingIFrame, { SessionStatePollingIFrameActionProps, SessionStatePollingIFrameStateProps } from "./SessionStatePollingIFrame";

const mapStateToProps = (state: AppState): SessionStatePollingIFrameStateProps => {
	return {
		checkSessionIFrameUrl: state.auth.openIdConfiguration ? state.auth.openIdConfiguration.check_session_iframe : undefined,
		sessionCheckIntervalSeconds: state.auth.sessionCheckIntervalSeconds,
		clientId: state.auth.clientId
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): SessionStatePollingIFrameActionProps => {
	return {
		actions: {
			logout: () => {dispatch(actions.user.logout()); },
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionStatePollingIFrame);

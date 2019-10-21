import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { AppState } from "../../redux/reducers";
import AALoginCallback, {
	AALoginCallbackActionProps,
	AALoginCallbackProps,
	AALoginCallbackStateProps
} from "./AALoginCallback";
import { HasFlux } from "../../redux/types";
import actions from "../../redux/actions";

const mapStateToProps = (state: AppState, ownProps: RouteComponentProps<any>): AALoginCallbackStateProps => {
	return {
		path: state.uriLocation.path,
		query: state.uriLocation.query,
		loginCallbackQuery: ownProps.location.search,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: HasFlux & RouteComponentProps<any>): AALoginCallbackActionProps => {
	return {
		actions: {
			aaLoginCallback: ownProps.flux.actions.UserActions.aaLoginCallback,
			aaLogin:(anonymousUser?: boolean, loginHint?: string) => {
				dispatch(actions.user.aaLogin({ anonymousUser, loginHint }));
			},
			historyPush: (to: string) => {
				ownProps.history.push(to);
			}

		}
	};
};

const mergeProps = (stateProps: AALoginCallbackStateProps, dispatchProps: AALoginCallbackActionProps, ownProps: HasFlux & RouteComponentProps<any>):
	AALoginCallbackProps => {
	const { flux, ...restOwnProps } = ownProps;
	return {
		...stateProps,
		...dispatchProps,
		...restOwnProps,
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps, mergeProps)(AALoginCallback));

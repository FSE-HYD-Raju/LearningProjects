import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { AppState } from "../redux/reducers";
import actions from "../redux/actions";

export interface BootstrapperProps {
	children: React.ReactNode;
	isConsulInitialized: boolean;
	isStylesLoaded: boolean;
	isSettingsLoaded: boolean;
}

export interface BootstrapperActionProps {
	onInitialize(): void;
}

class Bootstrapper extends React.Component<BootstrapperProps & BootstrapperActionProps> {

	componentWillMount() {
		this.props.onInitialize();
	}

	shouldRenderApplication = () => {
		return (
			this.props.isConsulInitialized &&
			this.props.isSettingsLoaded
		);
	};

	render() {
		return this.shouldRenderApplication() ? (
			<React.Fragment>{this.props.children}</React.Fragment>
		) : null;
	}
}

const mapStateToProps = (state: AppState, ownProps: { children: React.ReactNode }): BootstrapperProps => {
	return {
		isConsulInitialized: state.consul.initialized,
		isStylesLoaded: state.cms.stylesLoaded,
		isSettingsLoaded: state.auth.settingsLoaded,
		...ownProps
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): BootstrapperActionProps => {
	return {
		onInitialize: () => {
			dispatch(actions.consul.getValues());
			dispatch(actions.consul.getServiceLocations());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Bootstrapper);

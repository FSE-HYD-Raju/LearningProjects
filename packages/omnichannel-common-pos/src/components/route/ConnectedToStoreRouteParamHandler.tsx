import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";

export interface ConnectedToStoreRouteParamHandlerOwnProps {
	currentValue: string | undefined;
	paramName?: string;
	uniqId?: string;
}
export interface ConnectedToStoreRouteParamHandlerActionProps {
	actions: {
		setNewValue: (newValue: string | undefined) => void;
		onValueChange?: (newValue: string | undefined, oldValue: string | undefined) => void;
	};
}

export interface ConnectedToStoreRouteParamHandlerProps extends ConnectedToStoreRouteParamHandlerOwnProps, RouteComponentProps<any> {}
class ConnectedToStoreRouteParamHandler extends React.Component<ConnectedToStoreRouteParamHandlerProps & ConnectedToStoreRouteParamHandlerActionProps> {

	getNewValue() {
		return this.props.match.params[this.props.paramName || "value"];
	}

	componentDidUpdate() {
		this.handleParamValueChange();
	}

	componentDidMount() {
		this.handleParamValueChange();
	}

	componentWillReceiveProps(newProps: ConnectedToStoreRouteParamHandlerProps): void {
		if (this.props.uniqId !== newProps.uniqId && this.props.actions.onValueChange) {
			this.props.actions.onValueChange(this.props.currentValue, this.props.currentValue);
		}
	}

	handleParamValueChange() {
		const newValue = this.getNewValue();
		if (this.props.currentValue !== newValue) {
			this.props.actions.setNewValue(newValue);
			if (this.props.actions.onValueChange) {
				this.props.actions.onValueChange(newValue, this.props.currentValue);
			}
		}
	}
	render() {
		return null;
	}
}
export default ConnectedToStoreRouteParamHandler;

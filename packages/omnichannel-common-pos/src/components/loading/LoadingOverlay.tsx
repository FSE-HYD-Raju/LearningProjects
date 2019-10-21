import { PureComponent } from "react";
import cssns from "../../utils/cssnsConfig";
import * as classnames from "classnames";
import LoadingSpinner from "./LoadingSpinner";
const { React } = cssns("LoadingOverlay");

const REQUEST_TIMEOUT_BEFORE_SHOWING_SPINNER = 1000;
const SPINNER_FADEIN_TIME = 10;
const SPINNER_FADEOUT_TIME = 300;

interface LoadingOverlayStateProps {
	ongoingRequests: string[];
}

interface LoadingOverlayActionProps {
	actions: {
		resetLoadingOverlay: () => void;
	};
}

type LoadingOverlayProps = LoadingOverlayStateProps & LoadingOverlayActionProps;

interface LoadingOverlayState {
	showLoadingLayer: boolean;
	requestInProcess: boolean;
	loadingLayerFadedIn: boolean;
}

class LoadingOverlay extends PureComponent<LoadingOverlayProps, LoadingOverlayState> {

	constructor(props: LoadingOverlayProps) {
		super(props);

		this.state = {
			showLoadingLayer: false,
			requestInProcess: false,
			loadingLayerFadedIn: false
		};
	}

	componentWillReceiveProps(newprops: LoadingOverlayProps) {
		const hasOnGoingRequests = newprops.ongoingRequests && newprops.ongoingRequests.length > 0;

		if (hasOnGoingRequests && !this.state.requestInProcess) {
			this.setState({ requestInProcess: true }, () => {
				setTimeout(() => {
					if (this.state.requestInProcess) {
						this.setState({
							showLoadingLayer: true
						});
						setTimeout(() => {
							this.setState({
								loadingLayerFadedIn: true
							});
						}, SPINNER_FADEIN_TIME);
					}
				}, REQUEST_TIMEOUT_BEFORE_SHOWING_SPINNER);
			});
		} else if (!hasOnGoingRequests) {
			this.setState({
				requestInProcess: false,
				loadingLayerFadedIn: false
			});
			setTimeout(() => {
				this.setState({
					showLoadingLayer: false
				});
			}, SPINNER_FADEOUT_TIME);

		}
	}

	resetLoadingOverlay = () => {
		this.props.actions.resetLoadingOverlay();
	};

	render() {
		const overlayClasses = classnames({
			this: true,
			hidden: !this.state.showLoadingLayer,
			"faded-in": this.state.loadingLayerFadedIn
		});

		return (
			<div className={overlayClasses}>
				<LoadingSpinner>
					<i
						className="close fa fa-times"
						aria-hidden="true"
						onClick={this.resetLoadingOverlay}
					/>
				</LoadingSpinner>
			</div>
		);
	}
}

export default LoadingOverlay;

export {
	LoadingOverlayProps,
	LoadingOverlayState,
	LoadingOverlayStateProps,
	LoadingOverlayActionProps
};

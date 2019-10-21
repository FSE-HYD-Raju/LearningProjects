import { Component } from "react";
import cssnsConfig from "../../utils/cssnsConfig";
import Cookies from "universal-cookie";
const { React } = cssnsConfig("SessionStatePollingIFrame");

interface SessionStatePollingIFrameActionProps {
	actions: {
		logout: () => void;
	};
}

interface SessionStatePollingIFrameStateProps {
	checkSessionIFrameUrl: string | undefined;
	sessionCheckIntervalSeconds: number;
	clientId?: string;
}

type SessionStatePollingIFrameProps = SessionStatePollingIFrameStateProps & SessionStatePollingIFrameActionProps;

interface SessionStatePollingIFrameState {
	target?: string;
	interval?: number;
	logoutInitiated: boolean;
}

class SessionStatePollingIFrame extends Component<SessionStatePollingIFrameProps, SessionStatePollingIFrameState> {

	static displayName = "SessionStatePollingIFrame";

	iFrame: HTMLIFrameElement | null;

	constructor(props: SessionStatePollingIFrameProps) {
		super(props);
		this.state = {logoutInitiated: false};
		this.iFrame = null;
	}

	componentWillReceiveProps(props: SessionStatePollingIFrameProps) {
		const sessionCheckIframeUrl = props.checkSessionIFrameUrl;
		if (sessionCheckIframeUrl) {
			const parser = document.createElement("a");
			parser.href = sessionCheckIframeUrl;
			const target = parser.protocol + "//" + parser.hostname + ":" + parser.port;
			this.setState({target});
			this.restartChecking(target);
		}
	}

	componentWillUnmount() {
		window.removeEventListener("message", this.receiveMessage(this.state.target), false);
		this.stopChecking();
	}

	shouldComponentUpdate(newProps: SessionStatePollingIFrameProps) {
		const props = this.props;
		return (
			props.sessionCheckIntervalSeconds !== newProps.sessionCheckIntervalSeconds ||
			props.checkSessionIFrameUrl !== newProps.checkSessionIFrameUrl ||
			props.clientId !== newProps.clientId
		);
	}

	reRegisterEventListener = (target: string) => {
		window.removeEventListener("message", this.receiveMessage(target), false);
		window.addEventListener("message", this.receiveMessage(target), false);
	};

	restartChecking = (target?: string) => {
		if (target) {
			this.stopChecking();
			this.reRegisterEventListener(target);
			this.checkStatus(target);
			// Check status every X seconds
			const interval = setInterval(
				this.checkStatus(target),
				1000 * this.props.sessionCheckIntervalSeconds
			) as any as number;
			this.setState({interval});
		}
	};

	stopChecking = () => {
		if (this.state.interval) {
			clearInterval(this.state.interval);
		}
	};

	logout = () => {
		if (!this.state.logoutInitiated) {
			this.setState({logoutInitiated: true});
			this.props.actions.logout();
		}
	};

	checkStatus = (targetOrigin: string) => {
		return () => {
			const cookies = new Cookies();
			const sessionState = cookies.get("session_state");
			if (sessionState && targetOrigin) {
				this.iFrame!.contentWindow!.postMessage(this.props.clientId + " " + sessionState, targetOrigin);
			} else {
				window.console.log(`Not checking since targetOrigin=${targetOrigin} and sessionState=${sessionState}`);
			}
		};
	};

	receiveMessage = (target?: string) => {
		return (event: any) => {
			if (event.origin !== target) {
				// Origin did not come from the OP; this message must be rejected
				return;
			}
			if (event.data === "unchanged") {
				window.console.log("unchanged!");
				// User is still logged in to the OP
			} else {
				window.console.log("Session ended, logging out.");
				this.logout();
			}
		};
	};

	render() {
		const sessionCheckUrl = this.props.checkSessionIFrameUrl;

		return (
			<iframe
				id="SessionStatePollingIFrame"
				ref={iFrame => {this.iFrame = iFrame; }}
				src={sessionCheckUrl}
				frameBorder="0"
				width="0"
				height="0"
			/>
		);
	}
}

export default SessionStatePollingIFrame;

export {
	SessionStatePollingIFrameStateProps,
	SessionStatePollingIFrameActionProps,
	SessionStatePollingIFrameProps,
	SessionStatePollingIFrameState
};

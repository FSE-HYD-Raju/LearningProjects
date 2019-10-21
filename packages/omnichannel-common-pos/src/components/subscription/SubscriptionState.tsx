import * as React from "react";
import { FormattedMessage } from "../../channelUtils";
import subscriptionMessages from "./Subscription.messages";

interface SubscriptionStateProps {
	state: string;
	past?: boolean;
}

const SubscriptionState: React.FC<SubscriptionStateProps> = props => {
	const { state = "", past } = props;
	switch (state.toLowerCase()) {
		case "suspend":
			if (past) {
				return (<FormattedMessage {...subscriptionMessages.stateSuspended}/>);
			} else {
				return (<FormattedMessage {...subscriptionMessages.stateSuspend}/>);
			}
		case "disable":
			if (past) {
				return (<FormattedMessage {...subscriptionMessages.stateDisabled}/>);
			} else {
				return (<FormattedMessage {...subscriptionMessages.stateDisable}/>);
			}
		case "deactivate":
			if (past) {
				return (<FormattedMessage {...subscriptionMessages.stateDeactivated}/>);
			} else {
				return (<FormattedMessage {...subscriptionMessages.stateDeactivate}/>);
			}
		case "reactivate":
			if (past) {
				return (<FormattedMessage {...subscriptionMessages.stateReactivated}/>);
			} else {
				return (<FormattedMessage {...subscriptionMessages.stateReactivate}/>);
			}
		case "resume":
			if (past) {
				return (<FormattedMessage {...subscriptionMessages.stateResumed}/>);
			} else {
				return (<FormattedMessage {...subscriptionMessages.stateResume}/>);
			}
		case "enable":
			if (past) {
				return (<FormattedMessage {...subscriptionMessages.stateEnabled}/>);
			} else {
				return (<FormattedMessage {...subscriptionMessages.stateEnable}/>);
			}
		default:
			window.console.error("Unidentified subscription state: " + state);
			return null;
	}
};

export default SubscriptionState;
export {
	SubscriptionStateProps
};

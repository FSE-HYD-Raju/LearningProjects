import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { FormattedMessageDescriptor } from "../../../channelUtils";
import stateChangeMessages from "./StateChange.messages";

interface SubscriptionStateNounPropsOwnProps {
	state: string;
	textTransformer?: (text: string | undefined) => string;
}

interface SubscriptionStateNounProps extends SubscriptionStateNounPropsOwnProps, InjectedIntlProps {}

const SubscriptionStateNoun: React.FC<SubscriptionStateNounProps> = props => {
	const { state } = props;
	const textTransformer = props.textTransformer ? props.textTransformer : (text: string | undefined) => text;
	let messageFormattingProps: FormattedMessageDescriptor | undefined;

	switch (state) {
		case "suspend":
			messageFormattingProps = {
				...stateChangeMessages.suspend,
				defaultMessage: textTransformer(stateChangeMessages.suspend.defaultMessage)
			};
			break;
		case "deactivate":
		case "deactivation":
		case "disable":
			messageFormattingProps = {
				...stateChangeMessages.deactivate,
				defaultMessage: textTransformer(stateChangeMessages.deactivate.defaultMessage)
			};
			break;
		case "reactivate":
			messageFormattingProps = {
				...stateChangeMessages.reactivate,
				defaultMessage: textTransformer(stateChangeMessages.reactivate.defaultMessage)
			};
			break;
		case "resume":
			messageFormattingProps = {
				...stateChangeMessages.resume,
				defaultMessage: textTransformer(stateChangeMessages.resume.defaultMessage)
			};
			break;
		case "activate":
		case "activation":
		case "enable":
			messageFormattingProps = {
				...stateChangeMessages.activate,
				defaultMessage: textTransformer(stateChangeMessages.activate.defaultMessage)
			};
			break;
		default:
			window.console.error("Unidentified subscription state: " + state);
	}

	if (!messageFormattingProps) {
			return null;
		}

	return (
			<span className="SubscriptionStateNoun">
				{props.intl.formatMessage(messageFormattingProps)}
			</span>
		);
};

SubscriptionStateNoun.displayName = "SubscriptionStateNoun";

export default injectIntl<SubscriptionStateNounPropsOwnProps>(SubscriptionStateNoun);
export {
	SubscriptionStateNounPropsOwnProps,
	SubscriptionStateNounProps
};

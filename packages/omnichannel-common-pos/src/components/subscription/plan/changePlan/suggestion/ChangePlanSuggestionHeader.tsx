import * as R from "react";
import cssns from "../../../../../utils/cssnsConfig";
import messages from "./ChangePlanSuggestion.messages";
import { Link } from "react-router-dom";
import FormattedMessage from "../../../../../channelUtils/FormattedMessage";
const React = cssns("ChangePlanSuggestion").React as typeof R;

interface ChangePlanSuggestionHeaderProps {
	phoneNumber: string;
	backLinkPath: string;
}
const ChangePlanSuggestionHeader: React.FC<ChangePlanSuggestionHeaderProps> = props => (
	<header className="b2c-body-content-header suggestion-header">
		<span className="link-to-subscription-summary-page">
			<i className="fa fa-chevron-left link-to-subscription-summary-page-icon" />
			<Link
				id="linkToSubscriptionSummaryPage"
				to={{
					pathname: props.backLinkPath,
				}}
				className="btn-link link-to-subscription-summary-page-link"
			>
				{props.phoneNumber}
			</Link>
		</span>
		<h1 className="b2c-title header">
			<FormattedMessage {...messages.changePlanSuggestionHeader} />
		</h1>
	</header>
);

export { ChangePlanSuggestionHeader, ChangePlanSuggestionHeaderProps };

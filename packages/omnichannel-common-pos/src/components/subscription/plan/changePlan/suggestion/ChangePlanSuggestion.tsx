import messages from "./ChangePlanSuggestion.messages";
import cssns from "../../../../../utils/cssnsConfig";
import FormattedMessage from "../../../../../channelUtils/FormattedMessage";
import { AvailablePlansContainer } from "./AvailablePlansContainer";
import { CurrentPlanInfoContainer } from "../summary/CurrentPlanInfoContainer";
import { ChangePlanSummaryModalContainer } from "../summary/ChangePlanSummaryModalContainer";
import { ChangePlanSuggestionHeader } from "./ChangePlanSuggestionHeader";
import { Redirect } from "react-router";

const { React } = cssns("ChangePlanSuggestion");

interface ChangePlanSuggestionOwnProps {
	backLinkPath: string;
}
interface ChangePlanSuggestionStateProps {
	phoneNumber: string;
	isChangePlanModalShown: boolean;
	isInitialized: boolean;
}

interface ChangePlanSuggestionProps extends ChangePlanSuggestionOwnProps, ChangePlanSuggestionStateProps {}

const ChangePlanSuggestion: React.FC<ChangePlanSuggestionProps> = props =>
	!props.isInitialized ? (
		<Redirect to={props.backLinkPath} />
	) : (
		<div className="container">
			<ChangePlanSuggestionHeader phoneNumber={props.phoneNumber} backLinkPath={props.backLinkPath} />
			<div className="b2c-body-content-body suggestion-body">
				<div className="ChangePlanSuggestion-container">
					<div className="plans">
						<h4>
							<FormattedMessage {...messages.currentPlan} />
						</h4>
						<CurrentPlanInfoContainer />
					</div>
					<div className="plans available-plans">
						<h4>
							<FormattedMessage {...messages.availablePlans} />
						</h4>
						<AvailablePlansContainer />
					</div>
				</div>
			</div>
			{props.isChangePlanModalShown && <ChangePlanSummaryModalContainer backLinkPath={props.backLinkPath} />}
		</div>
	);

export { ChangePlanSuggestion, ChangePlanSuggestionOwnProps, ChangePlanSuggestionStateProps, ChangePlanSuggestionProps };

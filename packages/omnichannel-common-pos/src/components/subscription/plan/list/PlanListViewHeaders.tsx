import cssns from "../../../../utils/cssnsConfig";
import { FC } from "react";
import messages from "../Plans.messages";
import { CommonCustomizationPoints, withCustomization } from "../../../../customization";
import { FormattedMessage } from "../../../../channelUtils";

const { React } = cssns("Plans");

const PlanListViewHeaders: FC<{}> = props => {
	return (
		<>
			<div className="column-header list-item-column">
				<FormattedMessage {...messages.plan}/>
			</div>

			<div className="column-header list-item-column">
				<FormattedMessage {...messages.recurringFeeColumn}/>
			</div>
			<div className="column-header list-item-column">
				<FormattedMessage {...messages.actions}/>
			</div>
		</>
	);
};

export default withCustomization<{}>(CommonCustomizationPoints.PLAN_LIST_ROW_HEADERS, PlanListViewHeaders);

import * as R from "react";
import cssns from "../../../../../utils/cssnsConfig";
import { CurrentPlanInfoContainer } from "./CurrentPlanInfoContainer";
import { TargetPlanInfoContainer } from "./TargetPlanInfoContainer";
const React = cssns("ChangePlanSummary").React as typeof R;

interface PlansInfoSectionProps {}
const PlansInfoSection: React.SFC<PlansInfoSectionProps> = props => (
	<div className="plans-info-section">
		<CurrentPlanInfoContainer />
		<div className="plan-transition" />
		<TargetPlanInfoContainer />
	</div>
);

export { PlansInfoSection, PlansInfoSectionProps };

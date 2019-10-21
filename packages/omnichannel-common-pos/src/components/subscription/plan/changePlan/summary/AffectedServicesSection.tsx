import * as R from "react";
import cssns from "../../../../../utils/cssnsConfig";
import FormattedMessage from "../../../../../channelUtils/FormattedMessage";
const React = cssns("ChangePlanSummary").React as typeof R;
import messages from "./ChangePlanSummary.messages";
import { AffectedAddonsList } from "./AffectedAddonsList";

const TERMINATED_ADDONS_ICON = "fa-ban";
const ACTIVATED_ADDONS_ICON = "fa-check-circle";

interface AffectedServicesSectionProps {
	incompatibleAddonsNames: string[];
	compatibleAddonsNames: string[];
	maxInitialCountToShow: number;
}

const AffectedServicesSection: React.FC<AffectedServicesSectionProps> = props =>
	props.incompatibleAddonsNames.length > 0 || props.compatibleAddonsNames.length > 0 ? (
		<>
			<h4>
				<FormattedMessage {...messages.affectedServicesSection} />
			</h4>
			<div className="section affected-services-section">
				<div className="label">
					<FormattedMessage {...messages.addonsLabel} />
				</div>
				<div className="value">
					<AffectedAddonsList
						addonsNames={props.incompatibleAddonsNames}
						titleMessage={messages.incompatibleAddonsSummary}
						maxInitialCountToShow={props.maxInitialCountToShow}
						iconClassName={TERMINATED_ADDONS_ICON}
						className="terminated-addons"
					/>
					<AffectedAddonsList
						addonsNames={props.compatibleAddonsNames}
						titleMessage={messages.compatibleAddonsSummary}
						maxInitialCountToShow={props.maxInitialCountToShow}
						iconClassName={ACTIVATED_ADDONS_ICON}
						className="activated-addons"
					/>
				</div>
			</div>
		</>
	) : null;

export { AffectedServicesSection, AffectedServicesSectionProps };

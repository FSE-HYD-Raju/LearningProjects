import * as React from "react";
import addonMessages from "./addon/Addon.messages";
import { CommonCustomizationPoints, withCustomization } from "../../customization";
import { FormattedMessage } from "../../channelUtils";

const AddonsTabTableHeaders: React.FC<{}> = props => {
	return (
		<div className="AddonsTabView-header" data-customizable>
			<div className="AddonsTabView-header-cell">
				 <FormattedMessage {...addonMessages.headerName}/>
			</div>
			<div className="AddonsTabView-header-cell">
				<FormattedMessage {...addonMessages.headerFees}/>
			</div>
			<div className="AddonsTabView-header-cell">
				<FormattedMessage {...addonMessages.headerDate}/>
			</div>
			<div className="AddonsTabView-header-cell">
				<FormattedMessage {...addonMessages.headerStatus}/>
			</div>
			<div className="AddonsTabView-header-cell"><span/></div>
			<div className="AddonsTabView-header-cell"><span/></div>
		</div>
	);
};

export default withCustomization(CommonCustomizationPoints.ADDON_TAB_TABLE_HEADER, AddonsTabTableHeaders);

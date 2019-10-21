import * as React from "react";
import addonMessages from "../../addon/Addon.messages";
import { FormattedMessage } from "../../../../channelUtils";

const CallForwardingExpandedContent: React.FC<{}> = () => {

	return (
		<div className="container AddonsTabView-addon-expanded-content">
			<div>
				<FormattedMessage {...addonMessages.callForwarding}/>
			</div>
			<div className="addon-expanded-content-addon-description">
				<FormattedMessage {...addonMessages.callForwardingDescription}/>
			</div>
		</div>
	);
};

export default CallForwardingExpandedContent;

import * as React from "react";
import FormattedMessage from "../../channelUtils/FormattedMessage";
import messages from "./OcComponents.messages";

const OcNotFound: React.FC = () => (
	<h1>
		<FormattedMessage {...messages.notFound} />
	</h1>
);

export default OcNotFound;

import * as R from "react";
import cssns from "../../../utils/cssnsConfig";
import messages from "./OcGrid.messages";
import FormattedMessage from "../../../channelUtils/FormattedMessage";
const React = cssns("OcGrid").React as typeof R;

interface OcGridPageDetailsProps {
	from: number;
	toRow: number;
	total: number;
}
const OcGridPageDetails: React.SFC<OcGridPageDetailsProps> = props => (
	<div className="pages-count-data">
		<FormattedMessage
			{...messages.showingXOutOfY}
			values={{
				from: <span className="message-bolder">{props.from}</span>,
				to: <span className="message-bolder">{props.toRow}</span>,
				total: <span className="message-bolder">{props.total}</span>,
			}}
		/>
	</div>
);

export { OcGridPageDetailsProps };
export default OcGridPageDetails;

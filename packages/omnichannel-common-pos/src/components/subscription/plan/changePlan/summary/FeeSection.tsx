import * as R from "react";
import cssns from "../../../../../utils/cssnsConfig";
import { SimplePrice } from "../../../../../redux/types/SimplePrice";
import messages from "./ChangePlanSummary.messages";
import FormattedMessage from "../../../../../channelUtils/FormattedMessage";
import OcCurrency from "../../../../ocComponents/OcCurrency";
const React = cssns("ChangePlanSummary").React as typeof R;

interface FeeSectionProps {
	fee: SimplePrice;
}
const FeeSection: React.SFC<FeeSectionProps> = props => (
	<div className="section fee-section">
		<div className="label">
			<FormattedMessage {...messages.changePlanFeeLabel} />
		</div>
		<div className="value">
			<OcCurrency cost={props.fee.taxIncludedAmount} currency={props.fee.currency} allowUndefined />
		</div>
	</div>
);

export { FeeSection, FeeSectionProps };

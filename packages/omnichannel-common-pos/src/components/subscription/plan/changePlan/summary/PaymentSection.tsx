import * as R from "react";
import cssns from "../../../../../utils/cssnsConfig";
import messages from "./ChangePlanSummary.messages";
import FormattedMessage from "../../../../../channelUtils/FormattedMessage";
import { ChangePlanSummaryPaymentByBalanceDetailsContainer } from "./ChangePlanSummaryPaymentByBalanceDetailsContainer";
const React = cssns("ChangePlanSummary").React as typeof R;

interface PaymentSectionProps {
	paymentMethodName: string;
	isSelectedMethodBalance: boolean;
}
const PaymentSection: React.SFC<PaymentSectionProps> = props => (
	<div className="section payment-section">
		<div className="label">
			<FormattedMessage {...messages.paymentMethodLabel} />
		</div>
		<div className="value">
			<span>{props.paymentMethodName}</span>
			{/* NOTE: for now supports only balance method */}
			{props.isSelectedMethodBalance && <ChangePlanSummaryPaymentByBalanceDetailsContainer />}
		</div>
	</div>
);

export { PaymentSection, PaymentSectionProps };

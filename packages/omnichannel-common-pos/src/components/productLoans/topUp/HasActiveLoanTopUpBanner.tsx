import * as R from "react";
import cssns from "../../../utils/cssnsConfig";
import FormattedMessage from "../../../channelUtils/FormattedMessage";
import FormattedNumber from "../../../channelUtils/FormattedNumber";
import TopUpBannerMessages from "./topUpBanner.messages";
import { SimplePrice } from "../../../redux/types";
const React = cssns("HasActiveLoanTopUpBanner").React as typeof R;

interface HasActiveLoanTopUpBannerProps {
	hasActiveLoan: boolean;
	loanAmountToPayBack?: SimplePrice;
}

const HasActiveLoanTopUpBanner: React.FC<HasActiveLoanTopUpBannerProps> = props => {
	const { loanAmountToPayBack, hasActiveLoan } = props;
	let amountToShow: string | JSX.Element = "";
	if (loanAmountToPayBack && loanAmountToPayBack.taxFreeAmount) {
		const currency = loanAmountToPayBack.currency || " ";
		amountToShow = (
			<span>
				<FormattedNumber
					value={loanAmountToPayBack.taxFreeAmount}
					style="currency"
					currency={currency}
					maximumFractionDigits={2}
				/>{" "}
			</span>
		);
	}
	return (
		!hasActiveLoan ? null : (
			<div className="this alert alert-primary">
				<div><strong><FormattedMessage {...TopUpBannerMessages.header} /></strong></div>
				<span id="loan-priority-message-test-id">
					<FormattedMessage {...TopUpBannerMessages.text} values={{ amount: amountToShow }} />
				</span>
			</div>
		)
	);
};

export { HasActiveLoanTopUpBannerProps };
export default HasActiveLoanTopUpBanner;

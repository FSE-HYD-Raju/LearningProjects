import cssns from "../../../utils/cssnsConfig";
import OcCurrency from "../../ocComponents/OcCurrency";
import FormattedMessage from "../../../channelUtils/FormattedMessage";
import overviewProductLoanMessages from "./overviewProductLoan.messages";
import { ActiveProductLoan } from "../../../redux/models/productLoan/productLoan.types";
import CreditInfoModal from "./CreditInfoModal";
import { PureComponent } from "react";
const { React } = cssns("SubscriptionCreditInfo");

interface SubscriptionCreditInfoStateProps {
	loanDescription?: string;
	activeLoanDetails: ActiveProductLoan | undefined;
}
interface SubscriptionCreditInfoActionProps {
	actions: {
		openTopUpModal: () => void;
	};
}
interface SubscriptionCreditInfoProps extends SubscriptionCreditInfoStateProps, SubscriptionCreditInfoActionProps {}
interface SubscriptionCreditInfoState {
	showingCreditInfoModal: boolean;
}

class SubscriptionCreditInfo extends PureComponent<SubscriptionCreditInfoProps, SubscriptionCreditInfoState> {
	constructor(props: SubscriptionCreditInfoProps) {
		super(props);
		this.state = { showingCreditInfoModal: false };
	}
	showCreditInfoModal = () => {
		this.setState({ showingCreditInfoModal: true });
	};
	hideCreditInfoModal = () => {
		this.setState({ showingCreditInfoModal: false });
	};
	payBack = () => {
		this.hideCreditInfoModal();
		this.props.actions.openTopUpModal();
	};

	render() {
		const { activeLoanDetails, loanDescription } = this.props;
		if (!activeLoanDetails || !activeLoanDetails.totalAmountToPayBack.taxFreeAmount) {
			return null;
		}
		return (
			<div className="this">
				<div className="title">
					<FormattedMessage {...overviewProductLoanMessages.subscriptionCreditInfo} />
					<i id="credit-info-button" className="fa fa-info-circle" onClick={this.showCreditInfoModal} />
				</div>
				<div className="amount">
					<OcCurrency
						cost={-activeLoanDetails.totalAmountToPayBack.taxFreeAmount}
						currency={activeLoanDetails.totalAmountToPayBack.currency}
					/>
				</div>
				<CreditInfoModal
					showModal={this.state.showingCreditInfoModal}
					onPayBack={this.payBack}
					onClose={this.hideCreditInfoModal}
					loanDescription={loanDescription}
					originalLoanAmount={activeLoanDetails.loanedBalance}
					originalLoanFee={activeLoanDetails.loanFee}
					remainingLoanAmount={activeLoanDetails.remainingLoanAmount}
					loanAmountToPayBack={activeLoanDetails.loanAmountToPayBack}
					loanFeeToPayBack={activeLoanDetails.loanFeeToPayBack}
					totalRemainingCredit={activeLoanDetails.totalAmountToPayBack}
					dueDate={activeLoanDetails.dueDate}
				/>
			</div>
		);
	}
}

export {
	SubscriptionCreditInfoStateProps,
	SubscriptionCreditInfoProps,
	SubscriptionCreditInfoState,
	SubscriptionCreditInfoActionProps
};
export default SubscriptionCreditInfo;

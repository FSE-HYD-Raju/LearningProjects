import messages from "./activateProductLoan.messages";
import cssns from "../../../utils/cssnsConfig";
import FormattedMessage from "../../../channelUtils/FormattedMessage";
import OcCurrency from "../../ocComponents/OcCurrency";
import { ActivateProductLoanModalProps, ActivateProductLoanModalState } from "./ActivateProductLoanModalProps";
import OcModal from "../../ocComponents/OcModal";
import { PureComponent } from "react";

const { React } = cssns("ActivateProductLoanModal");

class ActivateProductLoanModal extends PureComponent<ActivateProductLoanModalProps, ActivateProductLoanModalState> {

	constructor(props: ActivateProductLoanModalProps) {
		super(props);
		this.state = {
			agreedToTerms: false
		};
	}

	getContent() {
		const { msisdn, fee, loanedBalance, totalCredit } = this.props;
		return (
			<div className="container">
				<div className="info-title-section">
					<i className="fas fa-info-circle" />
					<div className="messages">
						<FormattedMessage
							{...messages.aboutToTakeLoan}
							values={{
								msisdn: <span className="bold">{msisdn}</span>
							}}
						/>
						<FormattedMessage {...messages.loanDetailsHeader} />
					</div>
				</div>
				<div className="loan-details-section">
					<div className="line">
						<div className="label">
							<FormattedMessage {...messages.loanedBalance} />
						</div>
						<div className="data">
							<OcCurrency cost={loanedBalance.taxFreeAmount} currency={loanedBalance.currency} />
						</div>
					</div>
					<div className="line">
						<div className="label">
							<FormattedMessage {...messages.loanFee} />
						</div>
						<div className="data">
							<OcCurrency cost={fee.taxFreeAmount} currency={fee.currency} />
						</div>
					</div>
					<div className="line">
						<div className="label">
							<FormattedMessage {...messages.productLoanTotalCredit} />
						</div>
						<div className="data">
							<OcCurrency cost={totalCredit.taxFreeAmount} currency={totalCredit.currency} />
						</div>
					</div>
				</div>
				<div className="confirmation-section">
					<div className="custom-checkbox custom-control">
						<input
							className="custom-control-input"
							type="checkbox"
							id="loan-terms-and-conditions"
							name="loan-terms-and-conditions"
							value="loan-terms-and-conditions"
							checked={this.state.agreedToTerms}
							onChange={this.onInputChange}
						/>
						<label className="custom-control-label" htmlFor="loan-terms-and-conditions">
							<FormattedMessage {...messages.termsAgreementConfirmation} />
						</label>
					</div>
					<div className="messages confirmation-request">
						<FormattedMessage {...messages.addingLoanConfirmationRequest} />
					</div>
				</div>
			</div>
		);
	}

	onInputChange = () => {
		this.setState({
			agreedToTerms: !this.state.agreedToTerms
		});
	};
	onConfirm = () => {
		const { actions, initializeAddonConfig } = this.props;
		if (!initializeAddonConfig) {
			return;
		}
		actions.confirm(initializeAddonConfig);
	};
	render() {
		const { actions, initializeAddonConfig } = this.props;
		return (
			<OcModal
				className="ActivateProductLoanModal"
				showModal={true}
				largeModal={true}
				title={<FormattedMessage {...messages.activateProductLoan} />}
				onClose={actions.closeModal}
				okDisabled={!this.state.agreedToTerms}
				onOk={this.onConfirm}
				okButtonLabel={<FormattedMessage {...messages.productLoanModalConfirm} />}
			>
				{this.getContent()}
			</OcModal>
		);
	}
}

export default ActivateProductLoanModal;

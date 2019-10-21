// @flow
import { Component } from "react";
import { cssns, FormattedMessage } from "omnichannel-common-pos";
import PropTypes from "prop-types";
import messages from "../posMessages";
import classnames from "classnames";
const { React } = cssns("CheckoutWizard");

type Props = {
	saveCheckoutConfigurationToBasket: Function,
	setupAvailable?: boolean,
	deliveryAvailable?: boolean,
	summaryAvailable?: boolean,
	paymentAvailable?: boolean,
	clientWidth?: string
};

export default class CheckoutWizard extends Component<Props> {
	static propTypes = {
		saveCheckoutConfigurationToBasket: PropTypes.func,
		setupAvailable: PropTypes.bool,
		deliveryAvailable: PropTypes.bool,
		summaryAvailable: PropTypes.bool,
		paymentAvailable: PropTypes.bool,
		clientWidth: PropTypes.string
	};

	toSetup = () => {
		this.props.saveCheckoutConfigurationToBasket(
			"/servicedesk/checkout/setup",
			"SETUP"
		);
	};

	toDelivery = () => {
		this.props.saveCheckoutConfigurationToBasket(
			"/servicedesk/checkout/delivery",
			"DELIVERY"
		);
	};

	toSummary = () => {
		this.props.saveCheckoutConfigurationToBasket(
			"/servicedesk/checkout/summary",
			"SUMMARY"
		);
	};

	toPayment = () => {
		this.props.saveCheckoutConfigurationToBasket(
			"/servicedesk/checkout/payment",
			"PAYMENT"
		);
	};

	render() {
		const mobileStyles =
			this.props.clientWidth === "tablet"
				? { fontSize: "80%" }
				: { fontSize: "100%" };

		const mobileNumberSize =
			this.props.clientWidth === "tablet"
				? { fontSize: "26px" }
				: { fontSize: "52px" };

		return (
			<div className="steps">
				<div
					onClick={this.toSetup}
					className={classnames({
						step: true,
						"incomplete-step": !this.props.setupAvailable
					})}
				>
					<div className="number-container">
						<span className="number one" style={mobileNumberSize} />
					</div>
					<div className="body">
						<span className="label" style={mobileStyles}>
							<FormattedMessage
								{...messages.checkoutStepConfiguration}
							/>
						</span>
						<span className="type" style={mobileStyles}>
							<FormattedMessage
								{...messages.checkoutStepConfigurationMessage}
							/>
						</span>
					</div>
				</div>

				<div
					onClick={this.toDelivery}
					className={classnames({
						step: true,
						"incomplete-step": !this.props.deliveryAvailable
					})}
				>
					<div className="number-container">
						<span className="number two" style={mobileNumberSize} />
					</div>
					<div className="body">
						<span className="label" style={mobileStyles}>
							<FormattedMessage
								{...messages.checkoutStepDelivery}
							/>
						</span>
						<span className="type" style={mobileStyles}>
							<FormattedMessage
								{...messages.checkoutStepDeliveryMessage}
							/>
						</span>
					</div>
				</div>

				<div
					onClick={this.toSummary}
					className={classnames({
						step: true,
						"incomplete-step": !this.props.summaryAvailable
					})}
				>
					<div className="number-container">
						<span
							className="number three"
							style={mobileNumberSize}
						/>
					</div>
					<div className="body">
						<span className="label" style={mobileStyles}>
							<FormattedMessage
								{...messages.checkoutStepSummary}
							/>
						</span>
						<span className="type" style={mobileStyles}>
							<FormattedMessage
								{...messages.checkoutStepSummaryMessage}
							/>
						</span>
					</div>
				</div>

				<div
					onClick={this.toPayment}
					className={classnames({
						step: true,
						"incomplete-step": !this.props.paymentAvailable
					})}
				>
					<div className="number-container">
						<span
							className="number four"
							style={mobileNumberSize}
						/>
					</div>
					<div className="body">
						<span className="label" style={mobileStyles}>
							<FormattedMessage
								{...messages.checkoutStepPayment}
							/>
						</span>
						<span className="type" style={mobileStyles}>
							<FormattedMessage
								{...messages.checkoutStepPaymentMessage}
							/>
						</span>
					</div>
				</div>
			</div>
		);
	}
}

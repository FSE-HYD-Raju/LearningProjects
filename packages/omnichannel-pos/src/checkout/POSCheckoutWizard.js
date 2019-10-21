// @flow
import { cssns, FormattedMessage } from "omnichannel-common-pos";
import PropTypes from "prop-types";
import classnames from "classnames";
import messages from "../posMessages";

const { React } = cssns("CheckoutWizard");

type Props = {
	saveCheckoutConfigurationToBasket?: (string, string) => void,
	checkoutSteps?: {
		SUMMARY: boolean,
		activeStep: string
	}
};

const POSCheckoutWizard = (props: Props): React.Node => {
	const { checkoutSteps } = props;
	const summaryDone = checkoutSteps && checkoutSteps.SUMMARY;
	const activeStep = checkoutSteps && checkoutSteps.activeStep;

	return (
		<div className="steps">
			<div
				className={classnames({
					step: true,
					active: activeStep === "SETUP"
				})}
			>
				<div className="number-container">
					<span className="number one" />
				</div>
				<div className="body">
					<span className="label">
						<FormattedMessage {...messages.checkoutCustomerDetails} />
					</span>
					<span className="type">
						<FormattedMessage {...messages.checkoutCustomerDescription} />
					</span>
				</div>
			</div>

			<div
				className={classnames({
					step: true,
					"incomplete-step": !summaryDone,
					active: activeStep === "SUMMARY"
				})}
			>
				<div className="number-container">
					<span className="number two" />
				</div>
				<div className="body">
					<span className="label">
						<FormattedMessage {...messages.checkoutContract} />
					</span>
					<span className="type">
						<FormattedMessage {...messages.checkoutContractDescription} />
					</span>
				</div>
			</div>

			<div
				className={classnames({
					step: true,
					"incomplete-step": true,
					active: activeStep === "PAYMENT"
				})}
				style={{ textDecoration: "none" }}
			>
				<div className="number-container">
					<span className="number three" />
				</div>
				<div className="body">
					<span className="label">
						<FormattedMessage {...messages.checkoutPayment} />
					</span>
					<span className="type">
						<FormattedMessage {...messages.checkoutPaymentDescription} />
					</span>
				</div>
			</div>
		</div>
	);
};

POSCheckoutWizard.propTypes = {
	saveCheckoutConfigurationToBasket: PropTypes.func,
	checkoutSteps: PropTypes.shape({
		SUMMARY: PropTypes.bool,
		activeStep: PropTypes.string
	})
};

export default POSCheckoutWizard;

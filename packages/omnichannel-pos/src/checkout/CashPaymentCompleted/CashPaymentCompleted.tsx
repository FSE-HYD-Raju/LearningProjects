
import * as React from "react";
import CashPaymentMessages from "./CashPaymentCompleted-messages";
import { FormattedMessage } from "omnichannel-common-pos";
import { Link } from "react-router-dom";

interface CashPaymentCompletedStateProps {
	referenceNumber: string;
}

interface CashPaymentCompletedState {
}

type CashPaymentCompletedProps = CashPaymentCompletedStateProps & CashPaymentCompletedActionProps;

interface CashPaymentCompletedActionProps {
	actions: {
		createBasket: () => void;
	};
}
/**
 * Shows cash payment reference id.
 */
class CashPaymentCompleted extends React.Component<CashPaymentCompletedProps, CashPaymentCompletedState> {

	static displayName = "CashPaymentCompleted";

	componentWillUnmount() {
		// initialize a new basket so that customer case has a clean active basket available
		this.props.actions.createBasket();
	}

	render() {
		const { referenceNumber } = this.props;
		return (
			<div className="CashPaymentCompleted" id="w-app-body">
				<div className="summary-container w-box">
					<div className="message">
						<i className="fa fa-check-circle icon" />
						<h2>
							<FormattedMessage {...CashPaymentMessages.title} />
						</h2>
					</div>
					<div className="reference-number">
						<div className="reference-number-label">
							<FormattedMessage {...CashPaymentMessages.message} />
						</div>

						<div className="reference-number-value">
							<b>{referenceNumber}</b>
						</div>

						<Link
							to="/servicedesk/shop"
							className="btn btn-primary continue-button"
							id="continue"
						>
							<FormattedMessage {...CashPaymentMessages.continueToShopLink} />
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default CashPaymentCompleted;

export {
	CashPaymentCompletedProps,
	CashPaymentCompletedState,
	CashPaymentCompletedStateProps,
	CashPaymentCompletedActionProps,
};

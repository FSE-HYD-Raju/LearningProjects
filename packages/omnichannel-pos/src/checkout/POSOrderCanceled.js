// @flow
import PropTypes from "prop-types";
import { Component } from "react";
import { type RouterHistory, withRouter } from "react-router";

type Props = {
	handlePaymentCancel: () => boolean,
	history: RouterHistory
};

class POSOrderCanceled extends Component<Props> {
	displayName = "POSOrderCanceled";
	static propTypes = {
		handlePaymentCancel: PropTypes.func.isRequired
	};

	handleCancel() {
		this.props.handlePaymentCancel();
		this.props.history.push("/servicedesk/checkout/payment");
	}

	componentWillMount() {
		this.handleCancel();
	}

	render() {
		return null;
	}
}

export default withRouter(POSOrderCanceled);

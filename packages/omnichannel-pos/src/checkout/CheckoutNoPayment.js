// @flow
import { type RouterHistory, withRouter } from "react-router";
import {
	cssns,
	Flex,
	FormattedMessage,
	Flux,
	OcButton,
	OcButtonType,
} from "omnichannel-common-pos";
import PropTypes from "prop-types";
import messages from "../posMessages";
import { Link } from "react-router-dom";
import get from "lodash/get";
import { Component } from "react";
import type { BasketStoreType } from "omnichannel-flow-pos";

const { React } = cssns("CheckoutPayment");
const { BasketActions } = Flux;

type Props = {
	BasketStore: BasketStoreType,
	history: RouterHistory,
	BasketActions: BasketActions
};

class CheckoutNoPayment extends Component<Props> {
	static displayName = "CheckoutNoPayment";

	static propTypes = {
		BasketStore: PropTypes.shape({
			activeBasket: PropTypes.shape({
				id: PropTypes.string.isRequired
			}).isRequired,
			submittedBasket: PropTypes.object,
			submittedBasketItems: PropTypes.array
		}).isRequired,
		BasketActions: PropTypes.shape({
			activateCheckoutStep: PropTypes.func.isRequired,
			submitBasket: PropTypes.func.isRequired
		}).isRequired,
		history: PropTypes.object
	};

	props: Props;

	componentWillMount() {
		this.props.BasketActions.activateCheckoutStep({ step: "PAYMENT" });
	}

	componentWillReceiveProps(newProps: Props) {
		if (get(newProps, "BasketStore.submittedBasket") !== get(this.props, "BasketStore.submittedBasket")) {
			const submittedBasket = get(
				newProps,
				"BasketStore.submittedBasket"
			);
			const submittedBasketItems = get(
				newProps,
				"BasketStore.submittedBasketItems"
			);
			if (submittedBasket && submittedBasketItems) {
				this.props.history.push("/payment/success");
			}
		}
	}

	submitBasket = () => {
		const { activeBasket } = this.props.BasketStore;
		this.props.BasketActions.submitBasket(activeBasket.id);
	};

	render() {
		const { activeBasket } = this.props.BasketStore;
		return (
			<section>
				<Flex
					style={{ padding: "0px 20px 0px 20px" }}
					direction="column"
				>
					<h1>
						<FormattedMessage {...messages.checkoutPaymentTitle} />
					</h1>
					<div>
						<h3 style={{ color: "#454545" }}>
							<FormattedMessage {...messages.checkoutPaymentText} />
						</h3>
					</div>
				</Flex>
				{activeBasket && (
					<Flex
						justifyContent="between"
						alignItems="center"
						style={{
							background: "#FAFAFA",
							borderTop: "1px solid #E6E6E6",
							height: "70px",
							padding: "0 20px 0 20px"
						}}
					>
						<Link
							to="/servicedesk/checkout/summary"
							style={{ textDecoration: "none" }}
							id="CheckoutPayment-cancel-button"
						>
							<OcButton buttonType={OcButtonType.DEFAULT}>
								<FormattedMessage
									{...messages.checkoutCancel}
								/>
							</OcButton>
						</Link>
						<Link id="CheckoutPayment-continue-button" to="#">
							<OcButton
								buttonType={OcButtonType.PRIMARY}
								id="pos-checkout-no-payment-proceed"
								disabled={!activeBasket.id}
								onClick={this.submitBasket}
							>
								<FormattedMessage {...messages.checkoutPaymentProcced} />
							</OcButton>
						</Link>
					</Flex>
				)}
			</section>
		);
	}
}

export default withRouter(CheckoutNoPayment);

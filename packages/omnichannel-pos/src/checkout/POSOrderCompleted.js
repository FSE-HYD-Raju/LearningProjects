// @flow
import {
	BasketUtil,
	cssns,
	OcCurrency,
	FormattedMessage,
	contextTypesValidationMap,
	OcAlert,
	OcAlertType,
} from "omnichannel-common-pos";
import classnames from "classnames";
import { Component } from "react";
import TableRow from "./TableRow";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import type { BasketType, ProductOffering } from "omnichannel-flow-pos";
import messages from "../posMessages";

type Props = {
	resetPaymentStore: () => void,
	resetConfigurations: () => void,
	createBasket: (personId: string) => void,
	personId: string,
	paymentStatus: string,
	submittedBasket: BasketType,
	submittedBasketItems: Array<ProductOffering>,
	vatRate: number
};

const { React } = cssns("POSOrderCompleted");

class POSOrderCompleted extends Component<Props> {
	static displayName = "POSOrderCompleted";
	static contextTypes = contextTypesValidationMap;

	static propTypes = {
		resetPaymentStore: PropTypes.func.isRequired,
		resetConfigurations: PropTypes.func.isRequired,
		createBasket: PropTypes.func.isRequired,
		personId: PropTypes.string.isRequired,
		paymentStatus: PropTypes.string.isRequired,
		submittedBasket: PropTypes.object.isRequired,
		submittedBasketItems: PropTypes.array.isRequired,
		/* VAT rate; null | decimal(0..1) */
		vatRate: PropTypes.number
	};

	componentWillUnmount(): void {
		this.context.flux.recycle(this.context.flux.stores.BasketStore);
		this.props.resetPaymentStore();
		this.props.resetConfigurations();
		//25.8.2017 vesak: initialize a new basket so that customer case has a clean active basket available
		this.props.createBasket(this.props.personId);
	}

	generateTableBody(basketItems: Array<ProductOffering>): React.Node {
		const content = [];
		this.generateRows(basketItems, content, 0, true);
		return <tbody>{content}</tbody>;
	}

	generateRows(
		basketItems: Array<ProductOffering>,
		content: Array<Object>,
		depth: number,
		isShowPrice: boolean
	): void {
		if (basketItems) {
			basketItems.forEach((item: Object) => {
				const prices = {};
				if (isShowPrice) {
					prices.onetime = BasketUtil.getPrice(item, "ONE_TIME");
					prices.recurrent = BasketUtil.getPrice(item, "RECURRENT");
					if (
						!isEmpty(prices.onetime) ||
						!isEmpty(prices.recurrent)
					) {
						prices.show = true;
					}
				}
				if (!depth) {
					depth = 0;
				}
				content.push(
					<TableRow item={item} depth={depth} prices={prices} />
				);

				const childBasketItems: Array<ProductOffering> =
					(item.attributes && item.attributes.childBasketItems) ||
					item.childBasketItems;

				if (childBasketItems) {
					this.generateRows(
						childBasketItems,
						content,
						depth + 1,
						prices.show
					);
				}
			});
		}
	}

	render() {
		const { submittedBasket, submittedBasketItems } = this.props;

		if (submittedBasket && submittedBasketItems) {
			const referenceNumber =
				submittedBasket.attributes &&
				submittedBasket.attributes.referenceNumber;

			const upfrontCost = BasketUtil.getPrice(
				submittedBasket,
				"ONE_TIME"
			);
			const monthlyCost = BasketUtil.getPrice(
				submittedBasket,
				"RECURRENT"
			);

			return (
				<div className="this" id="w-app-body">
					<div className="summary-container w-box">
						<div className="purchase-completed-message">
							<i className="fa fa-check-circle purchase-completed-icon" />

							<h2 className="payment-message">
								<FormattedMessage {...messages.orderConfirmation} />
							</h2>

							<Link
								to="/servicedesk/shop"
								className="btn btn-primary"
								id="pos-order-completed-contunue-shopping-button"
							>
								<FormattedMessage {...messages.orderContinueShopping} />
							</Link>
						</div>

						<div className="purchase-summary">
							<h2 className="purchase-summary-message">
								<FormattedMessage {...messages.orderPurchaseSummary} />
							</h2>

							<table
								id="pos-order-completed-purchase-summary-table"
								className="table table-bordered"
							>
								<colgroup span="3" />
								<thead>
									<tr>
										<th className="name">
											<FormattedMessage {...messages.orderBasketName} />
										</th>
										<th className="fee-upfront">
											<FormattedMessage {...messages.orderBasketUpfront} />
										</th>
										<th className="fee-recurring">
											<FormattedMessage {...messages.orderBasketRecurring} />
										</th>
									</tr>
								</thead>
								{this.generateTableBody(submittedBasketItems)}
								<tfoot>
									<tr>
										<th className="name">
											<FormattedMessage {...messages.orderBasketFinalCost} />
										</th>
										<th className="fee-upfront">
											{!upfrontCost.taxFreeAmount ? (
												<span className="oc-currency">
													{0}
												</span>
											) : (
												<OcCurrency
													cost={
														upfrontCost.taxFreeAmount
													}
													currency={
														upfrontCost.currency
													}
												/>
											)}
										</th>
										<th className="fee-recurring">
											{!monthlyCost.taxFreeAmount ? (
												<span className="oc-currency">
													{0}
												</span>
											) : (
												<OcCurrency
													cost={
														monthlyCost.taxFreeAmount
													}
													currency={
														monthlyCost.currency
													}
												/>
											)}
										</th>
									</tr>
								</tfoot>
							</table>

							<div className="basket-reference-number">
								<div className="basket-reference-number-label">
									<FormattedMessage {...messages.orderReferenceNumber} />
								</div>
								<div className="basket-reference-number-value">
									{referenceNumber}
								</div>
							</div>

							{this.props.paymentStatus &&
							this.props.paymentStatus ===
								"RECEIPT_CREATE_FAILED" && (
								<div
									className={classnames(
										"errors",
										"payment-error-message"
									)}
								>
									<OcAlert alertType={OcAlertType.DANGER}>
										<FormattedMessage {...messages.paymentErrorMessageFailed} />
									</OcAlert>
								</div>
							)}
						</div>
					</div>
				</div>
			);
		} else {
			return <span />;
		}
	}
}

export default POSOrderCompleted;

// @flow
import { type RouterHistory, withRouter } from "react-router";
import {
	cssns,
	OcCurrency,
	OcLoadingSpinner,
	PaymentFormContainer,
	PaymentSelection,
	RefreshButton,
	FormattedMessage,
	Flux,
	OcAlert,
	OcAlertType,
	OcButton,
	OcButtonType,
} from "omnichannel-common-pos";
import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import messages from "../posMessages";
import PropTypes from "prop-types";
import { get } from "lodash";
import type {
	BasketStoreType,
	PaymentActionsType,
	PaymentStoreState,
} from "omnichannel-flow-pos";
import BasketClearedError from "./BasketClearedError";
const { BasketActions } = Flux;
const { React } = cssns("CheckoutPayment");
const pt = PropTypes;

type Props = {
	BasketStore: BasketStoreType,
	BasketActions: BasketActions,
	PaymentActions: PaymentActionsType,
	PaymentStore: PaymentStoreState,
	CurrencyStore?: CurrencyStoreState,
	error: any; // from ErrorStore
	history: RouterHistory,
	selectedCurrency: string,
};

type State = {
	loading: boolean,
	selectedPaymentMethod: string,
	updating?: boolean,
};

class CheckoutPayment extends Component<Props, State> {
	static displayName = "CheckoutPayment";

	static propTypes = {
		BasketStore: pt.shape({
			basketItems: pt.array,
			activeBasket: pt.shape({
				id: pt.string
			}).isRequired,
			submittedBasket: pt.object
		}).isRequired,
		BasketActions: pt.shape({
			activateCheckoutStep: pt.func.isRequired,
			getBasketIncludeBasketItems: pt.func.isRequired
		}).isRequired,
		PaymentStore: pt.shape({
			paymentInfo: pt.shape({
				paymentCompleted: pt.bool
			}),
			paymentMethods: pt.array,
			paymentStatus: pt.string,
			paymentCancel: pt.bool
		}).isRequired,
		PaymentActions: pt.shape({
			getEligiblePaymentMethods: pt.func.isRequired,
			selectPaymentMethod: pt.func.isRequired
		}).isRequired,
		CurrencyStore: pt.shape({
			selectedCurrency: pt.string
		}),
		disableExternalPaymentForAddons: pt.bool,
	};

	props: Props;

	constructor(props: Props) {
		super(props);
		/* $FlowFixMe */
		this.state = {
			selectedPaymentMethod: null,
			loading: false,
			updating: false
		};
	}

	componentWillMount() {
		this.props.BasketActions.activateCheckoutStep({ step: "PAYMENT" });
	}

	changePaymentMethod = (paymentMethodId: string) => {
		this.setState({
			selectedPaymentMethod: paymentMethodId
		});
	};

	handleCancel = () => {
		this.props.history.push("/servicedesk/checkout/summary");
	};

	componentWillReceiveProps(newProps: Props) {
		if (newProps.selectedCurrency !== this.props.selectedCurrency) {
			const basketId = get(this.props, "BasketStore.activeBasket.id");
			if (basketId) {
				this.props.BasketActions.getBasketIncludeBasketItems(basketId);
			}
		}

		if (newProps.BasketStore.basketItems && newProps.BasketStore.basketItems.length === 0 && !newProps.error) {
			newProps.BasketActions.onError(BasketClearedError);
		}

		if (
			get(newProps, "PaymentStore.paymentInfo.paymentCompleted") !==
			get(this.props, "PaymentStore.paymentInfo.paymentCompleted")
		) {
			const paymentCompleted = get(
				newProps,
				"PaymentStore.paymentInfo.paymentCompleted"
			);
			const submittedBasket = get(
				newProps,
				"BasketStore.submittedBasket"
			);
			if (paymentCompleted && submittedBasket) {
				this.props.history.push("/payment/success");
			}
		}
		this.setState({
			loading: false,
			updating: false
		});
	}

	selectPaymentMethod = async () => {
		this.setState({
			loading: true
		});
		await this.props.PaymentActions.selectPaymentMethod(
			this.props.BasketStore.activeBasket.id,
			this.state.selectedPaymentMethod
		);
		this.props.PaymentActions.fetchReferenceNumberForCashPayment(
			this.props.BasketStore.activeBasket.id,
			this.state.selectedPaymentMethod
		);
	};

	refreshMonetaryBalance = async () => {
		this.setState({
			updating: true
		});
		const basketId = get(this.props, "BasketStore.activeBasket.id");
		await this.props.PaymentActions.getEligiblePaymentMethods(basketId);
	};

	render() {
		const {
			PaymentStore: {
				contextualPaymentMethods,
				paymentInfo,
				paymentCancel,
				paymentStatus,
				failedCashPayment,
			},
			BasketStore: {
				activeBasket,
				submittedBasket,
			},
			disableExternalPaymentForAddons,
		} = this.props;

		if (
			(!activeBasket ||
				get(activeBasket, "attributes.lifecycleStatus") !==
					"COMMITTED") &&
			!submittedBasket
		) {
			return (
				<FormattedMessage {...messages.basketNotReadyPayment} />
			);
		}

		const selectedCurrency = this.props.selectedCurrency || "";

		const mainBalance = contextualPaymentMethods
			.filter(pm => pm.id === "balance")
			.map(pm => {
				return pm.attributes.balance;
			});

		const upfrontCost = this.props.BasketStore.getCost(
			activeBasket,
			"ONE_TIME"
		);

		const totalSum = (
			<span className="total-sum">
				<OcCurrency
					cost={upfrontCost.cost}
					currency={upfrontCost.currency}
				/>
			</span>
		);

		return (
			<section className="this">
				<div className="w-box">
					<h3>
						<FormattedMessage {...messages.checkoutPaymentTitle} />
					</h3>

					{paymentCancel && (
						<div className="errors">
							<OcAlert>
								<FormattedMessage {...messages.paymentErrorPaymentCanceled} />
							</OcAlert>
						</div>
					)}

					{failedCashPayment && (
						<div className="errors">
							<OcAlert>
								<FormattedMessage {...messages.paymentErrorCashFailed} />
							</OcAlert>
						</div>
					)}

					{paymentInfo &&
					get(paymentInfo, "paymentErrorCode") && (
						<div
							className="errors"
							data-test-name="CheckoutPayment-errors"
						>
							<OcAlert alertType={OcAlertType.DANGER}>
								{get(paymentInfo, "paymentErrorCode") ===
									"balance-limit-surpassed" && (
									<FormattedMessage
										{...messages.paymentErrorBalanceSurpassed}
										values={{
											mainBalance: (
												<i>
													{"(" +
														mainBalance +
														" " +
														selectedCurrency +
														")"}
												</i>
											),
											totalFee: (
												<i>
													{"(" +
														upfrontCost.cost +
														" " +
														selectedCurrency +
														")"}
												</i>
											),
											refreshButton: (
												<RefreshButton
													refresh={
														this
															.refreshMonetaryBalance
													}
													updating={
														this.state.updating
													}
													buttonId="balance-limit-surpassed-refresh-button"
												/>
											)
										}}
									/>
								)}
								{get(paymentInfo, "paymentErrorCode") ===
									"basket-not-found" && (
									<FormattedMessage {...messages.paymentErrorBasketNotFound} />
								)}
								{get(paymentInfo, "paymentErrorCode") ===
									"payment-method-not-found" && (
									<FormattedMessage {...messages.paymentErrorMethodNotFound} />
								)}
							</OcAlert>
						</div>
					)}
					{paymentStatus &&
					paymentStatus === "REJECT" && (
						<div className="errors">
							<OcAlert alertType={OcAlertType.DANGER}>
								<FormattedMessage {...messages.paymentErrorPaymentReject} />
							</OcAlert>
						</div>
					)}
					{activeBasket && (
						<div>
							<h4>
								<FormattedMessage
									{...messages.paymentCompleteOneTime}
									values={{ totalSum }}
								/>
							</h4>
							{!disableExternalPaymentForAddons ? (
								<div className="card">
									<header className="card-header">
										<FormattedMessage {...messages.selectPaymentMethod} />
									</header>
									<div className="card-body">
										<PaymentSelection
											paymentMethods={
												contextualPaymentMethods
											}
											changePaymentMethod={
												this.changePaymentMethod
											}
											selectedPaymentMethod={
												/* $FlowFixMe */
												this.state
													.selectedPaymentMethod
											}
											totalSum={totalSum}
											selectedCurrency={selectedCurrency}
											mainBalance={mainBalance}
										/>
									</div>
								</div>
							) : (
								<div className="alert alert-danger">
									<FormattedMessage {...messages.notEnoughBalance} />
								</div>)
							}
							{get(paymentInfo, "paymentForm") && (
								<PaymentFormContainer
									paymentForm={get(
										paymentInfo,
										"paymentForm"
									)}
								/>
							)}
						</div>
					)}

					<OcLoadingSpinner loading={this.state.loading} />

					{!this.state.loading &&
					activeBasket && (
						<footer>
							<Link
								to="/servicedesk/checkout/summary"
								id="CheckoutPayment-cancel-button"
								className="btn btn-outline-secondary"
							>
								<FormattedMessage {...messages.checkoutCancel} />
							</Link>
							<OcButton
								id="CheckoutPayment-continue-button"
								onClick={this.selectPaymentMethod}
								buttonType={OcButtonType.PRIMARY}
								disabled={
									!this.state.selectedPaymentMethod ||
									!this.props.BasketStore.activeBasket.id
								}
							>
								<FormattedMessage {...messages.paymentBtnTitle} />
							</OcButton>
						</footer>
					)}
				</div>
			</section>
		);
	}
}

const shouldDisableExternalPaymentForAddons = (basketItems, contextualPaymentMethods, disableExternalPaymentForAddonsConfig) => {
	const productTypesInBasket = (basketItems && basketItems.map((basketItem) => {
		const basketProduct = basketItem.attributes && basketItem.attributes.product;
		return basketProduct.specSubType;
	})) || [];

	const addonProductPresentInBasket = !!(productTypesInBasket.find(specSubType => specSubType === "ADDITIONAL"));

	const isExternalPaymentInPaymentMethods = !!(contextualPaymentMethods && contextualPaymentMethods.find(paymentMethod => {
		return paymentMethod.id === "cash";
	}));
	return disableExternalPaymentForAddonsConfig && addonProductPresentInBasket && isExternalPaymentInPaymentMethods;
}

const mapStateToProps = (state) => {
	const {
		basket: { basketItems },
		payment: { contextualPaymentMethods },
		feature: { disableExternalPaymentForAddons: disableExternalPaymentForAddonsConfig },
	} = state;

	const disableExternalPaymentForAddons = shouldDisableExternalPaymentForAddons(
		basketItems, contextualPaymentMethods, disableExternalPaymentForAddonsConfig);

	return {
		disableExternalPaymentForAddons,
	}
};

export default withRouter(connect(mapStateToProps)(CheckoutPayment))

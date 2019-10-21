import { isEqual, get, omit } from "lodash";
import * as React from "react";
import { Component } from "react";
import OcLoadingSpinner from "../ocComponents/OcLoadingSpinner";
import isClient from "../../utils/isClient";
import { RouteComponentProps } from "react-router";
import {
	Basket,
	BasketActionAddProductToBasket,
	BasketActionSubmitBasket,
	PaymentActionValidatePayment,
	ValidatedPaymentMethod,
	BasketActionAddProductToBasketOptions
} from "../../redux/types";

interface PaymentReturnHandlerStateProps {
	submittedBasket?: Basket;
	committedBasket?: Basket;
	paymentStatus?: string;
	errors: Array<any>;
	customerAccountId?: string;
	contextualPaymentMethodId: string;
	successRoute: string;
	rejectRoute: string;
	receiptCreateFailedRoute: string;
	disableBasketSubmit: boolean;
	storedTopupProduct?: BasketActionAddProductToBasketOptions;
	selectedPaymentUseCase: string;
	returnBaseLocation: Location;
	customerPaymentMethod: ValidatedPaymentMethod;
	paymentMethodRelationId?: string;
}

type PaymentReturnHandlerStateWithRouteProps = PaymentReturnHandlerStateProps & RouteComponentProps<any>;

interface PaymentReturnHandlerActionProps {
	actions: {
		submitBasket: BasketActionSubmitBasket;
		addProductToBasket: BasketActionAddProductToBasket;
		handlePaymentReject: () => void;
		validatePayment: PaymentActionValidatePayment;
		validatePaymentWithoutBasket: (
			paymentUsecase: string,
			contextualPaymentMethodId: string,
			paymentParams: object,
			customerAccountId: string
		) => void;
		historyPush: (path: string) => void;
	};
}

interface PaymentReturnHandlerState {
	loading: boolean;
	validating: boolean;
	submitting: boolean;
}

interface SearchParams {
	[key: string]: string;
}

type PaymentReturnHandlerProps = PaymentReturnHandlerStateWithRouteProps & PaymentReturnHandlerActionProps;

class PaymentReturnHandler extends Component<PaymentReturnHandlerProps, PaymentReturnHandlerState> {
	static displayName = "PaymentReturnHandler";
	static DEFAULT_KEY_PAYMENT_METHOD_RELATION = "T_Payment_Method_Relation";

	constructor(props: PaymentReturnHandlerProps) {
		super(props);
		this.state = {
			validating: false,
			loading: true,
			submitting: false
		};
	}

	componentDidMount() {
		if (isClient) {
			this.checkReceiptAndValidate(this.props);
		}
	}

	componentWillReceiveProps(nextProps: PaymentReturnHandlerProps) {
		if (
			isClient &&
			!isEqual(
				omit(this.props, ["actions", "flux", "history", "location", "match", "staticContext"]),
				omit(nextProps, ["actions", "flux", "history", "location", "match", "staticContext"])
			)
		) {
			this.checkReceiptAndValidate(nextProps);
		}
	}

	addPaymentMethodInformation = (props: PaymentReturnHandlerProps) => {
		const key = props.paymentMethodRelationId || PaymentReturnHandler.DEFAULT_KEY_PAYMENT_METHOD_RELATION;
		const topup = props.storedTopupProduct!;

		if (topup.product) {
			if (!topup.product.inputCharacteristics) {
				topup.product.inputtedCharacteristics = {};
			}
			if (topup.product.inputtedCharacteristics) {
				topup.product.inputtedCharacteristics[key] = get(props, "customerPaymentMethod.id", "");
			}
		}

		return topup;
	};

	// TODO: check this carefully
	submit = async (props: PaymentReturnHandlerProps, basket: Basket) => {
		if (!props.disableBasketSubmit) {
			if (!props.storedTopupProduct) {
				this.setState({ submitting: true },
					() => {
						props.actions.submitBasket(basket && basket.id)
							.then(() => {
								this.setState({ submitting: false });
							})
							.catch(() => {
								this.setState({ submitting: false });
							})
						;
					}
				);

			} else if (props.customerPaymentMethod) {
				const product = this.addPaymentMethodInformation(props);

				this.setState({ submitting: true },
					() => {
						props.actions.addProductToBasket(product)
							.then(() => {
								props.actions.submitBasket(basket && basket.id)
									.then(() => {
										this.setState({ submitting: false });
									})
								;
							})
							.catch(() => {
								this.setState({ submitting: false });
							})
						;
					}
				);
			}
		} else if (props.storedTopupProduct && props.customerPaymentMethod) {
			const product = this.addPaymentMethodInformation(props);

			this.setState({ submitting: true },
				() => {
					props.actions.addProductToBasket(product)
						.then(() => {
							this.setState({ submitting: false });
						})
						.catch(() => {
							this.setState({ submitting: false });
						})
					;
				}
			);
		}
	};

	parseSearchParams(search: string): SearchParams {
		const searchParams: SearchParams = {};
		search
			.trim()
			.substr(1)
			.split("&")
			.map((param: string) => {
				const kv = param.split("=");
				searchParams[kv[0]] = kv[1];
			});
		return searchParams;
	}

	checkReceiptAndValidate(props: PaymentReturnHandlerProps) {
		const {
			submittedBasket,
			committedBasket,
			customerAccountId,
			paymentStatus,
			errors,
			contextualPaymentMethodId,
			selectedPaymentUseCase,
			returnBaseLocation,
		} = props;

		if (committedBasket && !submittedBasket && !errors && !this.state.validating) {

			this.setState({ validating: true });
			const basketId = committedBasket.id;

			const paymentParams: SearchParams = this.parseSearchParams(this.props.location.search);

			if (customerAccountId) { // validation is only available for a real customer account
				props.actions.validatePayment(basketId, contextualPaymentMethodId, paymentParams, customerAccountId);
			}
		} else if (!committedBasket && !submittedBasket && !errors && !this.state.validating) {
			this.setState({ validating: true });
			const paymentParams: SearchParams = this.parseSearchParams(this.props.location.search);

			this.props.actions.validatePaymentWithoutBasket(
				selectedPaymentUseCase,
				contextualPaymentMethodId,
				paymentParams,
				""
			);
		} else if (paymentStatus) {
			if (paymentStatus === "SUCCESS" && submittedBasket && !returnBaseLocation) {
				this.props.actions.historyPush(this.props.successRoute);
			} else if (paymentStatus === "SUCCESS" && !submittedBasket && committedBasket && !this.state.submitting) {
				this.submit(props, committedBasket);
			} else if (paymentStatus === "SUCCESS" && returnBaseLocation && returnBaseLocation.pathname) {
				this.props.actions.historyPush(returnBaseLocation.pathname);
			} else if (paymentStatus === "REJECT") {
				this.props.actions.handlePaymentReject();
				this.props.actions.historyPush(this.props.rejectRoute);
			} else if (paymentStatus === "RECEIPT_CREATE_FAILED") {
				this.props.actions.historyPush(this.props.receiptCreateFailedRoute);
			}
		}
	}

	render() {
		return <OcLoadingSpinner loading={this.state.loading} />;
	}
}

export default PaymentReturnHandler;
export {
	PaymentReturnHandlerProps,
	PaymentReturnHandlerState,
	PaymentReturnHandlerStateProps,
	PaymentReturnHandlerStateWithRouteProps,
	PaymentReturnHandlerActionProps,
	SearchParams
};

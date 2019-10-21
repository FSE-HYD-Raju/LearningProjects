// @flow
import { deprecated, actions, ErrorContainer, PaymentService } from "../../redux";
import BaseActions from "./BaseActions";
import {
	get,
	find,
} from "lodash";
import { getB2cSubChannelGuess } from "../../redux/utils/channel";
import { B2C_SUB_CHANNEL_HEADER } from "../../channelUtils/setAxiosInterceptor";

const commonHeaders = {
	"Content-Type": "application/vnd.api+json"
};

class PaymentActions extends BaseActions {
	resetPaymentStore = () => true;
	handlePaymentReject = () => true;
	handlePaymentCancel = () => true;
	clearPaymentForm = () => true;

	// in fact it updates "contextualPaymentMethods" in PaymentStore
	getEligiblePaymentMethods(basketId: string) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const paymentUseCaseKey = `${process.env.omnichannel ||
					""}-checkout`;
				const paymentUseCase = alt.stores.PaymentStore.getPaymentUseCaseValueByKey(
					paymentUseCaseKey
				);
				const path = `/contextualPaymentMethods?filter[contextualPaymentMethods][paymentUseCase]=${paymentUseCase}&filter[contextualPaymentMethods][basketId]=${basketId}`;
				const resp = await alt.apiCalls.get(path);

				if (resp instanceof ErrorContainer) {
					if (resp.status === 404) {
						resp.errors[0].code =
							"apiErrorPaymentMethodsUnavailable";
					}
					return this.onError(resp);
				} else {
					const paymentMethods = resp.data || [];
					if (paymentMethods.length === 0) {
						this.onError({
							errors: [{
								code: "apiErrorPaymentMethodsUnavailable"
							}],
							status: "404"
						});
					}

					return Promise.resolve(
						dispatch(
							resp.data.map(o => {
								const {
									attributes,
									...rest
								} = o;
								return {
									...rest,
									...attributes,
									attributes: { ...attributes
									}
								};
							})
						)
					);
				}
			});
	}

	updatePaymentMethodName = (methodId: string, name: string, customerAccountId: ?string) => {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				if (methodId) {
					const payload = {
						type: "payment-methods",
						id: methodId,
						attributes: {
							name
						}
					};

					const responsePatch = await alt.apiCalls.patch(
						`/payment-methods/${methodId}`,
						payload,
						commonHeaders
					);
					if (responsePatch instanceof ErrorContainer) {
						this.onError(responsePatch);
						return false;
					} else {
						alt.actions.PaymentActions.getPaymentMethods(customerAccountId);
						return dispatch(responsePatch.data.data);
					}
				}
				return dispatch({});
			});
	};

	terminatePaymentMethod = (contextualPaymentMethodId: string, customerAccountId: ?string) => {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				if (contextualPaymentMethodId) {
					const resp = await alt.apiCalls.delete(
						`/payment-methods/${contextualPaymentMethodId}`
					);

					if (resp instanceof ErrorContainer) {
						console.error(
							"Error termination of payment method: ",
							resp
						);
					} else {
						alt.actions.PaymentActions.getPaymentMethods(customerAccountId);
					}
				}
				return dispatch({});
			});
	};

	getContextualPaymentMethods = async (paymentUseCase: string) => {
		const resp = await PaymentService.getContextualPaymentMethods(
			paymentUseCase
		);
		if (resp instanceof ErrorContainer) {
			return [];
		} else {
			return Promise.resolve(resp.data);
		}
	};

	selectContextualPaymentMethod = (
		paymentUseCase: string,
		contextualPaymentMethod: any,
		reservationAmountForCreditcardTokenization: number
	) => {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const data = {
					data: {
						type: "contextualPayments",
						attributes: {
							contextualPaymentMethodId: contextualPaymentMethod.id,
							paymentUseCase,
							totalAmount: reservationAmountForCreditcardTokenization
						}
					}
				};
				const resp = await PaymentService.selectContextualPaymentMethod(data);
				if (resp instanceof ErrorContainer) {
					return "";
				} else {
					dispatch(resp.data);
					return Promise.resolve(resp.data);
				}

			});

	};

	selectPaymentMethod(
		basketId: string,
		contextualPaymentMethodId: string,
		customerPaymentMethodId: ? string
	) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const paymentUseCaseKey = `${process.env.omnichannel ||
					""}-checkout`;
				const paymentUseCase = alt.stores.PaymentStore.getPaymentUseCaseValueByKey(
					paymentUseCaseKey
				);
				const payload = {
					data: {
						type: "contextualPayments",
						attributes: {
							contextualPaymentMethodId,
							paymentUseCase,
							customerPaymentMethodId
						},
						relationships: {
							basket: {
								data: {
									type: "baskets",
									id: basketId
								}
							}
						}
					},
					included: [{
						type: "baskets",
						id: basketId
					}]
				};
				const response = await alt.apiCalls.postComplex(
					"/contextualPayments?include=basket.basketItems",
					payload,
					commonHeaders
				);

				if (response instanceof ErrorContainer) {
					return Promise.resolve(this.handleErrors(response));
				} else {
					const paymentInfo = get(
						response,
						"data.data.attributes.paymentInfo"
					);
					const submittedBasket = find(
						get(response, "data.included"), {
							type: "baskets",
							attributes: {
								lifecycleStatus: "SUBMITTED"
							}
						}
					);
					const submittedBasketItems =
						submittedBasket &&
						get(response, "data.included", []).filter(
							item => item.type === "basketItems"
						);

					const dispatchObject = {
						paymentInfo,
						submittedBasket,
						submittedBasketItems,
						contextualPaymentMethodId
					};
					dispatch(dispatchObject);
					return Promise.resolve(dispatchObject);
				}
			});
	}

	/**
	 * Fetches reference number for latest basket payment. Performs api call only if contextUalPaymentMethodId is "cash".
	 */
	fetchReferenceNumberForCashPayment(
		basketId: string,
		contextualPaymentMethodId: string
	): Function {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				let referenceNumber = null;
				const {
					feature
				} = alt.reduxStore.getState();
				const paymentIdentifiers = get(
					feature,
					"cashPaymentIdentifiers",
					[]
				);

				const includesCash = paymentIdentifiers.includes(
					contextualPaymentMethodId
				);
				if (includesCash) {
					const basketPaymentsResponse = await alt.apiCalls.get(
						encodeURI(
							`/bss/api/basket-payments?filter=(EQ basket.id "${basketId}")`
						)
					);

					if (basketPaymentsResponse instanceof ErrorContainer) {
						return Promise.resolve(
							this.handleFailedCashPayment(basketPaymentsResponse)
						);
					} else {
						referenceNumber = get(
							basketPaymentsResponse,
							'data[0].attributes["reference-number"]'
						);
						alt.actions.BasketActions.deleteUIbasket();
					}
				}
				dispatch({
					referenceNumber
				});
				return Promise.resolve(referenceNumber);
			});
	}

	handleFailedCashPayment(response: Object) {
		return { errors: get(response, "errors") };
	}

	handleErrors(response: Object) {
		return {
			errors: get(response, "errors")
		};
	}

	validatePayment(
		basketId: string,
		contextualPaymentMethodId: string,
		paymentParams: Object,
		customerAccountId: string,
		) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const paymentUseCaseKey = `${process.env.omnichannel ||
					""}-checkout`;
				const paymentUseCase = alt.stores.PaymentStore.getPaymentUseCaseValueByKey(
					paymentUseCaseKey
				);
				const { payment } = alt.reduxStore.getState();
				const storeCreditCard = payment.storeCustomerPaymentMethod;

				const payload = {
					data: {
						type: "contextualPaymentValidations",
						attributes: {
							contextualPaymentMethodId,
							paymentUseCase,
							paymentResponse: {
								paymentParams
							},
							storeCreditCard,
							customerAccountId
						},
						relationships: {
							basket: {
								data: {
									type: "baskets",
									id: basketId
								}
							}
						}
					},
					included: [{
						type: "baskets",
						id: basketId
					}]
				};

				return alt.apiCalls
					.postComplex(
						"/contextualPaymentValidations?include=basket.basketItems",
						payload,
						commonHeaders
					)
					.then(response => {
						if (response instanceof ErrorContainer) {
							return this.handleErrors(response);
						} else {
							const paymentStatus = get(
								response,
								"data.data.attributes.paymentStatus"
							);

							const paymentResponse = get(
								response,
								"data.data.attributes.paymentResponse"
							);

							const submittedBasket = find(
								get(response, "data.included"), {
									type: "baskets",
									attributes: {
										lifecycleStatus: "SUBMITTED"
									}
								}
							);

							const committedBasket = find(
								get(response, "data.included"), {
									type: "baskets",
									attributes: {
										lifecycleStatus: "COMMITTED"
									}
								}
							);

							const submittedBasketItems =
								submittedBasket &&
								get(response, "data.included", []).filter(
									item => item.type === "basketItems"
								);

							const committedBasketItems =
								committedBasket &&
								get(response, "data.included", []).filter(
									item => item.type === "basketItems"
								);
							const customerPaymentMethod = get(response, "data.data.attributes.customerPaymentMethod");

							return dispatch({
								paymentStatus,
								submittedBasket,
								submittedBasketItems,
								committedBasket,
								committedBasketItems,
								contextualPaymentMethodId,
								customerPaymentMethod,
								paymentResponse
							});
						}
					});
			});
	}

	@deprecated("actions.payment.getCustomerPaymentMethods")
	getPaymentMethods(customerAccountId: ?string): Function {
		return (dispatch, alt) => {
			alt.reduxStore.dispatch(actions.payment.getCustomerPaymentMethods(customerAccountId));
		}
	}

	handleProductTopUp(
		msisdn: string,
		alias: string,
		amount: string,
		currency: string,
		stream: string,
		originRequestCode: string,
		substream: string
	) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const payload = {
					type: "recharge-purchases",
					attributes: {
						amount: {
							amount,
							currency
						},
						originRequestAt: new Date(),
						originSystemName: "Omnichannel",
						msisdn,
						stream,
						substream,
						payWith: {
							creditCardAlias: alias,
							method: "credit-card"
						},
						originRequestCode
					}
				};
				const headers = { ...commonHeaders };
				const subChannel = getB2cSubChannelGuess();
				if (subChannel) {
					headers[B2C_SUB_CHANNEL_HEADER] = subChannel;
				}

				const resp = await alt.apiCalls.post(
					"/recharge-purchases",
					payload,
					headers
				);
				if (resp instanceof ErrorContainer) {
					return this.onError(resp);
				} else {
					return Promise.resolve(dispatch(resp.data));
				}
			});
	}

	resetTopUp = () => true;
}

export default PaymentActions;

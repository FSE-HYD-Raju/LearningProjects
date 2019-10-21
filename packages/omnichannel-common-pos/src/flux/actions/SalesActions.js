// @flow

import BaseActions from "./BaseActions";
import { ErrorContainer, actions, deprecated } from "../../redux";
import ProductOfferingUtil from "../../utils/ProductOfferingUtil";
import { get } from "lodash";

const commonHeaders = { "Content-Type": "application/vnd.api+json" };

const getSubmittedBasketFromResponse = (response: Object): Object => {
	const inclusions = get(response, "data.included", []);
	return inclusions.find(
		inc =>
			inc.type === "baskets" &&
			get(inc, "attributes.lifecycleStatus") === "SUBMITTED"
	);
};

const getSubmittedBasketItemsFromResponse = (
	response: Object,
	submittedBasket: Object
): Array<Object> => {
	return (
		(submittedBasket &&
			get(response, "data.included", []).filter(
				item => item.type === "basketItems"
			)) ||
		[]
	);
};

class SalesActions extends BaseActions {
	saveBarcode = (value: string) => value;

	findProduct(barcode: string, activeCustomer: Object, basketId: string) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const url = `/productOfferings/${barcode}`;
				const results = await alt.apiCalls.get(url, false);
				const product = results.data;

				dispatch(product);
				if (product) {
					alt.actions.BasketActions.addProductToBasket({
						product,
						basketId,
						hasCustomer: Boolean(activeCustomer)
					});
				}
				return Promise.resolve();
			});
	}

	getProductById(id: string) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const url = `/productOfferings/${id}`;
				const results = await alt.apiCalls.get(url);
				const product = results.data;

				return Promise.resolve(dispatch(product));
			});
	}

	getProductToConfigure(id: string) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const url = `/productOfferings/${id}`;
				const results = await alt.apiCalls.get(url, false);
				const product = results.data;

				return Promise.resolve(dispatch(product));
			});
	}

	getProductsByIds(ids: Array<string>) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const results = await Promise.all(
					ids.map(id =>
						alt.apiCalls.get(`/productOfferings/${id}`)
					)
				);
				const products = results.map(entry => entry.data);

				return Promise.resolve(dispatch(products));
			});
	}

	@deprecated("Use dispatch and actions.sales.getProductsFromCategory")
	getProductsFromCategory = (
		categoryId: string,
		targetAgreementId: string,
		activeInventory: Object
	) => {
		return (dispatch: Function, alt: Object) => {
			alt.reduxStore.dispatch(actions.sales.getProductsFromCategory(categoryId, targetAgreementId, activeInventory));
		};
	};

	getSubCategories(categoryId: string) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const url = `/sub-category?filter[categoryId]=${categoryId}`;
				alt.reduxStore.dispatch(actions.loadingOverlay.showLoadingOverlay(categoryId));
				const response = await alt.apiCalls.get(url, true, commonHeaders);
				alt.reduxStore.dispatch(actions.loadingOverlay.hideLoadingOverlay(categoryId));
				return Promise.resolve(
					dispatch({
						subCategories: response.data,
						filters: get(response, "meta.filters", []),
						categoryId
					})
				);
			});
	}

	@deprecated("Use dispatch and actions.sales.getAvailableAddonProducts")
	getAvailableAddonProducts(agreementId: string) {
		return (dispatch: Function, alt: Object) => {
			alt.reduxStore.dispatch(actions.sales.getAvailableAddonProducts(agreementId));
		};
	}

	getAvailableMobilePhones(agreementId: string) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const xEntryPoint = get(
					alt.stores.SalesStore.state,
					"phonesCategoryId",
					""
				);
				const url = `/contextualProducts?filter[agreementId]=${agreementId}`;
				const response = await alt.apiCalls.get(url, true, {
					"X-Entry-Point": xEntryPoint
				});
				return Promise.resolve(
					dispatch({
						phones: response.data
					})
				);
			});
	}

	@deprecated("Use dispatch and actions.sales.getAvailablePlans")
	getAvailablePlans() {
		return (dispatch: Function, alt: Object) => {
			alt.reduxStore.dispatch(actions.sales.getAvailablePlans());
		};
	}

	toggleFilter = (payload: Object) => payload;
	toggleCombinedFilter = (payload: Object) => payload;
	resetFilters = () => true;
	handlePriceRangeSlider = (value: *) => value;
	switchPriceType = (type: *) => type;
	handleSearch = (input: SyntheticEvent<*>) => get(input, "target.value");
	resetSearch = () => null;

	getBundlesForProduct(productId: string) {
		return (dispatch: Function, alt: Object) => {
			alt.resolve(async () => {
				const url = `/productOfferings/${productId}/bundlingProductOfferings`;
				const withLog = false;
				const response = await alt.apiCalls.get(url, withLog);
				if (response instanceof ErrorContainer) {
					return this.onError(response);
				}
				return Promise.resolve(
					dispatch({ currentProductBundles: response.data })
				);
			});
		};
	}

	updateMinutesFilterValues = (minutesFilterValues: Object) =>
		minutesFilterValues;

	updateProductValue = (product: Object) => product;

	toggleApplyIncludedMinutesFilter = () => null;

	saveTargetAgreementId = (targetAgreementId: number) => targetAgreementId;

	endShoppingForSubscription = () => null;

	initializeProductConfiguration({
		individualId,
		productId,
		inputtedCharacteristics,
		enhancedCharacteristics
	}: {
		individualId: string,
		productId: string,
		inputtedCharacteristics: Object,
		enhancedCharacteristics: Object
	}) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const resp = await alt.apiCalls.post(
					"/products-modify-config-initialization?include=resultBasket.basketItems,resultBasket.basketValidationInformations",
					{
						type: "products-modify-config-initialization",
						attributes: {
							characteristics: inputtedCharacteristics,
							"enhanced-characteristics": enhancedCharacteristics
						},
						relationships: {
							product: {
								data: {
									type: "products",
									id: productId
								}
							},
							owner: {
								data: {
									type: "persons",
									id: individualId
								}
							}
						}
					},
					commonHeaders
				);

				if (resp) {
					if (resp instanceof ErrorContainer) {
						return Promise.resolve(dispatch(resp));
					}
				}

				const initializedBasket = get(resp, "data.included", []).find(
					basket => basket.type === "baskets"
				);

				if (get(initializedBasket, "attributes.upfrontPrices")) {
					// Fetch also chargingBalances in case there are prices present
					const chargingBalancesResponse = await alt.apiCalls.get(
						`/charging-balances?filter[productId]=${productId}`,
						false,
						commonHeaders
					);

					if (chargingBalancesResponse) {
						if (
							chargingBalancesResponse instanceof ErrorContainer
						) {
							return Promise.resolve(
								dispatch(chargingBalancesResponse)
							);
						}
					}

					const merged = {
						data: get(resp, "data.data", {}),
						included: [
							...get(resp, "data.included", []),
							...get(chargingBalancesResponse, "data", [])
						]
					};

					return Promise.resolve(dispatch(merged));
				}
				return Promise.resolve(dispatch(resp.data));
			});
	}

	cancelProductConfiguration(basketId: string, resetProduct: boolean) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				if (basketId) {
					const resp = await alt.apiCalls.delete(
						`/baskets/${basketId}`,
						commonHeaders
					);

					if (resp) {
						return Promise.resolve(dispatch(resetProduct));
					}
				}
				return Promise.resolve(dispatch());
			});
	}

	submitInitializedProductConfiguration(basketId: string) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const payload = {
					data: {
						type: "baskets-submit",
						relationships: {
							basket: {
								data: {
									type: "baskets",
									id: basketId
								}
							}
						}
					},
					included: [
						{
							type: "baskets",
							id: basketId
						}
					]
				};
				const response = await alt.apiCalls.postComplex(
					"/baskets-submit",
					payload,
					commonHeaders
				);
				if (response instanceof ErrorContainer) {
					return this.onError(response);
				}
				return Promise.resolve();
			});
	}

	submitProductConfiguration({
		individualId,
		productId,
		inputtedCharacteristics,
		enhancedCharacteristics
	}: {
		individualId: string,
		productId: string,
		inputtedCharacteristics: Object,
		enhancedCharacteristics: Object
	}) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const resp = await alt.apiCalls.post(
					"/products-modify-config?include=resultBasket.basketItems,resultBasket.basketValidationInformations",
					{
						type: "products-modify-config",
						attributes: {
							characteristics: inputtedCharacteristics,
							"enhanced-characteristics": enhancedCharacteristics
						},
						relationships: {
							product: {
								data: {
									type: "products",
									id: productId
								}
							},
							owner: {
								data: {
									type: "persons",
									id: individualId
								}
							}
						}
					},
					commonHeaders
				);

				if (resp) {
					if (resp instanceof ErrorContainer) {
						return Promise.resolve(dispatch(resp));
					}
					return Promise.resolve(dispatch(resp.data));
				}
				return Promise.resolve();
			});
	}

	resetProductConfiguration = () => true;

	getAlternateOfferingsForProduct(productOfferingId: string) {
		return (dispatch: Function, alt: Object) => {
			alt.resolve(async () => {
				const urlForOriginal = `/productOfferings/${productOfferingId}`;
				const urlForAlternates = `/productOfferings/${productOfferingId}/alternateProductOfferings`;
				const withLog = false;
				const originalResponse = await alt.apiCalls.get(
					urlForOriginal,
					withLog
				);
				const alternatesResponse = await alt.apiCalls.get(
					urlForAlternates,
					withLog
				);
				if (originalResponse instanceof ErrorContainer) {
					return this.onError(originalResponse);
				} else if (alternatesResponse instanceof ErrorContainer) {
					return this.onError(alternatesResponse);
				} else {
					return Promise.resolve(
						dispatch({
							alternateProductOfferings: [
								originalResponse.data, // I'm not sure why we actually need this one at all, but let's try to fix this with minimal changes to original behavior
								...alternatesResponse.data
							],
							productOfferingId
						})
					);
				}
			});
		};
	}

	@deprecated("Use sales.actions.queryProductOfferingsViaAddressRegistryId(...)")
	queryProductOfferingsViaAddressRegistryId(
		addressReqistryId: string,
		additionalCategory: string
	) {
		return (dispatch: Function, alt: Object) => {
			alt.reduxStore.dispatch(actions.sales.queryProductOfferingsViaAddressRegistryId(addressReqistryId, additionalCategory));
		}
	}

	initializeProductReplace(
		individualId: string,
		agreementId: string,
		productId: string,
		productOfferingId: string,
		replaceType: string,
		configuration: Object
	) {
		return (dispatch: Function, alt: Object) => {
			alt.resolve(async () => {
				const response = await alt.apiCalls.post(
					"/products-replace-initialize?include=resultBasket.basketItems",
					{
						type: "products-replace-initialize",
						attributes: {
							characteristics: configuration,
							type: replaceType
						},
						relationships: {
							product: {
								data: {
									type: "products",
									id: productId
								}
							},
							owner: {
								data: {
									type: "persons",
									id: individualId
								}
							},
							productOffering: {
								data: {
									type: "productOfferings",
									id: productOfferingId
								}
							}
						}
					},
					commonHeaders
				);

				if (response instanceof ErrorContainer) {
					return this.onError(response);
				}
				return Promise.resolve(
					dispatch({ ...response.data }, productId)
				);
			});
		};
	}

	commitProductReplace(basketId: string, paymentMethodId: string) {
		return (dispatch: Function, alt: Object) => {
			alt.resolve(async () => {
				const response = await alt.apiCalls.post(
					"/products-replace",
					{
						type: "products-replace",
						attributes: {
							contextualPaymentMethodId: paymentMethodId
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
					commonHeaders
				);

				if (response instanceof ErrorContainer) {
					return this.onError(response);
				}
				return Promise.resolve(
					dispatch({
						...response.data.data
					})
				);
			});
		};
	}

	resetProductChange = () => true;

	selectActiveAgreement = (agreementId: string) => {
		return agreementId;
	};

	initializeNewPlanOrder = (
		individualId: string,
		agreementId: string,
		product: Object,
		configurations: Object
	) => {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const basket = individualId
					? {
							type: "baskets",
							relationships: {
								owner: {
									data: {
										id: individualId,
										type: "persons"
									}
								}
							}
						}
					: {
							type: "baskets"
						};

				return alt.apiCalls
					.post("/baskets", basket, commonHeaders)
					.then(
						response =>
							this.handleNewPlanBasketResponse(
								alt,
								dispatch,
								response,
								product,
								configurations,
								agreementId
							),
						basketError => this.onError(basketError)
					);
			});
	};

	handleNewPlanBasketResponse = (
		alt: Object,
		dispatch: Function,
		response: Object,
		product: Object,
		configurations: Object,
		agreementId: string
	) => {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const configuredProduct = ProductOfferingUtil.mergeConfigurations(
					product,
					configurations
				);

				const basketId = get(response, "data.data.id");
				const { SalesRepSessionStore } = alt.stores;
				if (basketId) {
					const basketItem = alt.actions.BasketActions.productToBasketItem(
						configuredProduct,
						null,
						basketId,
						agreementId,
						SalesRepSessionStore
					);

					return alt.apiCalls
						.post("/basketItems", basketItem, commonHeaders)
						.then(
							itemResponse =>
								this.handleNewPlanBasketItemResponse(
									alt,
									dispatch,
									itemResponse
								),
							basketItemError => this.onError(basketItemError)
						);
				}
				return Promise.resolve();
			});
	};

	handleNewPlanBasketItemResponse = (
		alt: Object,
		dispatch: Function,
		itemResponse: Object
	) => {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const inclusions = get(itemResponse, "data.included", []);
				const basket =
					inclusions.find(item => item.type === "baskets") || {};
				const basketItem = get(itemResponse, "data.data", []);
				const path = `/contextualPaymentMethods?filter[contextualPaymentMethods][basketId]=${basket.id}`;
				return Promise.resolve(alt.apiCalls.get(path)).then(
					paymentResponse => {
						if (paymentResponse instanceof ErrorContainer) {
							return this.onError(paymentResponse)(dispatch, alt);
						}
						return dispatch({
							basket,
							basketItem,
							eligiblePaymentMethods: paymentResponse.data
						});
					},
					paymentError => this.onError(paymentError)(dispatch, alt)
				);
			});
	};

	submitNewPlanOrder(basketId: string, contextualPaymentMethodId: string) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				if (contextualPaymentMethodId) {
					return this.handlePaymentAndSubmitNewPlanOrderBasket(
						alt,
						dispatch,
						basketId,
						contextualPaymentMethodId
					);
				}
				return this.submitNewPlanOrderBasket(alt, dispatch, basketId);
			});
	}

	handlePaymentAndSubmitNewPlanOrderBasket = (
		alt: Object,
		dispatch: Function,
		basketId: string,
		contextualPaymentMethodId: string
	) => {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				// Create the request payload
				// Handle payment and submit
				const payload = {
					data: {
						type: "contextualPayments",
						attributes: {
							contextualPaymentMethodId
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
					included: [
						{
							type: "baskets",
							id: basketId
						}
					]
				};

				// commit and submit the basket with payment
				const response = await alt.apiCalls.postComplex(
					"/contextualPayments?include=basket.basketItems",
					payload,
					commonHeaders
				);

				// Check for errors and handle the response
				if (response instanceof ErrorContainer) {
					return this.onError(response)(dispatch, alt);
				}
				const paymentInfo = get(
					response,
					"data.data.attributes.paymentInfo"
				);
				const submittedBasket = getSubmittedBasketFromResponse(
					response
				);

				const submittedBasketItems = getSubmittedBasketItemsFromResponse(
					response,
					submittedBasket
				);

				return Promise.resolve(
					dispatch({
						paymentInfo,
						submittedBasket,
						submittedBasketItems,
						contextualPaymentMethodId
					})
				);
			});
	};

	submitNewPlanOrderBasket = (
		alt: Object,
		dispatch: Function,
		basketId: string
	) => {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				// Create the request payload
				// Only submit, no payment needed
				const payload = {
					data: {
						type: "baskets-submit",
						relationships: {
							basket: {
								data: {
									type: "baskets",
									id: basketId
								}
							}
						}
					},
					included: [
						{
							type: "baskets",
							id: basketId
						}
					]
				};

				// Submit the basket without using payment
				const response = await alt.apiCalls.postComplex(
					"/baskets-submit?include=basket.basketItems",
					payload,
					commonHeaders
				);

				// Check for errors and handle the response
				if (response instanceof ErrorContainer) {
					return this.onError(response)(dispatch, alt);
				}
				const submittedBasket = getSubmittedBasketFromResponse(
					response
				);

				const submittedBasketItems = getSubmittedBasketItemsFromResponse(
					response,
					submittedBasket
				);

				return Promise.resolve(
					dispatch({
						submittedBasket,
						submittedBasketItems
					})
				);
			});
	};

	resetNewPlanOrder = () => true;
}

export default SalesActions;

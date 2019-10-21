import { ErrorContainer, Flux, actions } from "omnichannel-common-pos";
import _ from "lodash";
import R from "ramda";
const commonHeaders = { "Content-Type": "application/vnd.api+json" };

const { BaseActions } = Flux;

const simplifyCustomerBasketData = data => {
	const customerOpenBaskets = _.get(data, "data");
	const included = _.get(data, "included");
	const basketItems =
		included &&
		included.filter(includedData => {
			return _.get(includedData, "type") === "basketItems";
		});

	//Combine baskets with their basketItems to own objects
	const basketData = customerOpenBaskets.map(basket => {
		const basketIncludedItems =
			basketItems &&
			basketItems.filter(item => {
				return _.get(basket, "id") === _.get(item, "relationships.basket.data.id");
			});

		const sanitizedBasketItems =
			basketIncludedItems &&
			basketIncludedItems.map(item => {
				return _.omit(item, "relationships", "links");
			});

		const sanitizedBasket = _.omit(basket, "relationships", "links");

		return {
			basket: sanitizedBasket,
			basketItems: sanitizedBasketItems
		};
	});
	return basketData;
};

//No longer uses api-calls to store the cases in omnichannel-backend memory, refactored due to RUBT-117904
class CustomerCaseActions extends BaseActions {
	createNewCustomerCase(salesRepId) {
		const activeCustomerCase = {
			attributes: {
				salesRepUser: {
					id: salesRepId
				},
				status: "ONGOING"
			},
			type: "customercases"
		};
		return (dispatch, alt) =>
			alt.resolve(async () => {
				const _customer = _.get(alt.stores, "CustomerStore.state.singleTermCustomers");

				/* If a customer exists in CustomerStore, set that customer as the activeCustomer of soon to be created CustomerCase. */
				if (_customer && _customer.id) {
					const { id, attributes, ...rest } = _customer;

					const customer = {
						id,
						...rest,
						...attributes
					};
					activeCustomerCase.attributes.activeCustomer = customer;
				}
				dispatch(activeCustomerCase);
				await alt.actions.BasketActions.createBasket();
				const customerId = _.get(activeCustomerCase, "attributes.activeCustomer.id");
				if (customerId) {
					this.getAgreements(customerId);
				}
				return Promise.resolve(true);
			});
	}

	//No longer uses api-calls to store the cases in omnichannel-backend memory, refactored due to RUBT-117904
	updateCustomerCase(customerCaseId, _customerCase, updateBasket) {
		const customerCase = _.omit(_customerCase, ["links", "relationships"]);
		return (dispatch, alt) =>
			alt.resolve(async () => {
				dispatch(customerCase);
				if (customerCase.attributes.status === "ENDED") {
					// clear basket
					return dispatch(true);
				} else if (updateBasket) {
					await alt.actions.BasketActions.updateOwnerToBasket(alt.stores.BasketStore.state.activeBasket, customerCase.attributes.activeCustomer);
					return dispatch(true);
				}
				return dispatch(false);
			});
	}

	setCustomer(_customer: Object, fetchUserBaskets: boolean) {
		let customer = null;
		if (_customer) {
			const { id, attributes, ...rest } = _customer;
			customer = {
				id,
				...rest,
				...attributes
			};
		}
		return (dispatch, alt) => {
			alt.resolve(async () => {
				const activeCustomer = R.assocPath(["attributes", "activeCustomer"], customer, alt.stores.CustomerCaseStore.state.activeCustomerCase);
				//setting the active customer when user selects  from multiple accounts .
				activeCustomer.attributes.activeCustomer.customerAccountId = alt.stores.CustomerStore.state.activeCustomerAccount.id
				this.getAgreements(customer.id);
				alt.reduxStore.dispatch(actions.customerCase.resetCustomerCase());

				if (fetchUserBaskets) {
					let basketData, resp;

					//If customer has customerAccountId (existing user, fetch customer open baskets
					const customerAccountId = _.get(activeCustomer, "attributes.activeCustomer.customerAccountId");

					if (customerAccountId) {
						//This takes a while
						alt.reduxStore.dispatch(actions.loadingOverlay.showLoadingOverlay());
						//Fetch basket where lifecycleStatus=OPEN and basket contains basket items
						resp = await alt.apiCalls.get(
							`/persons/${customer.id}/baskets?filter[baskets][lifecycleStatus]=OPEN,COMMITTED&filter[baskets][basketItems][id][LIKE]=%&include[baskets]=basketItems`,
							commonHeaders
						);
						alt.reduxStore.dispatch(actions.loadingOverlay.hideLoadingOverlay());
					}

					if (resp instanceof ErrorContainer) {
						return Promise.resolve(this.onError(resp));
					} else if (resp && !_.isEmpty(resp.data)) {
						basketData = simplifyCustomerBasketData(resp);
					}

					if (_.isEmpty(basketData)) {
						//Use already created basket

						/* There were no active baskets, so if a product was added to basket prior to customer
						identification, add it to an empty basket. Otherwise prompt user to pick a basket, and the
						product that was added to basket priot to identification gets added to the selected basket.
						See CustomerBaskets component for that logic. */

						await alt.actions.BasketActions.addUnidentifiedCustomerBasketProductToBasket();

						this.updateCustomerCase(alt.stores.CustomerCaseStore.state.activeCustomerCase.id, activeCustomer, true);
					} else {
						this.updateCustomerCase(alt.stores.CustomerCaseStore.state.activeCustomerCase.id, activeCustomer, false);
						this.setCustomerOpenBaskets(basketData);
					}
				} else {
					//If someone else owns the basket, create new one. Otherwise use already created
					const basketOwnerId = _.get(alt.stores.BasketStore, "state.activeBasket.relationships.owner.data.id");
					if (basketOwnerId && basketOwnerId !== _.get(activeCustomer, "attributes.activeCustomer.id")) {
						alt.actions.BasketActions.deleteUIbasket();
						alt.actions.BasketActions.createBasket();
					}

					this.updateCustomerCase(alt.stores.CustomerCaseStore.state.activeCustomerCase.id, activeCustomer, false);
				}
				if (alt.stores.BasketStore.state.showNoCustomerWarning) {
					alt.actions.BasketActions.hideNoCustomerWarning();
				}

				return Promise.resolve(dispatch(true));
			});
		};
	}

	endCustomerCase(location) {
		return (dispatch, alt) =>
			alt.resolve(async () => {
				const customerCaseId = _.get(alt.stores.CustomerCaseStore.state, "activeCustomerCase.id", null);
				if (customerCaseId) {
					const customerCase = {
						type: "customercases",
						id: customerCaseId,
						attributes: {
							status: "ENDED"
						}
					};
					await this.updateCustomerCase(customerCaseId, customerCase);
					const salesRepUser = _.get(alt.stores.UserStore.state, "salesRepUser", null);
					if (salesRepUser) {
						await alt.actions.UserActions.stopActingAsUser(salesRepUser);
					}
				}
				await alt.actions.BasketActions.deleteUIbasket();
				alt.actions.BasketActions.cancelAddProduct();
				alt.reduxStore.dispatch(actions.productOfferingConfiguration.resetConfigurations());
				alt.reduxStore.dispatch(actions.location.resetLocations());
				alt.reduxStore.dispatch(actions.basket.resetAddressWithBasketItemIdEntries());
				alt.reduxStore.dispatch(actions.customerCase.resetCustomerCase());
				alt.reduxStore.dispatch(actions.document.resetUploadDocument());
				if (location) {
					return Promise.resolve(dispatch(location));
				}
				return Promise.resolve(dispatch(true));
			});
	}

	getAgreements(customerId: string) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const response = await alt.apiCalls.get(`/persons/${customerId}/agreements`);
				if (response instanceof ErrorContainer) {
					return Promise.resolve(this.onError(response));
				} else {
					return Promise.resolve(dispatch(response.data));
				}
			});
	}

	getAgreement(agreementId) {
		return (dispatch, alt) =>
			alt.resolve(async () => {
				const resp = await alt.apiCalls.get(`/agreements/${agreementId}`);
				if (resp instanceof ErrorContainer) {
					return Promise.resolve(this.onError(resp));
				}
				return Promise.resolve(dispatch(resp.data));
			});
	}

	setCustomerOpenBaskets = customerBaskets => customerBaskets;

	clearCustomerBasketsData = () => true;

	changeCustomerActiveAgreement = (activeAgreementId, discardBasket = false) => {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				if (discardBasket) {
					const basketId = _.get(alt.stores.BasketStore.state, "activeBasket.id");

					const customerId =
						_.get(alt.stores.CustomerCaseStore.state, "activeCustomerCase.attributes.activeCustomer.customerAccountId") &&
						_.get(alt.stores.CustomerCaseStore.state, "activeCustomerCase.attributes.activeCustomer.id");

					//Discard basket
					basketId && customerId && alt.actions.BasketActions.discardBasket(basketId, customerId);
				}
				const categoryId = _.get(alt.stores.SalesStore.state, "productCategory");
				if (categoryId) {
					alt.reduxStore.dispatch(actions.sales.getProductsFromCategory(categoryId, activeAgreementId));
				}
				return Promise.resolve(dispatch(activeAgreementId ? activeAgreementId : null));
			});
	};
}

export default CustomerCaseActions;

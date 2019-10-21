import _ from "lodash";
import BaseActions from "./BaseActions";
import {
	deprecated,
	actions,
	DigitalLifeUtils,
	ErrorContainer
} from "../../redux";
import { ProductOfferingUtil } from "../../utils/ProductOfferingUtil";

const CONTENT_TYPE = { "Content-Type": "application/vnd.api+json" };

class DigitalLifeActions extends BaseActions {
	setAgreements(data) {
		return (dispatch, alt) =>
			alt.resolve(() => {
				dispatch(data);
			});
	}

	@deprecated()
	_sortPeople(user, people, alt) {
		return DigitalLifeUtils.sortPeople(user, people);
	}

	@deprecated()
	_sortAgreements(agreements) {
		return DigitalLifeUtils.sortAgreements(agreements);
	}

	@deprecated()
	initAll(user) {
		return (dispatch, alt) => {
			alt.reduxStore.dispatch(actions.digitalLife.initAll(user));
		};
	}

	getCustomerAccountData(person) {
		const included = _.get(person, "included", []);
		const customerAccount = _.find(included, inc => {
			return _.get(inc, "type") === "customerAccounts";
		});
		return customerAccount || {};
	}

	@deprecated()
	getAgreements(user) {
		return (dispatch, alt) => {
			alt.reduxStore.dispatch(actions.digitalLife.getAgreements(user));
		};
	}

	@deprecated()
	getAgreement(agreementId) {
		return (dispatch, alt) => {
			alt.reduxStore.dispatch(actions.digitalLife.getAgreementById(agreementId));
		};
	}

	getBaskets(user) {
		return (dispatch, alt) => {
			alt.reduxStore.dispatch(actions.digitalLife.getBaskets(user.id));
		};
	}

	getUserProductNotifications(userProductId) {
		return (dispatch, alt) =>
			alt.resolve(async () => {
				const notificationsUrl = `/products/${userProductId}/notifications`;
				const notifications = await alt.apiCalls.get(
					notificationsUrl,
					alt.DigitalLifeActions
				);
				dispatch({
					userProductId,
					notifications: notifications.data
				});
				// });
			});
	}

	fetchCategoryUserProducts(catId, userId) {
		return (dispatch, alt) =>
			alt.resolve(async () => {
				const categoryUserProducts = await alt.apiCalls.get(
					`/persons/${userId}/products/?filter[category]=${catId}`,
					alt.DigitalLifeActions
				);
				return dispatch({
					categoryUserProducts: categoryUserProducts.data.filter(
						p => p.attributes.sellableProduct
					)
				});
			});
	}

	copyFromBasketToThing(basket) {
		return basket;
	}

	getCustomerAccounts(customerAccountId: string) {
		return (dispatch, alt) =>
			alt.resolve(async () => {
				const resp = await alt.apiCalls.get(`/customerAccounts/${customerAccountId}`);
				return dispatch(resp.data);
			});
	}

	updateCustomerAccount(customerAccount) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				if (customerAccount) {
					const responseGet = await alt.apiCalls.get(`/customerAccounts/${customerAccount.id}`);

					if (responseGet instanceof ErrorContainer) {
						this.onError(responseGet);
						return false;
					} else {
						const attributes = Object.assign(
							{},
							_.omit(responseGet.data.attributes, [
								"accountId",
								"validity"
							]),
							customerAccount
						);

						const payload = {
							type: "customerAccounts",
							id: customerAccount.id,
							attributes
						};

						const responsePatch = await alt.apiCalls.patch(`/customerAccounts/${customerAccount.id}`,
							payload,
							CONTENT_TYPE
						);
						if (responsePatch instanceof ErrorContainer) {
							this.onError(responsePatch);
							return false;
						} else {
							return dispatch(responsePatch.data.data);
						}
					}
				}
				return dispatch(false);
			});
	}

	addPerson(person, addEverywhere) {
		return (dispatch, alt) =>
			alt.resolve(async () => {
				const newPerson = {
					firstName: person.firstName,
					lastName: person.lastName,
					email: person.email,
					phone: person.phone,
					avatar: "/static/img/icon-acme.svg",
					roles: ["user", "customer"]
				};
				if (addEverywhere) {
					newPerson.places = [
						{
							id: "everywhere",
							avatar: "/static/img/icon-globe.svg",
							name: "Everywhere",
							type: "ROAMING"
						}
					];
				}

				const response = await alt.apiCalls.post(
					`/persons/`,
					{ type: "persons", attributes: newPerson },
					{ "Content-Type": "application/vnd.api+json" },
					true
				);

				console.log("ADD PERSON DATA", response);

				return dispatch(response.data.data);
			});
	}

	disableThing(id) {
		return id;
	}

	enableThing(id) {
		return id;
	}

	evilHackSetDigitalLifePerson(person) {
		return person;
	}
	// used for passing update user object to UserStore
	dispatchPersonForUser(user) {
		return user;
	}
	getPersonForUser(user) {
		return (dispatch, alt) =>
			alt.resolve(async () => {
				const person = await alt.apiCalls.get("/persons/" + user.id);
				if (person instanceof ErrorContainer) {
					console.error("FAILED TO FETCH PERSON", user);
				} else {
					return dispatch(person.data);
				}
				return false;
			});
	}

	setUsageDateRange = (payload: Object) => payload;

	@deprecated()
	fetchTransactionEvents(userId: string, startDate: Date, endDate: Date, agreementId?: string|null) {
		return (dispatch, alt) => {
			alt.reduxStore.dispatch(actions.digitalLife.getTransactions(userId, startDate, endDate, agreementId));
		}
	}

	@deprecated("use actions.digitalLife.getAgreementUsageEvents")
	fetchAgreementUsageEvents(agreementId: string, startDate: Date, endDate: Date) {
		return (dispatch, alt) => {
			alt.reduxStore.dispatch(actions.digitalLife.getAgreementUsageEvents(agreementId, startDate, endDate));
		}
	}

	@deprecated("use actions.digitalLife.getProductUsageCounters")
	fetchProductUsageCounters(productId: string, startDate: Date, endDate: Date) {
		return (dispatch, alt) => {
			alt.reduxStore.dispatch(actions.digitalLife.getProductUsageCounters(productId, startDate, endDate));
		};
	}

	/*TODO: Top-up subscription payment method magic happens here */
	selectTopUpPayment(payment: string, voucher: string) {
		if (payment === "voucher" && voucher) {
			// TODO: Backend call for top-up voucher code payment
		} else {
			// TODO: Other Pop-up subscription payment methods
		}

		// TODO: Return true/false dispatch
	}

	@deprecated("use actions.digitalLife.getBasketPaymentReceipts")
	getBasketPaymentReceipts(basketId: string) {
		return (dispatch, alt) => {
			alt.reduxStore.dispatch(actions.digitalLife.getBasketPaymentReceipts(basketId));
		};
	}

	fetchNumberTypesForChangeMsisdnModal(agreementId) {
		return (dispatch, alt) =>
			alt.resolve(async () => {
				const response = await alt.apiCalls.get(
					"/contextualProducts?filter[numberTypes]",
					true,
					{
						"X-Entry-Point": agreementId
					}
				);

				if (response instanceof ErrorContainer) {
					console.error(
						"Error fetching number types: " +
							JSON.stringify(response)
					);
				} else {
					dispatch({
						numberClasses: response.data
					});
				}
			});
	}

	fetchMsisdnsForNumberClass(numberClassId) {
		return (dispatch, alt) =>
			alt.resolve(async () => {
				if (numberClassId) {
					const response = await alt.apiCalls.get(
						`/productOfferings/${numberClassId}/msisdns`
					);

					if (response instanceof ErrorContainer) {
						this.onError(response);
					} else {
						dispatch({
							numberClassId,
							msisdns: response.data
						});
					}
				}
			});
	}

	initializeChangeMsisdn({
		productId,
		reason,
		numberClass,
		targetResource,
		selectedMsisdn,
		userId
	}) {
		return (dispatch, alt) =>
			alt.resolve(async () => {
				const payload = {
					data: {
						type: "change-resource-initialization",
						attributes: {
							productId,
							basketItem: {
								product: {
									id: numberClass.id,
									specificationId:
									(numberClass.attributes && numberClass.attributes.specificationId) || numberClass.specificationId
								},
								quantity: 1,
								inputtedCharacteristics: {
									"target-resource-id": targetResource.id,
									number: selectedMsisdn,
									"number-type": ProductOfferingUtil.getInstanceCharacteristicValueFromProductOffering(numberClass, "number-type")
								},
								reasonForAction: {
									value: reason.id
								}
							}
						},
						relationships: {
							owner: {
								data: {
									type: "persons",
									id: userId
								}
							}
						}
					},
					included: [
						{
							type: "persons",
							id: userId
						}
					]
				};

				const response = await alt.apiCalls.postComplex(
					"/change-resource-initialization?include=basket.basketItems,basket.basketValidationInformations",
					payload,
					{ "Content-Type": "application/vnd.api+json" }
				);

				if (response instanceof ErrorContainer) {
					this.onError(response);
				} else {
					return dispatch(response.data);
				}
				return false;
			});
	}

	commitMsisdnChange(paymentMethodId, basketId) {
		return (dispatch, alt) => {
			const payload = {
				type: "change-resource",
				attributes: {
					paymentMethodId
				},
				relationships: {
					basket: {
						data: {
							id: basketId,
							type: "baskets"
						}
					}
				}
			};

			alt.apiCalls
				.post("/change-resource", payload, {
					"Content-Type": "application/vnd.api+json"
				})
				.then(
					response => {
						if (response instanceof ErrorContainer) {
							this.onError(response);
						} else {
							// Trigger agreements update after successful change (RUBT-84982)
							this.getAgreements(alt.stores.UserStore.state.user);
							return dispatch(response.data);
						}
						return false;
					},
					response => {
						console.log(
							"DigitalLifeActions.commitMsisdnChange promise timed out",
							response
						);
					}
				);
		};
	}

	clearChangeMsisdn = basketId => {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				if (basketId) {
					const resp = await alt.apiCalls.delete(
						`/baskets/${basketId}`
					);

					// Delete failed. Log the error but don't inform user since it shouldn't really affect end user.
					if (resp instanceof ErrorContainer) {
						console.error("Error deleting basket: ", resp);
					}
				}
				return dispatch({});
			});
	};

	@deprecated()
	getPersonsOrders(personId, queryParams) {
		return (dispatch, alt) => {
			alt.reduxStore.dispatch(actions.digitalLife.getPersonOrders(personId, queryParams));
		};
	}
}

export default DigitalLifeActions;

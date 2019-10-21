import { get, filter, find, map, isEmpty, head }  from "lodash";
import BaseActions from "./BaseActions";
import { deprecated } from "../../redux";
import { ErrorContainer } from "../../redux/services";
import BasketUtil from "../../utils/BasketUtil";
import ProductOfferingUtil from "../../utils/ProductOfferingUtil";
import BasketValidationUtil from "../../utils/BasketValidationUtil";
import ProductUtil from "../../utils/product/ProductUtil";
import { commonServiceDeskRoutes } from "../../routes/commonRoutesMap";
import actions from "../../redux/actions";

import R from "ramda";
import type { ProductOffering } from "omnichannel-flow-pos";
import { customizationProductToBasketItem } from "../../redux/models/feature/feature.utils";

const commonHeaders = { "Content-Type": "application/vnd.api+json" };

const getChildBasketItems = (product, salesRepSessionStore) => {
	const items = ProductOfferingUtil.getProductOfferingItemsForBasket(product);

	return items.map(item => {
		const { id, specificationId } = item;
		const enhancedCharacteristics = ProductOfferingUtil.getEnhancedCharacteristics(item);
		return {
			product: {
				id,
				specificationId
			},
			quantity: 1,
			inputtedCharacteristics: mapDeviceCharacteristics(
				item,
				get(item, "attributes.inputtedCharacteristics", item.inputtedCharacteristics),
				salesRepSessionStore
			),
			enhancedCharacteristics,
			childBasketItems: getChildBasketItems(item, salesRepSessionStore)
		};
	});
};

const mapDeviceCharacteristics = (product, inputted, salesRepSessionStore) => {
	if (salesRepSessionStore) {
		const salesOrganizationId = get(
			salesRepSessionStore,
			"state.activeSalesOrganization.id"
		);

		const inventoryPlaceId = get(
			salesRepSessionStore,
			"state.activeInventory.attributes.place-id"
		);

		if (salesOrganizationId && inventoryPlaceId) {
			const shouldPopulateCharacteristics =
				get(product, "attributes.specType") === "PRODUCT" &&
				["HANDSET", "TABLET", "ACCESSORY", "MODEM", "SIM"].some(
					a => a === get(product, "attributes.specSubType")
				);

			if (shouldPopulateCharacteristics) {
				return R.merge(inputted || {}, {
					inventoryPlaceId,
					salesOrganizationId
				});
			}
		}
	}

	return inputted;
};

const createCommitBasketItemRequest = (basket, personId, organizationId, basketItems) => {
	const relationships = {
		basket: {
			data: {
				type: "baskets",
				id: basket.id
			}
		}
	};

	const notificationType = basketItems && BasketUtil.hasPortIn(basketItems) ? "port-in" : null;

	if (organizationId) {
		relationships.organization = {
			data: {
				type: "organizations",
				id: organizationId
			}
		};
	}

	return {
		data: {
			type: "baskets-commit",
			attributes: {
				owner: {
					id: personId
				},
				notificationType
			},
			relationships
		},
		included: [
			{
				type: "baskets",
				id: basket.id
			}
		]
	};
};

class BasketActions extends BaseActions {
	productToBasketItem = (
		product: Object,
		parentBasketItem: ?Object,
		basketId: string,
		targetAgreementId: string,
		salesRepSessionStore: Object,
		targetProductId: ?string
	) => {
		const parentBasketItemContainer = parentBasketItem
			? {
				parentBasketItem: {
					data: {
						id: get(parentBasketItem, "id"),
						type: "basketItems"
					}
				}
			}
			: {};

		return customizationProductToBasketItem({
			salesRepSessionStore,
			product,
			inputtedCharacteristics: mapDeviceCharacteristics(
				product,
				get(product, "attributes.inputtedCharacteristics", product.inputtedCharacteristics),
				salesRepSessionStore
			),
			basketId,
			targetProductId,
			targetAgreementId,
			enhancedCharacteristics: ProductOfferingUtil.getEnhancedCharacteristics(product),
			parentBasketItemContainer,
			getChildBasketItems
		});
	};

	getBasketIncludeBasketItems(basketId: string) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const resp = await alt.apiCalls.get(`/baskets/${basketId}?include[baskets]=basketItems`, false, commonHeaders);

				if (resp instanceof ErrorContainer) {
					this.onError(resp);
				} else {
					const basket = get(resp, "data");
					const included = get(resp, "included");

					const basketItems =
						Array.isArray(included) &&
						included.filter(
							inc => get(inc, "type") === "basketItems"
						);
					const basketData = {
						basketItems,
						basket
					};
					return Promise.resolve(dispatch(basketData));
				}
				this.updatingBasket(false);
				return Promise.resolve(false);
			});
	}

	getBasket(basketId: string) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const resp = await alt.apiCalls.get(
					`/baskets/${basketId}`,
					commonHeaders
				);
				if (resp instanceof ErrorContainer) {
					this.updatingBasket(false);
					return this.onError(resp);
				} else {
					const activeBasket = get(resp, "data");
					return Promise.resolve(dispatch(activeBasket));
				}
			});
	}

	updatingBasket(updatingBasket: boolean) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				return Promise.resolve(dispatch(updatingBasket));
			});
	}

	saveSetupConfiguration(productId: string, conf: Object) {
		const configuration = {
			productId,
			configuration: conf
		};
		return configuration;
	}

	saveRequestedMandatoryConfiguration(
		product: Object,
		mandatoryConfiguration: Array<string>
	) {
		return {
			product,
			configuration: mandatoryConfiguration
		};
	}

	resetRequestedMandatoryConfiguration = () => null;

	hideNoCustomerWarning() {
		return {
			showNoCustomerWarning: false
		};
	}

	hideBlacklistedCustomerWarning = () => ({
		showBlacklistedCustomerWarning: false
	})

	getDeviceReservationProducts(configuredProduct: ProductOffering) {
		const result = [];
		const productOfferings = ProductOfferingUtil.getAllProductOfferings(
			configuredProduct
		);
		productOfferings.forEach(productOffering => {
			const inputtedCharacteristics = ProductOfferingUtil.getInputtedCharacteristics(
				productOffering
			);
			const inputCharacteristics = ProductOfferingUtil.getInputCharacteristics(
				productOffering
			);
			map(inputCharacteristics, (value, key: string) => {
				if (
					get(value, "subType") === "device-reservation" &&
					inputtedCharacteristics[key]
				) {
					result.push({
						id: productOffering.productId,
						value: inputtedCharacteristics[key]
					});
				}
			});
		});
		return result;
	}

	//scans an object, usually a product object for a specific characteristic
	//and returns the value of that characteristic if it's found. Receives Object to scan
	//and the name of the characteristic that should be looked for
	checkForCharacteristic(obj: Object, label: string) {
		if (obj && obj[label]) {
			return obj[label];
		}
		for (const key in obj) {
			if (obj.hasOwnProperty(key)) {
				const keyObject = obj[key];
				if (keyObject && typeof keyObject === "object") {
					const foundLabel = this.checkForCharacteristic(
						keyObject,
						label
					);
					if (foundLabel) {
						return foundLabel;
					}
				}
			}
		}
		return null;
	}

	triggerFnfValidation = (params: Object) => {
		return (dispatch: Function, alt: Object) => {
			return alt.resolve(async () => {
				alt.reduxStore.dispatch(actions.error.clearProductOfferingErrors());
				alt.reduxStore.dispatch(actions.error.clearErrorOnProductTable());

				const errorMessagesMap =
					alt.reduxStore.getState().feature.POSErrorMessagesMap;

				const characteristicsAliases =
					alt.reduxStore.getState().feature.characteristicsAliases;

				const targetAgreementId = get(
					alt,
					"stores.CustomerCaseStore.state.activeAgreementId",
					""
				);
				const agreements = get(alt, "stores.CustomerCaseStore.state.agreements", []);

				const shoppingForAgreement =
					agreements &&
					targetAgreementId &&
					agreements.find(agreement => agreement.id === targetAgreementId);

				const msisdn =
					shoppingForAgreement &&
					head(
						shoppingForAgreement.attributes.products.map(product => {
							const number = ProductUtil.findPhoneNumber(product);
							const name = ProductUtil.getProductName(product);
							return number || name || "";
						})
					);

				const { fnfNumber } = params;

				const errors = [];

				const response = await BasketValidationUtil.validateFnF(fnfNumber, msisdn);

				if (response instanceof ErrorContainer) {
					errors.push({
						characteristic: characteristicsAliases.friendNumber,
						errCode: response["errors"][0]["code"]
					});
				}

				if (errors.length > 0) {
					const returnedErrors = this.mapErrors(
						errors,
						errorMessagesMap
					);
					if (returnedErrors) {
						dispatch(returnedErrors);
					}
				}

				dispatch(response);
			});
		}
	};

	triggerICCIDPreactivationValidation = (params: Object) => {
		const { iccid, path } = params;
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				alt.reduxStore.dispatch(actions.error.clearProductOfferingErrors());

				const errorMessagesMap =
					alt.reduxStore.getState().feature.POSErrorMessagesMap;

				const characteristicsAliases =
					alt.reduxStore.getState().feature.characteristicsAliases;

				const numberOrigin = characteristicsAliases && characteristicsAliases.numberOrigin;

				const conditions = alt.stores.ConsulStore.state.ICCIDValidationConditions;

				const errors = [];

				const response = await BasketValidationUtil.validatePreactivatedICCID({
					iccid,
					conditions,
					numberOrigin,
					path,
					alt
				});

				if (response instanceof ErrorContainer) {
					alt.reduxStore.dispatch(actions.basket.validatePreactivatedICCID(false));
					errors.push({
						characteristic: characteristicsAliases.icc,
						errCode: response["errors"][0]["code"]
					});
				} else {
					alt.reduxStore.dispatch(actions.basket.validatePreactivatedICCID(true));
				}

				if (errors.length > 0) {
					const returnedErrors = this.mapErrors(
						errors,
						errorMessagesMap
					);
					if (returnedErrors) {
						dispatch(returnedErrors);
					}
				}

				dispatch(response);
			});
	};

	validateInputtedCharacteristics({
		product,
		configurations
	}: {
		product: Object,
		configurations: Object
	}) {
		return (dispatch: Function, alt: Object) => {
			return alt.resolve(async () => {
				const characteristicsAliases =
					alt.reduxStore.getState().feature.characteristicsAliases;

				const errorMessagesMap =
					alt.reduxStore.getState().feature.POSErrorMessagesMap;

				const ICCIDValidationPOs =
					alt.reduxStore.getState().feature.ICCIDValidationPOs;

				const ICCIDPreactivationValidationPOs =
					alt.reduxStore.getState().feature.ICCIDPreactivationValidationPOs;

				const ICCIDValidationConditions =
					alt.stores.ConsulStore.state.ICCIDValidationConditions;

				const validateICCID = Array.isArray(ICCIDValidationPOs) && ICCIDValidationPOs.includes(product.id);

				const validatePreactivatedICCID = Array.isArray(ICCIDPreactivationValidationPOs) && ICCIDPreactivationValidationPOs.includes(product.id);

				const errors = [];

				const validators = characteristicsAliases ? [
					{
						characteristic: characteristicsAliases.imei,
						function: BasketValidationUtil.validateImei,
						parameters: this.checkForCharacteristic(
							configurations[product["id"]],
							characteristicsAliases.imei
						)
					},
					{
						characteristic: characteristicsAliases.icc,
						function: BasketValidationUtil.validateICCID,
						parameters: validateICCID ? {
							conditions: ICCIDValidationConditions,
							iccid: this.checkForCharacteristic(
								configurations[product["id"]],
								characteristicsAliases.icc
							)
						} : null
					},
					{
						characteristic: characteristicsAliases.icc,
						function: BasketValidationUtil.validatePreactivatedICCID,
						parameters: validatePreactivatedICCID ? {
							configuration: configurations[product["id"]],
							numberOrigin: characteristicsAliases.numberOrigin,
							conditions: ICCIDValidationConditions,
							iccid: this.checkForCharacteristic(
								configurations[product["id"]],
								characteristicsAliases.icc
							),
							alt
						} : null
					}
				] : [];

				await Promise.all(
					validators
						.filter(validator => !isEmpty(validator.parameters))
						.map(
							async validator =>
								await validator
									.function(validator.parameters)
									.then(result => {
										if (result instanceof ErrorContainer) {
											if(validateICCID){
												alt.reduxStore.dispatch(actions.basket.validateICCID(false));
											} else if (validatePreactivatedICCID){
												alt.reduxStore.dispatch(actions.basket.validatePreactivatedICCID(false));
											}
											errors.push({
												characteristic:
													validator.characteristic,
												errCode:
													result["errors"][0]["code"]
											});
										} else {
											alt.reduxStore.dispatch(actions.basket.validateICCID(true));
											alt.reduxStore.dispatch(actions.basket.validatePreactivatedICCID(true));
										}
									})
						)
				);

				if (errors.length > 0) {
					const returnedErrors = this.mapErrors(
						errors,
						errorMessagesMap
					);
					if (returnedErrors) {
						this.onProductOfferingError(returnedErrors);
					}
					return false;
				} else {
					return true;
				}
			});
		};
	}

	//Receives an array of mapped error-to-translation-objects parsed by
	//mapErrors-function. Dispatches to the ErrorStore.
	onProductOfferingError = (mappedErrors: Array<Object>) => {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				dispatch(mappedErrors);
			});
	};

	//Receives an array of error objects returned and parsed from the backend,
	//and a map of which error code to match with what translated message id
	//from consul. Returns a cherry picked array from the errorMessageMap
	mapErrors(
		errorsToMap: Array<Object>,
		errorMessageMap: Object
	): ?Array<Object> {
		if (errorsToMap && errorMessageMap) {
			let mappedErrors = [];
			mappedErrors = errorsToMap.map((POError: Object): any => {
				const resultArray = errorMessageMap[
					"ErrorMessages"
				].filter((errorMapItem: any) => {
					if (POError.errCode === errorMapItem["errCode"]) {
						return errorMapItem;
					} else {
						return null;
					}
				});
				if (!resultArray[0] && errorsToMap.length !== 0) {
					this.showErrorOnProductTable({ code: "unmapped-error" });
					return null;
				}
				return resultArray[0];
			});
			return mappedErrors;
		} else {
			return null;
		}
	}

	addProductToBasket({
		product,
		configurations,
		parentBasketItem,
		basketId,
		hasCustomer,
		targetAgreementId,
		hasTopUps,
		salesContext
	}: {
		product: Object,
		configurations: Object,
		parentBasketItem?: Object,
		basketId: string,
		hasCustomer: boolean,
		targetAgreementId?: string,
		hasTopUps?: boolean,
		salesContext?: Object
	}) {
		return (dispatch: Function, alt: Object) => {
			alt.reduxStore.dispatch(actions.error.clearProductOfferingErrors());
			alt.reduxStore.dispatch(actions.error.clearErrorOnProductTable());
			const customerBlacklistCheck = alt.reduxStore.getState().feature.customerBlacklistCheck;
			return alt.resolve(async () => {
				if (salesContext) {
					this.updateSalesContextToBasket(salesContext);
				}
				let blacklistedUser = false;
				const isValidInputtedCharacteristics = await this.validateInputtedCharacteristics(
					{ product, configurations }
				);

				// merges user-made configurations into product data
				const configuredProduct = ProductOfferingUtil.mergeConfigurations(
					product,
					configurations
				);

				const specSubType = get(product, "attributes.specSubType");

				const deviceReservationPos = this.getDeviceReservationProducts(
					configuredProduct
				);

				const installationTimeConfig = get(
					alt.reduxStore.getState().productOfferingConfiguration,
					"configurableInstallationTime." + get(configuredProduct, "id")
				);

				const { feature } = alt.reduxStore.getState();

				const disabilityPOError = await this.checkPODisability(
					get(
						alt.stores,
						"CustomerCaseStore.state.activeCustomerCase.attributes.activeCustomer"
					),
					get(feature, "disabilityPOConfig"),
					product.id
				);
				if(customerBlacklistCheck && hasCustomer && specSubType !== 'ADDITIONAL') {
					blacklistedUser = await this.checkBlacklistedUser(
						get(
							alt.stores,
							"CustomerCaseStore.state.activeCustomerCase.attributes.activeCustomer"
						)
					);
				}

				if (isValidInputtedCharacteristics) {
					if (!hasCustomer) {
						this.onAddConfiguredProductToBasket({
							showNoCustomerWarning: true,
							product: configuredProduct,
							basketId
						});
					} else if (!isEmpty(installationTimeConfig)) {
						this.toggleInstallationTimeConfigurationModal(
							true,
							installationTimeConfig
						);
					} else if (!isEmpty(deviceReservationPos)) {
						this.reserveDevices(
							deviceReservationPos,
							configuredProduct,
							basketId,
							targetAgreementId,
							hasTopUps,
							product,
							parentBasketItem
						);
					} else if (disabilityPOError) {
						this.showErrorOnProductTable(disabilityPOError);
					} else if (blacklistedUser) {
						this.onAddConfiguredProductToBasket({
							showBlacklistedCustomerWarning: true
						});
					} else {
						return this.addConfiguredProductToBasket(
							configuredProduct,
							basketId,
							targetAgreementId,
							hasTopUps,
							product,
							parentBasketItem
						);
					}
				}
				dispatch(false);
				return Promise.resolve();
			});
		};
	}

	checkBlacklistedUser = (
		user: Object
	): Object => {
		return (dispatch: Function, alt: Object) => {
			return alt.resolve(async () => {
				let error;
				if(!user) {
					return false;
				}
				const { identifications } = user;
				const { identificationId, type } = identifications[0];
						const resp = await alt.apiCalls.post(
							"/eligibility-decisions",
							{
								type: "eligibility-decisions",
								attributes: {
									recipeId: 'customer-blacklisting-validation',
									parameters: {
										"identification-id": identificationId,
										"identification-type": type
									}
								}
							},
							commonHeaders
						);
						if (resp instanceof ErrorContainer) {
							const code = get(resp, "errors[0].code");
							error = { code };
						}
						return error;
			});
		};
	};

	checkPODisability = (
		user: Object,
		disabilityConfig: Object,
		productOfferingId: string
	): Object => {
		return (dispatch: Function, alt: Object) => {
			return alt.resolve(async () => {
				let error;
				const disabilityPoId = get(disabilityConfig, "poId");
				if (productOfferingId === disabilityPoId) {
					const disabilityId = this.getDisabilityId(
						user,
						disabilityConfig
					);
					if (disabilityId) {
						const { eligibility } = disabilityConfig;
						const resp = await alt.apiCalls.post(
							"/eligibility-decisions",
							{
								type: "eligibility-decisions",
								attributes: {
									recipeId: eligibility.recipeId,
									parameters: {
										"disability-id": disabilityId
									}
								}
							},
							commonHeaders
						);
						if (resp instanceof ErrorContainer) {
							const code = get(resp, "errors[0].code");
							error = { code };
						}
					} else {
						error = { code: "no-disability-identification" };
					}
				}
				return error;
			});
		};
	};

	getDisabilityId(user: Object, disabilityConfig: Object) {
		const getIdentificationByType = (
			identificationType: string,
			user: Object
		) => {
			return get(user, "identifications", []).find(c => {
				return get(c, "type") === identificationType;
			});
		};
		if (user && disabilityConfig) {
			const identificationType = get(
				disabilityConfig,
				"identificationType"
			);
			return get(
				getIdentificationByType(identificationType, user),
				"identificationId"
			);
		}
		return null;
	}

	updateSalesContextToBasket(salesContext: Object) {
		return (dispatch: any, alt: any) =>
			alt.resolve(async () => {
				let basket = get(alt.stores, `BasketStore.state.activeBasket`);
				if (salesContext) {
					basket = R.assocPath(["attributes"], {
						"sales-context": {
							...salesContext
						}
					})(basket);
					return this.updateBasket(basket);
				}
				return false;
			});
	}

	toggleInstallationTimeConfigurationModal(show: boolean, config: Object) {
		return { show, config };
	}

	addConfiguredProductToBasket(
		configuredProduct: ProductOffering,
		basketId: string,
		targetAgreementId: any,
		hasTopUps?: boolean,
		product?: Object,
		parentBasketItem?: Object
	) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				if (basketId) {
					this.updatingBasket(true);
					this.addProductToUIbasket(configuredProduct);
					hasTopUps && product && this.addProductWithTopUps(product);
					this.addShippingMethods(product);
					const { SalesRepSessionStore } = alt.stores;
					const activeAgreements = get(alt, "stores.CustomerCaseStore.state.agreements", []);
					const inputtedCharacteristics = ProductOfferingUtil.getInputtedCharacteristics(
						configuredProduct
					);

					if (inputtedCharacteristics &&
						inputtedCharacteristics.CH_Parent_ID && activeAgreements.length > 0 && targetAgreementId) {
							const matchedAgreement = activeAgreements.find(agreement => {
								return agreement.id === targetAgreementId
							});
							configuredProduct.attributes.inputtedCharacteristics.CH_Parent_ID = get(matchedAgreement, "attributes.products[0].id");
					}
					const address = alt.reduxStore.getState().location.addressValidation.address;
					if (address) {
						if (!configuredProduct.attributes.inputtedCharacteristics) {
							configuredProduct.attributes.inputtedCharacteristics = {};
						}
						configuredProduct.attributes.inputtedCharacteristics["CH_Installation_Location_ID"] = null;
					}
					const basketItem = this.productToBasketItem(
						configuredProduct,
						parentBasketItem,
						basketId,
						get(
							alt,
							"stores.CustomerCaseStore.state.activeAgreementId",
							targetAgreementId ? targetAgreementId : null
						),
						SalesRepSessionStore
					);
					await this.addBasketItemToActiveBasket(
						basketId,
						product,
						basketItem
					);
					return Promise.resolve(
						this.onAddConfiguredProductToBasket({
							hasCustomer: true
						})
					);
				}
				return Promise.resolve(dispatch(false));
			});
	}

	showErrorOnProductTable(error: Object) {
		return error;
	}

	onAddConfiguredProductToBasket(data: Object) {
		return data;
	}

	reserveDevices(
		deviceReservationPos: Array<Object>,
		configuredProduct: ProductOffering,
		basketId: string,
		targetAgreementId: any,
		hasTopUps?: boolean,
		product: ProductOffering,
		parentBasketItem?: Object
	) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const resp = await Promise.all(
					deviceReservationPos.map(d =>
						this.reserveDevice(d.id, d.value)
					)
				);
				const anyFailed = resp.find(r => r instanceof ErrorContainer);
				if (anyFailed) {
					this.showErrorOnProductTable({ code: "out-of-stock" });
				} else {
					return this.addConfiguredProductToBasket(
						configuredProduct,
						basketId,
						targetAgreementId,
						hasTopUps,
						product,
						parentBasketItem
					);
				}
				return Promise.resolve(false);
			});
	}

	reserveDevice(id: string, value: string) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				return await alt.apiCalls.post(
					"/device-reservations",
					{
						type: "device-reservations",
						attributes: {
							sku: id,
							reservedFor: value
						}
					},
					commonHeaders
				);
			});
	}

	cancelAddProduct = () => true;

	createBasket(personId: string) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const basket = personId
					? {
							type: "baskets",
							relationships: {
								owner: {
									data: {
										id: personId,
										type: "persons"
									}
								}
							}
						}
					: {
							type: "baskets"
						};

				const basketResp = await alt.apiCalls.post(
					"/baskets",
					basket,
					commonHeaders
				);

				if (basketResp instanceof ErrorContainer) {
					return this.onError(basketResp);
				} else {
					return Promise.resolve(dispatch(basketResp.data.data));
				}
			});
	}

	addChangePlanBasketItem({
		productOffering,
		basketId,
		targetAgreementId,
		oldSubscriptionProductId
	}: {
		productOffering: Object,
		basketId: string,
		targetAgreementId: string,
		oldSubscriptionProductId: string
	}) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const { SalesRepSessionStore } = alt.stores;
				await this.addBasketItemToActiveBasket(
					basketId,
					productOffering,
					this.productToBasketItem(
						productOffering,
						undefined,
						basketId,
						targetAgreementId,
						SalesRepSessionStore,
						oldSubscriptionProductId
					)
				);
			});
	}

	//@deprecated("basket.actions:deleteItemFromBasket")
	//Migrated From Flux to Redux (BasketService.deleteBasketItemFromBasket)
	removeFromActiveBasket(basketItem: Object, basketId: string) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const resp = await alt.apiCalls.delete(
					`/basketItems/${basketItem.id}`,
					commonHeaders
				);
				if (resp instanceof ErrorContainer) {
					this.onError(resp);
					return this.getBasketIncludeBasketItems(basketId);
				} else {
					return this.getBasket(basketId);
				}
			});
	}

	//Migrated to Redux (actions.basket.deleteItemFromBasket)
	async removeFromBasket(
		basketItem: Object,
		basketId: string,
		shippingMethodFromBasket: boolean
	) {
		await this.updatingBasket(true);
		this.removeFromUIbasket(basketItem);
		await this.removeFromActiveBasket(basketItem, basketId);
		if (!shippingMethodFromBasket) {
			this.removeFromShippingMethods(basketItem);
		}
		return null;
	}

	//Migrated From Flux to Redux(actions.basket.removeShippingMethodsComplete)
	removeFromShippingMethods = (basketItem: Object) => basketItem;

	@deprecated("basket.actions:deleteItemFromBasket")
	//Migrated to Redux (action.basket.removeFromUIBasketComplete)
	removeFromUIbasket = (basketItem: Object) => basketItem;

	addBasketItemToActiveBasket(basketId: string, product: Object, basketItem: Object) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const resp = await alt.apiCalls.post(
					"/basketItems",
					basketItem,
					{
						...commonHeaders,
						"X-Include-Internal-Characteristics": "true"
					}
				);
				if (resp instanceof ErrorContainer) {
					const productName:string = product.attributes.name;
					const errorPayload = { errors: resp.errors, productName };
					alt.reduxStore.dispatch(actions.basketError.addBasketError(errorPayload));
					this.updatingBasket(false);
					return this.onError(resp);
				} else if (resp.status === 401) {
					// Authorization token was expired.
					const error = {
						status: 401,
						link: {
							route: "/",
							id: "back-to-shop-link",
							message: {
								id: "b2c-shop-session-expired-message",
								description: "B2C shop session expired message",
								defaultMessage:
									"Session was expired - clearing session. Please return to shop."
							}
						}
					};
					return this.onError(error);
				} else {
					const address = alt.reduxStore.getState().location.addressValidation.address;
					if (address) {
						alt.reduxStore.dispatch(
							actions.basket.storeAddressWithBasketItemId(
								resp.data.data.attributes.basketProductId,
								address
							)
						);
					}
					return this.getBasketIncludeBasketItems(basketId);
				}
			});
	}

	addProductToUIbasket = (product: Object) => product;

	addProductWithTopUps = (product: Object) => product;

	addShippingMethods = (product: Object) => product;

	setSelectedShippingMethod = (product?: ProductOffering) => product;

	addShippingMethodToBasket() {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const product = get(
					alt.stores.BasketStore.state,
					"selectedShippingMethod"
				);

				const configurations = get(
					alt.reduxStore.getState().productOfferingConfiguration,
					"configurations"
				);

				const parentBasketItem = get(
					alt.stores.BasketStore.state,
					"basketItems[0]"
				);

				const basketId = get(
					alt.stores.BasketStore.state,
					"activeBasket.id"
				);

				const clearUnidentifiedBasket = !isEmpty(product);

				if (clearUnidentifiedBasket) {
					await this.addProductToBasket({
						product,
						configurations,
						parentBasketItem,
						basketId,
						hasCustomer: true
					});
				}

				return Promise.resolve(dispatch({ clearUnidentifiedBasket }));
			});
	}

	// this code is copied to redux/services/AddonService
	@deprecated("redux/services/AddonService")
	initializeAddonEnabling({
		basketItem,
		personId
	}: {
		basketItem: any,
		personId: string
	}) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				dispatch("working");
				const payload = {
					data: {
						type: "products-enable-addon-initialize",
						attributes: {
							basketItem
						},
						relationships: {
							owner: {
								data: {
									type: "persons",
									id: personId
								}
							}
						}
					},
					included: [
						{
							type: "persons",
							id: personId
						}
					]
				};

				const response = await alt.apiCalls.postComplex(
					"/products-enable-addon-initialize?include=basket.basketItems",
					payload,
					commonHeaders
				);

				if (response instanceof ErrorContainer) {
					dispatch(null);
					return this.onError(response);
				} else {
					const data = {
						data: response.data.data,
						included: response.data.included
					};
					return Promise.resolve(dispatch(data));
				}
			});
	}

	@deprecated("redux/services/AddonService")
	enableAddon = (basketId: string, paymentMethod: string) => {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				dispatch(null);
				const payload = {
					type: "products-enable-addon",
					attributes: {
						paymentMethodId: paymentMethod
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

				const resp = await alt.apiCalls.post(
					"/products-enable-addon",
					payload,
					commonHeaders
				);

				if (resp instanceof ErrorContainer) {
					dispatch({ error: resp });
					return this.onError(resp);
				} else {
					return Promise.resolve(dispatch(resp.data.data));
				}
			});
	};

	/**
	 * Updates basket owner
	 * NOTE this is available in BasketService also.
	 */
	updateOwnerToBasket(basket: Object, owner: Object) {
		if (basket && owner) {
			const basketOwnerId = get(BasketUtil.getBasketOwner(basket), "id");

			if (basketOwnerId !== owner.id) {
				basket = R.assocPath(["relationships", "owner"], {
					data: {
						id: owner.id,
						type: "persons"
					}
				})(basket);
				basket = R.assocPath(["relationships", "payer"], {
					data: {
						id: owner.id,
						type: "persons"
					}
				})(basket);
				return this.updateBasket(basket);
			}
			return false;
		}
		return false;
	}

	/**
	 * Set basket up for checkout
	 *
	 * @param basket - Basket that is being configured
	 *
	 **/
	checkoutBasket(basket: Object) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				if (basket) {
					basket = R.assoc("type", "baskets")(basket); // ?
					basket = R.dissocPath(["attributes", "state"])(basket); // ??????????????????
					this.storeBasket(basket);

					alt.history.push(commonServiceDeskRoutes.SERVICE_DESK_CHECKOUT_SETUP.createLink(), { scrollToTop: true });
				}
				return Promise.resolve();
			});
	}

	/**
	 *
	 * Updates currently highlighted basket in store
	 * NOTE this is available in BasketService also.
	 * @param basket - modified basket to replace old basket with
	 *
	 */
	updateBasket(basket: Object) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const newBasket = BasketUtil.sanitizeBasket(basket);
				if (newBasket) {
					const resp = await alt.apiCalls.patch(
						"/baskets/" + newBasket.id,
						newBasket,
						commonHeaders
					);
					if (resp instanceof ErrorContainer) {
						this.onError(resp);
						return Promise.resolve(dispatch(false));
					} else {
						return Promise.resolve(dispatch(resp.data.data));
					}
				}
				return Promise.resolve(dispatch(false));
			});
	}

	/**
	 * Commits the given basket, reserving related resources.
	 * Once a basket is committed, is has the following limitations:
	 * 1) basketItems can not be added or removed
	 * 2) existing basketItems' quantities can no longer be modified
	 * @param basket
	 * @param personId
	 * @param redirectTo
	 */
	commitBasket(
		basket: Object,
		personId: string,
		redirectTo: boolean | string,
		organizationId: string
	) {
		return (dispatch: Function, alt: Object) => {
			const redirectToNewRoute = (redirectTo: string) => {
				if (redirectTo) {
					const path =
						redirectTo === true
							? "/servicedesk/checkout/summary"
							: redirectTo;
					alt.history.push(path, { scrollToTop: true });
				}
			}
			return alt.resolve(async () => {
				const status = get(basket, "attributes.lifecycleStatus");
				const basketItems = get(
					alt.stores.BasketStore.state,
					"basketItems", []
				);
				if (status && status !== "COMMITTED") {
					const request = createCommitBasketItemRequest(
						basket,
						personId,
						organizationId,
						basketItems
					);
					const resp = await alt.apiCalls.postComplex(
						"/baskets-commit?include=basket.basketItems",
						request,
						commonHeaders
					);
					if (resp instanceof ErrorContainer) {
						// NOTE: no flow impacting error handling specified yet, handling all cases similarly for now
						console.error("Failed to commit basket", resp);
					}
					const included = get(resp, "data.included", []);
					const committedBasket = find(included, { type: "baskets" });
					dispatch({
						basket: committedBasket,
						basketItems: filter(included, {
							type: "basketItems"
						})
					});
					redirectToNewRoute(redirectTo);
					return Promise.resolve(committedBasket);
				}
				redirectToNewRoute(redirectTo);
				return Promise.resolve();
			});
		}
	}

	/**
	 * Persist a new basket or update existing basket
	 *
	 * @param basket - Basket to create or update
	 *
	 */
	storeBasket(basket: Object) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				basket = BasketUtil.sanitizeBasket(basket);
				let resp;
				const baseUrl = "/baskets";

				if (!basket.id) {
					resp = await alt.apiCalls.post(
						baseUrl,
						basket,
						commonHeaders
					);
				} else {
					resp = await alt.apiCalls.patch(
						baseUrl + "/" + basket.id,
						basket,
						commonHeaders
					);
				}

				if (resp instanceof ErrorContainer) {
					alt.reduxStore.dispatch(actions.basketError.addBasketError(resp));
					return this.onError(resp);
				} else {
					dispatch(resp.data.data);

					//update customer case with active basket id
					if (
						resp.data.data &&
						alt.stores.CustomerCaseStore &&
						alt.stores.CustomerCaseStore.state.activeCustomerCase
					) {
						alt.actions.CustomerCaseActions.updateCustomerCase(
							alt.stores.CustomerCaseStore.state
								.activeCustomerCase.id,
							R.assocPath(
								[
									"attributes",
									"referenceIds",
									"activeBasketId"
								],
								resp.data.data.id,
								alt.stores.CustomerCaseStore.state
									.activeCustomerCase
							),
							false
						);
					}
					return Promise.resolve();
				}
			});
	}
	deleteUIbasket = () => null;
	refreshActiveBasket = (basket: Object) => basket;
	updateBasketForCheckout = (basket: Object) => basket;
	createNewOwner = (newOwner: Object) => newOwner;
	resetNewOwner = () => null;
	resetValidIcc = () => null;
	resetValidFnF = () => null;

	/**
	 * Fetch msisdn bundle for product
	 *
	 * @param productId of product, for which msisdns will be retrieved
	 * @returns response data and productId
	 */
	getMsisdnBundle(productId: string) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const resp = await alt.apiCalls.get(
					`/productOfferings/${productId}/msisdns`
				);
				return Promise.resolve(
					this.onMsisdnBundleFetch({ resp, productId })
				);
			});
	}

	getNewMsisdnBundle(productId: string) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const resp = await alt.apiCalls.get(
					`/productOfferings/${productId}/msisdns`
				);
				return Promise.resolve(
					this.onMsisdnBundleFetch({ resp, productId })
				);
			});
	}

	onMsisdnBundleFetch = (data: Object) => data;

	resetCheckoutConfiguration() {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				return Promise.resolve(dispatch());
			});
	}

	orderBasket(basketId: string) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const resp = await alt.apiCalls.get(`/baskets/${basketId}`);
				return Promise.resolve(dispatch(resp.data));
			});
	}

	discardBasket(basketId: string, personId: string) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				alt.reduxStore.dispatch(actions.productOfferingConfiguration.resetConfigurations());
				this.deleteUIbasket();
				this.discardBackendBasket(basketId);
				this.createBasket(personId);
				return Promise.resolve();
			});
	}

	discardBackendBasket(basketId: string, hideErrors?: boolean) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const resp = await alt.apiCalls.delete(
					`/baskets/${basketId}`,
					commonHeaders
				);
				/*
                if status was 204 no dispatch required
                basket and items where deleted from front end on #deleteUIbasket
             */

				// Delete failed. Get the basket and items back to front end.
				if (resp instanceof ErrorContainer && !hideErrors) {
					this.getBasketIncludeBasketItems(basketId);
					return this.onError(resp);
				}
				return Promise.resolve();
			});
	}

	clearOrderBasket = () => null;
	clearActiveBasket = () => null;
	activateCheckoutStep = (payload: Object) => payload;
	resetCheckoutSteps = () => null;
	closeBasketMenuNotification = () => null;

	addUnidentifiedCustomerBasketProductToBasket() {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const product = get(
					alt.stores.BasketStore.state,
					"unidentifiedCustomerBasket.product"
				);

				const basketId = get(
					alt.stores.BasketStore.state,
					"activeBasket.id"
				);

				const configurations = get(
					alt.reduxStore.getState().productOfferingConfiguration,
					"configurations"
				);

				const agreementId = get(
					alt.stores.CustomerCaseStore,
					"activeAgreementId"
				);

				const clearUnidentifiedBasket = !isEmpty(product);

				if (clearUnidentifiedBasket) {
					await this.addProductToBasket({
						product,
						basketId,
						configurations,
						hasCustomer: true,
						agreementId
					});
				}

				return Promise.resolve(dispatch({ clearUnidentifiedBasket }));
			});
	}

	applyDiscountToBasket(discountPO: ProductOffering) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const basketStoreState = alt.stores.BasketStore.state;
				const { reasonForAction, activeBasket } = basketStoreState;
				const payload = {
					type: "basketItems",
					attributes: {
						product: {
							id: discountPO.id
						},
						quantity: 1,
						inputtedCharacteristics: {},
						childBasketItems: [],
						targetAgreementId: null,
						reasonForAction
					},
					relationships: {
						basket: {
							data: {
								id: activeBasket.id,
								type: "baskets"
							}
						}
					}
				};

				const resp = await alt.apiCalls.post(
					"/basketItems",
					payload,
					commonHeaders
				);

				if (resp instanceof ErrorContainer) {
					this.onError(resp);
					return Promise.resolve(false);
				} else {
					this.getBasketIncludeBasketItems(activeBasket.id);
					return Promise.resolve(dispatch(discountPO));
				}
			});
	}

	removeSelectedDiscount = () => true;

	fetchDiscounts(basketId: string) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				if (basketId) {
					const resp = await alt.apiCalls.get(
						`/baskets/${basketId}/eligiblePromotions`
					);

					if (resp instanceof ErrorContainer) {
						this.onError(resp);
						return Promise.resolve(false);
					} else {
						return Promise.resolve(dispatch(resp.data));
					}
				} else {
					return Promise.resolve(false);
				}
			});
	}

	clearAddonInitializations = () => true;

	handleErrors(response: Object) {
		return { errors: get(response, "errors") };
	}

	submitBasket(basketId: string, hideLifeCycleStatusChangeModal?: boolean) {
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
					"/baskets-submit?include=basket.basketItems",
					payload,
					commonHeaders
				);
				if (response instanceof ErrorContainer) {
					return this.onError(response);
				}
				const submittedBasket = find(get(response, "data.included"), {
					type: "baskets",
					attributes: {
						lifecycleStatus: "SUBMITTED"
					}
				});

				const submittedBasketItems =
					(submittedBasket &&
						get(response, "data.included", []).filter(
							item => item.type === "basketItems"
						)) ||
					[];

				if (submittedBasket && hideLifeCycleStatusChangeModal) {
					submittedBasket.hideLifeCycleStatusChangeModal = true;
				}

				return Promise.resolve(
					this.handleBasketAfterPayment(
						submittedBasket,
						submittedBasketItems
					)
				);
			});
	}

	handleBasketAfterPayment(
		submittedBasket?: Object,
		submittedBasketItems: Array<Object>
	) {
		return {
			submittedBasket,
			submittedBasketItems
		};
	}

	getBasketProducts(basketItemProductId: string) {
		return (dispatch: any, alt: any) =>
			alt.resolve(async () => {
				const resp = await alt.apiCalls.get(
					`/basket-products/${basketItemProductId}`,
					commonHeaders
				);

				if (resp instanceof ErrorContainer) {
					return this.onError(resp);
				}
				return Promise.resolve(dispatch(resp.data));
			});
	}

	updateBasketProduct(basketProductId: string, productAttributes: Object) {
		return (dispatch: Function, alt: Object) => {
			alt.resolve(async () => {
				return await alt.apiCalls.patch(
					`/basket-products/${basketProductId}`,
					{
						attributes: {
							inputtedCharacteristics: productAttributes
						},
						type: "basket-products"
					},
					commonHeaders
				);
			});
		};
	}

	/* TODO takes browser to another page even if request fails!
	 * data:  [{basketProductId: UUID, attributes}, {...}]
	 */
	updateBasketProducts(data: Array<{ basketProductId: string, attributes: Object}>) {
		return (dispatch: Function, alt: Object) => {
			alt.resolve(async () => {
				await Promise.all(
					data.map(entry =>
						this.updateBasketProduct(
							entry.basketProductId,
							entry.attributes
						)
					)
				);

				return Promise.resolve();
			});
		};
	}
}

export default BasketActions

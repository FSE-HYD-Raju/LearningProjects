// @flow

import BaseStore from "./BaseStore";
import R from "ramda";
import { SessionKeys, SessionUtils } from "../../utils/SessionUtils";
import { BasketSelectors } from "../../selectors";
import ImmStore from "../seamless-alt";
import type {
	ProductOffering,
	ProductOfferingGroup,
	BasketCheckoutSteps,
	BasketType
} from "omnichannel-flow-pos";
import isEmpty from "lodash/isEmpty";
import filter from "lodash/filter";
import get from "lodash/get";
import find from "lodash/find";
import { deprecated } from "../../redux";
import { ErrorContainer } from "../../redux/services";

@ImmStore
class BasketStore extends BaseStore {
	state: {
		activeBasket: BasketType,
		basketItems: Array<{ id: string, attributes?: Object }>,
		checkoutConfiguration: {
			setupConfiguration: Object
		},
		checkoutSteps: BasketCheckoutSteps,
		requestedMandatoryConfiguration: ?Object,
		showNoCustomerWarning: boolean,
		unidentifiedCustomerBasket: {
			product: ?Object,
			basketId: string
		},
		msisdns: {},
		addonUpdateInProgress: boolean,
		reason: any,
		selectedDiscount: ?ProductOffering,
		discounts: ?Array<ProductOffering>,
		addonEnableError: ?string,
		submittedBasket: ?Object,
		submittedBasketItems: ?Array<Object>,
		basketProducts: ?Object,
		productsWithTopUps: Array<Object>,
		shippingMethods: Array<ShippingMethod>,
		selectedShippingMethod: ProductOffering,
		showInstallationTimeConfigurationModal: boolean,
		installationTimeConfig: ?Object,
		basketProducts: ?Object,
		updatingBasket: boolean,
		deliveryOptionsGroup: string,
		portInData: ?Object,
		storedTopupProduct: ?Object,
		validIcc: ?boolean,
		validFnF: ?boolean,
		showBlacklistedCustomerWarning: boolean,
	};

	constructor() {
		super();
		this.bindActions(this.alt.actions.BasketActions);
		this.bindAction(
			this.alt.actions.PaymentActions.selectPaymentMethod,
			this.handleBasketAfterPayment
		);
		this.bindAction(
			this.alt.actions.PaymentActions.validatePayment,
			this.handleBasketAfterPayment
		);
		this.bindAction(
			this.alt.actions.DigitalLifeActions.clearChangeMsisdn,
			this.clearSubmittedBasket
		);
		this.bindAction(
			this.alt.actions.SalesActions.resetProductChange,
			this.clearSubmittedBasket
		);
		// TODO $FlowFixMe
		this.state = {
			activeBasket: null,
			unidentifiedCustomerBasket: {
				product: null,
				basketId: ""
			},
			basketItems: [],
			checkoutConfiguration: {
				setupConfiguration: {}
			},
			checkoutSteps: {},
			requestedMandatoryConfiguration: {},
			showNoCustomerWarning: false,
			addonUpdateInProgress: false,
			reasonForAction: {
				value: "add promotion"
			}, // This is a hardcoded thing related to how basket discounts work. This should come from consul or something
			selectedDiscount: {},
			discounts: [],
			initializedAddon: undefined,
			addonEnableError: null,
			submittedBasket: null,
			submittedBasketItems: null,
			basketProducts: null,
			showInstallationTimeConfigurationModal: false,
			installationTimeConfig: null,
			committedBasket: null,
			committedBasketItems: null,
			productsWithTopUps: [],
			shippingMethods: [],
			selectedShippingMethod: null,
			updatingBasket: false,
			portInData: null,
			storedTopupProduct: null,
			validIcc: false,
			validFnF: false,
			showBlacklistedCustomerWarning: false,
		};

		this.exportPublicMethods({
			getCost: this.getCost,
			getChildBasketCost: this.getChildBasketCost,
			productIsInBasket: this.productIsInBasket
		});
	}

	productIsInBasket = (product: ProductOffering | ProductOfferingGroup) => {
		return BasketSelectors.isProductInBasket(
			product,
			this.state.basketItems
		);
	};

	getBasket(activeBasket: Object) {
		this.setState({ activeBasket, updatingBasket: false });
	}

	deleteUIbasket() {
		this.setState({
			activeBasket: null,
			basketItems: [],
			shippingMethods: [],
			selectedShippingMethod: null
		});
	}

	getBasketIncludeBasketItems(basketData: Object) {
		if (this.state.activeBasket) {
			this.setState({
				activeBasket: basketData.basket,
				basketItems: basketData.basketItems,
				working: false,
				updatingBasket: false
			});
		}
		if (this.state.committedBasket) {
			this.setState({
				committedBasket: basketData.basket,
				committedBasketItems: basketData.basketItems,
				working: false,
				updatingBasket: false
			});
		}

		if (this.state.submittedBasketItems) {
			this.setState({
				submittedBasket: basketData.basket,
				submittedBasketItems: basketData.basketItems,
				working: false,
				updatingBasket: false
			});
		}
	}

	saveRequestedMandatoryConfiguration(configuration: Object) {
		this.setState({
			requestedMandatoryConfiguration: configuration
		});
	}

	saveSetupConfiguration(configuration: Object) {
		const newConfiguration = R.merge(
			this.state.checkoutConfiguration.setupConfiguration[
				configuration.productId
			],
			configuration.configuration
		);
		this.setState({
			checkoutConfiguration: R.assocPath(
				["setupConfiguration", configuration.productId],
				newConfiguration,
				this.state.checkoutConfiguration
			)
		});
	}

	resetRequestedMandatoryConfiguration() {
		this.setState({
			requestedMandatoryConfiguration: {},
			checkoutConfiguration: {
				setupConfiguration: {}
			}
		});
	}

	getCost(ItemOrBasket: Object = this.state.activeBasket, type: String) {
		if (!ItemOrBasket) {
			return {
				cost: 0,
				currency: "USD"
			};
		}

		const prices = find(
			get(ItemOrBasket, "attributes.totalPrices"),
			prices => get(prices, "type") === type
		);
		const cost = get(prices, "taxFreeAmount", 0);
		const currency = get(prices, "currency", "USD");
		return { cost, currency };
	}

	getChildBasketCost() {
		return {};
	}

	handleBasketAfterPayment(data: Object) {
		const submittedBasket = get(data, "submittedBasket");
		const submittedBasketItems = get(data, "submittedBasketItems");
		const committedBasket = get(data, "committedBasket");
		const committedBasketItems = get(data, "committedBasketItems");

		if (!isEmpty(submittedBasket) && !isEmpty(submittedBasketItems)) {
			this.setState({
				submittedBasket,
				submittedBasketItems,
				activeBasket: null,
				basketItems: null
			});
		}

		if (!isEmpty(committedBasket) && !isEmpty(committedBasketItems)) {
			this.setState({
				committedBasket,
				committedBasketItems,
				activeBasket: null,
				basketItems: null
			});
		}
	}

	refreshActiveBasket(data: Object) {
		this.setState({
			activeBasket: data,
			working: false
		});
	}

	updateBasket(basket: Object) {
		if (basket !== false) {
			this.setState({
				activeBasket: basket
			});
		}
	}

	commitBasket(entity: Object) {
		this.setState({
			activeBasket: entity.basket,
			basketItems: entity.basketItems,
			committedBasket: entity.basket,
			committedBasketItems: entity.basketItems
		});
	}

	updateBasketForCheckout(basket: Object) {
		this.waitFor(this.alt.stores.DigitalLifeStore);
		this.setState({
			activeBasket: basket
		});
	}

	createNewOwner(newOwner: Object) {
		this.setState({
			newOwner
		});
	}

	resetNewOwner() {
		this.setState({
			newOwner: null
		});
	}

	resetValidIcc() {
		this.setState({
			validIcc: false
		});
	}

	resetValidFnF() {
		this.setState({
			validFnF: false
		});
	}

	createBasket(activeBasket: Object) {
		this.setState({
			activeBasket,
			basketItems: []
		});
	}

	hideNoCustomerWarning({
		showNoCustomerWarning
	}: {
		showNoCustomerWarning: boolean
	}) {
		this.setState({
			showNoCustomerWarning
		});
	}

	hideBlacklistedCustomerWarning() {
		this.setState({
			showBlacklistedCustomerWarning: false
		});
	}

	toggleInstallationTimeConfigurationModal(data: Object) {
		this.setState({
			showInstallationTimeConfigurationModal: data.show,
			installationTimeConfig: data.config
		});
	}

	onAddConfiguredProductToBasket({
		showNoCustomerWarning,
		product,
		basketId,
		showInstallationTimeConfigurationModal,
		showBlacklistedCustomerWarning
	}: Object) {
		if (!this.state.showNoCustomerWarning) {
			this.setState({
				showNoCustomerWarning,
				showBlacklistedCustomerWarning,
				unidentifiedCustomerBasket:
					product && basketId
						? {
								product,
								basketId
							}
						: { ...this.state.unidentifiedCustomerBasket },
				updatingBasket: false
			});
		} else {
			this.setState({
				unidentifiedCustomerBasket: {
					product: null,
					basketId: ""
				},
				updatingBasket: false
			});
		}
	}

	cancelAddProduct() {
		this.setState({
			showNoCustomerWarning: false,
			showBlacklistedCustomerWarning: false,
			unidentifiedCustomerBasket: {
				product: null,
				basketId: ""
			}
		});
	}

	//Migrated to Redux (action.basket.removeFromUIBasketComplete)
	removeFromUIbasket(basketItemToRemove: Object) {
		const basketItems = filter(this.state.basketItems, basketItem => {
			return basketItem.id !== basketItemToRemove.id;
		});
		this.setState({
			basketItems
		});
	}

	addProductToUIbasket(product: Object) {
		if (this.state.basketItems) {
			const basketItems = R.insert(
				this.state.basketItems.length,
				product,
				this.state.basketItems
			);
			this.setState({
				basketItems,
				showBasketMenuNotification: true
			});
		}

		if (this.state.committedBasketItems) {
			const basketItems = R.insert(
				this.state.committedBasketItems.length,
				product,
				this.state.committedBasketItems
			);
			this.setState({
				committedBasketItems: basketItems,
				showBasketMenuNotification: true
			});
		}

		if (this.state.submittedBasketItems) {
			const basketItems = R.insert(
				this.state.submittedBasketItems.length,
				product,
				this.state.submittedBasketItems
			);
			this.setState({
				submittedBasketItems: basketItems,
				showBasketMenuNotification: true
			});
		}
	}

	addProductWithTopUps(product: Object) {
		const exists = this.state.productsWithTopUps.find(
			p => p.id === product.id
		);
		if (!exists) {
			this.setState({
				productsWithTopUps: this.state.productsWithTopUps.concat(
					product
				)
			});
		}
	}

	//Migrated From Flux to Redux(actions.basket.removeShippingMethodsComplete)
	removeFromShippingMethods(basketItem: Object) {
		const id =
			basketItem &&
			basketItem.attributes &&
			basketItem.attributes.product &&
			basketItem.attributes.product.id;

		const array = [...this.state.shippingMethods];
		const index = array.indexOf(o => o.id === id);
		array.splice(index, 1);
		this.setState({ shippingMethods: array });
	}

	addShippingMethods(product: Object) {
		const { feature } = this.alt.reduxStore.getState();

		const shipping =
			product &&
			product.attributes &&
			product.attributes.productOfferingGroups &&
			product.attributes.productOfferingGroups.find(
				pog => pog.id === feature.deliveryOptionsGroup
			);

		if (!isEmpty(shipping)) {
			const shippingMethod = {
				id: product.id,
				data: shipping
			};

			this.setState({
				shippingMethods: this.state.shippingMethods.concat(
					shippingMethod
				)
			});
		}
	}

	setSelectedShippingMethod(product: ProductOffering) {
		this.setState({ selectedShippingMethod: product });
	}

	updatingBasket(updatingBasket: boolean) {
		this.setState({ updatingBasket });
	}

	onMsisdnBundleFetch(data: Object) {
		/* This code block provides msisdns for the plan config modal in pos. The one below this
		 is the old implementation that I believe b2c still uses */
		if (data.resp && data.resp.data) {
			const msisdns = data.resp.data.map(m => m.attributes.number);
			this.setState({
				msisdns: {
					[data.productId]: msisdns
				}
			});
		}

		let newConfiguration = R.assoc(
			"selectedMsisdn",
			null,
			this.state.checkoutConfiguration.setupConfiguration[data.productId]
		);
		newConfiguration = R.assoc("newNumber", null, newConfiguration);
		if (data.resp && data.resp.data) {
			const msisdns = data.resp.data.map(m => m.attributes.number);
			newConfiguration = R.assoc("msisdns", msisdns, newConfiguration);
		}
		this.setState({
			checkoutConfiguration: R.assocPath(
				["setupConfiguration", data.productId],
				newConfiguration,
				this.state.checkoutConfiguration
			)
		});
	}

	orderBasket(basket: Object) {
		SessionUtils.removeItem(SessionKeys.activeBasketId);
		this.setState({
			activeBasket: null,
			orderBasket: basket
		});
	}

	clearOrderBasket() {
		this.setState({
			orderBasket: null
		});
	}

	clearActiveBasket() {
		SessionUtils.removeItem(SessionKeys.activeBasketId);
		this.setState({
			activeBasket: null,
			unidentifiedCustomerBasket: {
				product: null,
				basketId: ""
			},
			shippingMethods: null
		});
	}

	activateCheckoutStep = ({
		step,
		valid
	}: {
		step: string,
		valid: boolean
	}) => {
		const checkoutSteps = {
			...this.state.checkoutSteps,
			[step]: valid,
			activeStep: step,
			visited: {
				...this.state.checkoutSteps.visited,
				[step]: true,
			}
		};
		this.setState({
			checkoutSteps
		});
	};

	resetCheckoutSteps() {
		this.setState({
			checkoutSteps: {
				activeStep: "",
				visited: {}
			}
		})
	}

	closeBasketMenuNotification() {
		this.setState({ showBasketMenuNotification: false });
	}

	// this code is partially copied to redux/services/AddonService
	@deprecated("redux/services/AddonService")
	enableAddon(addonPayload: Object) {
		const paymentCompleted =
			addonPayload &&
			get(addonPayload, "attributes.paymentInfo.paymentCompleted");

		if (addonPayload === null) {
			this.setState({
				addonUpdateInProgress: true
			});
		} else if (paymentCompleted === false || addonPayload.error) {
			const errorCode = get(
				addonPayload,
				"attributes.paymentInfo.paymentErrorCode"
			);

			this.setState({
				addonUpdateInProgress: false,
				addonEnableError: errorCode || this.state.addonEnableError,
				addonSuccessfullyUpdated: false
			});
		} else {
			this.setState({
				addonUpdateInProgress: false,
				addonSuccessfullyUpdated: true
			});

			setTimeout(() => {
				this.clearAddonInitializations();
				this.setState({
					addonSuccessfullyUpdated: false
				});
			}, 1000);
		}
	}

	addUnidentifiedCustomerBasketProductToBasket({
		clearUnidentifiedBasket
	}: {
		clearUnidentifiedBasket: boolean
	}) {
		if (clearUnidentifiedBasket) {
			this.setState({
				unidentifiedCustomerBasket: {
					product: null,
					basketId: ""
				}
			});
		}
	}

	applyDiscountToBasket(discount: ProductOffering) {
		if (discount) {
			this.setState({
				selectedDiscount: discount
			});
		}
	}

	removeSelectedDiscount() {
		this.setState({ selectedDiscount: {} });
	}

	fetchDiscounts(discounts: ?Array<ProductOffering>) {
		if (discounts) {
			this.setState({
				discounts
			});
		}
	}

	@deprecated("redux/services/AddonService")
	initializeAddonEnabling(payload: any) {
		if (payload === "working") {
			this.setState({
				addonInitializeInProgress: true
			});
		} else if (payload) {
			// this code is copied to redux/services/AddonService
			this.setState({
				initializedAddon: {
					...payload.data,
					basketId: payload.data.id,
					basketItems: payload.included.filter(
						include => include.type === "basketItems"
					)
				},
				addonInitializeInProgress: false
			});
		} else {
			this.setState({
				initializedAddon: undefined,
				addonInitializeInProgress: false
			});
		}
	}

	clearAddonInitializations() {
		this.setState({
			initializedAddon: undefined,
			addonEnableError: null
		});
	}

	clearSubmittedBasket() {
		this.setState({
			submittedBasket: null,
			submittedBasketItems: null
		});
	}

	getBasketProducts(basketProducts: Object) {
		this.setState({
			basketProducts
		});
	}

	onReserveDeviceError(error: Object) {
		this.setState({
			error
		});
	}

	triggerICCIDPreactivationValidation(response: Object) {
		if (!response.data || response.data instanceof ErrorContainer) {
			this.setState({
				validIcc: false
			});
		} else {
			get(response, "data.attributes.icc") && this.setState({
				validIcc: true
			});
		}
	}

	triggerFnfValidation(response: Object) {
		if (!response || response instanceof ErrorContainer) {
			this.setState({
				validFnF: false
			});
		} else {
			get(response, "data") && this.setState({
				validFnF: true
			});
		}
	}

}

export default BasketStore;

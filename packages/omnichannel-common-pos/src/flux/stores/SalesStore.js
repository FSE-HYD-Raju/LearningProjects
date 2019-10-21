// @flow

import BaseStore from "./BaseStore";
import type { ProductPriceType } from "../../components/product/ProductPriceType";
import { ErrorContainer, deprecated } from "../../redux";
import ProductOfferingUtil from "../../utils/ProductOfferingUtil";
import _ from "lodash";
import _isEmpty from "lodash/isEmpty";
import ImmStore from "../seamless-alt";
import type {
	ProductOffering,
	ProductFilterRangeType,
	ProductFilterType,
	ProductOfferingGroup
} from "omnichannel-flow-pos";

@ImmStore
class SalesStore extends BaseStore {
	doSetInputtedCharacteristic: () => void;

	state: {
		product?: ProductOffering | ProductOfferingGroup | null,
		barcode: ?string,
		productNotFound: boolean,
		products: Array<ProductOffering | ProductOfferingGroup>,
		subCategories: Array<*>,
		productCategory: ?string,
		activeFilters: Array<ProductFilterType>,
		filters: Array<ProductFilterType>,
		onlyFilterUpdated: boolean,
		priceType: ProductPriceType,
		priceRange: {
			upfront: ProductFilterRangeType,
			recurring: ProductFilterRangeType
		},
		searchTerm: string,
		showFilterControls: boolean,
		applyIncludedMinutesFilter: boolean,
		minutesFilterValues: ?ProductFilterRangeType,
		minutesRange: ?ProductFilterRangeType,
		addonsCategoryIds: ?Array<string>,
		phonesCategoryId: ?string,
		plansCategoryId: ?string,
		targetAgreementId: ?number,
		productConfigurationSummary: Object | null,
		combinedFilters: Object,
		focusedProductId: ?string,
		eligiblePaymentMethods: Object | null,
		paymentInfo: Object | null,
		activeAgreementId: ?string,
		showAgreementSelection: boolean,
		submittedNewPlanBasket: Object,
		submittedNewPlanBasketItems: Object,
		newPlanPaymentInfo: Object,
		newPlanContextualPaymentMethodId: string | null,
		productConfigurationInitialization: Object | null
	};

	constructor() {
		super();
		this.bindActions(this.alt.actions.SalesActions);
		this.bindAction(
			this.alt.actions.BasketActions.storeBasket,
			this.resetAfterBasketStore
		);
		this.bindActions(this.alt.actions.ConsulActions);
		this.state = {
			product: null,
			barcode: "",
			productNotFound: false,
			products: [],
			productsFetched: false,
			subCategories: [],
			activeFilters: [],
			combinedFilters: {},
			productCategory: "",
			addonsCategoryIds: [],
			phonesCategoryId: "",
			plansCategoryId: "",
			onlyFilterUpdated: false,
			priceType: "allPrices",
			priceRange: {
				upfront: {
					min: 0,
					max: 0
				},
				recurring: {
					min: 0,
					max: 0
				}
			},
			searchTerm: "",
			showFilterControls: false,
			filters: [],
			applyIncludedMinutesFilter: false,
			minutesFilterValues: undefined,
			minutesRange: undefined,
			targetAgreementId: undefined,
			productConfigurationSummary: null,
			focusedProductId: "",
			eligiblePaymentMethods: null,
			paymentInfo: null,
			activeAgreementId: null,
			showAgreementSelection: false,
			submittedNewPlanBasket: {},
			submittedNewPlanBasketItems: {},
			newPlanPaymentInfo: {},
			newPlanContextualPaymentMethodId: null,
			productConfigurationInitialization: null
		};

		this.exportPublicMethods({
			filterProducts: this.filterProducts,
			getBoundariesForPriceRange: this.getBoundariesForPriceRange,
			updatePriceRange: this.updatePriceRange
		});
	}

	saveBarcode(value: string) {
		this.setState({
			barcode: value,
			productNotFound: false
		});
	}

	resetAfterBasketStore() {
		this.setState({
			barcode: "",
			product: null
		});
	}

	findProduct(product: Object) {
		if (product) {
			this.setState({
				productNotFound: false,
				product
			});
		} else {
			this.setState({
				productNotFound: true
			});
		}
	}

	getProductById(product: Object) {
		if (product) {
			// Returns array
			const productsWithDefaultSelections = ProductOfferingUtil.makeDefaultSelections([product]);
			this.setState({
				productNotFound: false,
				product: Array.isArray(productsWithDefaultSelections) && _.head(productsWithDefaultSelections)
			});
		} else {
			this.setState({
				productNotFound: true
			});
		}
	}

	getProductToConfigure(productToConfigure: Object) {
		if (productToConfigure) {
			this.setState({
				productToConfigure
			});
		}
	}

	getProductsByIds(products?: Array<ProductOffering | ProductOfferingGroup>) {
		if (products) {
			this.setState({
				productNotFound: false,
				products,
				skipFilters: false
			});
		} else {
			this.setState({
				productNotFound: true,
				skipFilters: false
			});
		}
	}

	getProductsFromCategory({
		working,
		products,
		filters,
		categoryId
	}: {
		working: boolean,
		products: ?Array<ProductOffering | ProductOfferingGroup>,
		filters: Array<ProductFilterType>,
		categoryId: string
	}) {
		if (working) {
			this.setState({
				fetchingProducts: true,
				skipFilters: false
			});
		} else {
			const activeFilters =
				filters &&
				filters.filter(filter => filter.values).map(filter => {
					return {
						...filter,
						values: {
							..._.mapValues(filter.values, () => false)
						}
					};
				});
			this.setState({
				/* TODO: $FlowFixMe */
				products: ProductOfferingUtil.makeDefaultSelections(products),
				productCategory: categoryId,
				fetchingProducts: false,
				productsFetched: true,
				activeFilters,
				filters,
				priceRange: this.getBoundariesForPriceRange(products),
				minutesRange: this.getMinutesRange(filters),
				minutesFilterValues: this.getMinutesRange(filters),
				searchTerm: "",
				applyIncludedMinutesFilter: false,
				combinedFilters: {},
				skipFilters: false
			});
		}
	}

	getSubCategories({
		subCategories,
		filters,
		categoryId
	}: {
		subCategories: ?Array<*>,
		filters: Array<ProductFilterType>,
		categoryId: string
	}) {
		if (subCategories) {
			this.setState({
				productNotFound: false,
				subCategories
			});
			const productOfferings = subCategories.reduce(
				(productOffering, subCategory) => {
					return productOffering.concat(
						subCategory.attributes.productOfferings
					);
				},
				[]
			);

			this.getProductsFromCategory({
				working: false,
				products: productOfferings,
				filters,
				categoryId
			});
		} else {
			this.setState({
				productNotFound: true
			});
		}
	}

	getMinutesRange = (filters: Array<*>): ?ProductFilterRangeType => {
		const minutesRange: any = _.find(filters, filter => {
			return filter.filterLabel === "voice";
		});
		if (minutesRange) {
			return {
				min: minutesRange.min < minutesRange.max ? minutesRange.min : 0,
				max: minutesRange.max
			};
		} else {
			return null;
		}
	};

	handleSearch = (input: string) => {
		this.setState({
			searchTerm: input
		});
	};

	resetSearch = () => {
		this.setState({
			searchTerm: ""
		});
	};

	resetActiveFilters = () => {
		const activeFilters =
			this.state.filters &&
			this.state.filters.filter(filter => filter.values).map(filter => {
				return {
					...filter,
					values: {
						..._.mapValues(filter.values, () => false)
					}
				};
			});
		this.setState({
			activeFilters
		});
	};

	toggleFilter({ id, filterKey }: { id: string, filterKey: string }) {
		const currentFilter = this.state.activeFilters.find(
			filter => filter.id === id
		);
		const values = currentFilter && currentFilter.values;

		if (!currentFilter || !values) {
			return;
		}

		const newFilter = {
			...currentFilter,
			values: {
				...values,
				[filterKey]: values && !values[filterKey]
			}
		};

		this.setState({
			activeFilters: [
				...this.state.activeFilters.filter(
					filter => filter.id !== currentFilter.id
				),
				newFilter
			],
			onlyFilterUpdated: true
		});
	}

	toggleCombinedFilter = (filter: Object) => {
		const filterLabel = filter.filterLabel;
		if (_.has(this.state.combinedFilters, filter.filterLabel)) {
			const newFilters = _.omit(this.state.combinedFilters, [
				`${filterLabel}`
			]);
			this.setState({ combinedFilters: newFilters });
		} else {
			const filterObject = {};
			filterObject[filterLabel] = filter;
			const currentFilters = this.state.combinedFilters;
			const newFilters = { ...currentFilters, ...filterObject };
			this.setState({ combinedFilters: newFilters });
		}
	};

	resetFilters = () => {
		const { filters } = this.state;

		const activeFilters =
			filters &&
			filters.filter(filter => filter.values).map(filter => {
				return {
					...filter,
					values: {
						..._.mapValues(filter.values, () => false)
					}
				};
			});

		this.setState({
			activeFilters: activeFilters || [],
			onlyFilterUpdated: false,
			searchTerm: "",
			minutesFilterValues: {},
			applyIncludedMinutesFilter: false,
			combinedFilters: {},
			priceRange: this.getBoundariesForPriceRange(this.state.products),
		});
	};

	isPriceRangeLegit = (
		priceType: ProductPriceType,
		range: ?{
			[ProductPriceType]: ?ProductFilterRangeType
		}
	) => {
		const rangeForType = range && range[priceType];
		const priceRange = rangeForType && {
			min: rangeForType.min,
			max: rangeForType.max
		};
		return priceRange && priceRange.min < priceRange.max;
	};

	updatePriceRange = (
		products: Array<ProductOffering | ProductOfferingGroup>,
		onlyFilterUpdated: boolean = this.state.onlyFilterUpdated
	) => {
		const range = this.getBoundariesForPriceRange(products);
		if (!range) {
			return;
		}

		let priceType = this.state.priceType;
		if (products.length > 0) {
			if (range && !range[priceType] && priceType === "recurring") {
				priceType = "upfront";
			}
			if (range && !range[priceType] && priceType === "upfront") {
				priceType = "recurring";
			}
		}

		const rangeForType = range && range[priceType];
		let priceRange = rangeForType && {
			min: rangeForType.min,
			max: rangeForType.max
		};

		// $FlowFixMe
		const priceRangeIsLegit = this.isPriceRangeLegit(priceType, range);
		if (!priceRangeIsLegit && priceType && range && range[priceType]) {
			priceRange = {
				min: range[priceType].min,
				max: range[priceType].max
			};
		}

		if (!onlyFilterUpdated) {
			this.setState({
				priceRange: { ...this.state.priceRange, [priceType]: priceRange },
				priceType,
				searchTerm: ""
			});
		}
	};

	productHasCharacteristic = (
		filter: ProductFilterType,
		product: ProductOffering | ProductOfferingGroup
	) => {
		return (
			filter.matchers &&
			filter.matchers.some(matcher => {
				const hasInstanceCharacteristic =
					matcher.type === "instanceCharacteristic" &&
					findCharacteristic(
						filter,
						matcher,
						product,
						"instanceCharacteristics"
					);
				const hasInputCharacteristic =
					matcher.type === "inputCharacteristic" &&
					findCharacteristic(
						filter,
						matcher,
						product,
						"inputCharacteristics"
					);
				return hasInstanceCharacteristic || hasInputCharacteristic;
			})
		);

		function findCharacteristic(
			filter,
			matcher,
			product,
			characteristicType
		) {
			if (!product || !filter || !filter.values || !matcher) {
				return false;
			}

			const filterCharacteristic = _.get(matcher, "characteristic");

			const filterKeys = _.keys(filter.values);
			const item = product;
			const characteristics =
				_.get(item, characteristicType) ||
				_.get(item, "attributes." + characteristicType);

			if (characteristics) {
				const characteristicsKeys = _.keys(characteristics);

				if (
					characteristicsKeys &&
					characteristicsKeys.includes(filterCharacteristic)
				) {
					const { values } = characteristics[filterCharacteristic];
					const found =
						values &&
						values.some(value =>
							filterKeys.some(
								filterKey =>
									value.value === filterKey &&
									_.get(filter, ["values", filterKey]) ===
										true
							)
						);

					if (found) {
						return true;
					}
				}
			}

			const productOfferingGroups =
				_.get(item, "productOfferingGroups") ||
				_.get(item, "attributes.productOfferingGroups");
			const productOfferings =
				_.get(item, "productOfferings") ||
				_.get(item, "attributes.productOfferings");

			const childPogHasIcc =
				productOfferingGroups &&
				productOfferingGroups.length > 0 &&
				productOfferingGroups.some(pog =>
					findCharacteristic(filter, matcher, pog, characteristicType)
				);
			if (childPogHasIcc) {
				return true;
			}

			const childPoHasIcc =
				productOfferings &&
				productOfferings.length > 0 &&
				productOfferings.some(po =>
					findCharacteristic(filter, matcher, po, characteristicType)
				);

			return Boolean(childPoHasIcc);
		}
	};

	productFitsInPriceRange = (
		product: ProductOffering | ProductOfferingGroup,
		priceType: ProductPriceType = this.state.priceType,
		_priceRange: Object = this.state.priceRange
	) => {
		let _priceType;
		switch (priceType) {
			case "allPrices":
				_priceType = "ALLPRICES";
				break;
			case "upfront":
				_priceType = "ONE_TIME";
				break;
			case "recurring":
				_priceType = "RECURRENT";
				break;
			case "usage":
				_priceType = "USAGE";
				break;
			default:
				_priceType = "ALLPRICES";
		}

		const price =
			ProductOfferingUtil.getPriceRange(product, _priceType).min || 0;

		const priceRange = _priceRange[priceType];

		if (
			priceRange &&
			_.isNumber(price) &&
			_.isNumber(priceRange.min) &&
			_.isNumber(priceRange.max) &&
			price >= priceRange.min &&
			price <= priceRange.max
		) {
			return true;
		} else if (!priceRange || !price) {
			// RUBT-67702
			return true;
		}
		return false;
	};

	filterProducts = (
		products: ?Array<ProductOffering | ProductOfferingGroup> = this.state
			.products,
		filters: Array<ProductFilterType> = this.state.activeFilters,
		priceType: ProductPriceType = this.state.priceType,
		priceRange: {
			upfront: ProductFilterRangeType,
			recurring: ProductFilterRangeType
		} = this.state.priceRange
	): Array<ProductOffering | ProductOfferingGroup> => {
		if (products) {
			return products
				.filter((product: ProductOffering | ProductOfferingGroup) => {
					if (!_.isEmpty(this.state.searchTerm)) {
						return _.get(product, "attributes.name", "")
							.toLowerCase()
							.includes(this.state.searchTerm.toLowerCase());
					} else {
						return true;
					}
				})
				.filter((product: ProductOffering | ProductOfferingGroup) =>
					this.productFitsInPriceRange(product, priceType, priceRange)
				)
				.filter((product: ProductOffering | ProductOfferingGroup) => {
					if (!_.isEmpty(filters)) {
						return filters.every(
							filter =>
								filter.type &&
								filter.type === "collection" &&
								(this.ignoreFilter(filter) ||
									this.productHasCharacteristic(
										filter,
										product
									))
						);
					} else {
						return true;
					}
				})
				.filter((product: ProductOffering | ProductOfferingGroup) => {
					if (this.state.applyIncludedMinutesFilter) {
						return Boolean(
							this.productHasIncludedMinutesWithInRange(product)
						);
					} else {
						return true;
					}
				})
				.filter(this.checkCombinedCheckboxFilters);
		} else {
			return [];
		}
	};
	checkCombinedCheckboxFilters = (product: Object) => {
		const combinedFilters = this.state.combinedFilters;
		const values = combinedFilters && _.values(combinedFilters);
		let hasFilterValues = false;
		if (!values || _.isEmpty(values)) {
			return true;
		} else {
			values.forEach(value => {
				value.matchers &&
					value.matchers.forEach(matcher => {
						if (
							ProductOfferingUtil.hasInstanceCharacteristic(
								matcher.characteristic,
								product
							) ||
							ProductOfferingUtil.hasInputCharacteristic(
								matcher.characteristic,
								product
							)
						) {
							hasFilterValues = true;
						}
					});
			});
		}
		return hasFilterValues;
	};

	productHasIncludedMinutesWithInRange = (
		product: ProductOffering | ProductOfferingGroup
	) => {
		const productOfferings = _.get(
			product,
			"attributes.productOfferings",
			[]
		);
		const productOfferingHasMinutesWithInRange = _.find(
			productOfferings,
			productOffering => {
				const voiceValues = _.get(
					productOffering,
					"instanceCharacteristics.voice.values",
					[]
				);
				const minutesFilterValues = this.state.minutesFilterValues;

				const foundBetweenRange = _.find(voiceValues, voiceValue => {
					const value = parseInt(voiceValue.value, 10);
					return (
						value >= _.get(minutesFilterValues, "min") &&
						value <= _.get(minutesFilterValues, "max")
					);
				});

				return Boolean(foundBetweenRange);
			}
		);

		return Boolean(productOfferingHasMinutesWithInRange);
	};

	// if nothing is selected from filter, ignore this filter
	ignoreFilter = (filter: ProductFilterType) => {
		return (
			filter &&
			filter.values &&
			_.values(filter.values).every(value => {
				return value === false;
			})
		);
	};

	handlePriceRangeSlider = (value: ProductFilterRangeType) => {
		this.setState({
			priceRange: {
				[this.state.priceType]: value
			}
		});
	};

	getBoundariesForPriceRange = (
		products: ?Array<ProductOffering | ProductOfferingGroup> = this.state
			.products
	): {
		characteristic: string,
		[ProductPriceType]: ?ProductFilterRangeType
	} | null => {
		if (products) {
			const allPricesRanges = products.map(
				ProductOfferingUtil.getAllPricesRange
			);
			const allPricesRange = allPricesRanges.reduce(
				(acc, range) => {
					if (acc.min > range.min) {
						acc.min = Math.floor(range.min);
					}
					if (acc.max < range.max) {
						acc.max = Math.ceil(range.max);
					}
					return acc;
				},
				{ min: Number.MAX_SAFE_INTEGER, max: 0 }
			);

			const upfrontRanges = products.map(product =>
				ProductOfferingUtil.getUpfrontPriceRange(product)
			);
			const upfrontRange = upfrontRanges.reduce(
				(acc, range) => {
					if (acc.min > range.min) {
						acc.min = Math.floor(range.min);
					}
					if (acc.max < range.max) {
						acc.max = Math.ceil(range.max);
					}
					return acc;
				},
				{ min: Number.MAX_SAFE_INTEGER, max: 0 }
			);

			const recurringRanges = products.map(product =>
				ProductOfferingUtil.getRecurringPriceRange(product)
			);

			const recurringRange = recurringRanges.reduce(
				(acc, range) => {
					if (acc.min > range.min) {
						acc.min = Math.floor(range.min);
					}
					if (acc.max < range.max) {
						acc.max = Math.ceil(range.max);
					}
					return acc;
				},
				{ min: Number.MAX_SAFE_INTEGER, max: 0 }
			);

			const usageRanges = products.map(product =>
				ProductOfferingUtil.getUsagePriceRange(product)
			);

			const usageRange = usageRanges.reduce(
				(acc, range) => {
					if (acc.min > range.min) {
						acc.min = Math.floor(range.min);
					}
					if (acc.max < range.max) {
						acc.max = Math.ceil(range.max);
					}
					return acc;
				},
				{ min: Number.MAX_SAFE_INTEGER, max: 0 }
			);

			return {
				characteristic: "price-range",
				allPrices:
					allPricesRange.min !== Number.MAX_SAFE_INTEGER
						? allPricesRange
						: undefined,
				upfront:
					upfrontRange.min !== Number.MAX_SAFE_INTEGER
						? upfrontRange
						: undefined,
				recurring:
					recurringRange.min !== Number.MAX_SAFE_INTEGER
						? recurringRange
						: undefined,
				usage:
					usageRange.min !== Number.MAX_SAFE_INTEGER
						? usageRange
						: undefined
			};
		} else {
			return null;
		}
	};

	switchPriceType = (type: ProductPriceType) => {
		if (type === this.state.priceType) {
			return;
		}

		const rangeForType = _.get(this.getBoundariesForPriceRange(), type);

		if (rangeForType) {
			this.setState({
				priceType: type,
				priceRange: {
					[type]: {
						min: parseInt(rangeForType.min, 10),
						max: parseInt(rangeForType.max, 10)
					}
				}
			});
		}
	};

	toggleFilterControls = () => {
		const { showFilterControls } = this.state;

		if (!showFilterControls === false) {
			this.resetFilters();
		}

		const range = this.getBoundariesForPriceRange();
		const priceType = this.state.priceType;
		this.setState({
			showFilterControls: !showFilterControls,
			priceRange: {
				[priceType]: {
					min: _.get(range, [priceType, "min"]),
					max: _.get(range, [priceType, "max"])
				}
			}
		});

		this.resetActiveFilters();
	};

	getAvailableAddonProducts({
		addons
	}: {
		addons: Array<ProductOffering | ProductOfferingGroup>
	}) {
		this.setState({
			/* TODO: $FlowFixMe */
			products: ProductOfferingUtil.makeDefaultSelections(addons)
		});
	}

	getAvailableMobilePhones({
		phones
	}: {
		phones: Array<ProductOffering | ProductOfferingGroup>
	}) {
		this.setState({
			phones
		});
	}

	getAvailablePlans({ plans }: { plans: Array<ProductOffering | ProductOfferingGroup> }) {
		this.setState({
			plans
		});
	}

	getBundlesForProduct(
		currentProductBundles: Array<ProductOffering | ProductOfferingGroup>
	) {
		this.setState(currentProductBundles);
	}

	updateMinutesFilterValues(minutesFilterValues: ProductFilterRangeType) {
		this.setState({
			minutesFilterValues: {
				...minutesFilterValues
			}
		});
	}

	toggleApplyIncludedMinutesFilter() {
		this.setState({
			applyIncludedMinutesFilter: !this.state.applyIncludedMinutesFilter
		});
	}

	getValues(payload: Object) {
		const addonsCategoryIds = _.get(
			payload,
			"eligibility-categories/addons_category_ids"
		);
		this.setState({
			addonsCategoryIds: (addonsCategoryIds && JSON.parse(addonsCategoryIds)) || [],
			phonesCategoryId: _.get(
				payload,
				"eligibility-categories/phones_category_id"
			),
			plansCategoryId: _.get(
				payload,
				"eligibility-categories/plans_category_id"
			),
			showAgreementSelection:
				_.get(payload, "features/eshop/display_agreement_selection") ===
				"true"
		});
	}

	saveTargetAgreementId(targetAgreementId: ?number) {
		this.setState({
			targetAgreementId
		});
	}

	updateProductValue(product: ProductOffering | ProductOfferingGroup) {
		this.setState({
			product
		});
	}

	endShoppingForSubscription() {
		this.setState({
			targetAgreementId: null
		});
	}

	initializeProductConfiguration(payload: Object) {
		if (payload.errors) {
			console.log("Error in initialize");
			this.setState({
				productConfigurationErrors: payload.errors
			});
		} else {
			const resultBasket = payload.included.find(
				include => include.type === "baskets"
			);
			const basketItem = payload.included.find(
				include => include.type === "basketItems"
			);

			const basketValidationErrors = _.get(
				resultBasket,
				"relationships.basketValidationInformations",
				[]
			);

			const chargingBalances = payload.included.filter(
				include =>
					include.type === "charging-balances" &&
					_.get(include, "attributes.unitOfMeasure") === "MONETARY"
			);

			this.setState({
				productConfigurationInitialization: {
					resultBasket,
					basketItem,
					basketValidationErrors,
					chargingBalances
				}
			});
		}
	}

	cancelProductConfiguration(resetProduct: ?boolean) {
		const newStateObject = {
			productConfigurationSummary: null,
			productConfigurationErrors: null,
			productConfigurationInitialization: null
		};

		resetProduct
			? this.setState({
					...newStateObject,
					product: null,
					productToConfigure: null
				})
			: this.setState(newStateObject);
	}

	submitProductConfiguration(payload: Object) {
		if (payload.errors) {
			this.setState({
				productConfigurationErrors: payload.errors
			});
		} else {
			const { characteristics } = payload.data.attributes;
			const product = payload.data.relationships.product.data;
			const resultBasket = payload.data.relationships.resultBasket.data;
			const updatedProduct = _.head(
				payload.included
					.filter(basketItem => {
						const { attributes } = basketItem;
						if (
							_.get(
								attributes,
								"attributes.action",
								""
							).toLowerCase() === "update"
						) {
							return attributes.product;
						}
						return false;
					})
					.map(basketItem => basketItem.attributes.product)
			);

			this.setState({
				productConfigurationSummary: {
					characteristics,
					product,
					resultBasket,
					updatedProduct
				}
			});
		}
	}

	resetProductConfiguration() {
		this.setState({
			productConfigurationSummary: null,
			productConfigurationErrors: null,
			product: null,
			productToConfigure: null,
			productConfigurationInitialization: null
		});
	}

	getAlternateOfferingsForProduct({
		alternateProductOfferings,
		productOfferingId
	}: {
		alternateProductOfferings: Array<Object>,
		productOfferingId: string
	}) {
		this.setState({
			alternateProductOfferings,
			focusedProductId: productOfferingId
		});
	}

	@deprecated("actions.sales.queryProductOfferingsViaAddressRegistryId")
	queryProductOfferingsViaAddressRegistryId(products: Array<Object>) {
		this.setState({
			products,
			skipFilters: true
		});
	}

	initializeProductReplace(eligiblePaymentMethods: Object) {
		const basket = _.get(eligiblePaymentMethods, "included", []).find(
			elem => elem.type === "baskets"
		);
		const basketItems = _.get(eligiblePaymentMethods, "included", []).find(
			elem => elem.type === "basketItems"
		);

		const totalPrices = basketItems.attributes.totalPrices.reduce(
			(stack, elem) => {
				const { type } = elem;

				if (stack[type]) {
					stack[type].push(elem);
				} else {
					stack[type] = [elem];
				}

				return stack;
			},
			{}
		);

		// TODO: validate ContextualPaymentMethodsWithExtraInfo type from sales.types.ts
		// totalPrices outcome is:
		// {
		// 	RECURRENT: [12, 23, 34]
		//  ONE_TIME: [45, 56, 67]
		// }
		this.setState({
			eligiblePaymentMethods: {
				basketId: (basket && basket.id) || eligiblePaymentMethods.data.id,
				initializedBasket: basket,
				basketItems,
				contextualPaymentMethods: eligiblePaymentMethods.data.attributes.contextualPaymentMethods,
				characteristics: eligiblePaymentMethods.data.attributes.characteristics,
				totalPrices
			}
		});
	}

	commitProductReplace(paymentInfo: { attributes: Object }) {
		this.setState({
			paymentInfo: paymentInfo.attributes.paymentInfo
		});
	}

	resetProductChange() {
		this.setState({
			alternateProductOfferings: null,
			eligiblePaymentMethods: null,
			focusedProductId: null,
			paymentInfo: null
		});
	}

	selectActiveAgreement = (agreementId: string) => {
		this.setState({
			activeAgreementId: agreementId
		});
	};

	initializeNewPlanOrder = (newPlanData: Object) => {
		if (
			!_isEmpty(newPlanData) &&
			!(newPlanData instanceof ErrorContainer)
		) {
			const basket = newPlanData.basket;
			const basketItems = newPlanData.basketItem;
			const eligiblePaymentMethods = newPlanData.eligiblePaymentMethods;

			const totalPrices = basketItems.attributes.totalPrices.reduce(
				(stack, elem) => {
					const { type } = elem;

					if (stack[type]) {
						stack[type].push(elem);
					} else {
						stack[type] = [elem];
					}

					return stack;
				},
				{}
			);

			this.setState({
				eligiblePaymentMethods: {
					basketId: basket && basket.id,
					initializedBasket: basket,
					basketItems,
					contextualPaymentMethods: eligiblePaymentMethods,
					characteristics:
						basketItems.attributes.inputtedCharacteristics,
					totalPrices
				}
			});
		}
	};

	submitNewPlanOrder = (payload: Object) => {
		const submittedNewPlanBasket = payload.submittedBasket;
		const submittedNewPlanBasketItems = payload.submittedBasketItems;
		const newPlanContextualPaymentMethodId =
			payload.contextualPaymentMethodId;
		const newPlanPaymentInfo = payload.paymentInfo;

		this.setState({
			submittedNewPlanBasket,
			submittedNewPlanBasketItems,
			newPlanPaymentInfo,
			newPlanContextualPaymentMethodId
		});
	};

	resetNewPlanOrder = () => {
		this.setState({
			submittedNewPlanBasket: {},
			submittedNewPlanBasketItems: [],
			eligiblePaymentMethods: {},
			newPlanPaymentInfo: {},
			newPlanContextualPaymentMethodId: null
		});
	};
}

export default SalesStore;

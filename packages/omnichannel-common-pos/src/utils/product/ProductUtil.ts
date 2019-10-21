import { head, flatten, isEmpty, uniqWith, isEqual, flattenDeep, concat, sortBy, get, isMatch } from "lodash";
import {
	Agreement,
	Product,
	Resource,
	ProductOffering,
	BasketItem,
	Characteristic,
	ChargingBalances,
	Identifier,
	ProductOfferingGroup,
	UsageCounters,
	UsageLimits,
	CharacteristicValue,
	CommercialEnrichments,
	PriceRange,
	UnitOfMeasureEnum,
	ProductLifecycleStatus,
	FeatureIdentifierType
} from "../../redux";
import ProductOfferingUtil from "../ProductOfferingUtil";

const DEFAULT_PRODUCT_IMAGE = "static/img/no-image.png";

class ProductUtil {
	/**
	 * Returns childProducts of the the first product of given agreement
	 * @param {Agreement} agreement
	 * @returns {Array<Product>}
	 */
	static getChildProducts(agreement: Agreement): Array<Product> {
		if (agreement.attributes.products.length > 0) {
			return agreement.attributes.products[0].childProducts;
		}

		return [];
	}

	/**
	 * Returns products of the the of given agreement (first level products only)
	 * @param {Agreement} agreement
	 * @returns {Array<Product>}
	 */
	static getProducts(agreement?: Agreement): Array<Product> {
		if (!agreement) {
			return [];
		}
		return (agreement.attributes ? agreement.attributes.products : agreement.products) || [];
	}

	/**
	 * Workaround to safely get childProducts field value from attributes or directly
	 */
	static getChildProductsValue(product: Product): Array<Product> {
		return (product.attributes && product.attributes.childProducts) || product.childProducts || [];
	}
	private static getProductWithChildProductsRecursively(product: Product): Array<Product> {
		return [product, ...ProductUtil.getChildProductsRecursively(product)];
	}
	/**
	 * Returns all child products and all child products of each child product recursively
	 */
	static getChildProductsRecursively(product: Product): Array<Product> {
		return flatten(ProductUtil.getChildProductsValue(product).map(ProductUtil.getProductWithChildProductsRecursively));
	}
	/**
	 * Returns all products of agreement and all child products of each product/child product
	 * order is product, its child products recursively, next product, next product child products recursively....
	 */
	static getProductsAndChildProductsRecursively(agreement: Agreement): Array<Product> {
		return flatten(ProductUtil.getProducts(agreement).map(product => [product, ...ProductUtil.getChildProductsRecursively(product)]));
	}

	/**
	 * Finds associated device from supplied agreement.
	 * @param agreement
	 * @param deviceId
	 * @return    found device, if any
	 */
	static findAssociatedDeviceFromAgreement(agreement: Agreement, deviceId: string) {
		const device = head(
			flatten(ProductUtil.getProducts(agreement).map(product => ProductUtil.findAssociatedMobileDevices(product))).filter(device => {
				return device.id === deviceId;
			})
		);
		return device;
	}

	/**
	 * Finds associated devices from supplied product (thing).
	 * @param product
	 * @return found devices as an array
	 */
	static findAssociatedMobileDevices(product: Product): Array<Resource> {
		if (isEmpty(product) || !product.realizingResources) {
			return [];
		}
		return product.realizingResources
			.filter((resource: Resource) => resource.type && resource.type === "DEVICE")
			.filter((resource: Resource) => resource.specification && resource.specification.specSubType && resource.specification.specSubType === "HANDSET")
			.filter((resource: Resource) => resource.lifeCycleStatus && resource.lifeCycleStatus === "ACTIVE");
	}

	/**
	 * Checks whether the supplied product (thing) is a plan by checking if it has a sim card or MSISDN.
	 * @param thing
	 * @return {boolean}
	 */
	static isProductPlan(product: Product): boolean {
		if (!product.realizingResources) {
			return false;
		}
		return product.realizingResources.some((resource: Resource) => resource.type === "MSISDN" || resource.type === "SIM");
	}

	/**
	 * Finds products productOfferingId and returns it.
	 * @param device
	 * @return products productOfferingId
	 */
	static findProductOfferingIdFromProduct(device: Resource | undefined): string | undefined {
		if (!device) {
			return undefined;
		}
		return device.specification ? device.specification.id : undefined;
	}

	/**
	 * Finds devices name and returns it.
	 * @param device
	 * @return devices name
	 */
	static findDeviceName(device: Resource): string | undefined {
		return device.specification ? device.specification.name : undefined;
	}

	/**
	 * Check if product is add-on
	 * @param product product to check
	 * @return true in case of add-on product
	 */
	static isAddon(product: Product): boolean {
		return Boolean(product.specType && product.specType === "PRODUCT" && product.specSubType && product.specSubType === "ADDITIONAL");
	}

	/**
	 * Finds active addon services on product and returns them.
	 * @param product
	 * @return Array of active addon services
	 */
	static findActiveAddonProducts(product: Product): Array<Product> {
		const childProducts: Array<Product> = product.childProducts || (product.attributes && product.attributes.childProducts) || [];

		return childProducts
			.filter((p: Product) => p.specType && p.specType === "PRODUCT" && p.specSubType && p.specSubType === "ADDITIONAL")
			.filter((p: Product) => p.lifeCycleStatus && p.lifeCycleStatus === "ACTIVE");
	}

	static isModifyingAddonProduct(agreement: Agreement, productModification?: Record<string, any>): boolean {
		if (isEmpty(productModification)) {
			return false;
		}

		const products: Array<Product> = ProductUtil.getProducts(agreement);

		const addonProducts: Array<Product> = products.reduce<Array<Product>>((stack: Array<Product>, product: Product) => {
			const additionals = product.childProducts.filter(childProduct => childProduct.specType === "PRODUCT" && childProduct.specSubType === "ADDITIONAL");
			return stack.concat(additionals);
		}, []);

		if (addonProducts.length === 0) {
			return false;
		}
		const productModificationProductOfferingId: string | undefined =
			productModification && productModification.resource && productModification.resource.attributes
				? productModification.resource.attributes.productOfferingId
				: undefined;

		return addonProducts.some((product: Product) => product.productOfferingId === productModificationProductOfferingId);
	}

	/**
	 * Returns the first active phone number from the given product.
	 * @param {boolean} showAll
	 * @param product
	 */
	static findPhoneNumber(product?: Product, showAll: boolean = false): string | undefined {
		const realizingResources: Array<Resource> = (product && product.realizingResources) || [];
		const msisdnResource: Resource | undefined = realizingResources.find(
			(resource: Resource) => resource.type === "MSISDN" && (showAll === true || resource.lifeCycleStatus === "ACTIVE")
		);
		return msisdnResource && msisdnResource.primaryId;
	}

	/**
	 * Returns the first active phone number from the given product's child products.
	 * @param product
	 */
	static findPhoneNumberFromChildProducts(product?: Product, showAll: boolean = false): string | undefined {
		const childProducts: Array<Product> = (product && product.childProducts) || [];
		const productWithPhoneNumber: Product | undefined = childProducts.find((c: Product) => !isEmpty(this.findPhoneNumber(c, showAll)));
		return productWithPhoneNumber ? this.findPhoneNumber(productWithPhoneNumber, showAll) : undefined;
	}

	/**
	 * Finds and returns the first phone number from the given product or any of it's child products.
	 * @param {Product} product product
	 * @param {boolean} showAll
	 * @returns phone number, undefined if not found
	 */
	static getPhoneNumber(product?: Product, showAll: boolean = false): string | undefined {
		return this.findPhoneNumber(product, showAll) || this.findPhoneNumberFromChildProducts(product, showAll);
	}

	static getPhoneNumberInPO(po: ProductOffering): string | undefined {
		const inputtedCharacteristics = ProductOfferingUtil.getInputtedCharacteristics(po);
		return inputtedCharacteristics ? inputtedCharacteristics.number : undefined;
	}

	/**
	 * Deeply searches products productOfferings for a configured phone number and returns it
	 * @param {ProductOfferingGroup | ProductOffering} product
	 * @returns {string | undefined}
	 */
	static getPhoneNumberDeepInPogOrPo(product: ProductOfferingGroup | ProductOffering): string | undefined {
		const pos: Array<ProductOffering> = ProductOfferingUtil.getProductOfferings(product);

		let result: string | undefined;
		if (pos.length > 0) {
			pos.some(
				(po: ProductOffering): boolean => {
					if (po.selected === true) {
						result = this.getPhoneNumberDeep(po);
						if (result) {
							return true;
						}
					}
					return false;
				}
			);
		}

		return result;
	}

	/**
	 * Deeply searches products inputtedCharacteristics for a configured phone number and returns it
	 * @param {ProductOffering} product
	 * @return phone number or undefined
	 */
	static getPhoneNumberDeep(product: ProductOffering): string | undefined {
		// check in inputtedCharacteristics
		const inputtedCharacteristics = ProductOfferingUtil.getInputtedCharacteristics(product);
		const phoneNumber: string | undefined = inputtedCharacteristics ?
				inputtedCharacteristics.CH_NumberResource || inputtedCharacteristics.CH_PortInNumberResource : undefined;

		if (phoneNumber) {
			return phoneNumber;
		}

		// check in inner POs
		const foundInPos: string | undefined = ProductUtil.getPhoneNumberDeepInPogOrPo(product);
		if (foundInPos) {
			return foundInPos;
		}

		// check in inner POGs
		const pogs = ProductOfferingUtil.getProductOfferingGroups(product);
		let foundInPogs: string | undefined;
		pogs.some(
			(pog: ProductOfferingGroup): boolean => {
				foundInPogs = ProductUtil.getPhoneNumberDeepInPogOrPo(pog);
				if (foundInPogs) {
					return true;
				}
				return false;
			}
		);

		return foundInPogs;
	}
	static getPhoneNumbersToAgreementsMap(agreements: Agreement[]): Record<string, Agreement> {
		const result: Record<string, Agreement> = {};
		agreements.forEach((agreement: Agreement) => {
			const phoneNumbers = ProductUtil.getProducts(agreement)
				.map((product: Product) => ProductUtil.findPhoneNumber(product, false))
				.filter((phoneNumber: string | undefined) => phoneNumber);
			const firstPhoneNumber = phoneNumbers[0];
			if (firstPhoneNumber) {
				result[firstPhoneNumber] = agreement;
			}
		});
		return result;
	}
	static getPhoneNumbers(agreements: Agreement[]): string[] {
		return Object.keys(ProductUtil.getPhoneNumbersToAgreementsMap(agreements));
	}

	/**
	 * Searches for a path ro a product with T_FORM_NAME characteristic with seekedValue value or all if not specified
	 * @param {ProductOffering} product
	 * @param {string} seekedValue
	 * @returns {Array<{po: string}>}
	 */
	static getPathToProductWithTFormName(product: ProductOffering, seekedValue?: string): Array<{ po: string }> {
		const characteristic: Characteristic | undefined = ProductOfferingUtil.getInstanceCharacteristics(product).T_FORM_NAME;
		const values: Array<CharacteristicValue> | undefined = characteristic ? characteristic.values : undefined;

		if (values) {
			const found = seekedValue ? values.find((value: CharacteristicValue) => value.value === seekedValue) : values.length > 0;
			if (found) {
				return [{ po: product.id }];
			}
		}

		const pos = ProductOfferingUtil.getProductOfferings(product);
		return pos.reduce<Array<{ po: string }>>((acc: Array<{ po: string }>, po: ProductOffering): Array<{ po: string }> => {
			return acc.concat(ProductUtil.getPathToProductWithTFormName(po, seekedValue));
		}, []);
	}

	/**
	 * Searches for a ProductOfferings in in product's or productGroup's inner productOfferings
	 * with T_FORM_NAME characteristic with seekedValue value or all if not specified
	 * @param {ProductOffering} product
	 * @param {string} seekedValue
	 * @returns {Array<ProductOffering>}
	 */
	static getProductInPoOrPogWithTFormName(product: ProductOffering | ProductOfferingGroup, seekedValue?: string): Array<ProductOffering> {
		const pos = ProductOfferingUtil.getProductOfferings(product);
		return pos.reduce<Array<ProductOffering>>((acc: Array<ProductOffering>, po: ProductOffering): Array<ProductOffering> => {
			return acc.concat(ProductUtil.getProductInProductOfferingWithTFormName(po, seekedValue));
		}, []);
	}

	/**
	 * Searches for a ProductOfferings in in product and product's inner productOfferings
	 * with T_FORM_NAME characteristic with seekedValue value or all if not specified
	 * @param {ProductOffering} product
	 * @param {string} seekedValue
	 * @returns {Array<ProductOffering>}
	 */
	static getProductInProductOfferingWithTFormName(product: ProductOffering, seekedValue?: string): Array<ProductOffering> {
		const characteristic: Characteristic | undefined = ProductOfferingUtil.getInstanceCharacteristics(product).T_FORM_NAME;
		const values: Array<CharacteristicValue> | undefined = characteristic ? characteristic.values : undefined;

		if (values) {
			const found = seekedValue ? values.find((value: CharacteristicValue) => value.value === seekedValue) : values.length > 0;
			if (found) {
				return [product];
			}
		}

		return ProductUtil.getProductInPoOrPogWithTFormName(product, seekedValue);
	}

	/**
	 * Searches for a ProductOfferings in product's inner productOfferingGroups
	 * with T_FORM_NAME characteristic with seekedValue value or all if not specified
	 * @param {ProductOffering} product
	 * @param {string} seekedValue
	 * @returns {Array<ProductOffering>}
	 */
	// TODO: Refactor this again to typescript rules when possible. Make sure that returning object remains the same
	static getProductOfferingGroupInProductWithTFormName(product: ProductOffering, seekedValue?: string): Array<ProductOffering> {
		const values =
			get(product, "instanceCharacteristics.T_FORM_NAME.values") || get(product, "attributes.instanceCharacteristics.T_FORM_NAME.values") || [];

		if (values) {
			const found = seekedValue ? values.find((value: CharacteristicValue) => isMatch(value, { value: seekedValue })) : values.length > 0;

			if (found) {
				return [product];
			} else {
				const pogs = get(product, "attributes.productOfferingGroups") || get(product, "productOfferingGroups") || [];
				const foundInPogs = pogs.reduce((acc: any, po: any) => {
					const found = this.getProductInProductOfferingWithTFormName(po, seekedValue);
					return found.length > 0 ? acc.concat(po) : acc;
				}, []);
				if (foundInPogs.length) {
					return foundInPogs;
				}
				const pos = get(product, "attributes.productOfferings") || get(product, "productOfferings") || [];
				return pos.reduce((acc: any, po: any) => {
					return acc.concat(this.getProductInProductOfferingWithTFormName(po, seekedValue));
				}, []);
			}
		} else {
			return [];
		}
	}

	static getPathToBasketItemWithTFormName(
		basketItem: BasketItem,
		seekedValue?: string
	): Array<{ po: string; basketItemId: string; basketProductId: string }> {
		const product: ProductOffering | undefined = (basketItem.attributes && basketItem.attributes.product) || basketItem.product;

		if (product && basketItem.basketProductId) {
			const characteristic: Characteristic | undefined = ProductOfferingUtil.getInstanceCharacteristics(product).T_FORM_NAME;
			const values: Array<CharacteristicValue> | undefined = characteristic ? characteristic.values : undefined;

			if (values) {
				const found = seekedValue ? values.find((value: CharacteristicValue) => value.value === seekedValue) : values.length > 0;

				if (found) {
					return [
						{
							po: product.id,
							basketItemId: basketItem.id,
							basketProductId: basketItem.basketProductId
						}
					];
				}
			}
		}

		const children = (basketItem.attributes && basketItem.attributes.childBasketItems) || [];

		return children.reduce((acc: Array<{ po: string; basketItemId: string; basketProductId: string }>, basketItem: BasketItem) => {
			const result = this.getPathToBasketItemWithTFormName(basketItem, seekedValue);

			if (Array.isArray(result) && result.length > 0 && isEmpty(acc)) {
				return result;
			} else {
				return acc;
			}
		}, []);
	}

	static haveProductsInBasketItemsWithTFormName(basketItems: Array<BasketItem> = []): boolean {
		if (basketItems && basketItems.length > 0) {
			return basketItems.reduce((acc: boolean, item: BasketItem) => {
				const product: ProductOffering | undefined = (item.attributes && item.attributes.product) || item.product;

				if (product && ProductOfferingUtil.getInstanceCharacteristics(product).T_FORM_NAME) {
					return true;
				}

				const children = item.attributes ? item.attributes.childBasketItems : [];
				return ProductUtil.haveProductsInBasketItemsWithTFormName(children) || acc;
			}, false);
		}
		return false;
	}

	/**
	 * Loops through basketItems and checks if any of them have a resourceSharingGroupId. If so,
	 * returns configured number from instanceCharacteristics
	 * @param basketItems
	 * @param resourceId
	 * @return {Boolean}
	 */
	static getPhoneNumberFromBasketItems(basketItems: Array<BasketItem>, resourceId: string): boolean {
		/* NOTE: Currently due to backend bugs basketItem data is broken. As a result, this function never
		 successfully finds an msisdn. It also means that this function has not been tested properly.
		 */

		if (basketItems.length > 0) {
			return basketItems.reduce((acc: boolean, item: BasketItem) => {
				const product: ProductOffering | undefined = (item.attributes && item.attributes.product) || item.product;
				if (product) {
					const resourceSpecificationId: Characteristic = ProductOfferingUtil.getInstanceCharacteristics(product).resourceSpecificationId;
					if (resourceSpecificationId && resourceSpecificationId.values.length > 0) {
						return true;
					}
				}

				const children = item.attributes ? item.attributes.childBasketItems || [] : item.childBasketItems || [];
				return ProductUtil.getPhoneNumberFromBasketItems(children, resourceId) || acc;
			}, false);
		}
		return false;
	}

	/** Finds and returns monetary chargingBalance from array of chargingBalance
	 * @param {Array<ChargingBalances>} chargingBalances
	 * @param {string | undefined} byType
	 * @return monetary charging balance or undefined if not found
	 */
	static findMonetaryChargingBalance(chargingBalances: Array<ChargingBalances> = [], byType?: string): ChargingBalances | undefined {
		return chargingBalances.find(
			balance =>
				/* for some reason comparison to UnitOfMeasureEnum.MONETARY fails, thus using a string. */
				(balance.attributes ? balance.attributes.unitOfMeasure : balance.unitOfMeasure) === "MONETARY" &&
				(!byType || (balance.attributes ? balance.attributes.balanceType : balance.balanceType) === byType)
		);
	}

	static filterMonetaryChargingBalance(chargingBalances: Array<ChargingBalances> = [], selectedCurrency: string, byType?: string):
		Array<ChargingBalances> | undefined {
		return uniqWith(chargingBalances, isEqual).filter(
			balance =>
				/* for some reason comparison to UnitOfMeasureEnum.MONETARY fails, thus using a string. */
				balance &&
				(balance.attributes ? balance.attributes.unitOfMeasure : balance.unitOfMeasure) === "MONETARY" &&
				balance.currency === selectedCurrency &&
				(!byType || (balance.attributes ? balance.attributes.balanceType : balance.balanceType) === byType)
		);
	}

	static sumMonetaryChargingBalance(chargingBalances: Array<ChargingBalances> = [], selectedCurrency: string, byType?: string):
		ChargingBalances | undefined {
		const balances = this.filterMonetaryChargingBalance(chargingBalances, selectedCurrency, byType);
		if (!balances || !balances[0]) {
			return;
		}
		const result = balances.reduce(
			(accumulator, current) => {
				const value = current.attributes ? current.attributes.value : current.value;
				return { ...accumulator, value: (accumulator.value || 0) + (value || 0) };
			},
			{ ...(balances[0].attributes ? balances[0].attributes : balances[0]), value: 0 }
		);
		return result;
	}

	static findAllMonetaryChargingBalances(chargingBalances: Array<ChargingBalances> = []): ChargingBalances[] {
		const filtered = chargingBalances.filter(balance => {
			return (balance.attributes ? balance.attributes.unitOfMeasure : balance.unitOfMeasure) === "MONETARY";
		});
		return filtered;
	}

	static findChargingBalancesFromAgreement(agreement: Agreement): Array<ChargingBalances> {
		const products = get(agreement, "attributes.products", []) as Array<Product>;
		return products.reduce(
			(total, current) => {
				return total.concat(this.findChargingBalancesFromProduct(current));
			},
			[] as Array<ChargingBalances>
		);
	}

	static findChargingBalancesFromProduct(product: Product): Array<ChargingBalances> {
		const chargingBalances = product.chargingBalances || [];
		const children = product.childProducts || [];
		const childBalances = children.reduce(
			(total, current) => {
				return total.concat(this.findChargingBalancesFromProduct(current));
			},
			[] as Array<ChargingBalances>
		);
		return chargingBalances.concat(childBalances);
	}

	static findUsageLimitsInHierarchy(product: Product): Array<{ usageCounter: UsageCounters; limit: UsageLimits }> {
		const usageCounters: Array<UsageCounters> = product.attributes ? product.attributes.usageCounters : product.usageCounters;

		/* Map counters and their limits to counter-limit pairs (object with two fields). If counter doesn't have any limits, it will be ignored from the results. */
		const countersAndLimits = flatten<{ usageCounter: UsageCounters; limit: UsageLimits }>(
			usageCounters
				? usageCounters.map((usageCounter: UsageCounters) => {
						return usageCounter.limits && usageCounter.limits.length > 0
							? usageCounter.limits.map((limit: UsageLimits) => {
									return { usageCounter, limit };
							  })
							: [];
				  })
				: []
		);

		/* find all nested usage counters and limits */
		const children: Array<Product> = product.childProducts || (product.attributes && product.attributes.childProducts) || [];
		const childrenUsages: Array<Array<{ usageCounter: UsageCounters; limit: UsageLimits }>> = children.map((p: Product) => {
			return ProductUtil.findUsageLimitsInHierarchy(p);
		});

		return flattenDeep<{ usageCounter: UsageCounters; limit: UsageLimits }>(
			concat<Array<{ usageCounter: UsageCounters; limit: UsageLimits }>>(countersAndLimits, childrenUsages)
		);
	}

	static getProductImageSrc(item: ProductOffering | undefined): string {
		if (!item) {
			return DEFAULT_PRODUCT_IMAGE;
		}
		const commercialEnrichments: Array<CommercialEnrichments> = item.attributes && item.attributes.commercialEnrichments || item.commercialEnrichments || [];

		const commercialEnrichment: CommercialEnrichments | undefined = commercialEnrichments.find(
			commercialEnrichment => !isEmpty(commercialEnrichment.media)
		);

		const src: string =
			commercialEnrichment && commercialEnrichment.media["thumbnail-image"] ? commercialEnrichment.media["thumbnail-image"] : DEFAULT_PRODUCT_IMAGE;

		return src;
	}

	static getProductName(item: BasketItem | Product | ProductOffering): string | undefined {
		const bi: BasketItem = item as BasketItem;

		if (bi.product || (bi.attributes && bi.attributes.product)) {
			// handle as BasketItem
			if (bi.attributes && bi.attributes.product) {
				return bi.attributes.product.name;
			} else {
				return bi.product ? bi.product.name : undefined;
			}
		} else {
			const p: Product | ProductOffering = item as Product | ProductOffering;
			// handle as Product
			if (p.attributes) {
				return p.attributes.name;
			} else {
				return p.name;
			}
		}
	}

	static getProductId(item: BasketItem | Product): string | undefined {
		const bi: BasketItem = item as BasketItem;

		if (bi.product || (bi.attributes && bi.attributes.product)) {
			// handle as BasketItem
			if (bi.attributes && bi.attributes.product) {
				return bi.attributes.product.id;
			} else {
				return bi.product ? bi.product.id : undefined;
			}
		} else {
			const p: Product = item as Product;
			// handle as Product
			if (p.attributes) {
				return p.attributes.id;
			} else {
				return p.id;
			}
		}
	}

	static hasPrice(price: PriceRange): boolean {
		return Boolean(price && price.min && price.min > 0 && price.currency);
	}

	/**
	 * Checks which of the products under agreement should be considered "subscription"
	 * 1. If agreement.agreement-items size = 1 and agreement-agreement-items.products size = 1, that single product is subscription
	 * 2. If agreement.agreement-items.products.product-offering.categories contains “Plan”, that product is subscription
	 * 3. If agreement.agreement-items.products.realizingResources.type = MSISDN, that product is the subscription
	 * @param {Agreement} agreement
	 * @param {string} subscriptionCategory
	 */
	static getSubscriptionFromAgreement(agreement: Agreement | undefined, subscriptionCategory?: string): Product | undefined {
		if (!agreement) {
			return undefined;
		}

		const products: Array<Product> = ProductUtil.getProducts(agreement);

		if (Array.isArray(products) && products.length > 0) {
			// Return the only item if array is of length 1
			if (products.length === 1) {
				return products[0];
			}

			// NOTE: product should have isPlan field which is set in backend, so no need to match category name
			// Return the first found product that has Plan category, if such exists
			const productWithPlanCategory: Product | undefined = products.find((p: Product): boolean =>
   				Array.isArray(p.categories) && (subscriptionCategory && p.categories.includes(subscriptionCategory) || !!p.isPlan));
			if (productWithPlanCategory) {
				return productWithPlanCategory;
			}

			// Return the first found product that has MSISDN resource, if such exists
			const productWithMsisdnResource = products.find((p: Product) => {
				const realizingResources = p.realizingResources || [];
				return realizingResources.some((resource: Resource) => resource.type === "MSISDN");
			});
			if (productWithMsisdnResource) {
				return productWithMsisdnResource;
			}

			// Return the oldest product as a fallback if nothing else matches
			return head<Product>(sortBy<Product>(products, "validFor.startDate"));
		}

		return undefined;
	}
	private static isProductContainsAllCategories(product: Product, requiredCategoriesIds: string[]): boolean {
		return requiredCategoriesIds.length > 0 && requiredCategoriesIds.every(categoryId => product.categoriesIds.indexOf(categoryId) !== -1);
	}
	static getPlanFromAgreement(agreement: Agreement, requiredCategoriesIds: string[]): Product | undefined {
		return ProductUtil.getProductsAndChildProductsRecursively(agreement).find(product =>
			ProductUtil.isProductContainsAllCategories(product, requiredCategoriesIds)
		);
	}
	static getPlanFromSubscription(subscription: Product, requiredCategoriesIds: string[]): Product | undefined {
		return ProductUtil.getProductWithChildProductsRecursively(subscription).find(product =>
			ProductUtil.isProductContainsAllCategories(product, requiredCategoriesIds)
		);
	}

	static isProductWithTFormName(product: ProductOffering, ...identifiers: Array<FeatureIdentifierType | undefined>): boolean {
		const hideableValues: Array<string> = identifiers
			.map((identifier: any) => identifier && identifier.values)
			.reduce((acc: Array<string>, values: Array<string>): Array<string> => {
				return acc.concat(values);
			}, []);

		const tFormName: Characteristic = ProductOfferingUtil.getInstanceCharacteristics(product).T_FORM_NAME;
		const tFormNameValues: string[] = tFormName ? tFormName.values.map((ch: CharacteristicValue) => ch.value) : [];

		return tFormNameValues.some(value => hideableValues.includes(value));
	}

	static hasTopUps(product?: ProductOffering, topUpsIdentifier?: Identifier): boolean {
		if (!product) {
			return false;
		}
		const key = topUpsIdentifier && topUpsIdentifier.key;
		const values = topUpsIdentifier && topUpsIdentifier.values;
		if (!key || !values || !values.length) {
			return false;
		}

		const pogs: Array<ProductOfferingGroup> = ProductOfferingUtil.getProductOfferingGroups(product);

		return pogs.some((pog: ProductOfferingGroup) => {
			const productOfferings: Array<ProductOffering> = ProductOfferingUtil.getProductOfferings(pog);
			return productOfferings.some((po: ProductOffering) => {
				const characteristic: Characteristic | undefined = ProductOfferingUtil.getInstanceCharacteristics(po)[key];
				if (characteristic) {
					const tFormNameValues: Array<string> = characteristic.values.map((cv: CharacteristicValue) => cv.value);
					return tFormNameValues.some(v => values.includes(v));
				}
				return false;
			});
		});
	}

	/**
	 * Fetches product from under agreement using characteristics key, optional characteristic values, and optional lifecycleStatus filter.
	 */
	static getProductFromAgreementByCharacteristicKey({
		agreement,
		characteristicKey,
		characteristicValues,
		productLifecycleStatus
	}: {
		agreement: Agreement;
		characteristicKey: string;
		characteristicValues?: Array<string>;
		productLifecycleStatus?: ProductLifecycleStatus;
	}): Array<Product> {
		if (!agreement || !characteristicKey) {
			return [];
		}
		const products: Array<Product> = get(agreement, "attributes.products", agreement.products);
		return Array.isArray(products)
			? products.reduce((result: Array<Product>, product: Product) => {
					return result.concat(
						ProductUtil.getProductFromProductByCharacteristicKey({
							product,
							characteristicKey,
							characteristicValues,
							productLifecycleStatus
						})
					);
			  }, [])
			: [];
	}

	/**
	 * Fetches product from under product using characteristics key, optional characteristic values, and optional lifecycleStatus filter.
	 */
	static getProductFromProductByCharacteristicKey({
		product,
		characteristicKey,
		characteristicValues,
		productLifecycleStatus
	}: {
		product: Product;
		characteristicKey: string;
		characteristicValues?: Array<string>;
		productLifecycleStatus?: ProductLifecycleStatus;
	}): Array<Product> {
		if (!product || !characteristicKey) {
			return [];
		}

		// Return if matches correct characteristic, optionally value is found in characteristicValues, and optionally productLifecycleStatus matches the product
		const characteristic = get(product, `attributes.characteristics.${characteristicKey}`, get(product, `characteristics.${characteristicKey}`));
		if (
			characteristic &&
			(!characteristicValues || characteristicValues.includes(characteristic)) &&
			(!productLifecycleStatus || productLifecycleStatus === get(product, "attributes.lifeCycleStatus", product.lifeCycleStatus))
		) {
			return [product];
		}

		const childProducts: Array<Product> = get(product, "attributes.childProducts", product.childProducts);

		return Array.isArray(childProducts)
			? childProducts.reduce((result: Array<Product>, product: Product) => {
					return result.concat(
						ProductUtil.getProductFromProductByCharacteristicKey({
							product,
							characteristicKey,
							characteristicValues,
							productLifecycleStatus
						})
					);
			  }, [])
			: [];
	}

	static getDetailedDescription(product: { commercialEnrichments?: Array<CommercialEnrichments> } | undefined): string | undefined {
		if (!product) {
			return undefined;
		}

		if (product.commercialEnrichments && product.commercialEnrichments.length > 0) {
			const descriptions: Array<string> = product.commercialEnrichments
				.filter((ce: CommercialEnrichments) => Boolean(ce.descriptions && ce.descriptions.detailed))
				.map((ce: CommercialEnrichments) => ce.descriptions.detailed);

			if (descriptions.length > 0) {
				return descriptions[0];
			}
		}
		return undefined;
	}
}

export default ProductUtil;

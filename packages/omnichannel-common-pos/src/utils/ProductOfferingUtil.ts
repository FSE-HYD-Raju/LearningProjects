import { get, head, merge, isMatch, isObject, mergeWith, sortBy, find, sum, isEmpty, clone, flatMap, uniqWith } from "lodash";

import {
	Allowance,
	ProductOfferingType,
	Configurations,
	PathType,
	PriceType,
	Characteristic,
	CharacteristicValue,
	CharacteristicWithKey,
	CommercialEnrichments,
	ProductPathElement,
	ProductPath,
	Price,
	BasketItem,
	PriceRange,
	ProductOffering,
	ProductOfferingAttributes,
	ProductOfferingGroup,
	SimplePrice,
	Product,
	CommercialEnrichmentName,
	Discount,
	PriceTypeEnum,
	HasPrices,
	PriceComponentPriceType,
	ProductOfferingsConfigObject,
} from "../redux/types";
import PriceUtil from "./PriceUtil";
import ArrayUtil from "./ArrayUtil";

// TODO: think about using brand new browser feature called "Object proxy" to drastically reduce the number of
// TODO: po || po.attributes types of property reading:
// TODO: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
// TODO: this should go as a POC due to huge impact on the project and possible regression
export default class ProductOfferingUtil {
	private static NAME = "name";
	private static LOOKUP_HREF_KEY = "lookup-href";

	static getPOName = (po: ProductOffering | Product, inputtedCharacteristics?: Record<string, string>): string | undefined => {
		if (!po) {
			return undefined;
		}
		return (
			ProductOfferingUtil.getCommercialEnrichmentValueFromPO(po, "names", ProductOfferingUtil.NAME, inputtedCharacteristics) ||
			(po.attributes && po.attributes.name) ||
			po.name
		);
	};

	static getPOContainedNames(po: ProductOfferingType) {
		const pos = ProductOfferingUtil.getProductOfferings(po);
		return pos.map((po: ProductOffering) => ProductOfferingUtil.getPOName(po)).join(", ");
	}

	static getPOGName(pog: ProductOfferingGroup): string {
		return ProductOfferingUtil.getCommercialEnrichmentValueFromPOG(pog, "names", ProductOfferingUtil.NAME) || pog.name || pog.id;
	}

	static getPriceName(po: ProductOffering, price: PriceComponentPriceType) {
		return (
			ProductOfferingUtil.getCommercialEnrichmentValueFromPrice(price, "names", ProductOfferingUtil.NAME) ||
			ProductOfferingUtil.getPOName(po) ||
			(price && price.originalPrice && price.originalPrice.name)
		);
	}

	/**
	 * Find commercial enrichments based on object's (usually a PO) inputtedCharacteristics and enrichments'
	 * conditions.
	 *
	 * @param po ProductOffering
	 * @param enrichmentName Name of the enrichment
	 * @param subEnrichmentName Name of the sub-enrichment
	 * @param characteristics InputtedCharacteristics to use. If not given, object's own inputtedCharacteristics are used
	 * @returns {string | undefined}
	 */
	static getCommercialEnrichmentValueFromPO(
		po: ProductOffering | Product | undefined,
		enrichmentName: CommercialEnrichmentName,
		subEnrichmentName: string,
		characteristics?: Record<string, string>,
		language?: string
	): string | undefined {
		if (!po) {
			return undefined;
		}
		const commEnrichments = (po.attributes && po.attributes.commercialEnrichments) || po.commercialEnrichments || [];
		characteristics = characteristics || (po && (po as ProductOffering).inputtedCharacteristics) || {};
		return ProductOfferingUtil.getCommercialEnrichmentValueInternal(commEnrichments, enrichmentName, subEnrichmentName, characteristics, language);
	}

	/**
	 * Find commercial enrichments based on allowance enrichments'
	 * conditions.
	 *
	 * @param allowance Allowance
	 * @param enrichmentName Name of the enrichment
	 * @param subEnrichmentName Name of the sub-enrichment
	 * @param characteristics InputtedCharacteristics to use. If not given, object's own inputtedCharacteristics are used
	 * @returns {string | undefined}
	 */
	static getCommercialEnrichmentValueFromAllowance(
		allowance: Allowance,
		enrichmentName: CommercialEnrichmentName,
		subEnrichmentName: string
	): string | undefined {
		if (!allowance) {
			return undefined;
		}
		const commEnrichments = allowance.commercialEnrichments;
		return ProductOfferingUtil.getCommercialEnrichmentValueInternal(commEnrichments, enrichmentName, subEnrichmentName);
	}

	/**
	 * Find commercial enrichments based on POG enrichments' conditions.
	 */
	static getCommercialEnrichmentValueFromPOG(
		pog: ProductOfferingGroup,
		enrichmentName: CommercialEnrichmentName,
		subEnrichmentName: string
	): string | undefined {
		if (!pog) {
			return undefined;
		}
		if (pog.commercialEnrichments) {
			return ProductOfferingUtil.getCommercialEnrichmentValueInternal([pog.commercialEnrichments], enrichmentName, subEnrichmentName, {});
		} else {
			return undefined;
		}
	}

	/**
	 * Find commercial enrichments based on Price enrichment's conditions.
	 */
	static getCommercialEnrichmentValueFromPrice(
		price: PriceComponentPriceType,
		enrichmentName: CommercialEnrichmentName,
		subEnrichmentName: string
	): string | undefined {
		if (!price || !price.originalPrice) {
			return undefined;
		}
		if (price.originalPrice.commercialEnrichment) {
			return ProductOfferingUtil.getCommercialEnrichmentValueInternal([price.originalPrice.commercialEnrichment], enrichmentName, subEnrichmentName, {});
		} else {
			return undefined;
		}
	}

	static getCommercialEnrichmentValueInternal(
		commEnrichments: Array<CommercialEnrichments>,
		enrichmentName: CommercialEnrichmentName,
		subEnrichmentName: string,
		characteristics?: Record<string, string>,
		language?: string
	): string | undefined {
		// sort enrichments, ones with most conditions first
		const enrichmentsForSort = commEnrichments ? [...commEnrichments] : [];

		let enrichments =
			enrichmentsForSort &&
			enrichmentsForSort.sort((e1: CommercialEnrichments, e2: CommercialEnrichments) => {
				if (e1.conditions && !e2.conditions) {
					return -1;
				} else if (e2.conditions && !e1.conditions) {
					return 1;
				}
				return Object.getOwnPropertyNames(e1.conditions).length - Object.getOwnPropertyNames(e2.conditions).length;
			});

		// filter out by language if defined
		if (language) {
			enrichments = enrichments.filter((enrichment: CommercialEnrichments) => language === enrichment.language);
		}

		// filter out enrichments not matching objects inputtedCharacteristics
		enrichments =
			enrichments &&
			enrichments.filter((enrichment: CommercialEnrichments) => ProductOfferingUtil.conditionsMatch(characteristics, enrichment.conditions));

		// find the first enrichment with the requested enrichment present
		const enrichment =
			enrichments &&
			enrichments.find((enrichment: CommercialEnrichments) => {
				return !!enrichment[enrichmentName];
			});

		if (enrichment) {
			return enrichment[enrichmentName][subEnrichmentName];
		}
		return undefined;
	}

	static conditionsMatch(inputtedCharacteristics: Record<string, string> | undefined, conditions: Object | undefined | null): boolean {
		if (!conditions || isEmpty(conditions)) {
			return true;
		}
		if (inputtedCharacteristics) {
			return Boolean(find([inputtedCharacteristics], conditions));
		}
		return false;
	}

	static getPONameForSort(ProductOffering: ProductOffering): string | undefined {
		const poShortName = ProductOfferingUtil.getPOName(ProductOffering);
		return poShortName && poShortName.toLowerCase();
	}

	static getPOContainedNamesForSort(productOfferingOrGroup: ProductOffering): string {
		return ProductOfferingUtil.getPOContainedNames(productOfferingOrGroup).toLowerCase();
	}

	static getUpfrontPriceForSort(productOffering: ProductOffering) {
		return ProductOfferingUtil.getUpfrontPriceRange(productOffering).min || -1;
	}

	static getRecurringPriceForSort(productOffering: ProductOffering) {
		return ProductOfferingUtil.getRecurringPriceRange(productOffering).min || -1;
	}

	static getUsagePriceForSort(productOffering: ProductOffering) {
		return ProductOfferingUtil.getUsagePriceRange(productOffering).min || -1;
	}

	/**
	 * Find images from commercial enrichments.
	 * NOTE NOT STANDARD AND MAY CHANGE.
	 *
	 * @param po ProductOffering
	 * @returns array<string>
	 */
	static getImages(po: ProductOffering): Array<string> {
		const media: Array<CommercialEnrichments["media"]> = (
			(po && po.attributes && po.attributes.commercialEnrichments) ||
			(po && po.commercialEnrichments) ||
			[]
		).map((commercialEnrichments: CommercialEnrichments) => commercialEnrichments.media);

		const images: Array<string> = media.reduce((stack: Array<string>, mediaEntry: CommercialEnrichments["media"]) => {
			const images: Array<string> = Object.keys(mediaEntry)
				.filter(key => key.match(/image/) !== null)
				.map(key => mediaEntry[key]);
			return stack.concat(images);
		}, []);

		return images;
	}

	/**
	 * Gets the price range for all different type of prices for a productOffering.
	 *
	 * @param productOffering
	 * @returns {{min: number, max: number, currency: string}}
	 */
	static getAllPricesRange(productOffering: ProductOffering): PriceRange {
		return ProductOfferingUtil.getPriceRange(productOffering, PriceTypeEnum.ALLPRICES);
	}

	/**
	 * Gets the price range for ONE_TIME prices for a productOffering.
	 *
	 * @param productOffering
	 * @returns {{min: number, max: number, currency: string}}
	 */
	static getUpfrontPriceRange(productOffering?: ProductOffering | undefined): PriceRange {
		return ProductOfferingUtil.getPriceRange(productOffering, PriceTypeEnum.ONE_TIME);
	}

	/**
	 * Gets the price range for RECURRENT prices for a productOffering.
	 *
	 * @param productOffering
	 * @returns {{min: number, max: number, currency: string}}
	 */
	static getRecurringPriceRange(productOffering: ProductOffering | Product): PriceRange {
		return ProductOfferingUtil.getPriceRange(productOffering, PriceTypeEnum.RECURRENT);
	}

	/**
	 * Gets the price range for USAGE prices for a productOffering.
	 *
	 * @param productOffering
	 * @returns {{min: number, max: number, currency: string}}
	 */
	static getUsagePriceRange(productOffering: ProductOffering): PriceRange {
		return ProductOfferingUtil.getPriceRange(productOffering, PriceTypeEnum.USAGE);
	}

	static hasPrices(product: ProductOffering | ProductOfferingGroup | ProductOfferingAttributes): boolean {
		if (!product) {
			return false;
		}

		const asPO = ProductOfferingUtil.castAsProductOffering(product as any);
		const prices = (asPO.attributes && asPO.attributes.prices) || asPO.prices;

		return Boolean(prices && prices.length);
	}

	/**
	 * Find minimum and maximum prices for a PO. Ignores inputtedCharacteristics and PO selections.
	 *
	 * Does not check that prices' currencies match: just picks one.
	 *
	 * @returns PriceRange - {{min?: number, max?: number, currency?: string}}
	 */
	static getPriceRange(product: ProductOffering | Product | undefined, priceType: PriceType): PriceRange {
		if (!product) {
			return {};
		}
		const prices = (product.attributes && product.attributes.prices) || product.prices || [];

		// minimum price specified in this PO
		const filteredPrices =
			priceType === PriceTypeEnum.ALLPRICES
				? prices
				: prices.filter((p: Price) => {
						return p.type === priceType;
				  });

		let min: number | undefined;
		let max: number | undefined;

		// find minimum and maximum price specified in this PO
		filteredPrices.forEach((price: SimplePrice) => {
			if (price.taxFreeAmount !== undefined && price.taxFreeAmount !== null) {
				if (min === undefined || min > price.taxFreeAmount) {
					min = price.taxFreeAmount;
				}
				if (max === undefined || max < price.taxFreeAmount) {
					max = price.taxFreeAmount;
				}
			}
		});

		const resultPrice = {
			min,
			max,
			currency: prices.length > 0 ? prices[0].currency : undefined,
		};

		if (!resultPrice.min) {
			const productOffering: ProductOffering = product as ProductOffering;
			// descend into POs, add everything found there
			const pos = ProductOfferingUtil.getProductOfferings(productOffering);
			pos.forEach((po: ProductOffering) => {
				const range = ProductOfferingUtil.getPriceRange(po, priceType);
				resultPrice.min = sum([range.min, resultPrice.min]);
				resultPrice.max = sum([range.max, resultPrice.max]);
				resultPrice.currency = resultPrice.currency || range.currency;
			});

			// descend into POGs
			const pogs = ProductOfferingUtil.getProductOfferingGroups(productOffering);

			if (pogs) {
				pogs.forEach((pog: ProductOfferingGroup) => {
					const pogPriceRange = ProductOfferingUtil.getPOGPriceRange(pog, priceType);
					resultPrice.min = sum([resultPrice.min, pogPriceRange.min]);
					resultPrice.max = sum([resultPrice.max, pogPriceRange.max]);
					resultPrice.currency = resultPrice.currency || pogPriceRange.currency;
				});
			}
		}

		if (!resultPrice.min) {
			resultPrice.min = 0;
		}
		return resultPrice;
	}

	/**
	 * Find minimum and maximum prices for a PO. Ignores inputtedCharacteristics and PO selections.
	 *
	 * Does not check that prices' currencies match: just picks one.
	 *
	 * @returns PriceRange - {{min?: number, max?: number, currency?: string}}
	 */
	static getPriceRangeFromAttribute(product: ProductOffering | Product, priceType: PriceType, attribute: string): PriceRange {
		if (!product) {
			return {};
		}
		const prices = (product.attributes && product.attributes.prices) || product.prices || [];

		// minimum price specified in this PO
		const filteredPrices =
			priceType === PriceTypeEnum.ALLPRICES
				? prices
				: prices.filter((p: Price) => {
						return p.type === priceType;
				  });

		let min: number | undefined;
		let max: number | undefined;

		// find minimum and maximum price specified in this PO
		filteredPrices.forEach((price: SimplePrice) => {
			const priceValue = price[attribute];
			if (priceValue !== undefined && priceValue !== null) {
				if (min === undefined || min > priceValue) {
					min = priceValue;
				}
				if (max === undefined || max < priceValue) {
					max = priceValue;
				}
			}
		});

		const resultPrice = {
			min,
			max,
			currency: prices.length > 0 ? prices[0].currency : undefined,
		};

		if (!resultPrice.min) {
			const productOffering: ProductOffering = product as ProductOffering;
			// descend into POs, add everything found there
			const pos = ProductOfferingUtil.getProductOfferings(productOffering);
			pos.forEach((po: ProductOffering) => {
				const range = ProductOfferingUtil.getPriceRange(po, priceType);
				resultPrice.min = sum([range.min, resultPrice.min]);
				resultPrice.max = sum([range.max, resultPrice.max]);
				resultPrice.currency = resultPrice.currency || range.currency;
			});

			// descend into POGs
			const pogs = ProductOfferingUtil.getProductOfferingGroups(productOffering);

			if (pogs) {
				pogs.forEach((pog: ProductOfferingGroup) => {
					const pogPriceRange = ProductOfferingUtil.getPOGPriceRange(pog, priceType);
					resultPrice.min = sum([resultPrice.min, pogPriceRange.min]);
					resultPrice.max = sum([resultPrice.max, pogPriceRange.max]);
					resultPrice.currency = resultPrice.currency || pogPriceRange.currency;
				});
			}
		}

		if (!resultPrice.min) {
			resultPrice.min = 0;
		}

		return resultPrice;
	}

	/**
	 * Find minimum and maximum prices for a POG. Ignores inputtedCharacteristics and PO selections.
	 *
	 * Does not check, that prices' currencies match: just picks one.
	 *
	 * @param pog POG
	 * @param priceType
	 * @returns {{min: number, max: number, currency: string}}
	 */
	static getPOGPriceRange(pog: ProductOfferingGroup, priceType: PriceType): PriceRange {
		const resultPrice: PriceRange = {};

		const cardinalityMin = pog.cardinality && pog.cardinality.min ? pog.cardinality.min : 0;
		const cardinalityMax = pog.cardinality && pog.cardinality.max ? pog.cardinality.max : 0;

		// get price ranges from all POs in the POG
		const productOfferings: Array<ProductOffering> = ProductOfferingUtil.getProductOfferings(pog);

		let subPOPriceRanges: Array<PriceRange> = productOfferings.map((po: ProductOffering) => {
			return ProductOfferingUtil.getPriceRange(po, priceType);
		});

		// this is here to fix sorting of immutable arrays. For some reasons subPoPriceRanges sometimes come as immutables
		subPOPriceRanges = [...subPOPriceRanges];

		// get <cardinalityMin> lowest prices, sum them
		const minPrices = subPOPriceRanges
			.map(
				(range: PriceRange): number | undefined => {
					return range.min;
				}
			)
			.sort((p1: number | undefined, p2: number | undefined) => {
				return (p1 || 0) - (p2 || 0);
			});

		resultPrice.min = sum(minPrices.splice(0, cardinalityMin));

		// get <cardinalityMax> highest prices, sum them
		const maxPrices = subPOPriceRanges
			.map(
				(range: PriceRange): number | undefined => {
					return range.max;
				}
			)
			.sort((p1: number | undefined, p2: number | undefined) => {
				return (p2 || 0) - (p1 || 0);
			});

		resultPrice.max = sum(cardinalityMax ? maxPrices.splice(0, cardinalityMax) : maxPrices);

		// grab a currency
		resultPrice.currency = subPOPriceRanges.length > 0 ? subPOPriceRanges[0].currency : undefined;

		return resultPrice;
	}

	/**
	 * Get price for a PO with the current configuration. Takes inputtedCharacteristics and PO selections into account.
	 * Also goes through the pos children and pogs to get a proper price for the product.
	 *
	 * @param productOffering PO
	 * @param priceType
	 * @returns {{taxFreeAmount: number, taxIncludedAmount: number, currency: string}}
	 */
	static getPrice(productOffering: ProductOffering, priceType: PriceType): SimplePrice {
		let resultPrice = ProductOfferingUtil.getSimplePrice(productOffering, priceType);

		// If this productOffering did not have a price, check it's children
		if (isEmpty(resultPrice)) {
			// descend into POs, add prices
			const pos = ProductOfferingUtil.getProductOfferings(productOffering) || (productOffering.attributes && productOffering.attributes.childBasketItems);

			pos.forEach((po: ProductOffering) => {
				resultPrice = ProductOfferingUtil.sumPrices([resultPrice, ProductOfferingUtil.getPrice(po, priceType)]);
			});
		}

		// descend into POGs, add prices from selected POs
		const pogs = ProductOfferingUtil.getProductOfferingGroups(productOffering);

		pogs.forEach((pog: ProductOfferingGroup) => {
			const selectedPOs = pog.productOfferings.filter((po: ProductOffering) => {
				return po.selected;
			});

			const poPrices = selectedPOs.map((po: ProductOffering) => {
				return ProductOfferingUtil.getPrice(po, priceType);
			});

			const pogPrice = ProductOfferingUtil.sumPrices(poPrices);

			resultPrice = ProductOfferingUtil.sumPrices([resultPrice, pogPrice]);
		});

		return resultPrice;
	}

	/**
	 * Compares the field of objects by the length of "keys" array
	 *
	 * @param {keyof T} field - given object's field name
	 * @returns {(o1: T, o2: T) => number} - compare function that actually does the comparison
	 */
	static byFieldKeyLength<T extends object>(field: keyof T): (o1: T, o2: T) => number {
		const lengthComparator = function(ar1: Array<any> | undefined, ar2: Array<any> | undefined): number {
			return ((ar1 && ar1.length) || 0) - ((ar2 && ar2.length) || 0);
		};

		return (o1: T, o2: T) => {
			const ar1: any[] | undefined = o1[field] && Object.keys(o1[field] as any);
			const ar2: any[] | undefined = o2[field] && Object.keys(o2[field] as any);
			return lengthComparator(ar1, ar2);
		};
	}

	/**
	 * Gets the price of ProductOffering. Does not go through pos/pogs, just checks parent.
	 *
	 * @param productOffering - either ProductOffering or ProductOfferingGroup
	 * @param priceType - "ALLPRICES" | "ONE_TIME" | "RECURRENT" | "USAGE"
	 *
	 * @return SimplePrice containing tax free amount and currency
	 */
	static getSimplePrice(productOffering: HasPrices, priceType: PriceType): SimplePrice {
		const prices: Array<Price> =
			(productOffering && productOffering.attributes && productOffering.attributes.prices) || (productOffering && productOffering.prices) || [];

		return ProductOfferingUtil.getSimplePriceInternal(productOffering, prices, priceType);
	}

	/**
	 * Gets the price of BasketItem. Does not go through pos/pogs, just checks parent.
	 *
	 * @return SimplePrice containing tax free amount and currency
	 */
	static getSimplePriceFromBasket(basketItem: BasketItem, priceType: PriceType): SimplePrice {
		const prices: Array<Price> = (basketItem && basketItem.attributes && basketItem.attributes.totalPrices) || (basketItem && basketItem.totalPrices) || [];

		return ProductOfferingUtil.getSimplePriceInternal(basketItem, prices, priceType);
	}

	static getSimplePriceInternal(entity: HasPrices | BasketItem, prices: Array<Price>, priceType: PriceType): SimplePrice {
		const characteristics = ProductOfferingUtil.getInputtedCharacteristics(entity as ProductOffering) || {};
		let resultPrice = {};

		// filter by price type
		prices = prices.filter((price: Price) => {
			return price.type === priceType;
		});

		// sort prices, ones with the biggest number of conditions go first
		const sortedPrices = [...prices];
		sortedPrices.sort(ProductOfferingUtil.byFieldKeyLength<Price>("conditions"));

		// find first price with conditions, that match given characteristics
		const poPrice = sortedPrices.find((price: Price) => ProductOfferingUtil.conditionsMatch(characteristics, price.conditions));

		if (poPrice) {
			resultPrice = ProductOfferingUtil.sumPrices([poPrice]);
		}

		return resultPrice;
	}

	static sumPrices(prices: Array<SimplePrice>): SimplePrice {
		const result: SimplePrice = {};

		result.taxFreeAmount = sum(
			prices.map((price: SimplePrice) => {
				return price && price.taxFreeAmount;
			})
		);

		result.taxAmount = sum(
			prices.map((price: SimplePrice) => {
				return price && price.taxAmount;
			})
		);

		result.taxIncludedAmount = sum(
			prices.map((price: SimplePrice) => {
				return price && price.taxIncludedAmount;
			})
		);

		result.taxRate = prices.length && prices[0].taxRate;

		const interval = prices && prices.length && get(prices[0], "recurringChargePeriod.interval");
		result.interval = interval;

		const filteredPrices = prices.filter((price: SimplePrice) => {
			return price && price.currency;
		});

		result.currency = !isEmpty(filteredPrices) ? filteredPrices[0].currency : undefined;

		return result;
	}

	static getDiscounts(productOffering: ProductOffering): Discount[] {
		const discounts: Array<Discount> =
			(productOffering && productOffering.attributes && productOffering.attributes.discounts) || (productOffering && productOffering.discounts) || [];
		return discounts;
	}

	/**
	 * Makes default selections for the given POs:
	 * - For each input characteristic with an option array, adds an inputted characteristic with the array's first value
	 * - For each POG with a 1..1 cardinality, marks the POGs first PO selected
	 *
	 * @param pos array of Product Offerings
	 */
	static makeDefaultSelections(pos: Array<ProductOffering>): Array<ProductOffering> {
		pos.forEach((po: ProductOffering) => {
			const inputCharacteristics = ProductOfferingUtil.getInputCharacteristics(po);

			Object.keys(inputCharacteristics).forEach((key: string) => {
				const characteristic: Characteristic = inputCharacteristics[key];
				if (characteristic.values && characteristic.values.length > 0) {
					if (po.inputCharacteristics) {
						po.inputtedCharacteristics = po.inputtedCharacteristics || {};
						po.inputtedCharacteristics[key] = characteristic.values[0].value;
					}
					if (po.attributes) {
						if (po.attributes.inputCharacteristics) {
							if (!po.attributes.inputtedCharacteristics) {
								po.attributes.inputtedCharacteristics = po.attributes.inputtedCharacteristics || {};
							}
							po.attributes.inputtedCharacteristics[key] = characteristic.values[0].value;
						}
					}
				}
			});

			ProductOfferingUtil.makeDefaultSelections(ProductOfferingUtil.getProductOfferings(po));
			const pogs = ProductOfferingUtil.getProductOfferingGroups(po);

			// OptionalProductOfferings are true/false selectable for now
			const optionals = po.attributes ? po.attributes.optionalProductOfferings : po.optionalProductOfferings;
			if (Array.isArray(optionals)) {
				ProductOfferingUtil.makeDefaultSelections(optionals);
				optionals.forEach((optionalPo, index, array) => (array[index].selected = false));
			}

			if (pogs) {
				pogs.forEach((pog: ProductOfferingGroup) => {
					const pogPos = pog.productOfferings;

					/*
					Some dirty hacking here. If we got a "MSISDN" POG, we need to do following things:
					- Sort them by one time fee from cheapest to most expensive
					- Add a "regular" number selection to the POG manually because it's not returned from backend as a PO like others
					-- This regular number is always free, and should be preselected for user
					 */
					if (pog.msisdnGroup && pogPos) {
						const sortedPos = ProductOfferingUtil.sortArrayOfProductOfferingsFromLowestOneTimeFeeToHighest(pogPos);
						const lookUpHref = this.getInputCharacteristics(po)[ProductOfferingUtil.LOOKUP_HREF_KEY];

						// Found regular number "po" from parent, add it and set it selected: true
						if (lookUpHref) {
							const regularNumber = ({
								id: po.id,
								specSubType: "MSISDN",
								instanceCharacteristics: {
									[ProductOfferingUtil.LOOKUP_HREF_KEY]: lookUpHref,
								},
								selected: true,
								name: "",
							} as any) as ProductOffering;
							pog.productOfferings = [...sortedPos];
							pog.productOfferings.splice(0, 0, regularNumber);
						} else {
							// No regular number "po" on parent, just set the first one selected: true
							if (sortedPos.length > 0) {
								sortedPos[0].selected = true;
							}
							pog.productOfferings = sortedPos;
						}
					} else if (pog.cardinality && pog.cardinality.min === 1 && pog.cardinality.max === 1 && Array.isArray(pogPos) && pogPos.length > 0) {
						pogPos[0].selected = true;
					}
					ProductOfferingUtil.makeDefaultSelections(pogPos);
				});
			}
		});
		return pos;
	}

	/**
	 * Finds a PO or a POG from the given list of POs.
	 *
	 * @param items list of POs
	 * @param path array of objects with either a PO or a POG id.
	 * Example: [
	 *      {"po":"basic-sub-po"},
	 *      {"pog":"addons-pog"},
	 *      {"po":"basic-hybrid-po"}]
	 *
	 * @returns {*|Object|T} PO or POG
	 */
	static find(items: Array<ProductOfferingType>, path: Array<PathType>) {
		let item = items.find((pot: ProductOfferingType) => {
			if (path.length > 0 && path[0].po) {
				return pot.id === (path[0].po as ProductOfferingType).id;
			} else {
				return false;
			}
		});
		if (isEmpty(item)) {
			return item;
		}
		path = path.slice(1, path.length);
		path.forEach((pathElem: PathType) => {
			if (pathElem.po && pathElem.po.id) {
				const pos = ProductOfferingUtil.getProductOfferings(item);
				item = pos.find((productOffering: ProductOffering) => {
					if (pathElem.po) {
						return productOffering.id === pathElem.po.id;
					} else {
						return false;
					}
				});
			} else {
				const pogs = ProductOfferingUtil.getProductOfferingGroups(item);
				item = pogs.find((pog: ProductOfferingGroup) => {
					return pog.id === pathElem.pogId;
				});
			}
		});

		return item;
	}

	/**
	 * format path to a string for input ID prefixing
	 */
	static pathToString(path: Array<PathType>): string {
		if (!path) {
			return "";
		}
		return path
			.map((pathItem: PathType) => {
				return pathItem.po ? "po-" + pathItem.po : pathItem.pogId ? "pog-" + pathItem.pogId : "";
			})
			.join("_");
	}

	/**
	 * format path to a string for input ID prefixing (different format) // TODO: merge with previous method
	 */
	static pathToStringFromPathType(path?: ProductPath): string {
		if (!path) {
			return "";
		}
		return path
			.map((pathItem: ProductPathElement) => {
				return pathItem.po ? "po-" + pathItem.po : pathItem.pog ? "pog-" + pathItem.pog : "";
			})
			.join("_");
	}

	/**
	 * Provides product-offering data to childBasketItems.
	 */
	static getProductOfferingItemsForBasket(productOffering: ProductOfferingType): Array<ProductOfferingType> {
		let items: Array<ProductOfferingType> = [];
		const pos = ProductOfferingUtil.getProductOfferings(productOffering);
		const optionalProductOfferings = ProductOfferingUtil.getOptionalProductOfferings(productOffering);
		const pogs = ProductOfferingUtil.getProductOfferingGroups(productOffering);

		if (pos) {
			items = [...pos];
		}

		if (pogs) {
			pogs.forEach((pog: ProductOfferingGroup) => {
				const pogPos = ProductOfferingUtil.getProductOfferings(pog);
				if (pogPos) {
					// pick only selected items
					items = [...items, ...pogPos.filter((po: ProductOffering) => !!po.selected)];
				}
			});
		}

		if (optionalProductOfferings) {
			items = [...items, ...optionalProductOfferings.filter((optionalProductOffering: ProductOffering) => !!optionalProductOffering.selected)];
		}

		return items;
	}

	/**
	 * Merge (deeply) local configurations into product data.
	 *
	 * @param product    The product that needs to be configured
	 * @param configurations    Configurations to be merged to the aforementioned product
	 * @return Configured product object
	 */
	static mergeConfigurations<T extends ProductOfferingType>(product?: T, configurations?: Configurations): T | undefined {
		const productId = product && product.id;
		const configurationId = configurations && configurations[productId as string] ? configurations[productId as string].id : undefined;
		/* Recursively merge configurations of the product if the configurations exist, otherwise don't bother trying */
		if (productId && configurationId && productId === configurationId) {
			return ProductOfferingUtil.mergeConfigurationsRecursively<T>(product!, false, configurations);
		}

		return product;
	}

	/* Using custom merge function because if we use native merge, array orders get fucked up in some cases. */
	static mergeFunction = (left: any, right: any, key: string): any => {
		const typesToCopy = ["string", "number", "boolean"];
		if ((typesToCopy.includes(typeof left) && typesToCopy.includes(typeof right)) || (!left && right)) {
			return right;
		}
		// FIXME
		/* Note: I don't know what was supposed to be fixed here in the first place, but isEmpty check for left object
		 * resolves issues when merging inputtedCharacteristics when old props were empty and new merge solves issue
		 * when left and right has values
		 */
		if ((isObject(left) || isObject(right)) && !Array.isArray(left) && !Array.isArray(right)) {
			if (!isEmpty(left)) {
				return merge({}, left, right);
			} else {
				return right;
			}
		}
		return left;
	};

	// TODO: remove these ugly immutable -> mutable casts
	// TODO: check if this method is valid for all possible merge cases
	static mergeConfigurationsRecursively<T extends ProductOfferingType>(product: T, isSubPo: boolean, configurations?: Configurations | ProductOffering): T {
		const poToBeMerged: ProductOfferingAttributes | ProductOfferingType = (product as ProductOffering).attributes || product;
		const config: ProductOfferingType = (configurations && (configurations as any)[product.id]) || configurations;

		const poToBeMergedMutable: ProductOfferingAttributes | ProductOfferingType = { ...poToBeMerged };
		const mergedProduct: ProductOfferingAttributes | ProductOfferingType = { ...poToBeMergedMutable, id: product.id };

		mergeWith(mergedProduct, config, ProductOfferingUtil.mergeFunction);

		if (poToBeMerged) {
			if (!isEmpty((poToBeMerged as ProductOffering).productOfferingGroups)) {
				// Got pogs, should merge the pos under them
				const configurationPogs = ProductOfferingUtil.getProductOfferingGroups(config);
				(poToBeMerged as ProductOffering).productOfferingGroups.forEach((productOfferingGroup: ProductOfferingGroup) => {
					const configurationPog = configurationPogs.find((pog: ProductOfferingGroup) => pog.id === productOfferingGroup.id) || {};

					if (!isEmpty(configurationPog)) {
						const mergedPog = ProductOfferingUtil.mergeConfigurationsRecursively<ProductOfferingGroup>(
							productOfferingGroup,
							true,
							configurationPog
						);

						let shouldReplace = false;
						if ((mergedProduct as ProductOffering).productOfferingGroups) {
							const asPo: ProductOffering = mergedProduct as ProductOffering;
							if (asPo.productOfferingGroups) {
								for (let i = 0; i < asPo.productOfferingGroups.length; i++) {
									if (asPo.productOfferingGroups[i].id === mergedPog.id) {
										shouldReplace = true;
										const pogsMutable = [...asPo.productOfferingGroups];
										pogsMutable[i] = { ...mergedPog };
										asPo.productOfferingGroups = pogsMutable;
										break;
									}
								}
								if (!shouldReplace) {
									asPo.productOfferingGroups.push({ ...mergedPog, msisdnGroup: false });
								}
							}
						}
					}
				});
			}

			const productOfferings: Array<ProductOffering> = poToBeMerged.productOfferings || [];
			if (!isEmpty(productOfferings)) {
				const configurationPos: Array<ProductOffering> = ProductOfferingUtil.getProductOfferings(config);
				// Got bunch of pos, should recursively merge them
				productOfferings.forEach((productOffering: ProductOffering) => {
					const configurationPo = configurationPos.find((po: ProductOffering) => po.id === productOffering.id) || {};

					if (!isEmpty(configurationPo)) {
						const mergedPo = ProductOfferingUtil.mergeConfigurationsRecursively<ProductOffering>(productOffering, true, configurationPo);

						let shouldReplace = false;
						for (let i = 0; i < mergedProduct.productOfferings.length; i++) {
							if (mergedProduct.productOfferings[i].id === mergedPo.id) {
								shouldReplace = true;
								const posMutable = [...mergedProduct.productOfferings];
								posMutable[i] = mergedPo;
								mergedProduct.productOfferings = posMutable;

								mergedProduct.productOfferings[i] = mergedPo;
								break;
							}
						}
						if (!shouldReplace) {
							mergedProduct.productOfferings.push(mergedPo);
						}
					}
				});
			}

			const optionalProductOfferings: Array<ProductOffering> = (poToBeMerged as ProductOffering).optionalProductOfferings || [];
			if (!isEmpty(optionalProductOfferings)) {
				const configurationPos: Array<ProductOffering> = ProductOfferingUtil.getOptionalProductOfferings(config);
				// Got bunch of pos, should recursively merge them
				optionalProductOfferings.forEach((productOffering: ProductOffering) => {
					const configurationPo = configurationPos.find((po: ProductOffering) => po.id === productOffering.id) || {};

					if (!isEmpty(configurationPo)) {
						const mergedPo = ProductOfferingUtil.mergeConfigurationsRecursively<ProductOffering>(productOffering, true, configurationPo);

						let shouldReplace = false;
						if (mergedProduct) {
							const asProductOffering: ProductOffering = mergedProduct as ProductOffering;
							if (asProductOffering.optionalProductOfferings) {
								for (let i = 0; i < asProductOffering.optionalProductOfferings.length; i++) {
									if (asProductOffering.optionalProductOfferings[i].id === mergedPo.id) {
										shouldReplace = true;
										const posMutable = [...asProductOffering.optionalProductOfferings];
										posMutable[i] = mergedPo;
										asProductOffering.optionalProductOfferings = posMutable;

										asProductOffering.optionalProductOfferings[i] = mergedPo;
										break;
									}
								}
								if (!shouldReplace) {
									asProductOffering.optionalProductOfferings.push(mergedPo);
								}
							}
						}
					}
				});
			}
		}

		if (!isSubPo && (product as ProductOffering).attributes) {
			const fixedProduct: ProductOffering = {
				attributes: mergedProduct as ProductOfferingAttributes,
				categories: [],
				featureCharacteristics: [],
				inputCharacteristics: {},
				inputtedCharacteristics: (mergedProduct as ProductOfferingAttributes).inputtedCharacteristics,
				instanceCharacteristics: {},
				prices: [],
				productOfferingGroups: (mergedProduct as ProductOfferingAttributes).productOfferingGroups,
				productOfferings: [],
				id: product.id,
				name: product.name,
				commercialEnrichments: (product as ProductOffering).commercialEnrichments || [],
				selected: false,
				relationships: (product as ProductOffering).relationships,
			};

			return fixedProduct as T;
		}

		return mergedProduct as T;
	}
	static getProductOfferings(productOffering: ProductOfferingType | undefined): Array<ProductOffering> {
		if (!productOffering) {
			return [];
		}
		const asPo: ProductOffering = productOffering as ProductOffering;
		if (asPo.attributes) {
			return asPo.attributes.productOfferings || [];
		} else {
			return asPo.productOfferings || [];
		}
	}

	static getOptionalProductOfferings(productOffering: ProductOfferingType | undefined): Array<ProductOffering> {
		if (!productOffering) {
			return [];
		}
		const asPo: ProductOffering = productOffering as ProductOffering;
		if (asPo.attributes) {
			return asPo.attributes.optionalProductOfferings || [];
		} else {
			return asPo.optionalProductOfferings || [];
		}
	}

	static getOptionalProductOfferingGroups(productOffering: ProductOfferingType | undefined): Array<ProductOfferingGroup> {
		if (!productOffering) {
			return [];
		}
		const asPo: ProductOffering = productOffering as ProductOffering;
		if (asPo.attributes) {
			return asPo.attributes.optionalProductOfferingGroups || [];
		} else {
			return asPo.optionalProductOfferingGroups || [];
		}
	}

	static getProductOfferingGroups(productOffering: ProductOfferingType | undefined): Array<ProductOfferingGroup> {
		if (!productOffering) {
			return [];
		}
		const asPo: ProductOffering = productOffering as ProductOffering;
		if (asPo.attributes) {
			return asPo.attributes.productOfferingGroups || [];
		} else {
			return asPo.productOfferingGroups || [];
		}
	}

	static getInputCharacteristics(productOffering: ProductOfferingType): Record<string, Characteristic> {
		const asPo: ProductOffering = productOffering as ProductOffering;
		if (asPo) {
			if (asPo.attributes) {
				return asPo.attributes.inputCharacteristics || {};
			} else {
				return asPo.inputCharacteristics || {};
			}
		} else {
			return {};
		}
	}

	static getInstanceCharacteristics(productOffering: ProductOffering | Product): Record<string, Characteristic> {
		if (productOffering === undefined) {
			return {};
		}
		if (productOffering.attributes) {
			return productOffering.attributes.instanceCharacteristics || {};
		} else {
			return productOffering.instanceCharacteristics || [];
		}
	}

	// FIXME: how to handle empty inputted characteristics?
	static getInputtedCharacteristics(productOffering: ProductOffering | BasketItem): Record<string, string> | undefined {
		if (productOffering === undefined) {
			return {};
		}
		if (productOffering.attributes) {
			return productOffering.attributes.inputtedCharacteristics;
		} else {
			return productOffering.inputtedCharacteristics;
		}
	}

	/**
	 *  Flattens product->po->po instanceCharacteristic tree to array
	 */
	static getAllInstanceCharacteristics(productOffering: ProductOffering): Array<CharacteristicWithKey> {
		const allInstanceCharacteristics: Array<CharacteristicWithKey> = [];
		const poStack: Array<ProductOfferingType> = [];
		poStack.push(productOffering);

		while (poStack && poStack.length > 0) {
			const currentPoNode = poStack.pop() as ProductOffering;
			const currentInstanceCharacteristics = ProductOfferingUtil.getInstanceCharacteristics(currentPoNode);
			for (const key in currentInstanceCharacteristics) {
				if (currentInstanceCharacteristics.hasOwnProperty(key)) {
					const value = {
						key: key,
						characteristicObject: currentInstanceCharacteristics[key] as Characteristic,
					};
					allInstanceCharacteristics.push(value);
				}
			}

			const childProductOfferings = ProductOfferingUtil.getProductOfferings(currentPoNode);

			childProductOfferings.forEach((childPo: ProductOffering) => {
				poStack.push(childPo);
			});
		}

		return allInstanceCharacteristics;
	}

	/**
	 *  Flattens product->po->po inputCharacteristic tree to array
	 */
	static getAllInputCharacteristics(productOffering: ProductOffering): Array<CharacteristicWithKey> {
		const allInputCharacteristics: Array<CharacteristicWithKey> = [];
		const poStack: Array<ProductOffering> = [];
		poStack.push(productOffering);

		while (poStack && poStack.length > 0) {
			const currentPoNode = poStack.pop() as ProductOffering;
			const currentInputCharacteristics = ProductOfferingUtil.getInputCharacteristics(currentPoNode);

			for (const key in currentInputCharacteristics) {
				if (currentInputCharacteristics.hasOwnProperty(key)) {
					const value = {
						key: key,
						characteristicObject: currentInputCharacteristics[key] as Characteristic,
					};
					allInputCharacteristics.push(value); // TODO: maybe create array of <key,characteristic> instead?
				}
			}

			const childProductOfferings = ProductOfferingUtil.getProductOfferings(currentPoNode);

			childProductOfferings.forEach((childPo: ProductOffering) => {
				poStack.push(childPo);
			});
		}
		return allInputCharacteristics;
	}

	/* returns flat list of ProductOfferings */
	static getAllProductOfferings(productOffering: ProductOffering): Array<ProductOffering> {
		const poStack: Array<ProductOffering> = [];
		const result: Array<ProductOffering> = [];

		poStack.push(productOffering);
		result.push(productOffering);

		if (poStack) {
			while (poStack.length > 0) {
				const currentPoNode = poStack.pop();
				const childProductOfferings = ProductOfferingUtil.getProductOfferings(currentPoNode); // will never be undef here

				childProductOfferings.forEach((childPo: ProductOffering) => {
					poStack.push(childPo);
					result.push(childPo);
				});
			}
		}
		return result;
	}

	/**
	 * Checks if array of instanceCharacteristics contains parameter instanceCharacteristicsAttribute
	 *
	 * @param {string} instanceCharacteristicAttributeId
	 * @param {ProductOfferingType} productOffering
	 * @returns {boolean}
	 */
	static hasInstanceCharacteristic(instanceCharacteristicAttributeId: string, productOffering: ProductOffering): boolean {
		const allInstanceCharacteristics = ProductOfferingUtil.getAllInstanceCharacteristics(productOffering);

		return allInstanceCharacteristics.some((instanceCharacteristic: CharacteristicWithKey) => {
			return instanceCharacteristic.key === instanceCharacteristicAttributeId;
		});
	}

	static hasInputCharacteristic(inputCharacteristicAttributeId: string, productOffering: ProductOffering): boolean {
		const allInputCharacteristics = ProductOfferingUtil.getAllInputCharacteristics(productOffering);

		return allInputCharacteristics.some((inputCharacteristic: CharacteristicWithKey) => {
			return inputCharacteristic.key === inputCharacteristicAttributeId;
		});
	}

	static isConfigurable(productOffering: ProductOfferingType): boolean {
		if (!isEmpty(ProductOfferingUtil.getInputCharacteristics(productOffering))) {
			return true;
		}

		if (!isEmpty(ProductOfferingUtil.getProductOfferingGroups(productOffering))) {
			return true;
		}

		const productOfferingStack: Array<ProductOffering> = clone(ProductOfferingUtil.getProductOfferings(productOffering));

		let isConfigurable = false;

		if (productOfferingStack) {
			while (productOfferingStack.length > 0) {
				const currentProductOfferingNode = productOfferingStack.pop() as ProductOffering;

				if (!isEmpty(ProductOfferingUtil.getInputCharacteristics(currentProductOfferingNode))) {
					isConfigurable = true;
					break;
				}

				if (!isEmpty(ProductOfferingUtil.getProductOfferingGroups(currentProductOfferingNode))) {
					isConfigurable = true;
					break;
				}

				const childProductOfferings = ProductOfferingUtil.getProductOfferings(currentProductOfferingNode);

				childProductOfferings.forEach((childProductOffering: ProductOffering) => {
					productOfferingStack.push(childProductOffering);
				});
			}
		}

		return isConfigurable;
	}

	/**
	 * Finds the first ProductOffering from ProductOfferingConfigurations that has selected === true
	 *
	 * @param pog
	 * @return productOffering or nothing
	 */
	static findSelectedPOFromPog(pog: ProductOfferingGroup): ProductOffering | undefined {
		if (pog) {
			return pog.productOfferings.find((po: ProductOffering) => Boolean(po.selected));
		}
		return undefined;
	}

	/**
	 * Finds the id of the first ProductOffering from ProductOfferingConfigurations that has selected === true
	 * @param pog
	 * @return productOffering or nothing
	 */
	static findIdOfFirstSelectedPOFromPog(pog: ProductOfferingGroup): string | undefined {
		const po = ProductOfferingUtil.findSelectedPOFromPog(pog);
		if (po) {
			return po.id;
		}
		return undefined;
	}

	static findProductOfferingByIdFromPog(pog: ProductOfferingGroup, poId?: string): ProductOffering | undefined {
		if (pog && poId && pog.productOfferings) {
			return pog.productOfferings.find((po: ProductOffering) => po.id === poId);
		}
		return undefined;
	}

	static sortArrayOfProductOfferingsFromLowestOneTimeFeeToHighest(pos: Array<ProductOffering>): Array<ProductOffering> {
		if (!pos) {
			return pos; // returns whatever it has to the input
		}
		return sortBy(pos, (po: ProductOffering) => {
			const prices: Array<Price> = po.prices || [];

			const oneTimePrice = prices.find((price: Price) => {
				return price.type === PriceTypeEnum.ONE_TIME;
			});
			return oneTimePrice && oneTimePrice.taxFreeAmount;
		});
	}

	static isNumberRequired(product: ProductOffering): boolean {
		return (
			product &&
			Boolean(
				(product.attributes && product.attributes.inputCharacteristics && product.attributes.inputCharacteristics.CH_NumberResource) ||
					(product.inputCharacteristics && product.inputCharacteristics.CH_NumberResource)
			)
		);
	}

	static getEnhancedCharacteristics(product: ProductOffering): Record<string, Array<any>> | undefined {
		const characteristics = product.enhancedCharacteristics || (product.attributes && product.attributes.enhancedCharacteristics);
		return characteristics;
	}

	static getValueForCharacteristic({
		config,
		inputCharacteristic,
		inputCharacteristicKey,
		msisdn,
		parentId,
		flow,
		reservedFor,
		inputtedValue,
	}: {
		config: object;
		inputCharacteristic: any;
		inputCharacteristicKey: string;
		msisdn?: string;
		parentId?: string;
		flow?: string;
		reservedFor?: string;
		inputtedValue?: string;
	}): object | undefined {
		if (!config || !inputCharacteristic) {
			return undefined;
		}
		const configCase = find(get(config, "config"), c => {
			return (
				c.hidden === inputCharacteristic.hidden &&
				c.mandatory === inputCharacteristic.mandatory &&
				c.source === inputCharacteristic.source &&
				get(c, ["characteristics", inputCharacteristicKey])
			);
		});
		const returnValue = (hidden: boolean, value?: string) => {
			return { hidden, value };
		};
		if (!configCase) {
			return undefined;
		} else {
			const characteristicConfiguration = get(configCase, ["characteristics", inputCharacteristicKey]);
			if (characteristicConfiguration) {
				if ("exactValue" in characteristicConfiguration) {
					return returnValue(configCase.hidden, characteristicConfiguration.exactValue);
				} else if (characteristicConfiguration.valueFrom) {
					switch (characteristicConfiguration.valueFrom) {
						case "MSISDN_OF_SUBSCRIPTION":
							return returnValue(configCase.hidden, msisdn);
						case "FLOW_BASED":
							if (flow) {
								return returnValue(configCase.hidden, flow);
							}
							break;
						case "SUBSCRIPTION_PRODUCT_UUID":
							return returnValue(configCase.hidden, parentId);
						case "RESERVED_FOR":
							return returnValue(configCase.hidden, reservedFor);
						default: {
							console.error("Unknown case", characteristicConfiguration.valueFrom);
						}
					}
				} else {
					// If no "custom" handling defined, just handle hidden attribute
					return returnValue(configCase.hidden, inputtedValue);
				}
			}
		}
		return undefined;
	}

	static getSubscriptionProductIdFromAgreements(agreements: Array<object> | null) {
		const id =
			agreements &&
			get(
				find(
					flatMap(agreements, agreement => {
						return get(agreement, "attributes.products");
					}),
					p => {
						return p.specType === "PRODUCT" && p.specSubType === "SUBSCRIPTION";
					}
				),
				"id"
			);
		return id;
	}

	static getPathToProductOfferingWithTFormName(product: ProductOffering, seekedValue?: string): ProductPath | undefined {
		const characteristic: Characteristic | undefined = this.getInstanceCharacteristics(product).T_FORM_NAME;
		const values: Array<CharacteristicValue> | undefined = characteristic ? characteristic.values : undefined;

		const initial = [{ po: product.id }] as ProductPath;

		if (values) {
			const found = seekedValue ? values.find((value: CharacteristicValue) => value.value === seekedValue) : values.length > 0;

			if (found) {
				return initial;
			}
		}

		const pogs = this.getProductOfferingGroups(product);
		if (pogs && pogs.length) {
			const found = pogs.reduce((acc: ProductPath, pog: ProductOfferingGroup): ProductPath => {
				if (!pog.productOfferings.length) {
					return acc;
				}

				const result = pog.productOfferings.reduce((acc1: ProductPath, po: ProductOffering) => {
					const pathPoint = this.getPathToProductOfferingWithTFormName(po, seekedValue);
					if (pathPoint) {
						return pathPoint;
					} else {
						return acc1;
					}
				}, []);

				if (Array.isArray(result) && result.length && isEmpty(acc)) {
					return acc.concat({ pog: pog.id }, result);
				} else {
					return acc;
				}
			}, []);

			if (found && found.length) {
				return initial.concat(found);
			}
		}

		const pos = this.getProductOfferings(product);
		if (pos && pos.length) {
			const found = pos.reduce((acc: ProductPath, po: ProductOffering) => {
				const result = this.getPathToProductOfferingWithTFormName(po, seekedValue);
				if (Array.isArray(result) && result.length && isEmpty(acc)) {
					return acc.concat(result);
				} else {
					return acc;
				}
			}, []);

			if (found && found.length) {
				return initial.concat(found);
			}
		}

		return undefined;
	}

	static getPathToProductOfferingById(product: ProductOffering, seekedValue: string): ProductPath | undefined {
		const found = product.id === seekedValue;
		const initial = [
			{
				po: product.id,
			},
		] as ProductPath;
		if (found) {
			return initial;
		}

		const pogs = this.getProductOfferingGroups(product);
		if (pogs && pogs.length) {
			const found = pogs.reduce((acc: ProductPath, pog: ProductOfferingGroup): ProductPath => {
				if (!pog.productOfferings.length) {
					return acc;
				}

				const result = pog.productOfferings.reduce((acc1: ProductPath, po: ProductOffering) => {
					const pathPoint = this.getPathToProductOfferingById(po, seekedValue);
					if (pathPoint) {
						return acc1.concat(pathPoint);
					} else {
						return acc1;
					}
				}, []);

				if (Array.isArray(result) && result.length && isEmpty(acc)) {
					return acc.concat({ pog: pog.id }, result);
				} else {
					return acc;
				}
			}, []) as ProductPath;

			if (found && found.length) {
				return initial.concat(found);
			}
		}

		const pos = this.getProductOfferings(product);
		if (pos && pos.length) {
			const found = pos.reduce((acc: ProductPath, po: ProductOffering) => {
				const result = this.getPathToProductOfferingById(po, seekedValue);
				if (Array.isArray(result) && result.length && isEmpty(acc)) {
					return acc.concat(result);
				} else {
					return acc;
				}
			}, []);

			if (found && found.length) {
				return initial.concat(found);
			}
		}

		const optionalProductOfferings = this.getOptionalProductOfferings(product);
		if (optionalProductOfferings && optionalProductOfferings.length) {
			const found = optionalProductOfferings.reduce((acc: ProductPath, po: ProductOffering) => {
				const result = this.getPathToProductOfferingById(po, seekedValue);
				if (Array.isArray(result) && result.length && isEmpty(acc)) {
					return acc.concat(result);
				} else {
					return acc;
				}
			}, []);

			if (found && found.length) {
				return initial.concat(found);
			}
		}
		return undefined;
	}

	static getPoFromProductOfferingByPath(product: ProductOffering, path: ProductPath): ProductOffering | ProductOfferingGroup | undefined {
		if (!path || !path.length || !product) {
			return undefined;
		}

		const current = head(path);
		if (!current) {
			return undefined;
		}

		// If current path is only 1 long and it's ID equals product.id, return product
		const currentId = current.po || current.pog;

		if (path.length === 1) {
			return currentId === product.id ? product : undefined;
		}

		// From now on we can assume path.length > 1
		const arrayWithoutCurrent = path.slice(1);
		const nextItem = head(arrayWithoutCurrent) || {};

		// Handle the next item in path since current was not match
		if (nextItem.po) {
			const pos = ProductOfferingUtil.getProductOfferings(product);
			const id = nextItem.po;

			const po = pos.find(po => po.id === id);

			if (po) {
				if (path.length > 2) {
					return this.getPoFromProductOfferingByPath(po, path.slice(2));
				} else {
					/* should always hold true! */
					return po.id === id ? po : undefined;
				}
			} else {
				return product.id === id ? product : undefined;
			}
		} else if (nextItem.pog) {
			const pogs = ProductOfferingUtil.getProductOfferingGroups(product);
			const id = nextItem.pog;
			const pog = pogs.find(pog => pog.id === id);

			// Return the pog itself if last item in path and id matches
			if (pog && path.length === 2) {
				return pog;
			}

			const posInPog = ProductOfferingUtil.getProductOfferings(pog);
			const found: Array<ProductOfferingType> = posInPog.reduce((acc: Array<ProductOfferingType>, po: ProductOffering) => {
				const result = this.getPoFromProductOfferingByPath(po, path.slice(2));

				if (result) {
					return acc.concat(result);
				} else {
					return acc;
				}
			}, []);

			if (found && found.length) {
				return head(found);
			}

			// Return the pog itself if last item in path and id matches
			if (pog && path.length === 1) {
				return pog;
			}

			return undefined;
		} else {
			return undefined;
		}
	}

	static isMatchToInstanceCharacteristics(product: ProductOffering, instanceCharacteristics: Record<string, Partial<Characteristic>>): boolean {
		return isMatch(this.getInstanceCharacteristics(product), instanceCharacteristics);
	}

	static getProductOfferingsSafe(productOfferingGroup: ProductOfferingGroup | ProductOffering): ProductOffering[] {
		return (productOfferingGroup.attributes && productOfferingGroup.attributes.productOfferings) || productOfferingGroup.productOfferings || [];
	}

	static getProductOfferingGroupsSafe(product: ProductOffering): ProductOfferingGroup[] {
		return (product.attributes && product.attributes.productOfferingGroups) || product.productOfferingGroups || [];
	}

	static getMatchedProductGroup = (groups: ProductOfferingGroup[], groupId: string, path: any[]): ProductOffering | undefined => {
		const matchedGroup = groups.find(pog => pog.id === groupId);
		if (path.length === 0 || !matchedGroup) {
			return undefined;
		}
		return ProductOfferingUtil.getMatchedProduct(ProductOfferingUtil.getProductOfferingsSafe(matchedGroup), path[0].po, path.slice(1));
	};

	static getMatchedProduct = (products: ProductOffering[], productId: string, path: any[]): ProductOffering | undefined => {
		const matchedProduct = products.find(po => po.id === productId);
		if (path.length === 0 || !matchedProduct) {
			return matchedProduct;
		}
		return ProductOfferingUtil.getMatchedProductGroup(ProductOfferingUtil.getProductOfferingGroupsSafe(matchedProduct), path[0].pog, path.slice(1));
	};

	static isProductRelatedPathKey(pathKey: any): boolean {
		return pathKey && pathKey.po;
	}

	static getProductOfferingByPath(product: ProductOffering, path?: any[]): ProductOffering | undefined {
		if (!path) {
			return product;
		}
		if (!Array.isArray(path)) {
			return undefined;
		}
		if (path.length === 0) {
			return product;
		}
		const rootPathKey = path[0];
		if (!ProductOfferingUtil.isProductRelatedPathKey(rootPathKey)) {
			return undefined;
		}

		return ProductOfferingUtil.getMatchedProduct([product], rootPathKey.po, path.slice(1));
	}

	static castAsProductOffering(partialProductOffering: Partial<ProductOffering>): ProductOffering {
		return partialProductOffering as ProductOffering;
	}

	static isPOMarkedSelected(product: ProductOffering): boolean {
		const selected = Boolean(get(product, "attributes.selected", product.selected));
		return selected;
	}

	static isPOSelectedInConfiguration(configuration: Record<string, any>): boolean {
		return Boolean(configuration.selected);
	}

	// static isPOSelectedInConfigurationAndIsUnderPOG(configuration: Record<string, any>, isUnderPOG: boolean): boolean {
	// 	const selected = Boolean(configuration.selected);

	// 	const include = selected || !isUnderPOG;

	// 	return include;
	// }

	static isOptionalPOSelectedInConfiguration(configuration: Record<string, any>): boolean {
		return Boolean(configuration.selected);
	}

	static isPOSelected(productOffering: ProductOffering, configuration: Record<string, any>, isOptional: boolean, isUnderPOG?: boolean): boolean {
		const isPOMarkedSelected = this.isPOMarkedSelected(productOffering);

		if (configuration) {
			const isPOSelectedInConfiguration = this.isPOSelectedInConfiguration(configuration);

			const isSelected = isOptional
				? isPOSelectedInConfiguration || isPOMarkedSelected
				: isPOSelectedInConfiguration || !Boolean(isUnderPOG) || isPOMarkedSelected;

			return isSelected;
		} else {
			return isPOMarkedSelected;
		}
	}

	static findSelectedPOs(
		pos: Array<ProductOffering>,
		configurations: Array<Record<string, any>>,
		isUnderPOG: boolean,
		isOptional: boolean
	): Array<ProductOffering> {
		const selectedPOs = pos.filter(po => {
			if (!configurations) {
				return false;
			}

			const poConf = configurations.find(conf => conf.id === po.id);

			const selected = this.isPOSelected(po, poConf || {}, isOptional, isUnderPOG);

			return selected;
		});

		return selectedPOs;
	}

	/**
	 * Finds both mandatory and optional POs in a PO.
	 */
	static findSelectedPOsInPO(po: ProductOffering, configurations: Array<Record<string, any>>, isOptional: boolean): ProductOffering[] {
		const productOfferingConfigurations = get(configurations, "productOfferings", []);
		const optionalProductOfferingConfigurations = get(configurations, "optionalProductOfferings", []);

		const selected = this.findSelectedPOs(
			isOptional ? this.getOptionalProductOfferings(po) : this.getProductOfferings(po),
			isOptional ? optionalProductOfferingConfigurations : productOfferingConfigurations,
			false,
			isOptional
		);

		return selected;
	}

	static findSelectedPOsInPOGs(
		pogs: Array<ProductOfferingGroup>,
		configurations: Array<Record<string, any>>,
		getDirectOptionals: boolean,
		getDeepOptionals?: boolean
	): Array<ProductOffering> {
		const selectedPOs = pogs.reduce((stack: Array<ProductOffering>, pog: ProductOfferingGroup) => {
			const pogConfiguration = configurations.find(conf => conf.id === pog.id) || {};

			const selectedPOs = this.findSelectedPOs(pog.productOfferings, pogConfiguration.productOfferings, true, getDirectOptionals);

			const allPOs = pog.productOfferings || [];

			const selectedPOsInPOG = allPOs.reduce((stack: ProductOffering[], po: ProductOffering) => {
				const poConf = (pogConfiguration.productOfferings || []).find((conf: any) => conf.id === po.id) || {};

				const selected = this.findSelectedPOsInPO(po, poConf, getDeepOptionals || false);

				const isSelected = this.isPOSelected(po, poConf, true, true);

				return isSelected ? stack.concat(selected).concat(po) : stack.concat(selected);
			}, []);

			const result = uniqWith([...selectedPOs, ...selectedPOsInPOG], (a, b) => a.id === b.id);

			return result.length > 0 ? stack.concat(result) : stack;
		}, []);

		return selectedPOs;
	}

	static getSelectedPOsInProduct(product: ProductOffering, configurations: ProductOfferingsConfigObject, isUnderPOG: boolean): ProductOffering[] {
		/*
		 * when a PO is under a POG, PO must have selected:true for it to be returned among selected ones.
		 * when a PO is _not_ under a POG, it must be returned among selected ones.
		 * when PO2 is under PO1, PO2 is mandatory so it must be returned among selected ones.
		 * no need to worry about POG2 under POG1 as that is impossible.
		 */
		const selected = this.isPOSelected(product, configurations, isUnderPOG);

		const selectedPOs = this.findSelectedPOs(this.getProductOfferings(product), configurations.productOfferings || [], false, false);

		const selectedOptionalPOs = this.findSelectedPOs(this.getOptionalProductOfferings(product), configurations.optionalProductOfferings || [], false, true);

		const selectedPOsInPOGs = this.findSelectedPOsInPOGs(this.getProductOfferingGroups(product), configurations.productOfferingGroups || [], false, true);

		const result: Array<ProductOffering> = ([selected && product, ...selectedPOs, ...selectedPOsInPOGs, ...selectedOptionalPOs] as Array<any>).filter(
			Boolean
		) as Array<ProductOffering>;

		return result;
	}

	/**
	 * Merged subProduct to main product. Recursively searches for existing subProduct using id under mainProduct and replaces it.
	 */
	static mergeSubProductToMainProduct(originalProduct: ProductOffering, subProduct: ProductOffering, path?: ProductPath): ProductOffering | undefined {
		if (!originalProduct) {
			return undefined;
		}
		if (!subProduct) {
			return originalProduct;
		}
		const product = clone(originalProduct);
		const pathToSubProduct = path || ProductOfferingUtil.getPathToProductOfferingById(product, subProduct.id);
		// Path should now contain path to the subProduct, including the subProduct
		if (!pathToSubProduct || !pathToSubProduct.length) {
			return originalProduct;
		}

		// finalPath = path to subProducts parent
		const finalPath = pathToSubProduct.slice(0, -1);

		const parentOfSubProduct: ProductOffering = ProductOfferingUtil.getPoFromProductOfferingByPath(product, finalPath) as ProductOffering;
		if (!parentOfSubProduct) {
			return originalProduct;
		}

		// If it's under productOfferings, ...
		if (Array.isArray(parentOfSubProduct.productOfferings) && parentOfSubProduct.productOfferings.find(po => po.id === subProduct.id)) {
			parentOfSubProduct.productOfferings = parentOfSubProduct.productOfferings.map(po => (po.id === subProduct.id ? subProduct : po));
		}

		// If it's under optionalProductOfferings, ...
		if (Array.isArray(parentOfSubProduct.optionalProductOfferings) && parentOfSubProduct.optionalProductOfferings.find(po => po.id === subProduct.id)) {
			parentOfSubProduct.optionalProductOfferings = parentOfSubProduct.optionalProductOfferings.map(po => (po.id === subProduct.id ? subProduct : po));
		}

		return product;
	}

	/**
	 * Fetches a productOffering from inside a productOffering hierarchy recursively using id
	 */
	static getProductOfferingFromProductOfferingById(productOffering?: ProductOffering, id?: string): ProductOffering | undefined {
		if (!productOffering || !id) {
			return undefined;
		}

		if (productOffering.id === id) {
			return productOffering;
		}

		const productOfferings = ProductOfferingUtil.getProductOfferingsSafe(productOffering);
		if (Array.isArray(productOfferings) && productOfferings.length) {
			const result = productOfferings.reduce((result: ProductOffering | undefined, current: ProductOffering) => {
				return ProductOfferingUtil.getProductOfferingFromProductOfferingById(current, id) || result;
			}, undefined);
			if (result) {
				return result;
			}
		}

		const optionalProductOfferings = ProductOfferingUtil.getOptionalProductOfferings(productOffering);
		if (Array.isArray(optionalProductOfferings) && optionalProductOfferings.length) {
			const result = optionalProductOfferings.reduce((result: ProductOffering | undefined, current: ProductOffering) => {
				return ProductOfferingUtil.getProductOfferingFromProductOfferingById(current, id) || result;
			}, undefined);
			if (result) {
				return result;
			}
		}

		const productOfferingGroups = ProductOfferingUtil.getProductOfferingGroupsSafe(productOffering);
		if (Array.isArray(productOfferingGroups) && productOfferingGroups.length) {
			const offeringsFromGroups = productOfferingGroups.reduce((result: Array<ProductOffering>, current: ProductOfferingGroup) => {
				return result.concat(ProductOfferingUtil.getProductOfferings(current));
			}, []);

			const result = offeringsFromGroups.reduce((result: ProductOffering | undefined, current: ProductOffering) => {
				return ProductOfferingUtil.getProductOfferingFromProductOfferingById(current, id) || result;
			}, undefined);
			if (result) {
				return result;
			}
		}

		const optionalProductOfferingGroups = ProductOfferingUtil.getOptionalProductOfferingGroups(productOffering);
		if (Array.isArray(optionalProductOfferingGroups) && optionalProductOfferingGroups.length) {
			const offeringsFromGroups = optionalProductOfferingGroups.reduce((result: Array<ProductOffering>, current: ProductOfferingGroup) => {
				return result.concat(ProductOfferingUtil.getProductOfferings(current));
			}, []);

			const result = offeringsFromGroups.reduce((result: ProductOffering | undefined, current: ProductOffering) => {
				return ProductOfferingUtil.getProductOfferingFromProductOfferingById(current, id) || result;
			}, undefined);
			if (result) {
				return result;
			}
		}

		return undefined;
	}

	static getInstanceCharacteristicValueFromProductOffering(productOffering: ProductOffering, instanceCharacteristicIdOrName: string): string | undefined {
		const instanceCharacteristics: Record<string, Characteristic> = ProductOfferingUtil.getInstanceCharacteristics(productOffering);
		const singleIc = instanceCharacteristics[instanceCharacteristicIdOrName];
		if (singleIc) {
			return get(singleIc, "values[0].value");
		}

		return undefined;
	}

	static updateProductOfferingGroupsWithSelectedMsisdn(pogs: ProductOfferingGroup[], selectMsisdnProductOffering: ProductOffering): ProductOfferingGroup[] {
		pogs.forEach((pog: ProductOfferingGroup) => {
			pog.productOfferings.forEach((po, index, array) => {
				array[index].selected = false;
				if (array[index].id === selectMsisdnProductOffering.id) {
					array[index] = selectMsisdnProductOffering;
					array[index].selected = true;
				}
			});
		});

		return pogs;
	}

	static productOfferingGroupContainsTFormName(productOfferingGroup: ProductOfferingGroup): boolean {
		return productOfferingGroup.productOfferings.reduce((acc, po) => {
			return acc || ProductOfferingUtil.productOfferingContainsTFormName(po);
		}, false);
	}

	static productOfferingsContainTFormName(productOfferings: ProductOffering[]): boolean {
		return productOfferings.reduce((acc, po) => {
			return acc || ProductOfferingUtil.productOfferingContainsTFormName(po);
		}, false);
	}

	static productOfferingContainsTFormName(productOffering: ProductOffering): boolean {
		if (ProductOfferingUtil.getInstanceCharacteristics(productOffering).T_FORM_NAME) {
			return true;
		} else {
			const pos = ProductOfferingUtil.getProductOfferings(productOffering);
			const foundTFormNameInPo = pos.reduce((acc, po) => {
				return acc || ProductOfferingUtil.productOfferingContainsTFormName(po);
			}, false);

			if (foundTFormNameInPo) {
				return true;
			}

			const pogs = ProductOfferingUtil.getProductOfferingGroups(productOffering);
			const foundTFormNameInAPog = pogs.reduce((acc, pog) => {
				return acc || ProductOfferingUtil.productOfferingGroupContainsTFormName(pog);
			}, false);
			if (foundTFormNameInAPog) {
				return true;
			}

			const optionalPos = ProductOfferingUtil.getOptionalProductOfferings(productOffering);
			const foundTFormNameInAnOptionalPo = ProductOfferingUtil.productOfferingsContainTFormName(optionalPos);

			if (foundTFormNameInAnOptionalPo) {
				return true;
			}

			const optionalPogs = ProductOfferingUtil.getOptionalProductOfferingGroups(productOffering);
			const foundTFormNameInAnOptionalPog = optionalPogs.reduce((acc, pog) => {
				return acc || ProductOfferingUtil.productOfferingGroupContainsTFormName(pog);
			}, false);

			if (foundTFormNameInAnOptionalPog) {
				return true;
			}
		}

		return false;
	}

	static isFnfProduct(specificationId: string): boolean {
		if (specificationId && specificationId.includes("FnF")) {
			return true;
		} else {
			return false;
		}
	}

	static getPricesList(productOffering: ProductOffering | Product): Price[] {
		return productOffering.prices || (productOffering.attributes && productOffering.attributes.prices) || [];
	}
	static getUpfrontPrice(productOffering: ProductOffering | Product): SimplePrice | undefined {
		return PriceUtil.getUpfrontPriceSumInList(ProductOfferingUtil.getPricesList(productOffering));
	}
	static getRecurrentPriceSum(productOffering: ProductOffering | Product): Price | undefined {
		return PriceUtil.getRecurrentPriceSumInList(ProductOfferingUtil.getPricesList(productOffering));
	}
	static getOneTimePriceSum(productOffering: ProductOffering | Product): Price | undefined {
		return PriceUtil.getOneTimePriceSumInList(ProductOfferingUtil.getPricesList(productOffering));
	}
	static getBundledProductOffering(baseProductOffering: ProductOffering, bundledItemId: string): ProductOffering | undefined {
		return ArrayUtil.filterUndefined(
			ProductOfferingUtil.getProductOfferingGroups(baseProductOffering).map(group => (group.productOfferings || []).find(po => po.id === bundledItemId))
		)[0];
	}
	static commercialEnrichmentsName (item: ProductOffering) {
		const attributes = item.attributes;
		return attributes && (attributes.commercialEnrichments[0].names ? attributes.commercialEnrichments[0].names.name : attributes.name);
	}

	static getName(item: ProductOffering) {
		const attributes = item && item.attributes;
		const commercialEnrichments = attributes && attributes.commercialEnrichments;
		const itemName = attributes && commercialEnrichments && (
			attributes.commercialEnrichments.length ?
				ProductOfferingUtil.commercialEnrichmentsName(item) : attributes.name
			);
		return itemName  || item.name;
	}
}

import { Basket, BasketAttributes, BasketItem, BasketItemAttributes, ProductOffering } from "../../redux/types";
import PriceUtil from "../../utils/PriceUtil";
import BasketUtil from "../../utils/BasketUtil";
import { flatten } from "lodash";

interface MakeBasketConfig {
	id?: string;
	basketItemsConfigs?: MakeBasketItemConfig[];
}
interface MakeBasketItemConfig {
	id?: string;
	name?: string;
	quantity?: number;
	oneTimePriceAmount?: number;
	recurrentPriceAmount?: number;
	recurrentPriceIsUpfront?: boolean;
	currency?: string;
	childBasketItems?: MakeBasketItemConfig[];
	productOfferingId?: string;
}
const CURRENCY = "EUR";
class BasketMock {
	static DEFAULT_BASKET_CONFIG: Partial<MakeBasketConfig> = {
		id: "basket-1",
		basketItemsConfigs: [
			{
				id: "basket-1-item-1",
				quantity: 1,
				oneTimePriceAmount: 5
			},
			{
				id: "basket-1-item-2",
				quantity: 1,
				recurrentPriceAmount: 1
			},
			{
				id: "basket-1-item-3",
				quantity: 1,
				oneTimePriceAmount: 2,
				recurrentPriceAmount: 3,
				childBasketItems: [
					{
						id: "basket-1-item-3-child-1",
						quantity: 1,
						oneTimePriceAmount: 7
					}
				]
			}
		]
	};
	static DEFAULT_BASKET_ITEM_CONFIG: Partial<MakeBasketItemConfig> = {
		id: "basket-item-1",
		name: "Test basket item",
		productOfferingId: "test-po",
		quantity: 1,
		currency: CURRENCY,
		childBasketItems: [],
		recurrentPriceIsUpfront: true
	};
	static makeBasket(config: MakeBasketConfig = {}): Basket {
		const configWithDefaults = { ...BasketMock.DEFAULT_BASKET_CONFIG, ...config };
		const basketItems = (configWithDefaults.basketItemsConfigs || []).map(BasketMock.makeBasketItem);
		const totalPrices = PriceUtil.sumPricesByType(flatten(basketItems.map(basketItem => BasketUtil.flattenPrices(basketItem))));
		const basket = ({
			id: configWithDefaults.id,
			attributes: {
				lifecycleStatus: "OPEN",
				totalPrices,
				basketItems,
				created: "",
				modified: "",
				expiresAt: "",
				createdAt: "2018-12-03T14:55:37.308Z",
				upfrontPrices: false,
				eligiblePromotions: [],
				selectedPromotions: [],
				basketValidationInformations: [],
				basketPaymentReceipts: [],
				totalUpfrontPrice: basketItems.map(basketItem => basketItem.attributes!.totalUpfrontPriceWithChildren).reduce((x, y) => x + y, 0)
			}
		} as Partial<BasketAttributes>) as Basket;
		basketItems.forEach(basketItem => (basketItem.attributes!.basket = basket));
		return basket;
	}
	static makeBasketItem(config: MakeBasketItemConfig = {}): BasketItem {
		const configWithDefaults = { ...BasketMock.DEFAULT_BASKET_ITEM_CONFIG, ...config };
		const unitPrices = [];
		const totalPrices = [];

		if (configWithDefaults.oneTimePriceAmount) {
			unitPrices.push(PriceUtil.getOneTimePrice(configWithDefaults.oneTimePriceAmount, configWithDefaults.currency!));
			totalPrices.push(PriceUtil.getOneTimePrice(configWithDefaults.oneTimePriceAmount * configWithDefaults.quantity!, configWithDefaults.currency!));
		}
		if (configWithDefaults.recurrentPriceAmount) {
			unitPrices.push(
				PriceUtil.getRecurrentPrice(configWithDefaults.recurrentPriceAmount, configWithDefaults.currency!, configWithDefaults.recurrentPriceIsUpfront)
			);
			totalPrices.push(
				PriceUtil.getRecurrentPrice(
					configWithDefaults.recurrentPriceAmount * configWithDefaults.quantity!,
					configWithDefaults.currency!,
					configWithDefaults.recurrentPriceIsUpfront
				)
			);
		}
		const totalUpfrontPrice = PriceUtil.getUpfrontPriceSumInList(totalPrices);
		const basketItem = ({
			id: config.id,
			attributes: {
				quantity: configWithDefaults.quantity,
				inputtedCharacteristics: {},
				childBasketItems: (configWithDefaults.childBasketItems || []).map(BasketMock.makeBasketItem),
				unitPrices,
				totalPrices,
				originalUnitPrices: unitPrices,
				originalTotalPrices: totalPrices,
				createdAt: "2018-12-03T12:54:02.393Z",
				modifiedAt: "2018-12-03T12:54:02.393Z",
				totalUpfrontPrice,
				totalUpfrontPriceWithChildren: 0,
				product: {
					id: configWithDefaults.productOfferingId,
					name: configWithDefaults.name
				} as Partial<ProductOffering>
			} as Partial<BasketItemAttributes>
		} as Partial<BasketItemAttributes>) as BasketItem;
		const totalUpfrontPriceWithChildren = PriceUtil.getUpfrontPriceSumInList(BasketUtil.flattenPrices(basketItem));
		basketItem.attributes!.totalUpfrontPriceWithChildren = (totalUpfrontPriceWithChildren && totalUpfrontPriceWithChildren.taxFreeAmount) || 0;
		return basketItem;
	}
}

export default BasketMock;
export { MakeBasketConfig, MakeBasketItemConfig };

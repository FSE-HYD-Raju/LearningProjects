"use strict";

import { cloneDeep, set } from "lodash";
import BaseService from "./BaseService";
import { Rest } from "./Rest";
import { REST } from "../settings/core";
import { AxiosResponse, Basket, BasketPaymentReceipt, User, BasketProductsUpdate, OmnichannelApiResponse, BasketItem } from "../types";
import BasketUtil from "../../utils/BasketUtil";

export default class BasketService extends BaseService {
	static async create(args: { userId?: string }) {
		const basket = args.userId
			? {
				type: "baskets",
				attributes: {},
				relationships: {
					owner: {
						data: {
							type: "persons",
							id: args.userId,
						},
					},
					payer: {
						data: {
							type: "persons",
							id: args.userId,
						},
					},
				},
			}
			: {
				type: "baskets"
			};
		let resp;
		try {
			resp = await Rest.post(`${REST.BASKETS.BASKETS}`, {
				data: basket,
			});
			BasketService.validateResp(resp);
		} catch (e) {
			throw e;
		}
		return resp.data;
	}

	static async delete(basketId: string) {
		let resp;
		try {
			resp = await Rest.delete(`${REST.BASKETS.BASKETS}/${basketId}`);
			// TODO: should it return any response? BasketService.validateResp(resp) throws error
			BasketService.validateResp(resp);
		} catch (e) {
			throw e;
		}
		return resp.data;
	}

	static async getBasketPaymentReceipts(basketId: string): Promise<AxiosResponse<Array<BasketPaymentReceipt>>> {
		const resp = await Rest.get(`${REST.BASKETS.BASKETS}/${basketId}/basketPaymentReceipts`);
		BasketService.validateResp(resp);
		return resp.data;
	}

	static async update(basket: Basket) {
		const sanitizedBasket = BasketUtil.sanitizeBasket(basket);

		if (sanitizedBasket) {
			let resp;

			try {
				resp = await Rest.patch(`${REST.BASKETS.BASKETS}/${sanitizedBasket.id}`, {
					data: sanitizedBasket,
				});
				BasketService.validateResp(resp);
			} catch (e) {
				throw e;
			}

			return resp.data;
		}
		return false;
	}

	static async submit(basketId: string): Promise<void> {
		try {
			const payload = {
				data: {
					type: "baskets-submit",
					relationships: {
						basket: {
							data: {
								type: "baskets",
								id: basketId,
							},
						},
					},
				},
				included: [
					{
						type: "baskets",
						id: basketId,
					},
				],
			};
			const resp = await Rest.post(`${REST.BASKETS.BASKET_SUBMIT}?include=basket.basketItems`, payload);
			BasketService.validateResp(resp);
			return resp.data;
		} catch (e) {
			throw e;
		}
	}

	static async updateOwnerToBasket(basket: Basket, owner: User) {
		if (basket && owner) {
			const basketOwnerId = BasketUtil.getBasketOwnerId(basket);

			if (basketOwnerId !== owner.id) {
				const updatedBasket = cloneDeep(basket);

				set(updatedBasket, "relationships.owner", {
					data: {
						id: owner.id,
						type: "persons",
					},
				});

				set(updatedBasket, "relationships.payer", {
					data: {
						id: owner.id,
						type: "persons",
					},
				});

				return BasketService.update(updatedBasket);
			}
			return false;
		}
		return false;
	}

	static async discardBasket(basketId: string, userId?: string) {
		let newBasket;

		try {
			BasketService.delete(basketId);
			newBasket = BasketService.create({ userId });
		} catch (e) {
			throw e;
		}

		return newBasket;
	}

	static async getBasketIncludeBasketItems(basketId: string) {
		let resp;
		try {
			resp = await Rest.get(`${REST.BASKETS.BASKETS}/${basketId}?include[baskets]=basketItems`);
			BasketService.validateResp(resp);
		} catch (e) {
			throw e;
		}

		const basket = resp.data;
		const basketItems = resp.included || [];

		return { basket, basketItems };
	}

	static async deleteBasketItemFromBasket(basketItemId: string) {
		let resp;
		try {
			resp = await Rest.delete(`${REST.BASKETS.BASKET_ITEMS}/${basketItemId}`);
			BasketService.validateResp(resp);
		} catch (e) {
			throw e;
		}
		return resp.data;
	}

	static async getBasket(basketItemId: string) {
		let resp;
		try {
			resp = await Rest.get(`${REST.BASKETS.BASKETS}/${basketItemId}`);
			BasketService.validateResp(resp);
		} catch (e) {
			throw e;
		}
		return resp;
	}

// 	static async addBasketItemToBasket(basketItem: BasketItem) {
// 		let resp;
// 		try {
// 			const data = {
// 				data: {
// 					type: "basket-items",
// 					attributes: {},
// 					relationships: {
// 						basket: {
// 							data: {
// 								type: "baskets",
// 								id: basketItem.attributes.basket.id,
// 							},
// 						},
// 						productPffering: {
// 							data: {
// 								type: "baskets",
// 								id: basketItem.attributes.basket.id,
// 							},
// 						},
// 					}
// 				}
// 			}
// 			resp = await Rest.post(`${REST.BASKETS.BASKET_ITEMS}`,data);
// 			BasketService.validateResp(resp);
// 		} catch (e) {
// 			throw e;
// 		}
// 		return resp.data;
// 	}

	static async updateBasketProduct(basketProductId: string, basketProducts: BasketProductsUpdate) {
		let resp;
		try {
			resp = await Rest.patch(`${REST.BASKETS.BASKET_PRODUCTS}/${basketProductId}`, {
				data: {
					id: basketProductId,
					type: "basket-products",
					...basketProducts,
				},
			});
			BasketService.validateResp(resp);
		} catch (e) {
			throw e;
		}
		return resp;
	}
}

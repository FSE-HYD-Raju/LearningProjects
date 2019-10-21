"use strict";

import * as ecareUtils from "./ECareFeatureUtils";
import { AppState } from "../../../reducers";
import { FeatureState } from "../feature.types";
import { BasketItemAttributes, OrderItemAttributes } from "../../../types";

describe("ECareFeatureUtils", () => {

	const mockIcon = "icon";
	const mockCategory = "category-id";
	const mockState = ({
		feature: {
			eCare: {
				basketItemsIconsByCategoriesIds: {
					[mockIcon]: [mockCategory],
				},
				orderItemsIconsByCategoriesIds: {
					[mockIcon]: [mockCategory],
				},
			} as Partial<FeatureState>,
		},
	} as Partial<AppState>) as AppState;

	describe("getIconClassForBasketItem", () => {
		const { getIconClassForBasketItem } = ecareUtils;
		const basketMinProps = (category: string) => ({
			product: {
				categories: [category],
			},
		} as Partial<BasketItemAttributes>) as BasketItemAttributes;

		it("returns icon class if basket item's category present in icon's categoriesIds list", () => {
			const iconClass = getIconClassForBasketItem(basketMinProps(mockCategory), mockState);
			expect(iconClass).toEqual(mockIcon);
		});

		it("returns icon class if basket item's category missed in icon's categoriesIds list", () => {
			const iconClass = getIconClassForBasketItem(basketMinProps("another-category"), mockState);
			expect(iconClass).toBeUndefined();
		});
	});

	describe("getIconClassForOrderItem", () => {
		const { getIconClassForOrderItem } = ecareUtils;
		const orderMinProps = (category: string) => ({
			productOffering: {
				categories: [category],
			},
		} as Partial<OrderItemAttributes>) as OrderItemAttributes;

		it("returns icon class if order item's category present in icon's categoriesIds list", () => {
			const iconClass = getIconClassForOrderItem(orderMinProps(mockCategory), mockState);
			expect(iconClass).toEqual(mockIcon);
		});

		it("returns icon class if order item's category missed in icon's categoriesIds list", () => {
			const iconClass = getIconClassForOrderItem(orderMinProps("another-category"), mockState);
			expect(iconClass).toBeUndefined();
		});
	});
});

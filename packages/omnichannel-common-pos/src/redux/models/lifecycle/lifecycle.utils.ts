import { get } from "lodash";
import { ConsulValues } from "../consul/consul.types";
import { getParsedValue } from "../../utils";
import {
	Basket, BasketItem, ProductModificationCombined, ProductModificationResult, ProductOffering,
	ServiceModificationCombined,
	ServiceModificationInitialization,
	ServiceModificationInitializationResult
} from "../../types";

export function extractValues(payload: ConsulValues) {
	return {
		stateTransitionByActionName: getParsedValue(
			get(payload, "products/state_transition_to_action"),
			{
				resume: "resume",
				reactivate: "reactivate",
				disable: "disable",
				suspend: "suspend",
				deactivate: "deactivate"
			}
		),
		serviceStateTransitionByActionName: getParsedValue(
			get(payload, "services/state_transition_to_action"),
			{
				enable: "enable",
				disable: "disable"
			}
		)
	};
}

export function createServiceModificationResult(result: ServiceModificationInitializationResult): ServiceModificationCombined {
	const basket: Basket | undefined = result.included
		? result.included.find((item: any) => {
			return item.type === "baskets";
		}) : undefined;
	const basketItems: Array<BasketItem> = result.included
		? result.included.filter((item: any) => {
			return item.type === "basketItems" && item.attributes.product;
		}) : [];
	return {
		resource: result.data,
		basket,
		basketItems,
	};
}

export function createProductModificationResult(result: ProductModificationResult): ProductModificationCombined {
	const basket: Basket | undefined = result.included
		? result.included.find((item: any) => {
			return item.type === "baskets";
		}) : undefined;
	const basketItems: Array<BasketItem> = result.included
		? result.included.filter((item: any) => {
			return item.type === "basketItems" && item.attributes.product;
		}) : [];
	const products: Array<ProductOffering> = basketItems.reduce<Array<ProductOffering>>((acc: Array<ProductOffering>, item: BasketItem) => {
		if (item.attributes && item.attributes.product) {
			acc = acc.concat(item.attributes.product);
		}
		return acc;
	}, []);
	return {
		resource: result.data,
		basket,
		basketItems,
		products
	};
}

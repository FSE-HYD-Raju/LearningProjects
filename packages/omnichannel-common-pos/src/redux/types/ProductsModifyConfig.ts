import { Basket, Product, HasId } from "./index";

interface ProductsModifyConfigAttributes extends HasId {
	bakset: Basket;
	characteristics: Record<string, string>;
	product: Product;
	owner: any;
	resultBasket: Basket;
	areementId: string;
	productId: string;
	productOfferingId: string;
}

interface ProductsModifyConfig extends ProductsModifyConfigAttributes {
	attributes?: ProductsModifyConfigAttributes;
}

export {
	ProductsModifyConfig,
	ProductsModifyConfigAttributes
};

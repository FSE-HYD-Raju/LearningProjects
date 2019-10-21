import {
	BasketItem, ProductOffering,
	BasketPaymentReceipt, BasketLifecycleStatus,
	BasketValidationInformation, Person, PostalAddress, Price,
	HasId
} from "./index";
import { SalesInfo } from "./SalesInfo";

interface BasketAttributes {
	owner?: Person;
	payer?: Person;
	lifecycleStatus: BasketLifecycleStatus;
	totalPrices?: Array<Price>;
	billingAddress?: PostalAddress;
	basketItems: Array<BasketItem>;
	deliveryContactMediumId?: string;
	created: string; // Date?
	modified: string; // Date?
	createdAt: string;
	lastModifiedAt?: string;
	expiresAt: string;
	referenceNumber?: string;
	upfrontPrices: boolean;
	eligiblePromotions: Array<ProductOffering>; // it is List<ContextualProduct> on BE, but ContextualProduct extends ProductOffering
	selectedPromotions: Array<BasketItem>;
	basketValidationInformations: Array<BasketValidationInformation>;
	basketPaymentReceipts: Array<BasketPaymentReceipt>;
	totalUpfrontPrice: number;
	hideLifeCycleStatusChangeModal?: boolean;
	salesInfo?: SalesInfo;
}

interface Basket extends BasketAttributes, HasId {
	attributes: BasketAttributes;
}

export {
	Basket,
	BasketAttributes
};

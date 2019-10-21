import { ProductOffering } from "../types";

export const CHANGE_SIM_PAYMENT_USE_CASE = "b2c-change-sim";

export type MinimalBasketItemData = {
	id: string;
	inputtedCharacteristics: Record<string, string>;
};

export default class ChangeSimServicePayloadUtil {
	static getChangeResourcePayload(args: {
		selectedPaymentMethod: string;
		selectedCustomerPaymentMethod: string | undefined;
		basketId: string;
	}) {
		return {
			data: {
				type: "change-resource",
				attributes: {
					paymentMethodId: args.selectedPaymentMethod,
					customerPaymentMethodId: args.selectedCustomerPaymentMethod,
					paymentUseCase: CHANGE_SIM_PAYMENT_USE_CASE
				},
				relationships: {
					basket: {
						data: {
							id: args.basketId,
							type: "baskets"
						}
					}
				}
			}
		};
	}
	static getAddBasketItemPayload(args: {
		changeSimPO: MinimalBasketItemData;
		reasonPO: MinimalBasketItemData;
		deliveryPO: MinimalBasketItemData;
		targetAgreementId: string;
		basketId: string;
	}) {
		return {
			data: {
				type: "basketItems",
				attributes: {
					product: {
						id: args.changeSimPO.id
					},
					quantity: 1,
					targetAgreementId: args.targetAgreementId,
					inputtedCharacteristics: { ...args.changeSimPO.inputtedCharacteristics },
					targetProductId: args.changeSimPO.id,
					childBasketItems: [
						{
							product: {
								id: args.deliveryPO.id
							},
							quantity: 1,
							inputtedCharacteristics: { ...args.deliveryPO.inputtedCharacteristics },
							targetProductId: args.deliveryPO.id
						},
						{
							product: {
								id: args.reasonPO.id
							},
							quantity: 1,
							inputtedCharacteristics: { ...args.reasonPO.inputtedCharacteristics },
							targetProductId: args.reasonPO.id
						}
					]
				},
				relationships: {
					basket: {
						data: {
							id: args.basketId,
							type: "baskets"
						}
					}
				}
			}
		};
	}
	static getInitializePayload(args: { productId: string; targetAgreementId: string; userId: string }) {
		return {
			data: {
				type: "change-resource-initialization",
				attributes: {
					paymentUseCase: CHANGE_SIM_PAYMENT_USE_CASE,
					productId: args.productId,
					basketItem: {
						product: {
							id: args.productId,
							specificationId: ""
						},
						quantity: 1,
						inputtedCharacteristics: {},
						targetAgreementId: args.targetAgreementId,
						targetProductId: args.productId
					}
				},
				relationships: {
					owner: {
						data: {
							type: "persons",
							id: args.userId
						}
					}
				}
			},
			included: [
				{
					type: "persons",
					id: args.userId
				}
			]
		};
	}
}

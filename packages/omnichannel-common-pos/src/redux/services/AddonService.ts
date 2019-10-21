import { REST } from "../settings/core";
import { Rest } from "./Rest";
import { InitializedAddon } from "../types";
import BaseService from "./BaseService";
import { get } from "lodash";

interface EnableAddonConfig {
	basketId: string;
	paymentMethod: string | undefined;
	targetAgreementId?: string;
}

interface InitializeAddonConfig {
	targetAgreementId: string;
	personId: string;
	productId: string;
	inputtedCharacteristics?: Record<string, string>;
}

class AddonService extends BaseService {
	static async initializeAddon(config: InitializeAddonConfig): Promise<InitializedAddon> {
		const { targetAgreementId, personId, productId, inputtedCharacteristics } = config;
		const basketItem = {
			targetAgreementId,
			quantity: 1,
			inputtedCharacteristics: inputtedCharacteristics || {},
			product: {
				id: productId
			}
		};
		const payload = {
			data: {
				type: "products-enable-addon-initialize",
				attributes: {
					basketItem
				},
				relationships: {
					owner: {
						data: {
							type: "persons",
							id: personId
						}
					}
				}
			},
			included: [
				{
					type: "persons",
					id: personId
				}
			]
		};
		const resp = await Rest.post(`${REST.ADDONS.INITIALIZE}?include=basket.basketItems`, payload);
		AddonService.validateResp(resp);
		try {
			return {
				id: productId,
				basketId: resp.data.id,
				basketItems: resp.included.filter((include: any) => include.type === "basketItems"),
				paymentMethods: resp.data.attributes.paymentMethods || []
			};
		} catch (e) {
			throw new Error("Wrong data format. " + e.message);
		}
	}
	// throws error in case request fail or payment is not completed
	static async enableAddon(config: EnableAddonConfig): Promise<boolean> {
		const { paymentMethod, basketId } = config;
		const payload = {
			data: {
				type: "products-enable-addon",
				attributes: {
					paymentMethodId: paymentMethod
				},
				relationships: {
					basket: {
						data: {
							id: basketId,
							type: "baskets"
						}
					}
				}
			}
		};
		const resp = await Rest.post(`${REST.ADDONS.ENABLE}`, payload);
		AddonService.validateResp(resp);
		const paymentCompletedResponse = get(resp.data, "attributes.paymentInfo.paymentCompleted");
		if (paymentCompletedResponse === false || resp.error) {
			const errorCode = get(resp.data, "attributes.paymentInfo.paymentErrorCode");
			throw new Error(errorCode);
		}
		return true;
	}
}

export {
	InitializeAddonConfig,
	EnableAddonConfig,
	AddonService
};

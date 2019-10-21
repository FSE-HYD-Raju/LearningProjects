"use strict";

import { AxiosResponse } from "axios";
import BaseService from "./BaseService";
import { Rest } from "./Rest";
import { REST } from "../settings/core";
import { ChangeSimActionInitializeRequest, PostalAddress, PriceTypeEnum, ProductOffering } from "../types";
import { ChangeResourceInitialization } from "../types/ChangeResourceInitialization";
import { ChangeSimUtil } from "../models/eCare/changeSim/changeSim.util";
import ChangeSimServicePayloadUtil from "./ChangeSimServicePayloadUtil";
import ProductOfferingUtil from "../../utils/ProductOfferingUtil";

export interface ChangeSimServiceSubmitData {
	basketId?: string;
	selectedPaymentMethod: string;
	selectedCustomerPaymentMethod: string | undefined;
	reasonPO: ProductOffering;
	deliveryPO: ProductOffering;
	targetAgreementId: string;
	initializeRequest: ChangeSimActionInitializeRequest;
	changeSimSubscriptionIdCharacteristicName: string;
	changeSimPaymentMethodCharacteristicName: string;
	reasonFeeAmountCharacteristicName: string;
	deliveryContactInfoCharacteristicName: string;
	deliveryIdentificationIdCharacteristicName: string;
	deliveryVerificationMethodCharacteristicName: string;
	deliveryVerificationMethodCharacteristicValue: string;
	basketItemIdToRemove: string;
	userIdentificationId?: string;
	subscriptionId: string;
	deliveryAddress?: {
		postalAddress?: PostalAddress;
		forceCreation?: boolean;
	};
	caseCategoryId: string;
	caseAttachments?: File[]; // attachments for created case. will be provided from UI-component, not from appState
}

export default class ChangeSimService extends BaseService {
	static async submit(data: ChangeSimServiceSubmitData) {
		let resp;
		try {
			const changeSimPoId = data.initializeRequest.poId;
			resp = await Rest.delete(`${REST.BASKETS.BASKET_ITEMS}/${data.basketItemIdToRemove}`);
			ChangeSimService.validateResp(resp);

			resp = await Rest.post(
				`${REST.BASKETS.BASKET_ITEMS}`,
				ChangeSimServicePayloadUtil.getAddBasketItemPayload({
					deliveryPO: {
						id: data.deliveryPO.id,
						inputtedCharacteristics: {
							[data.deliveryVerificationMethodCharacteristicName]:
								data.deliveryVerificationMethodCharacteristicValue,
							[data.deliveryContactInfoCharacteristicName]: data.deliveryAddress!.postalAddress!.id!,
							[data.deliveryIdentificationIdCharacteristicName]: data.userIdentificationId!
						}
					},
					reasonPO: {
						id: data.reasonPO.id,
						inputtedCharacteristics: {
							[data.reasonFeeAmountCharacteristicName]: String(
								ProductOfferingUtil.getSimplePrice(data.reasonPO, PriceTypeEnum.ONE_TIME).taxFreeAmount || 0
							)
						}
					},
					changeSimPO: {
						id: changeSimPoId,
						inputtedCharacteristics: {
							[data.changeSimPaymentMethodCharacteristicName]: data.selectedPaymentMethod,
							[data.changeSimSubscriptionIdCharacteristicName]: data.subscriptionId
						}
					},
					targetAgreementId: data.targetAgreementId,
					basketId: data.basketId!
				})
			);

			resp = await Rest.post(
				`${REST.CHANGE_RESOURCE}`,
				ChangeSimServicePayloadUtil.getChangeResourcePayload({
					selectedPaymentMethod: data.selectedPaymentMethod,
					selectedCustomerPaymentMethod: data.selectedCustomerPaymentMethod,
					basketId: data.basketId!
				})
			);
			ChangeSimService.validateResp(resp);
		} catch (e) {
			throw e;
		}
		return resp.data;
	}
	static validateInitializationResult(changeResourceInitialization: ChangeResourceInitialization): void {
		if (!changeResourceInitialization.attributes.paymentMethods) {
			throw new Error("Invalid data. No payment methods");
		}
		if (!ChangeSimUtil.extractBasketId(changeResourceInitialization)) {
			throw new Error("Invalid data. No basketId");
		}
		if (!ChangeSimUtil.extractBasketItemIdToRemove(changeResourceInitialization)) {
			throw new Error("Invalid data. No basketId");
		}
	}
	static async initialize(
		initializeRequest: ChangeSimActionInitializeRequest
	): Promise<ChangeResourceInitialization> {
		try {
			const resp = await Rest.post(
				`${REST.CHANGE_RESOURCE_INITIALIZATION}?include=basket.basketItems`,
				ChangeSimServicePayloadUtil.getInitializePayload({
					productId: initializeRequest.poId,
					targetAgreementId: initializeRequest.targetAgreementId,
					userId: initializeRequest.user.id
				})
			);
			ChangeSimService.validateResp(resp);
			resp.data.basketItems = resp.included.filter((includedData: any) => includedData.type === "basketItems");
			ChangeSimService.validateInitializationResult(resp.data);
			return resp.data;
		} catch (e) {
			throw e;
		}
	}
}

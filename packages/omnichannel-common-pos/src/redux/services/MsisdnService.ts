"use strict";

import {
	AxiosResponse,
	MsisdnSofReservationResult,
	MsisdnReservation,
	MsisdnReservationCreate,
	ProductPath
} from "../types";
import { Rest } from "./Rest";
import { REST } from "../settings/core";

import { ProductOffering, Basket, BasketItem, ChangeResource, Msisdn } from "../types";
import ErrorContainer, { ErrorType } from "./ErrorContainer";
import BaseService from "./BaseService";

export default class MsisdnService extends BaseService {

	static async searchMsisdn(MSISDN: string): Promise<Msisdn> {
		const response: AxiosResponse<Msisdn> | ErrorContainer = await Rest.get(`${REST.MSISDN}/${MSISDN}`);

		if (response instanceof ErrorContainer) {
			throw new Error(response.errors && response.errors.length > 0 && response.errors[0].code);
		}

		return response.data;
	}

	static async performChangeMsisdn({
		changeMsisdnPo,
		selectionPo,
		personId,
		newMsisdn,
		productId,
		selectedPaymentMethod,
		agreementId
	}: {
		changeMsisdnPo: string;
		selectionPo: ProductOffering;
		personId: string;
		newMsisdn: string;
		productId: string;
		selectedPaymentMethod: string;
		agreementId: string;
	}): Promise<Basket> {
		const basketData = {
			data: {
				type: "baskets",
				relationships: {
					owner: {
						data: {
							id: personId,
							type: "persons"
						}
					}
				}
			}
		};

		const response: AxiosResponse<Basket> | ErrorContainer = await Rest.post(REST.BASKETS.BASKETS, basketData);

		if (response instanceof ErrorContainer) {
			throw new Error(response.errors && response.errors.length > 0 && response.errors[0].code);
		}

		const basketId = response.data.id;

		// Create proper basketItems next...
		const basketItemData = {
			data: {
				type: "basketItems",
				attributes: {
					targetAgreementId: agreementId,
					inputtedCharacteristics: {
						CH_NEW_MSISDN: newMsisdn,
						CH_Inventory_Id: productId
					},
					product: {
						id: changeMsisdnPo
					},
					childBasketItems: [
						{
							product: {
								id: selectionPo.id
							},
							quantity: 1
						}
					],
					quantity: 1
				},
				relationships: {
					basket: {
						data: {
							id: basketId,
							type: response.data.type
						}
					}
				}
			}
		};

		const createBasketItemsResponse: AxiosResponse<BasketItem> | ErrorContainer = await Rest.post(
			REST.BASKETS.BASKET_ITEMS,
			basketItemData
		);

		if (createBasketItemsResponse instanceof ErrorContainer) {
			throw new Error(
				createBasketItemsResponse.errors &&
				createBasketItemsResponse.errors.length > 0 &&
				createBasketItemsResponse.errors[0].code
			);
		}

		const changeResourceData = {
			data: {
				type: "change-resource",
				attributes: {
					paymentMethodId: selectedPaymentMethod
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

		const changeResourceResponse: AxiosResponse<ChangeResource> | ErrorContainer = await Rest.post(
			`${REST.CHANGE_RESOURCES.CHANGE_RESOURCE}?include=basket`,
			changeResourceData
		);

		if (changeResourceResponse instanceof ErrorContainer) {
			throw new Error(
				changeResourceResponse.errors &&
				changeResourceResponse.errors.length > 0 &&
				changeResourceResponse.errors[0].code
			);
		}

		const basket: Basket =
			Array.isArray(changeResourceResponse.included) &&
			changeResourceResponse.included.length &&
			changeResourceResponse.included[0];
		return Promise.resolve(basket);
	}

	static async reserveMsisdns({ createReservation }: { createReservation: MsisdnReservationCreate; }): Promise<MsisdnReservation> {
		const response: AxiosResponse<MsisdnReservation> = await Rest.post(REST.MSISDN_RESERVATIONS, {
			data: {
				type: "msisdn-reservations",
				...createReservation
			}
		});
		MsisdnService.validateResp(response);
		const msisdnReservation: MsisdnReservation = response.data;
		return Promise.resolve(msisdnReservation);
	}

	static async releaseMsisdns(reservedFor: string): Promise<AxiosResponse<any>> {
		const response = await Rest.delete(`${REST.MSISDN_RESERVATIONS}/${reservedFor}`);
		MsisdnService.validateResp(response);
		return response;
	}

	static async makeMsisdnSoftReservation(path: ProductPath, key: string, value: string, id: string): Promise<MsisdnSofReservationResult> {
		const payload = {
			data: {
				type: "msisdn-reservations",
				attributes: {
					msisdn: value,
					reservedFor: id,
					limit: 1
				}
			}
		};

		const response: AxiosResponse<MsisdnReservation> = await Rest.post(REST.MSISDN_RESERVATIONS, payload);
		MsisdnService.validateResp(response);

		return {
			msisdnSoftReservation: {
				...payload.data.attributes,
				status: response.status,
			},
			inputtedCharacteristics: { path, key, value }
		};
	}

	static async updateMsisdnSoftReservation(path: ProductPath, key: string, value: string, id: string): Promise<MsisdnSofReservationResult> {
		const payload = {
			data: {
				type: "msisdn-reservations",
				attributes: {
					msisdn: value,
					reservedFor: id,
					limit: 1
				}
			}
		};

		const response: AxiosResponse<Partial<ErrorType> | object> = await Rest.patchRaw(`${REST.MSISDN_RESERVATIONS}/${id}`, payload);

		return {
			msisdnSoftReservation: {
				...payload.data.attributes,
				status: response.status,
			},
			inputtedCharacteristics: { path, key, value }
		};

	}

	static async getResourcesInventories() {
		let response;
		try {
			response = await Rest.get(`${REST.RESOURCE_INVENTORIES}?include=stocks`);
			MsisdnService.validateResp(response);
		} catch (e) {
			throw e;
		}
		return response;
	}

	static async reserveMsisdn(pattern?: string, reservedFor?: string, stock?: string, limit?: number, numberType?: string, endTime?: Date) {
		const response: AxiosResponse<MsisdnReservation> | ErrorContainer = await Rest.post(REST.MSISDN_RESERVATIONS, {
			data: {
				type: "msisdn-reservations",
				attributes: {
					pattern: pattern,
					stock: stock,
					limit: limit,
					reservedFor: reservedFor,
					numberType: numberType,
					endTime: endTime,
				}
			}
		});

		if (response instanceof ErrorContainer) {
			throw new Error(
				response.errors &&
				response.errors.length > 0 &&
				response.errors[0].code
			);
		}
		MsisdnService.validateResp(response);
		const msisdnReservation: MsisdnReservation = response.data;
		return Promise.resolve(msisdnReservation);
	}

	static async releaseMsisdn(releaseId?: string) {
		const response = await Rest.delete(`${REST.MSISDN_RESERVATIONS}/${releaseId}`);
		MsisdnService.validateResp(response);
		return response;
	}
}

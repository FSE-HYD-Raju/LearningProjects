"use strict";

import { ProductOffering, MsisdnReservation, SimplePrice, ProductOfferingGroup } from "../../types";
import ProductOfferingUtil from "../../../utils/ProductOfferingUtil";
import { MsisdnSelectionUseCase } from "./msisdnSelection.types";
import { get } from "lodash";

const INSTANCE_CHARACTERISTIC_KEY_USE_CASE = "T_FORM_NAME";
const INSTANCE_CHARACTERISTIC_KEY_STOCK_ID = "CH_MSISDN_stock_ID";
const PRICE_TYPE = "ONE_TIME";

export type StockData = {
	poId: string;
	stockId: string;
	price: SimplePrice;
};

function findStockIdsFromPOs({ pos, useCase }: { pos: Array<ProductOffering>; useCase: MsisdnSelectionUseCase }): Array<StockData> {
	const result: Array<StockData> = [];
	if (pos) {
		pos.forEach(po => {
			const value: string | undefined = ProductOfferingUtil.getInstanceCharacteristicValueFromProductOffering(
				po,
				INSTANCE_CHARACTERISTIC_KEY_USE_CASE
			);
			if (value && value === useCase) {
				const value: string | undefined = ProductOfferingUtil.getInstanceCharacteristicValueFromProductOffering(
					po,
					INSTANCE_CHARACTERISTIC_KEY_STOCK_ID
				);
				if (value) {
					const price = ProductOfferingUtil.getPrice(po, PRICE_TYPE);
					result.push({ stockId: value, price, poId: po.id });
				}
			}
		});
	}
	return result;
}

function findStockIdsFromSinglePO({ po, useCase }: { po: ProductOffering; useCase: MsisdnSelectionUseCase}): StockData | undefined {
		const value: string | undefined = po && ProductOfferingUtil.getInstanceCharacteristicValueFromProductOffering(
			po,
			INSTANCE_CHARACTERISTIC_KEY_USE_CASE
		);
		const instanceCharacteristic: string | undefined | false = value && value === useCase &&
			ProductOfferingUtil.getInstanceCharacteristicValueFromProductOffering(
				po,
				INSTANCE_CHARACTERISTIC_KEY_STOCK_ID
			);
		if (instanceCharacteristic) {
			const price = ProductOfferingUtil.getPrice(po, PRICE_TYPE);
			return { stockId: instanceCharacteristic, price, poId: po.id };
		} else {
			return undefined;
		}
}

function findReservationsByMsisdn({
	reservations,
	msisdn,
	isIncluded
}: {
		reservations: Array<MsisdnReservation>;
		msisdn: string;
		isIncluded: boolean;
	}): Array<MsisdnReservation> {
	return reservations.filter(r => {
		const msisdns = get(r, "attributes.msisdns");
		if (isIncluded) {
			return msisdns && msisdns.includes(msisdn);
		} else {
			return msisdns && !msisdns.includes(msisdn);
		}
	});
}

function findMsisdnGroupFromProductOffering(productOffering: ProductOffering): ProductOfferingGroup | undefined {
	if (!productOffering) {
		return undefined;
	}

	const productOfferingGroups = ProductOfferingUtil.getProductOfferingGroups(productOffering);

	return productOfferingGroups.find(
		singleGroup => {
			const productOfferings = singleGroup.productOfferings;
			return Array.isArray(productOfferings) ? !!productOfferings.find(
				singlePo => !!ProductOfferingUtil.getInstanceCharacteristicValueFromProductOffering(
					singlePo,
					INSTANCE_CHARACTERISTIC_KEY_STOCK_ID
				)
			) : false;
		}
	);
}

export {
	findStockIdsFromPOs,
	findReservationsByMsisdn,
	findStockIdsFromSinglePO,
	findMsisdnGroupFromProductOffering,
	INSTANCE_CHARACTERISTIC_KEY_STOCK_ID,
	INSTANCE_CHARACTERISTIC_KEY_USE_CASE
};

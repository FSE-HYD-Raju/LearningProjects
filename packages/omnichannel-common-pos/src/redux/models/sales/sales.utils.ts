"use strict";

import { get } from "lodash";
import { ConsulValues, ProductOffering } from "../../types";
import ProductOfferingUtil from "../../../utils/ProductOfferingUtil";

const ADDON_STATUS_KEY = "addon-status";
const ACTIVE_STATUS = "active";
const AVAILABLE_STATUS = "available";

function extractValues(payload: ConsulValues) {
	const addonsCategoryIds = get(payload, "eligibility-categories/addons_category_ids");

	return {
		addonsCategoryIds: (addonsCategoryIds && JSON.parse(addonsCategoryIds))  || [],
		phonesCategoryId: get(payload, "eligibility-categories/phones_category_id"),
		plansCategoryId: get(payload, "eligibility-categories/plans_category_id"),
		showAgreementSelection: get(payload, "features/eshop/display_agreement_selection") === "true"
	};
}

function splitAddonsByType(addons: Array<ProductOffering>): { activeAddons: Array<ProductOffering>; availableAddons: Array<ProductOffering> } {
	const activeAddons: Array<ProductOffering> = [];
	const availableAddons: Array<ProductOffering> = [];

	addons.forEach((addon: ProductOffering) => {
		const characteristics = ProductOfferingUtil.getInstanceCharacteristics(addon);
		const addonStatus = characteristics[ADDON_STATUS_KEY] && characteristics[ADDON_STATUS_KEY].values
			? characteristics[ADDON_STATUS_KEY].values[0].value : undefined;
		if (addonStatus) {
			if (addonStatus.includes(AVAILABLE_STATUS)) {
				availableAddons.push(addon);
			} else if (addonStatus.includes(ACTIVE_STATUS)) {
				activeAddons.push(addon);
			}
		}
	});

	return { activeAddons, availableAddons };
}

export {
	extractValues,
	splitAddonsByType
};

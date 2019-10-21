import {
	CommercialEnrichmentNameEnum,
	Configurations,
	InitializedAddon,
	ProductOffering, ProductOfferingsConfigObject
} from "../../../../redux/types";
import BasketUtil from "../../../../utils/BasketUtil";
import ProductOfferingUtil from "../../../../utils/ProductOfferingUtil";

class AddonActivationUtils {
	static calculateAddonTotalFees = (addon: InitializedAddon | undefined): number => {
		return ((addon && addon.basketItems) || [])
			.map(BasketUtil.getBasketItemUpfrontPrice)
			.map(price => (price && price.taxIncludedAmount) || 0)
			.reduce((cost, totalCost) => totalCost + cost, 0);
	};

	static updateConfigurationForAddon = (addon: ProductOffering, configurations: Configurations): ProductOffering => {
		if (configurations) {
			const po: ProductOfferingsConfigObject | undefined = configurations[addon.id];
			const inputtedCharacteristics: Record<string, string> | undefined = po ? po.inputtedCharacteristics : undefined;
			if (inputtedCharacteristics) {
				addon.attributes!.inputtedCharacteristics = inputtedCharacteristics;
			}
		}
		return addon;
	};

	static getDescription = (addon: ProductOffering): string | undefined => {
		return ProductOfferingUtil.getCommercialEnrichmentValueFromPO(addon, CommercialEnrichmentNameEnum.descriptions, "short-description");
	};
}

export default AddonActivationUtils;

import ProductUtil from "../../../../utils/product/ProductUtil";
import ProductOfferingUtil from "../../../../utils/ProductOfferingUtil";
import { ProductOffering, ProductOfferingGroup, MsisdnConfiguration } from "../../../../redux/types";
import { MsisdnConfig } from "../../../../redux";

class MsisdnConfigurationUtils {

	static findMandatoryConfiguration(msisdnConfig: MsisdnConfig, productId: string): MsisdnConfiguration | undefined {
		return (
			msisdnConfig &&
			msisdnConfig.mandatoryConfigurations &&
			msisdnConfig.mandatoryConfigurations.find(
				cfg => cfg.product === productId
			)
		);
	}

	static isMsisdnNeedToBeConfigured(msisdnConfig?: MsisdnConfig): boolean {
		if (!msisdnConfig) {
			return false;
		}
		return Boolean(
			typeof msisdnConfig === "object" &&
			((msisdnConfig.mandatoryConfigurations &&
				msisdnConfig.mandatoryConfigurations.some(
					mc => !mc.msisdn
				)))
		);
	}

	static productNeedsMsisdnConfiguration(product: ProductOffering | undefined,
											 posThatRequireMsisdnConfiguration: Array<MsisdnConfiguration>) {
		if (product) {
			// If resourceSelectionRule instanceCharacteristic and number inputCharacteristic is found on product,
			// MSISDN configuration is possibly needed.
			if (ProductOfferingUtil.isNumberRequired(product)) {
				posThatRequireMsisdnConfiguration.push({
					product: product.id,
					msisdn: ProductUtil.getPhoneNumberDeep(product)
				});
			}

			const productOfferingGroups: Array<ProductOfferingGroup> = ProductOfferingUtil.getProductOfferingGroups(product);
			const productOfferings: Array<ProductOffering> = ProductOfferingUtil.getProductOfferings(product);

			if (productOfferingGroups.length > 0) {
				productOfferingGroups.forEach(
					(pog: ProductOfferingGroup) => MsisdnConfigurationUtils.productGroupNeedsMsisdnConfiguration(pog, posThatRequireMsisdnConfiguration)
				);
			}

			if (productOfferings.length > 0) {
				productOfferings.forEach(
					(po: ProductOffering) => MsisdnConfigurationUtils.productNeedsMsisdnConfiguration(po, posThatRequireMsisdnConfiguration));
			}
		}
	}

	static productGroupNeedsMsisdnConfiguration (product: ProductOfferingGroup | undefined,
												   posThatRequireMsisdnConfiguration: Array<MsisdnConfiguration>) {
		if (product) {
			const productOfferings: Array<ProductOffering> = ProductOfferingUtil.getProductOfferings(product);

			if (productOfferings.length > 0) {
				if (product.msisdnGroup) {
					productOfferings.forEach(
						(po: ProductOffering) => {
							if (po.selected) {
								MsisdnConfigurationUtils.productNeedsMsisdnConfiguration(po, posThatRequireMsisdnConfiguration);
							}
						}
					);
				}

				productOfferings.forEach(
					(po: ProductOffering) => MsisdnConfigurationUtils.productNeedsMsisdnConfiguration(po, posThatRequireMsisdnConfiguration));
			}
		}
	}
}

export default MsisdnConfigurationUtils;

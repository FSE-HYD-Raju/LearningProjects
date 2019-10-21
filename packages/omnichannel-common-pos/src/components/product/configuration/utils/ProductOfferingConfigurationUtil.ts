import { ProductOffering } from "../../../../redux";
import { Characteristic } from "../../../../redux/types";

class ProductOfferingConfigurationUtil {
	static isProductForRenderByCharacteristics(product: ProductOffering): boolean {
		return (ProductOfferingConfigurationUtil.getCharacteristicValueSafe(
			ProductOfferingConfigurationUtil.getInstanceCharacteristicsSafe(product).T_FORM_NAME)
			!== "MNP");
	}

	static getInstanceCharacteristicsSafe(product: ProductOffering): Record<string, Characteristic> {
		const instanceCharacteristics = (product.attributes && product.attributes.instanceCharacteristics)
			|| product.instanceCharacteristics;
		return typeof instanceCharacteristics === "object" ? instanceCharacteristics : {};
	}

	static getCharacteristicValueSafe(characteristic?: Characteristic, defaultValue: string = ""): string {
		return ((characteristic && characteristic.values && characteristic.values.length === 1 && characteristic.values[0].value)
			|| defaultValue
		);
	}
}

export default ProductOfferingConfigurationUtil;

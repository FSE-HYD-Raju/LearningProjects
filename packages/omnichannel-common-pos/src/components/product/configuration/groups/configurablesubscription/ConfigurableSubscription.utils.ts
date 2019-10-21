import {
	FluxWithActions,
	ProductOffering,
	ProductOfferingGroup,
	ProductOfferingsConfigObject,
	ProductPath
} from "../../../../../redux";
import { SliderConfigurationSingleGroupProps } from "../../sliderConfiguration/SliderConfigurationGroup";
import SliderMessages from "../../sliderConfiguration/slider.messages";
import getSliderIconClassNames from "../../sliderConfiguration/sliderIcons";
import SliderUnitMessages from "../../sliderConfiguration/SliderUnits.messages";
import ProductOfferingUtil from "../../../../../utils/ProductOfferingUtil";
import ProductOfferingConfigurationUtil from "../../utils/ProductOfferingConfigurationUtil";
import actions from "../../../../../redux/actions";

const CONFIGURABLE_SUBSCRIPTION_TYPE = "configurablesubscription";

class ConfigurableSubscriptionUtils {

	static isDefaultAllowance(product: ProductOffering): boolean {
		const defaultPO = product.instanceCharacteristics && product.instanceCharacteristics.CH_Default_PO;
		return ProductOfferingConfigurationUtil.getCharacteristicValueSafe(defaultPO) === "true";
	}

	static getValues(pog: ProductOfferingGroup): number[] {
		let values: number[] = pog.productOfferings.map(ConfigurableSubscriptionUtils.getAllowanceValue)
			.filter(value => value !== null && value !== undefined) as number[];
		values = values.sort((a: number, b: number) => a - b);
		if (values && values[0] === -1) {
			values = values.slice(1);
			values.push(-1);
		}
		return values;
	}

	static getSelectedValue(pog: ProductOfferingGroup, selectedProductId?: string): number | undefined {
		const productOfferings = ProductOfferingUtil.getProductOfferingsSafe(pog);

		const defaultAllowanceProduct = selectedProductId
			? productOfferings.find(po => po.id === selectedProductId)
			: productOfferings.find(ConfigurableSubscriptionUtils.isDefaultAllowance);
		if (!defaultAllowanceProduct) {
			return undefined;
		}
		const allowanceValue = ConfigurableSubscriptionUtils.getAllowanceValue(defaultAllowanceProduct);
		return !allowanceValue ? undefined : allowanceValue;
	}

	static getAllowanceSliderConfiguration(pog: ProductOfferingGroup, selectedProductId?: string): SliderConfigurationSingleGroupProps | undefined {
		const allowanceType = ConfigurableSubscriptionUtils.getAllowanceType(pog);
		const values = ConfigurableSubscriptionUtils.getValues(pog);
		if (values.length === 0) {
			return undefined;
		}
		return {
			values: values,
			selectedValue: ConfigurableSubscriptionUtils.getSelectedValue(pog, selectedProductId),
			// @ts-ignore
			unit: SliderUnitMessages[allowanceType],
			iconClassNames: getSliderIconClassNames(allowanceType),
			// @ts-ignore
			message: SliderMessages[allowanceType]
		};
	}

	static getAllowanceProductOfferingGroups(product: ProductOffering): ProductOfferingGroup[] {
		return ProductOfferingUtil.getProductOfferingGroupsSafe(product).filter(ConfigurableSubscriptionUtils.isAllowanceProductOfferingGroupForSlider);
	}

	static getAllowanceType(pog: ProductOfferingGroup): string {
		if (pog.productOfferings && pog.productOfferings.length > 0) {
			const productWithCharacteristic = pog.productOfferings.find(
				(product: ProductOffering) => {
					const NOT_FOUND_VALUE = "__NOT_FOUND";
					const characteristicValue = ProductOfferingConfigurationUtil.getCharacteristicValueSafe(
						ProductOfferingConfigurationUtil.getInstanceCharacteristicsSafe(product).CH_Slider_Requested,
						NOT_FOUND_VALUE
					);
					return characteristicValue !== NOT_FOUND_VALUE;
				}
			);
			if (productWithCharacteristic) {
				return ProductOfferingConfigurationUtil.getCharacteristicValueSafe(
					ProductOfferingConfigurationUtil.getInstanceCharacteristicsSafe(productWithCharacteristic).CH_Slider_Requested);
			}
		}

		return "";
	}

	static getAllowanceValue(product: ProductOffering): number | undefined {
		const allowanceValue = parseInt(ProductOfferingConfigurationUtil.getCharacteristicValueSafe(
			ProductOfferingConfigurationUtil.getInstanceCharacteristicsSafe(product).CH_Allowance), 10);
		return Number.isInteger(allowanceValue) ? allowanceValue : undefined;
	}

	static getProductOfferingByAllowanceValue(allowanceValue: number, productOfferings: ProductOffering[]): ProductOffering | undefined {
		return productOfferings.find(po => ConfigurableSubscriptionUtils.getAllowanceValue(po) === allowanceValue);
	}

	static getProductOfferingGroupByAllowanceType(allowanceType: string, groups: ProductOfferingGroup[]): ProductOfferingGroup | undefined {
		return groups.find(pog => ConfigurableSubscriptionUtils.getAllowanceType(pog) === allowanceType);
	}

	static getSelectedAllowanceProductId(groupId: string, configuration?: ProductOfferingsConfigObject): string | undefined {
		if (!configuration) {
			return undefined;
		}
		const group = (configuration.productOfferingGroups || []).find(pog => pog.id === groupId);
		if (!group) {
			return undefined;
		}
		const selectedProduct = (group.productOfferings as Array<ProductOfferingsConfigObject> || []).find(po => po.selected === true);
		if (!selectedProduct) {
			return undefined;
		}
		return selectedProduct.id;
	}

	static isConfigurableSubscriptionProductOffering(product: ProductOffering): boolean {
		const bundleTypeCharacteristic = ProductOfferingConfigurationUtil.getInstanceCharacteristicsSafe(product)
			.CH_Bundle_Type;

		return (
			ProductOfferingConfigurationUtil.getCharacteristicValueSafe(bundleTypeCharacteristic) ===
			CONFIGURABLE_SUBSCRIPTION_TYPE
		);
	}

	static handleSelectAllowance(flux: FluxWithActions, product: ProductOffering, path: ProductPath) {
		return (allowanceType: string, allowanceValue: number) => {
			const productByPath = ProductOfferingUtil.getProductOfferingByPath(product, path);
			if (!productByPath) {
				return;
			}
			const productOfferingGroups = ProductOfferingUtil.getProductOfferingGroupsSafe(
				productByPath
			);
			const pog = ConfigurableSubscriptionUtils.getProductOfferingGroupByAllowanceType(allowanceType, productOfferingGroups);
			if (!pog) {
				return;
			}
			const productOfferings = ProductOfferingUtil.getProductOfferingsSafe(pog);
			const selectedProduct = ConfigurableSubscriptionUtils.getProductOfferingByAllowanceValue(
				allowanceValue,
				productOfferings
			);
			if (!selectedProduct) {
				return;
			}
			flux.reduxStore.dispatch(actions.productOfferingConfiguration.selectProductOffering(
				path.concat({ pog: pog.id }),
				selectedProduct.id,
				productOfferings));
		};
	}

	static getSliderConfiguration(product: ProductOffering, productConfiguration?: ProductOfferingsConfigObject): Record<string, SliderConfigurationSingleGroupProps> {
		const allowanceProductOfferingGroups = ConfigurableSubscriptionUtils.getAllowanceProductOfferingGroups(product);
		const configuration: Record<string, SliderConfigurationSingleGroupProps> = {};
		allowanceProductOfferingGroups.forEach(pog => {
			const allowanceConfiguration = ConfigurableSubscriptionUtils.getAllowanceSliderConfiguration(
				pog,
				ConfigurableSubscriptionUtils.getSelectedAllowanceProductId(pog.id, productConfiguration)
			);
			if (!allowanceConfiguration) {
				return;
			}
			configuration[ConfigurableSubscriptionUtils.getAllowanceType(pog)] = allowanceConfiguration;
		});
		return configuration;
	}

	static isAllowanceProductOfferingGroupForSlider(pog: ProductOfferingGroup): boolean {
		return Boolean(
			(pog.productOfferings || []).find(product => {
				const NOT_FOUND_VALUE = "__NOT_FOUND";
				const characteristicValue = ProductOfferingConfigurationUtil.getCharacteristicValueSafe(
					ProductOfferingConfigurationUtil.getInstanceCharacteristicsSafe(product).CH_Slider_Requested,
					NOT_FOUND_VALUE
				);
				return characteristicValue !== NOT_FOUND_VALUE;
			})
		);
	}
}

export default ConfigurableSubscriptionUtils;

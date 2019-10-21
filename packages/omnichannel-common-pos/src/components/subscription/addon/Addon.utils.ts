import ProductOfferingUtil from "../../../utils/ProductOfferingUtil";
import { Characteristic, Person, Product, ProductOffering } from "../../../redux/types";
import { AppState } from "../../../redux/reducers";

class AddonUtils {

	static isConfigurationRequired = (addon: ProductOffering): boolean => {
		if (!ProductOfferingUtil.isConfigurable(addon)) {
			return false;
		}

		// if all input characteristics are hidden, treat addon as non configurable
		const inputCharacteristics = ProductOfferingUtil.getInputCharacteristics(addon);
		const allCharacteristicsHidden = Object.keys(inputCharacteristics).every((key: string): boolean => {
			return !!inputCharacteristics[key].hidden;
		});
		return !allCharacteristicsHidden;
	};

	static hasParentIdCharacteristic = (addon: ProductOffering): boolean => {
		return !!ProductOfferingUtil.getInputCharacteristics(addon).CH_Parent_ID;
	};

	static ensureParentIdProvided = (product: ProductOffering, parentProductId: string): Record<string, string> => {
		const inputtedCharacteristics: Record<string, string> = {...ProductOfferingUtil.getInputtedCharacteristics(product)};

		// put parentId to special field "CH_Parent_ID" of inputted characteristics
		// this is required for BSS API to establish connection between actual product and addon
		if (!AddonUtils.isConfigurationRequired(product) && AddonUtils.hasParentIdCharacteristic(product)) {
			inputtedCharacteristics.CH_Parent_ID = parentProductId;
		}

		return inputtedCharacteristics;
	}

	static getFaFInputCharacteristics = (product: ProductOffering | undefined): Characteristic | undefined => {
		if (!product) {
			return undefined;
		}
		const inputCharacteristics = product ? ProductOfferingUtil.getInputCharacteristics(product) : {};
		const fafInputCharacteristicKey = Object.keys(inputCharacteristics).find(key => {
			const singleInputcharacteristic = inputCharacteristics[key];
			return singleInputcharacteristic.humanReadableId === "FaFList";
		});
		return fafInputCharacteristicKey ? inputCharacteristics[fafInputCharacteristicKey] : undefined;
	}

	static getIndividualId = (state: AppState, forCustomer?: boolean): string | undefined => {
		let user: Person | undefined;
		if (forCustomer && state.customerCase.activeCustomerCase && state.customerCase.activeCustomerCase.attributes) {
			user = state.customerCase.activeCustomerCase.attributes.activeCustomer;
		} else if (!forCustomer) {
			user = state.user.user;
		}
		if (user) {
			return user.individualId || user.id;
		}
		return undefined;
	}
}

export { AddonUtils };

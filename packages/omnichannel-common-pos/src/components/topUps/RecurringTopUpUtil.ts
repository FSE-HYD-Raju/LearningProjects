import { isEmpty } from "lodash";
import {
	ProductOffering,
	RecurringTopUpProductType,
	RecurringTopUpModelType,
	RecurringTopUpType,
	RecurringTopUpCharacteristicsValue,
} from "../../redux/types";
import { AppState } from "../../redux/reducers";
import ProductOfferingUtil from "../../utils/ProductOfferingUtil";
import TraceUtil from "../../utils/TraceUtil";
import { TFORM_NAME_TO_RECURRING_TOP_UP_TYPE_MAP_CONSUL_KEY } from "../../redux/models/feature/eCare/ECareFeatureParser";

class RecurringTopUpUtil {
	static isValidThresholdTopUpModel(model: RecurringTopUpModelType): boolean {
		return (
			Boolean(model.topUpAmount && model.topUpAmount > 0) &&
			Boolean(model.limitInMonth && model.limitInMonth > 0) &&
			Boolean(model.thresholdValue && model.thresholdValue > 0)
		);
	}
	static isValidWeeklyTopUpModel(model: RecurringTopUpModelType): boolean {
		return Boolean(model.topUpAmountWeekly && model.topUpAmountWeekly > 0);
	}
	static isValidMonthlyTopUpModel(model: RecurringTopUpModelType): boolean {
		return Boolean(model.topUpAmountMonthly && model.topUpAmountMonthly > 0);
	}
	static isValidTopUpModel(model: RecurringTopUpModelType): boolean {
		const { recurringTopUp, paymentMethod, subscription } = model;
		if (recurringTopUp === RecurringTopUpType.REMOVE) {
			return true;
		}
		if (!paymentMethod || !subscription) {
			return false;
		}
		switch (recurringTopUp) {
			case RecurringTopUpType.THRESHOLD:
				return RecurringTopUpUtil.isValidThresholdTopUpModel(model);
			case RecurringTopUpType.WEEKLY:
				return RecurringTopUpUtil.isValidWeeklyTopUpModel(model);
			case RecurringTopUpType.MONTHLY:
				return RecurringTopUpUtil.isValidMonthlyTopUpModel(model);
			default:
				return false;
		}
	}
	static getModelForEdit(characteristic: RecurringTopUpProductType): RecurringTopUpModelType {
		const { characteristicsValue, subscription, productOfferingId, productId } = characteristic;
		const { type, interval, thresholdValue, amount, monthlyLimit, customerPaymentMethod } = characteristicsValue;
		const baseModel = {
			subscription,
			productOfferingId,
			productId,
			paymentMethod: customerPaymentMethod,
		};
		switch (type) {
			case "Threshold":
				return {
					...baseModel,
					recurringTopUp: RecurringTopUpType.THRESHOLD,
					thresholdValue: Number(thresholdValue),
					topUpAmount: Number(amount),
					limitInMonth: Number(monthlyLimit),
				};
			case "Time":
				if (interval === "week") {
					return {
						...baseModel,
						recurringTopUp: RecurringTopUpType.WEEKLY,
						topUpAmountWeekly: Number(amount),
					};
				} else if (interval === "month") {
					return {
						...baseModel,
						recurringTopUp: RecurringTopUpType.MONTHLY,
						topUpAmountMonthly: Number(amount),
					};
				}
		}
		return baseModel;
	}

	// introduce enum for  [typeCharacteristicName]: Threshold/Time... It should be catalog driven
	static getRecurringTopUpInputtedCharacteristics(
		model: RecurringTopUpModelType,
		characteristicAliases: RecurringTopUpCharacteristicsValue
	): Record<string, string> | undefined {
		const amountCharacteristicName: string | undefined = characteristicAliases.amount;
		const thresholdValueCharacteristicName: string | undefined = characteristicAliases.thresholdValue;
		const monthlyLimitCharacteristicName: string | undefined = characteristicAliases.monthlyLimit;
		const customerPaymentMethodCharacteristicName: string | undefined = characteristicAliases.customerPaymentMethod;

		switch (model.recurringTopUp) {
			case RecurringTopUpType.THRESHOLD:
				if (
					!amountCharacteristicName ||
					!thresholdValueCharacteristicName ||
					!monthlyLimitCharacteristicName ||
					!customerPaymentMethodCharacteristicName
				) {
					return undefined;
				}
				return {
					[thresholdValueCharacteristicName]: "" + model.thresholdValue,
					[amountCharacteristicName]: "" + model.topUpAmount,
					[monthlyLimitCharacteristicName]: "" + model.limitInMonth,
					[customerPaymentMethodCharacteristicName]: model.paymentMethod!,
				};
			case RecurringTopUpType.WEEKLY:
				if (!amountCharacteristicName || !customerPaymentMethodCharacteristicName) {
					return undefined;
				}
				return {
					[amountCharacteristicName]: "" + model.topUpAmountWeekly,
					[customerPaymentMethodCharacteristicName]: model.paymentMethod!,
				};
			case RecurringTopUpType.MONTHLY:
				if (!amountCharacteristicName || !customerPaymentMethodCharacteristicName) {
					return undefined;
				}
				return {
					[amountCharacteristicName]: "" + model.topUpAmountMonthly,
					[customerPaymentMethodCharacteristicName]: model.paymentMethod!,
				};
			case RecurringTopUpType.SMART:
				if (!customerPaymentMethodCharacteristicName) {
					return undefined;
				}
				return {
					[customerPaymentMethodCharacteristicName]: model.paymentMethod!,
				};
			default:
				return undefined;
		}
	}
	static getRecurringTopUpTypeFromProductOffering(po: ProductOffering, TFormToTypeMap: Record<string, RecurringTopUpType>): RecurringTopUpType | undefined {
		const TFormValue = ProductOfferingUtil.getInstanceCharacteristicValueFromProductOffering(po, "T_FORM_NAME");
		return TFormValue ? TFormToTypeMap[TFormValue] : undefined;
	}
	static getRecurringTopUpTypesFromProductOfferings(
		recurringTopUpProducts: ProductOffering[],
		TFormToTypeMap: Record<string, RecurringTopUpType>
	): RecurringTopUpType[] {
		return recurringTopUpProducts
			.map(recurringTopUpProduct => RecurringTopUpUtil.getRecurringTopUpTypeFromProductOffering(recurringTopUpProduct, TFormToTypeMap))
			.filter(Boolean) as RecurringTopUpType[];
	}

	static getNewRecurringTopUpTypesByAgreementsIds(state: AppState): Record<string, RecurringTopUpType[]> {
		const { TFormNameToRecurringTopUpTypeMap } = state.feature.eCare.recurringTopUp;
		if (isEmpty(TFormNameToRecurringTopUpTypeMap)) {
			TraceUtil.logOnce(`Missing config ${TFORM_NAME_TO_RECURRING_TOP_UP_TYPE_MAP_CONSUL_KEY}`);
			return {};
		}
		const recurringTopUpTypesByAgreementsIds: Record<string, RecurringTopUpType[]> = {};
		const { newTopUpProductOfferingsByAgreement } = state.recurringTopUp;
		const agreementIds = Object.keys(newTopUpProductOfferingsByAgreement);

		agreementIds.forEach((agreementId: string) => {
			const recurringTopUpProducts = newTopUpProductOfferingsByAgreement[agreementId] || [];
			recurringTopUpTypesByAgreementsIds[agreementId] = RecurringTopUpUtil.getRecurringTopUpTypesFromProductOfferings(
				recurringTopUpProducts,
				TFormNameToRecurringTopUpTypeMap
			);
		});
		return recurringTopUpTypesByAgreementsIds;
	}

	static getRecurringTopUpValues(state: AppState, edit: boolean, topUpType: string, defaultValues: number[] | undefined) {
		const { newTopUpProductOfferingsByAgreement } = state.recurringTopUp;
		const agreementId = Object.keys(newTopUpProductOfferingsByAgreement)[0];
		const productOfferings =  newTopUpProductOfferingsByAgreement[agreementId];

		if (!productOfferings) {
			return defaultValues;
		}

		let topUpValues = defaultValues || [];
		let [productOffering] = productOfferings;
		let topUpValue;

		if (edit && state.productOfferings) {
			const pos = state.productOfferings.productOfferings;
			if (pos) {
				const productOfferingId = Object.keys(pos)[0];
				productOffering = pos[productOfferingId];
				if (productOffering && productOffering.attributes) {
					topUpValue = ProductOfferingUtil.getInputCharacteristics(productOffering)[topUpType];
				}
			}
		} else {
			topUpValue = ProductOfferingUtil.getInputCharacteristics(productOffering)[topUpType];
		}
		if (topUpValue && topUpValue.values) {
			topUpValues = topUpValue.values.map(characteristicValue => parseInt(characteristicValue.value, 10));
		}
		return topUpValues.sort((n1, n2) => n1 - n2);
	}

	static getThresholdValues(state: AppState, edit: boolean) {
		return RecurringTopUpUtil.getRecurringTopUpValues(state, edit, "CH_Threshold_Value", state.feature.ecareThresholdValues);
	}

	static getThresholdTopUpValues(state: AppState, edit: boolean) {
		return RecurringTopUpUtil.getRecurringTopUpValues(state, edit, "CH_TopUp_Amount", state.feature.ecareThresholdTopUpValues);
	}

	static getThresholdLimitInMonthValues(state: AppState, edit: boolean) {
		return RecurringTopUpUtil.getRecurringTopUpValues(state, edit, "CH_Monthly_TopUp_Limit", state.feature.limitInMonthValues);
	}

	static getMonthlyTopUpValues(state: AppState, edit: boolean) {
		return RecurringTopUpUtil.getRecurringTopUpValues(state, edit, "CH_TopUp_Amount", state.feature.ecareMonthlyTopUpValues);
	}

	static getWeeklyTopUpValues(state: AppState, edit: boolean) {
		return RecurringTopUpUtil.getRecurringTopUpValues(state, edit, "CH_TopUp_Amount", state.feature.ecareWeeklyTopUpValues);
	}

}
export { RecurringTopUpUtil };

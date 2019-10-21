import ProductUtil from "../../../../utils/product/ProductUtil";
import { RecurringTopUpUtil } from "../../../../components/topUps/RecurringTopUpUtil";
import { InitializeAddonConfig } from "../../../services/AddonService";
import { ProductOffering, ProductsReplaceType, RecurringTopUpModelType } from "../../../types";
import { ProductReplaceInitializeRequest } from "../../../services";
import { AppState } from "../../../reducers";

class RecurringTopUpSelector {
	static getProductReplaceInitializeRequest(state: AppState, model: RecurringTopUpModelType): ProductReplaceInitializeRequest | undefined {
		if (!model.subscription) {
			console.error("phone number not selected", model);
			return;
		}
		const agreement = ProductUtil.getPhoneNumbersToAgreementsMap(state.digitalLife.agreements)[model.subscription];
		if (!agreement) {
			console.error(`agreement not found by phone number ${model.subscription}`, model);
			return;
		}
		const subscription = ProductUtil.getSubscriptionFromAgreement(agreement, state.digitalLife.subscriptionPlanConfiguration);
		if (!subscription) {
			console.error(`subscription product not found in agreement id: ${agreement.id}`, model);
			return;
		}
		const topUpProductOfferings = state.recurringTopUp.newTopUpProductOfferingsByAgreement[agreement.id] || [];
		const { TFormNameToRecurringTopUpTypeMap } = state.feature.eCare.recurringTopUp;

		let selectedTopUpProductOfferingId = model.productOfferingId;
		const selectedTopUpProductOffering = topUpProductOfferings.find(
			po => RecurringTopUpUtil.getRecurringTopUpTypeFromProductOffering(po, TFormNameToRecurringTopUpTypeMap) === model.recurringTopUp
		);
		if (selectedTopUpProductOffering) {
			selectedTopUpProductOfferingId = selectedTopUpProductOffering.id;
		}

		const userId = state.user.user && state.user.user.id;
		if (!userId) {
			console.error("current use is not set");
			return;
		}
		const { recurringTopUpsAliases } = state.feature;
		const inputtedCharacteristics = recurringTopUpsAliases && RecurringTopUpUtil.getRecurringTopUpInputtedCharacteristics(model, recurringTopUpsAliases);
		if (!inputtedCharacteristics) {
			console.error("cannot set inputted characteristics, check configuration", model, recurringTopUpsAliases);
			return;
		}
		inputtedCharacteristics.CH_Parent_ID = subscription.id;
		return {
			individualId: userId,
			agreementId: agreement.id,
			productId: model.productId!,
			productOfferingId: selectedTopUpProductOfferingId!,
			replaceType: ProductsReplaceType.UPDATE,
			inputtedCharacteristics,
		};
	}
	static getAddRecurringTopUpRequest(state: AppState, model: RecurringTopUpModelType): InitializeAddonConfig | undefined {
		if (!model.subscription) {
			console.error("getAddRecurringTopUpRequest subscription is not set", model);
			return;
		}
		const agreement = ProductUtil.getPhoneNumbersToAgreementsMap(state.digitalLife.agreements)[model.subscription];
		if (!agreement) {
			console.error("getAddRecurringTopUpRequest agreement is not found by subscription", model);
			return;
		}
		const subscription = ProductUtil.getSubscriptionFromAgreement(agreement, state.digitalLife.subscriptionPlanConfiguration);
		if (!subscription) {
			console.error(
				"getAddRecurringTopUpRequest subscription product is not found by agreement",
				agreement,
				state.digitalLife.subscriptionPlanConfiguration
			);
			return;
		}
		const topUpProductOfferings: ProductOffering[] = state.recurringTopUp.newTopUpProductOfferingsByAgreement[agreement.id] || [];
		const { TFormNameToRecurringTopUpTypeMap } = state.feature.eCare.recurringTopUp;

		const selectedTopUpProductOffering: ProductOffering | undefined = topUpProductOfferings.find(
			po => RecurringTopUpUtil.getRecurringTopUpTypeFromProductOffering(po, TFormNameToRecurringTopUpTypeMap) === model.recurringTopUp
		);
		const selectedTopUpProductOfferingId = (selectedTopUpProductOffering && selectedTopUpProductOffering.id) || model.productOfferingId;
		if (!selectedTopUpProductOfferingId) {
			console.error(
				"getAddRecurringTopUpRequest selectedTopUpProductOffering is not found",
				topUpProductOfferings,
				model.recurringTopUp,
				TFormNameToRecurringTopUpTypeMap,
				model
			);
			return;
		}
		const userId = state.user.user && state.user.user.id;
		if (!userId) {
			console.error("getAddRecurringTopUpRequest active user is not set");
			return;
		}
		const { recurringTopUpsAliases } = state.feature;
		const inputtedCharacteristics = recurringTopUpsAliases && RecurringTopUpUtil.getRecurringTopUpInputtedCharacteristics(model, recurringTopUpsAliases);
		if (!inputtedCharacteristics) {
			console.error("cannot set inputted characteristics, check configuration", model, recurringTopUpsAliases);
			return;
		}
		inputtedCharacteristics.CH_Parent_ID = subscription.id;
		return {
			personId: userId,
			targetAgreementId: agreement.id,
			productId: selectedTopUpProductOfferingId,
			inputtedCharacteristics,
		};
	}
}
export { RecurringTopUpSelector };

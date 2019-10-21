import { AppState } from "../../../reducers/index";
import { SimplePrice } from "../../../types/SimplePrice";
import PriceUtil from "../../../../utils/PriceUtil";
import BasketUtil from "../../../../utils/BasketUtil";
import { Price } from "../../../types/Price";
import { ProductOffering } from "../../../types/ProductOffering";
import ArrayUtil from "../../../../utils/ArrayUtil";
import { ChargingBalances } from "../../../types/ChargingBalances";
import PaymentUtil from "../../../../utils/PaymentUtil";
import { ContextualPaymentMethod } from "../../../types/payment/ContextualPaymentMethod";
import ProductOfferingUtil from "../../../../utils/ProductOfferingUtil";
import { BasketItem } from "../../../types/BasketItem";
import AgreementUtil from "../../../../utils/AgreementUtil";
import MsisdnUtil from "../../../../utils/MsisdnUtil";
import * as DigitalLifeSelector from "../../digitalLife/digitalLife.selectors";

class ChangePlanSelector {
	private static getBasketItems(state: AppState): BasketItem[] {
		const { initializationResult } = state.changePlan;
		return (initializationResult && initializationResult.basketItems) || [];
	}
	private static getPaymentMethods(state: AppState): ContextualPaymentMethod[] {
		const { initializationResult } = state.changePlan;
		return (initializationResult && initializationResult.paymentMethods) || [];
	}
	static isChangePlanAvailable(state: AppState, agreementId: string): boolean {
		const availablePlansForAgreement = state.changePlan.availablePlanProductOfferingsByAgreement[agreementId];
		return availablePlansForAgreement && availablePlansForAgreement.length > 0;
	}
	static getChangePlanFee(state: AppState): SimplePrice {
		return (
			PriceUtil.getSimplePriceSum(
				ArrayUtil.filterUndefined(
					ChangePlanSelector.getBasketItems(state)
						.filter(po => !BasketUtil.isBasketItemTerminated(po))
						.map(BasketUtil.getBasketItemOneTimePrice)
				)
			) || PriceUtil.getZeroPrice()
		);
	}
	static getChangePlanFirstMonthFee(state: AppState): SimplePrice {
		return (
			PriceUtil.getSimplePriceSum(
				ArrayUtil.filterUndefined(
					ChangePlanSelector.getBasketItems(state)
						.filter(po => !BasketUtil.isBasketItemTerminated(po))
						.map(BasketUtil.getBasketItemRecurrentPrice)
				)
			) || PriceUtil.getZeroPrice()
		);
	}
	static getSelectedPlanName(state: AppState): string {
		return (state.changePlan.selectedPlan && ProductOfferingUtil.getPOName(state.changePlan.selectedPlan)) || "";
	}
	// 	static getChangePlanAllFeeProducts(state: AppState): ProductOffering[] {
	// 		return ArrayUtil.filterUndefined(
	// 			ChangePlanSelector.getBasketItems(state)
	// 				.filter(po => !BasketUtil.isBasketItemTerminated(po))
	// 				.map(BasketUtil.getProductOfferingInBasketItem)
	// 		);
	// 	}
	static getBalance(state: AppState): ChargingBalances | undefined {
		return PaymentUtil.getBalanceFromPaymentMethods(ChangePlanSelector.getPaymentMethods(state));
	}
	static getSelectedPaymentMethod(state: AppState): ContextualPaymentMethod | undefined {
		// NOTE: for now support only balance method
		return ChangePlanSelector.getPaymentMethods(state).find(PaymentUtil.isBalancePaymentMethod);
	}
	static getTotalChangePlanPrice(state: AppState): SimplePrice | undefined {
		return PriceUtil.getSimplePriceSum(
			ArrayUtil.filterUndefined(
				ChangePlanSelector.getBasketItems(state)
					.filter(po => !BasketUtil.isBasketItemTerminated(po))
					.map(BasketUtil.getBasketItemUpfrontPrice)
			)
		);
	}
	static canProceedWithChangePlan(state: AppState): boolean {
		const selectedPaymentMethod = ChangePlanSelector.getSelectedPaymentMethod(state);
		// NOTE: for now support only balance method
		if (!selectedPaymentMethod || !PaymentUtil.isBalancePaymentMethod(selectedPaymentMethod)) {
			return false;
		}
		const currentBalance = selectedPaymentMethod.balance || 0;
		const totalChangePlanPrice = ChangePlanSelector.getTotalChangePlanPrice(state);
		const totalChangePlanCost = (totalChangePlanPrice && totalChangePlanPrice.taxIncludedAmount) || 0;
		const isEnoughBalance = currentBalance >= totalChangePlanCost;
		return isEnoughBalance;
	}
	static getTerminatedAddons(state: AppState): ProductOffering[] {
		return ArrayUtil.filterUndefined(
			ChangePlanSelector.getBasketItems(state)
				.filter(BasketUtil.isBasketItemTerminated)
				.map(BasketUtil.getProductOfferingInBasketItem)
		);
	}
	static getActivatedAddons(state: AppState): ProductOffering[] {
		return ArrayUtil.filterUndefined(
			BasketUtil.getBasketItemsWithChildrenRecursively(ChangePlanSelector.getBasketItems(state))
				.filter(BasketUtil.isBasketItemActive)
				.map(BasketUtil.getProductOfferingInBasketItem)
		);
	}
	static getCurrentPlanPhoneNumber(state: AppState): string {
		const { agreementId } = state.changePlan;
		const agreement = agreementId && DigitalLifeSelector.getAgreementById(agreementId)(state);
		const phoneNumber = (agreement && AgreementUtil.getPhoneNumber(agreement)) || "";
		return MsisdnUtil.getMsisdnWithSeparatedAreaCode(phoneNumber);
	}
	static getAvailablePlans(state: AppState): ProductOffering[] {
		const { agreementId } = state.changePlan;
		const unsortedAvailablePlans = (agreementId && state.changePlan.availablePlanProductOfferingsByAgreement[agreementId]) || [];
		return unsortedAvailablePlans.sort((a: ProductOffering, b: ProductOffering) =>
			(ProductOfferingUtil.getPOName(a) || "").localeCompare(ProductOfferingUtil.getPOName(b) || "")
		);
	}
}
export { ChangePlanSelector };

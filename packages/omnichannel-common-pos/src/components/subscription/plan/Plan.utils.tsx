import * as React from "react";
import { Agreement, Price, PriceTypeEnum, Product, ProductOffering } from "../../../redux/types";
import { get } from "lodash";
import ProductUtil from "../../../utils/product/ProductUtil";
import messages from "./Plans.messages";
import PriceUtil from "../../../utils/PriceUtil";
import ProductOfferingUtil from "../../../utils/ProductOfferingUtil";
import OcCurrency from "../../ocComponents/OcCurrency";
import { FormattedMessageDescriptor } from "../../../channelUtils";
import { ProductLifecycleStatus } from "../../../redux/types/index";

export default class PlanUtils {
	static stylesForOcModal = { maxWidth: "624px", margin: "0 auto" };
	static none = (...elements: any[]) => !elements.some(Boolean);

	/**
	 * Finds all plans under an agreement.
	 * Subscription product skipped as only childProducts could contain real plan
	 *
	 * @param agreement
	 * @return {Array}
	 */
	static extractPlans = (agreement?: Agreement): Array<Product> => {
		const plans: Product[] = [];

		PlanUtils.extractPlansFromAgreement(plans, agreement);
		return plans;
	};
	/**
	 * Finds all active plans under an agreement.
	 * Subscription product skipped as only childProducts could contain real plan
	 *
	 * @param agreement
	 * @return {Array}
	 */
	static extractActivePlans = (agreement?: Agreement): Array<Product> => {
		const plans: Product[] = [];

		PlanUtils.extractPlansFromAgreement(plans, agreement);
		return plans.filter((plan: Product) => plan.lifeCycleStatus === ProductLifecycleStatus.ACTIVE);
	};

	/**
	 * Finds all "plans" under an agreement and populates them to a supplied array.
	 *
	 * @param plans
	 * @param agreement
	 */
	static extractPlansFromAgreement = (plans: Array<Product>, agreement?: Agreement): void => {
		if (agreement) {
			const products: Array<Product> = ProductUtil.getProducts(agreement);

			products.forEach(product => {
				PlanUtils.extractPlansFromProduct(plans, product);
			});
		}
	};

	/**
	 * Finds all "plans" under a products and populates them to a supplied array.
	 *
	 * @param plans
	 * @param product
	 */
	static extractPlansFromProduct = (plans: Array<Product>, product?: Product): void => {
		if (product) {
			if (product.isPlan) {
				PlanUtils.addIfDoesNotExist(plans, product);
			}
			const childPlans = product.childProducts || [];

			childPlans.forEach((plan: Product) => {
				PlanUtils.extractPlansFromProduct(plans, plan);
			});
		}
	};

	static addIfDoesNotExist = (stack: Array<Product>, item: Product) => {
		const existing = stack.find(elem => elem.id === item.id);
		if (!existing) {
			stack.push(item);
		}
	};

	static getMessage(offering?: ProductOffering | null): FormattedMessageDescriptor { // what if offering is undefined?
		const productType = get(offering, "attributes.specSubType") !== "ADDITIONAL" ? "plan" : "";
		const isPlan = productType === "plan";
		return isPlan ? {...messages.productTypePlan} : {...messages.productTypeAddon};
	}

	static calculatePlanFee(plan: Product): { hasPrice: boolean, rate: React.ReactNode, period: string | undefined } {
		const recurringFeeData = ProductOfferingUtil.getRecurringPriceRange(plan);
		const price: Price | undefined = plan && plan.prices
			? PriceUtil.findPrice(plan.prices, PriceTypeEnum.RECURRENT)
			: undefined;
		const period = price && price.recurringChargePeriod && price.recurringChargePeriod.interval
			? price.recurringChargePeriod.interval.toLowerCase()
			: undefined;

		return {
			hasPrice: Boolean(recurringFeeData.min || recurringFeeData.max),
			rate: <OcCurrency cost={recurringFeeData.min} currency={recurringFeeData.currency} />,
			period: period
		};
	}

	static getPlanFeeCurrencyComponent(plan: Product): React.ReactNode {
		const recurringFeeData = ProductOfferingUtil.getRecurringPriceRange(plan);
		const price: Price | undefined = plan && plan.prices
			? PriceUtil.findPrice(plan.prices, PriceTypeEnum.RECURRENT)
			: undefined;
		const period = price && price.recurringChargePeriod;

		return (
			<OcCurrency
				cost={recurringFeeData.min}
				currency={recurringFeeData.currency}
				recurringInterval={period}
				showFullIntervalName={true}
				ignoreSpaces={true}
			/>
		);
	}
}

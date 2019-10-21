import { Agreement, Product, ProductOffering, SimplePrice, UnitOfMeasureEnum, UsageCounters } from "../../types";
import AllowanceUtil from "../../../utils/AllowanceUtil";
import { ActiveProductLoan, LOAN_ALLOWANCE_LOANED_BALANCE, LOAN_ALLOWANCE_TOTAL_CREDIT } from "./productLoan.types";
import ProductOfferingUtil from "../../../utils/ProductOfferingUtil";
import { isEmpty } from "lodash";
import { AppState } from "../../reducers";
import UsageCountersUtil from "../../../utils/product/UsageCountersUtil";
import ProductUtil from "../../../utils/product/ProductUtil";

export class ProductLoanSelector {
	static getLoanFee(loan: ProductOffering | Product, currency: string): SimplePrice {
		const price = ProductOfferingUtil.getSimplePrice(loan, "ONE_TIME");
		return !isEmpty(price)
			? price
			: {
					taxFreeAmount: 0,
					currency
			  };
	}
	private static getPriceByAllowanceValue(loan: ProductOffering | Product, currency: string, allowanceGroup: string) {
		const allowance = AllowanceUtil.getFirstAllowance(loan, allowanceGroup, UnitOfMeasureEnum.MONETARY);
		if (!allowance) {
			return {
				taxFreeAmount: 0,
				currency
			};
		}
		return { taxFreeAmount: allowance.value, currency };
	}
	static getLoanedBalance(loan: ProductOffering | Product, currency: string): SimplePrice {
		return ProductLoanSelector.getPriceByAllowanceValue(loan, currency, LOAN_ALLOWANCE_LOANED_BALANCE);
	}
	static getLoanTotalCredit(loan: ProductOffering, currency: string): SimplePrice {
		return ProductLoanSelector.getPriceByAllowanceValue(loan, currency, LOAN_ALLOWANCE_TOTAL_CREDIT);
	}
	static isProductLoan(product: Product, loanCategoryId: string): boolean {
		return product.categoriesIds && product.categoriesIds.includes(loanCategoryId);
	}
	static getFirstActiveLoanDetailsFromAgreementAndState(agreement: Agreement, state: AppState): ActiveProductLoan | undefined {
		const loanCategoryId = state.feature.ecareProductLoan && state.feature.ecareProductLoan.loanCategoryId;
		if (!loanCategoryId) {
			return undefined;
		}
		return ProductLoanSelector.getFirstActiveLoanDetailsFromAgreement(
			agreement,
			loanCategoryId,
			state.currency.selectedCurrency,
			state.feature.ecareProductLoan && state.feature.ecareProductLoan.dueDateCharacteristicPurpose
		);
	}

	static getFirstActiveLoanFromAgreementAndState(agreement: Agreement, state: AppState): Product | undefined {
		const loanCategoryId = state.feature.ecareProductLoan && state.feature.ecareProductLoan.loanCategoryId;
		if (!loanCategoryId) {
			return undefined;
		}
		return ProductLoanSelector.getActiveLoansFromAgreement(agreement, loanCategoryId)[0];
	}
	static getFirstActiveLoanDetailsFromAgreement(
		agreement: Agreement,
		loanCategoryId: string,
		currency: string,
		dueDateCharacteristicPurpose?: string
	): ActiveProductLoan | undefined {
		const activeLoans = ProductLoanSelector.getActiveLoansFromAgreement(agreement, loanCategoryId);
		return activeLoans.length ? ProductLoanSelector.getActiveLoanDetails(activeLoans[0], currency, dueDateCharacteristicPurpose) : undefined;
	}
	static getActiveLoansFromAgreement(agreement: Agreement, loanCategoryId: string): Product[] {
		return ProductUtil.getProductsAndChildProductsRecursively(agreement).filter(childProduct =>
			ProductLoanSelector.isProductLoan(childProduct, loanCategoryId)
		);
	}
	private static getZeroPrice(currency: string): SimplePrice {
		return { taxFreeAmount: 0, currency };
	}
	private static usageCountersToPrice(usageCounters: UsageCounters | undefined, defaultValue: number | null | undefined, currency: string): SimplePrice {
		return usageCounters ? { taxFreeAmount: usageCounters.value, currency: usageCounters.currency } : { currency, taxFreeAmount: defaultValue || 0 };
	}
	static getActiveLoanDueDateCharacteristicName(loan: Product, dueDateCharacteristicPurpose: string): string | undefined {
		return Object.keys(loan.instanceCharacteristics).find(characteristicName => {
			const characteristic = loan.instanceCharacteristics[characteristicName];
			return characteristic.purpose === dueDateCharacteristicPurpose;
		});
	}
	static getActiveLoanDetails(loan: Product, currency: string, dueDateCharacteristicPurpose?: string): ActiveProductLoan | undefined {
		const loanFee = ProductLoanSelector.getLoanFee(loan, currency);
		const loanedBalance = ProductLoanSelector.getLoanedBalance(loan, currency);
		const remainingLoanAmount = ProductLoanSelector.usageCountersToPrice(
			UsageCountersUtil.getUsageCounters(loan, "Credit", UnitOfMeasureEnum.MONETARY),
			loanedBalance.taxFreeAmount,
			currency
		);
		const loanAmountToPayBack = ProductLoanSelector.usageCountersToPrice(
			UsageCountersUtil.getUsageCounters(loan, "Debt", UnitOfMeasureEnum.MONETARY),
			loanedBalance.taxFreeAmount,
			currency
		);
		const loanFeeToPayBack = ProductLoanSelector.usageCountersToPrice(
			UsageCountersUtil.getUsageCounters(loan, "Fee", UnitOfMeasureEnum.MONETARY),
			loanFee.taxFreeAmount,
			currency
		);
		const totalAmountToPayBack = {
			currency,
			taxFreeAmount: (loanFeeToPayBack.taxFreeAmount || 0) + (loanAmountToPayBack.taxFreeAmount || 0)
		};
		const dueDateCharacteristicName =
			dueDateCharacteristicPurpose && ProductLoanSelector.getActiveLoanDueDateCharacteristicName(loan, dueDateCharacteristicPurpose);
		const dueDateValue = dueDateCharacteristicName && loan.characteristics[dueDateCharacteristicName];
		const dueDate = dueDateValue ? new Date(dueDateValue) : undefined;
		return {
			loanFee,
			loanedBalance,
			loanAmountToPayBack,
			remainingLoanAmount,
			loanFeeToPayBack,
			totalAmountToPayBack,
			dueDate
		};
	}
}

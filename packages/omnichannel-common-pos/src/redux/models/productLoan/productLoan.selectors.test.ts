import { ProductLoanSelector } from "./productLoan.selectors";
import {
	ACTIVE_LOAN_DETAILS,
	ACTIVE_LOAN_WITHOUT_USAGE_COUNTERS_DETAILS,
	AGREEMENT_LOAN_PRODUCT,
	AGREEMENT_WITH_ACTIVE_LOAN,
	AGREEMENT_WITH_MULTIPLE_LOANS,
	AGREEMENT_WITHOUT_LOANS,
	CURRENCY,
	DUE_DATE_CHARACTERISTIC_PURPOSE,
	DUE_DATE_VALUE,
	LOAN,
	LOAN_CATEGORY_ID,
	LOAN_INVALID_ALLOWANCE_UNIT_OF_MEASURE,
	LOAN_NO_PRICES,
	LOAN_PRODUCT,
	LOAN_PRODUCT_WITHOUT_USAGE_COUNTERS,
	ZERO_PRICE
} from "./productLoan.selectors.testData";

describe("productLoan.selectors", () => {
	describe("getLoanFee", () => {
		it("should return fee from one-time po price", () => {
			expect(ProductLoanSelector.getLoanFee(LOAN, CURRENCY)).toMatchObject({
				taxFreeAmount: 2,
				currency: CURRENCY
			});
		});
		it("should return zero price if one-time po price not found", () => {
			expect(ProductLoanSelector.getLoanFee(LOAN_NO_PRICES, CURRENCY)).toMatchObject(ZERO_PRICE);
		});
	});
	describe("getLoanedBalance", () => {
		it("should return loaned balance from po allowance", () => {
			expect(ProductLoanSelector.getLoanedBalance(LOAN, CURRENCY)).toMatchObject({
				taxFreeAmount: 15,
				currency: CURRENCY
			});
		});
		it("should return zero price if loaned balance po allowance not found", () => {
			expect(ProductLoanSelector.getLoanedBalance(LOAN_NO_PRICES, CURRENCY)).toMatchObject(ZERO_PRICE);
		});
		it("should return zero price if loaned balance po allowance is not valid (unit-of-measure)", () => {
			expect(ProductLoanSelector.getLoanedBalance(LOAN_INVALID_ALLOWANCE_UNIT_OF_MEASURE, CURRENCY)).toMatchObject(ZERO_PRICE);
		});
	});
	describe("getLoanTotalCredit", () => {
		it("should return total credit from po allowance", () => {
			expect(ProductLoanSelector.getLoanTotalCredit(LOAN, CURRENCY)).toMatchObject({
				taxFreeAmount: 17,
				currency: CURRENCY
			});
		});
		it("should return zero price if total credit po allowance not found", () => {
			expect(ProductLoanSelector.getLoanTotalCredit(LOAN_NO_PRICES, CURRENCY)).toMatchObject(ZERO_PRICE);
		});
		it("should return zero price if total credit po allowance is not valid (unit-of-measure)", () => {
			expect(ProductLoanSelector.getLoanTotalCredit(LOAN_INVALID_ALLOWANCE_UNIT_OF_MEASURE, CURRENCY)).toMatchObject(ZERO_PRICE);
		});
	});
	describe("isProductLoan", () => {
		it("should return true when has loan category id", () => {
			expect(ProductLoanSelector.isProductLoan(LOAN_PRODUCT, LOAN_CATEGORY_ID)).toBeTruthy();
		});
		it("should return false when hasn't loan category id", () => {
			expect(ProductLoanSelector.isProductLoan(LOAN_PRODUCT, "unknownCategory")).toBeFalsy();
		});
		it("should return false when no categories ids", () => {
			expect(ProductLoanSelector.isProductLoan({ ...LOAN_PRODUCT, categoriesIds: [] }, LOAN_CATEGORY_ID)).toBeFalsy();
		});
	});
	describe("getActiveLoansFromAgreement", () => {
		it("should return loan products from agreement products and subscription child products", () => {
			const activeLoans = ProductLoanSelector.getActiveLoansFromAgreement(AGREEMENT_WITH_ACTIVE_LOAN, LOAN_CATEGORY_ID);
			expect(activeLoans).toHaveLength(2);
			expect(activeLoans).toContain(LOAN_PRODUCT);
			expect(activeLoans).toContain(AGREEMENT_LOAN_PRODUCT);
		});
		it("should return empty list when no loan products", () => {
			const activeLoans = ProductLoanSelector.getActiveLoansFromAgreement(AGREEMENT_WITHOUT_LOANS, LOAN_CATEGORY_ID);
			expect(activeLoans).toHaveLength(0);
		});
		it("should return empty list when no loans found", () => {
			const activeLoans = ProductLoanSelector.getActiveLoansFromAgreement(AGREEMENT_WITH_ACTIVE_LOAN, "other category id");
			expect(activeLoans).toHaveLength(0);
		});
	});
	describe("getActiveLoanDueDateCharacteristicName", () => {
		it("should return instance characteristic name by purpose", () => {
			expect(ProductLoanSelector.getActiveLoanDueDateCharacteristicName(LOAN_PRODUCT, DUE_DATE_CHARACTERISTIC_PURPOSE)).toMatch("T_DUE_DATE");
		});
		it("should return undefined when instance characteristic not found", () => {
			expect(ProductLoanSelector.getActiveLoanDueDateCharacteristicName(LOAN_PRODUCT, "unknown")).toBeUndefined();
		});
	});
	describe("getActiveLoanDetails", () => {
		it("should return zero prices for remaining amounts when no usage-counters", () => {
			const activeLoan = ProductLoanSelector.getActiveLoanDetails(LOAN_PRODUCT_WITHOUT_USAGE_COUNTERS, CURRENCY, DUE_DATE_CHARACTERISTIC_PURPOSE);
			expect(activeLoan).toMatchObject(ACTIVE_LOAN_WITHOUT_USAGE_COUNTERS_DETAILS);
		});
		it("should return undefined dueDate when no characteristic", () => {
			const activeLoan = ProductLoanSelector.getActiveLoanDetails({ ...LOAN_PRODUCT, characteristics: {} }, CURRENCY, DUE_DATE_CHARACTERISTIC_PURPOSE);
			expect(activeLoan!.dueDate).toBeUndefined();
		});
		it("should return undefined dueDate when no instance characteristics", () => {
			const activeLoan = ProductLoanSelector.getActiveLoanDetails(
				{ ...LOAN_PRODUCT, instanceCharacteristics: {} },
				CURRENCY,
				DUE_DATE_CHARACTERISTIC_PURPOSE
			);
			expect(activeLoan!.dueDate).toBeUndefined();
		});
		it("should return all prices when has usage-counters", () => {
			const activeLoan = ProductLoanSelector.getActiveLoanDetails(LOAN_PRODUCT, CURRENCY, DUE_DATE_CHARACTERISTIC_PURPOSE);
			expect(activeLoan).toMatchObject(ACTIVE_LOAN_DETAILS);
		});
		it("should return dueDate when characteristic present", () => {
			const activeLoan = ProductLoanSelector.getActiveLoanDetails(LOAN_PRODUCT, CURRENCY, DUE_DATE_CHARACTERISTIC_PURPOSE);
			expect(activeLoan).toMatchObject({
				dueDate: new Date(DUE_DATE_VALUE)
			});
		});
	});

	describe("getFirstActiveLoanDetailsFromAgreement", () => {
		it("should return first active loan details when has active loan", () => {
			const activeLoan = ProductLoanSelector.getFirstActiveLoanDetailsFromAgreement(
				AGREEMENT_WITH_MULTIPLE_LOANS,
				LOAN_CATEGORY_ID,
				CURRENCY,
				DUE_DATE_CHARACTERISTIC_PURPOSE
			);
			expect(activeLoan).toMatchObject(ACTIVE_LOAN_WITHOUT_USAGE_COUNTERS_DETAILS);
		});
		it("should return undefined when has no active loans", () => {
			const activeLoan = ProductLoanSelector.getFirstActiveLoanDetailsFromAgreement(
				AGREEMENT_WITHOUT_LOANS,
				LOAN_CATEGORY_ID,
				CURRENCY,
				DUE_DATE_CHARACTERISTIC_PURPOSE
			);
			expect(activeLoan).toBeUndefined();
		});
	});
});

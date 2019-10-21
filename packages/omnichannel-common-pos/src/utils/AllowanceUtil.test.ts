import AllowanceUtil from "./AllowanceUtil";
import { MockDataMaker } from "../testUtils";
import { ProductOfferingAttributes, UnitOfMeasureEnum } from "../redux/types";

const poWithoutAllowances = MockDataMaker.productOffering.make();
poWithoutAllowances.allowances = undefined;
poWithoutAllowances.attributes = { allowances: undefined } as ProductOfferingAttributes;

const poWithAttributes = MockDataMaker.productOffering.make();
const poWithoutAttributes = MockDataMaker.productOffering.make();
poWithAttributes.attributes = {} as any;
poWithoutAttributes.attributes = undefined;

const LOANED_BALANCE_ALLOWANCE = {
	group: "Loan Credit",
	value: 15,
	unitOfMeasure: UnitOfMeasureEnum.MONETARY,
	destination: [],
	commercialEnrichments: [],
	externalId: ""
};
const LOAN_TOTAL_CREDIT_ALLOWANCE = {
	group: "Loan Amount",
	value: 17,
	unitOfMeasure: UnitOfMeasureEnum.MONETARY,
	destination: [],
	commercialEnrichments: [],
	externalId: ""
};
const SECOND_LOAN_TOTAL_CREDIT_ALLOWANCE = {
	...LOAN_TOTAL_CREDIT_ALLOWANCE,
	value: 999
};
const allowances = [LOANED_BALANCE_ALLOWANCE, LOAN_TOTAL_CREDIT_ALLOWANCE, SECOND_LOAN_TOTAL_CREDIT_ALLOWANCE];
poWithAttributes.attributes!.allowances = allowances;
poWithoutAttributes.allowances = allowances;

describe("AllowanceUtil", () => {
	describe("getAllowances", () => {
		it("should return allowances found by in PO", () => {
			const result = AllowanceUtil.getAllowances(poWithoutAttributes);
			expect(result).toBe(allowances);
		});
		it("should return allowances found by in PO.attributes", () => {
			const result = AllowanceUtil.getAllowances(poWithAttributes);
			expect(result).toBe(allowances);
		});
		it("should return empty list if no allowances found", () => {
			const result = AllowanceUtil.getAllowances(poWithoutAllowances);
			expect(result).toHaveLength(0);
		});
	});
	describe("getFirstAllowance", () => {
		it("should return first allowance if found", () => {
			const result = AllowanceUtil.getFirstAllowance(
				poWithAttributes,
				LOAN_TOTAL_CREDIT_ALLOWANCE.group,
				LOAN_TOTAL_CREDIT_ALLOWANCE.unitOfMeasure
			);
			expect(result).toBe(LOAN_TOTAL_CREDIT_ALLOWANCE);
		});
		it("should return undefined if not found", () => {
			const result = AllowanceUtil.getFirstAllowance(
				poWithAttributes,
				"unknown group",
				LOAN_TOTAL_CREDIT_ALLOWANCE.unitOfMeasure
			);
			expect(result).toBeUndefined();
		});
	});
});

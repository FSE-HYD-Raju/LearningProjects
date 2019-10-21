import { HasId, HasPrices, Product, ProductOfferingAttributes, SimplePrice, ProductOffering, UnitOfMeasureEnum, Agreement } from "../../types";
import { MockDataMaker } from "../../../testUtils";
import { ActiveProductLoan } from "./productLoan.types";

const CURRENCY = "USD";
const DUE_DATE_CHARACTERISTIC_PURPOSE = "DUE_DATE";
const LOAN_NO_PRICES = MockDataMaker.productOffering.make({ oneTimePrice: undefined });
const LOAN = MockDataMaker.productOffering.make({ oneTimePrice: 2, oneTimePriceCurrency: CURRENCY });
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
LOAN.allowances = [LOANED_BALANCE_ALLOWANCE, LOAN_TOTAL_CREDIT_ALLOWANCE];
const LOAN_INVALID_ALLOWANCE_UNIT_OF_MEASURE = MockDataMaker.productOffering.make({
	oneTimePrice: 2,
	oneTimePriceCurrency: CURRENCY
});
LOAN_INVALID_ALLOWANCE_UNIT_OF_MEASURE.allowances = [
	{
		...LOANED_BALANCE_ALLOWANCE,
		unitOfMeasure: UnitOfMeasureEnum.DAYS
	},
	{
		...LOAN_TOTAL_CREDIT_ALLOWANCE,
		unitOfMeasure: UnitOfMeasureEnum.DAYS
	}
];
const ZERO_PRICE = {
	taxFreeAmount: 0,
	currency: CURRENCY
};
const LOAN_CATEGORY_ID = "resMobPreLoan";
const LOAN_PRODUCT_ALLOWANCES = [
	{
		unitOfMeasure: "MONETARY",
		value: 15,
		interval: undefined,
		externalId: undefined,
		group: "Loan Credit",
		destination: [],
		commercialEnrichments: []
	},
	{
		unitOfMeasure: "MONETARY",
		value: 17,
		interval: undefined,
		externalId: undefined,
		group: "Loan Amount",
		destination: [],
		commercialEnrichments: []
	}
];
const LOAN_PRODUCT_PRICES = [
	{
		type: "ONE_TIME",
		name: undefined,
		chargedUnit: {
			amount: 1,
			currency: undefined,
			unitOfMeasure: UnitOfMeasureEnum.PIECES
		},
		taxAmount: undefined,
		taxFreeAmount: 2,
		taxIncludedAmount: undefined,
		taxRate: 0,
		recurringChargePeriod: undefined,
		currency: "USD",
		conditions: undefined,
		originalPrice: undefined
	}
];
const DUE_DATE_VALUE = "2020-03-14T17:20:00.000Z";
const LOAN_PRODUCT: Product = ({
	id: "loan-prod",
	categoriesIds: ["other", LOAN_CATEGORY_ID],
	name: "loan 15",
	prices: LOAN_PRODUCT_PRICES,
	allowances: LOAN_PRODUCT_ALLOWANCES,
	characteristics: {
		T_DUE_DATE: DUE_DATE_VALUE
	},
	instanceCharacteristics: {
		T_DUE_DATE: {
			values: [],
			description: undefined,
			source: undefined,
			subType: undefined,
			mandatory: false,
			validation: undefined,
			name: "T_DUE_DATE",
			priority: undefined,
			valueRegulator: undefined,
			purpose: "DUE_DATE",
			dataType: "DATE_TIME",
			cardinality: {
				max: undefined,
				min: undefined
			},
			humanReadableId: undefined,
			hidden: false,
			maxValue: undefined,
			minValue: undefined,
			unitOfMeasure: undefined
		}
	},
	usageCounters: [
		{
			id: "juanita-loan-usage-counter-fee",
			counterId: undefined,
			name: "Outstanding loan fee",
			value: 0.3,
			limits: [],
			validFor: {
				startDate: "2018-10-04T00:00:00Z",
				endDate: undefined
			},
			unitOfMeasure: "MONETARY",
			currency: "USD",
			service: undefined,
			category: "Fee"
		},
		{
			id: "juanita-loan-usage-counter-credit",
			counterId: undefined,
			name: "Remaining loan credit",
			value: 1.7,
			limits: [],
			validFor: {
				startDate: "2018-10-04T00:00:00Z",
				endDate: undefined
			},
			unitOfMeasure: "MONETARY",
			currency: "USD",
			service: undefined,
			category: "Credit"
		},
		{
			id: "juanita-loan-usage-counter-debt",
			counterId: undefined,
			name: "Outstanding loan amount",
			value: 1.4,
			limits: [],
			validFor: {
				startDate: "2018-10-04T00:00:00Z",
				endDate: undefined
			},
			unitOfMeasure: "MONETARY",
			currency: "USD",
			service: undefined,
			category: "Debt"
		}
	]
} as Partial<Product>) as Product;
const AGREEMENT_LOAN_PRODUCT = { ...LOAN_PRODUCT, id: "agreement-loan-product" } as Product;
const LOAN_PRODUCT_WITHOUT_USAGE_COUNTERS = { ...LOAN_PRODUCT, usageCounters: [] } as Product;
const ADDON_PRODUCT: Product = ({
	id: "addon-prod",
	categoriesIds: ["other"]
} as Partial<Product>) as Product;
const SUBSCRIPTION_WITHOUT_LOANS: Product = { childProducts: [ADDON_PRODUCT] } as Product;
const SUBSCRIPTION: Product = { childProducts: [ADDON_PRODUCT, LOAN_PRODUCT] } as Product;
const SUBSCRIPTION_WITH_MULTIPLE_LOANS: Product = {
	childProducts: [ADDON_PRODUCT, LOAN_PRODUCT_WITHOUT_USAGE_COUNTERS, LOAN_PRODUCT]
} as Product;

const getPrice = (taxFreeAmount: number): SimplePrice => ({
	currency: CURRENCY,
	taxFreeAmount
});
const ACTIVE_LOAN_DETAILS: Partial<ActiveProductLoan> = {
	loanFee: getPrice(2),
	loanedBalance: getPrice(15),
	remainingLoanAmount: getPrice(1.7),
	loanAmountToPayBack: getPrice(1.4),
	loanFeeToPayBack: getPrice(0.3),
	totalAmountToPayBack: getPrice(1.7)
};
const ACTIVE_LOAN_WITHOUT_USAGE_COUNTERS_DETAILS: Partial<ActiveProductLoan> = {
	loanFee: getPrice(2),
	loanedBalance: getPrice(15),
	remainingLoanAmount: getPrice(15),
	loanAmountToPayBack: getPrice(15),
	loanFeeToPayBack: getPrice(2),
	totalAmountToPayBack: getPrice(17)
};

const AGREEMENT_WITH_ACTIVE_LOAN = ({
	products: [AGREEMENT_LOAN_PRODUCT, SUBSCRIPTION]
} as Partial<Agreement>) as Agreement;

const AGREEMENT_WITH_MULTIPLE_LOANS = ({
	products: [LOAN_PRODUCT_WITHOUT_USAGE_COUNTERS, AGREEMENT_LOAN_PRODUCT, SUBSCRIPTION_WITHOUT_LOANS]
} as Partial<Agreement>) as Agreement;

const AGREEMENT_WITHOUT_LOANS = ({
	products: [SUBSCRIPTION_WITHOUT_LOANS]
} as Partial<Agreement>) as Agreement;

export {
	SUBSCRIPTION,
	SUBSCRIPTION_WITH_MULTIPLE_LOANS,
	SUBSCRIPTION_WITHOUT_LOANS,
	ACTIVE_LOAN_DETAILS,
	LOAN_PRODUCT_WITHOUT_USAGE_COUNTERS,
	LOAN_CATEGORY_ID,
	CURRENCY,
	LOAN_INVALID_ALLOWANCE_UNIT_OF_MEASURE,
	LOAN,
	LOAN_NO_PRICES,
	LOAN_PRODUCT,
	AGREEMENT_LOAN_PRODUCT,
	LOAN_TOTAL_CREDIT_ALLOWANCE,
	LOANED_BALANCE_ALLOWANCE,
	ZERO_PRICE,
	getPrice,
	DUE_DATE_CHARACTERISTIC_PURPOSE,
	DUE_DATE_VALUE,
	ACTIVE_LOAN_WITHOUT_USAGE_COUNTERS_DETAILS,
	AGREEMENT_WITH_ACTIVE_LOAN,
	AGREEMENT_WITHOUT_LOANS,
	AGREEMENT_WITH_MULTIPLE_LOANS
};

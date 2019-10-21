import { ProductOffering, SimplePrice } from "../../types";

const PRODUCT_LOAN_INITIALIZE_LOADING_KEY = "PRODUCT_LOAN_INITIALIZE_LOADING_KEY";

const LOAN_ALLOWANCE_LOANED_BALANCE = "Loan Credit";
const LOAN_ALLOWANCE_TOTAL_CREDIT = "Loan Amount";

type ProductLoanState = {
	loans: ProductOffering[];
	selectedLoan?: ProductOffering;
	isShowingActivateProductLoanModal: boolean;
};

interface ActiveProductLoan {
	loanFee: SimplePrice;
	loanedBalance: SimplePrice;
	remainingLoanAmount: SimplePrice;
	loanAmountToPayBack: SimplePrice;
	loanFeeToPayBack: SimplePrice;
	totalAmountToPayBack: SimplePrice;
	dueDate: Date | undefined;
}

export {
	ProductLoanState,
	ActiveProductLoan,
	PRODUCT_LOAN_INITIALIZE_LOADING_KEY,
	LOAN_ALLOWANCE_LOANED_BALANCE,
	LOAN_ALLOWANCE_TOTAL_CREDIT
};

import { Product, ProductOffering } from "../../../redux/types";

interface ProductLoansListOwnProps {
	agreementId: string;
	selectedSubscriptionProduct: Product;
	lifecycleFilter: string | undefined;
}
interface ProductLoansListStateProps {
	availableLoans: ProductOffering[];
	activeLoans: Product[];
	showActivateModal: boolean;
}
interface ProductLoansListActionProps {
	actions: {
		activateLoan: (loan: ProductOffering) => void;
		openTopUpModal: (agreementId: string) => void;
		getAvailableProductLoans: (agreementId: string) => void;
	};
}

interface ProductLoansListState {
	showActivateModal: boolean;
}

interface ProductLoansListProps extends ProductLoansListOwnProps, ProductLoansListStateProps, ProductLoansListActionProps {}

export {
	ProductLoansListOwnProps,
	ProductLoansListStateProps,
	ProductLoansListActionProps,
	ProductLoansListProps,
	ProductLoansListState
};

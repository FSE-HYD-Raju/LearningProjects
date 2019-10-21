import { InitializeAddonConfig } from "../../../redux/services/AddonService";
import { SimplePrice } from "../../../redux/types";

interface ActivateProductLoanModalOwnProps {
	msisdn: string;
}
interface ActivateProductLoanModalStateProps {
	loanedBalance: SimplePrice;
	fee: SimplePrice;
	totalCredit: SimplePrice;
	initializeAddonConfig: InitializeAddonConfig | undefined;
}
interface ActivateProductLoanModalActionProps {
	actions: {
		closeModal: () => void;
		confirm: (initializeAddonConfig: InitializeAddonConfig) => void;
	};
}
interface ActivateProductLoanModalProps
	extends ActivateProductLoanModalOwnProps,
		ActivateProductLoanModalStateProps,
		ActivateProductLoanModalActionProps {}
interface ActivateProductLoanModalState {
	agreedToTerms: boolean;
}
export {
	ActivateProductLoanModalOwnProps,
	ActivateProductLoanModalStateProps,
	ActivateProductLoanModalActionProps,
	ActivateProductLoanModalProps,
	ActivateProductLoanModalState
};

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { default as ProductLoansList } from "./ProductLoansList";
import { ProductOffering } from "../../../redux/types";
import { AppState } from "../../../redux/reducers";
import actions from "../../../redux/actions";
import { Selectors } from "../../../redux";
import {
	ProductLoansListProps,
	ProductLoansListActionProps,
	ProductLoansListOwnProps,
	ProductLoansListStateProps
} from "./ProductLoansListProps";
import { commonDigitalLifeRoutes } from "../../../routes/commonRoutesMap";

interface ProductLoansListContainerProps extends ProductLoansListOwnProps {}

const mapStateToProps = (state: AppState, props: ProductLoansListContainerProps): ProductLoansListStateProps & ProductLoansListOwnProps => {
	const loanCategoryId = state.feature.ecareProductLoan && state.feature.ecareProductLoan.loanCategoryId;
	const agreement = Selectors.digitalLife.getAgreementById(props.agreementId)(state);
	return {
		availableLoans: state.productLoan.loans,
		activeLoans: loanCategoryId && agreement
			? Selectors.productLoan.getActiveLoansFromAgreement(agreement, loanCategoryId)
			: [],
		showActivateModal: state.productLoan.isShowingActivateProductLoanModal,
		...props
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, props: ProductLoansListContainerProps): ProductLoansListActionProps => ({
	actions: {
		getAvailableProductLoans: (agreementId: string) => dispatch(actions.productLoan.getAvailableLoans(agreementId)),
		activateLoan: (loan: ProductOffering) => dispatch(actions.productLoan.showLoanActivationModal(loan)),
		openTopUpModal: (agreementId: string) => {
			dispatch(actions.router.push(commonDigitalLifeRoutes.DIGITAL_LIFE_TOP_UP_PAYMENT.createLink({agreementId})));
		}
	}
});

export { ProductLoansListContainerProps };
export default connect(mapStateToProps, mapDispatchToProps)(ProductLoansList);

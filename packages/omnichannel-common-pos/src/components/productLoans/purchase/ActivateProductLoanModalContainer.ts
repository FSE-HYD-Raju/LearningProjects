"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";

import { default as ActivateProductLoanModal } from "./ActivateProductLoanModal";
import { AppState } from "../../../redux/reducers";
import actions from "../../../redux/actions";
import { Selectors } from "../../../redux";
import { InitializeAddonConfig } from "../../../redux/services/AddonService";
import {
	ActivateProductLoanModalProps,
	ActivateProductLoanModalActionProps,
	ActivateProductLoanModalOwnProps,
	ActivateProductLoanModalStateProps
} from "./ActivateProductLoanModalProps";

interface ActivateProductLoanModalContainerProps extends ActivateProductLoanModalOwnProps {
	agreementId: string;
}
const mapStateToProps = (state: AppState, props: ActivateProductLoanModalContainerProps):
	ActivateProductLoanModalStateProps & ActivateProductLoanModalOwnProps => {

	const user = Selectors.user.getUser(state);
	const initializeAddonConfig: InitializeAddonConfig | undefined = user &&
		state.productLoan.selectedLoan && {
			personId: user.id,
			targetAgreementId: props.agreementId,
			productId: state.productLoan.selectedLoan.id
		};
	return {
		fee:
			(state.productLoan.selectedLoan &&
				Selectors.productLoan.getLoanFee(state.productLoan.selectedLoan, state.currency.selectedCurrency)) ||
			{},
		loanedBalance:
			(state.productLoan.selectedLoan &&
				Selectors.productLoan.getLoanedBalance(
					state.productLoan.selectedLoan,
					state.currency.selectedCurrency
				)) ||
			{},
		totalCredit:
			(state.productLoan.selectedLoan &&
				Selectors.productLoan.getLoanTotalCredit(
					state.productLoan.selectedLoan,
					state.currency.selectedCurrency
				)) ||
			{},
		initializeAddonConfig,
		msisdn: props.msisdn
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, props: ActivateProductLoanModalContainerProps): ActivateProductLoanModalActionProps => ({
	actions: {
		closeModal: () => dispatch(actions.productLoan.hideLoanActivationModal()),
		confirm: (initializeAddonConfig: InitializeAddonConfig) =>
			dispatch(actions.productLoan.confirmLoanActivation(initializeAddonConfig))
	}
});

export { ActivateProductLoanModalContainerProps };
export default connect(mapStateToProps, mapDispatchToProps)(ActivateProductLoanModal);

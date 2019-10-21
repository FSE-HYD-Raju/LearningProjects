"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";

import { SubscriptionCreditInfoStateProps, default as SubscriptionCreditInfo, SubscriptionCreditInfoActionProps } from "./SubscriptionCreditInfo";
import { AppState } from "../../../redux/reducers";
import { Agreement, Product, Selectors, CommercialEnrichmentNameEnum } from "../../../redux";
import actions from "../../../redux/actions";
import ProductOfferingUtil from "../../../utils/ProductOfferingUtil";
import { commonDigitalLifeRoutes } from "../../../routes/commonRoutesMap";

interface SubscriptionCreditInfoContainerProps {
	subscription: Product;
	agreement: Agreement;
}

const mapStateToProps = (state: AppState, props: SubscriptionCreditInfoContainerProps): SubscriptionCreditInfoStateProps => {
	const activeLoan = Selectors.productLoan.getFirstActiveLoanFromAgreementAndState(props.agreement, state);
	const loanDescription =
		(activeLoan && ProductOfferingUtil.getCommercialEnrichmentValueFromPO(activeLoan, CommercialEnrichmentNameEnum.descriptions, "detailed")) || "";
	const activeLoanDetails = Selectors.productLoan.getFirstActiveLoanDetailsFromAgreementAndState(props.agreement, state);
	return {
		loanDescription,
		activeLoanDetails
	};
};
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, props: SubscriptionCreditInfoContainerProps): SubscriptionCreditInfoActionProps => ({
	actions: {
		openTopUpModal: () => {
			dispatch(actions.router.push(commonDigitalLifeRoutes.DIGITAL_LIFE_TOP_UP_PAYMENT.createLink({ agreementId: props.agreement.id })));
		}
	}
});
export { SubscriptionCreditInfoContainerProps };
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SubscriptionCreditInfo);

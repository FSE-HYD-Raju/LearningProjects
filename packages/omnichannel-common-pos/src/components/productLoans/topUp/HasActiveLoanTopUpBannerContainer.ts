"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";

import { HasActiveLoanTopUpBannerProps, default as HasActiveLoanTopUpBanner } from "./HasActiveLoanTopUpBanner";
import { AppState } from "../../../redux/reducers";
import { Agreement, Selectors } from "../../../redux";

interface HasActiveLoanTopUpBannerContainerProps {
	agreement: Agreement;
}

const mapStateToProps = (
	state: AppState,
	props: HasActiveLoanTopUpBannerContainerProps
): HasActiveLoanTopUpBannerProps => {
	const activeLoanDetails = Selectors.productLoan.getFirstActiveLoanDetailsFromAgreementAndState(
		props.agreement,
		state
	);
	return {
		hasActiveLoan: Boolean(activeLoanDetails),
		loanAmountToPayBack: activeLoanDetails && activeLoanDetails.totalAmountToPayBack
	};
};

export { HasActiveLoanTopUpBannerContainerProps };
export default connect(mapStateToProps)(HasActiveLoanTopUpBanner);

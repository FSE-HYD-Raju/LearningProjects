"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";

import { ProductLoanExpandedContentProps, default as ProductLoanExpandedContent } from "./ProductLoanExpandedContent";
import { AppState, Product, Selectors } from "../../../../redux";

interface ProductLoanExpandedContentContainerProps {
	loan: Product;
	longDescription: string;
}

const mapStateToProps = (state: AppState, props: ProductLoanExpandedContentContainerProps): ProductLoanExpandedContentProps => ({
	longDescription: props.longDescription,
	loan: props.loan,
	activeLoan: Selectors.productLoan.getActiveLoanDetails(
		props.loan,
		state.currency.selectedCurrency,
		state.feature.ecareProductLoan && state.feature.ecareProductLoan.dueDateCharacteristicPurpose
	)
});

export { ProductLoanExpandedContentContainerProps };
export default connect(mapStateToProps)(ProductLoanExpandedContent);

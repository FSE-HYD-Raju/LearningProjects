"use strict";

import * as React from "react";
import { AppState } from "../../../redux/reducers";
import { connect } from "react-redux";
import { CreditCardSelectionList, CreditCardStorageSelectionProps } from "./CreditCardSelectionList";

export interface CreditCardSelectionListContainerProps extends CreditCardStorageSelectionProps { }

const mapStateToProps = (state: AppState, props: CreditCardSelectionListContainerProps): CreditCardStorageSelectionProps => ({
	customerPaymentMethods: state.payment.customerPaymentMethods,
	...props
});

export default connect(mapStateToProps)(CreditCardSelectionList);

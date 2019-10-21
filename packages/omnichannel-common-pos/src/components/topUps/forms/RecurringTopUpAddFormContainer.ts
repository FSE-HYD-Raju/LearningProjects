"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";

import {
	RecurringTopUpAddFormProps,
	RecurringTopUpAddFormStateProps,
	RecurringTopUpAddFormActionProps,
	default as RecurringTopUpAddForm,
} from "./RecurringTopUpAddForm";
import { RecurringTopUpBaseFormProps } from "./RecurringTopUpBaseForm";
import actions from "../../../redux/actions";
import { AppState } from "../../../redux/reducers";
import ProductUtil from "../../../utils/product/ProductUtil";
import { RecurringTopUpUtil } from "../RecurringTopUpUtil";
import { RecurringTopUpModelType } from "../../../redux/types/RecurringTopUpModelType";

interface RecurringTopUpAddFormContainerProps {}

const mapStateToProps = (state: AppState): RecurringTopUpAddFormStateProps => ({
	phoneNumbersToAgreements: ProductUtil.getPhoneNumbersToAgreementsMap(state.digitalLife.agreements),
	recurringTopUpTypesByAgreementsIds: RecurringTopUpUtil.getNewRecurringTopUpTypesByAgreementsIds(state),
	isBasketSubmitted: state.recurringTopUp.isBasketSubmitted,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: RecurringTopUpAddFormContainerProps): RecurringTopUpAddFormActionProps => ({
	actions: {
		initialize: () => {
			dispatch(actions.recurringTopUp.resetNewTopUpProductOfferings());
			dispatch(actions.recurringTopUp.resetIsBasketSubmit());
		},
		getNewTopUpProductOfferings: (agreementId: string) => dispatch(actions.recurringTopUp.getNewTopUpProductOfferings(agreementId)),
		submitTopUp: (model: RecurringTopUpModelType) => dispatch(actions.recurringTopUp.submitNewTopUp(model)),
	},
});

const mergeProps = (
	stateProps: RecurringTopUpAddFormStateProps,
	dispatchProps: RecurringTopUpAddFormActionProps,
	viewOwnProps: RecurringTopUpBaseFormProps
): Pick<RecurringTopUpAddFormProps, Exclude<keyof RecurringTopUpAddFormProps, "schema">> => {
	return {
		...stateProps,
		...dispatchProps,
		...viewOwnProps,
	};
};

export { RecurringTopUpAddFormContainerProps };
export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(RecurringTopUpAddForm);

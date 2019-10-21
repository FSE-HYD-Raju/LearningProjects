"use strict";

import { AnyAction, Dispatch } from "redux";
import { connect } from "react-redux";

import {
	default as RecurringTopUpEditForm,
	RecurringTopUpEditFormActionProps,
	RecurringTopUpEditFormProps,
	RecurringTopUpEditFormStateProps,
} from "./RecurringTopUpEditForm";
import { RecurringTopUpBaseFormProps } from "./RecurringTopUpBaseForm";
import actions from "../../../redux/actions";
import { AppState } from "../../../redux/reducers";
import ProductUtil from "../../../utils/product/ProductUtil";
import { RecurringTopUpUtil } from "../RecurringTopUpUtil";
import { RecurringTopUpModelType } from "../../../redux/types/RecurringTopUpModelType";
import { Selectors } from "../../../redux";

const mapStateToProps = (state: AppState, viewOwnProps: RecurringTopUpBaseFormProps): RecurringTopUpEditFormStateProps => {
	const agreement =
		viewOwnProps.initialModel.subscription &&
		ProductUtil.getPhoneNumbersToAgreementsMap(state.digitalLife.agreements)[viewOwnProps.initialModel.subscription];
	return {
		agreementId: agreement && agreement.id,
		recurringTopUpTypes: (agreement && RecurringTopUpUtil.getNewRecurringTopUpTypesByAgreementsIds(state)[agreement.id]) || [],
		isBasketSubmitted: state.recurringTopUp.isBasketSubmitted,
		customerPaymentMethods: Selectors.digitalLife.getActiveCustomerPaymentMethods(state),
		editMode: true,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): RecurringTopUpEditFormActionProps => ({
	actions: {
		initialize: () => {
			dispatch(actions.recurringTopUp.resetNewTopUpProductOfferings());
			dispatch(actions.recurringTopUp.resetIsBasketSubmit());
		},
		getNewTopUpProductOfferings: (agreementId: string) => dispatch(actions.recurringTopUp.getNewTopUpProductOfferings(agreementId)),
		submitTopUp: (model: RecurringTopUpModelType) => dispatch(actions.recurringTopUp.submitExistingTopUp(model)),
		removeTopUp: (productId: string) => dispatch(actions.recurringTopUp.removeTopUp(productId)),
		getProductOffering: (productOfferingId: string) => dispatch(actions.productOfferings.getProductOffering(productOfferingId)),
	},
});

const mergeProps = (
	stateProps: RecurringTopUpEditFormStateProps,
	dispatchProps: RecurringTopUpEditFormActionProps,
	viewOwnProps: RecurringTopUpBaseFormProps
): Pick<RecurringTopUpEditFormProps, Exclude<keyof RecurringTopUpEditFormProps, "schema">> => {
	return {
		...stateProps,
		...dispatchProps,
		...viewOwnProps,
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(RecurringTopUpEditForm);

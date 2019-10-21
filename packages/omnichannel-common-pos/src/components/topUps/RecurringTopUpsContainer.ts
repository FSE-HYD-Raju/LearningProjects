import * as React from "react";
import {
	default as RecurringTopUps,
	RecurringTopUpsActionProps,
	RecurringTopUpsProps,
	RecurringTopUpsStateProps
} from "./RecurringTopUps";
import { AnyAction, Dispatch } from "redux";
import { connect } from "react-redux";
import { AppState } from "../../redux/reducers";
import { HasFlux } from "../../redux/types";
import actions from "../../redux/actions";
import { Selectors } from "../../redux";
import { flatten } from "lodash";

const mapStateToProps = (state: AppState): RecurringTopUpsStateProps => {
	return {
		user: state.user.user,
		showAlertMessage: false, // TODO: check recurringTopUp.actions.submitComplete
		selectedCurrency: state.currency.selectedCurrency,
		modelForAdd: Selectors.digitalLife.getRecurringTopUpModelForAdd(state),
		activePaymentMethods: Selectors.digitalLife.getActiveCustomerPaymentMethods(state),
		currentRecurringTopUps: flatten(
			(state.digitalLife.agreements || []).map(agreement =>
				Selectors.digitalLife.getRecurringTopUpProducts(
					state,
					agreement,
					state.feature.ecareRecurringTopUpsIdentifier,
					state.feature.recurringTopUpsAliases
				)
			)
		),
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: HasFlux): RecurringTopUpsActionProps => ({
	actions: {
		getPaymentMethods: () => dispatch(actions.payment.getCustomerPaymentMethods()),
		historyPush: (newLocation: string) => {
			dispatch(actions.router.push(newLocation));
		},
	},
});

const mergeProps = (stateProps: RecurringTopUpsStateProps, dispatchProps: RecurringTopUpsActionProps, ownProps: HasFlux): RecurringTopUpsProps => {
	const { flux, ...restOwnProps } = ownProps;

	return {
		...restOwnProps,
		...stateProps,
		...dispatchProps,
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(RecurringTopUps);

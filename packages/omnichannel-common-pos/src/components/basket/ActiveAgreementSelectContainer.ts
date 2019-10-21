"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { AppState } from "../../redux/reducers";
import {
	default as ActiveAgreementSelect,
	ActiveAgreementSelectActionProps,
	ActiveAgreementSelectStateProps,
	ActiveAgreementSelectProps
} from "./ActiveAgreementSelect";
import { HasFlux } from "../../redux/types";

interface ActiveAgreementSelectContainerOwnProps extends HasFlux {
	changeActiveAgreement?: (agreementCandidateId?: string | null, discardBasketFlag?: boolean) => void;
}

const mapStateToProps = (state: AppState): ActiveAgreementSelectStateProps => ({
	agreements: state.customerCase.agreements || state.digitalLife.agreements,
	isBasketRefreshing: state.digitalLife.isBasketRefreshing,
	activeAgreementId: state.customerCase.activeAgreementId || state.sales.activeAgreementId,
	basketLifeCycleStatusOpen: state.basket.activeBasket && state.basket.activeBasket.attributes.lifecycleStatus === "OPEN",
	customer: state.user.user,
	hasBasketItems: state.basket.basketItems && state.basket.basketItems.length > 0,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: ActiveAgreementSelectContainerOwnProps): ActiveAgreementSelectActionProps => {
	return {
		actions: {
			changeActiveAgreement: ownProps.changeActiveAgreement || ownProps.flux.actions.CustomerCaseActions.changeCustomerActiveAgreement,
			getAgreements: ownProps.flux.actions.DigitalLifeActions.getAgreements,
		}
	};
};

const mergeProps = (stateProps: ActiveAgreementSelectStateProps,
					dispatchProps: ActiveAgreementSelectActionProps,
					ownProps: ActiveAgreementSelectContainerOwnProps): ActiveAgreementSelectProps => {
	const { flux, ...restOwnProps } = ownProps;
	return {
		...stateProps,
		...dispatchProps,
		...restOwnProps,
	};
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ActiveAgreementSelect);
export {
	ActiveAgreementSelectContainerOwnProps
};

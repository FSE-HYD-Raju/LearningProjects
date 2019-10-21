import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { AppState } from "../../../redux/reducers";
import { get } from "lodash";
import {
	Agreement,
	HasFlux,
	Person,
	Product, ProductOffering, ProductPath,
} from "../../../redux/types";
import {
	default as AddNewPlanContainer,
	AddNewPlanContainerActionProps,
	AddNewPlanContainerStateProps,
	AddNewPlanContainerProps
} from "./AddNewPlanContainer";
import actions from "../../../redux/actions";

interface AddNewPlanContainerOwnProps extends HasFlux {
	agreement?: Agreement;
	subscription?: Product;
}

const mapStateToProps = (state: AppState, ownProps: AddNewPlanContainerOwnProps): AddNewPlanContainerStateProps => {
	const user: Person = get(state.customerCase, "activeCustomerCase.attributes.activeCustomer") || state.user.user;
	return {
		agreement: ownProps.agreement,
		subscription: ownProps.subscription,
		alternatePlans: state.sales.plans, // why is it called "alternatePlans" instead of just "plans"?
		configurations: state.productOfferingConfiguration.configurations,
		paymentInfo: state.sales.paymentInfo,
		individualId: get(user, "individualId"),
		submittedBasket: state.basket.submittedBasket,
		contextualPaymentMethodsWithExtraInfo: state.sales.eligiblePaymentMethods,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: AddNewPlanContainerOwnProps): AddNewPlanContainerActionProps => {
	const fluxActions = ownProps.flux.actions;
	return {
		actions: {
			discardBasket: fluxActions.BasketActions.discardBasket,
			submitBasket: fluxActions.BasketActions.submitBasket,
			resetNewPlanOrder: fluxActions.SalesActions.resetNewPlanOrder,
			resetConfigurations: () => {
				dispatch(actions.productOfferingConfiguration.resetConfigurations());
			},
			submitNewPlanOrder: fluxActions.SalesActions.submitNewPlanOrder,
			setInputtedCharacteristic: (path: ProductPath, key: string, value: string) => {
				dispatch(actions.productOfferingConfiguration.setInputtedCharacteristic(path, key, value));
			},
			toggleProductOffering: (path: ProductPath, forceToggle?: boolean) => {
				dispatch(actions.productOfferingConfiguration.toggleProductOffering(path, forceToggle));
			},
			selectProductOffering: (path: ProductPath, value: string, productOfferings: ProductOffering[]) => {
				dispatch(actions.productOfferingConfiguration.selectProductOffering(path, value, productOfferings));
			},
			initializeNewPlanOrder: fluxActions.SalesActions.initializeNewPlanOrder,
			getAvailablePlans: fluxActions.SalesActions.getAvailablePlans,
		}
	};
};

const mergeProps = (stateProps: AddNewPlanContainerStateProps,
					dispatchProps: AddNewPlanContainerActionProps,
					ownProps: AddNewPlanContainerOwnProps): AddNewPlanContainerProps => {
	const { flux, ...restOwnProps } = ownProps;
	return {
		...stateProps,
		...dispatchProps,
		...restOwnProps,
	};
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(AddNewPlanContainer);
export {
	AddNewPlanContainerOwnProps
};

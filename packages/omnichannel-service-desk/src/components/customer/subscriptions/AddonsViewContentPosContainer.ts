import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, AnyAction } from "redux";
import {
	AppState,
	HasFlux,
	AddonsViewContent,
	AddonsViewContentActionProps,
	AddonsViewContentStateProps,
	AddonsTabLifecycleFilter,
	Product,
	ProductOffering,
	FormattedMessageDescriptor,
	LifecycleChangeAction,
	actions,
	AddonsViewContentProps
} from "omnichannel-common-pos";

interface AddonsViewContentPosContainerProps {
	addons: Array<Product | ProductOffering>;
	agreementId: string;
	product: Product;
	lifecycleFilter: string;
	showActions: true;
	activeHeader?: FormattedMessageDescriptor;
	inactiveHeader?: FormattedMessageDescriptor;
}

const mapStateToProps = (state: AppState, ownProps: HasFlux & AddonsViewContentPosContainerProps): AddonsViewContentStateProps => {
	const { addons } = ownProps;

	return {
		activeAddons: ownProps.lifecycleFilter === AddonsTabLifecycleFilter.ACTIVE ? (addons as Array<Product>) : [],
		availableAddons: ownProps.lifecycleFilter === AddonsTabLifecycleFilter.AVAILABLE ? (addons as Array<ProductOffering>) : [],
		addonPaginationCount: 15,
		stateTransitionByActionName: state.lifecycle.stateTransitionByActionName || {}
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: HasFlux & AddonsViewContentPosContainerProps): AddonsViewContentActionProps => {
	return {
		actions: {
			getAlternateOfferingsForProduct: ownProps.flux.actions.SalesActions.getAlternateOfferingsForProduct,
			getAvailableAddonProducts: () => dispatch(actions.sales.getAvailableAddonProducts(ownProps.agreementId)),
			initializeStateTransition: (addon: Product, transition: LifecycleChangeAction) => {
				dispatch(actions.lifecycle.fetchReasons(transition.id, transition.targetType));
				dispatch(actions.lifecycle.setTransition(transition));
				dispatch(actions.lifecycle.setSelectedAddon(addon));
			}
		}
	};
};

const mergeProps = (stateProps: AddonsViewContentStateProps, dispatchProps: AddonsViewContentActionProps,
					ownProps: HasFlux & AddonsViewContentPosContainerProps): AddonsViewContentProps => {
	const { flux, addons, ...restOwnProps } = ownProps;

	return {
		...stateProps,
		...dispatchProps,
		...restOwnProps,
	};
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(AddonsViewContent);
export {
	AddonsViewContentPosContainerProps
};

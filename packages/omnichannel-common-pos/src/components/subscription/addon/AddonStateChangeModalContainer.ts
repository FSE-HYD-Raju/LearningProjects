import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { get } from "lodash";
import {
	InitializeAddonStateTransitionParam,
	Product,
} from "../../../redux/types";
import { AppState } from "../../../redux";
import { RouteComponentProps, withRouter } from "react-router";
import StateChangeModal, {
	StateChangeModalOwnProps, StateChangeModalProps,
	StateChangeModalStateProps
} from "../stateChange/StateChangeModal";
import actions from "../../../redux/actions";
import ProductUtil from "../../../utils/product/ProductUtil";
import ProductOfferingUtil from "../../../utils/ProductOfferingUtil";
import { CommonCustomizationPoints, withCustomization } from "../../../customization";

interface AddonStateChangeModalOwnProps extends RouteComponentProps<{subscriptionId: string}>, StateChangeModalOwnProps {}

interface AddonStateChangeModalStateProps extends StateChangeModalStateProps {
	tempProps: {
		customerAccountId: string;
		agreementId: string;
		basketId: string | undefined;
		addon: Product;
	};
}

const mapStateToProps = (state: AppState, ownProps: AddonStateChangeModalOwnProps):
	AddonStateChangeModalStateProps => {
	const agreementId = ownProps.match.params.subscriptionId;
	const customerAccountId = state.customerCase.activeCustomerCase
		? get(state.customerCase.activeCustomerCase, "attributes.activeCustomer.customerAccountId")
		: get(state.user, "user.id");

	const transition = state.lifecycle.transition!;
	const selectedAddon = state.lifecycle.selectedAddon;

	const tempProps: AddonStateChangeModalStateProps["tempProps"] = {
		customerAccountId,
		agreementId,
		basketId: state.lifecycle.serviceModification && state.lifecycle.serviceModification.basket
			? state.lifecycle.serviceModification.basket.id
			: undefined,
		addon: state.lifecycle.selectedAddon!
	};

	const name: string = (selectedAddon ? ProductUtil.getProductName(selectedAddon) : "") || "";
	const description = ProductOfferingUtil.getCommercialEnrichmentValueFromPO(selectedAddon, "descriptions", "detailed") || "";

	return {
		isAddon: true,
		shouldInitializeStateTransition: true,
		reasons: state.lifecycle.reasons || [],
		resultTransition: state.lifecycle.serviceModification
					&& state.lifecycle.serviceModification.resource
					&& state.lifecycle.serviceModification.resource.attributes
			? state.lifecycle.serviceModification.resource.attributes.stateTransition
			: undefined,
		currency: state.currency.selectedCurrency,
		name,
		description,
		transition,
		tempProps,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): { dispatch: Dispatch<AnyAction> } => {
	return { dispatch };
};

const mergeProps = (stateProps: AddonStateChangeModalStateProps, dispatchProps: { dispatch: Dispatch<AnyAction> },
					ownProps: AddonStateChangeModalOwnProps): StateChangeModalProps => {

	const { tempProps, ...restStateProps } = stateProps;

	const initializeStateTransition = (reason?: string, paymentMethodId?: string) => {
		const param: InitializeAddonStateTransitionParam = {
			agreementId: tempProps.agreementId,
			addon: tempProps.addon,
			stateTransition: stateProps.transition,
			customerAccountId:  tempProps.customerAccountId,
			paymentMethodId,
			reason
		};
		dispatchProps.dispatch(actions.lifecycle.initializeProductStateTransition(param));
	};

	const acceptStateTransition = (paymentMethodId: string | undefined) => {
		dispatchProps.dispatch(actions.lifecycle.acceptProductLifecycleStatusChange(tempProps.basketId!, paymentMethodId));
	};

	const cancelLifecycleStatusChange = () => {
		dispatchProps.dispatch(actions.lifecycle.cancelLifecycleStatusChange(tempProps.basketId!));
	};

	const resetStateModificationResult = () => {
		dispatchProps.dispatch(actions.lifecycle.resetStateModificationResult());
	};

	return {
		actions: {
			initializeStateTransition,
			acceptStateTransition,
			cancelLifecycleStatusChange,
			resetStateModificationResult,
		},
		requirePaymentMethodSelection: ownProps.requirePaymentMethodSelection,
		phoneNumber: ownProps.phoneNumber,
		requireReasonSelect: true,
		...restStateProps,
	};
};

const AddonStateChangeModalContainerBaseline = withRouter(connect(mapStateToProps, mapDispatchToProps, mergeProps)(StateChangeModal));

export default withCustomization<StateChangeModalOwnProps>(CommonCustomizationPoints.ADDON_STATE_CHANGE_MODAL, AddonStateChangeModalContainerBaseline);
export {
	AddonStateChangeModalContainerBaseline
};

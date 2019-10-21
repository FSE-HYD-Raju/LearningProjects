import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, AnyAction } from "redux";
import {
	RecurringTopUpConfigurationFormActionProps,
	RecurringTopUpConfigurationFormStateProps,
	default as RecurringTopUpConfigurationFormTS,
	RecurringTopUpConfigurationFormProps
} from "./RecurringTopUpConfigurationForm";
import { BasketItem, TopupType, CustomerPaymentMethod, HasFlux, ProductOfferingGroup } from "../../redux/types";
import { RecurringTopUpModelType } from "../../redux/types/RecurringTopUpModelType";
import { AppState } from "../../redux/reducers";
import actions from "../../redux/actions";

interface RecurringTopUpConfigurationContainerOwnProps extends HasFlux {
	pricesPerRow?: number;
	model?: RecurringTopUpModelType;
	customFooter?: React.ReactNode;
	customSubmit?: (model: RecurringTopUpModelType) => void;
	basketItemsOfParentProduct?: BasketItem;
	topUpProductOfferingGroup?: ProductOfferingGroup;
	setSelectedTopUpType?: (typeMessage: any) => void;
	paymentMethods?: Array<CustomerPaymentMethod>;
	phoneNumbers?: Array<string>;
	addToBasket?: boolean;
	onCancel?: (model: any) => void;
	handleStoreCustomerPaymentMethodSelection?: (isStored: boolean) => void;
}

const mapStateToProps = (state: AppState, ownProps: RecurringTopUpConfigurationContainerOwnProps): RecurringTopUpConfigurationFormStateProps => {
	return {
		pricesPerRow: ownProps.pricesPerRow || 4,
		customFooter: ownProps.customFooter,
		selectedCurrency: state.currency.selectedCurrency,
		basket: state.basket.activeBasket,
		basketItemsOfParentProduct: ownProps.basketItemsOfParentProduct,
		topUpProductOfferingGroup: ownProps.topUpProductOfferingGroup,
		model: ownProps.model,
		paymentMethods: ownProps.paymentMethods,
		allowUsingNewCreditCard: false,
		phoneNumbers: ownProps.phoneNumbers,
		addToBasket: ownProps.addToBasket,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: RecurringTopUpConfigurationContainerOwnProps):
	RecurringTopUpConfigurationFormActionProps => {

	const { flux } = ownProps;
	return {
		actions: {
			addProductToBasket: flux.actions.BasketActions.addProductToBasket,
			storeTopupProduct: (payload: TopupType | null) =>
				dispatch(actions.basket.storeTopupProduct(payload)),
			customSubmit: ownProps.customSubmit,
			onCancel: ownProps.onCancel,
			setSelectedTopupType: ownProps.setSelectedTopUpType,
			handleStoreCustomerPaymentMethodSelection: ownProps.handleStoreCustomerPaymentMethodSelection,
		},
	};
};

const mergeProps = (stateProps: RecurringTopUpConfigurationFormStateProps, dispatchProps: RecurringTopUpConfigurationFormActionProps,
	ownProps: RecurringTopUpConfigurationContainerOwnProps):
	Pick<RecurringTopUpConfigurationFormProps, Exclude<keyof RecurringTopUpConfigurationFormProps, "schema">> => {

	return {
		...stateProps,
		...dispatchProps
	};

};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(RecurringTopUpConfigurationFormTS);
export {
	RecurringTopUpConfigurationContainerOwnProps
};

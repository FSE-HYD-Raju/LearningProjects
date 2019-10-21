import CustomerBaskets, { CustomerBasketsActionProps, CustomerBasketsStateProps, BasketAndItems } from "./CustomerBaskets";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { AppState } from "../../../redux/reducers";
import { HasFlux, BasketItem } from "../../../redux/types";
import { get, isEmpty } from "lodash";
import { actions } from "../../../redux";
import { ErrorForModal } from "../../../redux/services/ErrorContainer";

const mapStateToProps = (state: AppState): CustomerBasketsStateProps => {
	return {
		unidentifiedCustomerBasketProduct: state.basket.unidentifiedCustomerBasket.product,
		basketData: get(state.customerCase, "customerBasketSelectData.customerBaskets"),
		agreements: get(state.customerCase, "agreements"),
		activeBasket: state.basket.activeBasket,
		activeCustomer: get(state.customerCase, "activeCustomerCase.attributes.activeCustomer"),
		activeAgreementId:  get(state.customerCase, "activeAgreementId"),
		configurations: state.productOfferingConfiguration.configurations
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: HasFlux): CustomerBasketsActionProps => {
	return {
		actions: {
			addProductToBasket: ownProps.flux.actions.BasketActions.addProductToBasket,
			discardBasket: ownProps.flux.actions.BasketActions.discardBasket,
			showErrorModal: (e: ErrorForModal) => {
				dispatch(actions.error.showErrorModal(e));
			},
			changeCustomerActiveAgreement: ownProps.flux.actions.CustomerCaseActions.changeCustomerActiveAgreement,
			getBasket: ownProps.flux.actions.BasketActions.getBasket,
			getBasketIncludeBasketItems: ownProps.flux.actions.BasketActions.getBasketIncludeBasketItems,
			updateOwnerToBasket:  ownProps.flux.actions.BasketActions.updateOwnerToBasket,
			endCustomerCase: ownProps.flux.actions.CustomerCaseActions.endCustomerCase,
			createNewCustomerCase: ownProps.flux.actions.CustomerCaseActions.createNewCustomerCase,
			clearCustomerBasketsData: ownProps.flux.actions.CustomerCaseActions.clearCustomerBasketsData,
			cancelAddProduct: ownProps.flux.actions.BasketActions.cancelAddProduct,
			historyPush: (newLocation: string) => dispatch(actions.router.push(newLocation))
		}
	};
};

const CustomerBasketsConnected = connect(mapStateToProps, mapDispatchToProps)(CustomerBaskets);

const CustomerBasketContainer: React.FC<HasFlux> = (props: HasFlux) => {
	const { CustomerCaseStore } = props.flux.stores;
	const customerBasketWithBasketItems = CustomerCaseStore && CustomerCaseStore.state.activeCustomerCase
		&& CustomerCaseStore.state.customerBasketSelectData && CustomerCaseStore.state.customerBasketSelectData.customerBaskets
		&& CustomerCaseStore.state.customerBasketSelectData.customerBaskets.filter((basketAndItems: BasketAndItems) =>
			basketAndItems.basketItems && basketAndItems.basketItems.filter((basketItem: BasketItem) =>
				!!get(basketItem, "attributes.basketProductId")
			).length > 0
		) || [];

	if (!isEmpty(customerBasketWithBasketItems)) {
		return <CustomerBasketsConnected flux={props.flux} />;
	} else {
		return null;
	}
};

export default CustomerBasketContainer;

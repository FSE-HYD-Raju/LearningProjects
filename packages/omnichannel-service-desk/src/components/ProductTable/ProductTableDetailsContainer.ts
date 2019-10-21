import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { AppState, HasFlux, ProductOffering, actions } from "omnichannel-common-pos";
import ProductTableDetailsWithMsisdnConfiguration, { ProductTableDetailsActionProps, ProductTableDetailsStateProps} from "./ProductTableDetails";

interface ProductTableDetailsContainerOwnProps extends HasFlux {
	product?: ProductOffering;
}

const mapStateToProps = (state: AppState,  ownProps: ProductTableDetailsContainerOwnProps): ProductTableDetailsStateProps => {
	const basketItems = state.basket.basketItems;
	const productTypeInBasket = basketItems && basketItems.map((basketItem) => {
		const basketProduct = basketItem.attributes && basketItem.attributes.product;
		return { specSubType: basketProduct && basketProduct.specSubType, productId: basketProduct && basketProduct.id };
	}) || [];
	const { product } = ownProps;
	const nonAddonProductPresentInBasket = !isEmpty(productTypeInBasket.filter(item => (
			item.productId === (product && product.id) && item.specSubType !== "ADDITIONAL")));
			
	return {
		activeBasket: state.basket.activeBasket,
		defaultStockLevel: state.salesRepSession.defaultStockLevel,
		errorToBeShownOnProductTable: state.error.errorToBeShownOnProductTable,
		nominationSubscriptionInformation: state.productOfferingConfiguration.nominationSubscriptionInformation,
		user: state.user.user,
		activeAgreementId: state.customerCase.activeAgreementId,
		activeCustomerCase: state.customerCase.activeCustomerCase,
		validIcc: state.basket.validIcc,
		validFnF: state.basket.validFnF,
		ICCIDPreactivationValidationPOs: state.feature.ICCIDPreactivationValidationPOs,
		showStockAvailability: state.feature.showStockAvailability,
		configurations: state.productOfferingConfiguration.configurations,
		nonAddonProductPresentInBasket,
		commercialProductOfferingId: state.feature.commercialProductOfferingId,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: ProductTableDetailsContainerOwnProps): ProductTableDetailsActionProps => ({
	actions: {
		clearErrorOnProductTable: () => {
			dispatch(actions.error.clearAddressValidationError());
		},
		addProductToBasket: ownProps.flux.actions.BasketActions.addProductToBasket,
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductTableDetailsWithMsisdnConfiguration);
export {
	ProductTableDetailsContainerOwnProps
};

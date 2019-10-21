import { get, cloneDeep } from "lodash";
import {
	BasketSelectionActionEnum,
	Basket,
	HasFlux,
	HasProduct,
	AddProductToBasketProps
} from "../../redux/types";

import isProductInBasket from "./isProductInBasket";
import BasketUtil from "../../utils/BasketUtil";
import ProductUtil from "../../utils/product/ProductUtil";
import { AppState } from "../../redux/reducers";

const getLatestCreatedBasket = (baskets?: Array<Basket>, activeBasket?: Basket | null): Basket | undefined => {
	if (!Array.isArray(baskets) || !baskets.length) {
		return undefined;
	}

	const clonedBaskets = cloneDeep(baskets);

	clonedBaskets.sort((a: Basket, b: Basket) => {
		const aDate = new Date(BasketUtil.getCreatedAt(a));
		const bDate = new Date(BasketUtil.getCreatedAt(b));
		return aDate.getTime() - bDate.getTime();
	});

	const head = clonedBaskets.shift();
	if (!activeBasket || !head || activeBasket.id !== head.id) {
		return head;
	}

	return clonedBaskets.shift();
};

const isBasketOwnedByUser = (basket: Basket, userId: string): boolean => {
	const basketOwnerUserId = BasketUtil.getBasketOwnerId(basket);
	return basketOwnerUserId === userId;
};

const isActiveBasketAmongTheseBaskets = (openBaskets: Array<Basket>, activeBasket: Basket): boolean => {
	return openBaskets.some(basket => basket.id === activeBasket.id);
};

const getActionByBasketStatus = (openBaskets?: Array<Basket>, currentUserId?: string, activeBasket?: Basket | null): BasketSelectionActionEnum => {
	const latestBasket = getLatestCreatedBasket(openBaskets, activeBasket);
	const isActiveBasketOwnedByLoggedInUser = Boolean(activeBasket && currentUserId && isBasketOwnedByUser(activeBasket, currentUserId));
	const lifecycleStatus = latestBasket && get(latestBasket, "attributes.lifecycleStatus", latestBasket.lifecycleStatus);

	if (activeBasket && latestBasket && !isActiveBasketOwnedByLoggedInUser) {
		return BasketSelectionActionEnum.ASK_USER_TO_CHOOSE;
	} else if (!activeBasket && lifecycleStatus === "OPEN") {
		return BasketSelectionActionEnum.SET_AN_OPEN_BASKET_AS_ACTIVE;
	} else if (activeBasket && !isActiveBasketOwnedByLoggedInUser && !latestBasket) {
		/* in this case getOpenBaskets request has not yet completed. */
		return BasketSelectionActionEnum.ASSIGN_ACTIVE_BASKET_TO_USER;
	} else if (lifecycleStatus === "COMMITTED" && !isActiveBasketOwnedByLoggedInUser) {
		return BasketSelectionActionEnum.ASK_USER_TO_CHOOSE;
	} else {
		return BasketSelectionActionEnum.DO_NOTHING;
	}
};

const constructAddToBasketFunction = <P = {}>(state: AppState, ownProps: P & HasProduct & HasFlux): AddProductToBasketProps => {
	return {
		onAddToBasket: () => {
			return ownProps.flux.actions.BasketActions.addProductToBasket({
				product: ownProps.product,
				configurations: state.productOfferingConfiguration.configurations,
				basketId: state.basket.activeBasket ? state.basket.activeBasket.id : undefined,
				hasCustomer: true,
				targetAgreementId: state.sales.activeAgreementId,
				hasTopUps: ProductUtil.hasTopUps(ownProps.product, state.feature.recurringTopUpsIdentifier)
			});
		}
	};
};

const BasketSelectors = {
	getActionByBasketStatus,
	getLatestCreatedBasket,
	isBasketOwnedByUser,
	constructAddToBasketFunction,
	isProductInBasket
};

export {
	HasProduct
};

export default BasketSelectors;

"use strict";

import { AppState } from "../../reducers";
import { all, call, put, race, select, take, takeLatest } from "redux-saga/effects";
import { delay } from "redux-saga";
import { basket, BasketActions, BasketActionPayload } from "./basket.actions";
import { Basket, User, BasketLifecycleStatusEnum, InitializedAddon, BasketItemIdToAddress } from "../../types";
import BasketService from "../../services/BasketService";
import PersonService from "../../services/PersonService";
import { AddonService, EnableAddonConfig } from "../../services/AddonService";
import { loadingOverlay } from "../loadingOverlay/loadingOverlay.actions";
import { toaster } from "../toaster/toaster.actions";
import { DigitalLifeActions, SalesActions } from "../../actions";
import actions from "../../actions";
import ProductsTerminateService from "../../services/ProductsTerminateService";
import { error } from "../error/error.actions";

const ADDON_INITIALIZE_LOADING_KEY = "ADDON_INITIALIZE_LOADING_KEY";
const ADDON_ENABLE_LOADING_KEY = "ADDON_ENABLE_LOADING_KEY";
const ADDON_DEACTIVATION_LOADING_KEY = "ADDON_DEACTIVATION_LOADING_KEY";

function* getUserBaskets(action: BasketActionPayload) {
	const individualId = action.individualId as string;
	try {
		const response = yield call(() => {
			return PersonService.getBaskets(individualId, [BasketLifecycleStatusEnum.OPEN, BasketLifecycleStatusEnum.COMMITTED], false);
		});

		const baskets = response.data;
		yield put(basket.getUserBasketsComplete(baskets));

		const activeBasket = yield select((state: AppState): Basket => state.basket && state.basket.activeBasket);
		const currentUser = yield select((state: AppState): User | undefined => state.user.user);

		yield put(basket.checkBaskets(baskets, currentUser, activeBasket));
	} catch (e) {
		yield put(basket.getUserBasketsFailed(e));
	}
}

function* assignBasketToUserAndDiscardAnotherBasket(action: BasketActionPayload) {
	const idOfBasketToDiscard = action.idOfBasketToDiscard as string;
	const basketToAssign = action.basket as Basket;
	const owner = action.owner as User;

	try {
		const assignationResponse = yield call(() => BasketService.updateOwnerToBasket(basketToAssign, owner));

		if (assignationResponse) {
			const basketAndBasketItems = yield call(() => BasketService.getBasketIncludeBasketItems(basketToAssign.id));

			if (idOfBasketToDiscard) {
				yield call(() => BasketService.delete(idOfBasketToDiscard));
			}
			yield put(basket.assignBasketToUserAndDiscardAnotherBasketComplete(basketAndBasketItems));
		} else {
			yield undefined;
		}
	} catch (e) {
		yield put(basket.assignBasketToUserAndDiscardAnotherBasketFailed(e));
	}
}

function* setBasketAsActiveBasket(action: BasketActionPayload) {
	const basketId = action.basketId as string;

	const response = yield call(() => {
		return BasketService.getBasketIncludeBasketItems(basketId);
	});

	yield put(basket.setBasketAsActiveBasketComplete(response));
}

function* createBasket(action: BasketActionPayload) {
	const individualId = action.individualId;

	try {
		const basket = yield call(() => BasketService.create({ userId: individualId }));
		yield put(basket.createBasketComplete(basket));
	} catch (e) {
		yield put(basket.createBasketFailed(e.detail));
	}
}

function* discardBasket(action: BasketActionPayload) {
	const { basketId, individualId, redirectUrl } = action;

	if (basketId) {
		try {
			const newBasket = yield call(() => BasketService.discardBasket(basketId, individualId));
			yield put(basket.discardBasketComplete(newBasket));
		} catch (e) {
			yield put(basket.discardBasketFailed(e.detail));
		} finally {
			if (redirectUrl) {
				yield put(actions.router.push(redirectUrl));
			}
		}
	}
}

function* getBasket(action: BasketActionPayload) {
	const basketId = action.basketId;

	if (basketId) {
		try {
			const basketAndBasketItems = yield call(() => BasketService.getBasketIncludeBasketItems(basketId));
			yield put(basket.getBasketComplete(basketAndBasketItems));
		} catch (e) {
			yield put(basket.getBasketFailed(e));
		}
	}
}

function* deleteItemFromBasket(action: BasketActionPayload) {
	const basketId = action.basketId;
	const basketItem = action.basketItem;

	if (basketItem && basketId) {
		try {
			yield put(basket.updatingBasket(true));
			yield put(basket.removeFromUIBasketComplete(basketItem));
			const deleteResp = yield call(() => BasketService.deleteBasketItemFromBasket(basketItem.id));

			if (!deleteResp) {
				try {
					const basketItemIdToAddressEntries: BasketItemIdToAddress[] = yield select((state: AppState) => state.basket.basketItemIdToAddressEntries);
					const basketProductId = basketItem.attributes && basketItem.attributes.basketProductId || basketItem.basketProductId;
					const newBasketItemIdToAddressEntries = basketItemIdToAddressEntries.filter(entry => entry.basketItemId != basketProductId);
					const getBasketData = yield call(() => BasketService.getBasket(basketId));
					yield put(basket.getBasketAfterDeleteComplete(getBasketData.data));
					yield put(basket.updateBasketItemIdToAddressEntries(newBasketItemIdToAddressEntries));
				} catch (e) {
					yield put(basket.updatingBasket(false));
					yield put(error.showErrorModal(e));
				}
			}
		} catch (e) {
			try {
				yield put(error.showErrorModal(e));
				const basketAndBasketItems = yield call(() => BasketService.getBasketIncludeBasketItems(basketId));
				yield put(basket.getBasketIncludeAfterDeleteComplete(basketAndBasketItems));
			} catch (e) {
				yield put(error.showErrorModal(e));
			}
		} finally {
			if (!action.shippingMethodFromBasket) {
				yield put(basket.removeShippingMethodsComplete(basketItem));
			}
		}
	}
}

function* initializeEnableAddon(action: BasketActionPayload) {
	yield put(loadingOverlay.showLoadingOverlay(ADDON_INITIALIZE_LOADING_KEY));
	try {
		const initializedAddon: InitializedAddon = yield call(AddonService.initializeAddon, action.initializeAddonConfig!);

		if (!initializedAddon.basketId) {
			console.error("No basketId returned on addon initialization");
			return;
		}

		yield put(basket.initializeEnableAddonComplete(initializedAddon));
	} catch (e) {
		yield put(basket.initializeEnableAddonComplete(undefined));
	} finally {
		yield put(loadingOverlay.hideLoadingOverlay(ADDON_INITIALIZE_LOADING_KEY));
	}
}

function* enableAddon(action: BasketActionPayload) {
	const enableAddonConfig: EnableAddonConfig = action.enableAddonConfig!;
	yield put(loadingOverlay.showLoadingOverlay(ADDON_ENABLE_LOADING_KEY));
	try {
		const paymentCompleted: boolean = yield call(AddonService.enableAddon, enableAddonConfig);
		const targetAgreementId = action.enableAddonConfig && action.enableAddonConfig.targetAgreementId;
		const delayAfterBasketSubmission: number = yield select((state: AppState) => state.feature.delayAfterBasketSubmission);
		if (targetAgreementId) {
			yield delay(delayAfterBasketSubmission);
			yield put(actions.digitalLife.getAgreementById(targetAgreementId));
			yield put(actions.sales.getAvailableAddonProducts(targetAgreementId));
			yield all([
				race({
					completeAgreement: take(DigitalLifeActions.GET_AGREEMENT_COMPLETE),
					failAgreement: take(DigitalLifeActions.GET_AGREEMENT_FAIL),
				}),
				race({
					completeAddons: take(SalesActions.GET_AVAILABLE_ADDON_PRODUCTS_COMPLETE),
					failAddons: take(SalesActions.GET_AVAILABLE_ADDON_PRODUCTS_FAILED),
				}),
			]);
		}

		yield put(basket.enableAddonComplete(paymentCompleted));
		yield delay(1000);
		yield put(basket.clearAddonInitialization());
		if (action.messages && action.messages.successMessage) {
			yield put(toaster.showSuccess(action.messages.successMessage));
		}
	} catch (e) {
		yield put(basket.initializeEnableAddonComplete(undefined));
		if (action.messages && action.messages.errorMessage) {
			yield put(toaster.showError(action.messages.errorMessage));
		}
	} finally {
		yield put(loadingOverlay.hideLoadingOverlay(ADDON_ENABLE_LOADING_KEY));
	}
}

function* deactivateAddon(action: BasketActionPayload) {
	yield put(loadingOverlay.showLoadingOverlay(ADDON_DEACTIVATION_LOADING_KEY));
	try {
		const { productId, targetAgreementId } = action;
		if (!productId || !targetAgreementId) {
			console.error("Missing productId on deactivate addon");
			return;
		}
		yield call(ProductsTerminateService.terminateProduct, productId);

		const delayAfterBasketSubmission: number = yield select((state: AppState) => state.feature.delayAfterBasketSubmission);
		yield delay(delayAfterBasketSubmission);
		yield put(actions.digitalLife.getAgreementById(targetAgreementId));
		yield put(actions.sales.getAvailableAddonProducts(targetAgreementId));
		yield all([
			race({
				completeAgreement: take(DigitalLifeActions.GET_AGREEMENT_COMPLETE),
				failAgreement: take(DigitalLifeActions.GET_AGREEMENT_FAIL),
			}),
			race({
				completeAddons: take(SalesActions.GET_AVAILABLE_ADDON_PRODUCTS_COMPLETE),
				failAddons: take(SalesActions.GET_AVAILABLE_ADDON_PRODUCTS_FAILED),
			}),
		]);
	} catch (e) {
		console.error(e);
	} finally {
		yield put(loadingOverlay.hideLoadingOverlay(ADDON_DEACTIVATION_LOADING_KEY));
	}
}

export function* basketSaga(): any {
	yield all([
		takeLatest(BasketActions.GET_USER_BASKETS, getUserBaskets),
		takeLatest(BasketActions.ASSIGN_BASKET_TO_USER_AND_DISCARD_ANOTHER_BASKET, assignBasketToUserAndDiscardAnotherBasket),
		takeLatest(BasketActions.SET_BASKET_AS_ACTIVE_BASKET, setBasketAsActiveBasket),
		takeLatest(BasketActions.CREATE_BASKET, createBasket),
		takeLatest(BasketActions.DISCARD_BASKET, discardBasket),
		takeLatest(BasketActions.GET_BASKET, getBasket),
		takeLatest(BasketActions.DELETE_ITEM_FROM_BASKET, deleteItemFromBasket),
		takeLatest(BasketActions.INITIALIZE_ENABLE_ADDON, initializeEnableAddon),
		takeLatest(BasketActions.ENABLE_ADDON, enableAddon),
		takeLatest(BasketActions.DEACTIVATE_ADDON, deactivateAddon),
	]);
}

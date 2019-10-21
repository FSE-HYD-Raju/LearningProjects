"use strict";

import { all, call, put, takeLatest, select } from "redux-saga/effects";
import { productLoan, ProductLoanActionPayload, ProductLoanActions } from "./productLoan.actions";
import ContextualProductService from "../../services/ContextualProductService";
import { PRODUCT_LOAN_INITIALIZE_LOADING_KEY } from "./productLoan.types";
import { loadingOverlay } from "../loadingOverlay/loadingOverlay.actions";
import { InitializedAddon, ProductOffering } from "../../types";
import ProductOfferingUtil from "../../../utils/ProductOfferingUtil";
import { AppState } from "../../reducers";
import { AddonService } from "../../services/AddonService";
import BasketService from "../../services/BasketService";

const PAYMENT_METHOD_ID = "balance";

function* onGetAvailableLoans(action: ProductLoanActionPayload) {
	const { agreementId } = action;
	if (!agreementId) {
		console.error("Arguments are not set for productLoan.saga.onGetAvailableLoans");
		return;
	}
	const loanCategoryId = yield select(
		(state: AppState) => state.feature.ecareProductLoan && state.feature.ecareProductLoan.loanCategoryId
	);
	if (!loanCategoryId) {
		return;
	}
	yield put(loadingOverlay.showLoadingOverlay(PRODUCT_LOAN_INITIALIZE_LOADING_KEY));
	try {
		const loans: ProductOffering[] = yield call(
			ContextualProductService.getAvailableAddonProducts,
			agreementId,
			loanCategoryId,
			["allowances"]
		);
		yield put(productLoan.getAvailableLoansComplete(ProductOfferingUtil.makeDefaultSelections(loans)));
	} catch (e) {
		console.error(e);
		yield put(productLoan.getAvailableLoansComplete([]));
	} finally {
		yield put(loadingOverlay.hideLoadingOverlay(PRODUCT_LOAN_INITIALIZE_LOADING_KEY));
	}
}

function* onConfirmLoanActivation(action: ProductLoanActionPayload) {
	let basketId;
	const { initializeAddonConfig } = action;
	if (!initializeAddonConfig) {
		console.error("Arguments are not set for productLoan.saga.onConfirmLoanActivation");
		return;
	}
	yield put(loadingOverlay.showLoadingOverlay(PRODUCT_LOAN_INITIALIZE_LOADING_KEY));
	try {
		const initializedAddon: InitializedAddon = yield call(AddonService.initializeAddon, initializeAddonConfig);
		if (!initializedAddon.basketId) {
			console.error("No basketId returned on addon initialization");
			yield put(productLoan.hideLoanActivationModal());
			return;
		}
		basketId = initializedAddon.basketId;
		if (!initializedAddon.paymentMethods || !initializedAddon.paymentMethods.find(paymentMethod => paymentMethod.id === PAYMENT_METHOD_ID)) {
			console.error("Balance payment method is not allowed. Can't continue");
			try {
				yield call(BasketService.delete, basketId);
			} catch (e) {}
			yield put(productLoan.hideLoanActivationModal());
			return;
		}
		const enableAddonConfig = {
			basketId,
			paymentMethod: PAYMENT_METHOD_ID
		};
		yield call(AddonService.enableAddon, enableAddonConfig);
		yield put(productLoan.hideLoanActivationModal());
	} catch (e) {
		console.error(e);
		if (basketId) {
			yield call(BasketService.delete, basketId);
		}
	} finally {
		yield put(loadingOverlay.hideLoadingOverlay(PRODUCT_LOAN_INITIALIZE_LOADING_KEY));
	}
}

export function* productLoanSaga(): Iterable<any> {
	yield all([
		takeLatest(ProductLoanActions.GET_AVAILABLE_LOANS, onGetAvailableLoans),
		takeLatest(ProductLoanActions.CONFIRM_LOAN_ACTIVATION, onConfirmLoanActivation)
	]);
}

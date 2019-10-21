import { all, call, put, takeLatest } from "redux-saga/effects";
import { lifecycle, LifecycleActionPayload, LifecycleActions } from "./lifecycle.actions";
import { OrderCancel, ProductModificationResult, Reason, ServiceModificationInitializationResult } from "../../types";
import ServiceModificationService from "../../services/ServiceModificationService";
import BasketService from "../../services/BasketService";
import { ProductModificationService } from "../../services";
import ReasonsService from "../../services/ReasonsService";
import OrdersService from "../../services/OrdersService";
import { digitalLife } from "../digitalLife/digitalLife.actions";

function* onInitializeServiceStateTransition(action: LifecycleActionPayload): Iterable<any> {
	const { initializeServiceStateTransitionsParam } = action;
	try {

		const result: ServiceModificationInitializationResult =
			yield call(() => {
				return ServiceModificationService.initializeServiceStateTransition(initializeServiceStateTransitionsParam!);
			});
		yield put(lifecycle.initializeServiceStateTransitionComplete(result));
	} catch (e) {
		yield put(lifecycle.initializeServiceStateTransitionComplete());
	}
}

function* onAcceptServiceLifecycleStatusChange(action: LifecycleActionPayload): Iterable<any> {
	const { basketId } = action;
	try {

		yield call(() => {
				return ServiceModificationService.acceptServiceLifecycleStatusChange(basketId!);
			});
		yield put(lifecycle.acceptServiceLifecycleStatusChangeComplete());
	} catch (e) {
		yield put(lifecycle.acceptServiceLifecycleStatusChangeComplete());
	}
}

function* onCancelLifecycleStatusChange(action: LifecycleActionPayload): Iterable<any> {
	const { basketId } = action;
	try {

		yield call(() => {
			return BasketService.delete(basketId!);
		});
		yield put(lifecycle.cancelLifecycleStatusChangeComplete());
	} catch (e) {
		yield put(lifecycle.cancelLifecycleStatusChangeComplete());
	}
}

function* onInitializeProductStateTransition(action: LifecycleActionPayload): Iterable<any> {
	const { initializeProductStateTransitionsParam } = action;
	try {

		const result: ProductModificationResult =
			yield call(() => {
				return ProductModificationService.initializeProductStateTransition(initializeProductStateTransitionsParam!);
			});
		yield put(lifecycle.initializeProductStateTransitionComplete(result));
	} catch (e) {
		yield put(lifecycle.initializeProductStateTransitionComplete());
	}
}

function* onAcceptAddonLifecycleStatusChange(action: LifecycleActionPayload): Iterable<any> {
	const { basketId, paymentMethodId } = action;
	try {

		yield call(() => {
			return ProductModificationService.acceptProductLifecycleStatusChange(basketId!, paymentMethodId);
		});
		yield put(lifecycle.acceptProductLifecycleStatusChangeComplete());
	} catch (e) {
		yield put(lifecycle.acceptProductLifecycleStatusChangeComplete());
	}
}

function* onFetchReasons(action: LifecycleActionPayload): Iterable<any> {
	const { basketId, paymentMethodId } = action;
	try {

		const reasons: Array<Reason> =
			yield call(() => {
				return ReasonsService.fetchReasons(action.reasonId, action.reasonType!);
			});
		yield put(lifecycle.fetchReasonsComplete(reasons));
	} catch (e) {
		yield put(lifecycle.fetchReasonsComplete([]));
	}
}

function* onCancelOrder(action: LifecycleActionPayload): Iterable<any> {
	const { orderId, reasonId } = action;
	try {

		const orderCancel: OrderCancel = yield call(() => {
			return OrdersService.cancelOrder(orderId!, reasonId!);
		});

		yield put(digitalLife.updatePersonOrderStatus(orderCancel));
		yield put(lifecycle.cancelOrderComplete(orderCancel));
	} catch (e) {
		yield put(lifecycle.cancelOrderComplete());
	}
}

export function* lifecycleSaga(): Iterable<any> {
	yield all([
		takeLatest(LifecycleActions.INITIALIZE_SERVICE_STATE_TRANSITION, onInitializeServiceStateTransition),
		takeLatest(LifecycleActions.ACCEPT_SERVICE_LIFECYCLE_CHANGE, onAcceptServiceLifecycleStatusChange),
		takeLatest(LifecycleActions.CANCEL_LIFECYCLE_STATE_CHANGE, onCancelLifecycleStatusChange),
		takeLatest(LifecycleActions.INITIALIZE_PRODUCT_STATE_TRANSITION, onInitializeProductStateTransition),
		takeLatest(LifecycleActions.ACCEPT_PRODUCT_LIFECYCLE_CHANGE, onAcceptAddonLifecycleStatusChange),
		takeLatest(LifecycleActions.FETCH_REASONS, onFetchReasons),
		takeLatest(LifecycleActions.CANCEL_ORDER, onCancelOrder),
	]);
}

import { AppState } from "../../reducers";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { CustomerAccountsService, LocationService, BasketService, PersonService } from "../../services";
import { posCheckout, PosCheckoutActions, PosCheckoutActionPayload } from "./posCheckout.actions";
import { customerCase } from "../customerCase/customerCase.actions";
import { BasketItemIdToAddress, BasketItems, BasketItem } from "../../types";
import { basket } from "../basket/basket.actions";

const getBasketItems = (state: AppState): BasketItems => {
	return state.basket.basketItems;
};

function* onConfirmCustomerDetails(action: PosCheckoutActionPayload) {
	try {
		const individualId: string = action.individualId as string;
		let customerAccountNumber = yield select((state: AppState) => (state.customerCase.customerAccountNumber));
		yield put(posCheckout.confirmCustomerDetailsStart());
		let customerAccountId = yield select((state: AppState) => (state.customer.activeCustomerAccount &&
			state.customer.activeCustomerAccount.id) || state.customerCase.customerAccountId);
		if (!customerAccountId) {
			const customerAccountCreationResponse = yield call(() => {
				return CustomerAccountsService.create(individualId);
			});
			customerAccountId = customerAccountCreationResponse.id;
			customerAccountNumber = customerAccountCreationResponse.attributes.accountId;
		}
		yield put(customerCase.createCustomerAccountComplete(customerAccountId, customerAccountNumber));
		const basketItemIdToAddressEntries: BasketItemIdToAddress[] =
				yield select((state: AppState) => state.basket.basketItemIdToAddressEntries);
		const installationAddressDefaultLocationType =
			yield select((state: AppState) => state.posCheckout.installationAddressDefaultLocationType);
		const basketItems = yield select(getBasketItems);

		for (const entry of basketItemIdToAddressEntries) {
			const { basketItemId, address } = entry;
			const basketItemPresent = basketItems.some((item: BasketItem) => item.attributes && item.attributes.basketProductId === basketItemId);

			if (basketItemPresent) {
				const locationCreationResponse = yield call(() => {
					return LocationService.create({
						customerAccountId,
						locationType: installationAddressDefaultLocationType,
						postalAddressList: [address],
					});
				});
				yield call(() => {
					return BasketService.updateBasketProduct(
						basketItemId,
						{
							attributes: {
								inputtedCharacteristics: {
									CH_Installation_Location_ID: locationCreationResponse.id
								}
							}
						}
					);
				});
			}
		}
		yield put(posCheckout.confirmCustomerDetailsComplete());
		yield put(basket.resetAddressWithBasketItemIdEntries());
	} catch (e) {
		yield put(posCheckout.confirmCustomerDetailsFailed());
	}
}

export function* posCheckoutSaga(): Iterable<any> {
	yield all([
		takeLatest(PosCheckoutActions.CONFIRM_CUSTOMER_DETAILS, onConfirmCustomerDetails)
	]);
}

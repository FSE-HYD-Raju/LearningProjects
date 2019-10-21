import { debounce } from "lodash";
import isClient from "../utils/isClient";

const persistToStorageUtil = (alt, storageName) => {
	alt.FinalStore.listen(() => {
		if (isClient) {
			setSessionStorageState(storageName, alt);
		}
	});
};

const persistToStorage = (storageName, alt) => {
	if (isClient) {
		// persist only partially since full snapshot is too much for browsers to handle
		const stores = [
			"BasketStore",
			"DigitalLifeStore",
			"PaymentStore",
			"UserStore",
			"CustomerStore",
			"CustomerCaseStore",
			"POSCheckoutStore",
			"SalesRepSessionStore",
			"B2CCheckoutStore",
			"CMSAdminStore"
		];
		const snapShot = alt.takeSnapshot(
			...stores.filter(store => {
				return alt.stores.hasOwnProperty(store);
			})
		);
		sessionStorage.setItem(storageName, snapShot);
	}
};

const setSessionStorageState = debounce(
	(storageName, alt) => {
		persistToStorage(storageName, alt);
	},
	1000,
	{ trailing: true, leading: false }
);

export { persistToStorageUtil, persistToStorage, setSessionStorageState };

//@flow
import { TestUtils } from "../../../testUtils";

const { makeStore } = TestUtils;

class FluxMock {
	flux: Object;
	constructor(stores: Object, actions: Object) {
		this.flux = {};
		this.flux.stores = FluxMock.mockStores(stores);
		this.flux.actions = { ...actions };
		this.flux.setReduxStore = store => {
			this.flux.reduxStore = store;
		};
	}

	static mockStores(stores: Object) {
		return Object.keys(stores).reduce((acc, key) => {
			acc[key] = makeStore("context.flux.stores" + key, stores[key]);
			return acc;
		}, {});
	}
}

export default FluxMock;

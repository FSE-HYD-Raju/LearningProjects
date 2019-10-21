import Alt from "alt";
import makeFinalStore from "alt-utils/lib/makeFinalStore";
import axios from "axios";
import Apicalls from "../utils/Apicalls";
import CmsApiCalls from "../components/cms/utils/CmsApiCalls";
import * as Actions from "./actions/index";
import AltResolver from "./alt-resolver";
import * as Stores from "./stores/index";
import ReactDOM from "react-dom";

const batchedUpdates = ReactDOM.unstable_batchedUpdates;

const stores = Stores,
	actions = Actions;

class Flux extends Alt {
	constructor(config = {}, customActions, customStores) {
		super(config);
		this.history = config.history;
		// Batches dispatches - should help with performance and make using action.defer() unnecessary
		this.batchingFunction = batchedUpdates;

		// Bind AltResolve to flux instance
		//   - access to it in actions with `alt.resolve`
		//     for resolving async actions before server render

		this.resolver = new AltResolver();
		this.resolve = this.resolver.resolve.bind(this.resolver);

		this.axios = axios;
		this.axiosIndicatorInstance = axios.create();
		this.apiCalls = new Apicalls(axios);
		this.cmsApiCalls = new CmsApiCalls(axios, this.axiosIndicatorInstance);

		// Load actions into alt
		Object.keys(actions)
			.filter(
				key => !customActions || !(key in Object.keys(customActions))
			)
			.forEach(key => this.addActions(key, actions[key]));

		// Load custom actions into alt
		if (customActions) {
			Object.keys(customActions).forEach(key =>
				this.addActions(key, customActions[key])
			);
		}

		const allStores = Object.assign(stores, customStores);
		// Load stores into alt
		Object.keys(allStores)
			.sort()
			.forEach(key => {
				this.addStore(key, stores[key]);
			});

		// Our `FinalStore` for using `connect-alt`
		this.FinalStore = makeFinalStore(this);
		// console.log("FLUX INSTANCE", this);
	}

	setReduxStore(store) {
		this.reduxStore = store;
		return this;
	}
}

export default function(config, customActions, customStores) {
	return new Flux(config, customActions, customStores);
}

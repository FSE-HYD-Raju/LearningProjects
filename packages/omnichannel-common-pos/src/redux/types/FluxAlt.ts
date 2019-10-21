import { Store } from "redux";
import { AppState } from "../reducers";
import { FluxStore } from "./FluxStore";
import Alt = AltJS.Alt;
import { History } from "history";

export interface FluxAlt<S extends AppState> extends Alt {
	reduxStore: Store<S>;
	stores: Record<string, FluxStore<any>>;
	actions: Record<string, any>;
	history: History;
	resolver: any;
	resolve: (...args: any[]) => any;
	axios: any;
	apiCalls: any;
	setReduxStore(store: Store<S>): this;

}

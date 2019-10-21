import { Store } from "redux";
import { AppActions } from "../actions";
import { AppState } from "../reducers";
import { Disposers } from "./Disposers";
import { FluxAlt } from "./FluxAlt";
import { FluxReduxMap } from "./FluxReduxMap";

export type ConnectFluxReduxType = <T extends AppState, A extends AppActions>
	(flux: FluxAlt<T>,
		store: Store<T>,
		fluxMap: Partial<FluxReduxMap<T>>,
		actions: Partial<A>) => Disposers;

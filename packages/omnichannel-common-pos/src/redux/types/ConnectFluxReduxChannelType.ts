import { Store } from "redux";
import { AppActions } from "../actions";
import { AppState } from "../reducers";
import { Disposers } from "./Disposers";
import { FluxAlt } from "./FluxAlt";
import { FluxReduxMap } from "./FluxReduxMap";

export type ConnectFluxReduxChannelType = <T extends AppState, A extends AppActions>
	(flux: FluxAlt<T>,
		store: Store<T>,
		fluxMap: Partial<FluxReduxMap<T>>,
		extendedActions: Partial<A> | null) => Disposers;

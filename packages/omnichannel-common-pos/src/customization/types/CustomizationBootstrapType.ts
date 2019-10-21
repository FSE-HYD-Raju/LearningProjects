import { ConnectFluxReduxChannelType, FluxAlt, StoreConfig, AppState } from "../../redux";
import { CustomizationPointsMapping } from "./CustomizationPointsMapping";
import { Store } from "react-redux";

export type GetStoreConfig<S extends AppState> = {
	reducers?: object|undefined;
	customSaga?: StoreConfig<S>["customSaga"]|null;
	interceptReducers?: StoreConfig<S>["interceptReducers"]|undefined;
	history?: StoreConfig<S>["history"]|undefined;
	initialState?: StoreConfig<S>["initialState"]|undefined;
};

export interface CustomizationBootstrapType<S extends AppState> {
	getFlux: <S>(fluxCustomization: {
		customizedStores?: Record<string, any>,
		customizedActions?: Record<string, any>,
	}) => FluxAlt<S & AppState>;
	getStore: <S>(config: GetStoreConfig<S & AppState>) => Store<S>;
	connectFluxReduxChannel: ConnectFluxReduxChannelType;
	customizationPointsMapping: CustomizationPointsMapping<S>;
}

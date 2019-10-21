import * as React from "react";
import { Store } from "redux";
import { FluxAlt, AppState } from "../redux";
import Bootstrapper from "./FluxBootstrapper";

export interface AppComponentProps<S extends AppState> {
	flux: FluxAlt<S>;
	store: Store<S>;
}

export interface RootProviderProps<S extends AppState> extends AppComponentProps<S> {
	application: React.ComponentClass<AppComponentProps<S>>;
}

const RootProvider: React.FC<RootProviderProps<any>> = (props) => {
	const { application, flux, store } = props;
	const AppComponent = application;
	return (
		<Bootstrapper>
			<AppComponent flux={flux} store={store}/>
		</Bootstrapper>
	);
};

export default RootProvider;

import { ComponentType, StatelessComponent } from "react";
import { CustomizationFunction } from "./CustomizationFunction";
import { InterceptReducers, AppState, StoreConfig } from "../../redux";

export type CustomizationPointsMappingComponents = Record<string, ComponentType<any> | StatelessComponent<any>>;

export type CustomizationPointsMapping<S extends AppState> = Partial<{
	components: CustomizationPointsMappingComponents;
	schemas: Record<string, any>;
	flux: {
		stores: Record<string, any>;
		actions: Record<string, any>;
	};
	redux: {
		reducers: object;
		saga: (() => Iterator<any>)|null;
		fluxStoreToReduxMap: object;
		extendedActions: object;
		interceptReducers: StoreConfig<S>["interceptReducers"];
	},
	functions: Record<string, CustomizationFunction>,
	classes: Record<string, new (...args: any[]) => any>;
	objects: Record<string, any>;
}>;

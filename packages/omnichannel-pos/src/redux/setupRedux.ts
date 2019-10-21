"use strict";

import { omit, isEmpty } from "lodash";
import { Store, AnyAction } from "redux";
import {
	actions,
	connectFluxRedux,
	getDefaultFluxStoreMap,
	AppState,
	FluxReduxMap,
	FluxAlt,
	AppActions,
	actionTypes,
	ConnectFluxReduxChannelType,
	RecipeId,
	EligibilityDecisionUseCase,
	MsisdnSelectionUseCase
} from "omnichannel-common-pos";

// Flux store could be extended here by custom stores and custom actions
// Custom actions should be defined
export const fluxStoreToReduxMap: Partial<FluxReduxMap<AppState>> = omit(getDefaultFluxStoreMap(), [
	"B2CCheckoutStore"
]);

export const connectFluxReduxChannel: ConnectFluxReduxChannelType = <T extends AppState, A extends AppActions>(
	flux: FluxAlt<T>,
	store: Store<T, AnyAction>,
	customFluxStoreToReduxMap: FluxReduxMap<T>,
	extendedActions: Partial<A> | null
) => {
	const fluxMap: Partial<FluxReduxMap<T>> = { ...fluxStoreToReduxMap, ...customFluxStoreToReduxMap };
	const allActions: Partial<A> = isEmpty(extendedActions) ? actions as A : extendedActions as Partial<A>;
	return connectFluxRedux<T, A>(flux, store, fluxMap, allActions);
};

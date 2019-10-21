"use strict";

import { UriLocationActionPayload, UriLocationActions } from "./uriLocation.actions";

export type UriLocationState = {
	pathname: string;
	path: string;
	query: string;
};

const initialState: UriLocationState = {
	pathname: "",
	path: "",
	query: ""
};

const uriLocationReducer = (state: Partial<UriLocationState> = initialState, action: UriLocationActionPayload) => {
	const { type } = action;
	switch (type) {
		case UriLocationActions.SET_PATHNAME:
			return {
				...state,
				pathname: action.pathname
			};
		case UriLocationActions.SAVE_URI:
			return { ...state, ...action.location };
		default:
			return state;
	}
};

export default uriLocationReducer;

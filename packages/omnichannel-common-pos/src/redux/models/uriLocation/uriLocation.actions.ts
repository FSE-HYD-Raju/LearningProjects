"use strict";

import { Action } from "redux";

export enum UriLocationActions {
	SAVE_URI = "UriLocation_SAVE_URI",
	SET_PATHNAME = "UriLocation_SET_PATHNAME"
}

export interface UriLocationActionPayload extends Action<UriLocationActions> {
	fluxState?: any;
	error?: string;
	pathname?: string;
	location: {
		path: string;
		query: string;
	};
}

export const uriLocation = {
	setPathname: (pathname: string) => ({
		type: UriLocationActions.SET_PATHNAME,
		pathname
	}),
	saveUri: (path: string, query: string) => ({
		type: UriLocationActions.SAVE_URI,
		location: { path, query }
	})
};

"use strict";

import { Action } from "redux";

export enum SessionActions {
	PERSIST_STATE_TO_STORAGE = "SessionActions_PERSIST_STATE_TO_STORAGE",
	SAVE_USER = "SessionActions_SAVE_USER",
}

export interface SessionActionPayload extends Action<SessionActions> {
	error?: string;
}

export const session = {
	persistToStorage: () => ({type: SessionActions.PERSIST_STATE_TO_STORAGE}),
	saveUser: () => ({
		type: SessionActions.SAVE_USER,
	}),
};

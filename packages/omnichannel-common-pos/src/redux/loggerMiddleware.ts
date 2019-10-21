"use strict";

import { Store, AnyAction, Dispatch } from "redux";
import { createLogger } from "redux-logger";

let LOGS_ON = false;
const isDev = process.env.NODE_ENV === "development";

const isLogsOn = (): boolean => LOGS_ON;
const setLogs = (value: boolean) => LOGS_ON = value;

const logger = createLogger({diff: true, collapsed: true});

const loggerMiddleware: any = (store: Store) => (next: Dispatch<AnyAction>) => (action: any) => {
	return LOGS_ON ?
		logger(store)(next)(action) :
		next(action);
};

const enrichRunLogs = (store: Store) => {
	if (!isDev) {
		return;
	}

	Object.assign(store, {
		_runLogs: () => setLogs(true),
		_muteLogs: () => setLogs(false),
	});
};

export {
	isDev,
	isLogsOn,
	setLogs,
	loggerMiddleware,
	enrichRunLogs
};

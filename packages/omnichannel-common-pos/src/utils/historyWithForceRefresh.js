import isClient from "./isClient";
import { createBrowserHistory, createMemoryHistory } from "history";

const historyOptions = { forceRefresh: true };

const historyWithForceRefresh = isClient
	? createBrowserHistory(historyOptions)
	: createMemoryHistory();

export default historyWithForceRefresh;

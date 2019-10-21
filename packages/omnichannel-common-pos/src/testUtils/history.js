import isClient from "../utils/isClient";
import { createBrowserHistory, createMemoryHistory } from "history";
import { useRouterHistory } from "react-router";

const history = isClient
	? useRouterHistory(createBrowserHistory)({ queryKey: false })
	: createMemoryHistory();

export default history;

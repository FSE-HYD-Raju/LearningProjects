import {
	RouteComponentProps,

} from "react-router";

import {
	Href,
	UnregisterCallback,
	TransitionPromptHook,
	LocationState,
	Path,
	LocationDescriptorObject,
	LocationListener
} from "history";

const mockLocation: RouteComponentProps<any>["location"] = {
		hash: "",
		key: "",
		pathname: "",
		search: "",
		state: {}
};

const mockHistory: RouteComponentProps<any>["history"] = {
	length: 2,
	action: "POP",
	location: mockLocation,
	push: (path: Path | LocationDescriptorObject, state?: LocationState): void => {},
	replace: (path: Path | LocationDescriptorObject, state?: LocationState): void => {},
	go: (n: number): void => {},
	goBack: (): void => {},
	goForward: (): void => {},
	block: (prompt?: boolean | string | TransitionPromptHook): UnregisterCallback => { return () => {}; },
	listen: (listener: LocationListener): UnregisterCallback => {return () => {}; },
	createHref: (location: LocationDescriptorObject): Href => { return ""; },
};

const mockRouterProps: RouteComponentProps<any> = {
		match: {
			isExact: true,
			params: {},
			path: "",
			url: ""
		},
		location: mockLocation,
		history: mockHistory,
		staticContext: {}
};

export {
	mockRouterProps,
	mockLocation,
	mockHistory,
	RouteComponentProps
};

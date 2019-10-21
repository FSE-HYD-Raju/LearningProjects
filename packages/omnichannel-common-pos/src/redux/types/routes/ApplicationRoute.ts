import { compile, PathFunction, Key } from "path-to-regexp";
const pathToRegexp = require("path-to-regexp");

class ApplicationRoute<T = {}> {
	path: string;
	pathFunction: PathFunction;
	pathRegexp: RegExp;

	constructor(path: string) {
		this.path = path;
		this.pathFunction = compile(path);
		this.pathRegexp = pathToRegexp(path);
	}

	createLink(params?: T): string {
		try {
			return this.pathFunction(params, {
				encode: (value: string, token: Key) => value
			});
		} catch (e) {
			return this.path;
		}
	}

	createEncodedLink(params?: T): string {
		try {
			return this.pathFunction(params);
		} catch (e) {
			return this.path;
		}
	}
}

export default ApplicationRoute;

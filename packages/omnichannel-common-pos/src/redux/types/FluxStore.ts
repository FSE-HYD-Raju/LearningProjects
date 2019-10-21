import * as AltJS from "alt";

export interface FluxStore<T> extends AltJS.AltStore<T> {
	config: {
		setState(state: T, newState: T): T;
	};
	state: T;
	getState(): T;
}

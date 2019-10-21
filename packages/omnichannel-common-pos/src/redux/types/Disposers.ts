import { Unsubscribe } from "redux";

export interface Disposers {
	fluxDisposers: Record<string, Unsubscribe>;
	reduxDisposers: Record<string, Unsubscribe>;
	disposeAll(): void;
}

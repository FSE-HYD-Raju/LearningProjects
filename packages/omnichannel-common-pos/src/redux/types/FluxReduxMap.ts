import { AppState } from "../reducers";

export interface FluxReduxMap<T extends AppState> extends Record<string, keyof T | undefined> {}

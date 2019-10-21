import { Action } from "redux";

export interface ReduxFluxActionMigration {
	fluxSync(state: any): Action<any>;
}

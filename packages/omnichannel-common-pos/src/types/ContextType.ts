import { FluxWithActions } from "../redux/types";
import { InjectedIntl } from "react-intl";

export interface ContextType {
	flux: FluxWithActions;
	intl: InjectedIntl;
}
export const contextTypesValidationMap = {
	flux: (() => {}) as any,
	intl: (() => {}) as any
};

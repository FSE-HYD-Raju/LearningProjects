"use strict";

import { BaseActions, BaseActionPayload } from "./base.actions";
export { BaseActionPayload } from "./base.actions";

export type BaseState = {

};

const initialState = {

};

const baseReducer = (state: Partial<BaseState> = initialState, action: BaseActionPayload) => {
    const { type } = action;
    switch (type) {
        case BaseActions.FLUX_SYNC:
            return {...state, ...action.fluxState};
        default:
            return state;
    }
};

export default baseReducer;

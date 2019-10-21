"use strict";

import { WorkforceAppointment } from "../../types";
import { WorkforceActionPayload, WorkforceActions } from "./workforce.actions";

export type WorkforceState = {
	availableAppointments: WorkforceAppointment[];
};

const initialState = {
    availableAppointments: [],
};

const workforceReducer = (state: WorkforceState = initialState, action: WorkforceActionPayload) => {
    const { type } = action;
    switch (type) {
        case WorkforceActions.GET_AVAILABILITY_COMPLETE:
            return { ...state, availableAppointments: action.workforceAppointments };
        case WorkforceActions.GET_AVAILABILITY_FAIL:
        case WorkforceActions.RESET_AVAILABILITY:
            return { ...state, availableAppointments: initialState.availableAppointments };
        default:
            return state;
    }
};

export default workforceReducer;

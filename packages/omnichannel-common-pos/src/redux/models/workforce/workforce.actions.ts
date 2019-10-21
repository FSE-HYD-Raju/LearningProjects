"use strict";

import { Action } from "redux";
import { WorkforceAppointment } from "../../types";

export enum WorkforceActions {
    GET_AVAILABILITY = "Availability_GET",
    GET_AVAILABILITY_COMPLETE = "Availability_GET_COMPLETE",
    GET_AVAILABILITY_FAIL = "Availability_GET_FAIL",
	RESET_AVAILABILITY = "Availability_RESET",
}

export interface WorkforceActionPayload extends Action<WorkforceActions> {
	productOfferingId?: string;
	workforceAppointments?: WorkforceAppointment[];
}

export const workforce = {
	getAvailability: (productOfferingId: string) => ({
		type: WorkforceActions.GET_AVAILABILITY,
		productOfferingId,
	}),
	getAvailabilityComplete: (workforceAppointments: WorkforceAppointment[]) => ({
		type: WorkforceActions.GET_AVAILABILITY_COMPLETE,
		workforceAppointments,
	}),
	getAvailabilityFail: () => ({
		type: WorkforceActions.GET_AVAILABILITY_FAIL,
	}),
	resetAvailability: () => ({
		type: WorkforceActions.RESET_AVAILABILITY,
	}),
};

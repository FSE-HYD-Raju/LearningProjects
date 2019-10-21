"use strict";

import { Action } from "redux";
import { PortInForm, PortInCharacteristics } from "./portIn.types";
import { ErrorsType, EligibilityDecision } from "../../types";

export enum PortInActions {
    SET_PORT_IN_OLD_NUMBER = "Basket_SET_PORT_IN_OLD_NUMBER",
    SET_PORT_IN_FORM_MODEL = "Basket_SET_PORT_IN_FORM_MODEL",
    SET_PORT_IN_CH_MODEL = "Basket_SET_PORT_IN_CH_MODEL",
    SET_PORT_IN_FORM_IS_VALID = "Basket_SET_PORT_IN_FORM_IS_VALID",
    GET_PORTIN_NIP = "PortIn_GET_PORTIN_NIP",
	GET_PORTIN_NIP_COMPLETE = "PortIn_GET_PORTIN_NIP_COMPLETE",
	GET_PORTIN_NIP_FAILED = "PortIn_GET_PORTIN_NIP_FAILED",
	CHECK_MSISDN_PORTIN_VALIDITY = "PortIn_CHECK_MSISDN_PORTIN_VALIDITY",
	CHECK_MSISDN_PORTIN_VALIDITY_COMPLETE = "PortIn_CHECK_MSISDN_PORTIN_VALIDITY_COMPLETE",
	CHECK_MSISDN_PORTIN_VALIDITY_FAILED = "PortIn_CHECK_MSISDN_PORTIN_VALIDITY_FAILED",
	ON_ERROR = "PortIn_ON_ERROR",
	CLEAR_MSISDN_PORTIN_ELIGIBILITY_ERROR = "PortIn_CLEAR_MSISDN_PORTIN_ELIGIBILITY_ERROR",
}

export interface PortInActionPayload extends Action<PortInActions> {
    portInOldNumber?: boolean;
    portInFormModel?: PortInForm;
    portInCHModel?: PortInCharacteristics;
    isValid?: boolean;

    msisdn: string;
	portInDecisionResult: string;
	error?: string;
}

export const portIn = {
	setPortInOldNumber: (portInOldNumber: boolean) => ({type: PortInActions.SET_PORT_IN_OLD_NUMBER, portInOldNumber}),
    setPortInFormModel: (portInFormModel: PortInForm) => ({type: PortInActions.SET_PORT_IN_FORM_MODEL, portInFormModel}),
    setPortInCHModel: (portInCHModel: PortInCharacteristics) => ({type: PortInActions.SET_PORT_IN_CH_MODEL, portInCHModel}),
    setPortInFormIsValid: (isValid: boolean | undefined) => ({type: PortInActions.SET_PORT_IN_FORM_IS_VALID, isValid}),
	getPortInDecision: (msisdn: string) => ({ type: PortInActions.GET_PORTIN_NIP, msisdn }),
	getPortInDecisionComplete: (msisdn: string, portInDecisionResult: string) => ({
		type: PortInActions.GET_PORTIN_NIP_COMPLETE,
		msisdn,
		portInDecisionResult
	}),
	getPortInDecisionFailed: (msisdn: string, error: string, portInDecisionResult?: string) => ({
		type: PortInActions.GET_PORTIN_NIP_FAILED,
		msisdn,
		portInDecisionResult,
		error
	}),
	checkMsisdnPortInValidity: (msisdn: string) => ({ type: PortInActions.CHECK_MSISDN_PORTIN_VALIDITY, msisdn }),
	checkMsisdnPortInValidityComplete: (msisdn: string, response: EligibilityDecision) => ({ type: PortInActions.CHECK_MSISDN_PORTIN_VALIDITY_COMPLETE, msisdn, response }),
	checkMsisdnPortInValidityFailed: (msisdn: string, error?: ErrorsType) => ({ type: PortInActions.CHECK_MSISDN_PORTIN_VALIDITY_FAILED, msisdn, error }),
	clearMsisdnPortInEligibilityError: (msisdn: string) => ({ type: PortInActions.CLEAR_MSISDN_PORTIN_ELIGIBILITY_ERROR, msisdn }),
};

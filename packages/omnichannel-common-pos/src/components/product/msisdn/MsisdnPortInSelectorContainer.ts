"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import {
	MsisdnPortInSelectorStateProps,
	MsisdnPortInSelectorActionProps,
	default as MsisdnPortInSelector,
	ValidatePortInType
} from "./MsisdnPortInSelector";
import {
	AppState,
	EligibilityDecisionUseCase,
	actions,
	RecipeId,
	Eligibilities,
	Customer,
	Identification,
	HasFlux
} from "../../../redux";
import { get } from "lodash";

export interface MsisdnPortInSelectorContainerProps extends HasFlux {
	modalState: {
		selectedNumber?: string | number;
	};
	setModalState: (objToSet: object) => void;
}

const mapStateToProps = (state: AppState, props: MsisdnPortInSelectorContainerProps): MsisdnPortInSelectorStateProps => {
	const eligibilityDecisions =
		get(state.eligibility, `${EligibilityDecisionUseCase.VALIDATE_PORTIN}.recipes.${RecipeId.PORT_IN_VALIDATION}`) as any as Eligibilities;
	const activeCustomer = get(state.customerCase, "activeCustomerCase.attributes.activeCustomer") as Customer;
	const portInDecisions = state.portIn.portInDecisions;
	const { modalState } = props;
	const { portInPhoneNumberLength, nipNumberLength } = state.feature;
	const selectNumber = modalState.selectedNumber && modalState.selectedNumber.toString().substr(modalState.selectedNumber.toString().length - portInPhoneNumberLength);
	const eligibility = selectNumber && eligibilityDecisions && eligibilityDecisions[selectNumber];

	const loadingEligibilityCheck: boolean = get(eligibility, "eligibilityDecisionsQueryActive", false) as boolean;
	const isEligible: boolean = get(eligibility, "eligible", false) as boolean;
	const eligibilityError: string = get(eligibility, "error") as any as string;

	// user must be loggind in for portIn. Needed for eligibilityEngine calls
	const identifications: Array<Identification> = activeCustomer && activeCustomer.identifications || [];
	// Use first found ID since there is no other specs
	const identification: Identification = identifications && identifications[0];

	const disableNipCheck = !isEligible || loadingEligibilityCheck;
	// Only allow NIP to be inputted if NIP is requested
	const disableNipField = Number(get(portInDecisions, `${selectNumber}.queryResult.attributes.result`)) !== 1;

	// Error in portInDecisions call
	const errorMakingNipRequest = get(portInDecisions, `${selectNumber}.error`);
	// Error in the request. Please retry
	const errorPleaseTryAgain = Number(get(portInDecisions, `${selectNumber}.queryResult.attributes.result`)) ===   2 &&
		Boolean(get(portInDecisions, `${selectNumber}.queryActive`, "randomString")) === false;
	// NIP request not sent to customer
	const errorNipNotSendToCustomer = Number(get(portInDecisions, `${selectNumber}.queryResult.attributes.result`)) === 0 &&
		Boolean(get(portInDecisions, `${selectNumber}.queryActive`, "randomString")) === false;

	return {
		loadingEligibilityCheck,
		eligibilityError,
		identification,
		disableNipCheck,
		disableNipField,
		errorMakingNipRequest,
		errorPleaseTryAgain,
		errorNipNotSendToCustomer,
		msisdnConfiguration: state.feature && state.feature.msisdnConfiguration,
		portInPhoneNumberLength,
		nipNumberLength,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): MsisdnPortInSelectorActionProps => {
	return {
		actions: {
			validatePortIn: ({ documentType, documentId, msisdn }: ValidatePortInType) => dispatch(
				actions.eligibility.getEligibilityDecision(
					EligibilityDecisionUseCase.VALIDATE_PORTIN,
					RecipeId.PORT_IN_VALIDATION,
					{
						"identification-id": documentId,
						"identification-type": documentType,
						msisdn: msisdn
					}
				)),
			requestNip: (msisdn: string) => dispatch(
				actions.portIn.getPortInDecision(msisdn))
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MsisdnPortInSelector);

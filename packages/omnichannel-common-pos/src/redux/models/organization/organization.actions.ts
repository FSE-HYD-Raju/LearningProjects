"use strict";

import { Action } from "redux";
import { Organization, OrganizationCreationPayload } from "./organization.types";
import { ErrorType } from "../../services/ErrorContainer";

export enum OrganizationActions {
	FLUX_SYNC = "Organization_FLUX_SYNC",
	CREATE_ORGANIZATION = "Organization_CREATE_ORGANIZATION",
	CLEAR_ORGANIZATION_STATE = "Organization_CLEAR_ORGANIZATION_STATE",
	ORGANIZATION_CREATION_SUCCESS = "Organization_ORGANIZATION_CREATION_SUCCESS",
	ORGANIZATION_CREATION_ERROR = "Organization_ORGANIZATION_CREATION_ERROR"
}

export interface OrganizationActionPayload extends Action<OrganizationActions> {
	fluxState?: any;
	organizationCreation: {
		payload?: OrganizationCreationPayload;
		queryActive: boolean;
		success?: Organization
		error?: ErrorType;
	};
}

export const organization = {
	fluxSync: (fluxState: any) => ({type: OrganizationActions.FLUX_SYNC, fluxState}),
	createOrganization: (payload: OrganizationCreationPayload) => ({
			type: OrganizationActions.CREATE_ORGANIZATION,
			organizationCreation: { payload, queryActive: true }
		}),
	clearOrganizationState: () => ({type: OrganizationActions.CLEAR_ORGANIZATION_STATE})
};

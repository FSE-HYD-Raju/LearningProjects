"use strict";

import { ErrorType } from "../../services/ErrorContainer";

import { Identification } from "../../types";

export type ValidFor = {
	startDate: string;
	endDate: string;
};

export type Organization = {
	id: string;
	characteristics: object;
	formattedName: string;
	organizationType: string;
	isLegalEntity: boolean;
	language: string;
	tradingName: string;
	privacySettings: object;
	validFor: ValidFor;
	identification: Identification;
};

export type OrganizationResponse = {
	id: string;
	attributes: Organization
};

export type OrganizationCreationPayload = {
	type: string;
	attributes: Organization;
};

export type OrganizationCreationState = {
	error?: ErrorType
	success?: Organization;
	queryActive: boolean;
};

export type OrganizationState = {
	organizationCreation: OrganizationCreationState;
};

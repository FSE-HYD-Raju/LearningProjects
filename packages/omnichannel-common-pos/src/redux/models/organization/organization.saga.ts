"use strict";

import { all, call, put, takeLatest } from "redux-saga/effects";

import { OrganizationActions, OrganizationActionPayload } from "./organization.actions";
import { ErrorActions } from "../error/error.actions";
import { Organization } from "./organization.types";

import OrganizationService from "../../services/OrganizationService";

function* createOrganization(action: OrganizationActionPayload) {
	try {
		const success: Organization = yield call(() => {
			return OrganizationService.createOrganization(action.organizationCreation.payload || {});
		});
		yield put({
			type: OrganizationActions.ORGANIZATION_CREATION_SUCCESS,
			organizationCreation: {
				success,
				queryActive: false
			}
		});
	} catch (error) {
		yield [
			put({
				type: OrganizationActions.ORGANIZATION_CREATION_ERROR,
				organizationCreation: {
					error,
					queryActive: false
				}
			}),
			put({
				type: ErrorActions.ON_ERROR,
				error
			})
		];
	}
}

export function* organizationSaga(): any {
	yield all([
		takeLatest(OrganizationActions.CREATE_ORGANIZATION, createOrganization)
	]);
}

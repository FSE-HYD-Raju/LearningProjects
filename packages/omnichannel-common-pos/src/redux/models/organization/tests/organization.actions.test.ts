"use strict";

import { invoke } from "lodash";
import { organization, OrganizationActions } from "../organization.actions";
import { mockedOrganizationPayload } from "./organizationMockData";

type Organization = typeof organization;

describe("Test organization.actions: ", () => {

	it("should be an object", () => {
		expect(typeof organization).toEqual("object");
	});

	const specs: Array<{
		action: keyof Organization;
		type: OrganizationActions;
		data: any;
		expectedData: any
	}> = [{
		action: "fluxSync",
		type: OrganizationActions.FLUX_SYNC,
		data: {value: 1},
		expectedData: {fluxState: {value: 1}}
	}, {
		action: "createOrganization",
		type: OrganizationActions.CREATE_ORGANIZATION,
		data: { ...mockedOrganizationPayload },
		expectedData: {
			organizationCreation: {
				payload: {
					...mockedOrganizationPayload
				},
				queryActive: true
			},
			type: "Organization_CREATE_ORGANIZATION"
		}
	}, {
		action: "clearOrganizationState",
		type: OrganizationActions.CLEAR_ORGANIZATION_STATE,
		data: null,
		expectedData: {}
	}];

	specs.forEach(({action, type, data, expectedData}: any) => {

		it(`action "${action}" return data with type: ${type}`, () => {
			const result = invoke(organization, action, data);
			expect(result).toEqual({type, ...expectedData});
		});

	});

});

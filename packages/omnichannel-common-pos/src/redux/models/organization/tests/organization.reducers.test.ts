"use strict";

import { omit } from "lodash";
import { default as reducer, initialState, OrganizationState } from "../organization.reducers";
import { OrganizationActions, OrganizationActionPayload } from "../organization.actions";
import { mockedOrganizationSuccess, mockedOrganizationError } from "./organizationMockData";

describe("Test organization.reducers: ", () => {

	const defaultState = initialState();
	const getInitialState = (state = {}) => ({...defaultState, ...state});
	let state;

	it("should be a function", () => {
		expect(typeof reducer).toEqual("function");
	});

	const specs: Array<{
		description: string;
		action: OrganizationActionPayload|any;
		newState: Partial<OrganizationState>|any;
	}> = [{
		description: "do nothing for unexpected action type",
		action: {type: "SOME_ACTION", value: 1},
		newState: {...defaultState}
	}, {
		description: "should store state when organization creation is successful",
		action: {type: OrganizationActions.ORGANIZATION_CREATION_SUCCESS, organizationCreation: mockedOrganizationSuccess },
		newState: {...defaultState, organizationCreation: mockedOrganizationSuccess }
	}];

	specs.forEach(({action, newState, description}) => {

		it(`${action.type} ${description}`, () => {
			state = reducer(getInitialState(), action);
			expect(state).toEqual(newState);
		});

	});

	describe(`${OrganizationActions.ORGANIZATION_CREATION_SUCCESS}: `, () => {
		const action = (organizationCreation: any) => ({type: OrganizationActions.ORGANIZATION_CREATION_SUCCESS, organizationCreation});
		const setState = (state = {}) => omit(
			getInitialState({ ...state })
		);

		it("should set correct values by default", () => {
			state = reducer(setState(), action(mockedOrganizationSuccess));
			expect(state).toEqual({organizationCreation: mockedOrganizationSuccess});
		});

	});

	describe(`${OrganizationActions.ORGANIZATION_CREATION_ERROR}: `, () => {
		const action = (organizationCreation: any) => ({type: OrganizationActions.ORGANIZATION_CREATION_ERROR, organizationCreation});
		const setState = (state = {}) => omit(
			getInitialState({ ...state })
		);

		it("should set correct values by default", () => {
			state = reducer(setState(), action(mockedOrganizationError));
			expect(state).toEqual({organizationCreation: mockedOrganizationError});
		});

	});

	describe(`${OrganizationActions.CLEAR_ORGANIZATION_STATE}: `, () => {
		const action = (organizationCreation: any) => ({type: OrganizationActions.CLEAR_ORGANIZATION_STATE, organizationCreation});
		const setState = (state = {}) => omit({
			...state
		});

		it("should clear state", () => {
			const mockedState = setState({mockedOrganizationError});
			state = reducer(mockedState, action(mockedOrganizationError));
			expect(state).toEqual(defaultState);
		});

	});

});

"use strict";

import { chain, omit, set, pick } from "lodash";
import { default as reducer, initialState, ConsulState } from "../consul.reducers";
import { ConsulActions, ConsulActionPayload, consul } from "../consul.actions";
import { serverConsulValues, expectedConsulValues } from "./consulMockData";

describe("consul.reducers: ", () => {

	const defaultState = initialState();
	const getInitialState = (state = {}) => ({...defaultState, ...state});
	let state;

	it("should be a function", () => {
		expect(typeof reducer).toEqual("function");
	});

	const specs: Array<{
		description: string;
		action: ConsulActionPayload|any;
		newState: Partial<ConsulState>|any;
	}> = [{
		description: "do nothing for unexpected action type",
		action: {type: "SOME_ACTION", value: 1},
		newState: {...defaultState}
	}, {
		description: "should enrich state by new data",
		action: {type: ConsulActions.FLUX_SYNC, fluxState: {PROP1: "PROP1", PROP2: "PROP1"}},
		newState: {...defaultState, PROP1: "PROP1", PROP2: "PROP1"}
	}];

	specs.forEach(({action, newState, description}) => {

		it(`${action.type} ${description}`, () => {
			state = reducer(getInitialState(), action);
			expect(state).toEqual(newState);
		});

	});

	describe(`${ConsulActions.GET_VALUES_COMPLETE}: `, () => {
		const action = (values: any) => ({type: ConsulActions.GET_VALUES_COMPLETE, values});
		const setState = (state = {}) => omit(
			getInitialState({languages: [], countries: [], ...state}),
			["javaDateStringFormat"]
		);

		it("should set correct values by default", () => {
			state = reducer(setState(), action(serverConsulValues));
			expect(state).toEqual(expectedConsulValues);
		});

		it("msisdnReservationRequired: 'true' if no 'feature/msisdn_reservation' if no 'feature/msisdn_reservation' ", () => {
			const values = omit(serverConsulValues, "feature/msisdn_reservation");
			state = reducer(setState(), action(values));
			expect(state).toEqual({...expectedConsulValues, msisdnReservationRequired: true});
		});

		it("msisdnReservationRequired: 'false' if no 'feature/msisdn_reservation = false' ", () => {
			const values = set({...serverConsulValues}, "feature/msisdn_reservation", "false");
			state = reducer(setState(), action(values));
			expect(state).toEqual({...expectedConsulValues, msisdnReservationRequired: true});
		});
	});

	describe(`${ConsulActions.GET_SERVICE_LOCATIONS_COMPLETE}: `, () => {
		const action = (serviceLocations: any) => ({type: ConsulActions.GET_SERVICE_LOCATIONS_COMPLETE, serviceLocations});
		const setState = (state = {}) => omit(
			getInitialState({serviceLocations: {}, ...state}),
			["javaDateStringFormat"]
		);

		const expectedServiceLocations = {
			"example.org": "8.8.8.8:888"
		};

		it("should set correct service locations on execution", () => {
			const { serviceLocations } = reducer(setState(), action(expectedServiceLocations));
			expect(serviceLocations).toEqual(expectedServiceLocations);
		});
	});

	describe(`${ConsulActions.INIT_LOCALE}: `, () => {
		const action = () => ({type: ConsulActions.INIT_LOCALE});
		const setState = (state = {}) => ({
			isUserSetLocale: false,
			locale: defaultState.locale,
			iso6392: defaultState.iso6392,
			messages: defaultState.messages,
			...state
		});

		it("should do nothing if no defined locales", () => {
			const s1 = setState();
			state = reducer(s1, action());
			expect(state).toEqual(s1);
		});

		it("should do nothing if isUserSetLocale: true", () => {
			const s1 = setState({isUserSetLocale: true});
			state = reducer(s1, action());
			expect(state).toEqual(s1);
		});

		it("should do nothing if isUserSetLocale: true", () => {
			const finLocale = {iso6392: "fin", locale: "fi"};
			const s1 = setState({
				defaultLanguage: finLocale.iso6392,
				locales: [finLocale]
			});
			state = reducer(s1, action());
			expect(state).toEqual({...s1, ...finLocale, messages: {}});
		});
	});

	describe(`${ConsulActions.CHANGE_LANGUAGE}: `, () => {
		it("should set correct values by default", () => {
			const finLocale = {iso6392: "fin", locale: "fi", messages: {}};

			const s1: any = chain(getInitialState())
				.pick(Object.keys(finLocale).concat("locales"))
				.value();

			state = reducer(s1, consul.changeLanguage(finLocale));

			expect(state).toEqual({
				...s1,
				...finLocale,
				isUserSetLocale: true
			});
		});
	});

	describe(`${ConsulActions.CHANGE_LANGUAGE_BY_CODE}: `, () => {
		it("should set correct values by default", () => {
			const finLocale = {iso6392: "fin", locale: "fi", messages: {}};
			const s1: any = chain(getInitialState({locales: expectedConsulValues.locales}))
				.pick(Object.keys(finLocale).concat("locales"))
				.value();

			state = reducer(s1, consul.changeLanguageByCode(finLocale.iso6392));

			expect(state).toEqual({
				...s1,
				...finLocale,
				isUserSetLocale: true
			});
		});
	});

});

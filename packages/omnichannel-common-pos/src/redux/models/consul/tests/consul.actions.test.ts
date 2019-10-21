"use strict";

import { invoke } from "lodash";
import { consul, ConsulActions } from "../consul.actions";

type Consul = typeof consul;

describe("Test consul.actions: ", () => {

	it("should be an object", () => {
		expect(typeof consul).toEqual("object");
	});

	const specs: Array<{
		action: keyof Consul;
		type: ConsulActions;
		data: any;
		expectedData: any
	}> = [{
		action: "fluxSync",
		type: ConsulActions.FLUX_SYNC,
		data: {value: 1},
		expectedData: {fluxState: {value: 1}}
	}, {
		action: "initLocale",
		type: ConsulActions.INIT_LOCALE,
		data: {value: 1},
		expectedData: {}
	}, {
		action: "changeLanguage",
		type: ConsulActions.CHANGE_LANGUAGE,
		data: "eng",
		expectedData: {locale: "eng", saveInCookie: false}
	}, {
		action: "changeLanguageByCode",
		type: ConsulActions.CHANGE_LANGUAGE_BY_CODE,
		data: "1",
		expectedData: {iso6392: "1", saveInCookie: false}
	}, {
		action: "getValues",
		type: ConsulActions.GET_VALUES,
		data: "any",
		expectedData: {}
	}, {
		action: "getValuesComplete",
		type: ConsulActions.GET_VALUES_COMPLETE,
		data: {a: 1, b: 2},
		expectedData: {values: {a: 1, b: 2}}
	}, {
		action: "getServiceLocations",
		type: ConsulActions.GET_SERVICE_LOCATIONS,
		data: "any",
		expectedData: {}
	}, {
		action: "getServiceLocationsComplete",
		type: ConsulActions.GET_SERVICE_LOCATIONS_COMPLETE,
		data: {a: 1, b: 2},
		expectedData: {serviceLocations: {a: 1, b: 2}}
	}];

	specs.forEach(({action, type, data, expectedData}: any) => {

		it(`action "${action}" return data with type: ${type}`, () => {
			const result = invoke(consul, action, data);
			expect(result).toEqual({type, ...expectedData});
		});

	});

});

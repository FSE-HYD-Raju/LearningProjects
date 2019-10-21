"use strict";

import * as AltFlux from "alt";
import { values, keys, assign } from "lodash";
import { createStore, combineReducers, Store } from "redux";
import { CategoryActions, default as defaultActions, UserActions } from "./actions";
import { default as defaultReducers, AppState } from "./reducers";

import {
	getDefaultFluxStoreMap,
	connectFluxRedux
} from "./connectFluxRedux";
import { Disposers, FluxAlt, FluxReduxMap, FluxStore } from "./types";
import Alt = AltJS.Alt;

// TODO: Make a script for prepare AltFlux for tests in separate folder
const fluxAlt = (): any => {
	const alt: FluxAlt<any> = new AltFlux() as FluxAlt<any>;
	const mockState = (state: any = {}) => ({state});

	const mockAltStore = (name: string, model: any) => {
        alt.addStore(name, mockState(model) as any);
        const store: FluxStore<any> = alt.stores[name];

        assign(store.config, {
            setState(currentState: any, nextState: any) {
                store.state = assign({}, currentState, nextState);
                return store.getState();
            }
        });
    };

	const stores = [
		["CategoryStore", {selectedCurrency: "NONE", categories: [], mainCategories: []}],
		["UserStore", {
			hasInitialized: false,
			hasResults: false,
			updatingUser: false,
			salesRepSession: {
				showModal: false,
				active: false,
				sessionId: "",
				terminals: [],
				userRoleId: "",
				salesOrganizationRoleId: ""
			},
			anonymousUser: false,
			showPasswordChangeConfirmation: false,
			identificationExists: false,
			resendSuccessful: false,
			chargingBalances: [],
			oneTimePassword: "",
			deliveryIdentificationId: "",
			toolmodeIndividualId: null,
			impersonatedIndividualId: null,
			user: null,
			error: {},
		}],
		["ConsulStore", {x_brand: "NO_NAME"}]
	] as Array<[string, any]>;
	stores.forEach(([key, state]) => mockAltStore(key, state));

	return alt;
};

describe("ConnectFluxRedux Tests: ", () => {

	describe("getDefaultFluxStoreMap(): ", () => {

		it("is a func and return map object", () => {
			expect(typeof getDefaultFluxStoreMap).toBe("function");
			expect(typeof getDefaultFluxStoreMap()).toBe("object");
		});

	});

	describe("connectFluxRedux(...): ", () => {

		let store: Store<AppState>;
		let flux: FluxAlt<AppState>;
		let subs: Disposers;

		const fluxMap: FluxReduxMap<AppState> = {
			CategoryStore: "category",
			UserStore: "user"
		};

		beforeEach(() => {
			store = createStore(combineReducers(defaultReducers as any));
			flux = fluxAlt();
			subs = connectFluxRedux(flux, store, fluxMap, defaultActions);
		});

		afterEach(() => {
			if (subs) {
				subs.disposeAll();
			}
			subs = {} as Disposers;
			store = {} as Store<any>;
		});

		it("should return disposed object for flux and redux stores", () => {
			expect(subs).toBeDefined();
			expect(subs.fluxDisposers).toBeDefined();
			expect(subs.reduxDisposers).toBeDefined();
		});

		it("keys for fluxDisposers and reduxDisposers should match with fluxMap", () => {
			expect(keys(subs.fluxDisposers)).toEqual(keys(fluxMap));
			expect(keys(subs.reduxDisposers)).toEqual(values(fluxMap));
		});

		describe("Flux changes -> to Redux: ", () => {
			const specs = [{
				storeToEmit: "CategoryStore",
				actionType: CategoryActions.FLUX_SYNC,
				shouldCall: true
			}, {
				storeToEmit: "UserStore",
				actionType: UserActions.FLUX_SYNC,
				shouldCall: true
			}, {
				storeToEmit: "ConsulStore", // not defined in map
				actionType: UserActions.FLUX_SYNC,
				shouldCall: false
			}];

			specs.forEach(({storeToEmit, actionType, shouldCall}) => {
				const should = shouldCall ? "should call" : "should NOT call";

				it(`emitChange in flux "${storeToEmit}" ${should} redux "${actionType}" fluxSync action`, () => {
					const dispatch = store.dispatch.bind(store);
					const fluxState = {...flux.getStore(storeToEmit).getState()};
					const stateProp: any = fluxMap[storeToEmit];
					const oldState: any = stateProp ? store.getState() : {};

					// Check before emit change event, that flux store !== related redux stats
					store.dispatch = jest.fn(dispatch);
					flux.getStore(storeToEmit).emitChange();

					const newState: any = stateProp ? store.getState() : {};

					if (shouldCall) {
						expect(store.dispatch).toHaveBeenCalledWith({
							fluxState: expect.any(Object),
							type: actionType
						});
						expect(newState[stateProp]).toEqual(fluxState);
					} else {
						expect(store.dispatch).not.toHaveBeenCalledWith({
							fluxState: expect.any(Object),
							type: actionType
						});
					}
				});
			});
		});

		describe("Redux changes -> to Flux: ", () => {
			const specs = [{
				storeToCatch: "CategoryStore",
				actionType: CategoryActions.FLUX_SYNC,
				shouldCall: true
			}, {
				storeToCatch: "UserStore",
				actionType: UserActions.FLUX_SYNC,
				shouldCall: true
			}, {
				storeToCatch: "CategoryStore",
				actionType: UserActions.FLUX_SYNC,
				shouldCall: false
			}, {
				storeToCatch: "ConsulStore",
				actionType: UserActions.FLUX_SYNC,
				shouldCall: false
			}];

			specs.forEach(({storeToCatch, actionType, shouldCall}) => {
				const should = shouldCall ? "should update" : "should NOT update";

				it(`dispatch in redux "${actionType}" ${should} flux "${storeToCatch}" state`, () => {
					// Make all to be same as in redux
					store.dispatch({type: "SYNC_ALL"});

					const oldState = {...flux.getStore(storeToCatch).getState()};
					const newState = {...oldState, SOME_NEW_TEST_VALUE: "TEST"};

					store.dispatch({type: actionType, fluxState: newState});

					const expectedState = shouldCall ? newState : oldState;
					expect(flux.getStore(storeToCatch).getState()).toEqual(expectedState);
				});
			});

		});

		describe("subscribe and unsubscribe: ", () => {

			describe("flux listen redux: ", () => {
				const TEST_CHANGE = {TEST_PROP: "TEST_PROP"};

				it("subscription for redux state should update proper flux store", () => {
					flux.stores.CategoryStore.config.setState = jest.fn();
					flux.stores.UserStore.config.setState = jest.fn();

					store.dispatch({type: CategoryActions.FLUX_SYNC, fluxState: TEST_CHANGE});
					store.dispatch({type: UserActions.FLUX_SYNC, fluxState: TEST_CHANGE});

					expect(flux.stores.CategoryStore.config.setState).toHaveBeenCalled();
					expect(flux.stores.UserStore.config.setState).toHaveBeenCalled();
				});

				it("dispose redux subscriptions should NOT update proper flux store", () => {
					flux.stores.CategoryStore.config.setState = jest.fn();
					flux.stores.UserStore.config.setState = jest.fn();

					// unsubscribe for state.category changes
					subs.reduxDisposers.category();

					store.dispatch({type: CategoryActions.FLUX_SYNC, fluxState: TEST_CHANGE});
					store.dispatch({type: UserActions.FLUX_SYNC, fluxState: TEST_CHANGE});

					expect(flux.stores.CategoryStore.config.setState).not.toHaveBeenCalled();
					expect(flux.stores.UserStore.config.setState).toHaveBeenCalled();
				});

				it("disposeAll remove all events", () => {
					flux.stores.CategoryStore.config.setState = jest.fn();
					flux.stores.UserStore.config.setState = jest.fn();

					subs.disposeAll();
					// unsubscribe for state.category changes
					store.dispatch({type: CategoryActions.FLUX_SYNC, fluxState: TEST_CHANGE});
					store.dispatch({type: UserActions.FLUX_SYNC, fluxState: TEST_CHANGE});

					expect(flux.stores.CategoryStore.config.setState).not.toHaveBeenCalled();
					expect(flux.stores.UserStore.config.setState).not.toHaveBeenCalled();
				});
			});

			describe("redux listen flux: ", () => {

				it("subscription for flux store should dispatch redux", () => {
					store.dispatch = jest.fn();

					// emit change
					flux.stores.CategoryStore.emitChange();
					flux.stores.UserStore.emitChange();

					expect(store.dispatch).toHaveBeenCalledTimes(2);
				});

				it("dispose flux subscriptions should NOT dispatch redux", () => {
					store.dispatch = jest.fn();

					// unsubscribe for flux CategoryStore changes
					subs.fluxDisposers.CategoryStore();

					flux.stores.CategoryStore.emitChange();
					flux.stores.UserStore.emitChange();

					expect(store.dispatch).toHaveBeenCalledTimes(1);
				});

				it("disposeAll remove all events", () => {
					store.dispatch = jest.fn();

					subs.disposeAll();
					flux.stores.CategoryStore.emitChange();
					flux.stores.UserStore.emitChange();

					expect(store.dispatch).not.toHaveBeenCalled();
				});
			});

		});

	});

});

"use strict";

import { AnyAction, Store } from "redux";
import { mockStore } from "../utils/ReduxTestUtils";
import { overrideReducer } from "./reducerUtils";
import { AppState } from "../reducers";

enum TestActions {
	ACTION1 = "ACTION1",
	ACTION2 = "ACTION2"
}

describe("reducerUtils Tests: ", () => {

	describe("overrideReducer: ", () => {

		const testReducer = (state: any = {}, action: AnyAction) => {
			switch (action.type) {
				case TestActions.ACTION1:
					return {
						...state,
						a1: action.payload
					};
				case TestActions.ACTION2:
					return {
						...state,
						a2: action.payload
					};
				default:
					return state;
			}
		};
		const fireAction = (type: TestActions, payload: any) => ({type, payload});

		const createStore = (interceptors = {}) => {
			return mockStore({testItem: testReducer}, interceptors) as Store<{testItem: any} & AppState>;
		};

		let store: Store<{testItem: any} & AppState>;
		let dispatchSpy;

		beforeEach(() => {
			store = createStore();
			dispatchSpy = jest.spyOn(store, "dispatch");
		});

		it("Before tests overrideReducer and testItem defined", () => {
			expect(overrideReducer).toBeDefined();
			expect(store.getState().testItem).toBeDefined();
		});

		it("check default action and state change", () => {
			store.dispatch(fireAction(TestActions.ACTION1, "data1"));
			expect(store.getState().testItem).toEqual({a1: "data1"});

			store.dispatch(fireAction(TestActions.ACTION1, "data2"));
			store.dispatch(fireAction(TestActions.ACTION2, "QQQ"));
			expect(store.getState().testItem).toEqual({a1: "data2", a2: "QQQ"});
		});

		it("check intercepted reducer is called", () => {
			const mockReducer = jest.fn();
			store = createStore({
				[TestActions.ACTION2]: mockReducer
			});

			store.dispatch(fireAction(TestActions.ACTION1, "data1"));
			expect(store.getState().testItem).toEqual({a1: "data1"});
			expect(mockReducer).not.toHaveBeenCalled();

			store.dispatch(fireAction(TestActions.ACTION2, "data1"));
			expect(store.getState().testItem).toEqual({a1: "data1"});
			expect(mockReducer).toHaveBeenCalled();
		});

		it("check intercepted reducer is called with original reducer result", () => {
			const interceptor = {
				[TestActions.ACTION2]: (reducer: any, state: any, action: any) => reducer(state, action)
			};
			const spy = jest.spyOn(interceptor, TestActions.ACTION2);
			store = createStore(interceptor);

			store.dispatch(fireAction(TestActions.ACTION1, "data1"));
			expect(store.getState().testItem).toEqual({a1: "data1"});
			expect(spy).not.toHaveBeenCalled();

			store.dispatch(fireAction(TestActions.ACTION2, "data1"));
			expect(store.getState().testItem).toEqual({a1: "data1", a2: "data1"});
			expect(spy).toHaveBeenCalled();
		});

		it("check intercepted reducer to override result", () => {
			const interceptor = {
				[TestActions.ACTION2]: (reducer: any, state: any, action: any) => {
					return {
						...state,
						testItem: {
							...state.testItem,
							NEW_DATA: action.payload
						}
					};
				}
			};
			store = createStore(interceptor);

			store.dispatch(fireAction(TestActions.ACTION1, "data1"));
			expect(store.getState().testItem).toEqual({a1: "data1"});

			store.dispatch(fireAction(TestActions.ACTION2, "data1"));
			expect(store.getState().testItem).toEqual({a1: "data1", NEW_DATA: "data1"});
		});

	});

});

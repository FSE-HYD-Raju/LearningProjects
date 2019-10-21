"use strict";

import { omit, get } from "lodash";
import { default as reducer, initialState } from "../msisdnSelection.reducers";
import { MsisdnSelectionActions, MsisdnSelectionActionPayload } from "../msisdnSelection.actions";
import { MsisdnSelectionUseCase } from "../msisdnSelection.types";
import {
	mockedMsisdnsReservationSuccess,
	mockedMsisdnReservation,
	mockedMsisdnReservation2,
	testPo
} from "./msisdnSelectionMockData";
import { ProductOffering } from "../../../types";

describe("Test msisdnSelection.reducers: ", () => {
	const defaultState = initialState();
	const getInitialState = (state = {}) => ({ ...defaultState, ...state });
	const po: ProductOffering = { ...testPo };
	let state;

	it("should be a function", () => {
		expect(typeof reducer).toEqual("function");
	});

	const specs: Array<{
		description: string;
		action: MsisdnSelectionActionPayload | any;
		newState: Partial<MsisdnSelectionActionPayload> | any;
	}> = [
			{
				description: "do nothing for unexpected action type",
				action: { type: "SOME_ACTION", value: 1 },
				newState: { ...defaultState }
			}
		];

	specs.forEach(({ action, newState, description }) => {
		it(`${action.type} ${description}`, () => {
			state = reducer(getInitialState(), action);
			expect(state).toEqual(newState);
		});
	});
	describe(MsisdnSelectionActions.INIT, () => {
		const action = (msisdnSelections: any) => ({
			type: MsisdnSelectionActions.INIT,
			msisdnSelections
		});
		const setState = (state = {}) => omit(getInitialState({ ...state }));
		it("should set correct values by default", () => {
			state = reducer(setState(), action({}));
			expect(state).toEqual({
				queryActive: true,
				productOfferings: []
			});
		});
	});
	describe(MsisdnSelectionActions.INIT_COMPLETE, () => {
		const msisdnPos = get(po, "productOfferingGroups[0].productOfferings");
		const action = (msisdnSelections: any) => ({
			type: MsisdnSelectionActions.INIT_COMPLETE,
			msisdnSelections
		});
		const setState = (state = {}) => omit(getInitialState({ ...state }));
		it("should set correct values by default", () => {
			state = reducer(
				setState(),
				action({
					poId: po.id,
					msisdnProductOfferings: msisdnPos
				})
			);
			expect(state).toEqual({
				productOfferings: msisdnPos,
				queryActive: false
			});
		});
	});
	describe(MsisdnSelectionActions.RESERVE_MSISDNS, () => {
		const action = (msisdnSelections: any) => ({
			type: MsisdnSelectionActions.RESERVE_MSISDNS,
			msisdnSelections
		});
		const setState = (state = {}) => omit(getInitialState({ ...state }));
		it("should set correct values by default", () => {
			state = reducer(setState(), action({}));
			expect(state).toEqual({
				queryActive: true,
				productOfferings: []
			});
		});
	});
	describe(MsisdnSelectionActions.RESERVE_MSISDNS_COMPLETE, () => {
		const action = (msisdnSelections: any) => ({
			type: MsisdnSelectionActions.RESERVE_MSISDNS_COMPLETE,
			msisdnSelections
		});
		const setState = (state = {}) => omit(getInitialState({ ...state }));
		it("should set correct values by default", () => {
			state = reducer(
				setState(),
				action({
					msisdnSelectionUseCase: MsisdnSelectionUseCase.PATTERN_SEARCH,
					msisdnReservations: [{ ...mockedMsisdnsReservationSuccess }]
				})
			);
			expect(state).toEqual({
				msisdnsReservationsByUseCase: {
					[MsisdnSelectionUseCase.PATTERN_SEARCH]: [{ ...mockedMsisdnsReservationSuccess }]
				},
				queryActive: false,
				productOfferings: []
			});
		});
	});
	describe(MsisdnSelectionActions.RELEASE_MSISDNS, () => {
		const action = (msisdnSelections: any) => ({
			type: MsisdnSelectionActions.RELEASE_MSISDNS,
			msisdnSelections
		});
		const setState = (state = {}) => omit(getInitialState({ ...state }));
		it("should set correct values by default", () => {
			state = reducer(setState(), action({}));
			expect(state).toEqual({
				queryActive: true,
				productOfferings: []
			});
		});
	});
	describe(MsisdnSelectionActions.RELEASE_MSISDNS_COMPLETE, () => {
		const action = (msisdnSelections: any) => ({
			type: MsisdnSelectionActions.RELEASE_MSISDNS_COMPLETE,
			msisdnSelections
		});
		const setState = (
			state = {
				msisdnsReservationsByUseCase: {
					[MsisdnSelectionUseCase.PATTERN_SEARCH]: [{ ...mockedMsisdnReservation }]
				},
				queryActive: false
			}
		) => omit(getInitialState({ ...state }));
		it("should set correct values by default", () => {
			state = reducer(
				setState(),
				action({
					msisdnSelectionUseCase: MsisdnSelectionUseCase.PATTERN_SEARCH,
					reservedFor: mockedMsisdnReservation.attributes && mockedMsisdnReservation.attributes.reservedFor
				})
			);
			expect(state).toEqual({
				msisdnsReservationsByUseCase: {
					[MsisdnSelectionUseCase.PATTERN_SEARCH]: []
				},
				queryActive: false,
				productOfferings: []
			});
		});
	});
	describe(MsisdnSelectionActions.SELECT_MSISDN_COMPLETE, () => {
		const action = (msisdnSelections: any) => ({
			type: MsisdnSelectionActions.SELECT_MSISDN_COMPLETE,
			msisdnSelections
		});
		const setState = (
			state = {
				msisdnsReservationsByUseCase: {
					[MsisdnSelectionUseCase.PATTERN_SEARCH]: [
						{ ...mockedMsisdnReservation },
						{ ...mockedMsisdnReservation2 }
					]
				},
				queryActive: false
			}
		) => omit(getInitialState({ ...state }));
		it("should set correct values by default", () => {
			state = reducer(
				setState(),
				action({
					selectedMsisdn: "0401231234",
					poId: "poId",
					msisdnSelectionUseCase: MsisdnSelectionUseCase.PATTERN_SEARCH,
					msisdnReservations: [{ ...mockedMsisdnsReservationSuccess }]
				})
			);
			expect(state).toEqual({
				selectedMsisdn: "0401231234",
				selectedMsisdnPoId: "poId",
				msisdnsReservationsByUseCase: {
					[MsisdnSelectionUseCase.PATTERN_SEARCH]: [{ ...mockedMsisdnsReservationSuccess }]
				},
				queryActive: false,
				productOfferings: []
			});
		});
	});
});

"use strict";

import { omit, get } from "lodash";
import { default as reducer, initialState } from "../msisdn.reducers";
import { MsisdnActions, MsisdnActionPayload } from "../msisdn.actions";
import { MsisdnState } from "../msisdn.types";
import { ResourceInventories, ResourceStocks } from "../../../types";
import {
    mockedResouceInventoryStocks,
    mockedChangeResouceInventoryStocks,
    mockedFilteredStocks,
    mockedMsisdnError,
    mockedReserveMsisdnResponse1,
    mockedReserveMsisdn,
} from "./msisdnMockData";

describe("Test msisdn.reducers: ", () => {
    const defaultState = initialState;
    const getInitialState = (state = {}) => ({ ...defaultState, ...state });
    let testState;
    it("should be a function", () => {
        expect(typeof reducer).toEqual("function");
    });

    const specs: Array<{
        description: string;
        action: MsisdnActionPayload | any;
        newState: Partial<MsisdnState> | any;
    }> = [
            {
                description: "do nothing for unexpected action type",
                action: { type: "SOME_ACTION", value: 1 },
                newState: { ...defaultState }
            }
        ];

    specs.forEach(({ action, newState, description }) => {
        it(`${action.type} ${description}`, () => {
            testState = reducer(getInitialState(), action);
            expect(testState).toEqual(newState);
        });
    });

    describe(MsisdnActions.RESOURCE_INVENTORIES, () => {
        const action = () => ({
            type: MsisdnActions.RESOURCE_INVENTORIES
        });
        const setState = (state = {}) => omit(getInitialState({ ...state }));
        it("should set correct values by default", () => {
            testState = reducer(setState(), action());
            expect(testState).toEqual({
                ...defaultState
            });
        });
    });

    describe(MsisdnActions.RESOURCE_INVENTORIES_COMPLETE, () => {
        const invens = get(mockedResouceInventoryStocks, "data[0].attributes");
        const stks = get(mockedResouceInventoryStocks, "included[0].attributes");
        const action = (inventories: Array<ResourceInventories>, stocks: Array<ResourceStocks>) => ({
            type: MsisdnActions.RESOURCE_INVENTORIES_COMPLETE,
            inventories,
            stocks
        });
        const setState = (state = {}) => omit(getInitialState({ ...state }));
        it("should set correct values by default", () => {
            testState = reducer(setState(), action(invens, stks));
            expect(testState).toEqual({
                ...defaultState,
                inventories: invens,
                stocks: stks
            });
        });
    });

    describe(MsisdnActions.RESOURCE_INVENTORIES_FAILED, () => {
        const error = mockedMsisdnError.error;
        const action = (actionError: any) => ({
            type: MsisdnActions.RESOURCE_INVENTORIES_FAILED,
            error: actionError
        });
        const setState = (state = {}) => omit(getInitialState({ ...state }));
        it("should set correct values by default", () => {
            testState = reducer(setState(), action(error));
            expect(testState).toEqual({
                ...defaultState,
                error
            });
        });
    });

    describe(MsisdnActions.CHANGE_INVENTORY, () => {
        const inventoryStocks = mockedChangeResouceInventoryStocks.included;
        const resourceInventory = get(mockedChangeResouceInventoryStocks, "data[0]");
        const action = (selectedInventory: ResourceInventories, stocks: Array<ResourceStocks> | any) => ({
            type: MsisdnActions.CHANGE_INVENTORY,
            selectedInventory,
            stocks
        });
        const setState = (state = {}) => omit(getInitialState({ ...state }));
        it("should set correct values by default", () => {
            testState = reducer(setState(), action(resourceInventory, inventoryStocks));
            expect(testState).toEqual({
                ...defaultState,
                selectedInventory: resourceInventory,
                selectionStocks: mockedFilteredStocks.included
            });
        });
    });

    describe(MsisdnActions.RESERVE_MSISDN_COMPLETE, () => {
        const response = get(mockedReserveMsisdnResponse1, "data");
        const { reservedFor, stock, pattern } = get(mockedReserveMsisdn, "data[0].attributes");

        const action = (getMsisdnsRes: any, reservedForMocked: any, stockMocked: any, patternMocked: any) => ({
            type: MsisdnActions.RESERVE_MSISDN_COMPLETE,
            response: getMsisdnsRes,
            reservedFor: reservedForMocked,
            stock: stockMocked,
            pattern: patternMocked
        });
        const setState = (state = {}) => omit(getInitialState({ ...state }));
        it("should set correct values by default", () => {
            testState = reducer(setState(), action(response, reservedFor, stock, pattern));
            expect(testState).toEqual({
                ...defaultState,
                reservationAttributes: response.attributes,
                activeReservationId: reservedFor,
                selectedCategory: stock,
                inputtedPattern: pattern
            });
        });
    });

});

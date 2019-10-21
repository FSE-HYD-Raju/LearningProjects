"use strict";

import { invoke } from "lodash";
import { msisdn, MsisdnActions } from "../msisdn.actions";
import { ResourceInventories, ResourceStocks, MsisdnReservation } from "../../../types";
import {
    mockedResouceInventoryStocks,
    mockedSelectedResourceInventory,
    mockedMsisdnError,
    mockedReserveMsisdnResponse1,
    mockedReserveMsisdnInput
} from "./msisdnMockData";

type Msisdn = typeof msisdn;

describe("Test msisdn.actions: ", () => {
    it("should be an object", () => {
        expect(typeof msisdn).toEqual("object");
    });

    const inventories: Array<ResourceInventories> | any = { ...mockedResouceInventoryStocks.data };
    const stocks: Array<ResourceStocks> | any = { ...mockedResouceInventoryStocks.included };
    const selectedInventory: ResourceInventories | any = { ...mockedSelectedResourceInventory };

    const { pattern, releaseId, reservedFor, stock, limit, product, endTime,
        numberType }: MsisdnReservation | any = { ...mockedReserveMsisdnInput.attributes };

    const response: MsisdnReservation | any = mockedReserveMsisdnResponse1.data;

    const specs: Array<{
        action: keyof Msisdn;
        type: MsisdnActions;
        data: any;
        expectedData: any;
    }> = [
            {
                action: "getResourceInventories",
                type: MsisdnActions.RESOURCE_INVENTORIES,
                data: null,
                expectedData: {}
            },
            {
                action: "getResourceInventoriesCompleted",
                type: MsisdnActions.RESOURCE_INVENTORIES_COMPLETE,
                data: [inventories, stocks],
                expectedData: {
                    inventories,
                    stocks
                }
            },
            {
                action: "getResourceInventoriesFailed",
                type: MsisdnActions.RESOURCE_INVENTORIES_FAILED,
                data: [mockedMsisdnError],
                expectedData: {
                    error: mockedMsisdnError
                }
            },
            {
                action: "changeInventory",
                type: MsisdnActions.CHANGE_INVENTORY,
                data: [selectedInventory, stocks],
                expectedData: {
                    selectedInventory,
                    stocks
                }
            },
            {
                action: "reserveMsisdn",
                type: MsisdnActions.RESERVE_MSISDN,
                data: [pattern, releaseId, reservedFor,
                    stock, limit, product, endTime, numberType],
                expectedData: {
                    pattern, releaseId, reservedFor,
                    stock, limit, product, endTime,
                    numberType
                }
            },
            {
                action: "reserveMsisdnComplete",
                type: MsisdnActions.RESERVE_MSISDN_COMPLETE,
                data: [response, reservedFor, stock, pattern],
                expectedData: {
                    response,
                    reservedFor,
                    stock,
                    pattern
                }
            },
            {
                action: "releaseMsisdn",
                type: MsisdnActions.RELEASE_MSISDN,
                data: [releaseId],
                expectedData: {
                    releaseId
                }
            },
        ];
    specs.forEach(({ action, type, data, expectedData }: any) => {
        it(`action "${action}" return data with type: ${type}`, () => {
            const result = invoke(msisdn, action, ...data);
            expect(result).toEqual({ type, ...expectedData });
        });
    });
});

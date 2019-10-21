import actions, { MsisdnActions } from "../../../actions";
import MsisdnService from "../../../services/MsisdnService";
import { msisdnSaga } from "../msisdn.saga";
import { ResourceInventories, ResourceStocks, MsisdnReservation } from "../../../types";
import {
    mockedResouceInventoryStocks,
    mockedReleaseMsisdn,
    mockedReserveMsisdn,
    mockedReserveMsisdnResponse1
} from "./msisdnMockData";
import { get } from "lodash";

const SagaTester = require("redux-saga-tester").default;

describe("getResourceInventories", () => {
    let sagaTester: any = null;
    const initialState = {};
    beforeAll(() => {
        const mockData = {
            data: mockedResouceInventoryStocks.data,
            included: mockedResouceInventoryStocks.included
        };
        MsisdnService.getResourcesInventories = jest.fn().mockReturnValue(mockData);
    });

    beforeEach(() => {
        sagaTester = new SagaTester({ initialState });
        sagaTester.start(msisdnSaga);
    });

    it("should get resource inventories ", async () => {
        const inventories = mockedResouceInventoryStocks.data as any as Array<ResourceInventories>;
        const stocks = mockedResouceInventoryStocks.included as any as Array<ResourceStocks>;

        expect(sagaTester.getState()).toEqual(initialState);
        sagaTester.dispatch(actions.msisdn.getResourceInventories());

        await sagaTester.waitFor(MsisdnActions.RESOURCE_INVENTORIES_COMPLETE);
        const calledAction = sagaTester.getLatestCalledAction();

        expect(calledAction).toEqual(actions.msisdn.getResourceInventoriesCompleted(inventories, stocks));
        expect(MsisdnService.getResourcesInventories).toHaveBeenCalledTimes(1);
    });
});

describe("releaseMsisdn()", () => {
    let sagaTester: any = null;
    const initialState = {};
    const releaseId: string | any = mockedReleaseMsisdn.attributes && mockedReleaseMsisdn.attributes.releaseId;

    beforeAll(() => {
        MsisdnService.releaseMsisdn = jest.fn().mockReturnValue({});
    });
    beforeEach(() => {
        sagaTester = new SagaTester({ initialState });
        sagaTester.start(msisdnSaga);
    });
    it("should release msisdn number ", async () => {
        sagaTester.dispatch(
            actions.msisdn.releaseMsisdn(releaseId, "")
        );

        await sagaTester.waitFor(MsisdnActions.RELEASE_MSISDN);
        const calledAction = sagaTester.getLatestCalledAction();
        expect(calledAction).toEqual(
            actions.msisdn.releaseMsisdnComplete(releaseId)
        );
        expect(MsisdnService.releaseMsisdn).toHaveBeenCalledTimes(1);
    });
});

describe("reserveMsisdn()", () => {
    let sagaTester: any = null;
    const initialState = {};
    beforeAll(() => {
        const mockData = { ...mockedReserveMsisdnResponse1.data };
        MsisdnService.reserveMsisdn = jest.fn().mockReturnValue(mockData);
    });
    beforeEach(() => {
        sagaTester = new SagaTester({ initialState });
        sagaTester.start(msisdnSaga);
    });
    it("should get msisdn numbers ", async () => {

        const response = mockedReserveMsisdnResponse1.data as any as Array<MsisdnReservation>;
        expect(sagaTester.getState()).toEqual(initialState);
        const { endTime, reservedFor, limit, pattern, stock } = get(mockedReserveMsisdn, "data[0].attributes");
        // tslint:disable-next-line: prefer-const
        let releaseId: any;
        // tslint:disable-next-line: prefer-const
        let product: any;
        // tslint:disable-next-line: prefer-const
        let numberType: any;

        // tslint:disable-next-line: max-line-length
        sagaTester.dispatch(actions.msisdn.reserveMsisdn(pattern, releaseId, reservedFor, stock, limit, product, endTime, numberType));
        await sagaTester.waitFor(MsisdnActions.RESERVE_MSISDN_COMPLETE);
        const calledAction = sagaTester.getLatestCalledAction();
        expect(calledAction).toEqual(actions.msisdn.reserveMsisdnComplete(response as any, reservedFor, stock, pattern));
        expect(MsisdnService.reserveMsisdn).toHaveBeenCalledTimes(1);
    });
});

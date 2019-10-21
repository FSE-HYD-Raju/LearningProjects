import actions, { MsisdnSelectionActions } from "../../../actions";
import MsisdnService from "../../../services/MsisdnService";
import ProductOfferingService from "../../../services/ProductOfferingService";
import { msisdnSelectionSaga } from "../msisdnSelection.saga";
import { MsisdnSelectionUseCase } from "../msisdnSelection.types";
import { ProductOffering, MsisdnReservation } from "../../../types";
import {
	testPo,
	mockedMsisdnsReservationSuccess,
	mockedMsisdnsReservationSuccess2,
	mockedMsisdnReservationCreate,
	mockedMsisdnReservation,
	mockedMsisdnReservationX
} from "./msisdnSelectionMockData";
const SagaTester = require("redux-saga-tester").default;
import { get } from "lodash";

describe("msisdnSelection.saga", () => {
	const msisdnSelectionUseCase: MsisdnSelectionUseCase = MsisdnSelectionUseCase.PATTERN_SEARCH;

	describe("init()", () => {
		let sagaTester: any = null;
		const initialState = {};

		beforeAll(() => {
			const po: ProductOffering = { ...testPo };
			ProductOfferingService.getProductOffering = jest.fn().mockReturnValue(po);
		});

		beforeEach(() => {
			sagaTester = new SagaTester({ initialState });
			sagaTester.start(msisdnSelectionSaga);
		});

		it("should init productOffering ", async () => {
			const po: ProductOffering = {
				...testPo
			};
			const msisdnPos = get(po, "productOfferingGroups[0].productOfferings");
			expect(sagaTester.getState()).toEqual(initialState);
			sagaTester.dispatch(actions.msisdnSelection.init({ poId: po.id }));
			await sagaTester.waitFor(MsisdnSelectionActions.INIT_COMPLETE);
			const calledAction = sagaTester.getLatestCalledAction();
			expect(calledAction).toEqual(actions.msisdnSelection.initComplete({ poId: po.id, msisdnProductOfferings: msisdnPos }));
			expect(ProductOfferingService.getProductOffering).toHaveBeenCalledTimes(1);
		});
	});

	describe("reserveMsisdns()", () => {
		let sagaTester: any = null;
		const initialState = {
			msisdnSelection: {
				productOfferings: get(testPo, "productOfferingGroups[0].productOfferings"),
				msisdnsReservationsByUseCase: {
					[MsisdnSelectionUseCase.PATTERN_SEARCH]: [{ ...mockedMsisdnsReservationSuccess }]
				}
			} as any
		};

		beforeAll(() => {
			MsisdnService.reserveMsisdns = jest.fn().mockReturnValue(mockedMsisdnReservation);
			MsisdnService.releaseMsisdns = jest.fn().mockReturnValue({});
		});

		beforeEach(() => {
			sagaTester = new SagaTester({ initialState });
			sagaTester.start(msisdnSelectionSaga);
		});

		it("should reserve msidns and release existing reservations for same use case", async done => {
			sagaTester.dispatch(
				actions.msisdnSelection.reserveMsisdns({
					msisdnReservationCreate: mockedMsisdnReservationCreate,
					msisdnSelectionUseCase
				})
			);
			await sagaTester.waitFor(MsisdnSelectionActions.RESERVE_MSISDNS_COMPLETE);
			const calledAction = sagaTester.getLatestCalledAction();
			const msisdnReservations: Array<MsisdnReservation> = [
				{ ...mockedMsisdnReservation },
				{ ...mockedMsisdnReservationX }
			];
			expect(calledAction).toEqual(
				actions.msisdnSelection.reserveMsisdnsComplete({
					msisdnSelectionUseCase,
					msisdnReservations
				})
			);
			expect(MsisdnService.releaseMsisdns).toHaveBeenCalledTimes(1);
			expect(MsisdnService.reserveMsisdns).toHaveBeenCalledTimes(2);
			done();
		});
	});

	describe("releaseMsisdns()", () => {
		let sagaTester: any = null;
		const initialState = {};
		const reservedFor: string | any = mockedMsisdnReservation.attributes && mockedMsisdnReservation.attributes.reservedFor;

		beforeAll(() => {
			MsisdnService.releaseMsisdns = jest.fn().mockReturnValue({});
		});

		beforeEach(() => {
			sagaTester = new SagaTester({ initialState });
			sagaTester.start(msisdnSelectionSaga);
		});

		it("should release reservations ", async () => {
			sagaTester.dispatch(
				actions.msisdnSelection.releaseMsisdns({
					msisdnSelectionUseCase,
					reservedFor
				})
			);
			await sagaTester.waitFor(MsisdnSelectionActions.RELEASE_MSISDNS_COMPLETE);
			const calledAction = sagaTester.getLatestCalledAction();
			expect(calledAction).toEqual(
				actions.msisdnSelection.releaseMsisdnsComplete({
					msisdnSelectionUseCase,
					reservedFor
				})
			);
			expect(MsisdnService.releaseMsisdns).toHaveBeenCalledTimes(1);
		});
	});

	describe("selectMsisdn()", () => {
		let sagaTester: any = null;
		const initialState = {
			msisdnSelection: {
				msisdnsReservationsByUseCase: {
					[MsisdnSelectionUseCase.PATTERN_SEARCH]: [
						{ ...mockedMsisdnsReservationSuccess },
						{ ...mockedMsisdnsReservationSuccess2 }
					]
				}
			} as any
		};

		const poId: string = "numberGroupPoId";
		const selectedMsisdn: any = {
			msisdn: mockedMsisdnsReservationSuccess.attributes.msisdns[0],
			cost: {},
			reservedFor: "",
			productOffering: {
				id: poId
			}
		 };

		const msisdnReservations: Array<MsisdnReservation> | any = [{ ...mockedMsisdnsReservationSuccess }];

		beforeAll(() => {
			MsisdnService.releaseMsisdns = jest.fn().mockReturnValue({});
		});

		beforeEach(() => {
			sagaTester = new SagaTester({ initialState });
			sagaTester.start(msisdnSelectionSaga);
		});

		it("should release reservations which do not contain the selected msisdn, and store the reservation that does ", async done => {
			sagaTester.dispatch(
				actions.msisdnSelection.selectMsisdn({
					selectedMsisdn,
					poId,
					msisdnSelectionUseCase
				})
			);
			await sagaTester.waitFor(MsisdnSelectionActions.SELECT_MSISDN_COMPLETE);
			const calledAction = sagaTester.getLatestCalledAction();
			expect(calledAction).toEqual(
				actions.msisdnSelection.selectMsisdnComplete({
					selectedMsisdn,
					poId,
					msisdnSelectionUseCase,
					msisdnReservations
				})
			);
			expect(MsisdnService.releaseMsisdns).toHaveBeenCalledTimes(1);
			done();
		});
	});
});

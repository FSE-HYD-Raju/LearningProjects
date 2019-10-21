"use strict";

import { invoke } from "lodash";
import { msisdnSelection, MsisdnSelectionActions } from "../msisdnSelection.actions";
import {
	mockedMsisdnReservationCreate,
	mockedMsisdnReservation,
	mockedMsisdnReservationError
} from "./msisdnSelectionMockData";
import { MsisdnSelectionUseCase } from "../msisdnSelection.types";

type MsisdnReservation = typeof msisdnSelection;

describe("Test msisdnSelection.actions: ", () => {
	it("should be an object", () => {
		expect(typeof msisdnSelection).toEqual("object");
	});

	const mockPoId: string = "po-id";
	const msisdnSelectionUseCase: MsisdnSelectionUseCase = MsisdnSelectionUseCase.PATTERN_SEARCH;
	const msisdnReservations: Array<MsisdnReservation> | any = [{ ...mockedMsisdnReservation }];

	const specs: Array<{
		action: keyof MsisdnReservation;
		type: MsisdnSelectionActions;
		data: any;
		expectedData: any;
	}> = [
		{
			action: "init",
			type: MsisdnSelectionActions.INIT,
			data: { poId: mockPoId },
			expectedData: {
				msisdnSelections: {
					poId: mockPoId
				}
			}
		},
		{
			action: "reserveMsisdns",
			type: MsisdnSelectionActions.RESERVE_MSISDNS,
			data: { msisdnReservationCreate: mockedMsisdnReservationCreate, msisdnSelectionUseCase },
			expectedData: {
				msisdnSelections: {
					msisdnReservationCreate: mockedMsisdnReservationCreate,
					msisdnSelectionUseCase
				}
			}
		},
		{
			action: "reserveMsisdnsComplete",
			type: MsisdnSelectionActions.RESERVE_MSISDNS_COMPLETE,
			data: { msisdnSelectionUseCase, msisdnReservations },
			expectedData: {
				msisdnSelections: {
					msisdnSelectionUseCase,
					msisdnReservations
				}
			}
		},
		{
			action: "releaseMsisdns",
			type: MsisdnSelectionActions.RELEASE_MSISDNS,
			data: { reservedFor: mockedMsisdnReservation.attributes && mockedMsisdnReservation.attributes.reservedFor, msisdnSelectionUseCase },
			expectedData: {
				msisdnSelections: {
					msisdnSelectionUseCase,
					reservedFor: mockedMsisdnReservation.attributes && mockedMsisdnReservation.attributes.reservedFor
				}
			}
		},
		{
			action: "releaseMsisdnsComplete",
			type: MsisdnSelectionActions.RELEASE_MSISDNS_COMPLETE,
			data: { reservedFor: mockedMsisdnReservation.attributes && mockedMsisdnReservation.attributes.reservedFor, msisdnSelectionUseCase },
			expectedData: {
				msisdnSelections: {
					msisdnSelectionUseCase,
					reservedFor: mockedMsisdnReservation.attributes && mockedMsisdnReservation.attributes.reservedFor
				}
			}
		},
		{
			action: "selectMsisdn",
			type: MsisdnSelectionActions.SELECT_MSISDN,
			data: { selectedMsisdn: "0401231234", poId: mockPoId, msisdnSelectionUseCase },
			expectedData: {
				msisdnSelections: {
					selectedMsisdn: "0401231234",
					poId: mockPoId,
					msisdnSelectionUseCase
				}
			}
		},
		{
			action: "selectMsisdnComplete",
			type: MsisdnSelectionActions.SELECT_MSISDN_COMPLETE,
			data: { selectedMsisdn: "0401231234", poId: mockPoId, msisdnSelectionUseCase, msisdnReservations },
			expectedData: {
				msisdnSelections: {
					selectedMsisdn: "0401231234",
					poId: mockPoId,
					msisdnSelectionUseCase,
					msisdnReservations
				}
			}
		},
		{
			action: "error",
			type: MsisdnSelectionActions.ERROR,
			data: { ...mockedMsisdnReservationError },
			expectedData: {
				msisdnSelections: {
					...mockedMsisdnReservationError
				}
			}
		}
	];
	specs.forEach(({ action, type, data, expectedData }: any) => {
		it(`action "${action}" return data with type: ${type}`, () => {
			const result = invoke(msisdnSelection, action, data);
			expect(result).toEqual({ type, ...expectedData });
		});
	});
});

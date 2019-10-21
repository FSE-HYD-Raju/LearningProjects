"use strict";

import { findStockIdsFromPOs } from "../msisdnSelection.utils";
import { MsisdnSelectionUseCase } from "../msisdnSelection.types";
import { testPo } from "./msisdnSelectionMockData";
import { get } from "lodash";

describe("Tests msisdnSelections.utils", () => {
	describe("findStockIdsFromPOs()", () => {
		it("Should find stock id's from from correct use case sub PO's", () => {
			expect(
				findStockIdsFromPOs(
					{ pos: get(testPo, "productOfferingGroups[0].productOfferings"), useCase: MsisdnSelectionUseCase.PATTERN_SEARCH }
				)
			).toHaveLength(2);
		});
	});
});

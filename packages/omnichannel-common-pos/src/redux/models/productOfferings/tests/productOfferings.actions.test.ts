"use strict";

import { invoke } from "lodash";
import { productOfferings, ProductOfferingsActions } from "../productOfferings.actions";

type ProductOfferings = typeof productOfferings;

const productOfferingId = "poId123456";

const productOffering = {
	id: productOfferingId,
	attributes: {
		name: "TestOffering"
	}
};

const errorString = "some_error";

describe("Test eligibility.actions: ", () => {
	it("should be an object", () => {
		expect(typeof productOfferings).toEqual("object");
	});

	const specs: Array<{
		action: keyof ProductOfferings;
		type: ProductOfferingsActions;
		data: any;
		expectedData: any;
	}> = [
		{
			action: "getProductOffering",
			type: ProductOfferingsActions.GET_PRODUCT_OFFERING,
			data: [productOfferingId],
			expectedData: {
				productOfferingId
			}
		},
		{
			action: "getProductOfferingComplete",
			type: ProductOfferingsActions.GET_PRODUCT_OFFERING_COMPLETE,
			data: [productOfferingId, productOffering],
			expectedData: {
				productOfferingId,
				productOffering
			}
		},
		{
			action: "getProductOfferingFailed",
			type: ProductOfferingsActions.GET_PRODUCT_OFFERING_FAILED,
			data: [productOfferingId, errorString],
			expectedData: {
				productOfferingId
			}
		}
	];

	specs.forEach(({ action, type, data, expectedData }: any) => {
		it(`action "${action}" return data with type: ${type}`, () => {
			const result = invoke(productOfferings, action, ...data);
			expect(result).toEqual({ type, ...expectedData });
		});
	});
});

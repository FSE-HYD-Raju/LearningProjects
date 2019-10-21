"use strict";

import { ProductOfferingsState } from "./productOfferings.types";
export { ProductOfferingsState };
import { ProductOfferingsActions, ProductOfferingsActionPayload } from "./productOfferings.actions";
import { ProductOffering } from "../../types";
import { default as ProductOfferingUtil } from "../../../utils/ProductOfferingUtil";

export const initialState = (): Partial<ProductOfferingsState> => ({
	queryStates: {},
	productOfferings: {}
});

const productOfferingsReducer = (state: Partial<ProductOfferingsState> = initialState(), action: ProductOfferingsActionPayload): any => {
	const { type, productOfferingId, productOffering, productOfferings } = action;
	switch (type) {
		case ProductOfferingsActions.GET_PRODUCT_OFFERING:
		case ProductOfferingsActions.GET_PRODUCT_OFFERING_WITH_LOADER:
			return {
				...state,
				queryStates: {...state.queryStates,  [productOfferingId]: {productOfferingQuery: true}}
			};
		case ProductOfferingsActions.GET_PRODUCT_OFFERING_COMPLETE:
			const updatedOfferings = {...state.productOfferings,
				[productOfferingId]: productOffering};
			return {
				...state,
				queryStates: {...state.queryStates,  [productOfferingId]: {productOfferingQuery: false}},
				productOfferings: updatedOfferings
			};
		case ProductOfferingsActions.GET_PRODUCT_OFFERING_FAILED:
			return {
				...state,
				queryStates: {...state.queryStates,  [productOfferingId]: {productOfferingQuery: false}}
			};
		case ProductOfferingsActions.GET_OPTIONAL_OFFERINGS:
			return {
				...state,
				queryStates: {...state.queryStates,
					 [productOfferingId]: {optionalOfferingsQuery: true}}
			};
		case ProductOfferingsActions.GET_OPTIONAL_OFFERINGS_COMPLETE:
			const existingProductOffering = state.productOfferings && state.productOfferings.productOfferingId || {} as ProductOffering;
			const freshNewProductOffering = {
				...existingProductOffering,
				attributes: {
					...existingProductOffering.attributes || {},
					optionalProductOfferings: productOfferings || []
				}
			} as ProductOffering;
			const pos = ProductOfferingUtil.makeDefaultSelections([freshNewProductOffering]);
			const updatedProductOfferings = {
				...state.productOfferings,
				[productOfferingId]: pos[0]
			};
			return {
				...state,
				queryStates: {...state.queryStates,  [productOfferingId]: {optionalOfferingsQuery: false}},
				productOfferings: updatedProductOfferings
			};
		case ProductOfferingsActions.GET_OPTIONAL_OFFERINGS_FAILED:
			return {
				...state,
				queryStates: {...state.queryStates,  [productOfferingId]: {optionalOfferingsQuery: false}}
			};
		default:
			return state;
	}
};

export default productOfferingsReducer;

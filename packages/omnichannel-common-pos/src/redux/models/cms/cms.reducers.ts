"use strict";

import { CmsActionPayload, CmsActions } from "./cms.actions";

export type CmsState = Record<string, any> & {
	stylesLoaded: boolean;
	styles: Array<{ css?: string }>;
	contentPage?: object;
};

const initialState = {
	stylesLoaded: false,
	styles: [],
};

const cmsReducer = (state: Partial<CmsState> = initialState, action: CmsActionPayload) => {
	const { type } = action;
	switch (type) {
		case CmsActions.GET_STYLES:
			return {...state, stylesLoaded: false};
		case CmsActions.GET_STYLES_COMPLETE:
			return {...state, styles: action.styles, stylesLoaded: true};
		case CmsActions.GET_STYLES_FAILED:
			return {...state, styles: {}, stylesLoaded: true};
		case CmsActions.GET_CURRENT_CONTENT_COMPLETED: {
			const { item, contentItemKey } = action;
			if (item && contentItemKey) {
				return {
					...state,
					[contentItemKey]: item
				};
			}
			return state;
		}
		case CmsActions.UPDATE_ON_CMS_ADMIN_SAVE_STYLES: {
			if (action.styles) {
				return {
					...state,
					styles: action.styles
				}
			}
			return state;
		}
		case CmsActions.GET_CONTENT_PAGE_WITH_CONTENT_COMPLETED:
			return {...state, styles: {}, stylesLoaded: true};
		default:
			return state;
	}
};

export default cmsReducer;

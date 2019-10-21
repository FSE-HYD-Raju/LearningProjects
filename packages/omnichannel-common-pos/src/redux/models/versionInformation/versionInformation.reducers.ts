"use strict";

import { get } from "lodash";
import { VersionInformationActions, VersionInformationActionPayload } from "./versionInformation.actions";
import { VersionInformationState, VersionInformationMockMode } from "./versionInformation.types";

const initialState = {
	commit: "not resolved yet",
	branch: "not resolved yet",
	version: "not resolved yet",
	show: false,
	mockdataDisplayMode: VersionInformationMockMode.VISIBLE,
	artifacts: []
};

const versionInformationReducer = (state: VersionInformationState = initialState, action: VersionInformationActionPayload) => {
	const { type } = action;
	switch (type) {
		case VersionInformationActions.FLUX_SYNC:
			return {
				...state,
				...action.fluxState
			};
		case VersionInformationActions.TOGGLE_MODE:
			return {
				...state,
				show: !state.show
			};
		case VersionInformationActions.SET_MODE:
			return {
				...state,
				mockdataDisplayMode: action.mode
			};
		case VersionInformationActions.GET_ARTIFACTS_INFO_COMPLETE:
			const NA = "n/a";
			const { commit = NA, branch = NA, version = NA } = get(action.info, "attributes.meta", {});
			const artifacts = get(action.info, "attributes.artifacts", []);
			return {
				...state, commit, branch, version, artifacts
			};
		default:
			return state;
	}
};

export { VersionInformationState };
export default versionInformationReducer;

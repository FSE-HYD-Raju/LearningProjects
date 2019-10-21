"use strict";

import { Action } from "redux";
import { ArtifactsInfoResponse, VersionInformationMockMode } from "./versionInformation.types";

export enum VersionInformationActions {
    FLUX_SYNC = "VersionInformation_FLUX_SYNC",

	GET_ARTIFACTS_INFO = "VersionInformation_GET_ARTIFACTS_INFO",
	GET_ARTIFACTS_INFO_COMPLETE = "VersionInformation_GET_ARTIFACTS_INFO_COMPLETE",
	GET_ARTIFACTS_INFO_FAIL = "VersionInformation_GET_ARTIFACTS_INFO_FAIL",

	TOGGLE_MODE = "VersionInformation_TOGGLE_MODE",
	SET_MODE = "VersionInformation_SET_MODE"
}

export interface VersionInformationActionPayload extends Action<VersionInformationActions> {
    fluxState?: any;
    error?: string;
	info?: ArtifactsInfoResponse;
	mode?: VersionInformationMockMode;
}

export const versionInformation = {
    fluxSync: (fluxState: any) => ({type: VersionInformationActions.FLUX_SYNC, fluxState}),

	getQArtifactInfo: () => ({type: VersionInformationActions.GET_ARTIFACTS_INFO}),
	getQArtifactInfoComplete: (info: ArtifactsInfoResponse) => ({type: VersionInformationActions.GET_ARTIFACTS_INFO_COMPLETE, info}),
	getQArtifactInfoFail: (error: any) => ({type: VersionInformationActions.GET_ARTIFACTS_INFO_FAIL, error}),

	toggleMode: () => ({type: VersionInformationActions.TOGGLE_MODE}),
	setMockdataDisplayMode: (mode: VersionInformationMockMode) => ({type: VersionInformationActions.SET_MODE, mode})

};

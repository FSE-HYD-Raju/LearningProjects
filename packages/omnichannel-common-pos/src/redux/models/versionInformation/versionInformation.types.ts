"use strict";

export enum VersionInformationMockMode {
	VISIBLE = "visible",
	HIDDEN = "hidden",
	HIGHLIGHT = "highlight"
}

export type VersionInformationState = {
	branch: string;
	commit: string;
	version: string;
	show: boolean;
	mockdataDisplayMode: VersionInformationMockMode;
	artifacts: Array<{name: string; commit: string; version: string; branch?: string; timestamp?: string}>;
};

export type ArtifactsInfoResponse = {
	attributes: {
		artifacts: VersionInformationState["artifacts"];
		meta: {
			title: string;
			version: string;
			commit: string;
			branch: string;
		}
	}
};

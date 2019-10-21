"use strict";
import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { lifecycle } from "recompose";
import { AppState, actions, VersionInformationMockMode } from "../../redux";

import VersionInformation, { VersionInformationProps, VersionInformationActionProps } from "./VersionInformation";

const mapStateToProps = (state: AppState): VersionInformationProps => {
	return {
		branch: state.versionInformation.branch,
		commit: state.versionInformation.commit,
		version: state.versionInformation.version,
		show: state.versionInformation.show,
		artifacts: state.versionInformation.artifacts,
		mockdataDisplayMode: state.versionInformation.mockdataDisplayMode,
		displayVersionInformation: process.env.NODE_ENV !== "production" || state.consul.displayVersionInformation
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): VersionInformationActionProps => {
	return {
		actions: {
			toggleMode: () => dispatch(actions.versionInformation.toggleMode()),
			setMockdataDisplayMode: (mode: VersionInformationMockMode) => dispatch(actions.versionInformation.setMockdataDisplayMode(mode)),
			fetchArtifactInfo: () => dispatch(actions.versionInformation.getQArtifactInfo())
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(
	lifecycle<VersionInformationProps & VersionInformationActionProps, any>({
		componentWillMount() {
			if (this.props.displayVersionInformation) {
				this.props.actions.fetchArtifactInfo();
			}
		}
	})(VersionInformation)
);

"use strict";
import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { AppState, actions } from "omnichannel-common-pos";
import { default as CreateOrganizationHOC, CreateOrganizationHOCStateProps, CreateOrganizationHOCActionProps } from "./CreateOrganizationHOC";

const mapStateToProps = (state: AppState): CreateOrganizationHOCStateProps => ({
	organizationCreation: state.organization.organizationCreation,
	organizationIdentification: state.consul.displayOptions.organizationIdentification,
	locale: state.consul.locale
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) : CreateOrganizationHOCActionProps => ({
	actions: {
		createOrganization: (payload: any) => {
			dispatch(actions.organization.createOrganization(payload));
		},
		clearOrganizationState: () => {
			dispatch(actions.organization.clearOrganizationState());
		}
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrganizationHOC);

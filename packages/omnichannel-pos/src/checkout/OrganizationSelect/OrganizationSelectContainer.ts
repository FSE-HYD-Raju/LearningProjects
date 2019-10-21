import * as React from "react";
import { connect } from "react-redux";
import {
	default as OrganizationSelect,
	OrganizationSelectProps
} from "./OrganizationSelect";
import { get } from "lodash";
import { AppState, OrganizationService } from "omnichannel-common-pos";

export interface OrganizationSelectContainerProps
	extends OrganizationSelectProps {
	CustomerCaseStore: any;
}

const mapStateToProps = (state: AppState, ownProps: OrganizationSelectContainerProps): OrganizationSelectProps => {
	const { CustomerCaseStore, ...rest } = ownProps;

	return {
		organizations: get(
			CustomerCaseStore,
			"activeCustomerCase.attributes.activeCustomer.personRelationships",
			[]
		),
		getOrganizationById: OrganizationService.getById,
		...rest
	};
};

export default connect(mapStateToProps)(OrganizationSelect);

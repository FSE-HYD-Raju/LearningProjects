import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { AppState, HasFlux, SalesOrganizationRole } from "omnichannel-common-pos";
import Availability, { AvailabilityActionProps, AvailabilityStateProps } from "./Availability";

interface AvailabilityContainerOwnProps extends HasFlux {
	sku: string;
}

const mapStateToProps = (state: AppState, ownProps: AvailabilityContainerOwnProps): AvailabilityStateProps => {
	const { salesOrganizations, orgIdToInventories } = state.salesRepSession;
	const salesOrgs = salesOrganizations && salesOrganizations.map((salesOrg: SalesOrganizationRole) => {
		const id = salesOrg && salesOrg.attributes && (salesOrg.attributes.externalId || salesOrg.attributes.code);
		return { id: id! }; // safe?
	});

	return {
		sku: ownProps.sku,
		salesOrgs: salesOrgs,
		orgIdToInventories: orgIdToInventories,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: AvailabilityContainerOwnProps): AvailabilityActionProps => ({
	actions: {
		getOrgsAndItsInventories: ownProps.flux.actions.SalesRepSessionActions.getOrgsAndItsInventories,
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Availability);

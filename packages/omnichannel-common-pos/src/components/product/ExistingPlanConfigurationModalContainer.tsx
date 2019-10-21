import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import {
	HasFlux,
	ProductOffering,
} from "../../redux/types";
import { AppState } from "../../redux/reducers";
import ExistingPlanConfigurationModal, {
	ExistingPlanConfigurationModalActionProps,
	ExistingPlanConfigurationModalStateProps
} from "./ExistingPlanConfigurationModal";

interface PlansContainerOwnProps extends HasFlux {
	plan?: ProductOffering;
	parentProductId: string;
}

const mapStateToProps = (state: AppState, ownProps: PlansContainerOwnProps): ExistingPlanConfigurationModalStateProps => {
	return {
		showModal: true,
		individualId: state.user.user && state.user.user.individualId,
		plan: ownProps.plan,
		parentProductId: ownProps.parentProductId,
		productConfigurationSummary: state.sales.productConfigurationSummary,
		productConfigurationErrors: state.sales.productConfigurationErrors,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: PlansContainerOwnProps): ExistingPlanConfigurationModalActionProps => {
	const { actions } = ownProps.flux;
	return 	{
		actions: {
			submitProductConfiguration: actions.SalesActions.submitProductConfiguration,
			terminateProductConfiguration: actions.SalesActions.resetProductConfiguration,
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ExistingPlanConfigurationModal);
export {
	PlansContainerOwnProps
};

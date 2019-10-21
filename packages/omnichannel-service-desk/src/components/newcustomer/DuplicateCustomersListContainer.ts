import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { AppState, HasFlux, actions } from "omnichannel-common-pos";
import {
	default as DuplicateCustomersList,
	DuplicateCustomersListStateProps,
	DuplicateCustomersListActionProps,
} from "./DuplicateCustomersList";

const mapStateToProps = (state: AppState): DuplicateCustomersListStateProps => {
	return {
		customerToCreate: state.customer.customerToCreate,
		customers: state.customer.customers,
		matchForIdTypeAndNumber: state.customer.matchForIdTypeAndNumber,
	}
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: HasFlux): DuplicateCustomersListActionProps => ({
	actions: {
		ignoreDuplicates: ownProps.flux.actions.CustomerActions.ignoreDuplicates,
		setCustomer: ownProps.flux.actions.CustomerCaseActions.setCustomer,
		clearSearch: ownProps.flux.actions.CustomerActions.clearSearch,
		showCustomerCreationModal: (keepExistingCustomer: boolean) => {
			dispatch(actions.navBar.showCustomerCreationModal(keepExistingCustomer));
		}
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(DuplicateCustomersList);

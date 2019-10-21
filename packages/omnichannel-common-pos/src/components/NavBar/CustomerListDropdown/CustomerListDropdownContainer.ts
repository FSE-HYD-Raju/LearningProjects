import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { CustomerAccount } from "../../../redux";
import CustomerListDropdown, { CustomerListDropdownActionProps } from "./CustomerListDropdown";
import actions from "../../../redux/actions";

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): CustomerListDropdownActionProps => {
	return {
		actions: {
			setActiveCustomerAccount: (customerAccount: CustomerAccount) => {
				dispatch(actions.customer.setActiveCustomerAccount(customerAccount));
			},
		}
	};
};

export default connect(null, mapDispatchToProps)(CustomerListDropdown);

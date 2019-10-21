import CustomerListDropdownContainer from "../CustomerListDropdown/CustomerListDropdownContainer";
import cssns from "../../../utils/cssnsConfig";
import { PureComponent } from "react";
import { RouteComponentProps, withRouter, StaticContext } from "react-router";
import { isEmpty } from "lodash";
import { User, Customer, CustomerAccount } from "../../../redux";
import NavBarSearchMenu from "../NavBarSearchMenu/NavBarSearchMenu";
import { commonServiceDeskRoutes } from "../../../routes/commonRoutesMap";
import IntlContainer from "../../../channelUtils/IntlContainer";
import { OcButton, OcButtonType } from "../../ocComponents";

const { React } = cssns("NavBar");

interface CustomerSelectionState {
	criteria: string;
	showCustomerListDropdown: boolean;
	confirmModalVisible: boolean;
}

interface CustomerSelectionStateProps {
	user?: User;
	searchConfigs: string;
	singleTerm?: string;
	singleTermCustomers?: Array<Customer>;
	searchingForSingleCustomer: boolean;
	hasActiveCustomerCase: boolean; // !!activeCusterCase
}

interface CustomerSelectionActionProps {
	actions: {
		clearSingleTermSearch: () => void;
		searchCustomerWithSingleTerm: (term: string, criteria: string) => void;
		setSingleTerm: (ter: string) => void;
		showCustomerCreationModal: (show: boolean) => void;
		setCustomer: (customer: Customer, active: boolean) => void;
		createNewCustomerCase: (salesRepId?: string) => void;
		deleteUIbasket: () => void;
		cancelAddProduct: () => void;
		resetConfigurations: () => void;
		resetAddressWithBasketItemIdEntries: () => void;
		resetLocations: () => void;
	};
}

type CustomerSelectionProps = CustomerSelectionStateProps & CustomerSelectionActionProps & RouteComponentProps<any>;

class CustomerSelection extends PureComponent<CustomerSelectionProps, CustomerSelectionState> {
	static displayName: string = "CustomerSelection";

	constructor(props: CustomerSelectionProps) {
		super(props);

		this.state = {
			criteria: "name",
			showCustomerListDropdown: false,
			confirmModalVisible: false
		};
	}

	searchCustomers = (e: React.SyntheticEvent<any>) => {
		e.preventDefault();

		if (!this.props.singleTerm || isEmpty(this.props.singleTerm) || isEmpty(this.props.singleTerm.trim())) {
			this.setState({
				showCustomerListDropdown: false
			});
			this.props.actions.clearSingleTermSearch();
			return;
		}

		this.props.actions.searchCustomerWithSingleTerm(this.props.singleTerm, this.state.criteria);

		this.setState({
			showCustomerListDropdown: true
		});
	};

	handleCriteriaChange = (val: string) => {
		this.setState({
			criteria: val
		});
	};

	handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.props.actions.setSingleTerm(e.target.value);
	};

	closeCustomerSearch = (resetTerm?: boolean) => {
		if (resetTerm) {
			this.props.actions.setSingleTerm("");
		}

		this.setState({
			showCustomerListDropdown: false
		});
	};

	selectCustomer = (customer: Customer) => {
		if (this.state.showCustomerListDropdown) {
			this.props.actions.deleteUIbasket();
			this.props.actions.cancelAddProduct();
			this.props.actions.resetConfigurations();
			this.props.actions.createNewCustomerCase();
			this.props.actions.resetAddressWithBasketItemIdEntries();
			this.props.actions.resetLocations();

		}
		this.props.actions.setCustomer(customer, true);
		this.props.actions.setSingleTerm("");
		this.closeCustomerSearch(true);
		this.props.history.push(commonServiceDeskRoutes.SERVICE_DESK_CUSTOMER.createLink());
	};

	showCustomerCreationModal = (show: boolean) => {
		this.closeCustomerSearch();
		this.props.actions.showCustomerCreationModal(show);
	};

	render() {
		if (!this.props.hasActiveCustomerCase) {
			return null;
		}

		return (
			<form className="customer-selection" id="w-app-search" onSubmit={this.searchCustomers}>
				{this.state.showCustomerListDropdown && (
					<CustomerListDropdownContainer
						singleTermCustomers={this.props.singleTermCustomers}
						selectCustomer={this.selectCustomer}
						closeCustomerSearch={this.closeCustomerSearch}
						showCustomerCreationModal={() => this.showCustomerCreationModal(true)}
						searchTerm={this.props.singleTerm}
						searchingForSingleCustomer={this.props.searchingForSingleCustomer}
					/>
				)}
				<div className="input-group">
					<IntlContainer>
						<NavBarSearchMenu
							criteria={this.state.criteria}
							unparsedSearchConfigs={this.props.searchConfigs}
							handleCriteriaChange={this.handleCriteriaChange}
						/>
					</IntlContainer>
					<input
						id="navbar-search"
						className="form-control"
						onChange={this.handleSearchInput}
						value={this.props.singleTerm}
					/>
					<div className="input-group-append">
						<OcButton
							htmlBtnType="submit"
							buttonType={OcButtonType.DEFAULT}
							id="navbar_search_button"
							onClick={this.searchCustomers}
						>
							<i className="fa fa-search" />
						</OcButton>
					</div>
				</div>
			</form>
		);
	}
}

const CustomerSelectionWithRouter: React.ComponentClass<
	CustomerSelectionStateProps & CustomerSelectionActionProps
> = withRouter<CustomerSelectionProps>(CustomerSelection);

export default CustomerSelectionWithRouter;

export {
	RouteComponentProps,
	StaticContext,
	CustomerSelectionActionProps,
	CustomerSelectionStateProps,
	CustomerSelectionProps,
	CustomerSelectionState,
	CustomerSelection as CustomerSelectionUnwrapped
};

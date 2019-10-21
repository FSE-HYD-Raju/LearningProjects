import cssns from "../../../utils/cssnsConfig";
import onClickOutside, { HandleClickOutside, InjectedOnClickOutProps, OnClickOutProps } from "react-onclickoutside";
import { get, isEmpty } from "lodash";
import messages from "./CustomerListDropdown.messages";
import { Component, ValidationMap } from "react";
import { Customer, PhoneNumber, PostalAddress, CustomerAccount, CustomerAccountLifecycleStatusEnum } from "../../../redux";
import FormattedMessage from "../../../channelUtils/FormattedMessage";
import { ContextType, contextTypesValidationMap } from "../../../types";
import { OcButtonType, OcButton } from "../../ocComponents/button/OcButton";
import * as classnames from "classnames";
const { React } = cssns("CustomerListDropdown");

interface CustomerListDropdownStateProps {
	closeCustomerSearch?: () => void;
	showCustomerCreationModal?: () => void;
	searchTerm?: string;
	searchingForSingleCustomer?: boolean;
	selectCustomer?: (customer: Customer) => void;
	singleTermCustomers?: Array<Customer>;
}

interface CustomerListDropdownState {
	customerSearchInput: string;
	currentPage: number;
}
interface CustomerListDropdownActionProps {
	actions: {
		setActiveCustomerAccount: (customerAccount: CustomerAccount) => void;
	};
}

type CustomerListDropdownProps = CustomerListDropdownStateProps  & CustomerListDropdownActionProps;

class CustomerListDropdown extends Component<CustomerListDropdownProps & InjectedOnClickOutProps, CustomerListDropdownState>
	implements HandleClickOutside<any> {
	static contextTypes: ValidationMap<ContextType> = contextTypesValidationMap;
	customersPerPage: number;
	constructor(props: CustomerListDropdownProps & InjectedOnClickOutProps) {
		super(props);
		this.state = {
			customerSearchInput: "",
			currentPage: 1,
		};
		if (process.env.BROWSER) {
			props.enableOnClickOutside();
		}
		this.customersPerPage = 3;
	}

	handleClickOutside = () => {
		if (this.props.closeCustomerSearch) {
			this.props.closeCustomerSearch();
		}
	};

	getFirstMedia = (medias?: Array<any>) => {
		if (medias && medias.length > 0) {
			return medias[0];
		}
		return undefined;
	};

	getAddress = (customer: Customer): string => {
		const address: PostalAddress | undefined = this.getFirstMedia(customer.attributes!.postalAddresses);
		if (address) {
			return `${address.street || ""}, ${address.postalCode || ""}, ${address.city || ""}`;
		}
		return "";
	};

	getMsisdn = (customer: Customer): string => {
		const msisdn: PhoneNumber = this.getFirstMedia(customer.attributes!.mobileNumbers);
		return msisdn && msisdn.number ? msisdn.number : "";
	};

	getName = (customer: Customer): string => {
		return get(customer, "attributes.formattedName", "");
	};

	getEmail = (customer: Customer): string => {
		const { attributes = { emails: [] } } = customer;
		return attributes.emails && attributes.emails.length ? attributes.emails[0].email : "";
	};

	listItemClickHandler = (customer: Customer, customerAccount: CustomerAccount = { id: "" }) => {
		if (this.props.selectCustomer) {
			this.props.actions.setActiveCustomerAccount(customerAccount);
			this.props.selectCustomer(customer);
		}
	};

	getCustomerAccounts = (customer: Customer) => {
		return customer && customer.customerAccounts;
	}

	handleCustomerSearchInput = (e: any) => {
		this.setState({
			customerSearchInput: e.target.value
		});
		this.resetCurrentPage();
	};

	getCurrentPageList = (currentPage: number, customers: Array<Customer>) => {
		return customers.slice((currentPage * this.customersPerPage) - this.customersPerPage, (currentPage * this.customersPerPage));
	}

	paginateToNextPage = () => {
		this.setState((prevState) => {
			return { currentPage: prevState.currentPage + 1 };
		});
	}

	paginateToPrevPage = () => {
		this.setState((prevState) => {
			return {
				currentPage: prevState.currentPage - 1,
			};
		});
	}

	resetCurrentPage = () => {
		this.setState({
			currentPage: 1
		});
	}

	filterCustomerDetails = (customers: Array<Customer>, customerSearchInput: string) => {
		return customers.filter((customer: Customer) => {
			return customer.attributes &&
				customer.attributes.formattedName
				&& customer.attributes.formattedName.toLowerCase().includes(customerSearchInput.toLowerCase());
		});
	}

	calculatePaginationinfo = (customers: Array<Customer>, currentPageCustomerList: Array<Customer>) => {
		let startingItem = 0;
		let endingItem = 0;
		let totalItems = 0;
		const { currentPage } = this.state;
		const totalPages = Math.ceil(customers.length / this.customersPerPage) || 1;
		const isFirst = !(this.state.currentPage > 1);
		const isLast = this.state.currentPage === totalPages;

		if (customers.length > 0) {
			totalItems = customers.length;
			startingItem = (currentPage * this.customersPerPage) - this.customersPerPage + 1;
			endingItem = (currentPage * this.customersPerPage) - this.customersPerPage + currentPageCustomerList.length;
		}
		return {
			totalPages,
			isFirst,
			isLast,
			startingItem,
			endingItem, 
			totalItems
		};
	}

	render() {
		const isCustomerNotFound: boolean = isEmpty(this.props.singleTermCustomers);
		const { formatMessage } = this.context.intl;
		const { customerSearchInput, currentPage } = this.state;
		const { singleTermCustomers = [] } = this.props;
		const filteredCustomerDetails = this.filterCustomerDetails(singleTermCustomers, customerSearchInput);
		const currentPageCustomerList = this.getCurrentPageList(currentPage, filteredCustomerDetails);
		const { isFirst = true, isLast = true, totalPages = 1, endingItem, startingItem, totalItems } = this.calculatePaginationinfo(filteredCustomerDetails, currentPageCustomerList);
		const prevArrowClasses = classnames({ "=page-item": true, disabled: isFirst });
		const nextArrowClasses = classnames({ "=page-item": true, disabled: isLast });

		return (
			<div className="customer-list-dropdown dropdown-menu show">
				{this.props.searchingForSingleCustomer ? (
					<div className="customer-list-message">
						<div className="customer-list-searching">
							<FormattedMessage
								{...messages.searching}
								values={{
									terms: <b>{this.props.searchTerm}</b>
								}}
							/>
							<i className="fa fa-spinner fa-spin btn-icon-right" />
						</div>
					</div>
				) : (
						<div className="customer-list-message">
							{isCustomerNotFound && (
								<div className="customer-list-nothing-found">
									<FormattedMessage
										{...messages.noResultsFound}
										values={{ terms: this.props.searchTerm }}
									/>
								</div>
							)}
						</div>
					)}
				<div className="dropdown-wrapper">
					{!this.props.searchingForSingleCustomer &&
						!isCustomerNotFound && (
							<div className="customer-dropdown-header">
								<div className="search">
									<form >
										<div className="input-group">
											<input
												type="search"
												className="form-control"
												id="customer-list-dropdown"
												value={this.state.customerSearchInput}
												placeholder={formatMessage({ ...messages.searchPlaceholder })}
												onChange={this.handleCustomerSearchInput}
											/>
											<div className="input-group-append">
												<OcButton
													outline={true}
													buttonType={OcButtonType.SECONDARY}
													icon="fa-search"
												/>
											</div>
										</div>
									</form>
								</div>

								<div className="pagination-container">
									<span className="pagination-info">
										<FormattedMessage {...messages.items} /> <strong>{startingItem}</strong> <FormattedMessage {...messages.hyphenSymbol} /> <strong>{endingItem}</strong> <FormattedMessage {...messages.ofText} /> <strong>{totalItems}</strong>
									</span>
									<nav className="pagination-buttons">
										<ul className="=pagination">
											<li className={prevArrowClasses} key="page-item-prev">
												<button className="=page-link" type="button" id="page-item-prev-btn" disabled={isFirst} onClick={this.paginateToPrevPage}>
													<i className="fas fa-angle-left" />
												</button>
											</li>
											<li className={nextArrowClasses} key="page-item-next">
												<button className="=page-link" type="button" id="page-item-next-btn" disabled={isLast} onClick={this.paginateToNextPage}>
													<i className="fas fa-angle-right" />
												</button>
											</li>
										</ul>
									</nav>
								</div>
							</div>)
					}

					<div className="dropdown-body">
						{!this.props.searchingForSingleCustomer && !isCustomerNotFound && currentPageCustomerList.map((customer: Customer) => {
							const name = this.getName(customer);
							const address = this.getAddress(customer);
							const msisdn = this.getMsisdn(customer);
							const email = this.getEmail(customer);
							const customerAccounts: Array<CustomerAccount> = this.getCustomerAccounts(customer) || [];
							return (<div key={customer.id} className="tile-wrapper">
								<div className="header-wrapper">
									<h5 className="name">{name}</h5>
								</div>
								<div className="search-wrapper">
									{address && <div className="address">
										<i className="fas fa-envelope" />
										{address}
									</div>}
									{msisdn && <div className="phone">
										<i className="fas fa-phone-square" />
										{msisdn}
									</div>}
									{email && <div className="email">
										<i className="fas fa-at" />
										{email}
									</div>}
								</div>
								{customerAccounts.length ? (customerAccounts.map(
									(customerAccount: CustomerAccount) => {
										const { accountId = "", name = "", lifecycleStatus = "" } = customerAccount.attributes || {};
										const customerLifecycleClasses = classnames({
											badge: true,
											"badge-outline-success": lifecycleStatus === CustomerAccountLifecycleStatusEnum.ACTIVE,
											"badge-outline-secondary": lifecycleStatus === CustomerAccountLifecycleStatusEnum.INACTIVE,
											"badge-outline-danger": lifecycleStatus === CustomerAccountLifecycleStatusEnum.SUSPENDED,
											"badge-outline-warning": lifecycleStatus === CustomerAccountLifecycleStatusEnum.PENDING,
										});
										return (<div className="accounts-wrapper " key={accountId}>
											<div className="account-number " onClick={() => this.listItemClickHandler(customer, customerAccount)}>
												<span className="link">{accountId}</span>
											</div>
											<div className="account-type ">{name}</div>
											<div className="account-status col-3">
												<span className={customerLifecycleClasses}>{lifecycleStatus}</span>
											</div>
										</div>);
									}
								)) : <div className="link no-account" onClick={() => this.listItemClickHandler(customer)}>
										<FormattedMessage {...messages.noCustomerAccount} />
									</div>
								}
							</div>);
						})}
					</div>
				</div>

				<footer className="customer-list-footer">
					<a
						className="customer-list-footer-button"
						onClick={this.props.showCustomerCreationModal}
						href="javascript:"
					>
						<i className="fa fa-plus btn-icon-left" />
						<FormattedMessage {...messages.createCustomer} />
					</a>
				</footer>
			</div>
		);
	}
}
const CustomerListDropdownWithClickOutside = onClickOutside<CustomerListDropdownProps>(CustomerListDropdown);

export default CustomerListDropdownWithClickOutside;

export {
	OnClickOutProps,
	CustomerListDropdownStateProps,
	CustomerListDropdownActionProps,
	CustomerListDropdownProps
};

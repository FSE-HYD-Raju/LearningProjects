import { cssns, FormattedMessage, actions, contextTypesValidationMap } from "omnichannel-common-pos";
import { Component } from "react";
import { get } from "lodash";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import onClickOutside from "react-onclickoutside";
import CustomerCaseBarButton from "./CustomerCaseBarButton";
import messages from "./CustomerCaseBar.messages";
import { connect } from "react-redux";

const { React } = cssns("CustomerCaseBar");

@onClickOutside
class CustomerCaseBar extends Component {
	static displayName = "CustomerCaseBar";
	static contextTypes = contextTypesValidationMap;

	static propTypes = {
		CustomerCaseActions: PropTypes.object.isRequired,
		CustomerCaseStore: PropTypes.object.isRequired,
		UserStore: PropTypes.object.isRequired,
		UserActions: PropTypes.object.isRequired,
		enableOnClickOutside: PropTypes.func,
		history: PropTypes.object,
		posShowSummaryData: PropTypes.bool,
		activeCustomerAccountId: PropTypes.string,
	};

	constructor(props, context) {
		super(props, context);

		this.state = {
			endBtnDisabled: false,
			moreActionsDropdownVisible: false,
			customerSessionDropdownVisible: false
		};
	}

	componentWillReceiveProps(newProps) {
		const customerCaseId = get(
			newProps.CustomerCaseStore,
			"activeCustomerCase.id",
			null
		);

		if (customerCaseId) {
			this.setState({
				endBtnDisabled: true
			});
		}
	}

	handleClickOutside = () => {
		this.setState({
			moreActionsDropdownVisible: false,
			customerSessionDropdownVisible: false
		});
	};

	toggleMoreActions = () => {
		this.setState({
			moreActionsDropdownVisible: !this.state
				.moreActionsDropdownVisible,
			customerSessionDropdownVisible: false
		});
	};

	toggleCustomerSession = () => {
		this.setState({
			customerSessionDropdownVisible: !this.state
				.customerSessionDropdownVisible,
			moreActionsDropdownVisible: false
		});
	};

	endCustomerCase = redirectUrl => {
		this.props.CustomerCaseActions.endCustomerCase(redirectUrl);
	};

	render() {
		const customerName = get(
			this.props.CustomerCaseStore,
			"activeCustomerCase.attributes.activeCustomer.formattedName",
			""
		);

		// TODO the Person returned in new Prospect should contain some attribute, that tells us that the Customer does not yet exist
		const unknownCustomer = !customerName;

		const phoneAndName =
			this.props.CustomerCaseStore &&
			this.props.CustomerCaseStore.getFormattedPhoneAndName &&
			this.props.CustomerCaseStore.getFormattedPhoneAndName();

		const address =
			this.props.CustomerCaseStore &&
			this.props.CustomerCaseStore.getFormattedAddress &&
			this.props.CustomerCaseStore.getFormattedAddress();

		const { activeCustomerAccountId } = this.props;

		return (
			<nav className="w-nav-context">
				<div>
					{!unknownCustomer ? (
						<span className="identified-customer-info">
							<i className="fa fa-user customer-info-icon" />
							<span
								className="customer-info-headline"
								id="pos-active-customer-phone-and-name"
							>
								<FormattedMessage
									{...messages.customerLabel}
									values={{ phoneAndName }}
								/>
							</span>
							<span
								className="customer-account-id"
								id="pos-active-customer-account-id"
							>
								{activeCustomerAccountId ?  activeCustomerAccountId  : (<FormattedMessage {...messages.noCustomerAccount} />)}
							</span>
							{address && (
								<span
									className="customer-info-address"
									id="pos-active-customer-address"
								>
									<FormattedMessage
										{...messages.activeCustomerAddress}
										values={{ address }}
									/>
								</span>
							)}
						</span>
					) : (
						<span className="unidentified-customer-info">
							<i className="fa fa-question-circle customer-info-icon" />
							<span className="customer-info-headline">
								<FormattedMessage {...messages.guestCustomer} />
							</span>
						</span>
					)}
				</div>

				{unknownCustomer ? (
					<CustomerCaseBarButton
						id="CustomerCaseBar-buttons"
						onClick={() => this.context.flux.reduxStore.dispatch(actions.navBar.showCustomerCreationModal(true))}
					>
						<FormattedMessage {...messages.customerCaseBareCreateCustomer} />
					</CustomerCaseBarButton>
				) : (
					<div className="btn-toolbar">
						{this.props.posShowSummaryData &&
							<div className="btn-group" id="CustomerCaseBar-buttons">
								<CustomerCaseBarButton>
									<FormattedMessage {...messages.topUpButton} />
								</CustomerCaseBarButton>
								<CustomerCaseBarButton>
									<FormattedMessage {...messages.chaneSimButton} />
								</CustomerCaseBarButton>
								<CustomerCaseBarButton>
									<FormattedMessage {...messages.reportIssueButton} />
								</CustomerCaseBarButton>
								<CustomerCaseBarButton>
									<FormattedMessage {...messages.refundsButton} />
								</CustomerCaseBarButton>
								<div className="btn-group dropdown">
									<CustomerCaseBarButton
										onClick={this.toggleMoreActions}
										className="dropdown-toggle"
									>
										<FormattedMessage {...messages.moreActionsBtn} />
									</CustomerCaseBarButton>
									<div
										className={`dropdown-menu ${this.state.moreActionsDropdownVisible ? "show" : ""}`}
									>
										<div className="dropdown-item">
											<FormattedMessage {...messages.someActionBtnOne} />
										</div>
										<div className="dropdown-item">
											<FormattedMessage {...messages.someActionBtnTwo} />
										</div>
									</div>
								</div>
							</div>
						}
						<div className="btn-group dropdown CustomerCaseBar-customer-session-button">
							<CustomerCaseBarButton
								id="CustomerCaseBar-dropdown-button-customer-session"
								onClick={this.toggleCustomerSession}
								className="dropdown-toggle"
							>
								<FormattedMessage {...messages.customerSessionBtn} />
							</CustomerCaseBarButton>

							<div
								className={`dropdown-menu dropdown-menu-right ${this
									.state.customerSessionDropdownVisible
									? "show"
									: ""}`}
							>
								{this.props.CustomerCaseStore
									.activeCustomerCase && (
									<div>
										<button
											type="button"
											id="service-desk-end-customer-case-button"
											onClick={() =>
												this.endCustomerCase(
													"/servicedesk/shop"
												)}
											className="dropdown-item"
										>
											<FormattedMessage {...messages.endCustomerCase} />
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				)}
			</nav>
		);
	}
}

const mapStateToProps = state => {
	return {
		posShowSummaryData: state.feature.posShowSummaryData,
		activeCustomerAccountId:
			(state.customer.activeCustomerAccount && state.customer.activeCustomerAccount.attributes.accountId) || state.customerCase.customerAccountNumber,
	};
};

export default withRouter(connect(mapStateToProps)(CustomerCaseBar));

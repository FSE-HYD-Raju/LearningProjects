import * as React from "react";
import {
	CharacteristicsComparisonModalContainer,
	CustomerListDropdownContainer,
	OcModal,
	OcTabLink,
	User,
	ContextType,
	FormattedMessage,
	contextTypesValidationMap,
	ComparisonFooterContainer,
	ProductOfferingConfigurationModalContainer,
	NavBarSearchMenu,
	Customer,
	InstallationTimeConfig,
	CustomerCase, OcButton, OcButtonType, ProductPath,
	CustomerBasketsContainer,
} from "omnichannel-common-pos";
import Helmet from "react-helmet";
import StartCustomerCase from "./StartCustomerCase";
import { get, isEmpty } from "lodash";
import * as classnames from "classnames";
import messages from "./ServiceDesk.messages";
import { RouteComponentProps } from "react-router";
import SalesOrganizationModalContainer from "./salesRep/SalesOrganizationModalContainer";
import InstallationTimeConfigurationModal from "./modals/InstallationTimeConfigurationModal";

const ServiceDeskContainerRoutes = require("../routes/ServiceDeskContainerRoutes");

interface ServiceDeskContainerStateProps {
	toolmode: boolean;
	toolmodeIndividualId: string | null;
	user?: User;
	activeCustomerCase: CustomerCase;
	showNoCustomerWarning: boolean;
	showBlacklistedCustomerWarning: boolean;
	singleTermCustomers: Array<any>; // should be Array<Person>
	searchingForSingleCustomer?: boolean;
	showCustomerCreationModal?: boolean;
	showInstallationTimeConfigurationModal: boolean;
	installationTimeConfig?: InstallationTimeConfig;
	posRoutes?: React.ComponentType<any>;
	searchConfigs: string;
	consulValuesLoaded: boolean;
	enableNavbarInToolmode: boolean;
}

interface ServiceDeskContainerActionProps {
	actions: {
		getCustomerById: (customerId: string) => void;
		createNewCustomerCase: (saledRepId?: string) => void;
		showCustomerCreationModal: (keepCustomer: boolean) => void;
		searchCustomerWithSingleTerm: (term: string, criteria: string) => void;
		setCustomer: (customer: Customer, fetchUserBaskets: boolean) => void;
		cancelAddProduct: () => void;
		getAgreements: (customerId: string) => void;
		toggleInstallationTimeConfigurationModal: (show: boolean, config?: InstallationTimeConfig) => void;
		setInputtedCharacteristic: (path: ProductPath, key: string, value: string) => void;
		resetConfigurableInstallationTime: () => void;
		hideNoCustomerWarning: () => void;
	};
}

interface ServiceDeskContainerState {
	customerSearchInput?: string;
	showRegistrationModal?: boolean;
	customerSearchVisible?: boolean;
	criteria: string;
}

type ServiceDeskContainerProps = ServiceDeskContainerStateProps & ServiceDeskContainerActionProps & RouteComponentProps<any>;

class ServiceDeskContainer extends React.Component<ServiceDeskContainerProps, ServiceDeskContainerState> {
	static contextTypes = contextTypesValidationMap;

	constructor(props: ServiceDeskContainerProps, context: ContextType) {
		super(props, context);
		this.state = {
			customerSearchInput: "",
			criteria: "name"
		};
	}

	componentWillMount() {
		const { toolmode, toolmodeIndividualId } = this.props;
		if (toolmode) {
			this.initToolMode(toolmodeIndividualId);
		}
	}

	async initToolMode(individualId: string | null) {
		const salesRepId = this.props.user && this.props.user.id;
		if (individualId) {
			await this.props.actions.getCustomerById(individualId);
		}
		this.props.actions.createNewCustomerCase(salesRepId);
		if (individualId) {
			this.props.actions.getAgreements(individualId);
		}

		if (this.props.location.pathname) {
			this.props.history.push(this.props.location.pathname);
		}
	}

	handleCriteriaChange = (val: string) => {
		this.setState({
			...this.state,
			criteria: val
		});
	};

	handleCustomerSearchModalInput = (e: any) => {
		this.setState({
			customerSearchInput: e.target.value
		});
	};

	handleCustomerSearch = (e: any) => {
		e.preventDefault();
		if (this.state.customerSearchInput) {
			this.props.actions.searchCustomerWithSingleTerm(this.state.customerSearchInput, this.state.criteria);

			this.setState({
				customerSearchVisible: true
			});
		}
	};

	closeCustomerSearch = () => {
		this.setState({
			customerSearchVisible: false
		});
	};

	selectCustomer = (customer: any) => { // should be Person or User here
		if (!isEmpty(customer)) {
			this.props.actions.setCustomer(customer, true);
			this.setState(
				{
					customerSearchInput: "",
					customerSearchVisible: false
				},
			);
			this.props.actions.hideNoCustomerWarning();
		}
	};

	renderSalesOrganizationModal = () => {
		return <SalesOrganizationModalContainer flux={this.context.flux} />;
	};

	renderInstallationTimeConfigurationModal = () => {
		const {
			toggleInstallationTimeConfigurationModal,
			setInputtedCharacteristic,
			resetConfigurableInstallationTime,
		} = this.props.actions;

		return (
			<InstallationTimeConfigurationModal
				showInstallationTimeConfigurationModal={this.props.showInstallationTimeConfigurationModal}
				toggleInstallationTimeConfigurationModal={toggleInstallationTimeConfigurationModal}
				installationTimeConfig={this.props.installationTimeConfig}
				setInputtedCharacteristic={setInputtedCharacteristic}
				resetConfigurableInstallationTime={resetConfigurableInstallationTime}
			/>
		);
	};

	renderUnidentifiedCustomerModal = () => {
		// NOTE: Fix for visual bug when this component is shown with compare modal.
		const backdropStyle = { zIndex: 1050 };
		return (
			<OcModal
				id="UnidentifiedCustomerModal"
				showModal={this.props.showNoCustomerWarning}
				smallModal={true}
				backdropStyle={backdropStyle}
				title={this.context.intl.formatMessage(messages.cantAddProduct)}
				onClose={() => this.props.actions.cancelAddProduct()}
			>
				<div>
					<h4>
						<FormattedMessage {...messages.serviceDeskUnidentified}/>
					</h4>

					<div className="search-or-create-customer">
						<form onSubmit={this.handleCustomerSearch}>
							<div className="input-group">
								<NavBarSearchMenu
									criteria={this.state.criteria}
									unparsedSearchConfigs={this.props.searchConfigs}
									handleCriteriaChange={this.handleCriteriaChange}
								/>
								<input
									type="search"
									className="form-control"
									id="customerSearchFieldToAddProductToBasket"
									value={this.state.customerSearchInput}
									placeholder={this.context.intl.formatMessage(
										messages.searchCustomerPlaceholder
									)}
									onChange={this.handleCustomerSearchModalInput}
								/>
								<div className="input-group-append">
									<OcButton
										outline={true}
										buttonType={OcButtonType.PRIMARY}
										onClick={this.handleCustomerSearch}
										icon="fa-search"
									/>
								</div>
							</div>
						</form>
						{this.state.customerSearchVisible && (
							<CustomerListDropdownContainer
								singleTermCustomers={this.props.singleTermCustomers}
								selectCustomer={this.selectCustomer}
								closeCustomerSearch={this.closeCustomerSearch}
								showCustomerCreationModal={() => this.props.actions.showCustomerCreationModal(true)}
								searchTerm={this.state.customerSearchInput}
								searchingForSingleCustomer={this.props.searchingForSingleCustomer}
							/>
						)}
						<b className="or">
							<FormattedMessage {...messages.or}/>
						</b>
						<OcButton
							buttonType={OcButtonType.PRIMARY}
							onClick={() => this.props.actions.showCustomerCreationModal(true)}
						>
							<FormattedMessage {...messages.createNewCustomer} />
						</OcButton>
					</div>
				</div>
			</OcModal>
		);
	};

	renderBlacklistedCustomerModal = () => {
		// NOTE: Fix for visual bug when this component is shown with compare modal.
		const backdropStyle = { zIndex: 1050 };
		return (
			<OcModal
				id="blacklistedCustomerModal"
				showModal={this.props.showBlacklistedCustomerWarning}
				smallModal={true}
				backdropStyle={backdropStyle}
				title={this.context.intl.formatMessage(messages.cantAddProduct)}
				onClose={() => this.props.actions.cancelAddProduct()}
			>
				<div>
					<h4>
						<FormattedMessage {...messages.customerBlacklisted}/>
					</h4>
				</div>
			</OcModal>
		);
	};

	renderCustomerBasketsModal = () => {
		return <CustomerBasketsContainer flux={this.context.flux} />;
	};

	renderNavbar = (showToolbarTab: boolean) => (
		<nav className="Pos-Desk-tabs w-nav-primary with-nav-context">
			<ul>
				<li
					className={classnames({
						active: this.props.location && this.props.location.pathname.toLowerCase() === "/servicedesk/shop",
					})}
				>
					<OcTabLink id="servicedesk-shop-link" to="/servicedesk/shop">
						<i className="fa fa-list btn-icon-left" />
						<FormattedMessage {...messages.shop} />
					</OcTabLink>
				</li>
				<li
					className={classnames({
						active: this.props.location && this.props.location.pathname.toLowerCase() === "/servicedesk/customer",
					})}
				>
					<OcTabLink id="servicedesk-customer-link" to="/servicedesk/customer">
						<i className="fa fa-user btn-icon-left" />
						<FormattedMessage {...messages.customer} />
					</OcTabLink>
				</li>
				{
					showToolbarTab && (
						<li
							className={classnames({
								active: this.props.location && this.props.location.pathname.toLowerCase() === "/servicedesk/toolmode",
							})}
						>
							<OcTabLink id="servicedesk-crstb-tab" to="/servicedesk/toolmode">
								<i className="fa fa-wrench btn-icon-left" />
								<FormattedMessage {...messages.toolMode} />
							</OcTabLink>
						</li>
					)}
			</ul>
		</nav>
	);

	render() {
		return (
			<div className="ServiceDesk-container">
				<FormattedMessage {...messages.serviceDesk}>
					{(message: any): any => <Helmet title={message} />}
				</FormattedMessage>

				<FormattedMessage {...messages.singlePointOfContact}>
					{(message: any): any => (
						<Helmet
							meta={[
								{
									name: "description",
									content: `${message}`
								}
							]}
						/>
					)}
				</FormattedMessage>

				{!this.props.activeCustomerCase && (
					<main id="w-app-body">
						<StartCustomerCase
							salesRepId={get(this.props, "user.id")}
							toolmode={this.props.toolmode}
							actions={{
								createNewCustomerCase: this.props.actions.createNewCustomerCase
							}}
						/>
					</main>
				)}

				{this.props.activeCustomerCase &&
					!this.props.toolmode &&
					this.renderNavbar(true)}

				{this.props.activeCustomerCase && this.props.toolmode && this.props.enableNavbarInToolmode && this.renderNavbar(false)}

				{this.props.activeCustomerCase && (
					<ServiceDeskContainerRoutes
						flux={this.context.flux}
						posCheckoutRoute={this.props.posRoutes}
					/>
				)}

				{this.renderUnidentifiedCustomerModal()}
				{this.renderSalesOrganizationModal()}
				{this.renderInstallationTimeConfigurationModal()}
				{this.renderBlacklistedCustomerModal()}
				{this.renderCustomerBasketsModal()}

				<ComparisonFooterContainer/>
				<CharacteristicsComparisonModalContainer match={this.props.match} flux={this.context.flux} />
				<ProductOfferingConfigurationModalContainer flux={this.context.flux} />
			</div>
		);
	}
}

export default ServiceDeskContainer;
export {
	ServiceDeskContainerStateProps,
	ServiceDeskContainerActionProps,
	ServiceDeskContainerProps,
	ServiceDeskContainerState,
};

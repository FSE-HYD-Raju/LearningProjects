import React, { Component } from "react";
import { get, head } from "lodash";
import { ProductUtil, contextTypesValidationMap, FormattedMessage, actions, withCustomization, POSComponentCustomizationPoints } from "omnichannel-common-pos";
import { NavLink } from "react-router-dom";
import CustomerDetailsMainView from "./CustomerDetailsMainView";
import messages from "../../index.messages";
import PropTypes from "prop-types";
import R from "ramda";
import AgreementsRoutes from "../../routes/agreements/AgreementsRoutes";
import { connect } from "react-redux";

class CustomerDetailsContainer extends Component {
	static contextTypes = contextTypesValidationMap;
	static propTypes = {
		activeCustomerCase: PropTypes.object,
		agreements: PropTypes.array,
		children: PropTypes.node,
		getCustomerOffers: PropTypes.func,
		location: PropTypes.object,
		agreementOverviewPresentationConfiguration: PropTypes.array,
		subscriptionPlanConfiguration: PropTypes.string,
		privacySettingsKeys: PropTypes.object,
		enableChangeCustomerData: PropTypes.bool,
		posShowSummaryData: PropTypes.bool,
	};

	constructor(props) {
		super(props);
		this.state = {
			activeCustomer: null,
		};
	}

	componentDidMount() {
		const { activeCustomerCase } = this.props;
		if (activeCustomerCase && activeCustomerCase.attributes) {
			const activeCustomer = activeCustomerCase.attributes.activeCustomer;
			this.setState({
				activeCustomer,
			});
		}
	}

	componentWillReceiveProps(newProps) {
		if (newProps && newProps.activeCustomerCase) {
			const { activeCustomerCase } = newProps;
			const activeCustomer = activeCustomerCase && get(activeCustomerCase, "attributes.activeCustomer");
			if (activeCustomer) {
				this.setState({
					activeCustomer,
				});
			}
		}
	}

	render() {
		const { activeCustomerCase, enableChangeCustomerData, posShowSummaryData } = this.props;
		const activeCustomer = this.state.activeCustomer;

		if (activeCustomer) {
			const activeAgreements =
				this.props.agreements &&
				this.props.agreements.filter(
					agreement =>
						get(agreement, "attributes.lifeCycleStatus") ===
						"ACTIVE"
				);

			const productDisplayConfig = this.props
				.agreementOverviewPresentationConfiguration || [
					"HANDSET",
					"ACCESSORY",
					"TABLET"
				];

			const subscriptionPlanConfiguration = this.props.subscriptionPlanConfiguration;

			const findProducts = agreement => {
				return get(agreement, "attributes.products", []);
			};

			const hasDeviceAsProduct = agreement => {
				const products = findProducts(agreement);
				return products.some(product => {
					return (
						product.specSubType &&
						productDisplayConfig
							.map(elem => elem.toLowerCase())
							.includes(product.specSubType.toLowerCase())
					);
				});
			};

			const subscriptions =
				Array.isArray(activeAgreements) &&
				activeAgreements
					.filter(agreement =>
						Boolean(
							ProductUtil.getSubscriptionFromAgreement(
								agreement,
								subscriptionPlanConfiguration
							)
						)
					)
					.map(agreement => {
						const subscription = ProductUtil.getSubscriptionFromAgreement(
							agreement,
							subscriptionPlanConfiguration
						);
						return R.merge(subscription, {
							agreementId: agreement.id
						});
					});

			const devices =
				(Array.isArray(activeAgreements) &&
					activeAgreements
						.filter(agreement => hasDeviceAsProduct(agreement))
						.map(agreement => {
							return head(
								findProducts(agreement).filter(product => {
									return (
										product.specSubType &&
										productDisplayConfig
											.map(elem => elem.toLowerCase())
											.includes(
												product.specSubType.toLowerCase()
											)
									);
								})
							);
						})) ||
				[];

			return (
				<div className="CustomerDetails">
					<header className="CustomerDetails-header w-view-header">
						<h1>
							<FormattedMessage {...messages.customer} />
						</h1>
					</header>
					<div className="CustomerDetails-body">
						<div className="CustomerDetails-navigation">
							<nav className="w-nav-vertical">
								<NavLink
									to="/servicedesk/customer"
									className="w-nav-vertical-item"
									activeClassName="active"
									onlyActiveOnIndex={true}
								>
									<i className="fa fa-user fa-fw btn-icon-left" />
									<FormattedMessage {...messages.customer} />
								</NavLink>

								<NavLink
									id="linkPresentCustomerSubscriptions"
									to="#"
									className="w-nav-vertical-item"
									activeClassName="active"
									onlyActiveOnIndex={true}
								>
									<i className="fa fa-file fa-fw btn-icon-left" />
									<FormattedMessage
										{...messages.customerSubscriptions}
									/>
								</NavLink>

								{subscriptions &&
									subscriptions.concat(devices).map(p => {
										const { agreementId, id, realizingResources, name } = p;
										const realizingResource =
											realizingResources && realizingResources.find(realizingResource => realizingResource.type === "MSISDN");
										return (
											<NavLink
												id={id}
												key={id}
												to={`/servicedesk/customer/agreements/${agreementId}/${id}`}
												className="w-nav-vertical-subitem"
												activeClassName="active-link"
											>
												<span className="CustomerDetailsContainer-plan-name"> {name} </span>
												{realizingResource && realizingResource.primaryId}
											</NavLink>
										);
									})}
							</nav>
						</div>
						<div className="CustomerDetails-content">
							{this.props.location.pathname.indexOf(
								"agreements"
							) > -1 ? (
									<AgreementsRoutes flux={this.context.flux} />
								) : (
									<CustomerDetailsMainView
										{...this.props}
										customer={activeCustomer}
										privacySettingsKeys={
											this.props.privacySettingsKeys
										}
										enableChangeCustomerData={enableChangeCustomerData}
										posShowSummaryData={posShowSummaryData}
									/>
								)}
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div className="w-box no-active-customer-message">
					<h2>
						<FormattedMessage {...messages.noActiveCustomer} />
						{` `}
						{activeCustomerCase && (
							<a
								onClick={e => {
									e.preventDefault();
									this.context.flux.reduxStore.dispatch(actions.navBar.showCustomerCreationModal(true));
								}}
								id="customer-details-container-create-new-user"
								className="CustomerDetailsContainer-link"
							>
								<FormattedMessage {...messages.customerDetailsNewCustomer} />
							</a>
						)}
					</h2>
				</div>
			);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		enableChangeCustomerData: state.feature.enableChangeCustomerData,
		posShowSummaryData: state.feature.posShowSummaryData,
	}
};

const ConnectedCustomerDetailsContainer = withCustomization(POSComponentCustomizationPoints.POS_CUSTOMER_DETAILS_CONTAINER,
	connect(mapStateToProps)(CustomerDetailsContainer));

export {
	ConnectedCustomerDetailsContainer,
	CustomerDetailsContainer,
};
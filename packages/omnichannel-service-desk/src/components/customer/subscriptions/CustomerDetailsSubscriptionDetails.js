import {
	AddNewPlanReduxContainer,
	cssns,
	Flex,
	ProductServicesByActivityContainer,
	ProductUtil,
	contextTypesValidationMap,
	FormattedMessage,
	FormattedDate,
	ServiceStateChangeModalContainer
} from "omnichannel-common-pos";
import { Component } from "react";
import get from "lodash/get";
import find from "lodash/find";
import isEmpty from "lodash/isEmpty";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import messages from "../../../index.messages";
import ChangePlanViewContainer from "./ChangePlanViewContainer";
import { CustomerDetailsAvailableAddons } from "./CustomerDetailsAvailableAddons";
import { CustomerDetailsActiveAddons } from "./CustomerDetailsActiveAddons";
import PosPlansContainer from "./PosPlansContainer";
import detailsMessages from "./CustomerDetailsSubscription.messages";

const { React } = cssns("CustomerDetailsSubscriptionDetails");

export default class CustomerDetailsSubscriptionDetails extends Component {
	static defaultProps = {
		match: { params: {} }
	};

	static contextTypes = contextTypesValidationMap;

	componentWillMount() {
		if (this.props.match.params.agreementId) {
			this.props.getAvailableAddonProducts(
				this.props.match.params.agreementId
			);
		}

		this.props.getAvailableMobilePhones &&
			this.props.getAvailableMobilePhones(
				this.props.match.params.agreementId
			);
	}

	componentWillReceiveProps(newprops) {
		if (newprops.match.params.agreementId) {
			if (
				newprops.match.params.agreementId !==
				this.props.match.params.agreementId
			) {
				this.props.getAvailableAddonProducts(
					newprops.match.params.agreementId
				);
			}
		}
	}

	toggleAddon = addonId => {
		this.setState({
			activeAddonId: this.state.activeAddonId !== addonId || addonId
		});
	};

	isModifyingAddonProduct = productModification => {
		const agreement = find(this.props.agreements, {
			id: this.props.match.params.agreementId
		});

		return ProductUtil.isModifyingAddonProduct(
			agreement,
			productModification
		);
	};

	acceptServiceStateTransition = (paymentMethodId, reason) => {
		const productModification = this.props.productModification;

		const isModifyingAddonProduct = this.isModifyingAddonProduct(
			productModification
		);

		const basketId = get(productModification, "basket.id");
		const upfrontPrices = get(
			productModification,
			"basket.attributes.upfrontPrices"
		);

		if (isModifyingAddonProduct) {
			if (paymentMethodId && upfrontPrices) {
				this.props.acceptAddonProductLifecycleStatusChange(
					basketId,
					paymentMethodId,
					reason
				);
			} else {
				this.props.submitBasket(basketId);
			}
		} else {
			this.props.acceptServiceLifecycleStatusChange(basketId, reason);
		}

		const user = get(
			this.props.activeCustomerCase,
			"attributes.activeCustomer",
			this.props.user
		);

		user && this.props.getAgreements(user);
	};

	cancelServiceStateTransition = (productModification, clearTransition) => {
		const basketId = get(productModification, "basket.id");
		if (basketId) {
			this.props.cancelLifecycleStatusChange(basketId);
		}
		if (clearTransition) {
			this.props.clearTransitionState();
		}
	};

	initializeStateTransition = (
		service,
		stateTransition,
		reason,
		paymentMethodId
	) => {
		const agreementId = this.props.match.params.subscriptionId;
		const customerId = this.props.activeCustomerCase
			? get(this.props.activeCustomerCase, "attributes.activeCustomer.id")
			: get(this.props, "user.id");
		const customerAccountId = this.props.activeCustomerCase
			? get(
					this.props.activeCustomerCase,
					"attributes.activeCustomer.customerAccountId"
				)
			: get(this.props, "user.customerAccountId");

		if (get(service, "productOfferingId")) {
			// initialize product change
			this.props.initializeAddonProductStateTransition({
				agreementId,
				product: service,
				stateTransition,
				customerAccountId,
				paymentMethodId,
				reason
			});
		} else {
			// initialize service change
			this.props.initializeServiceStateTransition({
				service,
				stateTransition,
				agreementId,
				customerId,
				reason
			});
		}
	};

	showServiceStatusChangeModal = () => {
		return (
			!isEmpty(this.props.reasons) ||
			(this.props.serviceModificationResult &&
				!this.props.eligiblePaymentMethods)
		);
	};

	render() {
		const {
			match: { params },
			products,
			availablePhones
		} = this.props;

		const selectedSubscriptionProduct =
			!isEmpty(products) &&
			products.find(p => p.id === params.subscriptionId);

		const agreement =
			this.props.agreements &&
			this.props.agreements.find(
				agreement =>
					agreement.id === this.props.match.params.agreementId
			);
		const devices = ProductUtil.findAssociatedMobileDevices(
			selectedSubscriptionProduct
		);
		const deviceNames = devices.map(device => {
			return get(device, "specification.name");
		});
		const msisdnNumber = ProductUtil.getPhoneNumber(selectedSubscriptionProduct);
		return (
			<div className="this w-box w-box-stretch">
				{this.showServiceStatusChangeModal() && (
					<ServiceStateChangeModalContainer
						flux={this.context.flux}
						selectedService={this.props.selectedService}
						phoneNumber={ProductUtil.getPhoneNumber(selectedSubscriptionProduct)}
						transition={this.props.transition}
						acceptLifecycleStatusChange={ this.acceptServiceStateTransition }
						requirePaymentMethodSelection={false}
					/>
				)}
				<h2>
					<FormattedMessage {...detailsMessages.subscriptionsPageTitle} />
				</h2>
				<Flex flex={1} justifyContent="space-between">
					<h3>{get(selectedSubscriptionProduct, "name")}</h3>
				</Flex>

				{this.props.match.params.subscriptionId && (
					<Flex direction="column">
						<Flex
							direction="row"
							className="subscription-information-container"
						>
							<Flex
								direction="column"
								flex={1}
								className="subscription-information"
							>
								<Flex
									direction="row"
									flex={1}
									justifyContent="between"
									className="devices-msisdn"
								>
									<h5>
										<FormattedMessage
											{...detailsMessages.msisdnTitle}
										/>
									</h5>
									<Flex flex={1} justifyContent="end">
										{ msisdnNumber ||
											<FormattedMessage
												{...detailsMessages.msisdnNotLinked}
											/>
										}
									</Flex>
								</Flex>
								<Flex
									direction="row"
									flex={1}
									justifyContent="between"
									className="devices"
								>
									<h5>
										<FormattedMessage
											{...detailsMessages.detailsAssociatedDevice}
										/>
									</h5>
									<Flex flex={1} justifyContent="end">
										{devices.length > 0 && (
											<div className="deviceName row-item">
												<span className="icon">
													<i className="fa fa-file" />
												</span>
												<span className="name">
													{deviceNames[0]}
												</span>
											</div>
										)}
										{devices.length === 0 && (
											<span className="no-phone-connected">
												<FormattedMessage
													{...detailsMessages.detailsNoPhoneConnected}
												/>
											</span>
										)}
										{devices.length === 0 &&
										availablePhones &&
										availablePhones.length > 0 && (
											<Link
												id="linkToShopPhonePage"
												to={{
													pathname: `/servicedesk/shop/${this
														.props
														.phonesCategoryId}`
												}}
												onClick={() => {
													this.props.saveTargetAgreementId(
														agreement.id
													);
												}}
											>
												<i
													className="fa fa-plus"
													aria-hidden="true"
												/>
												<FormattedMessage
													{...detailsMessages.detailsAddPhone}
												/>
											</Link>
										)}
									</Flex>
								</Flex>
								<Flex
									direction="row"
									flex={1}
									justifyContent="between"
									className="devices"
								>
									<h5>
										<FormattedMessage
											{...messages.agreementId}
										/>
									</h5>
									{get(
										agreement,
										"attributes.referenceNumber",
										<FormattedMessage
											{...messages.notAvailableShorthand}
										/>
									)}
								</Flex>
								<Flex
									direction="row"
									flex={1}
									justifyContent="between"
									className="devices"
								>
									<h5>
										<FormattedMessage
											{...messages.status}
										/>
									</h5>
									{get(
										agreement,
										"attributes.lifeCycleStatus",
										<FormattedMessage
											{...messages.notAvailableShorthand}
										/>
									)}
								</Flex>
								<Flex
									direction="row"
									flex={1}
									justifyContent="between"
									className="devices"
								>
									<h5>
										<FormattedMessage
											{...messages.validThrough}
										/>
									</h5>
									<Flex flex={1} justifyContent="end">
										{get(
											agreement,
											"attributes.validFor.startDate"
										) ? (
											<FormattedDate
												value={
													new Date(
														get(
															agreement,
															"attributes.validFor.startDate"
														)
													)
												}
											/>
										) : (
											<FormattedMessage
												{...messages.notAvailableShorthand}
											/>
										)}
										{"  -  "}
										{get(
											agreement,
											"attributes.validFor.endDate"
										) ? (
											<FormattedDate
												value={
													new Date(
														get(
															agreement,
															"attributes.validFor.endDate"
														)
													)
												}
											/>
										) : (
											<FormattedMessage
												{...messages.notAvailableShorthand}
											/>
										)}
									</Flex>
								</Flex>
							</Flex>
							<Flex
								style={{
									marginLeft: "auto"
								}}
							>
								<ChangePlanViewContainer
									flux={this.context.flux}
									subscription={selectedSubscriptionProduct}
									msisdn={ProductUtil.getPhoneNumber(
										selectedSubscriptionProduct
									)}
								/>
							</Flex>
						</Flex>

						<Flex flex={1}>
							<Flex
								justifyContent="between"
								className="table-header"
							>
								<Flex>
									<h3>
										<FormattedMessage
											{...detailsMessages.posExistingPlanListingHeader}
										/>
									</h3>
								</Flex>

								<Flex>
									<AddNewPlanReduxContainer
										flux={this.context.flux}
										agreement={agreement}
										subscription={selectedSubscriptionProduct}
									/>
								</Flex>
							</Flex>
							<PosPlansContainer
								flux={this.context.flux}
								subscription={selectedSubscriptionProduct}
							/>
							<ProductServicesByActivityContainer
								flux={this.context.flux}
								agreementId={this.props.match.params.subscriptionId}
								product={selectedSubscriptionProduct}
								isActive={false}
							/>
						</Flex>

						<Flex flex={1}>
							<CustomerDetailsActiveAddons
								selectedProduct={selectedSubscriptionProduct}
								agreementId={this.props.match.params.subscriptionId}
							/>
							<CustomerDetailsAvailableAddons
								selectedProduct={selectedSubscriptionProduct}
								agreementId={this.props.match.params.subscriptionId}
								availableAddons={this.props.availableAddons}
							/>
						</Flex>
					</Flex>
				)}
			</div>
		);
	}
}

CustomerDetailsSubscriptionDetails.displayName =
	"CustomerDetailsSubscriptionDetails";

CustomerDetailsSubscriptionDetails.propTypes = {
	acceptServiceLifecycleStatusChange: PropTypes.func,
	acceptAddonProductLifecycleStatusChange: PropTypes.func,
	activeCustomerCase: PropTypes.object,
	agreements: PropTypes.array,
	availableAddons: PropTypes.array,
	availablePhones: PropTypes.array,
	cancelLifecycleStatusChange: PropTypes.func,
	clearTransitionState: PropTypes.func,
	fetchReasons: PropTypes.func,
	getAgreements: PropTypes.func,
	getAvailableAddonProducts: PropTypes.func,
	getAvailableMobilePhones: PropTypes.func,
	getProductById: PropTypes.func,
	getProductsByIds: PropTypes.func,
	initializeAddonProductStateTransition: PropTypes.func,
	initializeServiceStateTransition: PropTypes.func,
	match: PropTypes.object,
	product: PropTypes.object,
	products: PropTypes.array,
	phonesCategoryId: PropTypes.string,
	productConfigurationSummary: PropTypes.object,
	productConfigurationErrors: PropTypes.object,
	productModification: PropTypes.object,
	reasons: PropTypes.object,
	resetProductConfiguration: PropTypes.func,
	resetServiceModificationResult: PropTypes.func,
	saveTargetAgreementId: PropTypes.func,
	serviceModificationResult: PropTypes.string,
	selectedService: PropTypes.object,
	setSelectedService: PropTypes.func,
	setTransition: PropTypes.func,
	submitProductConfiguration: PropTypes.func,
	subscriptionId: PropTypes.string,
	transition: PropTypes.object,
	user: PropTypes.object,
	getAlternateOfferingsForProduct: PropTypes.func,
	resetProductChange: PropTypes.func,
	alternateProductOfferings: PropTypes.array,
	initializeProductReplace: PropTypes.func,
	eligiblePaymentMethods: PropTypes.object,
	commitProductReplace: PropTypes.func,
	paymentInfo: PropTypes.object,
	discardBasket: PropTypes.func,
	setInputtedCharacteristic: PropTypes.func,
	configurations: PropTypes.object,
	focusedProductId: PropTypes.string,
	productOfferings: PropTypes.array,
	discardBackendBasket: PropTypes.func,
	resetConfigurations: PropTypes.func,
	stateTransitionByActionName: PropTypes.object,
	submitCallForwardingConfiguration: PropTypes.func.isRequired,
	resetCallForwardingConfiguration: PropTypes.func.isRequired,
	callForwardingConfigurationErrors: PropTypes.object,
	callForwardingConfigurationResult: PropTypes.object,
	callForwardingServices: PropTypes.object,
	callForwardingReasonCode: PropTypes.string.isRequired,
	serviceStateTransitionByActionName: PropTypes.object,
	submitBasket: PropTypes.func,
	submittedBasket: PropTypes.object,
	plans: PropTypes.array,
	selectProductOffering: PropTypes.func,
	initializeNewPlanOrder: PropTypes.func,
	submitNewPlanOrder: PropTypes.func,
	submittedNewPlanBasket: PropTypes.object,
	submittedNewPlanBasketItems: PropTypes.object,
	resetNewPlanOrder: PropTypes.func,
	newPlanPaymentInfo: PropTypes.object,
	toggleProductOffering: PropTypes.func,
	getAvailablePlans: PropTypes.func
};

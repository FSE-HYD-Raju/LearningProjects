// @flow

import PropTypes from "prop-types";
import React, { Component } from "react";
import {
	Flex,
	withSchema,
	contextTypesValidationMap,
	FormattedMessage,
	OcAlert,
	OcAlertType,
	OcButton,
	OcButtonType,
	actions,
	nationalityMessages,
} from "omnichannel-common-pos";
import messages from "../../index.messages";
import { find, get, chain, isEmpty } from "lodash";
import moment from "moment";

type customerToCreate = {
	coAddress?: string,
	country?: string,
	postalCode?: string,
	gender?: string,
	passportNumber?: string,
	passportExpiryDate?: Date,
	passportIssuingDate?: Date,
	firstName?: string,
	lastName?: string,
	email?: string,
	mobileNumber?: string,
	fixedLineNumber?: string,
	street?: string,
	city?: string
};

type Props = {
	CustomerActions?: {
		clearSearch: () => void,
		createCustomer: (
			payload: { customer: Object, user: Object, redirect: () => {} },
			forceAddressUpdate: boolean,
			additionalFields: Array<{ name: string, label: string }>
		) => void,
		saveSearchTerms: (e: SyntheticEvent<*>) => void
	},
	ConsulStore?: {
		countries?: Array<{ code: string, name: string }>,
		genders?: Array<string>,
		locale?: string,
		features: any,
		customerIdentificationValidationEnabled: {
			enabled: boolean,
		}
	},
	UserStore?: {
		user?: Object
	},
	customerCreated?: boolean,
	createdCustomer?: {
		attributes?: {
			firstName: string,
			lastName: string,
			gender: string,
			email: { email: string },
			fixedLineNumber: { number: ?string },
			mobileNumber: { number: ?string },
			passportNumber?: string,
			passportExpiryDate?: Date,
			passportIssuingDate?: Date,
			postalAddresses: Array<{
				city: string,
				country: string,
				postalCode: string,
				street: string
			}>
		}
	},
	customerToCreate?: customerToCreate,
	CustomerStore?: {
		customerToCreate: customerToCreate,
		forceUpdateAddress?: boolean,
		customerIdValidationError?: string,
		customerIdValidationStatus: boolean,
		customerIdValidationError?: string
	},
	schema?: Object,
	additionalFields?: Array<{ name: string, label: string }>,
};

type State = {
	customerCreationRequestInProgress: boolean;
}

@withSchema(["customerDataForm"])
export default class NewCustomerInfo extends Component<Props, State> {
	static displayName = "NewCustomerInfo";
	static contextTypes = contextTypesValidationMap;


	constructor(props) {
		super(props);
		/* customerCreationRequestInProgress won't allow
		the user to click multiple times */
		this.state = {
			customerCreationRequestInProgress: false,
		};
	}

	static propTypes = {
		CustomerActions: PropTypes.shape({
			clearSearch: PropTypes.func.isRequired,
			createCustomer: PropTypes.func.isRequired,
			saveSearchTerms: PropTypes.func.isRequired
		}),
		ConsulStore: PropTypes.shape({
			countries: PropTypes.array,
			genders: PropTypes.array,
			locale: PropTypes.string,
			displayOptions: PropTypes.shape({
				identification: PropTypes.array
			}),
			customerIdentificationValidationEnabled: PropTypes.shape({
				enabled: PropTypes.bool,
				idTypes: PropTypes.array
			}),
		}),
		UserStore: PropTypes.shape({
			user: PropTypes.object
		}),
		customerCreated: PropTypes.bool,
		createdCustomer: PropTypes.shape({
			attributes: PropTypes.shape({
				firstName: PropTypes.string.isRequired,
				lastName: PropTypes.string.isRequired,
				gender: PropTypes.string.isRequired,
				birthDay: PropTypes.instanceOf(Date),
				email: PropTypes.shape({
					email: PropTypes.string
				}).isRequired,
				fixedLineNumber: PropTypes.shape({
					number: PropTypes.string
				}).isRequired,
				mobileNumber: PropTypes.shape({
					number: PropTypes.string
				}).isRequired,
				identificationId: PropTypes.string,
				identificationExpiryDate: PropTypes.instanceOf(Date),
				identificationIssuingDate: PropTypes.instanceOf(Date),
				postalAddresses: PropTypes.array
			})
		}),
		customerToCreate: PropTypes.shape({
			coAddress: PropTypes.string,
			country: PropTypes.string,
			postalCode: PropTypes.string,
			gender: PropTypes.string,
			birthDay: PropTypes.instanceOf(Date),
			identificationId: PropTypes.string,
			identificationExpiryDate: PropTypes.instanceOf(Date),
			identificationIssuingDate: PropTypes.instanceOf(Date),
			identificationType: PropTypes.string,
			firstName: PropTypes.string,
			firstName2: PropTypes.string,
			lastName: PropTypes.string,
			email: PropTypes.string,
			mobileNumber: PropTypes.string,
			fixedLineNumber: PropTypes.string,
			street: PropTypes.string,
			city: PropTypes.string
		}),
		CustomerStore: PropTypes.shape({
			customerToCreate: PropTypes.shape({
				coAddress: PropTypes.string,
				country: PropTypes.string,
				postalCode: PropTypes.string,
				gender: PropTypes.string,
				birthDay: PropTypes.instanceOf(Date),
				identificationId: PropTypes.string,
				identificationExpiryDate: PropTypes.instanceOf(Date),
				identificationIssuingDate: PropTypes.instanceOf(Date),
				firstName: PropTypes.string,
				lastName: PropTypes.string,
				email: PropTypes.string,
				mobileNumber: PropTypes.string,
				fixedLineNumber: PropTypes.string,
				street: PropTypes.string,
				city: PropTypes.string
			}).isRequired,
			forceUpdateAddress: PropTypes.bool,
			customerIdValidationStatus: PropTypes.bool,
			customerIdValidationError: PropTypes.string
		}),
		schema: PropTypes.object.isRequired,
		additionalFields: PropTypes.array,
	};

	findIdentificationTypeBackendValue = idType => {
		const identifications = this.props.ConsulStore.displayOptions.identification;
		const locale = this.props.ConsulStore.locale;
		const matchingIdentificationType = identifications
			? find(identifications, identificationTypeObject => {
				return identificationTypeObject.localisation[locale] === idType;
			})
			: undefined;
		return matchingIdentificationType.backendValue;
	};

	createCustomer = () => {
		const { customerIdentificationValidationEnabled } = this.props.ConsulStore;
		this.setState({ customerCreationRequestInProgress: true });

		const _model = chain(this.props.customerToCreate)
			.pickBy(value => value !== "")
			.omit(["coAddress"])
			.value();

		/* $FlowFixMe */
		this.props.schema
			.validate(_model)
			.then(async value => {
				value.identificationExpiryDate = this.dateWithTimezoneOffset(value.identificationExpiryDate);
				value.identificationIssuingDate = this.dateWithTimezoneOffset(value.identificationIssuingDate);
				value.birthDay = this.dateWithTimezoneOffset(value.birthDay);

				value.identificationType = this.findIdentificationTypeBackendValue(_model.identificationType);
				if(!customerIdentificationValidationEnabled.enabled) {
					value.identificationLifecycleStatus = "confirmed";
				} else {
					value.identificationLifecycleStatus = this.props.CustomerStore.customerIdValidationError ? "unconfirmed" : "confirmed";
				}

				if (value.provinceId && value.cityId) {
					value.city = value.cityId;
					value.province = value.provinceId;
				}
				/* $FlowFixMe */
				const { user } = this.props.UserStore;
				/* $FlowFixMe */
				const { forceUpdateAddress } = this.props.CustomerStore;
				/* $FlowFixMe */
				this.context.flux.reduxStore.dispatch(actions.loadingOverlay.showLoadingOverlay());
				await this.props.CustomerActions.createCustomer(
					{
						customer: value,
						/* $FlowFixMe */
						user,
						/* $FlowFixMe */
						redirect: () => {}
					},
					/* $FlowFixMe */
					forceUpdateAddress,
					/* $FlowFixMe */
					this.props.additionalFields
				);
				this.setState({ customerCreationRequestInProgress: false });
				this.context.flux.reduxStore.dispatch(actions.loadingOverlay.hideLoadingOverlay());
			})
			.catch(err => {
				console.log("INVALID", err);
				this.setState({ customerCreationRequestInProgress: false });
			});
	};

	dateWithTimezoneOffset = (date?: Date) => {
		if (!date) {
			return date;
		}

		return moment(date)
			.add(moment(date).utcOffset(), "minutes")
			.toDate();
	};

	clearSearch = (e: SyntheticEvent<*>) => {
		e.preventDefault();
		e.stopPropagation();
		/* $FlowFixMe */
		this.props.CustomerActions.clearSearch();
	};

	renderMarketingInfo = (fieldName, labelMessage) => {
		const { customerToCreate } = this.props.CustomerStore;

		const { createdCustomer } = this.props;

		const isTrue = get(createdCustomer, `attributes.privacySettings.${fieldName}`, customerToCreate[fieldName]) === true;

		return (
			<Flex style={{ padding: "5px" }} alignItems="center">
				<strong style={{ marginRight: "10px" }}>
					<FormattedMessage {...labelMessage} />
				</strong>
				<span
					className="value-holder"
					style={{ backgroundColor: +isTrue ? "#6FBC1D" : "red", color: "white", paddingLeft: "5px", paddingRight: "5px" }}
				>
					{isTrue ? <FormattedMessage {...messages.yes} /> : <FormattedMessage {...messages.no} />}
				</span>
			</Flex>
		);
	};

	render() {
		const { customerCreated, createdCustomer, additionalFields, ConsulStore, CustomerStore } = this.props;

		/* $FlowFixMe */
		const { customerToCreate } = this.props.CustomerStore;

		const selectedIdentificationTypeBackendValue = customerToCreate.identificationType
			? this.findIdentificationTypeBackendValue(customerToCreate.identificationType)
			: undefined;
		/*
		/lock Create Customer button if there is a selected identification type,
		/it's one of the consul configured types for validation
		/validation is set true in consul,
		/the validation service is not down and
		/the validation status for the id is false.
		/NOTE: creation IS allowed if the validation service is down as per RND-26674
		*/
		const lockCreateButton =
			(selectedIdentificationTypeBackendValue &&
				!CustomerStore.customerIdValidationStatus &&
				!CustomerStore.validationServiceDown &&
				ConsulStore.customerIdentificationValidationEnabled.enabled &&
				(!!ConsulStore.customerIdentificationValidationEnabled.idTypes.find(idType => idType === selectedIdentificationTypeBackendValue))) ||
			false;

		const disableCustomerCreateButton = lockCreateButton || this.state.customerCreationRequestInProgress;

		const createCustomerButton = (
			<OcButton id="buttonCreateCustomerInNewCustomerInfo" buttonType={OcButtonType.SUCCESS}
					  onClick={this.createCustomer} disabled={disableCustomerCreateButton}>
				<FormattedMessage {...messages.createNewCustomer} />
			</OcButton>
		);

		const formFeatures = ConsulStore ? (ConsulStore.displayOptions ? ConsulStore.displayOptions.customerDataForm : {}) : {};

		const customerCountry = find(get(this.props.ConsulStore, "countries"), [
			"code",
			get(createdCustomer, "attributes.postalAddresses[0].country", customerToCreate.country)
		]);

		const customerNationality = find(get(this.props.ConsulStore, "countries"), [
			"code",
			get(createdCustomer, "attributes.nationality", customerToCreate.nationality)
		]);

		const style = {
			padding: "5px"
		};

		const identificationExpiryDate = get(createdCustomer, "attributes.identificationExpiryDate", customerToCreate.identificationExpiryDate);

		const identificationIssuingDate = get(createdCustomer, "attributes.identificationIssuingDate", customerToCreate.identificationIssuingDate);

		const birthDay = get(createdCustomer, "attributes.birthDay", customerToCreate.birthDay);

		const validationServiceDown = CustomerStore.validationServiceDown;
		const validationError = CustomerStore.customerIdValidationError;
		const { formatMessage } = this.context.intl;
		return (
			<div className="NewCustomerInfo">
				{!customerCreated && (
					<div>
						{validationServiceDown && (
							<div className="errors">
								<OcAlert alertType={OcAlertType.DANGER}>
									<FormattedMessage {...messages.serviceUnavailable} />
								</OcAlert>
							</div>
						)}
						{validationError && (
							<div className="errors">
								<OcAlert alertType={OcAlertType.DANGER}>{validationError}</OcAlert>
							</div>
						)}
						<Flex flex={1}>
							<Flex flex={1} direction="column">
								{!isEmpty(customerToCreate.firstName) && (
									<Flex style={style} alignItems="center">
										<strong style={{ marginRight: "10px" }}>
											<FormattedMessage {...messages.firstName} />
										</strong>
										<Flex alignSelf="start">
											<span>{get(createdCustomer, "attributes.firstName", customerToCreate.firstName)}</span>
										</Flex>
									</Flex>
								)}
								{!isEmpty(customerToCreate.additionalName) && (
									<Flex style={style} alignItems="center">
										<strong style={{ marginRight: "10px" }}>
											<FormattedMessage {...messages.secondName} />
										</strong>
										<Flex alignSelf="start">
											<span>{get(createdCustomer, "attributes.additionalName", customerToCreate.additionalName)}</span>
										</Flex>
									</Flex>
								)}
								{!isEmpty(customerToCreate.lastName) && (
									<Flex style={style} alignItems="center">
										<strong style={{ marginRight: "10px" }}>
											<FormattedMessage {...messages.lastName} />
										</strong>
										<span className="value-holder">{get(createdCustomer, "attributes.lastName", customerToCreate.lastName)}</span>
									</Flex>
								)}
								{!isEmpty(customerToCreate.lastName2) && formFeatures.lastName2 && (
									<Flex style={style} alignItems="center">
										<strong style={{ marginRight: "10px" }}>
											<FormattedMessage {...messages.lastName2} />
										</strong>
										<span className="value-holder">
											{get(
												createdCustomer,
												"attributes.lastName2",
												/* $FlowFixMe */
												customerToCreate.lastName2
											)}
										</span>
									</Flex>
								)}
								{!isEmpty(customerToCreate.email) && (
									<Flex style={style} alignItems="center">
										<strong style={{ marginRight: "10px" }}>
											<FormattedMessage {...messages.email} />
										</strong>
										<span className="value-holder">{get(createdCustomer, "attributes.email.email", customerToCreate.email)}</span>
									</Flex>
								)}
								{!isEmpty(customerToCreate.nationality) && (
									<Flex style={style} alignItems="center">
										<strong style={{ marginRight: "10px" }}>
											<FormattedMessage {...messages.nationality} />
										</strong>
										<span className="value-holder">
										{customerNationality ? (
											formatMessage((nationalityMessages[`nationalityName${customerNationality.code}`]))
										) : (
											get(createdCustomer, "attributes.nationality", customerToCreate.nationality)
										)}
									</span>
									</Flex>
								)}
								{!isEmpty(customerToCreate.mobileNumber) && (
									<Flex style={style} alignItems="center">
										<strong style={{ marginRight: "10px" }}>
											<FormattedMessage {...messages.mobileNumber} />
										</strong>
										<span className="value-holder">
										{get(createdCustomer, "attributes.mobileNumber.number", customerToCreate.mobileNumber)}
									</span>
									</Flex>
								)}
								{!isEmpty(customerToCreate.fixedLineNumber) && (
									<Flex style={style} alignItems="center">
										<strong style={{ marginRight: "10px" }}>
											<FormattedMessage {...messages.fixedLineNumber} />
										</strong>
										<span className="value-holder">
										{get(createdCustomer, "attributes.fixedLineNumber.number", customerToCreate.fixedLineNumber)}
									</span>
									</Flex>
								)}
								{!isEmpty(customerToCreate.gender) && (
									<Flex style={style} alignItems="center">
										<strong style={{ marginRight: "10px" }}>
											<FormattedMessage {...messages.gender} />
										</strong>
										<span className="value-holder">{get(createdCustomer, "attributes.gender", customerToCreate.gender)}</span>
									</Flex>
								)}
								{!isEmpty(birthDay && moment(birthDay).format("YYYY-MM-DD")) && (
									<Flex style={style} alignItems="center">
										<strong style={{ marginRight: "10px" }}>
											<FormattedMessage {...messages.birthDay} />
										</strong>
										<span className="value-holder">{birthDay && moment(birthDay).format("YYYY-MM-DD")}</span>
									</Flex>
								)}
								{!isEmpty(customerToCreate.identificationType) && (
									<Flex style={style} alignItems="center">
										<strong style={{ marginRight: "10px" }}>
											<FormattedMessage {...messages.identificationType} />
										</strong>
										<span className="value-holder">
										{get(
											createdCustomer,
											"attributes.identificationType",
											/* $FlowFixMe */
											customerToCreate.identificationType
										)}
									</span>
									</Flex>
								)}
								{ !isEmpty(customerToCreate.identificationId) && (
									<Flex style={style} alignItems="center">
										<strong style={{ marginRight: "10px" }}>
											<FormattedMessage {...messages.identificationId} />
										</strong>
										<span className="value-holder">
										{get(
											createdCustomer,
											"attributes.identificationId",
											/* $FlowFixMe */
											customerToCreate.identificationId
										)}
									</span>
									</Flex>
								)}
								{!isEmpty(customerToCreate.identificationIssuingAuthority) && (
									<Flex style={style} alignItems="center">
										<strong style={{ marginRight: "10px" }}>
											<FormattedMessage {...messages.identificationIssuingAuthority} />
										</strong>
										<span className="value-holder">
										{get(
											createdCustomer,
											"attributes.identificationIssuingAuthority",
											/* $FlowFixMe */
											customerToCreate.identificationIssuingAuthority
										)}
									</span>
									</Flex>
								)}
								{!isEmpty(customerToCreate.identificationIssuingAuthorityCity) && (
									<Flex style={style} alignItems="center">
										<strong style={{ marginRight: "10px" }}>
											<FormattedMessage {...messages.identificationCityOfIssue} />
										</strong>
										<span className="value-holder">
										{get(
											createdCustomer,
											"attributes.identificationIssuingAuthorityCity",
											/* $FlowFixMe */
											customerToCreate.identificationIssuingAuthorityCity
										)}
									</span>
									</Flex>
								)}
								{!isEmpty(identificationIssuingDate && moment(identificationIssuingDate).format("YYYY-MM-DD")) && (
									<Flex style={style} alignItems="center">
										<strong style={{ marginRight: "10px" }}>
											<FormattedMessage {...messages.identificationIssuingDate} />
										</strong>
										<span className="value-holder">{identificationIssuingDate && moment(identificationIssuingDate).format("YYYY-MM-DD")}</span>
									</Flex>
								)}
								{!isEmpty(identificationExpiryDate && moment(identificationExpiryDate).format("YYYY-MM-DD")) && (
									<Flex style={style} alignItems="center">
										<strong style={{ marginRight: "10px" }}>
											<FormattedMessage {...messages.identificationExpiryDate} />
										</strong>
										<span className="value-holder">{identificationExpiryDate && moment(identificationExpiryDate).format("YYYY-MM-DD")}</span>
									</Flex>
								)}
							</Flex>

							<Flex flex={1} direction="column">
								{!isEmpty(customerToCreate.street) && (
									<Flex style={style} alignItems="center">
										<strong style={{ marginRight: "10px" }}>
											<FormattedMessage {...messages.street} />
										</strong>
										<span className="value-holder">
										{get(createdCustomer, "attributes.postalAddresses[0].street", customerToCreate.street)}
									</span>
									</Flex>
								)}
								{!isEmpty(customerToCreate.addressDetails) && (
									<Flex style={style} alignItems="center">
										<strong style={{ marginRight: "10px" }}>
											<FormattedMessage {...messages.addressDetails} />
										</strong>
										<span className="value-holder">
										{get(createdCustomer, "attributes.postalAddresses[0].description", customerToCreate.addressDetails)}
									</span>
									</Flex>
								)}
								{!isEmpty(customerToCreate.province) && (
									<Flex style={style} alignItems="center">
										<strong style={{ marginRight: "10px" }}>
											<FormattedMessage {...messages.province} />
										</strong>
										<span
											className="value-holder">{get(createdCustomer, "attributes.province", customerToCreate.province)}</span>
									</Flex>
								)}
								{ !isEmpty(customerToCreate.city) && (
									<Flex style={style} alignItems="center">
										<strong style={{ marginRight: "10px" }}>
											<FormattedMessage {...messages.city} />
										</strong>
										<span className="value-holder">{get(createdCustomer, "attributes.postalAddresses[0].city", customerToCreate.city)}</span>
									</Flex>
								)}
								{!isEmpty(customerToCreate.postalCode) && (
									<Flex style={style} alignItems="center">
										<strong style={{ marginRight: "10px" }}>
											<FormattedMessage {...messages.postalCode} />
										</strong>
										<span className="value-holder">
										{get(createdCustomer, "attributes.postalAddresses[0].postalCode", customerToCreate.postalCode)}
									</span>
									</Flex>
								)}
								{!isEmpty(customerToCreate.apartment) && formFeatures.apartment && (
									<Flex style={style} alignItems="center">
										<strong style={{ marginRight: "10px" }}>
											<FormattedMessage {...messages.apartment} />
										</strong>
										<span className="value-holder">
											{get(
												createdCustomer,
												"attributes.postalAddresses[0].apartment",
												/* $FlowFixMe */
												customerToCreate.apartment
											)}
										</span>
									</Flex>
								)}

								{!isEmpty(customerToCreate.building) && formFeatures.building && (
									<Flex style={style} alignItems="center">
										<strong style={{ marginRight: "10px" }}>
											<FormattedMessage {...messages.building} />
										</strong>
										<span className="value-holder">
											{get(
												createdCustomer,
												"attributes.postalAddresses[0].building",
												/* $FlowFixMe */
												customerToCreate.building
											)}
										</span>
									</Flex>
								)}
								{!isEmpty(customerToCreate.country) && (
									<Flex style={style} alignItems="center">
										<strong style={{ marginRight: "10px" }}>
											<FormattedMessage {...messages.country} />
										</strong>
										<span className="value-holder">
										{customerCountry ? (
											customerCountry.name
										) : (
											get(createdCustomer, "attributes.postalAddresses[0].country", customerToCreate.country)
										)}
									</span>
									</Flex>
								)}

								{this.renderMarketingInfo("marketingOwnPartyMarketing", messages.marketingOwnPartyMarketing)}
								{this.renderMarketingInfo("marketingOwnPartyMarketingSms", messages.marketingOwnPartySMS)}
								{this.renderMarketingInfo("marketingOwnPartyMarketingEmail", messages.marketingOwnPartyEmail)}
								{this.renderMarketingInfo("marketingOwnPartyMarketingLetter", messages.marketingOwnPartyLetter)}
								{this.renderMarketingInfo("marketingOwnPartyMarketingTelemarketing", messages.marketingOwnPartyTelemarketing)}
							</Flex>

							{!isEmpty(additionalFields) && (
								<Flex flex={1} direction="column" id="new-customer-info-additional-fields">
									{additionalFields
									/* $FlowFixMe */
										.filter(field => {
											return field.name && field.label;
										})
										.map(field => {
											return (
												<Flex
													id={`additional-field-${field.name.replace(".", "-")}`}
													key={field.name}
													style={style}
													alignItems="center"
												>
													<strong
														style={{
															marginRight: "10px"
														}}
													>
														<span>{field.label}</span>
													</strong>
													<span className="value-holder">
														{get(createdCustomer, field.name) || get(customerToCreate, field.name)}
													</span>
												</Flex>
											);
										})}
								</Flex>
							)}
						</Flex>
					</div>
				)}

				{!customerCreated ? (
					<footer className="modal-footer">
						<OcButton
							buttonType={OcButtonType.SECONDARY}
							outline={true}
							id="buttonBackToCustomerFromNewCustomerInfo"
							onClick={this.clearSearch}
						>
							<i className="fa fa-chevron-left btn-icon-left"/>
							<FormattedMessage {...messages.backToCustomerInfo} />
						</OcButton>

						{createCustomerButton}
					</footer>
				) : (
					<footer className="modal-footer">
						<OcButton
							id="customer-created-continue-button"
							onClick={() => this.context.flux.reduxStore.dispatch(actions.navBar.showCustomerCreationModal(false))}
							buttonType={OcButtonType.SUCCESS}
						>
							<FormattedMessage {...messages.infoContinue} />
						</OcButton>
					</footer>
				)}
			</div>
		);
	}
}



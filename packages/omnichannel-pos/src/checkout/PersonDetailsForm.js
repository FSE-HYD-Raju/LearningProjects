// @flow
import Form from "react-formal";
import { Component } from "react";
import {
	connect
} from "react-redux";
import {
	AddressValidationHandlerContainer,
	cssns,
	OcDatePicker,
	OcInput,
	OcSelect,
	OcSelectCountry,
	withFormal,
	withSchema,
	TranslatedComponent,
	FormattedMessage,
	Flux,
	countryMessages,
	ContextType,
	contextTypesValidationMap,
	OcButton,
	OcButtonType,
	actions,
	DateUtil,
	POSComponentCustomizationPoints,
	withCustomization,
} from "omnichannel-common-pos";
import messages from "../posMessages";
import PropTypes from "prop-types";
import R from "ramda";
import get from "lodash/get";
import omit from "lodash/omit";
import assign from "lodash/assign";
import isMatch from "lodash/isMatch";
import pick from "lodash/pick";
import types from "react-formal-inputs";
import type {
	BasketStoreType,
		ConsulStoreState,
		UserActionsType,
		UserStoreState,
		PostalAddressType,
		SchemaType,
		AddressType,
} from "omnichannel-flow-pos";

import BasketClearedError from "./BasketClearedError";
import OrganizationSelectContainer from "./OrganizationSelect/OrganizationSelectContainer";
import { isEqual } from "lodash";

const { BasketActions } = Flux;
const { React } = cssns("PersonDetailsForm");
const FormalOcInput = withFormal(OcInput);
const FormalOcSelect = withFormal(OcSelect);
const FormalSelectCountry = withFormal(OcSelectCountry);

Form.addInputTypes(types);

type Props = {
	BasketActions: BasketActions,
	BasketStore: BasketStoreType,
	ConsulStore: ConsulStoreState,
	CustomerCaseStore: Object,
	SalesStore?: {
		productCategory?: string
	},
	UserActions: UserActionsType,
	UserStore?: UserStoreState,
	addressIsRequired?: boolean,
	isValid: (valid: Object) => void,
	person: {},
	postalAddress: PostalAddressType,
	schema: SchemaType,
	setupDone?: boolean,
	updatingUser?: boolean,
	onlyUpdateCustomerCase: boolean,
	defaultIdentificationType?: string,
	hideIdentificationAtCheckoutPage: boolean,
	error: any,
	actions: {
		confirmCustomerDetails: (individualId: string) => void,
		getCitiesByProvinceId: (provinceId: string) => void,
		getProvince: () => void,
		resetConfirmCustomerDetails: () => void,
	},
	customerDetailsConfirmationStatus: string,
	birthDayAgeLimit: string,
};

type State = {
	showPayerSelection: boolean,
	enableSaveButton: boolean,
	userInformationModified: boolean,
	identification: ?Object,
	selectedIdentificationType: string,
	model: Object,
	cityList: Array,
	provinceList: Array,
};

class PersonDetailsForm extends Component<Props, State> {
	static displayName = "PersonDetailsForm";
	static contextTypes = contextTypesValidationMap;

	static propTypes = {
		BasketActions: PropTypes.shape({
			activateCheckoutStep: PropTypes.func.isRequired,
			commitBasket: PropTypes.func.isRequired
		}).isRequired,
		BasketStore: PropTypes.shape({
			activeBasket: PropTypes.object
		}),
		ConsulStore: PropTypes.shape({
			countries: PropTypes.array,
			genders: PropTypes.array,
			locale: PropTypes.string.isRequired
		}).isRequired,

		CustomerCaseStore: PropTypes.object,

		UserActions: PropTypes.shape({
			createUser: PropTypes.func.isRequired,
			updateUser: PropTypes.func.isRequired
		}).isRequired,
		person: PropTypes.shape({}),
		postalAddress: PropTypes.shape({
			street: PropTypes.string,
			description: PropTypes.string,
			postalCode: PropTypes.string,
			stateOrProvince: PropTypes.string,
			city: PropTypes.string,
			country: PropTypes.string
		}).isRequired,
		addressIsRequired: PropTypes.bool,
		updatingUser: PropTypes.bool,
		isValid: PropTypes.func,
		setupDone: PropTypes.bool,
		schema: PropTypes.object,
		onlyUpdateCustomerCase: PropTypes.bool,
		hideIdentificationAtCheckoutPage: PropTypes.bool,
		birthDayAgeLimit: PropTypes.string,
		provinces: PropTypes.array,
		cities: PropTypes.array,
	};

	constructor(props: Props, context: ContextType) {
		super(props, context);
		this.state = {
			showPayerSelection: false,
			enableSaveButton: false,
			userInformationModified: false,
			model: this.getFormModel(props),
			showOrganizationSelect: false,
			selectedOrganizationId: null,
			identification: get(
				props,
				"ConsulStore.features.pos.identification"
			),
			selectedIdentificationType: get(
				props,
				"ConsulStore.features.pos.identification.default"
			),
			cityList: this.props.cities,
			provinceList: this.props.provinces,
		};

		const requiredFields = [
			"firstName",
			"lastName",
			"mobileNumber",
			"gender"
		];
		this.props.addressIsRequired && requiredFields.push("email");
	}

	handleSubmit = (model: Object, forceUpdateAddress?: boolean) => {
		this.props.schema
			.validate(model)
			.then(valid => {
				this.props.isValid(valid);
				if (this.props.UserActions) {
					const updateCustomerCase = true;
					this.context.flux.reduxStore.dispatch(actions.error.clearAddressValidationError());

					this.props.UserActions.updateUser(
						model,
						updateCustomerCase,
						forceUpdateAddress,
						false,
						this.props.onlyUpdateCustomerCase
					);
					this.setState({ model });
				}
			})
			.catch(error => {
				console.log("validation error: ", error);
			});
	};

	handleInputChange = (model: Object): void => {
		this.setState({
			model
		});
		this.props.schema
			.validate(model)
			.then(() => {
				this.setState({
					enableSaveButton: true,
					userInformationModified: true
				});
			})
			.catch(err => {
				console.log("INVALID MODEL::", err);
				this.setState({
					enableSaveButton: false,
					userInformationModified: true
				});
			});
	};

	getFormModel = (props: Props) => {
		const person = this.getPersonModel(props);
		const postalAddress = props.postalAddress;
		const birthDay = person["birthDay"]
			? DateUtil.dateWithTimezoneOffset(person.birthDay)
			: null;

		return {
			id: get(person, "id"),
			firstName: get(person, "firstName", ""),
			lastName: get(person, "lastName", ""),
			gender: get(person, "gender"),
			language: get(person, "language"),
			birthDay,
			countryOfBirth: get(person, "countryOfBirth"),
			email: get(person, "emails[0].email", ""),
			mobileNumber: get(person, "mobileNumbers[0].number", ""),
			street: get(postalAddress, "street"),
			description: get(postalAddress, "description"),
			postalCode: get(postalAddress, "postalCode"),
			city: get(postalAddress, "city"),
			stateOrProvince: get(postalAddress, "stateOrProvince"),
			country: get(postalAddress, "country"),
			identificationType: get(person, "identifications[0].type", ""),
			identificationId: get(
				person,
				"identifications[0].identificationId",
				""
			),
			identificationIssuingAuthority: get(
				person,
				"identifications[0].issuingAuthority.name",
				""
			),
			identificationIssuingDate: get(
				person,
				"identifications[0].validityPeriod.startDate"
			),
			identificationExpiryDate: get(
				person,
				"identifications[0].validityPeriod.endDate"
			)
		};
	};

	getPersonModel = (props: Props) => omit(props.person, "postalAddresses");

	componentDidMount() {
		const { model } = this.state;
		this.props.actions.resetConfirmCustomerDetails();
		this.props.schema
			.isValid(model)
			.then(valid => this.props.isValid(valid));
	}

	componentWillReceiveProps(newProps: Props) {
		const state = this.getStateForProps(newProps);
		this.props.schema
			.isValid(state.model)
			.then(valid => newProps.isValid(valid));
		this.setState(state);

		if (newProps.BasketStore.basketItems && newProps.BasketStore.basketItems.length === 0 && !newProps.error) {
			newProps.BasketActions.onError(BasketClearedError);
		}
		if (newProps.customerDetailsConfirmationStatus !== this.props.customerDetailsConfirmationStatus
			&& newProps.customerDetailsConfirmationStatus === "SUCCESS") {
			this.commitBasket();
		}
		if (newProps.customerDetailsConfirmationStatus === "FAIL") {
			this.setState({ userInformationModified: false });
		}
		const { cities, provinces } = newProps;
		if (!isEqual(this.props.cities, cities)) {
			this.setState({ cityList: cities });
		}
		if (!isEqual(this.props.provinces, provinces)) {
			this.setState({ provinceList: provinces });
		}
	}

	getStateForProps = (newProps: Props) => {
		const isModelModified = this.isModelModified(this.props, newProps),
			model =
				(!isModelModified &&
					/* $FlowFixMe */
					this.state.model) ||
				this.getFormModel(newProps);
		return assign(
			{ model },
			isModelModified
				? { enableSaveButton: false, userInformationModified: false }
				: {}
		);
	};

	isModelModified = (oldProps: Props, newProps: Props) => {
		return !(
			isMatch(
				this.getPersonModel(oldProps),
				this.getPersonModel(newProps)
			) && isMatch(oldProps.postalAddress, newProps.postalAddress)
		);
	};

	proposalSelected(address: AddressType, forceUpdateAddress?: boolean) {
		/* $FlowFixMe */
		const { model } = this.state;
		const _address = pick(address, [
			"city",
			"country",
			"postalCode",
			"street"
		]);
		/* $FlowFixMe */
		const _model = R.merge(model, _address);
		this.handleSubmit(_model, forceUpdateAddress);
	}

	commitBasket = () => {
		const activeBasket = this.props.BasketStore.activeBasket;
		const {
			selectedOrganizationId,
			showOrganizationSelect
		} = this.state;
		const activePersonId = get(
			this.props.CustomerCaseStore,
			"activeCustomerCase.attributes.activeCustomer.id"
		);
		this.props.BasketActions.commitBasket(
			activeBasket,
			activePersonId,
			true,
			showOrganizationSelect ? selectedOrganizationId : null
		);
	};

	handleClickOnGoToContracts = e => {
		e.preventDefault();
		e.stopPropagation();
		const activePersonId = get(
			this.props.CustomerCaseStore,
			"activeCustomerCase.attributes.activeCustomer.id"
		);
		this.props.actions.confirmCustomerDetails(activePersonId);
		this.setState({ userInformationModified: true });
	}

	getSelectedExpiryDate = (model: Object) => {
		return !model.identificationExpiryDate
			? null
			: new Date(model.identificationExpiryDate);
	};

	renderCityAndState(Form, formatMessage) {
		return (
			<div>
				<div className="form-group">
					<div className="stateOrProvince-container">
						<Form.Field
							id="PersonDetailsForm-postalAddress-stateOrProvince-field"
							name="stateOrProvince"
							className="stateOrProvince-input"
							type={FormalOcInput}
							placeholder={formatMessage({
								...messages.formState
							})}
							required={
								this.props.addressIsRequired
							}
							defaultValue=""
						/>
					</div>
				</div>
					<div className="form-group">
						<div className="city-container">
							<Form.Field
								id="PersonDetailsForm-postalAddress-city-field"
								name="city"
								className="city-input"
								type={FormalOcInput}
								placeholder={formatMessage({
									...messages.formCity
								})}
								required={
									this.props.addressIsRequired
								}
								defaultValue=""
							/>
						</div>
					</div>
				</div>
		)
	}
	render() {
		const { formatMessage } = this.context.intl;
		const { hideIdentificationAtCheckoutPage, birthDayAgeLimit } = this.props;
		const person = omit(this.props.person, "postalAddresses");
		let countries = get(this.props.ConsulStore, "countries");
		if (countries) {
			countries = countries.map(country => {
				return {
					code: country.code,
					locale: country.locale,
					name: countryMessages[`countryName${country.code}`]
						? formatMessage({
							...countryMessages[`countryName${country.code}`]
						})
						: country.name
				};
			});
		}

		const genders = get(this.props.ConsulStore, "genders");
		const { setupDone } = this.props;
		/* $FlowFixMe */
		const { model, cityList, provinceList } = this.state;
		const translations = get(this.props, "ConsulStore.messages", {});
		// yesterday
		const maxIssuingDate = new Date();
		maxIssuingDate.setDate(maxIssuingDate.getDate() - 1);
		// tomorrow
		const minIssuingDate = new Date();
		minIssuingDate.setDate(minIssuingDate.getDate() + 1);
		// birthday age. defaults to 18 years if not consul configured
		const birthDayMinDate = new Date();
		birthDayMinDate.setFullYear(birthDayMinDate.getFullYear() - birthDayAgeLimit);
		const expirationDateFieldEnabled =
			this.state.selectedIdentificationType &&
				this.state.identification &&
				this.state.identification[
				this.state.selectedIdentificationType
				]
				? this.state.identification[
					this.state.selectedIdentificationType
				].identificationExpiryDate
				: false;
		const identificationTypeTranslationKey =
			translations && model.identificationType
				? translations[`${model.identificationType}-identification`]
				: "";
		const identificationTypeTranslation = (
			<TranslatedComponent
				value={model.identificationType}
				id={`PersonDetailsForm-identification-type-${model.identificationType}`}
				wrapper="span"
				translation={identificationTypeTranslationKey}
				formattedMessage={
					messages[`${model.identificationType}_identification`]
				}
			/>
		);
		return (
			<div className="details-form w-box">
				<AddressValidationHandlerContainer
					addressValidationError={
						this.context.flux.reduxStore.getState().error.addressValidationError
					}
					model={model}
					actions={{
						proposalSelected: (model, forceUpdateAddress) =>
							this.proposalSelected(model, forceUpdateAddress),
						cancel: () =>
							this.context.flux.reduxStore.dispatch(actions.error.clearAddressValidationError()),
						parentSubmit: (model, forceUpdateAddress) =>
							this.handleSubmit(model, forceUpdateAddress),
					}}
				/>
				<Form
					schema={this.props.schema}
					onChange={model => this.handleInputChange(model)}
					value={model}
					onSubmit={() => this.handleSubmit(model)}
				>
					<div>
						<h3>
							<FormattedMessage {...messages.fillInCustomerDetails} />
						</h3>
						<div className="PersonDetailsForm-fieldsets">
							<div className="PersonDetailsForm-fieldset-column">
								<fieldset>
									<legend id="PersonDetailsForm-message">
										<FormattedMessage {...messages.formPersonalInformation} />
									</legend>
									<div className="form-group">
										<Form.Field
											id="PersonDetailsForm-firstName-field"
											name="firstName"
											type={FormalOcInput}
											placeholder={formatMessage({
												...messages.formFirstName
											})}
											defaultValue=""
										/>
									</div>
									<div className="form-group narrow">
										<Form.Field
											id="PersonDetailsForm-lastName-field"
											name="lastName"
											type={FormalOcInput}
											placeholder={formatMessage({
												...messages.formLastName
											})}
											defaultValue=""
										/>
									</div>
									<div className="form-group date-of-birth">
										<label>
											<FormattedMessage {...messages.formDateOfBirth} />
										</label>
										<div className="assistance-date-picker">
											<Form.Field
												id="PersonDetailsForm-birthDay-field"
												name="birthDay"
												max={birthDayMinDate}
												placeholder={
													!person.birthDay ? (
														formatMessage(
															messages.chooseADate
														)
													) : (
															DateUtil.dateWithTimezoneOffset(person.birthDay)
														)
												}
												type={OcDatePicker}
												format="LL"
												editFormal="LL"
												withClock={false}
												dropUp={false}
											/>
										</div>
									</div>
									<div className="form-group gender">
										<Form.Field
											name="gender"
											id="PersonDetailsForm-gender"
											type={FormalOcSelect}
											required={true}
											label={formatMessage({
												...messages.gender
											})}
										>
											<option
												key={`gender_0`}
												value=""
												id={`PersonDetailsForm-gender-option-empty`}
												disabled={true}
											>
												{formatMessage({
													id:
														"gender-required-edemo-kiire-hax",
													defaultMessage:
														"Choose gender",
													description: "Choose gender"
												})}
											</option>

											{genders &&
												genders.map((gender, idx) => {
													return (
														<option
															key={`gender_${idx}`}
															value={gender.toLowerCase()}
															id={`PersonDetailsForm-gender-option-${gender}`}
														>
															{messages[
																`gender_${gender}`
															] ? (
																	formatMessage({ ...messages[`gender_${gender}`] })
																) : (
																	gender
																)}
														</option>
													);
												})}
										</Form.Field>
									</div>
								</fieldset>
								{!hideIdentificationAtCheckoutPage && model.identificationType && (
									<fieldset>
										<legend id="PersonDetailsForm-message">
											<FormattedMessage
												{...messages.formIdentificationInformation}
											/>
										</legend>
										<div className="form-group">
											<FormattedMessage
												{...messages.formIdentificationInformationTypeLabel}
												values={{
													identificationType: identificationTypeTranslation
												}}
											/>
										</div>
										<div className="form-group">
											<Form.Field
												id="PersonDetailsForm-identificationId"
												name="identificationId"
												type={FormalOcInput}
												placeholder={formatMessage({
													...messages.formIdentificationId
												})}
												defaultValue=""
											/>
										</div>
										<div>
											<Form.Field
												id="PersonDetailsForm-identificationIssuingAuthority"
												name="identificationIssuingAuthority"
												type={FormalOcInput}
												label={formatMessage(
													messages.identificationIssuingAuthority
												)}
												placeholder={formatMessage(
													messages.identificationIssuingAuthorityPlaceholder
												)}
											/>
										</div>
										<div>
											<Form.Field
												id="inputIdentificationIssuingDateIntoCustomerDataForm"
												name="identificationIssuingDate"
												type={OcDatePicker}
												selectedDate={
													new Date(
														model.identificationIssuingDate
													)
												}
												label={formatMessage(
													messages.identificationIssuingDate
												)}
												placeholder={formatMessage(
													messages.identificationDatePlaceholder
												)}
												defaultCurrentDate={
													maxIssuingDate
												}
												max={maxIssuingDate}
												withClock={false}
												required={true}
											/>
										</div>
										<div>
											{expirationDateFieldEnabled && (
												<Form.Field
													id="inputIdentificationExpiryDateIntoCustomerDataForm"
													name="identificationExpiryDate"
													type={OcDatePicker}
													selectedDate={this.getSelectedExpiryDate(
														model
													)}
													label={formatMessage(
														messages.identificationExpiryDate
													)}
													placeholder={formatMessage(
														messages.identificationDatePlaceholder
													)}
													defaultCurrentDate={
														minIssuingDate
													}
													min={minIssuingDate}
													withClock={false}
												/>
											)}
										</div>
									</fieldset>
								)}
							</div>
							<fieldset>
								<legend>
									<FormattedMessage
										{...messages.formContactInformation}
									/>
								</legend>
								<div className="form-group">
									<Form.Field
										id="PersonDetailsForm-email-field"
										name="email"
										type={FormalOcInput}
										placeholder={formatMessage({
											...messages.formEmailAddress
										})}
										defaultValue=""
									/>
								</div>
								<div className="form-group narrow">
									<Form.Field
										id="PersonDetailsForm-phone-field"
										name="mobileNumber"
										type={FormalOcInput}
										placeholder={formatMessage({
											...messages.formContactPhone
										})}
										defaultValue=""
									/>
								</div>
							</fieldset>

							<fieldset>
								<legend>
									<FormattedMessage {...messages.personalFormAddress} />
								</legend>
								<div className="form-group">
									<Form.Field
										id="PersonDetailsForm-postalAddress-street-field"
										name="street"
										type={FormalOcInput}
										placeholder={formatMessage({
											...messages.formStreetAddress
										})}
										defaultValue=""
									/>
								</div>
								<div className="form-group">
									<Form.Field
										id="PersonDetailsForm-postalAddress-description-field"
										name="description"
										type={FormalOcInput}
										placeholder={formatMessage({
											...messages.formAddressDetails
										})}
										defaultValue=""
									/>
								</div>
								<div className="postalcode-city form-group">
									<div className="postalcode-container">
										<Form.Field
											id="PersonDetailsForm-postalAddress-postalCode-field"
											name="postalCode"
											type={FormalOcInput}
											placeholder={formatMessage({
												...messages.formPostalCode
											})}
											defaultValue=""
										/>
									</div>
								</div>
								{
									this.renderCityAndState(Form, formatMessage, provinceList, cityList)
								}
								<div className="form-group drop-down">
									<Form.Field
										id="PersonDetailsForm-postalAddress-country-field"
										name="country"
										type={FormalSelectCountry}
										required={this.props.addressIsRequired}
										label={formatMessage({
											...messages.formCountryLabel
										})}
										countries={countries}
										defaultValue=""
									/>
								</div>
							</fieldset>
						</div>
					</div>
					<OrganizationSelectContainer
						onOrganizationCheckboxChange={(
							showOrganizationSelect: boolean
						): void => {
							console.log(
								"onOrganizationCheckboxChange ",
								showOrganizationSelect
							);
							this.setState({ showOrganizationSelect });
						}}
						onOrganizationSelectChange={selectedOrganizationId => {
							this.setState({ selectedOrganizationId });
						}}
						CustomerCaseStore={this.props.CustomerCaseStore}
						showOrganizationSelect={
							this.state.showOrganizationSelect
						}
						selectedOrganizationId={
							this.state.selectedOrganizationId
						}
					/>
					<footer>
						{this.props.updatingUser && (
							<i className="fa fa-spinner fa-spin btn-icon-left" />
						)}
						<OcButton
							id="PersonDetailsForm-save-information-button"
							buttonType={OcButtonType.SUCCESS}
							htmlBtnType="submit"
							disabled={
								/* $FlowFixMe */
								!this.state.enableSaveButton
							}
						>
							<FormattedMessage {...messages.checkoutSavePersonInfo} />
						</OcButton>
						<OcButton
							onClick = {
								this.handleClickOnGoToContracts
							}
							buttonType={OcButtonType.PRIMARY}
							disabled={
								!setupDone /* $FlowFixMe */ ||
								this.state.userInformationModified
							}
							id="buttonGoToContractsInCheckoutSetup"
						>
							<FormattedMessage {...messages.setupGoToSummary} />
						</OcButton>
						{(this.props.customerDetailsConfirmationStatus === "IN_PROGRESS") && (
							<i className="fa fa-spinner fa-spin btn-icon-left" />
						)}
					</footer>
				</Form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		customerDetailsConfirmationStatus: state.posCheckout.customerDetailsConfirmationStatus,
		birthDayAgeLimit: (state.feature && state.feature.birthDayAgeLimit) || "",
	};
};

const mapDispatchToProps = (dispatch) => ({
	actions: {
		confirmCustomerDetails: individualId => dispatch(actions.posCheckout.confirmCustomerDetails(individualId)),
		resetConfirmCustomerDetails: () => dispatch(actions.posCheckout.resetConfirmCustomerDetails()),
	}
});

const ConnectedPersonDetailsForm = withCustomization(POSComponentCustomizationPoints.POS_PERSON_DETAILS_FORM,
	withSchema(["personDetailsForm"])(connect(mapStateToProps, mapDispatchToProps)(PersonDetailsForm)));

export {
	ConnectedPersonDetailsForm,
	PersonDetailsForm
}

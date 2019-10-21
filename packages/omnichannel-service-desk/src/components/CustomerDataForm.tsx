import { isEmpty, get, find, head, isArray } from "lodash";
import {
	withFormal,
	OcDatePicker,
	OcSelect,
	OcInput,
	cssns,
	TranslatedComponent,
	FormalCheckbox,
	ContextType,
	contextTypesValidationMap,
	FormattedMessage,
	Locations,
	Country,
	Gender,
	OcButtonType,
	OcButton,
	countryMessages,
	nationalityMessages,
} from "omnichannel-common-pos";
import { Component, ValidationMap } from "react";
import { Schema } from "yup";
import Utils from "../utils/Utils";
import messages, { IndexMessagesType } from "../index.messages";
import * as moment from 'moment';

const Form = require("react-formal");
const FormalOcSelect = withFormal(OcSelect);
const FormalOcInput = withFormal(OcInput);
const { React } = cssns("CustomerDataForm");

interface CustomerDataFormStateProps {
	schema?: Schema<any> & { fields: Array<any> };
	customerToCreate: any;
	requiredFields: Array<any>;
	additionalFields: Array<any>;
	validationErrors: Array<any>;
	genders: Array<Gender>;
	features: Record<string, any>;
	displayOptions: {
		organizationIdentification: object;
		identification: Array<any>;
		customerDataForm: any;
	};
	locale: string;
	locations: Locations;
	countries: Array<Country>;
	customerIdValidationStatus: boolean;
	customerIdValidationStatusForNamesField: boolean;
	dateFormat: string;
}

interface CustomerDataFormActionProps {
	actions: {
		onBlur: (e: any) => void;
		onSubmit: (data: any) => void;
	};
}

interface CustomerDataFormState {
	provinceCities?: any;
	selectedType: string;
	selectedIdentificationObject: any;
	validationErrors: Array<any>;
}

type CustomerDataFormProps = CustomerDataFormStateProps & CustomerDataFormActionProps;


class CustomerDataForm<T extends CustomerDataFormProps, S extends CustomerDataFormState> extends Component<T, S> {
	static contextTypes: ValidationMap<ContextType> = contextTypesValidationMap;
	form: any;

	constructor(props: T, context: ContextType) {
		super(props, context);
		const { identification } = props.displayOptions || [];
		this.changeIdentificationType = this.changeIdentificationType.bind(this);

		this.state = {
			validationErrors: [],
			selectedType: identification && identification.length > 0 ? (head(identification)! as any).backendValue : "",
			selectedIdentificationObject: identification ? head(identification) : {}
		} as any;
	}

	componentDidMount() {
		this.filterCitiesIfNeeded(this.props);
	}

	componentWillReceiveProps(newprops: CustomerDataFormProps) {
		this.filterCitiesIfNeeded(newprops);
	}

	filterCitiesIfNeeded = (newProps: CustomerDataFormProps) => {
		const provincePath = "defaultValues.customerToCreate.province";
		const provinceName = newProps.customerToCreate && newProps.customerToCreate.province;
		if (Utils.hasDataChanged(this.props, newProps, provincePath) || (provinceName && isEmpty(this.state.provinceCities))) {
			this.filterCities(provinceName);
		}
	};

	filterCities = (provinceName: string) => {
		const { locations } = this.props;
		const cities = get(locations, "cities");
		const provinces = get(locations, "provinces");

		const provinceCities = isArray(cities) && isArray(provinces) &&
			cities.filter(city => {
				const selectedProvince = Utils.getListItemById(provinces, "provinceName", provinceName);
				return selectedProvince && city.provinceCode === selectedProvince.provinceCode;
			});

		this.setState({
			provinceCities
		});
	};

	changeIdentificationType(identificationType: any) {
		const identificationObject = find(this.props.displayOptions.identification, identificationTypeObject => {
			return (
				this.props.locale in identificationTypeObject.localisation &&
				identificationTypeObject.localisation[this.props.locale] === identificationType
			);
		});

		this.setState({
			selectedType: identificationObject.backendValue,
			selectedIdentificationObject: identificationObject
		});
	}

	getFormValues = () => {
		return get(this, "form._values.value", {});
	};

	renderCountry = (name: string, id: string, validationErrorsObject: any) => {
		const { formatMessage } = this.context.intl;
		const { requiredFields, countries } = this.props;
		const countryName = (messages as any)[name]; // should be ok
		return (
			<div className="customerDataFormInput">
				<Form.Field
					name={name}
					id={id}
					type={FormalOcSelect}
					label={countryName && formatMessage(countryName)}
					required={requiredFields.includes(name)}
					defaultValue=""
					errorMessage={validationErrorsObject[name] && validationErrorsObject[name][0]}
				>
					<option key={"country_0"} value="" id={"CustomerDataForm-country-option-empty"} disabled={true}>
						{countryName && formatMessage(countryName)}
					</option>
					{countries && countries.map((country: Country, idx: number) => {
                        const msgId = `${name}Name${country.code}`;
                        const messageObj = name === "country" ? (countryMessages as any)[msgId] : (nationalityMessages as any)[msgId];
                        return (
                            <option key={`${name}_${idx}`} value={country.code} id={`CustomerDataForm-${name}-option-${idx}`}>
                                {formatMessage(messageObj)}
                            </option>
                        );
                    })}
				</Form.Field>
			</div>
		);
	};

	handleSubmit = (model: any) => {
		/* Triggering store updates on the form's onChange caused some nasty side effects - see https://extranet-sd.qvantel.com/browse/RUBT-63372
		 *	Triggering it here instead because of lazy
		 *  // onChange && onChange(model);
		 *
		 * Seems to me that having onBlur solves that issue without calling onChange() here. -Jussi
		 */
		if (this.props.schema) {
			this.props.schema.validate(model, {abortEarly: false})
				.then((valid: any) => {
					if (this.props.actions.onSubmit) {
						this.props.actions.onSubmit(valid);
					}
				})
				.catch((err: any) => {
					const errors = err.inner;
					const { validationErrors } = this.state;
					if (validationErrors) {
						this.setState({
							validationErrors: this.state.validationErrors.concat(errors)
						});
					}
				});
		}
	};

	handleBlur = (event: any) => {
		/*
		 * NOTE validate only _one_ _field_ here !
		 */
		const fieldName = event.target.name;
		let {value} = event.target;
		// Check if field is cleared and it is one of the date fields. Change value to null if so
		if (!value && (fieldName === "identificationExpiryDate" || fieldName === "identificationIssuingDate" || fieldName === "birthDay")) {
			value = null;
		}

		if (!fieldName) {
			return;
		}

		if (fieldName === "province") {
			const formValues = this.getFormValues();
			if (formValues.city) {
				formValues.city = "";
			}
		}

		const field = this.props.schema && this.props.schema.fields[fieldName];
		if (field) {
			if (value && (["birthDay", "identificationIssuingDate", "identificationExpiryDate"].includes(fieldName))) {
                value = moment(value, this.props.dateFormat).format("MM/DD/YYYY");
			}
			this.props.schema!.fields[fieldName]
				.validate(value, {abortEarly: true})
				.then((fieldValue: any) => {
					const updateObject: any = {[fieldName]: fieldValue};

					if (fieldName === "province") {
						updateObject.city = "";
					}
					if (this.props.actions.onBlur) {
						this.props.actions.onBlur(updateObject);
					}
				})
				.catch((err: any) => {
					if (!err.path) {
						err.path = fieldName;
					}

					this.setState({
						validationErrors: this.state.validationErrors.concat(err)
					});
				});
		} else {
			console.warn(`Unknown field ${fieldName} in the schema! Please add it there. Current schema is: `, this.props.schema);
		}
	};

	handleFocus = (event: any) => {
		const fieldName = event.target.name;
		const { validationErrors } = this.state;

		if (validationErrors) {
			this.setState({
				validationErrors: validationErrors.filter(e => e.path !== fieldName)
			});
		}
	};
	renderRegionDropdowns = () => {
		const { locations } = this.props;
		const provinces = locations && locations.provinces || [];
		const cities = locations && locations.cities || [];
		const renderRegionDropdowns = provinces && cities && provinces.length > 0 && cities.length > 0;

		return renderRegionDropdowns;
	}

	renderDropdownOptions = () => {
		const { locations, requiredFields } = this.props;
		const { provinceCities } = this.state;
		const provinces = locations && locations.provinces || [];
		const cities = locations && locations.cities || [];
		const { formatMessage } = this.context.intl;

		const validationErrorsObject: any = {};
		this.state.validationErrors.forEach((e: any) => {
			validationErrorsObject[e.path] = [e.message, { message: e.message, type: e.type }];
		});

		return (
			// use province based city selection, with dropdowns
			<>
				<div className="customerDataFormInput">
					<Form.Field
						name="province"
						id="inputProvincetIntoCustomerDataForm"
						type={FormalOcSelect}
						label={formatMessage(messages.province)}
						required={requiredFields.includes("province")}
						errorMessage={validationErrorsObject.province && validationErrorsObject.province[0]}
						onChange={(event: any) => this.filterCities(event)}
					>
						<option key={"province_0"} value="" id={"CustomerDataForm-province-option-empty"}>
							{formatMessage(messages.provincePlaceholder)}
						</option>
						{this.renderOptions(provinces, "provinceName")}
					</Form.Field>
				</div>
				<div className="customerDataFormInput">
					<Form.Field
						name="city"
						id="inputCityIntoCustomerDataForm"
						type={FormalOcSelect}
						label={formatMessage(messages.city)}
						required={requiredFields.includes("city")}
						errorMessage={validationErrorsObject.city && validationErrorsObject.city[0]}
					>
						<option key={"city_0"} value="" id={"CustomerDataForm-city-option-empty"}>
							{formatMessage(messages.cityPlaceholder)}
						</option>
						{this.renderOptions(provinceCities, "cityName")}
					</Form.Field>
				</div>
			</>
		);
	}

	renderOptions = (options: Array<any>, key: string) => {
		return options && options.map((option: any, idx: number) => {
			return (
				<option
					key={`provinceOrCity_${idx}_${option[key]}`}
					value={option[key]}
					id={`CustomerDataForm-province-option-${option[key]}`}
				>
					{option[key]}
				</option>
			);
		});
	}

	render() {
		const { formatMessage } = this.context.intl;
		const {locale, schema, genders, locations, features, displayOptions, requiredFields, customerToCreate, additionalFields} = this.props;

		const formFeatures = displayOptions ? displayOptions.customerDataForm : {};
		const { selectedIdentificationObject } = this.state;
		//today
		const maxIssuingDate = new Date();
		// tomorrow
		const minIssuingDate = new Date();
		minIssuingDate.setDate(minIssuingDate.getDate());
		// birthday age. defaults to 18 years if not consul configured
		const birthDayMinDate = new Date();
		const birthDayAgeLimit = get(features, "birthDayAgeLimit", 18);
		birthDayMinDate.setFullYear(birthDayMinDate.getFullYear() - birthDayAgeLimit);

		const validationErrorsObject: any = {};
		this.state.validationErrors.forEach((e: any) => {
			validationErrorsObject[e.path] = [e.message, { message: e.message, type: e.type}];
		});

		// if customer id is successfully validated, lock certain fields to prevent circumventing validation, QRUM-26674
		const IdValidationStatus = this.props.customerIdValidationStatus;
		const IdValidationStatusForNamesField = this.props.customerIdValidationStatusForNamesField;
		messages.identificationDatePlaceholder.defaultMessage =	this.props.dateFormat;

		return (
			<Form
				ref={(form: any) => {this.form = form;}}
				className="CustomerDataForm"
				noValidate={true}
				schema={schema}
				onFocus={this.handleFocus}
				onBlur={this.handleBlur}
				onSubmit={this.handleSubmit}
				defaultValue={{ ...(customerToCreate as any) }}
			>
				<div className="fieldsets">
					<fieldset>
						<legend>
							<FormattedMessage {...messages.customerPersonalInformation} />
						</legend>
						<div className="customerDataFormInputContainer">
							<div className="customerDataFormInput">
								<Form.Field
									disabled={IdValidationStatusForNamesField}
									name="firstName"
									id="inputFirstNameIntoCustomerDataForm"
									type={FormalOcInput}
									label={formatMessage(messages.firstName)}
									required={requiredFields.includes("firstName")}
									errorMessage={validationErrorsObject.firstName && validationErrorsObject.firstName[0]}
								/>
							</div>

							<div className="customerDataFormInput">
								<Form.Field
									disabled={IdValidationStatusForNamesField}
									name="additionalName"
									id="inputAdditionalNameIntoCustomerDataForm"
									type={FormalOcInput}
									required={requiredFields.includes("additionalName")}
									label={formatMessage(messages.secondName)}
									errorMessage={validationErrorsObject.additionalName && validationErrorsObject.additionalName[0]}
								/>
							</div>

							<div className="customerDataFormInput">
								<Form.Field
									disabled={IdValidationStatusForNamesField}
									name="lastName"
									id="inputLastNameIntoCustomerDataForm"
									type={FormalOcInput}
									label={formatMessage(messages.lastName)}
									required={requiredFields.includes("lastName")}
									errorMessage={validationErrorsObject.lastName && validationErrorsObject.lastName[0]}
								/>
							</div>

							{formFeatures && formFeatures.lastName2 && (
								<div className="customerDataFormInput">
									<Form.Field
										disabled={IdValidationStatusForNamesField}
										name="lastName2"
										id="inputLastName2IntoCustomerDataForm"
										type={FormalOcInput}
										label={formatMessage(messages.lastName2)}
										required={requiredFields.includes("lastName2")}
										errorMessage={validationErrorsObject.lastName2 && validationErrorsObject.lastName2[0]}
									/>
								</div>
							)}

							{this.renderCountry("nationality", "inputNationalityIntoCustomerDataForm", validationErrorsObject)}

							<div className="customerDataFormInput">
								<Form.Field
									name="gender"
									id="inputGenderIntoCustomerDataForm"
									type={FormalOcSelect}
									label={formatMessage(messages.gender)}
									required={requiredFields.includes("gender")}
									defaultValue=""
									errorMessage={validationErrorsObject.gender && validationErrorsObject.gender[0]}
								>
									<option key={"gender_0"} value="" id={"CustomerDataForm-gender-option-empty"} disabled={true}>
										{formatMessage({...messages.chooseGenderPlaceholder})}
									</option>

									{genders && genders.map((gender: Gender, idx: number) => {
										return (
											<option key={`gender_${idx}`} value={gender.toLowerCase()} id={`CustomerDataForm-gender-option-${gender}`}>
												{messages[
													`gender_${gender}` as keyof IndexMessagesType
												] ? (
														formatMessage({ ...messages[`gender_${gender}` as keyof IndexMessagesType] })
													) : (
														gender
													)}
											</option>
										);
									})}
								</Form.Field>
							</div>
							<div className="customerDataFormInput">
								<Form.Field
									name="birthDay"
									id="inputBirthDayCustomerDataForm"
									type={OcDatePicker}
									label={formatMessage(messages.birthDay)}
									placeholder={formatMessage(messages.identificationDatePlaceholder)}
									defaultCurrentDate={birthDayMinDate}
									max={birthDayMinDate}
									withClock={false}
									required={requiredFields.includes("birthDay")}
									errorMessage={
										validationErrorsObject.birthDay && validationErrorsObject.birthDay[0] ? (
											  formatMessage(messages.dateOfBirthFieldValidationErrorText, { dateFormat: this.props.dateFormat }) +"."+
											  formatMessage(messages.birtDayMinimumAgeIs) +" "+birthDayAgeLimit
										) : null
									}	
									format={this.props.dateFormat}
								/>
							</div>
						</div>
					</fieldset>

					<fieldset>
						<legend>
							<FormattedMessage {...messages.customerIdentification} />
						</legend>
						<div className="customerDataFormInputContainer">
							<div className="customerDataFormInput">
								<Form.Field
									disabled={IdValidationStatus}
									name="identificationType"
									id="inputIdenificationTypeIntoCustomerDataForm"
									type={FormalOcSelect}
									label={formatMessage(messages.identificationType)}
									placeholder={formatMessage(messages.identificationTypePlaceholder)}
									required={requiredFields.includes("identificationType")}
									errorMessage={validationErrorsObject.identificationType && validationErrorsObject.identificationType[0]}
									onChange={this.changeIdentificationType}
								>
									{Array.isArray(displayOptions.identification) && displayOptions.identification.map((type: any, idx: number) => {
										const translation = locale ? (type.localisation[locale] ? type.localisation[locale] : "") : "";
										return (
											<TranslatedComponent
												value={type.localisation[locale]}
												key={idx}
												id={`CustomerDataForm-identification-type-option-${type.backendValue}`}
												wrapper="option"
												translation={translation}
											/>
										);
									})}
								</Form.Field>
							</div>

							<div className="customerDataFormInput">
								<Form.Field
									disabled={IdValidationStatus}
									name="identificationId"
									id="inputIdenificationIdIntoCustomerDataForm"
									type={FormalOcInput}
									label={formatMessage(messages.identificationId)}
									placeholder={formatMessage(messages.identificationIdPlaceholder)}
									required={requiredFields.includes("identificationId")}
									errorMessage={validationErrorsObject.identificationId && validationErrorsObject.identificationId[0]}
								/>
							</div>

							<div className="customerDataFormInput">
								<Form.Field
									name="identificationIssuingAuthority"
									id="inputIdenificationIssuingAuthorityIntoCustomerDataForm"
									type={FormalOcInput}
									label={formatMessage(messages.identificationIssuingAuthority)}
									placeholder={formatMessage(messages.identificationIssuingAuthorityPlaceholder)}
									required={requiredFields.includes("identificationIssuingAuthority")}
									errorMessage={
										validationErrorsObject.identificationIssuingAuthority && validationErrorsObject.identificationIssuingAuthority[0]
									}
								/>
							</div>

							<div className="customerDataFormInput">
								<Form.Field
									disabled={IdValidationStatus}
									name="identificationIssuingAuthorityCity"
									id="inputIdenificationIssuingAuthorityCityIntoCustomerDataForm"
									type={FormalOcInput}
									label={formatMessage(messages.identificationCityOfIssue)}
									placeholder={formatMessage(messages.identificationCityOfIssuePlaceholder)}
									required={requiredFields.includes("identificationIssuingAuthorityCity")}
									errorMessage={
										validationErrorsObject.identificationIssuingAuthorityCity && validationErrorsObject.identificationIssuingAuthorityCity[0]
									}
								/>
							</div>

							<div className="customerDataFormInput">
								<Form.Field
									disabled={IdValidationStatus}
									name="identificationIssuingDate"
									id="inputIdentificationIssuingDateIntoCustomerDataForm"
									type={OcDatePicker}
									label={formatMessage(messages.identificationIssuingDate)}
									placeholder={formatMessage(messages.identificationDatePlaceholder)}
									defaultCurrentDate={maxIssuingDate}
									max={maxIssuingDate}
									withClock={false}
									required={requiredFields.includes("identificationIssuingDate")}
									errorMessage={
										validationErrorsObject.identificationIssuingDate && validationErrorsObject.identificationIssuingDate[0] ? (
											formatMessage(messages.issuingDateFieldValidationErrorText, { dateFormat: this.props.dateFormat }) 
										): null
									}
									format={this.props.dateFormat}
								/>
							</div>

							<div className="customerDataFormInput">
								{selectedIdentificationObject && selectedIdentificationObject.identificationExpiryDate && (
									<Form.Field
										name="identificationExpiryDate"
										id="inputIdentificationExpiryDateIntoCustomerDataForm"
										type={OcDatePicker}
										label={formatMessage(messages.identificationExpiryDate)}
										placeholder={formatMessage(messages.identificationDatePlaceholder)}
										defaultCurrentDate={minIssuingDate}
										withClock={false}
										min={minIssuingDate}
										required={requiredFields.includes("identificationExpiryDate")}
										errorMessage={
											validationErrorsObject.identificationExpiryDate && validationErrorsObject.identificationExpiryDate[0] ? (
												formatMessage(messages.expiryDateFieldValidationErrorText, { dateFormat: this.props.dateFormat }) 
											) : null
										}
										format={this.props.dateFormat}
									/>
								)}
							</div>
						</div>
					</fieldset>

					<fieldset>
						<legend>
							<FormattedMessage {...messages.customerContactInformation} />
						</legend>
						<div className="customerDataFormInputContainer">
							<div className="customerDataFormInput wideInput">
								<Form.Field
									name="street"
									id="inputStreetIntoCustomerDataForm"
									type={FormalOcInput}
									label={formatMessage(messages.street)}
									required={requiredFields.includes("street")}
									errorMessage={validationErrorsObject.street && validationErrorsObject.street[0]}
								/>
							</div>

							<div className="customerDataFormInput wideInput">
								<Form.Field
									name="addressDetails"
									id="inputAddressDetailsIntoCustomerDataForm"
									type={FormalOcInput}
									label={formatMessage(messages.addressDetails)}
									required={requiredFields.includes("addressDetails")}
									errorMessage={validationErrorsObject.addressDetails && validationErrorsObject.addressDetails[0]}
								/>
							</div>
							{this.renderRegionDropdowns() && this.renderDropdownOptions()}
							<div className="customerDataFormInput">
								<Form.Field
									name="postalCode"
									id="inputPostalCodeIntoCustomerDataForm"
									type={FormalOcInput}
									label={formatMessage(messages.postalCode)}
									required={requiredFields.includes("postalCode")}
									errorMessage={validationErrorsObject.postalCode && validationErrorsObject.postalCode[0]}
								/>
							</div>

							{!this.renderRegionDropdowns() && (
								<div className="customerDataFormInput">
									<Form.Field
										name="city"
										id="inputCityIntoCustomerDataForm"
										type={FormalOcInput}
										label={formatMessage(messages.city)}
										required={requiredFields.includes("city")}
										errorMessage={validationErrorsObject.city && validationErrorsObject.city[0]}
									/>
								</div>
							)}

							{formFeatures && (formFeatures.apartment || formFeatures.building) && (
								<>
									<div className="customerDataFormInput">
										{formFeatures.apartment && (
											<Form.Field
												name="apartment"
												id="inputApartmentIntoCustomerDataForm"
												type={FormalOcInput}
												label={formatMessage(messages.apartment)}
												required={requiredFields.includes("apartment")}
												errorMessage={validationErrorsObject.apartment && validationErrorsObject.apartment[0]}
											/>
										)}
									</div>
									<div className="customerDataFormInput">
										{formFeatures.building && (
											<Form.Field
												name="building"
												id="inputBuildingIntoCustomerDataForm"
												type={FormalOcInput}
												label={formatMessage(messages.building)}
												required={requiredFields.includes("building")}
												errorMessage={validationErrorsObject.building && validationErrorsObject.building[0]}
											/>
										)}
									</div>
								</>
							)}

							{this.renderCountry("country", "inputCountryIntoCustomerDataForm", validationErrorsObject)}

							<div className="customerDataFormInput">
								<Form.Field
									name="email"
									id="inputEmailIntoCustomerDataForm"
									type={FormalOcInput}
									label={formatMessage(messages.email)}
									required={requiredFields.includes("email")}
									events={["onSubmit", "onBlur"]}
									errorMessage={validationErrorsObject.email && validationErrorsObject.email[0]}
								/>
							</div>

                            <div className="customerDataFormInput">
								<Form.Field
									name="mobileNumber"
									id="inputMobileNumberIntoCustomerDataForm"
									type={FormalOcInput}
									label={formatMessage(messages.mobileNumber)}
									required={requiredFields.includes("mobileNumber")}
									events={["onBlur", "onChange"]}
									errorMessage={validationErrorsObject.mobileNumber && validationErrorsObject.mobileNumber[0]}
								/>
							</div>

							<div className="customerDataFormInput">
								<Form.Field
									name="fixedLineNumber"
									id="inputFixedLineNumberIntoCustomerDataForm"
									type={FormalOcInput}
									label={formatMessage(messages.fixedLineNumber)}
									required={requiredFields.includes("fixedLineNumber")}
									events={["onBlur", "onChange"]}
									errorMessage={validationErrorsObject.fixedLineNumber && validationErrorsObject.fixedLineNumber[0]}
								/>
							</div>
						</div>
					</fieldset>
					<fieldset className="checkbox-container">
						<legend>
							<FormattedMessage {...messages.marketingDetails} />
						</legend>
						<Form.Field
							name="marketingOwnPartyMarketing"
							id="inputmarketingOwnPartyMarketing"
							type={FormalCheckbox}
							label={formatMessage(messages.marketingOwnPartyMarketing)}
							onChange={(value: any) => {
								this.props.actions.onBlur({ marketingOwnPartyMarketing: value });
							}}
						/>
						<div style={{ marginLeft: "20px" }}>
							<Form.Field
								name="marketingOwnPartyMarketingSms"
								id="inputmarketingOwnPartyMarketingSms"
								type={FormalCheckbox}
								label={formatMessage(messages.marketingOwnPartySMS)}
								onChange={(value: any) => {
									this.props.actions.onBlur({ marketingOwnPartyMarketingSms: value });
								}}
							/>
							<Form.Field
								name="marketingOwnPartyMarketingEmail"
								id="inputmarketingOwnPartyMarketingEmail"
								type={FormalCheckbox}
								label={formatMessage(messages.marketingOwnPartyEmail)}
								onChange={(value: any) => {
									this.props.actions.onBlur({ marketingOwnPartyMarketingEmail: value });
								}}
							/>
							<Form.Field
								name="marketingOwnPartyMarketingLetter"
								id="inputmarketingOwnPartyMarketingLetter"
								type={FormalCheckbox}
								label={formatMessage(messages.marketingOwnPartyLetter)}
								onChange={(value: any) => {
									this.props.actions.onBlur({ marketingOwnPartyMarketingLetter: value });
								}}
							/>
							<Form.Field
								name="marketingOwnPartyMarketingTelemarketing"
								id="inputmarketingOwnPartyMarketingTelemarketing"
								type={FormalCheckbox}
								label={formatMessage(messages.marketingOwnPartyTelemarketing)}
								onChange={(value: any) => {
									this.props.actions.onBlur({ marketingOwnPartyMarketingTelemarketing: value });
								}}
							/>
						</div>
					</fieldset>

					{!isEmpty(additionalFields) && (
						<fieldset>
							<legend>
								<FormattedMessage {...messages.additionalInformation} />
							</legend>
							<div className="customerDataFormInputContainer">
								<div className="customerDataFormInput">
									{additionalFields.filter(field => {
											return field.name && field.label;
										})
										.map(field => {
											return (
												<div key={field.name} className="customerDataFormInput">
													<Form.Field
														name={`${field.name}`}
														id={`field-${field.name.replace(".", "-")}`}
														type={FormalOcInput}
														label={field.label}
														required={field.required ? field.required : false}
														events={["onSubmit"]}
													/>
												</div>
											);
										})}
								</div>
							</div>
						</fieldset>
					)}
				</div>

				<footer className="customerDataFormFooter modal-footer">
					<Form.Button id="CustomerDataForm-continue-button" component="div" type="submit">
						<OcButton buttonType={OcButtonType.SUCCESS} id="customer-search-form-continue-button">
							<FormattedMessage {...messages.continueMsgPOS}/>
						</OcButton>
					</Form.Button>
				</footer>
			</Form>
		);
	}
}

export default CustomerDataForm;
export {
	CustomerDataFormProps,
	CustomerDataFormStateProps,
	CustomerDataFormActionProps,
	CustomerDataFormState
};

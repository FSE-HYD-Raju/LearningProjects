import {
	cssns,
	Flex,
	OcSelect,
	contextTypesValidationMap,
} from "omnichannel-common-pos";
import { omit, map, pick, find, get } from "lodash";
import CustomerDetailsView from "./CustomerDetailsView";
import { Component } from "react";
import messages from "../../index.messages";

import CustomerDetailsLegalDocumentsView from "./CustomerDetailsLegalDocumentsView";
import CustomerDetailsSidebarView from "./sidebar/CustomerDetailsSidebarView";
import CustomerDetailsNotificationsShow from "./CustomerDetailsNotificationsShow";
import CustomerDetailsNotificationsEdit from "./CustomerDetailsNotificationsEdit";

import PropTypes from "prop-types";

import moment from "moment";
import CustomerDetailsOffersContainer from "./offers/CustomerDetailsOffersContainer";
import CustomerDetailsForm from "./CustomerDetailsForm";
import CustomerSubDetailsView from "./CustomerSubDetailsView";

const { React } = cssns("CustomerDetailsView");
export const DELETE_DATA_OPTION = "Not defined";

export default class CustomerDetailsMainView extends Component {
	static contextTypes = contextTypesValidationMap;
	constructor(props, context) {
		const { customer } = props;
		const addresses = get(customer, "postalAddresses", []);
		const selected = get(customer, "postalAddresses[0]", {});
		super(props, context);

		this.state = {
			selected,
			addresses,
			editMode: "none"
		};
	}

	static propTypes = {
		customer: PropTypes.object,
		updatingUser: PropTypes.bool,
		getCustomerOffers: PropTypes.func,
		updateUserDemoGraphicInfo: PropTypes.func,
		updateUserAddresses: PropTypes.func,
		updateUserPreferences: PropTypes.func,
		updateUserPrivacySettings: PropTypes.func,
		addressValidationError: PropTypes.object,
		clearAddressValidationError: PropTypes.func,
		privacySettingsKeys: PropTypes.object,
		enableChangeCustomerData: PropTypes.bool,
		posShowSummaryData: PropTypes.bool
	};

	componentWillReceiveProps(nextProps) {
		const oldStateCustomer = get(this.props, "customer");
		const nextStateCustomer = get(nextProps, "customer");
		if (
			get(oldStateCustomer, "postalAddresses") !==
			get(nextStateCustomer, "postalAddresses")
		) {
			const prevSelectedId = get(this, "state.selected.id");
			const newAddresses = get(nextStateCustomer, "postalAddresses");
			const newSelected = prevSelectedId
				? find(newAddresses, { id: prevSelectedId })
				: get(newAddresses, "[0]");
			this.setState({
				addresses: newAddresses,
				selected: newSelected
			});
		}

		if (this.props.updatingUser && !nextProps.updatingUser) {
			this.setState({
				editMode: "none"
			});
		}
	}

	selectAddress = e => {
		e.preventDefault();
		const addressId = e.target.value;
		const selected = find(this.state.addresses, { id: addressId });
		this.setState({ selected });
	};

	toggleEditMode = detailComponent => {
		this.setState({ editMode: detailComponent });
	};

	handleDemographicInfoUpdate = updatedDemographicInfo => {
		const { customer } = this.props;

		const model = {
			...pick(
				updatedDemographicInfo,
				"firstName",
				"lastName",
				"nationality",
				"language",
				"gender"
			),
			/* Using moment here is solution to RUBT-66852,
			 * and hardcoding the timezone is both to make sure the time of day is in UTC
			 * and to be compatible with node version 8.
			 */
			birthDay: updatedDemographicInfo.birthDay
				? moment(updatedDemographicInfo.birthDay).format("YYYY-MM-DD")
				: updatedDemographicInfo.birthDay
		};

		if (model.nationality === DELETE_DATA_OPTION) {
			model.nationality = null;
		}

		if (this.props.updateUserDemoGraphicInfo) {
			const updateCustomerCase = true;
			this.props.updateUserDemoGraphicInfo(
				customer,
				model,
				updateCustomerCase
			);
		}

		// this.toggleEditMode('none');
	};

	handleAddressUpdate = (updatedPostalAddress, forceUpdateAddress) => {
		const { customer } = this.props;

		const addressToBeUpdated = {
			...this.state.selected,
			...updatedPostalAddress
		};

		const newAddresses = map(this.state.addresses, address => {
			return address.id === addressToBeUpdated.id
				? addressToBeUpdated
				: address;
		});

		const updateCustomerCase = true;
		this.props.updateUserAddresses(
			customer,
			newAddresses,
			updateCustomerCase,
			forceUpdateAddress
		);
	};

	handlePreferencesUpdate = updatedPreferences => {
		const { customer } = this.props;

		const model = {
			emails: [
				{
					email: updatedPreferences.contactEmail
				}
			],
			phone: {
				number: updatedPreferences.msisdn
			},
			fixedLineNumber: {
				number: updatedPreferences.contactFixedLineNumber
			},
			language: updatedPreferences.language
		};

		const updateCustomerCase = true;
		this.props.updateUserPreferences(customer, model, updateCustomerCase);
	};

	handleNotificationsAndMarketingUpdate = updatedPrivacy => {
		const { customer } = this.props;

		const model = {
			privacySettings: omit(updatedPrivacy, ["notifications", "surveys"])
		};
		const updateCustomerCase = true;
		this.props.updateUserPrivacySettings(
			customer,
			model,
			updateCustomerCase
		);
	};

	render() {
		const { formatMessage } = this.context.intl;

		const { customer, enableChangeCustomerData, posShowSummaryData } = this.props;
		const firstName = get(customer, "firstName", "");
		const lastName = get(customer, "lastName", "");

		const genders = get(this.props, "genders", []);

		const notDefinedFormattedMessage = formatMessage(messages.notDefined);
		const languages = [
			{
				code: DELETE_DATA_OPTION,
				name: notDefinedFormattedMessage
			}
		].concat(get(this.props, "languages", []));

		const countries = [
			{
				code: DELETE_DATA_OPTION,
				name: notDefinedFormattedMessage,
				locale: "en"
			}
		].concat(get(this.props, "countries", []));

		const customerNationality = find(countries, [
			"code",
			get(customer, "nationality")
		]);

		const demographicInfo = [
			{
				fieldName: "firstName",
				value: get(customer, "firstName"),
				required: true
			},
			{
				fieldName: "lastName",
				value: get(customer, "lastName"),
				required: true
			},
			{
				fieldName: "nationality",
				value:
					customerNationality && customerNationality.code
						? customerNationality.code
						: notDefinedFormattedMessage,
				type: "select",
				options: countries
			},
			{
				fieldName: "gender",
				value: get(customer, "gender"),
				type: "select",
				options: genders
			},
			{
				fieldName: "birthDay",
				value: get(customer, "birthDay"),
				type: "date"
			}
		];

		const selectedAddressFields = [
			{
				fieldName: "street",
				value: get(this.state, "selected.street"),
				required: true
			},
			{
				fieldName: "postalCode",
				value: get(this.state, "selected.postalCode"),
				required: true
			},
			{
				fieldName: "province",
				value: get(this.state, "selected.stateOrProvince"),
				required: false
			},
			{
				fieldName: "city",
				value: get(this.state, "selected.city"),
				required: true
			},
			{
				fieldName: "country",
				value: get(this.state, "selected.country"),
				type: "select",
				options: countries,
				required: true
			}
		];

		const preferenceInfo = [
			{
				fieldName: "contactEmail",
				value: get(customer, "emails[0].email")
			},
			{
				fieldName: "msisdn",
				value: get(customer, "mobileNumbers[0].number"),
				regex: "^$|^(\\+?)([0-9 ]+)$"
			},
			{
				fieldName: "contactFixedLineNumber",
				value: get(customer, "fixedLineNumbers[0].number"),
				regex: "^$|^(\\+?)([0-9 ]+)$"
			},
			{
				label: "contactLanguage",
				fieldName: "language",
				value: get(customer, "language"),
				type: "select",
				options: languages
			}
		];

		const relationsInfo = [
			{
				fieldName: "",
				value: "Mark M. user in 1 subscription owned by Katrin K"
			}
		];

		// used for filtering out multiple addresses of the same role
		const alreadyShownAddressRoles = {};

		const privacySettings = get(this.props.customer, "privacySettings");

		return (
			<div className="this w-box w-box-stretch">
				<header className="header">
					<img
						className="avatar"
						src={`/static/${get(customer, "avatar")}`}
						alt="Avatar"
					/>

					{firstName &&
					lastName && (
						<h2>{`${firstName} ${lastName.substring(0, 1)}.`}</h2>
					)}
				</header>
				<Flex justifyContent="space-between">
					<Flex flex={2.5}>
						<Flex style={{ width: "100%" }}>
							<Flex flex={1} className="subDetails">
								<CustomerDetailsView
									{...this.props}
									header="demographic"
									fieldData={demographicInfo}
									enableChangeCustomerData={enableChangeCustomerData}
									editMode={this.state.editMode.includes(
										"demographic"
									)}
									toggleEditMode={this.toggleEditMode}
									onSubmit={this.handleDemographicInfoUpdate}
								>
									{this.state.editMode.includes(
										"demographic"
									) ? (
										<CustomerDetailsForm name="demographic" />
									) : (
										<CustomerSubDetailsView />
									)}
								</CustomerDetailsView>

								<CustomerDetailsView
									{...this.props}
									header="locations"
									fieldData={selectedAddressFields}
									enableChangeCustomerData={enableChangeCustomerData}
									editMode={this.state.editMode.includes(
										"locations"
									)}
									toggleEditMode={this.toggleEditMode}
									onSubmit={this.handleAddressUpdate}
									addressValidationError={
										this.props.addressValidationError
									}
									clearAddressValidationError={
										this.props.clearAddressValidationError
									}
									customHeaderElement={
										<OcSelect
											id="CustomerDetailsView-locations-header-input"
											value={get(
												this,
												"state.selected.id"
											)}
											onChange={this.selectAddress}
										>
											{this.state.addresses &&
												this.state.addresses.map(
													(address, idx) => {
														if (
															alreadyShownAddressRoles[
																address.role
															]
														) {
															return null;
														} else {
															alreadyShownAddressRoles[
																address.role
															] = true;
															return (
																<option
																	key={`address-type-${address}-${idx}`}
																	value={
																		address.id
																	}
																>
																	{
																		address.role
																	}
																</option>
															);
														}
													}
												)}
										</OcSelect>
									}
								>
									{this.state.editMode.includes(
										"locations"
									) ? (
										<CustomerDetailsForm name="locations" />
									) : (
										<CustomerSubDetailsView />
									)}
								</CustomerDetailsView>
								{posShowSummaryData &&
									<CustomerDetailsView
										{...this.props}
										header="relations"
										fieldData={relationsInfo}
										editMode={this.state.editMode.includes(
											"relations"
										)}
										enableChangeCustomerData={enableChangeCustomerData}
										toggleEditMode={this.toggleEditMode}
										onSubmit={this.handleRelationsUpdate}
									>
										{this.state.editMode.includes(
											"relations"
										) ? (
											<CustomerDetailsForm name="relations" />
										) : (
											<CustomerSubDetailsView />
										)}
									</CustomerDetailsView>
								}
							</Flex>

							<Flex flex={1} className="subDetails">
								<CustomerDetailsView
									{...this.props}
									header="preferences"
									fieldData={preferenceInfo}
									editMode={this.state.editMode.includes(
										"preferences"
									)}
									enableChangeCustomerData={enableChangeCustomerData}
									toggleEditMode={this.toggleEditMode}
									onSubmit={this.handlePreferencesUpdate}
								>
									{this.state.editMode.includes(
										"preferences"
									) ? (
										<CustomerDetailsForm name="preferences" />
									) : (
										<CustomerSubDetailsView />
									)}
								</CustomerDetailsView>

								<CustomerDetailsView
									{...this.props}
									header="notificationsAndMarketing"
									editMode={this.state.editMode.includes(
										"notificationsAndMarketing"
									)}
									enableChangeCustomerData={enableChangeCustomerData}
									toggleEditMode={this.toggleEditMode}
									onSubmit={
										this
											.handleNotificationsAndMarketingUpdate
									}
								>
									{this.state.editMode.includes(
										"notificationsAndMarketing"
									) ? (
										<CustomerDetailsNotificationsEdit
											privacySettings={privacySettings}
											privacySettingsKeys={
												this.props.privacySettingsKeys
											}
											name="notificationsAndMarketing"
										/>
									) : (
										<CustomerDetailsNotificationsShow
											privacySettings={privacySettings}
											privacySettingsKeys={
												this.props.privacySettingsKeys
											}
										/>
									)}
								</CustomerDetailsView>
								{posShowSummaryData &&
									<CustomerDetailsLegalDocumentsView
										customer={customer}
									/>
								}
							</Flex>
						</Flex>
						{posShowSummaryData &&
							<div>
								<CustomerDetailsOffersContainer {...this.props} />
							</div>
						}
					</Flex>
					{posShowSummaryData &&
						<Flex
							flex={1}
							style={{
								width: "350px"
							}}
						>
							<CustomerDetailsSidebarView {...this.props} />
						</Flex>
					}
				</Flex>
			</div>
		);
	}
}

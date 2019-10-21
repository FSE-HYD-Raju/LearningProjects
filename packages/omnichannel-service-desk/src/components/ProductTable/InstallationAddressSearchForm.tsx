import {
	cssns,
	withFormal,
	withSchema,
	SchemaItem,
	OcSelect,
	OcInput,
	ContextType,
	contextTypesValidationMap,
	withCustomization,
	POSComponentCustomizationPoints,
	OcButton, OcButtonType,
	PostalAddress,
	AddressValidation,
	City,
	County,
	Street,
	Address,
} from "omnichannel-common-pos";
import { debounce, startCase, toLower } from "lodash";
import { Component } from "react";
const Form = require("react-formal");
const FormalOcInput = withFormal(OcInput);
const FormalOcSelect = withFormal(OcSelect);
import { IndexMessages as messages } from "../../index.messages";
const { React } = cssns("InstallationAddressSearchForm");

type InstallationAddressType = {
	street?: string;
	coAddress?: string;
	postalCode?: string;
	city?: string;
	country?: string;
	county?: string;
	description?: string;
	postOfficeBox?: string;
	stateOrProvince?: string;
	addressRegisterId?: string;
	apartment?: string;
	building?: string;
	selectedCityIdId?: string;
	selectedCounty?: string;
};

interface InstallationAddressSearchFormStateProps {
	addressValidation: AddressValidation;
	schema: SchemaItem;
	installationAddressDisplayFieldsTemplate: any;
	cities: Array<City>;
	counties?: Array<County>;
	streets?: Array<Street>;
	addresses?: Array<Address>;
	streetBlock?: string;
	selectedCityId?: string;
	selectedCounty?: string;
}

interface InstallationAddressSearchFormActionProps {
	actions: {
		validateAddress: (address: PostalAddress) => void;
		getCities: () => void;
		getCounties: (cityId: string) => void;
		getStreets: (cityId: string, county: string) => void;
		getAddresses: (cityId: string, county: string, streetName: string, streetBlock: string) => void;
	};
}

type State = {
	model: Partial<InstallationAddressType>;
	formValid: boolean;
	addressSelected: boolean;
	selectedAddressId: string;
};

type Props = InstallationAddressSearchFormStateProps & InstallationAddressSearchFormActionProps;

const DROPDOWNS_VALUES_DELIMITER = "!@";

class InstallationAddressSearchForm extends Component<Props, State> {
	static displayName = "InstallationAddressSearchForm";
	static contextTypes = contextTypesValidationMap;

	constructor(props: Props, context: ContextType) {
		super(props, context);
		this.state = {
			model: {},
			formValid: false,
			addressSelected: false,
			selectedAddressId: ""
		};
	}

	componentDidMount() {
		this.props.actions.getCities();
	}

	handleSearch = () => {
		this.props.actions.validateAddress({ addressRegisterId : this.state.selectedAddressId});
	}

	getCounties = (cityDetails: string) => {
		this.setState({ addressSelected: false });
		const cityDetail = cityDetails.split(DROPDOWNS_VALUES_DELIMITER);
		const cityId = cityDetail[0];
		this.props.actions.getCounties(cityId);
	 }

	 getStreets = (county: string) => {
		const { selectedCityId, actions } = this.props;
		this.setState({ addressSelected: false });
		if (selectedCityId) {
			actions.getStreets(selectedCityId, county);
		}
	}

	getAddresses = (streetDetails: string) => {
		const { selectedCityId,
				selectedCounty,
				actions
		} = this.props;
		const streetDetail = streetDetails.split(DROPDOWNS_VALUES_DELIMITER);
		const streetName = streetDetail[0];
		const streetBlock = streetDetail[1];
		this.setState({addressSelected: false });
		if (selectedCityId && selectedCounty) {
			actions.getAddresses(selectedCityId, selectedCounty, streetName, streetBlock);
		}
	}

	selectAddress = (selectedAddressId: string) => {
		this.setState({addressSelected: true, selectedAddressId});
	}

	renderField(field: string) {
		return (
			<div>
				{
					(() => {
						switch (field) {
							case "country":
								return this.renderCountryField();
							case "stateOrProvince":
								return this.renderStateOrProvinceField();
							case "city":
								return this.renderCityField();
							case "county":
								return this.renderCountyField();
							case "street":
								return this.renderStreetField();
							case "building":
								return this.renderBuildingField();
							case "apartment":
								return this.renderApartmentField();
							case "postOfficeBox":
								return this.renderPostOfficeBoxField();
							case "postalCode":
								return this.renderPostalCodeField();
							case "addressRegisterId":
								return this.renderAddressRegisterIdField();
							case "coAddress":
								return this.renderCOAddressField();
							case "description":
								return this.renderDescriptionField();
							default:
								return;
						}
					})()
				}
			</div>
		);
	}

	renderFields() {
		const { schema: { fields } } = this.props;
		return(
			<div>
				<div className="container">
					{Object.keys(fields).map((field: string) =>
					<div className="item">
						{
							this.renderField(field)
						}
					</div>)}
				</div>
				<div className="form-row">
					<div className="col-sm-12">
						<OcButton
							className="validateStreetAddressButton"
							onClick={this.handleSearch}
							buttonType={OcButtonType.PRIMARY}
							disabled={!this.state.formValid || !this.state.addressSelected }>
							{this.context.intl.formatMessage(messages.search)}
						</OcButton>
					</div>
				</div>
			</div>
		);
	}

	renderStreetField() {
		const { streets } = this.props;
		return (
			<Form.Field
				id="ia-search-form-street-field"
				name="street"
				type={FormalOcSelect}
				placeholder={this.context.intl.formatMessage({
					...messages.iaSearchFormStreet})}
				onChange={(event: string) => this.getAddresses(event)}
				hidePlaceholderOption={true}
			>
				<option
					key="search-form-street-option"
					value=""
					id="search-form-street-option"
				>
					{this.context.intl.formatMessage({ ...messages.selectStreet })}
				</option>
				{streets && streets.map((street, idx) => {
					return (
						<option key={`name${idx}`} value={street.street_name + DROPDOWNS_VALUES_DELIMITER + street.block} id={`select-${idx}`}>
							{`${street.street_name}, BLOK ${street.block}`}
						</option>
					);
				})}
			</Form.Field>
		);
	}

	renderCOAddressField() {
		return (
			<Form.Field
				id="ia-search-form-address-field"
				name="coAddress"
				type={FormalOcInput}
				placeholder={this.context.intl.formatMessage({
					...messages.iaSearchFormCOAddress
				})}
				events={["onBlur"]}
			/>
		);
	}

	renderPostalCodeField() {
		return (
			<Form.Field
				id="ia-search-form-postal-code-field"
				name="postalCode"
				type={FormalOcInput}
				placeholder={this.context.intl.formatMessage({
					...messages.iaSearchFormPostalCode
				})}
				events={["onBlur"]}
			/>
		);
	}

	renderCityField() {
		const { cities } = this.props;
		return (
			<Form.Field
				id="ia-search-form-city-field"
				name="city"
				type={FormalOcSelect}
				placeholder={this.context.intl.formatMessage({
					...messages.iaSearchFormCity
				})}
				hidePlaceholderOption={true}
				onChange={(cityId: string) => this.getCounties(cityId)}
			>
				<option
					key="search-form-city-option"
					value=""
					id="search-form-city-option"
				>
					{this.context.intl.formatMessage({ ...messages.selectCity })}
				</option>
				{cities && cities.map((city, idx) => {
					return (
						<option key={`name${idx}`} value={city.id + DROPDOWNS_VALUES_DELIMITER + city.name} id={`select-${idx}`}>
							{city.name}
						</option>
					);
				})}
			</Form.Field>
		);
	}

	renderCountryField() {
		return (
			<Form.Field
				id="ia-search-form-country-field"
				name="country"
				type={FormalOcInput}
				placeholder={this.context.intl.formatMessage({
					...messages.iaSearchFormCountry
				})}
				events={["onBlur"]}
			/>
		);
	}

	renderCountyField() {
		const { counties } = this.props;
		return (
			<Form.Field
				id="ia-search-form-county-field"
				name="county"
				type={FormalOcSelect}
				placeholder={this.context.intl.formatMessage({
					...messages.iaSearchFormCounty
				})}
				hidePlaceholderOption={true}
				onChange={(county: string) => this.getStreets(county)}
			>
				<option
					key="search-county-option"
					value=""
					id="search-form-county-option"
				>
					{this.context.intl.formatMessage({ ...messages.selectCounty })}
				</option>
			{counties && counties.map((county, idx) => {
				return (
					<option key={`name${idx}`} value={county.cluster_name} id={`select-${idx}`}>
						{county.cluster_name}
					</option>
				);
			})
			}
			</Form.Field>
		);
	}

	renderDescriptionField() {
		return (
			<Form.Field
				id="ia-search-form-description-field"
				name="description"
				type={FormalOcInput}
				placeholder={this.context.intl.formatMessage({
					...messages.iaSearchFormDescription
				})}
				events={["onBlur"]}
			/>
		);
	}

	renderPostOfficeBoxField() {
		return (
			<Form.Field
				id="ia-search-form-post-office-box-field"
				name="postOfficeBox"
				type={FormalOcInput}
				placeholder={this.context.intl.formatMessage({
					...messages.iaSearchFormPostOfficeBox
				})}
				events={["onBlur"]}
			/>
		);
	}

	renderStateOrProvinceField() {
		return (
			<Form.Field
				id="ia-search-form-state-or-province-field"
				name="stateOrProvince"
				type={FormalOcInput}
				placeholder={this.context.intl.formatMessage({
					...messages.iaSearchFormStateOrProvince
				})}
				events={["onBlur"]}
			/>
		);
	}

	renderAddressRegisterIdField() {
		return (
			<Form.Field
				id="ia-search-form-address-register-id-field"
				name="addressRegisterId"
				type={FormalOcInput}
				placeholder={this.context.intl.formatMessage({
					...messages.iaSearchFormAddressRegisterId
				})}
				events={["onBlur"]}
			/>
		);
	}

	renderApartmentField() {
		return (
			<Form.Field
				id="ia-search-form-apartment-field"
				name="apartment"
				type={FormalOcInput}
				placeholder={this.context.intl.formatMessage({
					...messages.iaSearchFormApartment
				})}
				events={["onBlur"]}
			/>
		);
	}

	renderBuildingField() {
		const { addresses, streetBlock } = this.props;
		return (
			<Form.Field
				id="ia-search-form-building-field"
				name="building"
				type={FormalOcSelect}
				placeholder={this.context.intl.formatMessage({
					...messages.iaSearchFormBuilding
				})}
				hidePlaceholderOption={true}
				onChange={(id:string) => this.selectAddress(id)}
			>
				<option
					key="search-building-option"
					value=""
					id="search-form-building-option"
				>
					{this.context.intl.formatMessage({ ...messages.selectAddress })}
				</option>

				{addresses && addresses.map((address, idx) => {
					return (
						<option key={`name${idx}`} value={address.id} id={`select-${idx}`}>
							{`${address.house_number} (RW ${address.rw}, RT ${address.rt})`}
						</option>
					);
				})}
			</Form.Field>
		);
	}

	renderAddressSearchResult() {
		const { addressValidation: { address }, installationAddressDisplayFieldsTemplate } = this.props;
		const displayFields = address &&  Object.keys(address) || [];
		const filteredDisplayFieldsRegExPattern = new RegExp(RegExp(displayFields.join("|"), "gi"));
		const installationAddressDisplayFieldsTemplateWithValues =
			installationAddressDisplayFieldsTemplate.replace(filteredDisplayFieldsRegExPattern, (matched: string) => {
				return address && address[matched] ?
				`${startCase(toLower(address[matched]))},` : "";
			  }).replace(/,([^,]*)$/, "$1");
		return (
			<div dangerouslySetInnerHTML = {{ __html: installationAddressDisplayFieldsTemplateWithValues }}/>
		);
	}

	renderResult() {
		const { addressValidation: { status } } = this.props;
		return (
			<div className="form-row search-results">
				<div className="col-sm-12">
					{
						(() => {
							switch (status) {
								case "NOT_VALIDATED":
									return <div>{ this.context.intl.formatMessage({ ...messages.iaSearchFormValidateAddress }) }</div>;
								case "VALIDATION_FAIL":
									return <div>{ this.context.intl.formatMessage({ ...messages.iaSearchFormAddressInvalid }) }</div>;
								case "ADDRESS_NOT_FOUND":
									return <div>{this.context.intl.formatMessage({ ...messages.iaSearchFormAddressNotFound }) }</div>;
								case "ADDRESS_FOUND":
									return this.renderAddressSearchResult();
								default:
									return;
							}
						})()
					}
				</div>
			</div>
		);
	}

	validateModel = (model: Partial<InstallationAddressType>) => {
		this.props.schema
			.validate(model)
			.then(() => {
				this.setState({ formValid: true });
			})
			.catch(() => {
				this.setState({ formValid: false });
			});
	};

	debouncedValidateModel = debounce(this.validateModel, 850);

	handleInputChange = (model: Partial<InstallationAddressType>): void => {
		this.setState({ model });
	};

	handleOnBlur = (model: Partial<InstallationAddressType>): void => {
		this.debouncedValidateModel(model);
	};

	render() {
		const model = this.state.model || ({} as Partial<InstallationAddressType>);
		return (
			<div>
				<div className="form-container">
					<Form
						schema={this.props.schema}
						debug={true}
						onChange={this.handleInputChange}
						onBlur={this.handleOnBlur(model)}
						value={model}
					>
						{this.renderFields()}
					</Form>
				</div>
				<div>
					{this.renderResult()}
				</div>
			</div>
		);
	}
}

export default withCustomization<Props>(
	POSComponentCustomizationPoints.INSTALLATION_ADDRESS_SEARCH_FORM,
	withSchema(["InstallationAddressSearchForm"]
)(InstallationAddressSearchForm));

export {
	InstallationAddressType,
	AddressValidation,
	InstallationAddressSearchFormStateProps,
	InstallationAddressSearchFormActionProps,
	State,
	Props,
	InstallationAddressSearchForm
};
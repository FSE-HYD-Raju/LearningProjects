import { FC } from "react";
import cssns from "../../../utils/cssnsConfig";
import withFormal from "../../ocComponents/withFormal";
import OcSelectCountry from "../../ocComponents/OcSelectCountry";
import OcInput from "../../ocComponents/OcInput";
const withSchema = require("../../../schemas/withSchema");
import OcLoadingSpinner from "../../ocComponents/OcLoadingSpinner";
import countryMessages from "../../../country.messages";
import { Country, SchemaItem } from "../../../redux/types";
import { ContextType, contextTypesValidationMap } from "../../../types";
import FormattedMessage from "../../../channelUtils/FormattedMessage";
import classnames from "classnames";
import { B2CComponentCustomizationPoints, withCustomization } from "../../../customization";
import { OcButton, OcButtonType } from "../../ocComponents";

const { React } = cssns("PersonDetailsPostalAddressForm");
const types = require("react-formal-inputs");
const Form = require("react-formal");
Form.addInputTypes(types);
const FormalOcInput = withFormal(OcInput);
const FormalSelectCountry = withFormal(OcSelectCountry);

const messages = {
	formStreetAddress: {
		id: "b2c-form-street-address",
		description: "checkout, details, title before address inputs",
		defaultMessage: "Street address"
	},
	formCoStreetAddress: {
		id: "b2c-form-co-street-address",
		description: "checkout, details, title before co address inputs",
		defaultMessage: "Co address"
	},
	formPostalCode: {
		id: "b2c-form-postalcode",
		description: "checkout, details, placeholder for postal code input",
		defaultMessage: "Postal code"
	},
	formCity: {
		id: "b2c-form-city",
		description: "checkout, details, placeholder for city input",
		defaultMessage: "City"
	},
	formCountryLabel: {
		id: "b2c-form-country-label",
		description: "checkout, details, placeholder for country input floating label",
		defaultMessage: "Country"
	},
	formCountryDefault: {
		id: "b2c-form-country-default",
		description: "checkout, details, placeholder for country input floating default value",
		defaultMessage: "Please select country"
	},
	formStateOrProvinceAddress: {
		id: "b2c-form-state-or-province-default",
		description: "checkout, details, placeholder for state/province input floating default value",
		defaultMessage: "State or province"
	},
	addressCity: {
		id: "b2c-address-city",
		description: "Address city",
		defaultMessage: "City"
	},
	addressCountry: {
		id: "b2c-address-country",
		description: "Address country",
		defaultMessage: "Country"
	},
	pickCountry: {
		id: "b2c-pick-country",
		description: "Used with selectCountry component.",
		defaultMessage: "Pick your country"
	},
	checkoutStepDeliveryNewAddressButtonLabel: {
		id: "add-delivery-address-confirm-button-label",
		description: "Save delivery address button text",
		defaultMessage: "Save address"
	},
	formCountyAddress: {
		id: "b2c-address-county",
		description: "Address county",
		defaultMessage: "County"
	}
};

interface PersonDetailsPostalAddressFormProps {
	countries: Array<Country>;
	model: any;
	handleSubmit: (e: any) => void;
	handleInputChange: (e: any) => void;
	schema: SchemaItem;
	enableSaveButton?: boolean;
	showSaveButton?: boolean;
	loading: boolean;
	groupFields?: boolean;
	displayExtendedAddressForm?: boolean;
	cityFirst?: boolean;
}

const PersonDetailsPostalAddressForm: FC<PersonDetailsPostalAddressFormProps> = (props: PersonDetailsPostalAddressFormProps, context: ContextType) => {
	const { formatMessage } = context.intl;

	const countries = props.countries ? props.countries.map(country => {
		const countryName = (countryMessages as any)[`countryName${country.code}`];
		const formattedMessage = !!countryName && formatMessage(countryName);
		return {
			code: country.code,
			locale: country.locale,
			name: formattedMessage || country.name
		};
	}) : [];

	const renderCommonInputField = ({id, name, placeholder, required}:
			{ id: string; name: string; placeholder: any; required?: boolean}) => {
		return (
			<Form.Field
				id={`PersonDetailsForm-${id}-field`}
				name={name}
				type={FormalOcInput}
				placeholder={placeholder}
				required={Boolean(required)}
			/>
		);
	};

	const cityField = (
		<Form.Field
			id="PersonDetailsPostalAddressForm-postalAddress-city-field"
			name="city"
			className="city-input"
			type={FormalOcInput}
			placeholder={formatMessage(messages.formCity)}
			required={true}
		/>
	);
	const postalCodeField = (
		<Form.Field
			id="PersonDetailsPostalAddressForm-postalAddress-postalCode-field"
			name="postalCode"
			type={FormalOcInput}
			placeholder={formatMessage(messages.formPostalCode)}
			required={true}
		/>
	);

	const groupedFields = props.groupFields ? (
		<div className="form-row">
			<div className="city-container col-sm-6">{cityField}</div>
			<div className="postalcode-container col-sm-6">{postalCodeField}</div>
		</div>
	) : (
			[cityField, postalCodeField]
		);

	const formClassNames = classnames({
		form: true,
		OrderNewSimAddressForm: !props.groupFields
	});

	return (
		<Form
			schema={props.schema}
			onChange={props.handleInputChange}
			value={props.model}
			onSubmit={props.handleSubmit}
			className={formClassNames}
		>
			<div className="fields">
				{props.cityFirst && groupedFields}
				<Form.Field
					id="PersonDetailsPostalAddressForm-postalAddress-country-field"
					name="country"
					type={FormalSelectCountry}
					required={true}
					label={formatMessage(messages.addressCountry)}
					labelPosition="left"
					placeholder={formatMessage(messages.pickCountry)}
					countries={countries}
					defaultValue=""
				/>
				{props.displayExtendedAddressForm && <Form.Field
						id="PersonDetailsForm-postalAddress-province-field"
						name="stateOrProvince"
						className="province-input"
						type={FormalOcInput}
						placeholder={formatMessage(messages.formStateOrProvinceAddress)}
						required={false}
					/>
				}
				{!props.cityFirst && groupedFields}
				<Form.Field
					id={"PersonDetailsPostalAddressForm-street-field"}
					name="street"
					type={FormalOcInput}
					placeholder={formatMessage(messages.formStreetAddress)}
					required={true}
				/>
				<Form.Field
					id={"PersonDetailsPostalAddressForm-coAddress-field"}
					name="coAddress"
					type={FormalOcInput}
					placeholder={formatMessage(messages.formCoStreetAddress)}
					required={false}
				/>
				{props.displayExtendedAddressForm &&
					<>
					{renderCommonInputField({
						id: "postalAddress-county",
						name: "county",
						placeholder: formatMessage({
							...messages.formCountyAddress
						})
					})}
					</>
				}
			</div>
			{props.showSaveButton && <div className="submit-wrapper">
				<OcButton
					buttonType={OcButtonType.PRIMARY}
					outline={true}
					id="add-delivery-address-submit-button"
					className="submit"
					htmlBtnType="submit"
					disabled={!props.enableSaveButton}
				>
					<FormattedMessage {...messages.checkoutStepDeliveryNewAddressButtonLabel} />
				</OcButton>
				<OcLoadingSpinner loading={props.loading} />
			</div>
			}
		</Form>
	);
};

PersonDetailsPostalAddressForm.contextTypes = contextTypesValidationMap;
PersonDetailsPostalAddressForm.defaultProps = {
	groupFields: false
};

/* FYI wrapping the class with withSchema("postalAddress") causes problems. */
export default withCustomization(
	B2CComponentCustomizationPoints.PERSON_DETAILS_POSTAL_ADDRESS_FORM,
	PersonDetailsPostalAddressForm
);

export {
	PersonDetailsPostalAddressFormProps
};

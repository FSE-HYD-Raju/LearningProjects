import PropTypes from "prop-types";
import Form from "react-formal";
import {
	withFormal,
	cssns,
	Flex,
	contextTypesValidationMap,
	OcDatePicker,
	LanguagesUtil,
	FormattedMessage,
	OcSelect,
	OcTextInput, OcButton, OcButtonType,
} from "omnichannel-common-pos";
import messages from "../../index.messages";
import customerMessages from "./Customer.messages";
import moment from "moment";
import { DELETE_DATA_OPTION } from "./CustomerDetailsMainView";

const { React } = cssns("CustomerDetailsView");
const momentLocalizer = require("react-widgets/lib/localizers/moment");
momentLocalizer(moment);

const FormalInput = withFormal(OcTextInput);
const FormalSelect = withFormal(OcSelect);
const uniqueLanguageCodes = LanguagesUtil.uniqueLanguageCodes;


const getInputType = field => {
	if (field.type === "select") {
		return FormalSelect;
	}
	return FormalInput;
};

const CustomerDetailsForm = (props, context) => {
	const handleSubmit = model => {
		props.modelSchema
			.validate(model)
			.then(validModel => {
				console.log("VALID MODEL::", validModel);
				try {
					props.onSubmit(validModel);
				} catch (e) {
					/* without this try-catch an error in props.onSubmit() is catched in the .catch() below,
					 * which would be disinformational.
					 */
					console.error(e);
				}
			})
			.catch(err => {
				console.log("INVALID MODEL::", err);
			});
	};

	const { formatMessage } = context.intl;

	const renderOption = (option, idx) => {
		return (
			<option
				key={`option_${idx}`}
				value={option.code || option}
				id={`CustomerDetailsDemographicInfoEdit-option-${option.code}`}
			>
				{option.name || option}
			</option>
		);
	};

	const renderHiddenOption = (option, idx) => {
		return (<option
			key={`option_${idx}`}
			value="not_defined"
			id="CustomerDetailsDemographicInfoEdit-option-not-defined"
			hidden={true}
		>
			{ formatMessage(messages.notDefined) }
		</option>);
	};

	const renderOptions = field => {
		if (field.fieldName === "language") {
			return uniqueLanguageCodes(field.options).map((option, idx) => {
				if((option.code || option) === DELETE_DATA_OPTION) {
					return renderHiddenOption(option, idx);
				} else {
					return renderOption(option, idx);
				}
			});
		} else {
			return (
				field.options &&
				field.options.map((option, idx) => {
					return renderOption(option, idx);
				})
			);
		}
	};
	return (
		<div>
			<Form
				schema={props.modelSchema}
				defaultValue={props.model}
				onSubmit={handleSubmit}
			>
				{props.fields.map((field, idx) => {
					const inputType = getInputType(field);

					return (
						<Flex
							key={`${field.fieldName}-${idx}`}
							style={{ marginBottom: "2px", height: "50px" }}
							alignItems="center"
						>
							{field.type === "date" ? (
								<Form.Field
									id={`CustomerDetailsForm-datepicker-${field.fieldName}`}
									required={field.required}
									name={field.fieldName}
									max={new Date()}
									placeholder={
										!field.value ? (
											formatMessage(messages.chooseADate)
										) : (
											moment(field.value).format("LL")
										)
									}
									label={formatMessage({
										...messages[field.fieldName]
									})}
									labelPosition="left"
									labelWidth="124px"
									type={OcDatePicker}
									format="LL"
									editFormat="LL"
									withClock={false}
									dropUp={false}
									events={["onSubmit"]}
								/>
							) : (
								<Form.Field
									id={
										field.type === "select" ? (
											`CustomerDetailsForm-select-${field.fieldName}`
										) : (
											`CustomerDetailsForm-input-${field.fieldName}`
										)
									}
									required={field.required}
									name={field.fieldName}
									label={
										<FormattedMessage
											{...messages[field.fieldName]}
										/>
									}
									labelPosition="left"
									labelWidth="124px"
									type={inputType}
									events={["onBlur", "onChange", "onSubmit"]}
								>
									{renderOptions(field)}
								</Form.Field>
							)}
						</Flex>
					);
				})}

				<Flex
					justifyContent="end"
					alignItems="center"
					className="action-buttons"
				>
					{props.updatingUser && (
						<i
							className="fa fa-spin fa-circle-o-notch"
							style={{
								fontSize: "16px",
								marginRight: "8px",
								color: "#aaa"
							}}
						/>
					)}

					<Form.Button type="submit" component="div">
						<OcButton
							id={`CustomerDetailsForm-submit-${props.name}`}
							htmlBtnType="submit"
							buttonType={OcButtonType.SUCCESS}
							disabled={props.updatingUser}
						>
							<FormattedMessage {...customerMessages.formSaveButton} />
						</OcButton>
					</Form.Button>
				</Flex>
			</Form>
		</div>
	);
};

CustomerDetailsForm.propTypes = {
	modelSchema: PropTypes.object,
	model: PropTypes.object,
	onSubmit: PropTypes.func,
	onChange: PropTypes.func,
	onCancel: PropTypes.func,
	fields: PropTypes.array,
	name: PropTypes.string,
	updatingUser: PropTypes.bool
};

CustomerDetailsForm.contextTypes = contextTypesValidationMap;

export default CustomerDetailsForm;

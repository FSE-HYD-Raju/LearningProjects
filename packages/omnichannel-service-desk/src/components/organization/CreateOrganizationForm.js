import React, { Component } from "react";
import PropTypes from "prop-types";
import {
	withFormal,
	withSchema,
	contextTypesValidationMap,
	FormattedMessage,
	OcSelect,
	OcTextInput, OcButton, OcButtonType,
	DateUtil,
} from "omnichannel-common-pos";
import messages from "../../index.messages";
import organizationMessages from "./Organization.messages";
import Form from "react-formal";

const FormalInput = withFormal(OcTextInput);
const FormalSelect = withFormal(OcSelect);

@withSchema(["createOrganizationForm"])
class CreateOrganizationForm extends Component {
	static propTypes = {
		schema: PropTypes.object,
		onBlur: PropTypes.func,
		actions: PropTypes.object,
		submitButton: PropTypes.func,
		createCustomer: PropTypes.func,
		organizationIdentification: PropTypes.array,
		locale: PropTypes.string
	};
	static contextTypes = contextTypesValidationMap;

	constructor(props, context) {
		super(props, context);
		this.state = {
			validationErrors: []
		};
	}

	render() {
		const { formatMessage } = this.context.intl;
		const { schema, onBlur } = this.props;

		const validationErrorsObject = {};
		this.state.validationErrors.forEach(e => {
			validationErrorsObject[e.path] = [
				e.message,
				{
					message: e.message,
					type: e.type
				}
			];
		});

		const identificationTypes = this.props.organizationIdentification || [];

		const handleSubmit = model => {
			this.props.schema
				.validate(model, { abortEarly: false })
				.then(valid => {
					const payload = {
						type: "organizations",
						attributes: {
							characteristics: {},
							formattedName: valid.companyName,
							isLegalEntity: true,
							tradingName: valid.companyName,
							privacySettings: {},
							validFor: {
								startDate: DateUtil.dateWithTimezoneOffset(new Date()),
							},
							identification: {
								identificationId: valid.idNumber,
								type: valid.idType
							}
						}
					};
					this.props.actions.createOrganization &&
						this.props.actions.createOrganization(payload);
				})
				.catch(error => {
					const { validationErrors } = this.state;

					validationErrors &&
						this.setState({
							validationErrors: this.state.validationErrors.concat(
								error.inner
							)
						});
				});
		};

		const handleOnFocus = event => {
			const fieldName = event.target.name;
			const { validationErrors } = this.state;

			validationErrors &&
				this.setState({
					validationErrors: validationErrors.filter(
						e => e.path !== fieldName
					)
				});
		};

		const handleOnBlur = event => {
			const fieldName = event.target.name;
			const { value } = event.target;

			if (!fieldName) {
				return;
			}

			this.props.schema.fields[fieldName]
				.validate(value, { abortEarly: true })
				.then(value => {
					onBlur && onBlur({ [fieldName]: value });
				})
				.catch(err => {
					if (!err.path) {
						err.path = fieldName;
					}

					this.setState({
						validationErrors: this.state.validationErrors.concat(
							err
						)
					});
				});
		};

		return (
			<Form
				className="CreateOrganizationForm"
				schema={schema}
				onFocus={handleOnFocus}
				onBlur={handleOnBlur}
				onSubmit={handleSubmit}
			>
				<div className="fieldsets">
					<fieldset>
						<div className="createOrganizationFormInputContainer">
							<div className="createOrganizationFormInput">
								<Form.Field
									name="idType"
									id="inputIdTypeIntoCreateOrganizationForm"
									type={FormalSelect}
									label={formatMessage(messages.idType)}
									required={true}
									errorMessage={
										validationErrorsObject.idType &&
										validationErrorsObject.idType[0]
									}
								>
									<option
										key={`identifications_0`}
										value=""
										id={`CustomerDataForm-gender-option-empty`}
									>
										{formatMessage(messages.choose)}
									</option>

									{identificationTypes.map(
										(identification, idx) => {
											return (
												<option
													key={`identification_${idx}`}
													value={identification.backendValue}
													id={`CreateorganizationForm-identification-option-${identification.backendValue}`}
												>
													{identification.localisation[this.props.locale] && identification.localisation[this.props.locale]}
												</option>
											);
										}
									)}
								</Form.Field>
							</div>
							<div className="createOrganizationFormInput">
								<Form.Field
									name="idNumber"
									id="inputIdNumberIntoCreateOrganizationForm"
									type={FormalInput}
									label={formatMessage(messages.idNumber)}
									required={true}
									errorMessage={
										validationErrorsObject.idNumber &&
										validationErrorsObject.idNumber[0]
									}
								/>
							</div>
							<div className="createOrganizationFormInput">
								<Form.Field
									name="companyName"
									id="inputCompanyNameIntoCreateOrganizationForm"
									type={FormalInput}
									label={formatMessage(messages.companyName)}
									required={true}
									errorMessage={
										validationErrorsObject.companyName &&
										validationErrorsObject.companyName[0]
									}
								/>
							</div>
						</div>
					</fieldset>
				</div>

				<footer className="customerDataFormFooter modal-footer">
					<Form.Button
						id="CustomerDataForm-continue-button"
						component="div"
						type="submit"
					>
						{this.props.submitButton ? (
							this.props.submitButton
						) : (
							<OcButton
								id="submitCustomerDataForm"
								buttonType={OcButtonType.PRIMARY}
							>
								{this.props.createCustomer ? (
									<FormattedMessage {...organizationMessages.organizationCreateCustomer} />
								) : (
									<FormattedMessage {...messages.create} />
								)}
							</OcButton>
						)}
					</Form.Button>
				</footer>
			</Form>
		);
	}
}

export default CreateOrganizationForm;

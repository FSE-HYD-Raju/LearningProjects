import messages from "../../index.messages";
import { reduce, pick } from "lodash";
import {
	cssns,
	Flex,
	AddressValidationHandlerContainer,
	contextTypesValidationMap,
	FormattedMessage,
} from "omnichannel-common-pos";
import moment from "moment";
import { Component } from "react";
import yup from "yup";
import PropTypes from "prop-types";
const momentLocalizer = require("react-widgets/lib/localizers/moment");
momentLocalizer(moment);
const { React } = cssns("CustomerDetailsView");

export default class CustomerDetailsView extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			modelForAddressValidation: this.reduceModel(this.props.fieldData)
		};
	}
	static contextTypes = contextTypesValidationMap;
	static propTypes = {
		fieldData: PropTypes.array,
		editMode: PropTypes.bool,
		updatingUser: PropTypes.bool,
		onSubmit: PropTypes.func,
		children: PropTypes.node,
		toggleEditMode: PropTypes.func,
		header: PropTypes.string,
		UserStore: PropTypes.object,
		customHeaderElement: PropTypes.node,
		addressValidationError: PropTypes.object,
		clearAddressValidationError: PropTypes.func,
		enableChangeCustomerData: PropTypes.bool
	};

	reduceModel(infoArray) {
		const model = reduce(
			infoArray,
			(result, field) => {
				if (field.type === "date") {
					result[field.fieldName] = null;

					if (field.value) {
						const valueMoment = moment(field.value);
						if (valueMoment.isValid()) {
							result[field.fieldName] = new Date(
								valueMoment.format()
							);
						}
					}
				} else {
					result[field.fieldName] = field.value;
				}
				return result;
			},
			{}
		);
		return model;
	}

	reduceSchema(infoArray) {
		const schema = reduce(
			infoArray,
			(result, field) => {
				const intlFormat = this.context.intl.formatMessage;

				if (field.type === "date") {
					result[field.fieldName] = yup.date();
					if (field.fieldName === "birthDay") {
						result[field.fieldName] = yup
							.date()
							.nullable(true)
							.max(
								new Date(),
								intlFormat(messages.dateOfBirthInFuture)
							);
					}
				} else {
					result[field.fieldName] = yup.string().trim();
				}

				if (field.fieldName === "language") {
					result[field.fieldName] = yup.string().nullable(true);
				}

				if (field.required) {
					const messageId = `${field.fieldName}Required`;
					const requiredMessage = intlFormat(messages[messageId]);
					result[field.fieldName] = result[field.fieldName].required(
						requiredMessage
					);
				}

				if (field.regex) {
					const messageId = `${field.fieldName}Regex`;
					const phoneInvalidMessage = intlFormat(messages[messageId]);
					result[field.fieldName] = result[field.fieldName].matches(
						new RegExp(field.regex),
						phoneInvalidMessage
					);
				}

				return result;
			},
			{}
		);
		return yup.object(schema);
	}

	editModeOn = () => {
		this.props.toggleEditMode(this.props.header);
	};

	editModeOff = () => {
		this.props.toggleEditMode("none");
	};

	handleSubmit = (modelForAddressValidation, forceUpdateAddress) => {
		if (this.props.onSubmit) {
			this.props.onSubmit(modelForAddressValidation, forceUpdateAddress);
			this.props.clearAddressValidationError();
			this.setState({ modelForAddressValidation });
		}
	};

	proposalSelected = (address, forceUpdateAddress) => {
		const model = this.reduceModel(this.props.fieldData);
		const _address = pick(address, [
			"city",
			"country",
			"postalCode",
			"street"
		]);
		const _model = Object.assign({}, model, _address);
		this.handleSubmit(_model, forceUpdateAddress);
	};

	render() {
		const schema = this.reduceSchema(this.props.fieldData);
		const model = this.reduceModel(this.props.fieldData);
		const { modelForAddressValidation } = this.state;

		return (
			<div style={{ width: "100%", maxWidth: "340px" }}>
				{this.props.header && (
					<Flex direction="row" alignItems="center">
						{this.props.header === "locations" &&
						this.props.addressValidationError && (
							<AddressValidationHandlerContainer
								addressValidationError={
									this.props.addressValidationError
								}
								model={modelForAddressValidation}
								proposalSelected={(model, forceUpdateAddress) =>
									this.proposalSelected(
										model,
										forceUpdateAddress
									)}
								cancel={() =>
									this.props.clearAddressValidationError()}
								parentSubmit={(model, forceUpdateAddress) =>
									this.handleSubmit(
										model,
										forceUpdateAddress
									)}
							/>
						)}
						<h5>
							<FormattedMessage
								{...messages[this.props.header]}
							/>
							<span
								style={{
									marginLeft: "10px",
									color: "#337ab7",
									cursor: "pointer"
								}}
							>
								{(!this.props.editMode && this.props.enableChangeCustomerData) && (
									<span
										id={`CustomerDetailsView-edit-button-${this
											.props.header}`}
										onClick={this.editModeOn}
										style={{ fontSize: "13px" }}
									>
										<i className="fa fa-pencil-alt btn-icon-left" />
										<FormattedMessage {...messages.edit} />
									</span>
								)}

								{this.props.editMode && (
									<span
										id={`CustomerDetailsView-cancel-button-${this
											.props.header}`}
										onClick={this.editModeOff}
										style={{ fontSize: "13px" }}
									>
										<i className="fa fa-times btn-icon-left" />
										<FormattedMessage
											{...messages.cancel}
										/>
									</span>
								)}
							</span>
						</h5>
						{this.props.customHeaderElement && (
							<div style={{ marginLeft: "10px" }}>
								{this.props.customHeaderElement}
							</div>
						)}
					</Flex>
				)}

				{!this.props.editMode &&
					this.props.children &&
					React.Children.map(this.props.children, child =>
						React.cloneElement(child, {
							fields: this.props.fieldData
						})
					)}
				{/*<CustomerSubDetailsView fields={this.props.fieldData} />*/}

				{this.props.editMode &&
					this.props.children &&
					React.Children.map(this.props.children, child =>
						React.cloneElement(child, {
							modelSchema: schema,
							model,
							fields: this.props.fieldData,
							onSubmit: this.handleSubmit,
							updatingUser: this.props.updatingUser
						})
					)}

				{/*this.props.editMode &&
					<CustomerDetailsForm
						modelSchema={schema}
						model={model}
						fields={this.props.fieldData}
						onSubmit={this.props.onSubmit}
						updatingUser={_.get(this.props, 'UserStore.updatingUser')}
					/>
				*/}
			</div>
		);
	}
}

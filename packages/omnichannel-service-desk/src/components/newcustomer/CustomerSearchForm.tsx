import * as React from "react";
import { Component } from "react";
import { get, includes, isEmpty } from "lodash";
import { withSchema } from "omnichannel-common-pos";
import CustomerDataFormContainer from "../CustomerDataFormContainer";
import { Schema } from "yup";

interface CustomerSearchFormStateProps {
	schema?: Schema<any> & { fields: Array<any> };
	displayOptions: {
		organizationIdentification: object;
		identification: Array<any>;
		customerDataForm: any;
	};
	matchForIdTypeAndNumber: Array<any>;
	customerIdValidationStatus: boolean;
	customerIdentificationValidationEnabled: any;
	additionalFields: any;
	customerToCreate: any;
}

interface CustomerSearchFormActionProps {
	actions: {
		searchCustomers: (firstName: string, lastName: string) => void;
		saveSearchTerms: (model: any) => void;
		validateIdentification: (idType: string, idNumber: number, familyName: string) => void;
		searchCustomerWithSingleTerm: (idNumber: string, idType: string) => void;
	};
}

interface CustomerSearchFormState {
	model: any;
	validationErrors: Array<any>;
}

type CustomerSearchFormProps = CustomerSearchFormStateProps & CustomerSearchFormActionProps;

class CustomerSearchForm extends Component<CustomerSearchFormProps, CustomerSearchFormState> {
	static displayName = "CustomerSearchForm";

	constructor(props: CustomerSearchFormProps) {
		super(props);

		this.state = {
			model: props.customerToCreate || {},
			validationErrors: []
		};
	}

	doSearch = (model: any) => {
		const { schema,
				displayOptions,
				matchForIdTypeAndNumber,
				customerIdValidationStatus,
				customerIdentificationValidationEnabled,
				actions
			  } = this.props;
		setTimeout(() => {
			if (schema) {
				schema.isValid(model).then((valid: any) => {
					if (valid) {
						const firstName = get(model, "firstName");
						const lastName = get(model, "lastName");

						const identificationType = get(model, "identificationType");
						const identificationNumber = get(model, "identificationId");

						const identifications = displayOptions.identification || [];
						const matchingIdentificationType = identifications.find((identificationTypeObject: any) => {
							const match = includes(identificationTypeObject.localisation, identificationType);
							return match;
						});
						const identificationTypeBackendValue = matchingIdentificationType.backendValue;
						actions.searchCustomers(firstName, lastName);
						actions.searchCustomerWithSingleTerm(identificationNumber, identificationTypeBackendValue)
						if (isEmpty(matchForIdTypeAndNumber) &&
							!customerIdValidationStatus &&
							customerIdentificationValidationEnabled.enabled &&
							(!!customerIdentificationValidationEnabled.idTypes.find(
								(idType: string) => idType === matchingIdentificationType.backendValue
							))
						) {
							actions.validateIdentification(identificationTypeBackendValue, identificationNumber, lastName);
						}
					}
				});
			}
		}, 500);
	};

	handleBlur = (partialModel: any) =>  {
		this.setState({
				model: {
					...this.state.model,
					...partialModel
				},
			}, () => {
				this.props.actions.saveSearchTerms(this.state.model);
			}
		);
	};

	render() {
		return (
			<div className="new-customer-search">
				<CustomerDataFormContainer
					schema={this.props.schema}
					validationErrors={this.state.validationErrors}
					onSubmit={this.doSearch}
					onBlur={this.handleBlur}
					saveSearchTerms={this.props.actions.saveSearchTerms}
					additionalFields={this.props.additionalFields}
				/>
			</div>
		);
	}
}

export default withSchema(["customerDataForm"])(CustomerSearchForm);

export {
	CustomerSearchFormStateProps,
	CustomerSearchFormActionProps,
	CustomerSearchFormProps,
	CustomerSearchFormState,
};

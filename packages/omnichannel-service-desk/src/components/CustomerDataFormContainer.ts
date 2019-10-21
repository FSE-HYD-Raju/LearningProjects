"use strict";

import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { AppState, POSComponentCustomizationPoints, withCustomization } from "omnichannel-common-pos";
import CustomerDataForm, { CustomerDataFormActionProps, CustomerDataFormStateProps } from "./CustomerDataForm";
import { Schema } from "yup";

interface CustomerDataFormContainerOwnProps {
	schema?: Schema<any> & { fields: Array<any> };
	additionalFields: Array<any>;
	validationErrors: Array<any>;
	onBlur: (event: any) => void;
	onSubmit: (data: any) => void;
}

const mapStateToProps = (state: AppState, ownProps: CustomerDataFormContainerOwnProps): CustomerDataFormStateProps => ({
	schema: ownProps.schema,
	customerToCreate: state.customer.customerToCreate,
	requiredFields: state.consul.customerCreationMandatoryFields,
	additionalFields: ownProps.additionalFields,
	validationErrors: ownProps.validationErrors,
	genders: state.consul.genders,
	features: state.consul.features,
	displayOptions: state.consul.displayOptions,
	locale: state.consul.locale,
	locations: state.consul.locations,
	countries: state.consul.countries,
	customerIdValidationStatus: state.customer.customerIdValidationStatus,
	customerIdValidationStatusForNamesField: state.customer.customerIdValidationStatusForNamesField,
	dateFormat: state.schema.schemas.customerDataForm.properties.birthDay.format ? state.schema.schemas.customerDataForm.properties.birthDay.format : "MM/DD/YYYY",
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: CustomerDataFormContainerOwnProps): CustomerDataFormActionProps => {
	return {
		actions: {
			onBlur: ownProps.onBlur,
			onSubmit: ownProps.onSubmit,
		}
	};
};

export default withCustomization<any>(
	POSComponentCustomizationPoints.POS_CUSTOMER_DATA_FORM_CONTAINER ,
	connect(mapStateToProps, mapDispatchToProps)(CustomerDataForm)
);

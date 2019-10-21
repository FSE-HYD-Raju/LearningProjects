"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { AppState, HasFlux } from "omnichannel-common-pos";
import {
	default as CustomerSearchForm,
	CustomerSearchFormStateProps,
	CustomerSearchFormActionProps
} from "./CustomerSearchForm";

const mapStateToProps = (state: AppState): CustomerSearchFormStateProps => {
	const {
			customer: {
				customerToCreate,
				matchForIdTypeAndNumber,
				customerIdValidationStatus
			},
			consul: {
				displayOptions,
				customerIdentificationValidationEnabled,
				registrationFormAdditionalFields: additionalFields
			}
	} = state;
	return {
		customerToCreate,
		displayOptions,
		matchForIdTypeAndNumber,
		customerIdValidationStatus,
		customerIdentificationValidationEnabled,
		additionalFields
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: HasFlux): CustomerSearchFormActionProps => {
	const {
		CustomerActions: {
				searchCustomers,
				saveSearchTerms,
				validateIdentification,
				searchCustomerWithSingleTerm
		}} = ownProps.flux.actions;
	return {
		actions: {
			// DO NOT USE flux.actions.CustomerActions.createCustomer here, it's wrong // TODO paka: WHY?
			searchCustomers,
			saveSearchTerms,
			validateIdentification,
			searchCustomerWithSingleTerm
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerSearchForm);

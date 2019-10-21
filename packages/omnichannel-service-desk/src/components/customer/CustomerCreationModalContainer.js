// @flow
import React from "react";
import {
	OcModal,
	AltContainer,
	AddressValidationHandlerContainer,
	contextTypesValidationMap,
	FormattedMessage,
	actions,
} from "omnichannel-common-pos";

import DuplicateCustomersListContainer from "../newcustomer/DuplicateCustomersListContainer";
import CustomerOrganizationSelector from "../organization/CustomerOrganizationSelector";
import NewCustomerInfo from "../newcustomer/NewCustomerInfo";

import { connect } from "react-redux"
import { pick, omit, get } from "lodash";
import propTypes from "prop-types";
import messages from "../../index.messages";
import customerMessages from "./Customer.messages";

const CustomerCreationModalContainer = (props, context) => {
	const createCustomer = async (customer: any, forceUpdateAddress: boolean) => {
		props.actions.showLoadingOverlay();
		await props.createCustomer( props.customerAddressValidationErrorData, forceUpdateAddress);
		props.actions.clearAddressValidationError();
		props.actions.hideLoadingOverlay();

	};

	const proposalSelected = (address: any, forceUpdateAddress: boolean) => {
		props.updateAddress(address, forceUpdateAddress);
		props.actions.clearAddressValidationError();
	};

	const cancel = () => {
		props.clearSearch();
		props.actions.clearAddressValidationError();
	};

	const handleCloseForm = () => {
		props.clearSearch()
		props.actions.showCustomerCreationModal(false);
		props.actions.clearAddressValidationError();
	};

	const handleClose = () => {
		props.actions.showCustomerCreationModal(false);
		context.flux.actions.CustomerActions.clearSearchForm();
	};

	const { customers, searchActive, customerCreated, matchForIdTypeAndNumber } = props;
	const showDuplicateCustomerList = Boolean((customers && customers.length > 0) || matchForIdTypeAndNumber.length > 0) && searchActive;
	const showNewCustomerInfo = Boolean(customers && customers.length === 0 && matchForIdTypeAndNumber.length === 0) && searchActive;
	const showCustomerSearchForm = !searchActive;

	let customerDataModalTitle = (
		<FormattedMessage {...customerMessages.newcustomerHasBeenCreated} />
	);
	if (showDuplicateCustomerList) {
		customerDataModalTitle = (
			<FormattedMessage {...customerMessages.duplicateIndividual} />
		);
	} else if (Boolean(showNewCustomerInfo) && !customerCreated) {
		customerDataModalTitle = <FormattedMessage {...messages.customerBasicInformation} />;
	}

	return (
		<div>
			{props.showCustomerCreationModal && props.addressValidationError && (
				<AddressValidationHandlerContainer
					addressValidationError={props.addressValidationError}
					model={props.customerToCreate}
					actions={{
						proposalSelected: (model, forceUpdateAddress) => proposalSelected(model, forceUpdateAddress),
						cancel: () => cancel(),
						onClose: () => handleCloseForm(),
						parentSubmit: (model, forceUpdateAddress) => createCustomer(model, forceUpdateAddress)
					}}
				/>
			)}
			<OcModal
				data-test-id="customerDataFormInCustomerCreationModalContainer"
				showModal={props.showCustomerCreationModal && !props.addressValidationError}
				largeModal={true}
				noFooter={true}
				onClose={() => handleClose()}
				title={customerDataModalTitle}
			>
				<AltContainer
					stores={{
						...pick(context.flux.stores, "CustomerStore", "ConsulStore", "UserStore")
					}}
					actions={{
						...pick(context.flux.actions, "CustomerCaseActions", "CustomerActions")
					}}
					transform={({ CustomerStore, ConsulStore, UserStore, CustomerCaseActions, CustomerActions }) => {
						return {
							...omit(CustomerStore, "singleTerm", "singleTermCustomer"),
							ConsulStore,
							UserStore,
							CustomerCaseActions,
							CustomerActions,
							CustomerStore,
							hideCreateOrganizationButton: context.flux.reduxStore.getState().feature.hideCreateOrganizationButton,
							additionalFields: get(ConsulStore, "registrationFormAdditionalFields")
						};
					}}
				>
					{(showDuplicateCustomerList && <DuplicateCustomersListContainer flux={context.flux} {...props} />) ||
						(showNewCustomerInfo && <NewCustomerInfo />) ||
						(showCustomerSearchForm && <CustomerOrganizationSelector />)}
				</AltContainer>
			</OcModal>
		</div>
	);
};

CustomerCreationModalContainer.contextTypes = contextTypesValidationMap;

CustomerCreationModalContainer.propTypes = {
	showDuplicateCustomerList: propTypes.object,
	showNewCustomerInfo: propTypes.object,
	showCustomerSearchForm: propTypes.bool,
	customers: propTypes.array,
	customerCreated: propTypes.bool,
	searchActive: propTypes.bool,
	addressValidationError: propTypes.object,
	customerToCreate: propTypes.object,
	clearAddressValidationError: propTypes.func,
	clearSearch: propTypes.func,
	updateAddress: propTypes.func,
	createCustomer: propTypes.func,
	matchForIdTypeAndNumber: propTypes.array,
	showCustomerCreationModal: propTypes.bool,
	customerAddressValidationErrorData: propTypes.object,
	actions: {
		showLoadingOverlay: propTypes.func,
		clearAddressValidationError: propTypes.func,
		hideLoadingOverlay: propTypes.func,
		showCustomerCreationModal: propTypes.func,

	}
};

const CustomerCreationModalProvider = (props: Object, context: { flux: Object }) => {
	return (
		<AltContainer
			actions={{
				...pick(context.flux.actions, "CustomerActions")
			}}
			stores={{
				...pick(context.flux.stores, "CustomerStore")
			}}
			transform={({ CustomerStore, CustomerActions }) => {
				return {
					...pick(
						CustomerStore,
						"customers",
						"matchForIdTypeAndNumber",
						"searchActive",
						"customerCreated",
						"customerToCreate",
						"singleTermCustomers",
						"matchForIdTypeAndNumber",
						"searchingForSingleCustomer"
					),
					...pick(
						CustomerActions,
						"createCustomer",
						"proposalSelected",
						"clearSearch",
						"updateAddress",
						"searchCustomerWithSingleTerm",
						"getCustomerById"
					),
				};
			}}
		>
			<CustomerCreationModalContainer {...props} />
		</AltContainer>
	);
};

CustomerCreationModalProvider.contextTypes = contextTypesValidationMap;

const mapStateToProps = (state) => {
	return {
	showCustomerCreationModal: state.navBar.showCustomerCreationModal,
	addressValidationError: state.error.addressValidationError,
	customerAddressValidationErrorData: state.customer.customerAddressValidationErrorData,
	}
};

const mapDispatchToProps = dispatch  =>({
	actions: {
		showLoadingOverlay: () => dispatch(actions.loadingOverlay.showLoadingOverlay()),
		clearAddressValidationError: () => dispatch(actions.error.clearAddressValidationError()),
		hideLoadingOverlay: () => dispatch(actions.loadingOverlay.hideLoadingOverlay()),
		showCustomerCreationModal: (value) => dispatch(actions.navBar.showCustomerCreationModal(value)),

	}
})
export default connect(mapStateToProps, mapDispatchToProps)(CustomerCreationModalProvider);

"use strict";

import { CustomerActions, CustomerActionPayload } from "./customer.actions";
import { CustomerState } from "./customer.types";
import { NavBarActions } from "../../actions";
import { NavBarActionPayload } from "../..";
import { CustomerAccount } from "../../types";

export { CustomerActionPayload } from "./customer.actions";
export { CustomerState };

const initialState = {
	createdCustomer: {
		firstName: "",
		lastName: "",
		email: {
			email: "",
			id: ""
		},
		phone: {
			number: "",
			id: ""
		},
		street: "",
		postalCode: "",
		city: "",
		country: "",
		gender: ""
	},
	singleTerm: "",
	singleTermCustomers: [],
	matchForIdTypeAndNumber: [],
	searchTerms: [],
	searchActive: false,
	goToComms: false,
	customerToCreate: {
		firstName: "",
		additionalName: "",
		lastName: "",
		lastName2: "",
		email: "",
		nationality: "",
		phone: "",
		identificationId: "",
		identificationIssuingAuthorityCity: "",
		identificationLifecycleStatus: "",
		identificationType: "",
		street: "",
		postalCode: "",
		city: "",
		country: "",
		gender: "",
		marketingOwnPartyMarketing: true,
		marketingOwnPartyMarketingSms: true,
		marketingOwnPartyMarketingEmail: true,
		marketingOwnPartyMarketingLetter: true,
		marketingOwnPartyMarketingTelemarketing: true
	},
	customerIdValidationError: "",
	customerCreated: false,
	forceUpdateAddress: false,
	customerIdValidationStatus: false,
	customerIdValidationStatusForNamesField: false,
	validationServiceDown: false,
	activeCustomerAccount: {
		attributes: {
			accountId: "",
		},
		id: "",
	},
};

const customerReducer = (state: Partial<CustomerState> = initialState, action: CustomerActionPayload | NavBarActionPayload) => {
	const {type} = action;
	switch (type) {
		case CustomerActions.FLUX_SYNC:
			return {...state, ...action.fluxState};
		// a bit of a hack here: we should always reset customer when SHOW_CUSTOMER_CREATION_MODAL is fired with true
		case NavBarActions.SHOW_CUSTOMER_CREATION_MODAL: {
			if ((action as NavBarActionPayload).showCustomerCreationModal) {
				return {
					...state,
					newCustomer: null,
					goToComms: false,
					customerCreated: false
				};
			}
			return state;
		}
		case CustomerActions.SET_ACTIVE_CUSTOMER_ACCOUNT:
			const { attributes = { accountId: "" }, id = "" } = (action as CustomerActionPayload).activeCustomerAccount as CustomerAccount;
			return {
				...state,
				activeCustomerAccount: {
					attributes: {
						accountId: attributes.accountId,
					},
					id: id,
				},
			};
		case CustomerActions.CUSTOMER_ADDRESS_VALIDATION_ERROR: {
			return {
				...state,
				customerAddressValidationErrorData: (action as CustomerActionPayload).customerData,
			};
		}
		default:
			return state;
	}
};

export default customerReducer;

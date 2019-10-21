// @flow

import { Flux } from "omnichannel-common-pos";
import R from "ramda";

const { BaseStore, ImmStore } = Flux;

@ImmStore
class CustomerStore extends BaseStore {
	constructor() {
		super();
		this.bindActions(this.alt.actions.CustomerActions);
		this.state = {
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
			customers: null,
			newCustomer: null,
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
				identificationIssuingDate: null,
				identificationExpiryDate: null,
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
			customerCreated: false,
			forceUpdateAddress: false,
			customerIdValidationStatus: false,
			customerIdValidationStatusForNamesField: false,
			customerIdValidationError: "",
			validationServiceDown: false
		};

		// this.doSaveSearchTerms = _.debounce(this.doSaveSearchTerms, 500, {
		// 	leading: false,
		// 	trailing: true
		// });
	}

	createCustomer(customer: any) {
		this.setState({
			createdCustomer: customer,
			customerCreated: true,
			customerToCreate: {
				firstName: "",
				additionalName: "",
				lastName: "",
				lastName2: "",
				email: "",
				nationality: "",
				phone: "",
				identificationId: "",
				identificationIssuingDate: null,
				identificationExpiryDate: null,
				identificationIssuingAuthorityCity: "",
				identificationLifecycleStatus: "",
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
			}
		});
	}

	resetNewCustomer() {
		this.setState({
			newCustomer: null,
			goToComms: false,
			customerCreated: false
		});
	}

	clearCustomer() {
		this.setState({
			newCustomer: null,
			goToComms: false,
			customerCreated: false
		});
	}

	clearSearch() {
		this.setState({
			customers: null,
			searchActive: false,
			matchForIdTypeAndNumber: [],
			customerIdValidationError: "",
		});
	}

	ignoreDuplicates() {
		this.setState({
			customers: []
		});
	}

	clearSearchForm() {
		this.clearSearch();
		this.setState({
			customerToCreate: {},
			customerIdValidationStatus: false,
			customerIdValidationError: "",
			matchForIdTypeAndNumber: []
		});
	}

	searchCustomers(data: Array<any>) {
		// console.log('CUSTOMERS:', data);
		this.setState({
			customers: data,
			searchActive: true,
			forceUpdateAddress: false // forceUpdateAddress must be reset somewhere, not sure if this is the right place ..
		});
	}

	searchCustomerWithSingleTerm(data: any) {
		if (data.working) {
			this.setState({
				searchingForSingleCustomer: true
			});
		} else {
			/*
			* if the search was done using and id-type and number and returned an individual,
			* store that individual also separately for use in <DuplicateCustomersList>
			*/
			if (data.isIdType) {
				this.setState({
					matchForIdTypeAndNumber: data.data
				});
			}

			this.setState({
				searchingForSingleCustomer: false,
				singleTermCustomers: data.data,
				searchTerms: [data.term]
			});
		}
	}

	searchCustomerWithMultipleTerms(data: any) {
		if (data.working) {
			this.setState({
				searchingForSingleCustomer: true
			});
		} else {
			this.setState({
				searchingForSingleCustomer: false,
				singleTermCustomers: data.data,
				searchTerms: data.terms
			});
		}
	}

	getCustomerById = (customer: any) => {
		this.setState({
			singleTermCustomers: customer
		});
	};

	setSingleTerm(term: string) {
		if (!term) {
			this.setState({
				singleTerm: "",
				singleTermCustomers: []
			});
		} else {
			this.setState({
				singleTerm: term
			});
		}
	}

	saveSearchTerms(model: any) {
		this.doSaveSearchTerms(model);
	}

	doSaveSearchTerms(model: any) {
		this.setState({
			customerToCreate: {
				...this.state.customerToCreate,
				...model
			}
		});
	}

	updateAddress(data: { address: Object, forceUpdateAddress: boolean }) {
		const { address, forceUpdateAddress } = data;
		this.setState({
			customerToCreate: R.merge(this.state.customerToCreate, address),
			forceUpdateAddress
		});
	}

	clearSingleTermSearch() {
		this.setState({
			singleTerm: "",
			singleTermCustomers: [],
			matchForIdTypeAndNumber: []
		});
	}

	validateIdentification(data) {
		this.setState({
			validationServiceDown: false,
			customerIdValidationError: "",
			customerIdValidationStatus: false,
			customerIdValidationStatusForNamesField: false,
		});

		const respCode = data.data[0].attributes.code;
		const attributes = data.data[0].attributes;

		//success with no description
		const successfulValidationCode = "12";
		//success with description: End-query type 1. The consultation was effective. (Success)
		const successfulValidationConsultationCode = "13";
		//success with description: End-query type 5. The last name entered if it
		//matches the one registered in the database for that ID number,
		//but the person does NOT have commercial information in the DataCrédito database.
		const successfulValidationNoCommercialDataCode = "14";
		//undocumented error returned from DataCredito
		//wrong document number code
		const wrongDocumentNumberCode = "05";
		//Type of document wrong.
		const wrongDocumentTypeCode = "04";
		//First surname wrong.
		const firstSurnameWrongCode = "06";
		//End-query type 7. This identification number does not exist in the validation files of the database.
		const identificationNotExistsCode = "09";
		//End-query type 6. The last name DOES NOT coincide with the one registered in the National Registry of Civil Status.
		const lastNameNotConincideWithNRCSCode = "10";

		if (respCode === null) {
			this.setState({
				//store the returned customer information
				//flag successful validation
				customerToCreate: {
					...this.state.customerToCreate,
					firstName: attributes.givenName,
					lastName: attributes.familyName1,
					lastName2: attributes.familyName2,
					identificationId: attributes.identificationId,
					identificationIssuingDate: attributes.issuingDate,
					street: attributes.street,
					postalCode: attributes.postalCode,
					city: attributes.city
				},
				customerIdValidationStatus: true,
			});
		} else if (
			respCode === successfulValidationCode ||
			respCode === successfulValidationConsultationCode ||
			respCode === successfulValidationNoCommercialDataCode
		) {
			this.setState({
				customerIdValidationStatus: true,
				customerIdValidationStatusForNamesField: true,
			});
		} else if (
			respCode === wrongDocumentNumberCode ||
			respCode === wrongDocumentTypeCode ||
			respCode === identificationNotExistsCode
		) {
			this.setState({
				customerIdValidationError: attributes.description,
				customerIdValidationStatus: false,
				customerIdValidationStatusForNamesField: true,
			});
		}
		else if (
			respCode === firstSurnameWrongCode ||
			respCode === lastNameNotConincideWithNRCSCode
		) {
			this.setState({
				customerIdValidationError: attributes.description,
				customerIdValidationStatus: true,
				customerIdValidationStatusForNamesField: false,
			});
		} else {
			this.setState({
				customerIdValidationError: attributes.description,
				customerIdValidationStatus: true,
				customerIdValidationStatusForNamesField: true,
			});
		}
	}
}
export default CustomerStore;

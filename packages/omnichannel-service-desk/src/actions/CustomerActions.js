// @flow

import { ErrorContainer, Flux, actions } from "omnichannel-common-pos";
import { isEmpty, values, get, set, find } from "lodash";
import type { UserStoreState, EmailType, PhoneNumberType, PostalAddressType } from "omnichannel-flow-pos";

const { BaseActions } = Flux;
const commonHeaders: Object = { "Content-Type": "application/vnd.api+json" };

type Alt = {
	stores: {
		UserStore: {
			state: UserStoreState
		}
	},
	resolve: (*) => void,
	apiCalls: Function,
	actions: {
		CustomerCaseActions: Object
	}
};

class CustomerActions extends BaseActions {
	clearSearch() {
		return true;
	}

	ignoreDuplicates() {
		return true;
	}

	clearCustomer() {
		return true;
	}

	clearSearchForm() {
		return true;
	}

	searchCustomers(firstName: string, lastName: string) {
		return (dispatch: (*) => void, alt: Object) =>
			alt.resolve(async () => {
				const url = `/persons?&filter[name]=${firstName}%20${lastName}`;
				const results = await alt.apiCalls.get(url, this);
				dispatch(results.data);
			});
	}

	searchCustomerWithSingleTerm(term: string, criteria: string) {
		return (dispatch: (*) => void, alt: Alt) =>
			alt.resolve(async () => {
				dispatch({ working: true });
				const isIdType = find(alt.stores.ConsulStore.state.identificationTypes, type => type === criteria);
				let url;
				if (criteria === "name" || criteria === "number" || criteria === "contact_media_email" || criteria === "contact_media_number") {
					url = `/persons?filter[${criteria}]=${term}&include=customerAccounts`;
				} else {
					url = `/persons?filter[persons][identification]=${term}%7C${criteria}&include=customerAccounts`;
				}

				const results = await alt.apiCalls.get(url, this);

				// maps relations for customer accounts and individuals, assigns customer accounts for their corresponding individuals
				const customers = results.data && results.data.map(customer => {
					customer.customerAccounts = customer.relationships && customer.relationships.customerAccounts.data.map(customerAccount => {
						return results.included.filter(includedCustomerAccount => includedCustomerAccount.id === customerAccount.id)[0]
					})
					return customer;
				})
				dispatch({ data: customers, term, isIdType });
			});
	}

	searchCustomerWithMultipleTerms(stack: { [string]: string }) {
		const terms = values(stack);
		const queryString = Object.keys(stack)
			.map(key => `filter[${key}]=${stack[key]}`)
			.join("&");

		return (dispatch: (*) => void, alt: Alt) =>
			alt.resolve(async () => {
				dispatch({ working: true });
				const url = `/persons?${queryString}`;
				const results = await alt.apiCalls.get(url, this);
				dispatch({ data: results.data, terms });
			});
	}

	getCustomerById = (customerId: string) => async (dispatch: Function, alt: Alt) => {
		if (customerId) {
			const url = `/persons/${customerId}`;
			const result = await alt.apiCalls.get(url, this);

			if (result instanceof ErrorContainer) {
				return this.onError(result);
			} else {
				return dispatch(result.data);
			}
		}
		return false;
	};

	createCustomer(payload: any, forceAddressUpdate: boolean, additionalFields: ?(any[])) {
		const { customer } = payload;
		const {
			firstName,
			additionalName,
			lastName,
			lastName2,
			city,
			street,
			addressDetails,
			coAddress,
			country,
			birthDay,
			gender,
			language,
			postalCode,
			email,
			nationality,
			mobileNumber,
			fixedLineNumber,
			identificationType,
			identificationId,
			identificationIssuingAuthority,
			identificationIssuingAuthorityCity,
			identificationIssuingDate,
			identificationExpiryDate,
			identificationLifecycleStatus,
			apartment,
			building,
			province,
			marketingOwnPartyMarketing,
			marketingOwnPartyMarketingSms,
			marketingOwnPartyMarketingEmail,
			marketingOwnPartyMarketingLetter,
			marketingOwnPartyMarketingTelemarketing
		} = customer;

		const characteristics = {};

		const privacySettings = {
			"own-marketing": marketingOwnPartyMarketing,
			"own-marketing-sms": marketingOwnPartyMarketingSms,
			"own-marketing-email": marketingOwnPartyMarketingEmail,
			"own-marketing-letter": marketingOwnPartyMarketingLetter,
			"own-marketing-telemarketing": marketingOwnPartyMarketingTelemarketing
		};

		/**
		 * Sets configured additional fields content to request payload as characteristics.
		 */
		additionalFields &&
			additionalFields.forEach(field => {
				const value = get(customer, field.name);
				if (value) {
					set(characteristics, field.name, get(customer, field.name));
				}
			});

		const postalAddress = street &&
		city &&
		postalCode &&
		country && {
			street,
			coAddress,
			city,
			postalCode,
			country,
			apartment,
			building,
			stateOrProvince: province,
			description: addressDetails
		};

		const emails = email ? [{ email }] : undefined;
		const mobileNumbers = mobileNumber ? [{ number: mobileNumber }] : undefined;
		const fixedLineNumbers = fixedLineNumber ? [{ number: fixedLineNumber }] : undefined;
		const postalAddresses = postalAddress ? [postalAddress] : undefined;

		let identifications = null;
		if (identificationType && identificationId && identificationIssuingDate) {
			identifications = [
				{
					identificationId,
					type: identificationType,
					issuingAuthority: {
						name: identificationIssuingAuthority,
						city: identificationIssuingAuthorityCity
					},
					validityPeriod: {
						startDate: identificationIssuingDate,
						endDate: identificationExpiryDate
					},
					lifecycleStatus: identificationLifecycleStatus
				}
			];
		}

		type PersonType = {
			attributes: {
				firstName: string,
				additionalName: string,
				lastName: string,
				gender: "male" | "female" | "other",
				nationality?: string,
				birthDay: string,
				emails: ?Array<{
					email: EmailType
				}>,
				nationality: string,
				mobileNumbers?: Array<{
					number: PhoneNumberType
				}>,
				fixedLineNumbers?: Array<{
					number: PhoneNumberType
				}>,
				language: string,
				postalAddresses: ?Array<PostalAddressType>,
				identifications: ?Array<*>,
				privacySettings: Object
			},
			type: string
		};

		const person: PersonType = {
			/* Mangle date into oc-common person shape */
			attributes: {
				firstName,
				additionalName,
				lastName: lastName2 ? `${lastName} ${lastName2}` : lastName,
				gender,
				birthDay,
				emails,
				nationality,
				mobileNumbers,
				fixedLineNumbers,
				language,
				postalAddresses,
				identifications,
				characteristics: !isEmpty(characteristics) ? characteristics : null,
				privacySettings
			},
			type: "persons"
		};

		return (dispatch: (*) => void, alt: Object) =>
			alt.resolve(async () => {
				const forceHeaders = Object.assign({}, commonHeaders, {
					"X-Force-Address-Update": "true"
				});
				const headers = forceAddressUpdate ? forceHeaders : commonHeaders;
				const resp = await alt.apiCalls.post("/persons", person, headers);
				if (resp.errors) {
					const invalidPostalAddressError = resp.errors.find(error => {
						return error.code === "invalid-postal-address";
					});
					if (invalidPostalAddressError) {
						alt.reduxStore.dispatch(actions.error.onAddressValidationError(resp));
						alt.reduxStore.dispatch(actions.customer.customerAddressValidationError(payload));
					} else {
						this.onError(resp);
					}
				} else {
					alt.reduxStore.dispatch(actions.navBar.showCustomerCreationModal(false));
					dispatch(resp.data.data);
					alt.actions.CustomerCaseActions.setCustomer(resp.data.data, true);
				}
			});
	}

	//validates that family name matches identification number, when specific
	//identification types are selected
	validateIdentification(idType: string, idNumber: number, familyName: string) {
		return (dispatch: (*) => void, alt: Object) =>
			alt.resolve(async () => {
				if (alt.stores.CustomerStore.state.matchForIdTypeAndNumber.length === 0) {
					const url = `/customerValidation/?filter[identificationId]=${idNumber}&filter[identificationType]=${idType}&filter[familyName1]=${familyName}`;
					let resp = await alt.apiCalls.get(url, commonHeaders);
					if (resp.errors) {
						resp = {
							data: [
								{
									attributes: {
										code: "SERVICE_ERROR"
									}
								}
							]
						};
					}
					dispatch(resp);
				}
			});
	}

	updateAddress(address: Object, forceUpdateAddress: boolean) {
		console.log("UPDATE ADDRESS ACTION", address, forceUpdateAddress);
		return { address, forceUpdateAddress };
	}

	onAddressValidationError(resp: Object) {
		return resp;
	}

	resetNewCustomer() {
		return true;
	}

	setSingleTerm = (term: string) => term;

	saveSearchTerms = (model: Object) => model;

	clearSingleTermSearch = () => true;
}

export default CustomerActions;

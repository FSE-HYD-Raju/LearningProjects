import assignIn from "lodash/assignIn";
import cloneDeep from "lodash/cloneDeep";
import TestUtils from "../TestUtils";

const portIn = {
	$schema: "http://json-schema.org/draft-04/schema#",
	title: "portIn",
	type: "object",
	properties: {
		MSISDN: {
			type: "string",
			required: true,
			nullable: false
		},
		operatorId: {
			type: "string",
			required: true,
			nullable: false
		},
		transferCredit: {
			type: "boolean",
			required: false,
			nullable: true
		}
	}
};
const wind3PortIn = cloneDeep(portIn);
assignIn(wind3PortIn.properties, {
	previousContractType: {
		type: "string",
		required: true,
		nullable: false,
		validation: {
			enum: ["prepaid", "postpaid"]
		}
	},
	iccid: {
		type: "string",
		required: false,
		nullable: false,
		validation: {
			regexp: "8939[a-zA-Z0-9]{15,16}"
		}
	}
});

const consulStoreContent = {
	customerCreationMandatoryFields: ["firstname", "lastname", "gender"],
	displayOptions: {
		customerDataForm: {
			lastName2: true,
			building: true,
			apartment: true
		},
		identification: [
			{
				localisation: {
					fi: "Henkilökortti",
					sv: "identitetskort",
					en: "Personal Identification Card"
				},
				backendValue: "CC",
				identificationExpiryDate: true
			},
			{
				localisation: {
					fi: "Ulkomaalainen Passi",
					sv: "Utländskt Pass",
					en: "Foreign passport"
				},
				backendValue: "FP",
				identificationExpiryDate: true
			},
			{
				localisation: {
					fi: "Passi",
					sv: "Pass",
					en: "Passport"
				},
				backendValue: "PP",
				identificationExpiryDate: true
			},
			{
				localisation: {
					fi: "Ulkomaalainen ID",
					sv: "Utländskt ID",
					en: "Foreign ID"
				},
				backendValue: "DE",
				identificationExpiryDate: true
			}
		]
	},
	logSchemaDiscrepancies: false
};

const schemaStoreContent = {
	schemas: {
		ContactInformation: {
			$schema: "http://json-schema.org/draft-04/schema#",
			title: "ContactInformation",
			type: "object",
			properties: {
				mobileNumber: {
					type: "string",
					required: true,
					editable: true
				},
				email: {
					type: "string",
					required: true,
					editable: true,
					validation: {
						email: true
					}
				}
			}
		},
		DocumentsInformation: {
			$schema: "http://json-schema.org/draft-04/schema#",
			title: "DocumentsInformation",
			type: "object",
			properties: {
				identificationType: {
					type: "string",
					required: false
				},
				identificationId: {
					type: "string",
					required: false
				},
				identificationIssuingAuthority: {
					type: "string",
					required: false
				},
				identificationIssuingAuthorityCountry: {
					type: "string",
					required: false
				},
				identificationIssuingDate: {
					type: "date",
					required: false,
					editable: false,
					nullable: true
				},
				identificationExpiryDate: {
					type: "date",
					required: false,
					editable: false,
					nullable: true
				}
			}
		},
		b2cPersonDetailsForm: {
			$schema: "http://json-schema.org/draft-04/schema#",
			title: "personDetailsForm",
			type: "object",
			properties: {
				firstName: {
					type: "string",
					required: true,
					editable: true
				},
				lastName: {
					type: "string",
					required: true,
					editable: true
				},
				birthDay: {
					type: "date",
					required: false,
					nullable: true,
					editable: true
				},
				gender: {
					type: "string",
					required: true,
					editable: true
				},
				mobileNumber: {
					type: "string",
					required: true,
					editable: true
				},
				email: {
					type: "string",
					required: true,
					editable: true,
					validation: {
						email: true
					}
				},
				street: {
					type: "string",
					required: false
				},
				coAddress: {
					type: "string",
					required: false
				},
				postalCode: {
					type: "string",
					required: false
				},
				city: {
					type: "string",
					required: false
				},
				country: {
					type: "string",
					required: false
				},
				identificationType: {
					type: "string",
					required: false
				},
				identificationId: {
					type: "string",
					required: false
				},
				identificationIssuingAuthority: {
					type: "string",
					required: false
				},
				identificationIssuingAuthorityCountry: {
					type: "string",
					required: false
				},
				identificationIssuingDate: {
					type: "date",
					required: false,
					editable: false,
					nullable: true
				},
				identificationExpiryDate: {
					type: "date",
					required: false,
					editable: false,
					nullable: true
				}
			}
		},
		createOrganizationForm: {
			$schema:
				"http://json-schema.org/draft-04/schema#",
			title: "createOrganizationForm",
			type: "object",
			properties: {
				idType: {
					type: "string",
					required: true,
					editable: true
				},
				idNumber: {
					type: "string",
					required: true,
					editable: true
				},
				companyName: {
					type: "string",
					required: true,
					editable: true
				}
			}
		},
		customerDataForm: {
			$schema: "http://json-schema.org/draft-04/schema#",
			title: "customerDataForm",
			type: "object",
			properties: {
				firstName: {
					type: "string",
					required: true,
					editable: true
				},
				lastName: {
					type: "string",
					required: true,
					editable: true
				},
				lastName2: {
					type: "string",
					required: false,
					editable: true
				},
				email: {
					type: "string",
					required: true,
					editable: true,
					validation: {
						regexp: "/.+\\@.+\\..+/"
					}
				},
				mobileNumber: {
					type: "string",
					required: true,
					editable: true,
					validation: {
						regexp: "/^$|^(\\+?)([0-9]+)$/"
					}
				},
				fixedLineNumber: {
					type: "string",
					required: true,
					editable: true,
					validation: {
						regexp: "/^$|^(\\+?)([0-9]+)$/"
					}
				},
				gender: {
					type: "string",
					required: true,
					editable: true
				},
				birthDay: {
					type: "date",
					required: true,
					editable: false,
					nullable: true
				},
				identificationType: {
					type: "string",
					required: true,
					editable: true
				},
				identificationId: {
					type: "string",
					required: true,
					editable: true
				},
				identificationIssuingDate: {
					type: "date",
					required: false,
					editable: false,
					nullable: true
				},
				identificationExpiryDate: {
					type: "date",
					required: false,
					editable: false,
					nullable: true
				},
				street: {
					type: "string",
					required: true
				},
				coAddress: {
					type: "string",
					required: false
				},
				postalCode: {
					type: "string",
					required: true
				},
				city: {
					type: "string",
					required: true
				},
				country: {
					type: "string",
					required: true
				},
				building: {
					type: "string",
					required: false
				},
				apartment: {
					type: "string",
					required: false
				}
			}
		},
		deliveryAddress: {
			$schema: "http://json-schema.org/draft-04/schema#",
			title: "deliveryAddress",
			type: "object",
			properties: {
				street: {
					type: "string",
					required: true
				},
				coAddress: {
					type: "string",
					required: false
				},
				postalCode: {
					type: "string",
					required: true
				},
				city: {
					type: "string",
					required: true
				},
				country: {
					type: "string",
					required: true
				},
				stateOrProvince: {
					type: "string",
					required: false
				},
				description: {
					type: "string",
					required: false
				}
			}
		},
		marketingConsent: {
			$schema: "http://json-schema.org/draft-04/schema#",
			title: "marketingConsent",
			type: "object",
			properties: {
				ownMarketing: {
					type: "boolean",
					required: true,
					nullable: false
				},
				thirdPartyMarketing: {
					type: "boolean",
					required: true,
					nullable: false
				},
				geoLocalization: {
					type: "boolean",
					required: true,
					nullable: false
				},
				profiling: {
					type: "boolean",
					required: true,
					nullable: false
				},
				thirdPartyEnrichment: {
					type: "boolean",
					required: true,
					nullable: false
				},
				thirdPartyTransfer: {
					type: "boolean",
					required: true,
					nullable: false
				}
			}
		},
		PersonalInformation: {
			$schema: "http://json-schema.org/draft-04/schema#",
			title: "PersonalInformation",
			type: "object",
			properties: {
				firstName: {
					type: "string",
					required: true,
					editable: true
				},
				lastName: {
					type: "string",
					required: true,
					editable: true
				},
				birthDay: {
					type: "date",
					required: false,
					nullable: true,
					editable: true
				},
				gender: {
					type: "string",
					required: true,
					editable: true
				}
			}
		},
		phoneDirectoryRegistration: {
			$schema: "http://json-schema.org/draft-04/schema#",
			title: "phoneDirectoryRegistrationForm",
			type: "object",
			properties: {
				titleOrSpecialization: {
					type: "string",
					required: false,
					nullable: false
				},
				professionOrDepartment: {
					type: "string",
					required: false,
					nullable: false
				},
				street: {
					type: "string",
					required: false,
					nullable: false
				},
				postal_code: {
					type: "string",
					required: false,
					nullable: false
				},
				city: {
					type: "string",
					required: false,
					nullable: false
				},
				stateOrProvince: {
					type: "string",
					required: false,
					nullable: false
				},
				publishShortenedName: {
					type: "boolean",
					required: true,
					nullable: false
				},
				postalAdvertising: {
					type: "boolean",
					required: true,
					nullable: false
				},
				searchByPhoneNumberOnly: {
					type: "boolean",
					required: true,
					nullable: false
				},
				onlineListingOnly: {
					type: "boolean",
					required: true,
					nullable: false
				}
			}
		},
		portIn,
		posCheckoutDelivery: {
			$schema:
				"http://json-schema.org/draft-04/schema#",
			title: "posCheckoutDelivery",
			type: "object",
			properties: {
				street: {
					type: "string",
					required: true
				},
				coAddress: {
					type: "string",
					required: false
				},
				postalCode: {
					type: "string",
					required: true
				},
				city: {
					type: "string",
					required: true
				},
				country: {
					type: "string",
					required: true
				}
			}
		},
		wind3PortIn,
		recurringTopUpForm: {
			$schema: "http://json-schema.org/draft-04/schema#",
			title: "recurringTopUpForm",
			type: "object",
			properties: {
				recurringTopUp: {
					type: "string",
					required: true,
					nullable: false
				},
				thresholdValue: {
					type: "number",
					editable: true,
					validation: {
						number: true,
						min: 0
					}
				},
				topUpAmount: {
					type: "number",
					editable: true,
					validation: {
						number: true,
						min: 0
					}
				},
				limitInMonth: {
					type: "number",
					editable: true,
					validation: {
						number: true,
						min: 0
					}
				},
				topUpAmountWeekly: {
					type: "number",
					editable: true,
					validation: {
						number: true,
						min: 0
					}
				}
			}
		},
		registrationPage: {
			$schema:
				"http://json-schema.org/draft-04/schema#",
			title: "registrationPage",
			type: "object",
			properties: {
				firstName: {
					type: "string",
					required: true,
					editable: true
				},
				lastName: {
					type: "string",
					required: true,
					editable: true
				},
				email: {
					type: "string",
					required: true,
					editable: true,
					validation: {
						email: true
					}
				},
				street: {
					type: "string",
					required: true
				},
				postalCode: {
					type: "string",
					required: true
				},
				city: {
					type: "string",
					required: true
				},
				country: {
					type: "string",
					required: true
				},
				termsAndConditions: {
					type: "boolean",
					required: true
				}
			}
		},
		postalAddress: {
			$schema: "http://json-schema.org/draft-04/schema#",
			title: "postal-address",
			type: "object",
			properties: {
				street: {
					type: "string",
					required: true
				},
				coAddress: {
					type: "string",
					required: false
				},
				postalCode: {
					type: "string",
					required: true
				},
				city: {
					type: "string",
					required: true
				},
				country: {
					type: "string",
					required: true
				}
			}
		},
	}
};

const store = TestUtils.mockReduxStore({
	consul: consulStoreContent,
	schema: schemaStoreContent,
	feature: {
		hideIdentificationAtCheckoutPage: false,
	},
	error: {
		addressValidationError: {}
	}
});

const flux = {
		stores: {
			ConsulStore: consulStoreContent,
			SchemaStore: schemaStoreContent,
			ErrorStore: {
				addressValidationError: {}
			}
	}
};

const router = {
	push: () => {},
	createHref: () => {}
};

const getConsulContextMock = () => {
	return {
		flux,
		store,
	};
};

const getConsulContextMockWithRouter = () => {
	return {
		flux,
		router,
		store,
	};
};

const newSchemas = {
	personDetailsForm: {
			$schema:
				"http://json-schema.org/draft-04/schema#",
			title: "personDetailsForm",
			type: "object",
			properties: {
				firstName: {
					type: "string",
					required: true,
					editable: true
				},
				lastName: {
					type: "string",
					required: true,
					editable: true
				},
				birthDay: {
					type: "date",
					required: false,
					nullable: true,
					editable: true,
					validation: {
						length: {
							max: "now"
						}
					}
				},
				gender: {
					type: "string",
					required: true,
					editable: true
				},
				mobileNumber: {
					type: "string",
					required: true,
					editable: true
				},
				email: {
					type: "string",
					required: true,
					editable: true,
					validation: {
						email: true
					}
				},
				street: {
					type: "string",
					required: false
				},
				description: {
					type: "string",
					required: false
				},
				postalCode: {
					type: "string",
					required: false
				},
				city: {
					type: "string",
					required: false
				},
				stateOrProvince: {
					type: "string",
					required: false
				},
				country: {
					type: "string",
					required: false
				},
				identificationType: {
					type: "string",
					required: false
				},
				identificationId: {
					type: "string",
					required: false
				},
				identificationIssuingAuthority: {
					type: "string",
					required: false
				},
				identificationIssuingDate: {
					type: "string",
					required: false
				},
				identificationExpiryDate: {
					type: "string",
					required: false
				}
			}
		}
};

const getPersonDetailsFormContextMock = () => {
	return {
		flux: {
			stores: {
				...flux.stores,
				SchemaStore: {
					schemas: newSchemas
				},
			}
		},
		store: TestUtils.mockReduxStore({
			consul: consulStoreContent,
			error: {
				addressValidationError: {}
			},
			schema: {
				schemas: newSchemas
			}
		})
	};
};

const getConsulStoreMock = () => {
	return {
		genders: ["female", "male"],
		countries: [
			{
				code: "AL",
				name: "Albania"
			},
			{
				code: "FI",
				name: "Finland"
			},
			{
				code: "GB",
				name: "United Kingdom"
			},
			{
				code: "US",
				name: "United States of America"
			},
			{
				code: "RU",
				name: "Russia"
			},
			{
				code: "SE",
				name: "Sweden"
			},
			{
				code: "IT",
				name: "Italy"
			}
		],
		features: {
			pos: {
				identification: {
					identificationTypes: ["passport", "drivingLicense"],
					default: "passport",
					passport: {
						identificationIssuingAuthority: true,
						identificationExpiryDate: true
					},
					driversLicence: {
						identificationIssuingAuthority: true,
						identificationExpiryDate: false
					}
				}
			}
		},
		logSchemaDiscrepancies: false
	};
};

const getSingleTermCustomersMock = () => {
	return [
		{
			id: "timo",
			attributes: {
				formattedName: "Timo Isokoski",
				postalAddresses: [],
				mobileNumbers: [{ number: "1239487" }]
			}
		}
	];
};

export default {
	getConsulContextMock,
	getConsulContextMockWithRouter,
	getPersonDetailsFormContextMock,
	getConsulStoreMock,
	getSingleTermCustomersMock
};

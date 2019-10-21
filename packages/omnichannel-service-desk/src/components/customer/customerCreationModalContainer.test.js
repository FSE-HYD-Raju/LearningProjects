import CustomerCreationModalContainer from "../../../src/components/customer/CustomerCreationModalContainer";
import React from "react";
import { shallowWithContext, attachWithContext, TestUtils } from "omnichannel-common-pos";

describe("CustomerCreationModalContainer", () => {
	let context;
	const customer = {
		id: "john.smith",
		attributes: {
			firstName: "John",
			lastName: "Smith"
		}
	};
	const customerDataFormSchema = {
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
			email: {
				type: "string",
				required: true,
				editable: true,
				validation: {
					email: true
				}
			},
			mobileNumber: {
				type: "string",
				required: true,
				editable: true,
				validation: {
					phone: true
				}
			},
			fixedLineNumber: {
				type: "string",
				required: true,
				editable: true,
				validation: {
					phone: true
				}
			},
			gender: {
				type: "string",
				required: true,
				editable: true
			},
			passportNumber: {
				type: "string",
				required: false,
				editable: true
			},
			passportIssuingDate: {
				type: "date",
				required: false,
				editable: false,
				nullable: true
			},
			passportExpiryDate: {
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
			}
		}
	};
	const flux = {
		actions: {
			CustomerActions: {},
			CustomerCaseActions: {},
		},
		stores: {
			customer: {},
			customerCase: {}
		}
	};
	const reduxStore = TestUtils.mockReduxStore({
		navBar: {
			showCustomerCreationModal: true,
		},
		error: {
			addressValidationError: false,
		},
		schema: {
			schemas: {
				customerDataForm: customerDataFormSchema
			}
		},
		consul: {
			logSchemaDiscrepancies: false,
		},
		feature: {},
		cms: {},
		customer: {
			customers: [customer],
			customerToCreate: customer.attributes,
			matchForIdTypeAndNumber: []
		}
	});

	beforeEach(() => {
		context = {
			flux,
			store: reduxStore,
		};
	});

	const { getModalContents, makeStore } = TestUtils;

	const contextWithMockedFlux = {
		store: reduxStore,
		flux: {
			actions: {
				CustomerActions: {
					ignoreDuplicates: jest.fn()
				},
				CustomerCaseActions: {},
			},
			stores: {
				CustomerStore: makeStore("flux.stores.CustomerStore", {
					matchForIdTypeAndNumber: []
				}),
				ConsulStore: makeStore("flux.stores.ConsulStore", {
					genders: [],
					features: {
						pos: {
							customerDataForm: {
								apartment: true,
								building: true,
								lastName2: true
							},
							identification: {
								identificationTypes: ["passport", "drivingLicense"],
								default: "passport",
								passport: {
									identificationIssuingAuthority: true,
									identificationExpiryDate: true
								},
								drivingLicense: {
									identificationIssuingAuthority: true,
									identificationExpiryDate: false
								}
							}
						}
					},
					matchForIdTypeAndNumber: [],
					logSchemaDiscrepancies: false,
				}),
				SchemaStore: {
					state: {
						schemas: {
							customerDataForm: customerDataFormSchema
						}
					}
				},
				UserStore: makeStore("flux.stores.UserStore")
			}
		},
	};

	it("succeeds at shallow mount with no props", () => {
		shallowWithContext(<CustomerCreationModalContainer />, { context: contextWithMockedFlux });
	});

	it("succeeds at deep mount with no props", () => {
		attachWithContext(<CustomerCreationModalContainer />, { context: contextWithMockedFlux });
	});

	it("render customer info verification screen if duplicates are ignored", () => {
		const props = {
			user: { id: "1" },
			activeCustomerCase: { attributes: {} },
			location: {
				pathname: "/servicedesk",
				query: {
					toolmode: false
				}
			},
			searchActive: true,
			customers: [customer.attributes],
			matchForIdTypeAndNumber: [],
			createNewCustomerCase: () => {},
			actions: {
				ignoreDuplicates: jest.fn()
			}
		};

		const context0 = {
			...context,
			flux: {
				actions: {
					CustomerActions: {
						ignoreDuplicates: () => true
					},
					CustomerCaseActions: {},
				},
				stores: {
					CustomerStore: makeStore("flux.stores.CustomerStore", {
						customers: [customer],
						customerToCreate: customer.attributes,
						matchForIdTypeAndNumber: []
					}),
				}
			},
			store: reduxStore,
		};

		const wrapper = attachWithContext(<CustomerCreationModalContainer {...props} />, { context: context0 });

		const modalContents = getModalContents(wrapper, context0);
		expect(modalContents.text()).toContain("Continue with new customer");

		const button = modalContents.find("#buttonContinueToCreateNewCustomer");
		button.hostNodes().simulate("click");

		wrapper.detach(); /* this is required because component contains a Modal */

		const newprops = {
			user: { id: "1" },
			activeCustomerCase: { attributes: {} },
			location: {
				pathname: "/servicedesk",
				query: {
					toolmode: false
				}
			},
			createNewCustomerCase: () => {},
			searchActive: true,
			matchForIdTypeAndNumber: []
		};

		const context1 = {
			...context,
			flux: {
				actions: {
					CustomerActions: {
						ignoreDuplicates: () => true
					},
					CustomerCaseActions: {},
				},
				stores: {
					CustomerStore: makeStore("flux.stores.CustomerStore", {
						customers: [],
						customerToCreate: customer,
						matchForIdTypeAndNumber: []
					}),
				}
			},
			store: TestUtils.mockReduxStore({
				navBar: {
					showCustomerCreationModal: true,
				},
				error: {
					addressValidationError: false,
				},
				schema: {
					schemas: {
						customerDataForm: customerDataFormSchema
					}
				},
				consul: {
					logSchemaDiscrepancies: false,
				},
				feature: {},
				cms: {},
				customer: {
					customers: [],
					customerToCreate: customer,
					matchForIdTypeAndNumber: []
				}
			}),
		};
		const newWrapper = attachWithContext(<CustomerCreationModalContainer {...newprops} />, { context: context1 });

		const newModalContents = getModalContents(newWrapper, context1);
		expect(newModalContents.find("NewCustomerInfo").instance()).toBeTruthy();

		expect(newModalContents.find("#buttonContinueToCreateNewCustomer")).toHaveLength(0); // duplicate list should not be renderer

		newWrapper.detach();
	});

	it('renders "Create new customer" title', () => {
		/* props received by CustomerCreationModalContainer that cause this title
			customers null
			searchActive false
			customerCreated false
			showNewCustomerInfo null
			showCustomerSearchForm true
			showDuplicateCustomerList null
		 */
		const props = {
			location: {
				pathname: "/servicedesk",
				query: {}
			},
			activeCustomerCase: {
				attributes: {
					activeCustomer: {
						id: "foo"
					}
				}
			},
			customers: null,
			searchActive: false,
			customerCreated: false,
			customerToCreate: {}
		};

		const wrapper = attachWithContext(<CustomerCreationModalContainer {...props} />, { context: contextWithMockedFlux });

		const customerDataModal = wrapper.find("OcModal").filterWhere(n => n.prop("data-test-id") === "customerDataFormInCustomerCreationModalContainer");

		const modalContents = getModalContents(customerDataModal, contextWithMockedFlux);

		expect(modalContents.find(".OcModal-header-container").text().toLowerCase()).toEqual("create new customer");

		wrapper.detach();
	});

	it('renders "Found an existing user by that name" title', () => {
		/* props received by CustomerCreationModalContainer that cause this title
			customers [{id: "juanita", type: "persons"}]
			searchActive true
			customerCreated false
			showNewCustomerInfo false
			showCustomerSearchForm false
			showDuplicateCustomerList true
		 */
		const props = {
			location: {
				pathname: "/servicedesk",
				query: {
					toolmode: false
				}
			},
			activeCustomerCase: {
				attributes: {
					activeCustomer: {
						id: "foo"
					}
				}
			},
			customers: [customer],
			searchActive: true,
			customerToCreate: {},
			matchForIdTypeAndNumber: []
		};

		const wrapper = attachWithContext(<CustomerCreationModalContainer {...props} />, {
			context: contextWithMockedFlux
		});

		const customerDataModal = wrapper.find("OcModal").filterWhere(n => n.prop("data-test-id") === "customerDataFormInCustomerCreationModalContainer");

		const modalContents = getModalContents(customerDataModal, contextWithMockedFlux);
		expect(modalContents.find(".OcModal-header-container").text().toLowerCase()).toEqual("found an existing individual");

		wrapper.detach();
	});

	it('renders "Please verify customer information" title', () => {
		/* The UI flow this test tests has changed - user gets display the customer selection modal  */

		/* props received by CustomerCreationModalContainer that cause this title
			customers undefined
			searchActive true
			customerCreated false
			showNewCustomerInfo true
			showCustomerSearchForm false
			showDuplicateCustomerList false
			showNewCustomerInfo && !customerCreated true
		 */
		const props = {
			location: {
				pathname: "/servicedesk",
				query: {}
			},
			matchForIdTypeAndNumber: [],
			activeCustomerCase: {
				attributes: {}
			},
			searchActive: true,
			CustomerStore: {
				customers: []
			}
		};

		const updatedContext = {
			...context,
			flux: {
				actions: {
					CustomerCaseActions: {},
					CustomerActions: {},
				},
				stores: {
					CustomerStore: makeStore("flux.stores.CustomerStore", {
						customers: [],
						matchForIdTypeAndNumber: [],
						customerToCreate: {}
					}),
				}
			}
		};
		const wrapper = attachWithContext(<CustomerCreationModalContainer {...props} />, { context: updatedContext });

		const customerDataModal = wrapper.find("OcModal").filterWhere(n => n.prop("data-test-id") === "customerDataFormInCustomerCreationModalContainer");

		const modalContents = getModalContents(customerDataModal, updatedContext);
		expect(modalContents.find(".OcModal-header-container").text().toLowerCase()).toEqual("please verify customer information");

		wrapper.detach();
	});
});

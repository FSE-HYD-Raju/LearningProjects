import * as React from "react";
import {
	attachWithContext,
	mountWithContext,
	shallowWithContext,
	TestUtils,
	Customer,
	NewCustomer,
} from "omnichannel-common-pos";
import DuplicateCustomersList from "./DuplicateCustomersList";

describe("DuplicateCustomersList", () => {
	const minimumProps = {
		actions: {
			ignoreDuplicates: jest.fn(),
			setCustomer: jest.fn(),
			clearSearch: jest.fn(),
			showCustomerCreationModal: jest.fn(),
		},
		customerToCreate: {} as any as NewCustomer,
		customers: [],
		matchForIdTypeAndNumber: [],
	};

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(<DuplicateCustomersList {...minimumProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		mountWithContext(<DuplicateCustomersList {...minimumProps} />);
	});

	const twoCustomersProps = {
		...minimumProps,
		customers: [
			{
				id: "1",
				attributes: {
					firstName: "Timo",
					lastName: "Isokoski"
				}
			},
			{
				id: "2",
				attributes: {
					firstName: "Timo",
					lastName: "Isokoski"
				}
			}
		] as any as Array<Customer>,
		customerToCreate: {
			firstName: "Timo",
			lastName: "Isokoski"
		} as any as NewCustomer,
	};

	it("renders customers", () => {
		const makeFormattedName = (customer: NewCustomer) => {
			return customer.firstName + " " + customer.lastName;
		};

		const wrapper = mountWithContext(<DuplicateCustomersList {...twoCustomersProps} />);

		const formattedName = makeFormattedName(twoCustomersProps.customerToCreate);

		const header = wrapper.find(".DuplicateCustomersList-header");
		expect(header.length).toEqual(1);
		expect(header.text()).toMatch(twoCustomersProps.customers.length + ` possible duplicate result(s) found for new customer ${formattedName}`);

		const bodyRows = wrapper.find("table tbody tr");
		expect(bodyRows.length).toEqual(twoCustomersProps.customers.length);
	});

	/* RUBT-60283 */
	it("allows selecting a customer", done => {
		const { findNodesWithOnClickAttribute, getRandomIntBetweenZeroAndN } = TestUtils;

		const props = {
			...twoCustomersProps,
			actions: {
				...minimumProps.actions,
				setCustomer: (customer: Customer) => {
					console.log("MOCKED CustomerCaseActions.setCustomer(), customer:", customer);
					expect(customer.id).toEqual(selectedCustomerId);
				},
				showCustomerCreationModal: (t: boolean) => {
					console.log("MOCKED NavBarActions.showCustomerCreationModal():", t);
					done();
				}
			},
		};

		const wrapper = attachWithContext(<DuplicateCustomersList {...props} />);

		const bodyRows = wrapper.find("table tbody tr");
		expect(bodyRows.length).toEqual(twoCustomersProps.customers.length);

		const random = getRandomIntBetweenZeroAndN(twoCustomersProps.customers.length);

		const selectedRow = bodyRows.at(random);
		const selectedCustomerId = selectedRow.find("td").at(0).text();
		findNodesWithOnClickAttribute(selectedRow).find("button").simulate("click");
	});
});

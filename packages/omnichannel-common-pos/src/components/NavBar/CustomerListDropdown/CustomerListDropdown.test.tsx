import * as React from "react";
import { mountWithContext, shallowWithContext } from "../../../testUtils";

import CustomerListDropdown, { CustomerListDropdownProps } from "./CustomerListDropdown";
import { Customer } from "../../../redux";
import { get } from "lodash";

describe("CustomerListDropdown", () => {
	let minimumProps: CustomerListDropdownProps;

	beforeEach(() => {
		minimumProps = {
			searchTerm: "name",
			selectCustomer: jest.fn(),
			singleTermCustomers: [
				{
					id: "timo",
					type: "person",
					attributes: {
						formattedName: "Timo Isokoski",
						customerAccountId: "timo",
						firstName: "Timo",
						lastName: "Isokoski",
						gender: "MALE",
						emails: [],
						fixedLineNumbers: [],
						postalAddresses: [],
						mobileNumbers: [{ number: "1239487" }]
					}
				},
			] as any as Array<Customer>,
			searchingForSingleCustomer: true,
			actions: {
				setActiveCustomerAccount: jest.fn(),
			}
		};
	});

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(
			<CustomerListDropdown {...minimumProps}/>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		mountWithContext(<CustomerListDropdown {...minimumProps} />);
	});

	/* Search terms have no significance when presenting results. */
	it("renders single term Customers", () => {

		const { singleTermCustomers = [] } = minimumProps;
		const wrapper = mountWithContext(
			<CustomerListDropdown {...minimumProps}
			/>
		);
		const results = wrapper.find("CustomerListDropdown");
		const customerList = results.find(".CustomerListDropdown-customer-list-dropdown");
		const customerItems = customerList
			.find(".CustomerListDropdown-dropdown-body")
			.filterWhere((node: any) => !node.hasClass("CustomerListDropdown-tile-wrapper"));

		// Expected search results to contain one customer
		expect(customerItems.hostNodes()).toHaveLength(singleTermCustomers.length);
	});

	it("displays text \"Searching for ...\" during query", () => {
		const { searchTerm = "" } = minimumProps;
		const wrapper = mountWithContext(
			<CustomerListDropdown {...minimumProps }
			/>
		);

		expect(
			wrapper
				.find(".CustomerListDropdown-customer-list-searching")
				.hostNodes()
				.text()
				.toLowerCase()
		).toEqual(("Searching for " + searchTerm).toLowerCase());
	});

	it("presents error message when Customer was not found by name", () => {
		const { singleTermCustomers = [] } = minimumProps;
		const formattedName = get(singleTermCustomers[0], "attributes.formattedName");

		const wrapper = mountWithContext(
			<CustomerListDropdown {...minimumProps}
				searchingForSingleCustomer={false}
				searchTerm={formattedName}
				singleTermCustomers={[]}
			/>
		);

		expect(
			wrapper
				.find(".CustomerListDropdown-customer-list-nothing-found")
				.hostNodes()
				.text()
				.toLowerCase()
		).toEqual(("Couldn't find anything with " + formattedName).toLowerCase());
	});
});

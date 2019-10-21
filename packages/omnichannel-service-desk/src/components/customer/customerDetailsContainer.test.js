import React from "react";
import {
	mountWithContextAndRouterProps,
	shallowWithContext,
	actions,
	TestUtils,
} from "omnichannel-common-pos";
import { ConnectedCustomerDetailsContainer } from "../../../src/components/customer/CustomerDetailsContainer";

describe("CustomerDetailsContainer", () => {
	const context = {
		flux: {
			actions: {
				SalesActions: {
					getAlternateOfferingsForProduct: jest.fn(),
				},
				BasketActions: {
					discardBackendBasket: jest.fn(),
					clearAddonInitializations: jest.fn(),
				},
			}
		},
		store: TestUtils.mockReduxStore({
			feature: {}
		})
	};

	it("succeeds at shallow mount without props", () => {
		const wrapper = shallowWithContext(<ConnectedCustomerDetailsContainer />, { context });
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount without props", () => {
		mountWithContextAndRouterProps(<ConnectedCustomerDetailsContainer />, { context });
	});

	it("renders without an active customer", () => {
		const wrapper = mountWithContextAndRouterProps(<ConnectedCustomerDetailsContainer/>, { context });
		expect(wrapper.text().toLowerCase()).toContain("No active customer".toLowerCase());
	});

	it("renders without an active customer but with an active customer case", () => {
		const wrapper = mountWithContextAndRouterProps(
			<ConnectedCustomerDetailsContainer activeCustomerCase={{}} />, { context }
		);

		expect(wrapper.text().toLowerCase()).toContain("No active customer".toLowerCase());
		expect(wrapper.text().toLowerCase()).toContain("Create new?".toLowerCase());
	});

	it("calls showCustomerCreationModal function when user wants to create a new customer", () => {
		const mockDispatch = jest.fn();

		const wrapper = mountWithContextAndRouterProps(
			<ConnectedCustomerDetailsContainer
				activeCustomerCase={{}}
			/>,
			{ context }
		);
		context.flux.reduxStore.dispatch = mockDispatch;
		wrapper.find("#customer-details-container-create-new-user").simulate("click");
		expect(mockDispatch).toHaveBeenCalledWith(actions.navBar.showCustomerCreationModal(true));
	});

	const activeCustomer = {
		id: "juanita",
		firstName: "Juanita",
	};

	const updatedNewProps = {
		activeCustomerCase: {
			attributes: {
				activeCustomer,
			}
		},
	};
	it("renders with an active customer", () => {

		const wrapper = mountWithContextAndRouterProps(
			<ConnectedCustomerDetailsContainer
				agreements={[]}
				getAgreements={() => {}}
				getCustomerOffers={() => {}}
				getSidebarNotifications={() => {}}
				activeCustomerCase={{
					attributes: {
						activeCustomer
					}
				}}
			/>,
			{ context }
		);

		wrapper.setProps({
			...updatedNewProps,
		});

		const firstNameField = wrapper.find("#newcustomer-first-name");

		expect(firstNameField.at(1).childAt(0).text().toLowerCase()).toEqual("first name");
		expect(wrapper.find(".CustomerDetailsView-subDetails-field-value").at(0).text()).toEqual(activeCustomer.firstName);
	});

	const agreements = [
		{
			id: "juanita-agreement1",
			attributes: {
				lifeCycleStatus: "ACTIVE",
				products: [
					{
						id: "juanita-agreement1-sub",
						name: "hulabaloosub"
					}
				]
			}
		}
	];

	it("renders subscriptions with an active customer", () => {
		const wrapper = mountWithContextAndRouterProps(
			<ConnectedCustomerDetailsContainer
				activeCustomerCase={{
					attributes: {
						activeCustomer
					}
				}}
				agreements={agreements}
				getAgreements={() => {}}
				getCustomerOffers={() => {}}
				getSidebarNotifications={() => {}}
			/>,
			{ context }
		);

		wrapper.setProps({
			...updatedNewProps,
		});

		expect(wrapper.find("#linkPresentCustomerSubscriptions").hostNodes()).toHaveLength(1);

		const subscription = wrapper
			.find(`#${agreements[0].attributes.products[0].id}`)
			.hostNodes();
		expect(subscription).toHaveLength(1);

		expect(subscription.text().toLowerCase()).toContain(
			agreements[0].attributes.products[0].name
		);
	});

	/* NOTE can be removed before merge */
	it("CustomerDetailsView / CustomerDetailsForm works", () => {
		const wrapper = mountWithContextAndRouterProps(
			<ConnectedCustomerDetailsContainer
				activeCustomerCase={{
					attributes: {
						activeCustomer
					}
				}}
				agreements={agreements}
				getAgreements={() => {}}
				getCustomerOffers={() => {}}
				getSidebarNotifications={() => {}}
				enableChangeCustomerData={true}
				posShowSummaryData={true}
			/>,
			{ context }
		);
		expect(wrapper).toMatchSnapshot();
	});
});

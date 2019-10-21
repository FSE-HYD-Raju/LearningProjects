import * as React from "react";
import {
	mountWithContext,
	shallowWithContext,
	TestUtils,
	Product,
} from "omnichannel-common-pos";
import { MemoryRouter } from "react-router";
import { CustomerDetailsActiveAddons, CustomerDetailsActiveAddonsProps } from "./CustomerDetailsActiveAddons";
const { agreements } = require("./testData/subscriptionTestData");

const context = {
	flux: {
		stores: {
			UserStore: TestUtils.makeStore("context.flux.stores.UserStore", {
				user: { id: ""}
			}),
		},
		actions: {
			SalesActions: {
				getProductsByIds: jest.fn(),
				getAlternateOfferingsForProduct: jest.fn(),
				getProductsFromCategory: jest.fn(),
			},
			BasketActions: {
				discardBasket: jest.fn(),
				submitBasket: jest.fn(),
			}
		}
	},
	store: TestUtils.mockReduxStore({
		lifecycle: {},
		productOfferingConfiguration: {
			configurations: {}
		},
		category: {},
		feature: {},
		cms: {},
		consul: {},
	}),
};

describe("CustomerDetailsActiveAddons", () => {
	const minProps: CustomerDetailsActiveAddonsProps = {
		selectedProduct: {
			name: "",
			id: "",
			childProducts: []
		} as any as Product,
		agreementId: "",
		subscription: {} as Product
	};

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(<CustomerDetailsActiveAddons {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		mountWithContext(<CustomerDetailsActiveAddons {...minProps} />, { context });
	});

	it("renders addons, should find 2 active", () => {
		const selectedSubscriptionProduct = agreements[0];
		const props: CustomerDetailsActiveAddonsProps = {
			...minProps,
			selectedProduct: selectedSubscriptionProduct,
			agreementId: agreements.id,
		};

		const wrapper = mountWithContext(
			<MemoryRouter>
				<CustomerDetailsActiveAddons {...props} />
			</MemoryRouter>,
			{ context });

		expect(wrapper.find("h3").text()).toEqual("Active addons");

		const rows = wrapper.find("AddonRow");
		expect(rows.length).toBeGreaterThan(0);

		const colsRow0 = rows
			.at(0)
			.find(".AddonsTabView-list-item-column")
			.hostNodes();
		expect(colsRow0.at(0).text()).toContain("Active addon product 1");
		expect(colsRow0.at(1).text()).toContain("Activation cost €50.00Recurring fee€100.00");
		expect(colsRow0.at(2).text()).toContain("01/01/2099");

		for (let i = 0; i < rows.length; ++i) {
			expect(
				rows
					.at(i)
					.find(".AddonsTabView-list-item-column")
					.hostNodes()
			).toHaveLength(5);
		}

		expect(rows.length).toEqual(2);

		expect(colsRow0.at(4).find("OcButtonWithDropdown").props().children.length).toEqual(5);
	});
});

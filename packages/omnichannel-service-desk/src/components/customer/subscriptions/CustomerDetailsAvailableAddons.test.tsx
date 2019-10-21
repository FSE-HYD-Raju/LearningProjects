import * as React from "react";
import {
	mountWithContext,
	shallowWithContext,
	TestUtils,
	Product
} from "omnichannel-common-pos";
import { MemoryRouter } from "react-router";
import { CustomerDetailsAvailableAddons, CustomerDetailsAvailableAddonsProps } from "./CustomerDetailsAvailableAddons";
import { ReactWrapper } from "enzyme";
const { availableAddons } = require("./testData/subscriptionTestData");

const context = {
	flux: {
		stores: {
			UserStore: TestUtils.makeStore("context.flux.stores.UserStore", {
				user: { id: ""}
			}),
		},
		actions: {
			SalesActions: TestUtils.makeActions("context.flux.actions.SalesActions"),
		}
	},
	store: TestUtils.mockReduxStore({
		lifecycle: {}
	}),
};

describe("CustomerDetailsAvailableAddons", () => {
	const minProps: CustomerDetailsAvailableAddonsProps = {
		availableAddons: [],
		selectedProduct: {
			name: "",
			id: "",
			childProducts: []
		} as any as Product,
		agreementId: "",
	};

	it("succeeds at shallow mount with min props", () => {
		const wrapper = shallowWithContext(<CustomerDetailsAvailableAddons {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with min props", () => {
		mountWithContext(<CustomerDetailsAvailableAddons {...minProps} />, { context });
	});

	it("renders addons, should find 10 available services", () => {
		const props: CustomerDetailsAvailableAddonsProps = {
			...minProps,
			agreementId: "gooby-plan-1",
			availableAddons,
		};

		const wrapper = mountWithContext(
			<MemoryRouter>
				<CustomerDetailsAvailableAddons {...props} />
			</MemoryRouter>,
			{ context }
		);

		expect(wrapper.find("h3").text()).toEqual("Available addons");

		const rows = wrapper.find("AddonRow");
		expect(rows.length).toBeGreaterThan(0);

		const tempBarringPoRow = rows.filterWhere(
			(n: ReactWrapper) => {
				return n.children().find("span").at(0).text().toLowerCase() === "Temporary suspension - Customer initiated barring".toLowerCase();
			}
		);

		expect(tempBarringPoRow.find(".AddonsTabView-fees").text()).toContain("Activation cost €1.00Recurring fee€5.00");
	});

	it("renders addons, should show no available services", () => {
		const props: CustomerDetailsAvailableAddonsProps = {
			...minProps,
			agreementId: "gooby-plan-1",
			availableAddons: [],
		};

		const wrapper = mountWithContext(
			<MemoryRouter>
				<CustomerDetailsAvailableAddons {...props} />
			</MemoryRouter>,
			{ context }
		);

		expect(wrapper.find("h3").text()).toEqual("Available addons (none available)");

		const rows = wrapper.find("AddonRow");
		expect(rows.length).toEqual(0);
	});
});

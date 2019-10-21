import * as React from "react";

import {
	mockRouterProps,
	mountWithContext,
	shallowWithContext,
	mountWithContextAndRouterProps
} from "omnichannel-common-pos";

import { StartCustomerCaseRaw } from "./StartCustomerCase";

describe("StartCustomerCase", () => {
	const minProps = {
		actions: {
			createNewCustomerCase: jest.fn(),
		},
		toolmode: false,
		salesRepId: "sales-rep-id",
		location: mockRouterProps.location,
		history: mockRouterProps.history,
		match: mockRouterProps.match,
		staticContext: mockRouterProps.staticContext,
	};

	it("succeeds at shallow mount with min props", () => {
		const wrapper = shallowWithContext(<StartCustomerCaseRaw {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with min props", () => {
		mountWithContext(<StartCustomerCaseRaw {...minProps} />);
	});

	it("renders with minimum props", () => {
		const wrapper = mountWithContext(
			<StartCustomerCaseRaw
				{...minProps}
			/>
		);

		const button = wrapper.find("#buttonStartNewCustomerCase").hostNodes();
		expect(button).toHaveLength(1);
		expect(wrapper.find("#buttonStartNewCustomerCase").hostNodes()).toHaveLength(1);
		expect(button.text().toLowerCase()).toEqual("Start new customer case".toLowerCase());
	});

	it("calls given createNewCustomerCase() with the id of current sales representative", () => {
		const salesRepId = "666";

		const props = {
			...minProps,
			salesRepId,
			actions: {
				createNewCustomerCase: jest.fn(),
			}
		};

		const createNewCustomerCaseSpy = props.actions.createNewCustomerCase;

		const wrapper = mountWithContextAndRouterProps(
			<StartCustomerCaseRaw {...props} />
		);

		const button = wrapper.find("#buttonStartNewCustomerCase").hostNodes();
		button.simulate("click");
		expect(createNewCustomerCaseSpy).toHaveBeenCalledWith(salesRepId);
	});
});

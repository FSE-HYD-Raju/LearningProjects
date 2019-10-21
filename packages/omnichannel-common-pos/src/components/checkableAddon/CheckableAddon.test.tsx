import * as React from "react";
import { shallowWithContext } from "../../testUtils";
import CheckableAddon, { CheckableAddonProps } from "./CheckableAddon";
import { ReactWrapper } from "enzyme";

describe("CheckableAddon", () => {
	let wrapper: ReactWrapper;
	let props: CheckableAddonProps;
	const getProps = (props: CheckableAddonProps | object = {}): CheckableAddonProps =>
		({
			...{
				id: "1",
				title: "Extra SIM with 4 GB data",
				shortDescription: "Get additional SIM card to use with this card",
				longDescription: "Get additional SIM card to use with this card",
				period: "MONTH",
				price: "5.50 $",
				checked: true,
				onChange: jest.fn()
			},
			...props
		});

	beforeEach(() => {
		props = getProps();
	});

	afterEach(() => {
		if (wrapper) {
			wrapper.unmount();
		}
	});

	it("succeeds at shallow mount with minimum props", () => {
		wrapper = shallowWithContext(<CheckableAddon {...props} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("onClick should be called", () => {
		wrapper = shallowWithContext(<CheckableAddon {...props} />);
		wrapper.find("[id='CheckableAddon-1']").simulate("change");
		expect(props.onChange).toBeCalled();
	});
});

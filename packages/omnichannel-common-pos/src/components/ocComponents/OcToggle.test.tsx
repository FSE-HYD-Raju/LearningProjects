import * as React from "react";
import { mountWithContext, shallowWithContext } from "../../testUtils";
import OcToggle from "./OcToggle";

describe("OcToggle", () => {
	it("succeeds at shallow mount without props", () => {
		const wrapper = shallowWithContext(<OcToggle />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount without props", () => {
		const wrapper = mountWithContext(<OcToggle />);
		expect(wrapper).toMatchSnapshot();
	});

	it("should change state when clicked and call click handler", () => {
		const props = {
			id: "aybabtu",
			handleClick: () => {
				// console.log("MOCKED props.handleClick()");
			}
		};

		const handleSpy = jest.spyOn(props, "handleClick");
		const wrapper = mountWithContext(<OcToggle {...props} />);

		expect(!wrapper.state().active).toEqual(true); // "OcToggle should not be active initially"

		wrapper
			.find("#aybabtu")
			.hostNodes()
			.simulate("click");

		expect(!wrapper.state().active).toEqual(false); // "OcToggle should be active after a click"

		expect(handleSpy).toHaveBeenCalled();
	});

	it("should use given custom labels instead of the default ones", () => {
		const enabledMessage = "Yes";
		const disabledMessage = "No";

		const wrapper = mountWithContext(
			<OcToggle
				enabledLabel={enabledMessage}
				disabledLabel={disabledMessage}
			/>
		);

		expect(wrapper.prop("enabledLabel")).toEqual(enabledMessage);
		expect(wrapper.prop("disabledLabel")).toEqual(disabledMessage);

		/* maybe there's a smarter way of finding the labels. */
		const messages = wrapper
			.find("div")
			.filterWhere((n: any) => n.children().length === 0 && n.text() !== "");
		expect(messages.length).toEqual(2);

		const first = messages.at(0);
		const second = messages.at(1);

		expect(
			first.text() === enabledMessage || first.text() === disabledMessage
		).toEqual(true);

		if (enabledMessage === first.text()) {
			expect(second.text()).toEqual(disabledMessage);
		} else if (disabledMessage === first.text()) {
			expect(second.text()).toEqual(enabledMessage);
		}
	});
});

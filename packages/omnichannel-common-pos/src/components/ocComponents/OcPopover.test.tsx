import * as React from "react";
import { mountWithContext, shallowWithContext } from "../../testUtils";
import OcPopover, { OcPopoverProps } from "./OcPopover";

describe("OcPopover", () => {
	let minProps: OcPopoverProps;

	beforeAll(() => {
		minProps = {
			id: "popover-id",
			placement: "top",
			content: "some stuff",
			trigger: "click"
		};
	});

	it("succeeds at shallow mount with min props", () => {
		const wrapper = shallowWithContext(
			<OcPopover {...minProps}>
				<span />
			</OcPopover>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with min props", () => {
		const wrapper = mountWithContext(
			<OcPopover {...minProps} />
		);
		expect(wrapper).toMatchSnapshot();
	});
});

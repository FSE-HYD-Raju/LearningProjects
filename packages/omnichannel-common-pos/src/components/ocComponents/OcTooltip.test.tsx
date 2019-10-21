import * as React from "react";
import { mountWithContext, shallowWithContext } from "../../testUtils";
import OcTooltip, { OcTooltipProps } from "./OcTooltip";

describe("OcTooltip", () => {
	let minProps: OcTooltipProps;

	beforeAll(() => {
		minProps = {
			id: "tooltip-id",
			placement: "top",
			message: "dummy message"
		};
	});

	it("succeeds at shallow mount with min props", () => {
		const wrapper = shallowWithContext(
			<OcTooltip {...minProps}>
				<span />
			</OcTooltip>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with min props", () => {
		const wrapper = mountWithContext(
			<OcTooltip {...minProps} />
		);
		expect(wrapper).toMatchSnapshot();
	});
});

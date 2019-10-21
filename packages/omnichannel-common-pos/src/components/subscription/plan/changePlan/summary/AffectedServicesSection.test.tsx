import * as React from "react";
import { AffectedServicesSection, AffectedServicesSectionProps } from "./AffectedServicesSection";
import { shallowWithContext } from "../../../../../testUtils";

describe("AffectedServicesSection", () => {
	const minProps: AffectedServicesSectionProps = {
		compatibleAddonsNames: ["new data", "new sms"],
		incompatibleAddonsNames: ["old data", "old voice"],
		maxInitialCountToShow: 3,
	};

	it("succeeds at shallow mount with minimal props", () => {
		const wrapper = shallowWithContext(<AffectedServicesSection {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});
	it("should not render anything when no addons", () => {
		const wrapper = shallowWithContext(<AffectedServicesSection {...minProps} compatibleAddonsNames={[]} incompatibleAddonsNames={[]} />);
		expect(wrapper.isEmptyRender()).toBeTruthy();
	});
});

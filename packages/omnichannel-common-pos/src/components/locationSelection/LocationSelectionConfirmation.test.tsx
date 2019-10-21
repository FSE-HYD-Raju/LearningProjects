import * as React from "react";
import { shallowWithContext, mountWithContext } from "../../testUtils";

import LocationSelectionConfirmation, { LocationSelectionConfirmationProps } from "./LocationSelectionConfirmation";

describe("LocationSelectionConfirmation", () => {
	const minProps: LocationSelectionConfirmationProps = {
		showingLocations: false,
		selectedLocation: "en",
		confirmLocation: jest.fn(),
		handleNoAnotherArea: jest.fn(),
	};

	it("succeeds at shallow mount without props", () => {
		const wrapper = shallowWithContext(<LocationSelectionConfirmation {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount without props", () => {
		mountWithContext(<LocationSelectionConfirmation {...minProps} />);
	});
});

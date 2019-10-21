import * as React from "react";
import { mountWithContext, shallowWithContext } from "../../../testUtils";
import { AddonsViewContent, AddonsViewContentProps } from "./AddonsViewContent";
import { Product } from "../../../redux/types";

describe("AddonsViewContent", () => {
	const minProps: AddonsViewContentProps = {
		actions: {
			getAvailableAddonProducts: jest.fn(),
			getAlternateOfferingsForProduct: jest.fn(),
			initializeStateTransition: jest.fn(),
		},
		activeAddons: [],
		availableAddons: [],
		addonPaginationCount: 1,
		agreementId: "id",
		product: {} as any as Product,
		lifecycleFilter: "Active",
		showActions: true,
	};

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(<AddonsViewContent {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		mountWithContext(<AddonsViewContent {...minProps} />);
	});
});

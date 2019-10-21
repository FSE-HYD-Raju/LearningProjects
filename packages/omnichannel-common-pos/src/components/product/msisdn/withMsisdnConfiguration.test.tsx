import * as React from "react";
import { mountWithContext, shallowWithContext } from "../../../testUtils";

import {
	MsisdnConfigurationProps,
	withMsisdnConfiguration,
	MsisdnConfigurationProviderProps
} from "./withMsisdnConfiguration";
import { ProductOffering } from "../../../redux/types";
import { FluxMock } from "../../../channelUtils";

const minPO: ProductOffering = {
	id: "123",
	name: "Test PO",
	categories: [],
	featureCharacteristics: [],
	inputCharacteristics: {},
	instanceCharacteristics: {},
	prices: [],
	commercialEnrichments: [],
	productOfferingGroups: [],
	productOfferings: [],
	selected: false,
	relationships: {},
};

const minProps: MsisdnConfigurationProviderProps<MsisdnConfigurationProps> = {
	product: minPO,
	configurations: {},
};

const TestComponent: React.FC<MsisdnConfigurationProps> = (props: MsisdnConfigurationProps) => {
	return (<div id="testComponent"/>);
};

describe("MsisdnConfiguraionProvider", () => {
	it("succeeds at shallow mount with minimal props", () => {
		const WithWrapper = withMsisdnConfiguration<MsisdnConfigurationProps>(TestComponent);

		const wrapper = shallowWithContext(<WithWrapper {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at mount  with minimal props", () => {
		const WithWrapper = withMsisdnConfiguration<MsisdnConfigurationProps>(TestComponent);

		mountWithContext(<WithWrapper {...minProps} />);
	});
});

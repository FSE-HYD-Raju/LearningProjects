import * as React from "react";
import {
	mountWithContext,
	shallowWithContext,
	SimpleDataMock
} from "../../testUtils/";

import MarketingConsentForm from "./MarketingConsentForm";

describe("MarketingConsentForm", () => {
	let context: any;
	let minimumProps: any;

	beforeEach(() => {
		context = SimpleDataMock.getConsulContextMock();
		minimumProps = {
			model: null,
			schema: {}
		};
	});

	it("succeeds at shallow mount with min props", () => {
		const wrapper = shallowWithContext(
			<MarketingConsentForm {...minimumProps} />,
			{ context }
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with min props", () => {
		mountWithContext(<MarketingConsentForm {...minimumProps} />, { context });
	});

	it("displays all the consent options after clicking the main one", () => {
		const onChangeSpy = jest.fn();

		const mapConsentAliasToProductCharacteristic: any = {
			ownMarketing: "CH_MCP_Own_Marketing",
			thirdPartyMarketing: "CH_MCP_3rd_Party_Marketing",
			geoLocalization: "CH_MCP_Geo_Localization",
			profiling: "CH_MCP_Profiling",
			thirdPartyEnrichment: "CH_MCP_3rd_Party_Enrichment",
			thirdPartyTransfer: "CH_MCP_3rd_Party_Transfer"
		};

		const wrapper = mountWithContext(
			<MarketingConsentForm
				{...minimumProps}
				giveProductCharacteristicForConsentAlias={(alias: string) => mapConsentAliasToProductCharacteristic[alias]}
				onChange={onChangeSpy}
			/>,
			{ context }
		);

		expect(wrapper.find(".MarketingConsentForm-marketing-consent-input-container").length).toEqual(0);

		wrapper
			.find("input[name='toggle-view']")
			.at(0)
			.simulate("click");

		wrapper.update();

		expect(wrapper.find(".MarketingConsentForm-marketing-consent-input-container").length).toEqual(6);
	});

	it("form remembers your old inputs even if you close and reopen it", () => {
		const onChangeSpy = jest.fn();

		const mapConsentAliasToProductCharacteristic: any = {
			ownMarketing: "CH_MCP_Own_Marketing",
			thirdPartyMarketing: "CH_MCP_3rd_Party_Marketing",
			geoLocalization: "CH_MCP_Geo_Localization",
			profiling: "CH_MCP_Profiling",
			thirdPartyEnrichment: "CH_MCP_3rd_Party_Enrichment",
			thirdPartyTransfer: "CH_MCP_3rd_Party_Transfer"
		};

		const wrapper = mountWithContext(
			<MarketingConsentForm
				{...minimumProps}
				giveProductCharacteristicForConsentAlias={(alias: string) =>
					mapConsentAliasToProductCharacteristic[alias]}
				onChange={onChangeSpy}
			/>,
			{ context }
		);

		wrapper
			.find("input[name='toggle-view']")
			.at(0)
			.simulate("click");

		wrapper.update();

		expect(onChangeSpy).lastCalledWith({
			CH_MCP_3rd_Party_Enrichment: true,
			CH_MCP_3rd_Party_Marketing: true,
			CH_MCP_3rd_Party_Transfer: true,
			CH_MCP_Geo_Localization: true,
			CH_MCP_Own_Marketing: true,
			CH_MCP_Profiling: true
			}
		);

		wrapper
			.find("input[name='ownMarketing']")
			.at(0)
			.simulate("click");

		expect(onChangeSpy).lastCalledWith({
			CH_MCP_3rd_Party_Enrichment: true,
			CH_MCP_3rd_Party_Marketing: true,
			CH_MCP_3rd_Party_Transfer: true,
			CH_MCP_Geo_Localization: true,
			CH_MCP_Own_Marketing: false,
			CH_MCP_Profiling: true
			}
		);

		wrapper
			.find("input[name='toggle-view']")
			.at(0)
			.simulate("click");

		wrapper.update();

		expect(onChangeSpy).lastCalledWith({
			CH_MCP_3rd_Party_Enrichment: false,
			CH_MCP_3rd_Party_Marketing: false,
			CH_MCP_3rd_Party_Transfer: false,
			CH_MCP_Geo_Localization: false,
			CH_MCP_Own_Marketing: false,
			CH_MCP_Profiling: false
			}
		);

		wrapper
			.find("input[name='toggle-view']")
			.at(0)
			.simulate("click");

		wrapper.update();

		expect(onChangeSpy).lastCalledWith({
			CH_MCP_3rd_Party_Enrichment: true,
			CH_MCP_3rd_Party_Marketing: true,
			CH_MCP_3rd_Party_Transfer: true,
			CH_MCP_Geo_Localization: true,
			CH_MCP_Own_Marketing: false,
			CH_MCP_Profiling: true
			}
		);
	});

	it("forwards all entered data on every change event", () => {
		const onChangeSpy = jest.fn();

		const mapConsentAliasToProductCharacteristic: any = {
			ownMarketing: "CH_MCP_Own_Marketing",
			thirdPartyMarketing: "CH_MCP_3rd_Party_Marketing",
			geoLocalization: "CH_MCP_Geo_Localization",
			profiling: "CH_MCP_Profiling",
			thirdPartyEnrichment: "CH_MCP_3rd_Party_Enrichment",
			thirdPartyTransfer: "CH_MCP_3rd_Party_Transfer"
		};

		const wrapper = mountWithContext(
			<MarketingConsentForm
				{...minimumProps}
				giveProductCharacteristicForConsentAlias={(alias: string) => mapConsentAliasToProductCharacteristic[alias]}
				onChange={onChangeSpy}
			/>,
			{ context }
		);

		wrapper
			.find("input[name='toggle-view']")
			.at(0)
			.simulate("click");

		wrapper.update();

		wrapper
			.find("input[name='ownMarketing']")
			.at(0)
			.simulate("click");

		expect(onChangeSpy).lastCalledWith({
			CH_MCP_3rd_Party_Enrichment: true,
			CH_MCP_3rd_Party_Marketing: true,
			CH_MCP_3rd_Party_Transfer: true,
			CH_MCP_Geo_Localization: true,
			CH_MCP_Own_Marketing: false,
			CH_MCP_Profiling: true
			}
		);

		wrapper
			.find("input[name='thirdPartyMarketing']")
			.at(0)
			.simulate("click");

		expect(onChangeSpy).lastCalledWith({
			CH_MCP_3rd_Party_Enrichment: true,
			CH_MCP_3rd_Party_Marketing: false,
			CH_MCP_3rd_Party_Transfer: true,
			CH_MCP_Geo_Localization: true,
			CH_MCP_Own_Marketing: false,
			CH_MCP_Profiling: true
			}
		);
	});
});

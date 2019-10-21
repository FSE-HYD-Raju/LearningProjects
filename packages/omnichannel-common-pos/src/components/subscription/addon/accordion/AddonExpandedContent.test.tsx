import * as React from "react";
import { shallow } from "enzyme";

import { AddonExpandedContent, AddonExpandedContentProps } from "./AddonExpandedContent";
import { mountWithContext } from "../../../../testUtils";
import { Product, ProductOffering } from "../../../../redux/types";

describe("AddonExpandedContent", () => {
	const minProps: AddonExpandedContentProps = {
		addon: {} as any as ProductOffering
	};
	it("should succeed at shallow mount without props", () => {
		const wrapper = shallow(<AddonExpandedContent {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("should succeed at deep mount without props", () => {
		mountWithContext(<AddonExpandedContent {...minProps} />);
	});

	it("should render items with props", () => {
		const props: AddonExpandedContentProps = {
			addon: {
				id: "juanita-agreement1-addon-favnum",
				name: "Five favorite numbers",
				productOfferingId: "fav-num-po",
				lifeCycleStatus: "ACTIVE",
				usageCounters: [],
				realizingResources: [],
				realizingServices: [],
				characteristics: {
					number1: "+358408838271",
					number2: "+358408838272",
					number5: "+358408838275",
					number4: "+358408838274",
					number3: "+358408838273"
				},
				specType: "PRODUCT",
				specSubType: "ADDITIONAL",
				prices: [
					{
						type: "RECURRENT",
						name: null,
						chargedUnit: {
							amount: 1,
							currency: null,
							unitOfMeasure: "PIECES"
						},
						taxAmount: null,
						taxFreeAmount: 4.5,
						taxRate: 0,
						recurringChargePeriod: {
							count: 1,
							interval: "MONTH"
						},
						currency: "EUR",
						conditions: null,
						originalPrice: null
					}
				],
				allowedTransitions: [
					{
						id: "reactivate",
						name: "reactivate",
						targetType: "product"
					},
					{
						id: "resume",
						name: "resume",
						targetType: "product"
					}
				],
				agreementId: "juanita-agreement1"
			} as any as Product
		};

		const wrapper = mountWithContext(<AddonExpandedContent {...props} />);

		const expandedContent = wrapper.find("#addon-expanded-content-juanita-agreement1-addon-favnum");
		expect(expandedContent.hostNodes()).toHaveLength(1);

		const characteristics = wrapper.find("CharacteristicsContent");
		expect(characteristics).toHaveLength(1);

		const listItems = wrapper.find(".AddonsTabView-addon-expanded-content-characteristic-list-item");
		expect(listItems.hostNodes()).toHaveLength(5);
	});
});

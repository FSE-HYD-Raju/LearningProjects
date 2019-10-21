import * as React from "react";
import { mountWithContext, shallowWithContext } from "../../../../testUtils";
import { Product, UnitOfMeasureEnum } from "../../../../redux/types";
import { ProductDescriptionPopover } from "./ProductDescriptionPopover";

describe("ProductDescriptionPopover", () => {
	const minProps = {
		plan: {
			id: "basic-hybrid-po",
			name: "Hybric Basic Plan",
			commercialEnrichments: [{
				descriptions: {
					detailed: "detailed description"
				},
			}],
			characteristics: {
				"home-zone": "my region",
			},
			usageCounters: [
				{
					counterId: "sms-usage",
					name: "sms-usage-counter",
					value: 10,
					unitOfMeasure: UnitOfMeasureEnum.SMS,
					limits: [
						{
							name: "min",
							value: 10,
							validFor: {
								startDate: "01.01.2019"
							}
						}
					]
				}
			]
		} as any as Product,
	};

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(<ProductDescriptionPopover {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		mountWithContext(<ProductDescriptionPopover {...minProps} />);
	});
});

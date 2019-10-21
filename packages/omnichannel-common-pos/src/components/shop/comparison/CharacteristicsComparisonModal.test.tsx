import * as React from "react";

import {
	mountWithContext,
	shallowWithContext,
	TestUtils
} from "../../../testUtils";
import CharacteristicsComparisonModal, { CharacteristicsComparisonModalProps } from "./CharacteristicsComparisonModal";
import { ProductOffering } from "../../../redux/types";
import { Configurations } from "../../../index";

describe("CharacteristicsComparisonModal", () => {

	const minProps: CharacteristicsComparisonModalProps = {
		items: [] as any as Array<ProductOffering>,
		open: true,
		comparisonCharacteristics: {},
		configurations: {} as any as Configurations,
		category: "",
		actions: {
			addProductToBasket: jest.fn(),
			hide: jest.fn(),
			showConfigurationModalForProduct: jest.fn(),
		}
	};

	it("succeeds at shallow mount with min props", () => {
		const wrapper = shallowWithContext(<CharacteristicsComparisonModal {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount without props", () => {
		mountWithContext(<CharacteristicsComparisonModal {...minProps}/>);
	});

	it("renders given items", () => {
		const props = {
			...minProps,
			items: [
				{
					id: "oneminus-two-po",
					attributes: {
						name: "OneMinus Two",
						categories: ["device", "mobile-phone"],
						instanceCharacteristics: {},
						commercialEnrichments: [
							{
								names: {
									name: "OneMinus Two"
								}
							}
						]
					}
				},
				{
					id: "music-po",
					attributes: {
						name: "Music Streaming Service",
						categories: ["service", "entertainment", "addon"],
						instanceCharacteristics: {},
						commercialEnrichments: [
							{
									names: {
									name: "Music Streaming Service"
								}
							}
						]
					}
				},
				{
					id: "ypad-po",
					attributes: {
						name: "Appelsiini yPad Pro",
						categories: ["device", "tablet"],
						instanceCharacteristics: {},
						commercialEnrichments: [
							{
								names: {
									name: "Appelsiini yPad Pro"
								}
							}
						]
					}
				}
			] as any as Array<ProductOffering>,
			open: true
		};

		const { getModalContents } = TestUtils;

		const wrapper = mountWithContext(
			<CharacteristicsComparisonModal {...props} />
		);

		const modalContents = getModalContents(wrapper);

		const mugshots = modalContents.find(
			".CharacteristicsComparisonModal-mugshot"
		);
		const presentedMobileDevicesNames = [];
		for (let i = 0; i < mugshots.length; ++i) {
			presentedMobileDevicesNames.push(mugshots.at(i).text());
		}

		const givenMobileDevicesNames = props.items.map((item: ProductOffering) => item.attributes!.name);
		expect(presentedMobileDevicesNames.sort()).toEqual(givenMobileDevicesNames.sort());
	});
});

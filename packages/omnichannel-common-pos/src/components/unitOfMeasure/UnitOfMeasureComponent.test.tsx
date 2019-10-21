import * as React from "react";
import { mountWithContext, shallowWithContext } from "../../testUtils";
import UnitOfMeasure from "./UnitOfMeasure";
import { UnitOfMeasureType, UnitOfMeasureEnum } from "../../redux/types";

describe("UnitOfMeasure", () => {
	it("succeeds at shallow mount with no props", () => {
		const wrapper = shallowWithContext(<UnitOfMeasure />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with no props", () => {
		mountWithContext(<UnitOfMeasure />);
	});

	it("renders a monetary amount with currency", () => {
		const props = {
			unit: UnitOfMeasureEnum.MONETARY,
			value: 666.67,
			currency: "EUR"
		};
		const wrapper = mountWithContext(<UnitOfMeasure {...props} />);

		expect(wrapper.text()).toMatch(new RegExp(`€\s*${props.value}`));
	});

	describe("renders units for every single UnitOfMeasureEnum value", () => {
		Object.keys(UnitOfMeasureEnum).forEach((key: string, index: number) =>
			it(key, () => {
				const value = 10;
				const wrapper = mountWithContext(
					<UnitOfMeasure unit={UnitOfMeasureEnum[index] as UnitOfMeasureType} value={value} />
				);
				expect(wrapper.text().toLowerCase()).toContain(value);
			})
		);
	});

	it("renders only value when unit is undefined", () => {
		const value = 15;
		const wrapper = mountWithContext(<UnitOfMeasure value={value} />);
		expect(wrapper.text().toLowerCase()).toEqual(String(value));
	});
});

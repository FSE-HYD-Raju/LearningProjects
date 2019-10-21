import * as React from "react";
import { mountWithContext, shallowWithContext } from "../../testUtils";
import PriceHolder, { PriceHolderProps } from "../../../src/components/prices/PriceHolder";

describe("PriceHolder", () => {
	let minProps: PriceHolderProps;

	beforeAll(() => {
		minProps = {
			prices: [],
			currency: "EUR",
			onClick: () => {}
		};
	});

	it("succeeds at shallow mount with min props", () => {
		const wrapper = shallowWithContext(<PriceHolder {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with min props", () => {
		mountWithContext(<PriceHolder {...minProps} />);
	});

	it("should put correct values in onClick method", () => {
		const onClickSpy = jest.fn();
		const props = {
			...minProps,
			prices: [10, 20],
			onClick: onClickSpy
		};

		const wrapper = mountWithContext(<PriceHolder {...props} />);

		wrapper
			.find(".PriceHolder-container")
			.at(0)
			.simulate("click");
		expect(onClickSpy).lastCalledWith(10);

		wrapper
			.find(".PriceHolder-container")
			.at(1)
			.simulate("click");
		expect(onClickSpy).lastCalledWith(20);
	});

	it("should render two rows for twoRowsView=true", () => {
		const props = {
			...minProps,
			twoRowsView: true,
			prices: [10, 20]
		};

		const wrapper = mountWithContext(<PriceHolder {...props} />);

		expect(wrapper.find(".PriceHolder-row").length).toBe(2);
	});
});

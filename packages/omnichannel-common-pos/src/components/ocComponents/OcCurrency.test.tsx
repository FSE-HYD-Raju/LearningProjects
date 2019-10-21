import * as React from "react";
import { mountWithContext, shallowWithContext } from "../../testUtils";
import OcCurrency from "./OcCurrency";

describe("OcCurrency", () => {
	it("succeeds at shallow mount with min props", () => {
		shallowWithContext(<OcCurrency currency="EUR" cost={0} />);
	});

	it("succeeds at deep mount with min props", () => {
		mountWithContext(<OcCurrency currency="EUR" cost={0} />);
	});

	it("says \"N/A\" when currency is given but price is not", () => {
		const wrapper = mountWithContext(
			<OcCurrency currency="EUR" cost={NaN} />
		);
		expect(wrapper.text().toLowerCase()).toEqual("-".toLowerCase());
	});

	it("should round price", () => {
		const wrapper = mountWithContext(
			<OcCurrency round={true} currency="USD" cost={10} />
		);
		expect(wrapper.text()).toEqual("$10");
	});
	it("should render zero price when cost not defined and allowUndefined=true", () => {
		const wrapper = mountWithContext(
			<OcCurrency round={true} currency="USD" cost={undefined} allowUndefined={true} />
		);
		expect(wrapper.text()).toEqual("$0");
	});
	it("should not render zero price when doNotShowZero=true", () => {
		const wrapper = mountWithContext(
			<OcCurrency round={true} currency="USD" cost={0} doNotShowZero={true} />
		);
		expect(wrapper.text()).toEqual("-");
	});
	it("should display recurring interval", () => {
		const wrapper = mountWithContext(
			<OcCurrency round={true} currency="USD" cost={10} recurringInterval={{count: 1, interval: "MONTH"}} />
		);
		expect(wrapper.text()).toEqual("$10/mo");
	});
});

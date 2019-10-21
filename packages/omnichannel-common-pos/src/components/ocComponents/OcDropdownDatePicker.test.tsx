import * as React from "react";
import toJson from "enzyme-to-json";
import * as moment from "moment";

import { mountWithContext, shallowWithContext } from "../../testUtils";

import OcDropdownDatePicker from "./OcDropdownDatePicker";

describe("OcDropdownDatePicker", () => {
	it("succeeds at shallow mount without props", () => {
		const wrapper = shallowWithContext(<OcDropdownDatePicker />);
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it("succeeds at deep mount without props", () => {
		mountWithContext(<OcDropdownDatePicker />);
	});

	it("should render dropdowns", () => {
		const wrapper = mountWithContext(<OcDropdownDatePicker />);

		const dropdowns = wrapper.find("select");
		expect(dropdowns.length).toEqual(3);

		const monthOptions = dropdowns.at(0).find("option");
		expect(monthOptions.length).toEqual(13);
		expect(monthOptions.at(0).text()).toEqual("");
		expect(monthOptions.at(1).text()).toEqual("Jan");

		const dayOptions = dropdowns.at(1).find("option");
		expect(dayOptions.length).toEqual(32);
		expect(dayOptions.at(0).text()).toEqual("");
		expect(dayOptions.at(1).text()).toEqual("1");

		const yearOptions = dropdowns.at(2).find("option");
		expect(yearOptions.length).toEqual(102);
		expect(yearOptions.at(0).text()).toEqual("");
	});

	it("should render label", () => {
		const label = "A Label";

		const wrapper = mountWithContext(
			<OcDropdownDatePicker placeholder={label} />
		);

		expect(wrapper.find("label").text()).toEqual(label);

		const dropdowns = wrapper.find("select");
		expect(dropdowns.length).toEqual(3);
	});

	it("should produce onChange events with proper dates", () => {
		let lastResult = null;

		const onChange = (date: Date) => {
			lastResult = date;
		};

		const wrapper = mountWithContext(
			<OcDropdownDatePicker onChange={onChange} />
		);

		const dropdowns = wrapper.find("select");

		dropdowns.at(0).simulate("change", {
			target: { value: "Feb" }
		});

		/* onChange() should not have been called yet due to an impartial date */
		expect(lastResult).toEqual(null);

		dropdowns.at(1).simulate("change", {
			target: { value: "30" }
		});

		/* onChange() should not have been called yet due to an impartial date */
		expect(lastResult).toEqual(null);

		dropdowns.at(2).simulate("change", {
			target: { value: "2000" }
		});

		/* onChange() should not have been called for an invalid date of Feb 30 */
		expect(lastResult).toEqual(null);

		dropdowns.at(1).simulate("change", {
			target: { value: "28" }
		});
		expect(lastResult).toEqual(
			moment.utc({ year: 2000, month: 1, day: 28 }).toDate()
		); // valid date

		dropdowns.at(0).simulate("change", {
			target: { value: "Jan" }
		});

		dropdowns.at(1).simulate("change", {
			target: { value: "31" }
		});

		expect(lastResult).toEqual(
			moment.utc({ year: 2000, month: 0, day: 31 }).toDate()
		);

		dropdowns.at(0).simulate("change", {
			target: { value: "Feb" }
		});

		expect(lastResult).toEqual(
			moment.utc({ year: 2000, month: 0, day: 31 }).toDate()
		); // Currently component does not actually change month if it's not valid with selected date

		dropdowns.at(0).simulate("change", {
			target: { value: "Mar" }
		});

		expect(lastResult).toEqual(
			moment.utc({ year: 2000, month: 2, day: 31 }).toDate()
		);

		dropdowns.at(1).simulate("change", {
			target: { value: "1" }
		});

		expect(lastResult).toEqual(
			moment.utc({ year: 2000, month: 2, day: 1 }).toDate()
		);

		dropdowns.at(0).simulate("change", {
			target: { value: "Dec" }
		});

		dropdowns.at(1).simulate("change", {
			target: { value: "31" }
		});

		expect(lastResult).toEqual(
			moment.utc({ year: 2000, month: 11, day: 31 }).toDate()
		);

	});

	it("should use locale prop", () => {
		let lastResult = null;

		const onChange = (date: Date) => {
			lastResult = date;
		};

		const wrapper = mountWithContext(
			<OcDropdownDatePicker onChange={onChange} locale="fi" />
		);

		const dropdowns = wrapper.find("select");

		const monthOptions = dropdowns.at(0).find("option");
		expect(monthOptions.length).toEqual(13);
		expect(monthOptions.at(0).text()).toEqual("");
		expect(monthOptions.at(1).text()).toEqual("tammi");

		dropdowns.at(0).simulate("change", {
			target: { value: "maalis" }
		});

		/* onChange() should not have been called yet due to an impartial date */
		expect(lastResult).toEqual(null);

		dropdowns.at(1).simulate("change", {
			target: { value: "10" }
		});

		/* onChange() should not have been called yet due to an impartial date */
		expect(lastResult).toEqual(null);

		dropdowns.at(2).simulate("change", {
			target: { value: "2020" }
		});
		expect(lastResult).toEqual(
			moment.utc({ year: 2020, month: 2, day: 10 }).toDate()
		); // valid date
	});

	it("uses given date set as value", () => {
		const date = new Date(2017, 8, 19);
		const wrapper = mountWithContext(<OcDropdownDatePicker value={date} />);

		expect(
			wrapper.find(".OcDropdownDatePicker-month").props().value
		).toEqual("Sep");
		expect(
			String(wrapper.find(".OcDropdownDatePicker-day").props().value)
		).toEqual("19");
		expect(
			String(wrapper.find(".OcDropdownDatePicker-year").props().value)
		).toEqual("2017");
	});

	it("uses given date set as defaultValue", () => {
		const date = new Date(2017, 8, 19);
		const wrapper = mountWithContext(<OcDropdownDatePicker value={date} />);

		expect(
			wrapper.find(".OcDropdownDatePicker-month").props().defaultValue
		).toEqual("Sep");
		expect(
			String(
				wrapper.find(".OcDropdownDatePicker-day").props().defaultValue
			)
		).toEqual("19");
		expect(
			String(
				wrapper.find(".OcDropdownDatePicker-year").props().defaultValue
			)
		).toEqual("2017");
	});

	it("allows setting date after none given", () => {
		const wrapper = mountWithContext(
			<OcDropdownDatePicker
				onChange={date => { }} // console.log("onChange(), date:", date)}
			/>
		);

		/* these repeating asserts are for checking that setting value for one field does not affect the other fields. */
		expect(
			wrapper.find(".OcDropdownDatePicker-month").props().value
		).toBeFalsy();
		expect(
			wrapper.find(".OcDropdownDatePicker-day").props().value
		).toBeFalsy();
		expect(
			wrapper.find(".OcDropdownDatePicker-year").props().value
		).toBeFalsy();

		wrapper
			.find(".OcDropdownDatePicker-month")
			.simulate("change", { target: { value: "Sep" } });
		expect(
			wrapper.find(".OcDropdownDatePicker-month").props().value
		).toEqual("Sep");
		expect(
			wrapper.find(".OcDropdownDatePicker-day").props().value
		).toBeFalsy();
		expect(
			wrapper.find(".OcDropdownDatePicker-year").props().value
		).toBeFalsy();

		wrapper
			.find(".OcDropdownDatePicker-day")
			.simulate("change", { target: { value: 19 } });
		expect(
			wrapper.find(".OcDropdownDatePicker-month").props().value
		).toEqual("Sep");
		expect(
			String(wrapper.find(".OcDropdownDatePicker-day").props().value)
		).toEqual("19");
		expect(
			wrapper.find(".OcDropdownDatePicker-year").props().value
		).toBeFalsy();

		wrapper
			.find(".OcDropdownDatePicker-year")
			.simulate("change", { target: { value: 2017 } });
		expect(
			wrapper.find(".OcDropdownDatePicker-month").props().value
		).toEqual("Sep");
		expect(
			String(wrapper.find(".OcDropdownDatePicker-day").props().value)
		).toEqual("19");
		expect(
			String(wrapper.find(".OcDropdownDatePicker-year").props().value)
		).toEqual("2017");
	});

	it("uses Date value given after first render", () => {
		const date = new Date(1990, 3, 13);
		const wrapper = mountWithContext(<OcDropdownDatePicker />);

		expect(
			wrapper.find(".OcDropdownDatePicker-month").props().value
		).toBeFalsy();
		expect(
			wrapper.find(".OcDropdownDatePicker-day").props().value
		).toBeFalsy();
		expect(
			wrapper.find(".OcDropdownDatePicker-year").props().value
		).toBeFalsy();

		wrapper.setProps({ value: date });

		expect(
			wrapper.find(".OcDropdownDatePicker-month").props().value
		).toEqual("Apr");
		expect(
			String(wrapper.find(".OcDropdownDatePicker-day").props().value)
		).toEqual("13");
		expect(
			String(wrapper.find(".OcDropdownDatePicker-year").props().value)
		).toEqual("1990");
	});

	it("uses date string for value given after first render", () => {
		const date = new Date(1990, 3, 13);
		const wrapper = mountWithContext(<OcDropdownDatePicker />);

		expect(
			wrapper.find(".OcDropdownDatePicker-month").props().value
		).toBeFalsy();
		expect(
			wrapper.find(".OcDropdownDatePicker-day").props().value
		).toBeFalsy();
		expect(
			wrapper.find(".OcDropdownDatePicker-year").props().value
		).toBeFalsy();

		wrapper.setProps({ value: moment(date).format("YYYY-MM-DD") });

		expect(
			wrapper.find(".OcDropdownDatePicker-month").props().value
		).toEqual("Apr");
		expect(
			String(wrapper.find(".OcDropdownDatePicker-day").props().value)
		).toEqual("13");
		expect(
			String(wrapper.find(".OcDropdownDatePicker-year").props().value)
		).toEqual("1990");
	});
});

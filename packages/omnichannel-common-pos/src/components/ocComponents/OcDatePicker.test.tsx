import * as React from "react";
import OcDatePicker, { OcDatePickerProps } from "./OcDatePicker";
import {
	mountWithContext,
	shallowWithContext,
	ReactWidgetsTestUtils,
	TestUtils
} from "../../testUtils";

import * as moment from "moment";

describe("OcDatePicker", () => {
	const now = new Date();
	let props: OcDatePickerProps;

	beforeEach(() => {
		const minDate = new Date(now);
		const maxDate: Date = new Date(now);
		maxDate.setFullYear(maxDate.getFullYear() + 10);

		props = {
			selectedDate: now,
			min: minDate,
			max: maxDate
		};
	});

	it("succeeds at shallow mount without props", () => {
		const wrapper = shallowWithContext(
			<OcDatePicker selectedDate={new Date(0)} />
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount without props", () => {
		mountWithContext(<OcDatePicker selectedDate={new Date()} />);
	});

	/* Initially written for RUBT-60171. */
	/* RUBT-75581-tomi skipped test, because done() is never called
	 * (seems like it does not get date value, problem not in component)
	 */
	/* Re-enabled 17 Nov 2017 as this no longer fails even when Date.now() is mocked
	 * to return the timestamp of 10 Nov 2017 when this failed,
	 * and regardless of number of months skipped (tested 0..4).
	 * Enabled logging the number of skipped months so debugging would be easier next time this fails oddly.
	 *  -Jussi
	 */
	/* tslint:disable:no-console*/
	it("accepts a date at exactly N months from this date", done => {
		const { getDelayedPromise, getRandomIntBetweenZeroAndN } = TestUtils;

		const wrapper = mountWithContext(
			<OcDatePicker
				selectedDate={new Date()}
				label={null}
				required={false}
				dropUp={true}
				withClock={false}
				onChange={value => {
					console.log("onChange(), value:", value);
					done();
				}}
			/>
		);

		let datePicker = wrapper.find(".OcDatePicker");
		ReactWidgetsTestUtils.openDateTimePicker(datePicker);

		const skipMonths = getRandomIntBetweenZeroAndN(3) + 1;
		datePicker = wrapper.find(".OcDatePicker");
		for (let i = 1; i <= skipMonths; ++i) {
			getDelayedPromise(500).then(() => {
				datePicker
					.find(".rw-btn-right")
					.hostNodes()
					.simulate("click");
			});
		}

		const currentDatePlusSkipped = new Date(
			moment()
				.add(skipMonths, "months")
				.format("LL")
		);

		getDelayedPromise(500).then(() => {
			try {
				ReactWidgetsTestUtils.selectDate(datePicker, currentDatePlusSkipped);
			} catch (e) {
				if (e.message.match(/Seeked date cell not found/) !== null) {
					console.error(
						`Seeked date cell not found for date ${currentDatePlusSkipped.toUTCString()}`
					);
					done();
				} else {
					throw e;
				}
			}
		});
	});

	/* RUBT-74231 */
	it("returns date with time part set to locale's end of day when requested", done => {
		const { getDelayedPromise } = TestUtils;

		const wrapper = mountWithContext(
			<OcDatePicker
				selectedDate={new Date()}
				label={null}
				required={false}
				dropUp={false}
				withClock={false}
				onChange={value => {
					expect(value.getMilliseconds()).toEqual(999);
					expect(value.getSeconds()).toEqual(59);
					expect(value.getMinutes()).toEqual(59);
					expect(value.getHours()).toEqual(23);
					done();
				}}
				returnEndOfDay={true}
			/>
		);

		const datePicker = wrapper.find(".OcDatePicker");
		ReactWidgetsTestUtils.openDateTimePicker(datePicker);

		const tomorrow = new Date(
			moment()
				.add(1, "days")
				.format("LL")
		);

		getDelayedPromise(500).then(() => {
			try {
				ReactWidgetsTestUtils.selectDate(datePicker, tomorrow);
			} catch (e) {
				if (e.message.match(/Seeked date cell not found/) !== null) {
					console.error(
						`Seeked date cell not found for date ${tomorrow.toUTCString()}`
					);
					done();
				} else {
					throw e;
				}
			}
		});
	});

	it("should render provided errorMessage", () => {
		const errorMessageContent = "error";
		const wrapper = mountWithContext(
			<OcDatePicker {...props} errorMessage={errorMessageContent} />
		);
		const tooltip = wrapper.find(".invalid-feedback");
		expect(tooltip.text()).toEqual(errorMessageContent);
	});

	it("accepts a date only within min/max constraints", () => {

		const constraintProps = {
			min: moment().subtract(1, "d").startOf("d").toDate(),
			max: moment().add(1, "d").endOf("d").toDate(),
			format: "DD.MM.YYYY"
		} as Partial<OcDatePickerProps>;

		const validateInputChange = (value: string, validate: (value: Date) => boolean) => {
			let validated = false;
			const onChange = (newValue: Date) => {
				validated = validate(newValue);
			};

			const wrapper = mountWithContext(
				<OcDatePicker
					selectedDate={new Date()}
					label={null}
					required={false}
					dropUp={true}
					withClock={false}
					onChange={onChange}
					{...constraintProps}
				/>
			);

			const datePicker = wrapper.find(".OcDatePicker");

			const dateInput = datePicker.find("input");
			dateInput.first().simulate("change", {
				target: {
					value,
				},
			});
			dateInput.first().simulate("blur");

			if (!validated) {
				throw new Error("No validation were performed!");
			}
		};
		validateInputChange(
			moment().subtract(1, "y").format(constraintProps.format),
			(newValue: Date): boolean => {
				console.log("New Min value is", newValue);
				const newMoment = moment(newValue);
				if (!newMoment.isValid() || newMoment.isBefore(constraintProps.min)) {
					throw new Error("New Date is out of allowed range!");
				}
				return true;
			});
		validateInputChange(
			moment().add(1, "y").format(constraintProps.format),
			(newValue: Date): boolean => {
				console.log("New Max value is", newValue);
				const newMoment = moment(newValue);
				if (!newMoment.isValid() || newMoment.isAfter(constraintProps.max)) {
					throw new Error("New Date is out of allowed range!");
				}
				return true;
			});
	});
});

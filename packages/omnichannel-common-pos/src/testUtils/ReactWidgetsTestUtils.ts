import { get, toArray } from "lodash";
import { ReactWrapper } from "enzyme";

export default class ReactWidgetsTestUtils {
	static openDateTimePicker(dateTimePicker: ReactWrapper) {
		dateTimePicker.find(".rw-select button").simulate("click");
	}

	static getValidElementInOpenedDateTimePicker(dateTimePicker: ReactWrapper, idx: number) {
		const datesOnRange = dateTimePicker
			.find(".rw-calendar-popup table td[role='gridcell']")
			.filterWhere(node => {
				return node.find(".rw-off-range").length === 0;
			});

		return datesOnRange.at(idx);
	}

	static selectValidElementInOpenedDateTimePicker(dateTimePicker: ReactWrapper, idx: number) {
		ReactWidgetsTestUtils.getValidElementInOpenedDateTimePicker(dateTimePicker, idx).simulate("click");
	}

	static selectFirstValidElementInOpenedDateTimePicker(dateTimePicker: ReactWrapper) {
		ReactWidgetsTestUtils.selectValidElementInOpenedDateTimePicker(
			dateTimePicker,
			0
		);
	}

	static selectLastValidElementInOpenedDateTimePicker(dateTimePicker: ReactWrapper) {
		const datesOnRange = dateTimePicker
			.find(".rw-calendar-popup table td[role='gridcell']")
			.filterWhere(node => {
				return node.find(".rw-off-range").length === 0;
			});

		return datesOnRange.at(datesOnRange.getElements().length - 1);
	}

	static goForward(dateTimePicker: ReactWrapper) {
		dateTimePicker.find(".rw-btn-right").simulate("click");
	}

	static selectDate(dateTimePicker: ReactWrapper, date: Date) {
		const reId = new RegExp("^.*month_([0-1]?" + date.getMonth() + ")-([0-3]?" + date.getDate() + ")$");

		const dateCell = dateTimePicker.find("td").filterWhere((n: ReactWrapper) => {
			const nodeId = n.prop("id");
			if (!nodeId) {
				return false;
			}

			const idMatch = (n.prop("id") as any).match(reId);

			if (idMatch) {
				const [rMonthIdx, rDateIdx] = toArray(idMatch);
				return (
					parseInt(rMonthIdx, 10) === date.getMonth() && parseInt(rDateIdx, 10) === date.getDate()
				);
			} else {
				return false;
			}
		});

		try {
			dateCell.find("span").at(0).simulate("click");
		} catch (e) {
			if (e.message.match(/Method “simulate” is only meant to be run on a single node/) !== null) {
				throw new Error("Seeked date cell not found");
			} else {
				throw e;
			}
		}
	}
}
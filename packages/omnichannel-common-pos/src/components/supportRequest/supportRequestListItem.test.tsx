import * as React from "react";
import { mountWithContext, shallowWithContext } from "../../testUtils";
import SupportRequestListItem from "../supportRequest/SupportRequestListItem";
import { SupportRequestListItemProps } from "./SupportRequestListItem";

describe("SupportRequestListItem", () => {
	let minimumProps: SupportRequestListItemProps;

	beforeAll(() => {
		minimumProps = {
			customerCaseId: "case",
			active: false,
			summary: "Sim card doesn't work",
			date: "20.10.2017",
			status: "in-progress",
			handleClick: () => {},
			logicalStatus: "In Progress",
			isOrderOpen: true
		};
	});

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(<SupportRequestListItem {...minimumProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		mountWithContext(<SupportRequestListItem {...minimumProps} />);
	});

	it("renders with minimal props", () => {
		const wrapper = mountWithContext(<SupportRequestListItem {...minimumProps} />);
		expect(wrapper.find(".fa-question-circle").length).toEqual(1);
		expect(wrapper.find(".SupportRequestListItem-category").props().children).toEqual(minimumProps.summary);
		expect(
			wrapper
				.find(".SupportRequestListItem-date-cell")
				.at(0)
				.props().children
		).toEqual(minimumProps.date);
		expect(wrapper.find(".SupportRequestListItem-lifeCycleStatus-warning").props().children.props.children).toEqual(
			minimumProps.logicalStatus
		);
		expect(wrapper.find(".fa-chevron-down").length).toEqual(1);
	});

	it("renders with active state true", () => {
		const props = {
			...minimumProps,
			active: true
		};
		const wrapper = mountWithContext(<SupportRequestListItem {...props} />);
		expect(wrapper.find(".fa-chevron-up").length).toEqual(1);
	});

	it("should set lifeCycleStatus-success when order closed and change icon", () => {
		const props = {
			...minimumProps,
			isOrderOpen: false
		};
		const wrapper = mountWithContext(<SupportRequestListItem {...props} />);
		expect(wrapper.find(".SupportRequestListItem-lifeCycleStatus-success").length).toEqual(1);
		expect(wrapper.find(".fa-check-circle").length).toEqual(1);
	});
});

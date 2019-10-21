/* tslint:disable:jsx-use-translation-function */
import * as React from "react";
import { mountWithContext, shallowWithContext } from "../../testUtils";

import OcAccordionList, { OcAccordionListProps } from "./OcAccordionList";

describe("OcAccordionList", () => {
	const minProps: OcAccordionListProps = {
		id: "dummy-id",
		active: false,
		rowContent: (<span />),
		expandedContent: (<span />)
	};

	it("succeeds at shallow mount without props", () => {
		const wrapper = shallowWithContext(<OcAccordionList {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount without props", () => {
		mountWithContext(<OcAccordionList {...minProps} />);
	});

	it("should render row content", () => {
		const props = {...minProps};
		props.rowContent = (
			<React.Fragment>
				<div id="divId">{"bar"}</div>
				<span id="spanId">{"foo"}</span>
			</React.Fragment>
		);
		const wrapper = mountWithContext(<OcAccordionList {...props} />);

		const rowContentSpan = wrapper.find("#spanId");
		const rowContentDiv = wrapper.find("#divId");

		expect(rowContentSpan.is("span")).toEqual(true);
		expect(rowContentSpan.text()).toEqual("foo");

		expect(rowContentDiv.is("div")).toEqual(true);
		expect(rowContentDiv.text()).toEqual("bar");
	});

	it("should expand content when active", () => {
		const props = {...minProps};
		props.expandedContent = (
			<React.Fragment>
			<div key="1" id="qwer">{"bar"}</div>
			<span key="2" id="asdf">{"foo"}</span>
			</React.Fragment>
		);
		props.active = true;

		const wrapper = mountWithContext(<OcAccordionList {...props} />);
		expect(wrapper.find("#qwer").length).toEqual(1);
		expect(wrapper.find("#asdf").length).toEqual(1);

		expect(wrapper.find("#qwer").text()).toEqual("bar");
		expect(wrapper.find("#asdf").text()).toEqual("foo");
	});

	it("should handle click on row content", () => {
		let received = null;
		const props = {...minProps};
		props.handleClick = jest.fn().mockImplementation(id => {
			received = id;
		});

		const wrapper = mountWithContext(<OcAccordionList {...props} />);

		const rowContents = wrapper.find("#OcAccordionList-" + minProps.id);
		rowContents.hostNodes().simulate("click");
		expect(props.handleClick).toHaveBeenCalled();
		expect(received).toEqual(props.id);
	});
});

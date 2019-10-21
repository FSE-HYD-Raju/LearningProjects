import * as React from "react";
import { shallowWithContext, mountWithContext } from "../../../testUtils";
import { ReactWrapper } from "enzyme";
import { OcAccordionItemActions, OcAccordionItemActionsProps } from "./OcAccordionItemActions";

describe("OcAccordionItemActions", () => {

	const minProps: OcAccordionItemActionsProps = {
		onHeaderClick: () => {},
		expanded: false
	};

	it("should succeed at shallow mount with minimal props", () => {
		const wrapper = shallowWithContext(<OcAccordionItemActions {...minProps}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it("should succeed at deep mount without props", () => {
		mountWithContext(<OcAccordionItemActions {...minProps}/>);
	});

	it("should call onHeaderClick function from props when clicked", () => {
		const onHeaderClick = jest.fn();
		const wrapper: ReactWrapper<OcAccordionItemActionsProps> =
				  mountWithContext(<OcAccordionItemActions {...minProps} onHeaderClick={onHeaderClick}/>);

		wrapper.find(".OcAccordion-actions").hostNodes().simulate("click");
		wrapper.update();
		expect(onHeaderClick).toHaveBeenCalledTimes(1);
	});

	it("should render \"Show more\" if not expanded", () => {
		const wrapper: ReactWrapper<OcAccordionItemActionsProps> =
				  mountWithContext(<OcAccordionItemActions {...minProps} expanded={false}/>);

		expect(wrapper.find(".OcAccordion-actions").text()).toEqual("Show more");
	});

	it("should render \"Hide\" if expanded", () => {
		const wrapper: ReactWrapper<OcAccordionItemActionsProps> =
				  mountWithContext(<OcAccordionItemActions {...minProps} expanded={true}/>);

		expect(wrapper.find(".OcAccordion-actions").text()).toEqual("Hide");
	});

});

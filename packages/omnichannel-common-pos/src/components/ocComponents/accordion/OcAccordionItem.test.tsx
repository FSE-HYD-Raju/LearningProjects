import * as React from "react";
import { shallowWithContext, mountWithContext } from "../../../testUtils";
import { ReactWrapper } from "enzyme";
import { OcAccordionItem, OcAccordionItemProps } from "./OcAccordionItem";

describe("OcAccordionItem", () => {

	const header = <div className="header" />;
	const content = <div className="content" />;

	const minProps: OcAccordionItemProps = {
		headerComponent: header,
		contentComponent: content,
		onHeaderClick: () => {},
		expanded: false
	};

	it("should succeed at shallow mount with minimal props", () => {
		const wrapper = shallowWithContext(<OcAccordionItem {...minProps}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it("should succeed at deep mount without props", () => {
		mountWithContext(<OcAccordionItem {...minProps}/>);
	});

	it("should display header when collapsed and header and content when expanded", () => {
		const wrapper: ReactWrapper<OcAccordionItemProps> = mountWithContext(<OcAccordionItem {...minProps}/>);

		expect(wrapper.find(".header")).toHaveLength(1);

		wrapper.setProps({...wrapper.props(), expanded: true});
		wrapper.update();
		expect(wrapper.find(".header")).toHaveLength(1);
		expect(wrapper.find(".content")).toHaveLength(1);
	});

	it("should apply header and content classNames", () => {
		const wrapper: ReactWrapper<OcAccordionItemProps> =
				  mountWithContext(<OcAccordionItem {...minProps} headerClassName="custom-header" contentClassName="custom-content"/>);

		expect(wrapper.find(".custom-header")).toHaveLength(1);
		expect(wrapper.find(".custom-header").find(".header")).toHaveLength(1);

		expect(wrapper.find(".custom-content")).toHaveLength(1);
		expect(wrapper.find(".custom-content").find(".content")).toHaveLength(1);
	});

	it("should call onHeaderClick function from props when actions are clicked", () => {
		const onHeaderClick = jest.fn();
		const wrapper: ReactWrapper<OcAccordionItemProps> =
				  mountWithContext(<OcAccordionItem {...minProps} onHeaderClick={onHeaderClick}/>);

		wrapper.find(".OcAccordion-actions").hostNodes().simulate("click");
		wrapper.update();
		expect(onHeaderClick).toHaveBeenCalledTimes(1);
	});

	it("should call onHeaderClick function from props when expandOnHeaderClick is true and header clicked", () => {
		const onHeaderClick = jest.fn();
		const wrapper: ReactWrapper<OcAccordionItemProps> =
				  mountWithContext(<OcAccordionItem {...minProps} expandOnHeaderClick={true} onHeaderClick={onHeaderClick}/>);

		wrapper.find(".header").hostNodes().simulate("click");
		wrapper.update();
		expect(onHeaderClick).toHaveBeenCalledTimes(1);
	});

	it("should not call onHeaderClick function from props when expandOnHeaderClick is not given and header clicked", () => {
		const onHeaderClick = jest.fn();
		const wrapper: ReactWrapper<OcAccordionItemProps> =
				  mountWithContext(<OcAccordionItem {...minProps} onHeaderClick={onHeaderClick}/>);

		wrapper.find(".header").hostNodes().simulate("click");
		wrapper.update();
		expect(onHeaderClick).toHaveBeenCalledTimes(0);
	});

	it("should apply OcAccordion-item-expanded style when expanded", () => {
		const wrapper: ReactWrapper<OcAccordionItemProps> = mountWithContext(<OcAccordionItem {...minProps}/>);
		expect(wrapper.find(".OcAccordion-item-expanded")).toHaveLength(0);

		wrapper.setProps({...wrapper.props(), expanded: true});
		wrapper.update();

		expect(wrapper.find(".OcAccordion-item-expanded")).toHaveLength(1);
	});
});

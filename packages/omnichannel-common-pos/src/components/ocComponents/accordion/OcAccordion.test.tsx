import * as React from "react";
import { shallowWithContext, mountWithContext } from "../../../testUtils";
import { ReactWrapper } from "enzyme";
import {
	OcAccordionBaseClassState,
	OPEN_ANY_STRATEGY,
	OPEN_FIRST_ONLY_ONE_STRATEGY
} from "./OcAccordionBaseClass";
import { HasId } from "../../../redux/types";
import { OcAccordionItem, OcAccordionItemProps } from "./OcAccordionItem";
import { OcAccordionItemActions, OcAccordionItemActionsProps } from "./OcAccordionItemActions";
import { OcAccordion, OcAccordionProps } from "./OcAccordion";

describe("OcAccordion", () => {
	const minProps: OcAccordionProps<HasId> = {
		items: [{id: "item-1"}, {id: "item-2"}, {id: "item-3"}, {id: "item-4"}],
		headerRendererFunction: (item: HasId) => {return {header: (<div className="header" id={item.id} />)}; },
		contentRendererFunction: (item: HasId) => {return {content: (<div className="header" id={item.id} />)}; },
	};

	it("should succeed at shallow mount with minimal props", () => {
		const wrapper = shallowWithContext(<OcAccordion {...minProps}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it("should succeed at deep mount without props", () => {
		mountWithContext(<OcAccordion {...minProps}/>);
	});

	it("should display all provided items", () => {
		const wrapper: ReactWrapper<OcAccordionProps<HasId>> = mountWithContext(<OcAccordion {...minProps}/>);

		expect(wrapper.find(OcAccordionItem)).toHaveLength(minProps.items.length);
	});

	it("should show all items collapsed with default strategy", () => {
		const wrapper: ReactWrapper<OcAccordionProps<HasId>> = mountWithContext(<OcAccordion {...minProps} expandStrategy={OPEN_ANY_STRATEGY()}/>);

		// all items should be collapsed
		expect(wrapper.find(OcAccordionItem).everyWhere(
			(item: ReactWrapper<OcAccordionItemProps>) => !item.props().expanded)
		).toBeTruthy();
	});

	it("should show first item expanded with OPEN_FIRST_ONLY_ONE_STRATEGY expand strategy", () => {
		const wrapper: ReactWrapper<OcAccordionProps<HasId>> = mountWithContext(<OcAccordion {...minProps} expandStrategy={OPEN_FIRST_ONLY_ONE_STRATEGY()}/>);

		// check that first item is expanded
		expect((wrapper.find(OcAccordionItem).at(0) as ReactWrapper<any>).props().expanded).toBeTruthy();
		// ensure it is the only one expanded item
		expect(wrapper.find(OcAccordionItem).filterWhere(
			(item: ReactWrapper<OcAccordionItemProps>) => !!item.props().expanded)
		).toHaveLength(1);
	});

	it("should expand clicked item", () => {
		const wrapper: ReactWrapper<OcAccordionProps<HasId>> = mountWithContext(<OcAccordion {...minProps}/>);

		const itemToExpand: ReactWrapper<OcAccordionItemProps> = wrapper.find(OcAccordionItem).at(1);
		itemToExpand.find(OcAccordionItemActions).simulate("click");
		wrapper.update();
		const state: OcAccordionBaseClassState = wrapper.state();
		expect(Object.keys(state).filter((key: string) => !!state[key])).toEqual(["item-2"]);

		// need to find 1st item once again after update
		expect(wrapper.find(OcAccordionItem).at(1).props().expanded).toBeTruthy();
	});

	it("should collapse already expanded item", () => {
		const wrapper: ReactWrapper<OcAccordionProps<HasId>> = mountWithContext(<OcAccordion {...minProps}/>);
		const itemToExpand: ReactWrapper<OcAccordionItemProps> = wrapper.find(OcAccordionItem).at(1);
		wrapper.find(OcAccordionItem).at(2).find(OcAccordionItemActions).simulate("click");
		wrapper.update();
		expect(wrapper.find(OcAccordionItem).at(2).props().expanded).toBeTruthy();

		wrapper.find(OcAccordionItem).at(2).find(OcAccordionItemActions).simulate("click");
		wrapper.update();
		expect(wrapper.find(OcAccordionItem).at(2).props().expanded).toBeFalsy();
	});

	it("should collapse expanded item for OPEN_FIRST_ONLY_ONE_STRATEGY expand strategy", () => {

		// 1st item should be already expanded, trying to open another and check that first will be collapsed
		const wrapper: ReactWrapper<OcAccordionProps<HasId>> =
				  mountWithContext(<OcAccordion {...minProps} expandStrategy={OPEN_FIRST_ONLY_ONE_STRATEGY()}/>);
		expect(wrapper.find(OcAccordionItem).at(0).props().expanded).toBeTruthy();
		wrapper.find(OcAccordionItem).at(1).find(OcAccordionItemActions).simulate("click");
		wrapper.update();
		expect(wrapper.find(OcAccordionItem).at(0).props().expanded).toBeFalsy();
		expect(wrapper.find(OcAccordionItem).at(1).props().expanded).toBeTruthy();
	});

	it("should allow to collapse all items OPEN_FIRST_ONLY_ONE_STRATEGY expand strategy", () => {
		const wrapper: ReactWrapper<OcAccordionProps<HasId>> =
				  mountWithContext(<OcAccordion {...minProps} expandStrategy={OPEN_FIRST_ONLY_ONE_STRATEGY()}/>);
		wrapper.find(OcAccordionItem).at(0).find(OcAccordionItemActions).simulate("click");
		wrapper.update();
		expect(wrapper.find(OcAccordionItem).at(0).props().expanded).toBeFalsy();
		expect(wrapper.find(OcAccordionItem).everyWhere(
			(item: ReactWrapper<OcAccordionItemProps>) => !item.props().expanded)
		).toBeTruthy();
	});

	it("should allow to specify external actions component", () => {
		const plusSigns: string = "+++";

		const Actions: React.FC<OcAccordionItemActionsProps> = props => {
			return <div>{plusSigns}</div>;
		};
		const wrapper: ReactWrapper<OcAccordionProps<HasId>> =
			mountWithContext(<OcAccordion {...minProps} actionsRenderer={Actions}/>);
		expect(wrapper.find(Actions).length).toEqual(minProps.items.length);
	});
});

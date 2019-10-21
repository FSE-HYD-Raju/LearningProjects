/* tslint:disable:jsx-use-translation-function */
import * as React from "react";
import { shallow } from "enzyme";
import OcImage from "../../ocComponents/OcImage";
import NavBarButton from "./NavBarButton";
import { mountWithContext } from "../../../testUtils";

describe("NavBarButton", () => {
	it("should succeed at shallow mount without props", () => {
		const wrapper = shallow(
			<NavBarButton>
				<span>Click</span>
			</NavBarButton>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("should succeed at deep mount without props", () => {
		mountWithContext(
			<NavBarButton>
				<span>Click</span>
			</NavBarButton>
		);
	});

	it("should render badge", () => {
		const props = {
			badge: 1337
		};

		const wrapper = mountWithContext(
			<NavBarButton {...props}>
				<span>Click</span>
			</NavBarButton>
		);

		const button = wrapper.find(".w-action-item-button");
		const badge = button.find(".badge");
		expect(badge.length).toEqual(1);
		expect(badge.text()).toEqual("" + props.badge);
	});

	it("should render icon", () => {
		const iconProps = {
			product: {
				attributes: {
					images: [
						{
							location: "icon.png",
							altText: "Prettiest icon ever"
						}
					]
				}
			},
			imgClasses: "foo bar"
		};

		const props = {
			icon: <OcImage {...iconProps} />
		};

		const wrapper = mountWithContext(
			<NavBarButton {...props}>
				<span>Click here</span>
			</NavBarButton>
		);

		const button = wrapper.find(".w-action-item-button");
		const icon = button.find(".w-action-item-icon");
		expect(icon.find("img").length).toEqual(1);
	});

	it("should render children", () => {
		const wrapper = mountWithContext(
			<NavBarButton>
				<span>foo</span>
				<div>bar</div>
			</NavBarButton>
		);

		const children = wrapper.find(".w-action-item-label-children").children();
		expect(children.length).toEqual(2);
		expect(children.at(0).is("span")).toEqual(true);
		expect(children.at(0).text()).toEqual("foo");
		expect(children.at(1).is("div")).toEqual(true);
		expect(children.at(1).text()).toEqual("bar");
	});

	it("should handle a click", () => {
		const clickCount = 0;
		const clickHandler = jest.fn();

		const wrapper = mountWithContext(
			<NavBarButton handleClick={clickHandler}>
				<span>Click here</span>
			</NavBarButton>
		);

		wrapper.simulate("click");

		expect(clickHandler).toHaveBeenCalledTimes(1);
	});
});

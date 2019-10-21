import * as React from "react";
import { mountWithContext, shallowWithContext } from "../../../testUtils";
import { OcButton, OcButtonProps, OcButtonSize, OcButtonType } from "./OcButton";
import { ReactWrapper } from "enzyme";

const getAllCssClasses = (wrapper: ReactWrapper<OcButtonProps>): Array<string> => {
	const allClasses: Array<string> = [];
	wrapper.getDOMNode().classList.forEach((className: string) => {
		allClasses.push(className);
	});
	return allClasses.sort();
};

describe("OcButton", () => {
	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(<OcButton />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		mountWithContext(<OcButton />);
	});

	it("adds only btn css class to html button when no props provided", () => {
		const wrapper: ReactWrapper<OcButtonProps> = mountWithContext(<OcButton />);
		expect(getAllCssClasses(wrapper)).toEqual(["btn"]);
	});

	it("adds btn and btn-outline css classes to html button for outline property active", () => {
		const wrapper: ReactWrapper<OcButtonProps> = mountWithContext(<OcButton outline={true} />);
		expect(getAllCssClasses(wrapper)).toEqual(["btn", "btn-outline"]);
	});

	it("adds btn and btn-block css classes to html button for block property active", () => {
		const wrapper: ReactWrapper<OcButtonProps> = mountWithContext(<OcButton block={true} />);
		expect(getAllCssClasses(wrapper)).toEqual(["btn", "btn-block"]);
	});

	it("sets type=\"button\" to html button by default", () => {
		const wrapper: ReactWrapper<OcButtonProps> = mountWithContext(<OcButton />);
		expect(wrapper.getDOMNode().getAttribute("type")).toEqual("button");
	});

	it("sets appropriate button type when htmlBtnType property is set", () => {
		const wrapper: ReactWrapper<OcButtonProps> = mountWithContext(<OcButton htmlBtnType="submit" />);
		expect(wrapper.getDOMNode().getAttribute("type")).toEqual("submit");
		wrapper.setProps({htmlBtnType: "reset"});
		wrapper.update();
		expect(wrapper.getDOMNode().getAttribute("type")).toEqual("reset");
		wrapper.setProps({htmlBtnType: undefined});
		wrapper.update();
		expect(wrapper.getDOMNode().getAttribute("type")).toEqual("button");
	});

	it("sets appropriate css class when buttonSize property is set", () => {
		const wrapper: ReactWrapper<OcButtonProps> = mountWithContext(<OcButton />);
		expect(getAllCssClasses(wrapper).includes("btn-sm")).toEqual(false);
		wrapper.setProps({buttonSize: OcButtonSize.SMALL});
		wrapper.update();
		expect(getAllCssClasses(wrapper).includes("btn-sm")).toEqual(true);

		wrapper.setProps({buttonSize: OcButtonSize.LARGE});
		wrapper.update();
		expect(getAllCssClasses(wrapper).includes("btn-lg")).toEqual(true);
	});

	it("calls onClick handler when it is set", () => {
		const onClickFn = jest.fn();
		const wrapper: ReactWrapper<OcButtonProps> = mountWithContext(<OcButton onClick={onClickFn} />);
		wrapper.simulate("click");
		expect(onClickFn).toHaveBeenCalled();
		expect(onClickFn).toHaveBeenCalledTimes(1);
	});

	it("adds custom className when it is provided", () => {
		const wrapper: ReactWrapper<OcButtonProps> = mountWithContext(<OcButton className="custom-button" />);
		expect(getAllCssClasses(wrapper).includes("custom-button")).toEqual(true);
	});

	it("adds disabled css class when dispabed property is active", () => {
		const wrapper: ReactWrapper<OcButtonProps> = mountWithContext(<OcButton disabled={true} />);
		expect(getAllCssClasses(wrapper).includes("disabled")).toEqual(true);
	});

	describe("check buttonType", () => {
		Object.keys(OcButtonType).forEach((buttonType: string) => {

			it(`adds btn-${buttonType.toLowerCase()} classes to html button for ${buttonType} button type`, () => {
				const wrapper: ReactWrapper<OcButtonProps> = mountWithContext(<OcButton
					buttonType={buttonType as keyof typeof OcButtonType}/>);
				let buttonTypeClass = `btn-${buttonType.toLowerCase()}`;
				expect(wrapper.hasClass("btn"));

				if (buttonType !== OcButtonType.DEFAULT) {
					expect(wrapper.hasClass(buttonTypeClass));
					expect(getAllCssClasses(wrapper)).toEqual(["btn", buttonTypeClass]);

					wrapper.setProps({outline: true});
					wrapper.update();

					// link does not supports outline type
					if (wrapper.prop("buttonType") !== OcButtonType.LINK) {
						buttonTypeClass = `btn-outline-${buttonType.toLowerCase()}`;
					}
					expect(wrapper.hasClass(buttonTypeClass));
					expect(getAllCssClasses(wrapper)).toEqual(["btn", buttonTypeClass]);
				}
			});
		});
	});
});

/* tslint:disable:jsx-use-translation-function */
import * as React from "react";
import { shallow } from "enzyme";

import {
	attachWithContext,
	mountWithContext,
	TestUtils
} from "../../testUtils";

import OcModal from "./OcModal";

describe("OcModal", () => {
	it("succeeds at shallow mount without props", () => {
		const wrapper = shallow(<OcModal />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount without props", () => {
		mountWithContext(<OcModal />);
	});

	it("should not render when props.showModal is false", () => {
		const wrapper = attachWithContext(<OcModal showModal={false} />);
		expect(wrapper.find("Modal").length).toBeGreaterThan(0);

		const portal = wrapper.find("Portal");
		expect(portal.length).toEqual(0);

		wrapper.detach();
	});

	it("should render title, headerActionButton, children, okButton, and backdrop as true", () => {
		const { getModalContents } = TestUtils;

		const props = {
			backdropClose: true,
			onClose: () => {},
			headerActionButton: <button>{"Click me"}</button>,
			showModal: true,
			title: "render title, headerActionButton, children, okButton, and backdrop as true"
		};

		const wrapper = attachWithContext(
			<OcModal {...props}>
				<div>{"foo"}</div>
				<span>{"bar"}</span>
			</OcModal>
		);

		expect(
			wrapper
				.find("Modal")
				.at(0)
				.prop("backdrop")
		).toEqual(true);

		const modalContent = getModalContents(wrapper);

		const modalBody = modalContent.find("ModalBody").children();

		expect(modalBody.children().length).toEqual(2);
		expect(modalBody.childAt(0).is("div")).toEqual(true);
		expect(modalBody.childAt(0).text()).toEqual("foo");
		expect(modalBody.childAt(1).is("span")).toEqual(true);
		expect(modalBody.childAt(1).text()).toEqual("bar");

		wrapper.detach();
	});

	it("should present custom okButtonLabel and handle click on it, and backdrop as static", () => {
		const { getModalContents } = TestUtils;

		const okButtonLabel = "OK!";

		const props = {
			showModal: true,
			backdropClose: false,
			title: "render okButtonLabel and handle click on it",
			okButtonLabel,
			okDisabled: false,
			onClose: () => {},
			onOk: () => {}
		};

		const wrapper = attachWithContext(<OcModal {...props} />);

		const modalContent = getModalContents(wrapper);

		const footerButtons = modalContent.find(".modal-footer .btn");
		footerButtons
			.filterWhere((n: any) => n.text() === okButtonLabel)
			.hostNodes()
			.simulate("click");
		expect(
			wrapper
				.find("Modal")
				.at(0)
				.prop("backdrop")
		).toEqual("static");

		wrapper.detach();
	});

	it("should render the OK and CANCEL buttons in footer", () => {
		const { getModalContents } = TestUtils;

		const props = {
			showModal: true,
			title: "render the OK and CANCEL buttons in footer",
			okButtonLabel: "OK",
			onOk: () => {},
			onClose: () => {}
		};

		const wrapper = attachWithContext(<OcModal {...props} />);

		const modalContent = getModalContents(wrapper);

		const footerButtons = modalContent.find(".modal-footer .btn");
		expect(footerButtons.length).toBeGreaterThan(1);

		const bClose = footerButtons.filterWhere(
			(n: any) => n.text().toLowerCase() === "Cancel".toLowerCase()
		);

		expect(bClose.length).toEqual(1);

		const bOk = footerButtons.filterWhere(
			(n: any) => n.text().toLowerCase() === "OK".toLowerCase()
		);
		expect(bOk.length).toEqual(1);

		wrapper.detach();
	});

	it("should render the OK button as disabled", () => {
		const { getModalContents } = TestUtils;

		const props = {
			showModal: true,
			title: "render the OK button as disabled",
			okButtonLabel: "OK",
			okDisabled: true,
			onClose: () => {},
			onOk: () => {}
		};

		const wrapper = attachWithContext(<OcModal {...props} />);

		const modalContent = getModalContents(wrapper);

		const footerButtons = modalContent.find(".modal-footer .btn");
		expect(footerButtons.length).toBeGreaterThan(0);

		const bOk = footerButtons.find("#oc-modal-action-button").at(0);
		expect(bOk.length).toEqual(1);

		wrapper.detach();
	});
});

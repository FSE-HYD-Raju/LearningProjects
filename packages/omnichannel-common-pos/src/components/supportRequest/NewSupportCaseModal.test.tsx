import * as React from "react";
import { mountWithContext, shallowWithContext, TestUtils } from "../../testUtils";
import NewSupportCaseModal, { NewSupportRequestProps } from "../supportRequest/NewSupportCaseModal";
import { User } from "../../redux/types";
import { CreateCustomerCasePayload } from "../../redux/models/support/support.types";

describe("NewSupportCaseModal", () => {
	let minimumProps: NewSupportRequestProps;

	beforeAll(() => {
		minimumProps = {
			actions: {
				closeModal: () => {},
				postCustomerCase: (customerCase: CreateCustomerCasePayload) => {}
			},
			showModal: true,
			supportCaseCategories: [],
			user: ({
				id: "juanita",
				attributes: {
					formattedName: "Juanita Solis"
				}
			} as any) as User
		};
	});

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(<NewSupportCaseModal {...minimumProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		mountWithContext(<NewSupportCaseModal {...minimumProps} />);
	});

	it("succeeds at shallow mounting contents without categories", () => {
		const wrapper = mountWithContext(<NewSupportCaseModal {...minimumProps} />);
		const modalContents = TestUtils.getModalContents(wrapper);
		expect(modalContents).toMatchSnapshot();
	});

	it("confirm button should be enabled after change category and description", () => {
		const props = {
			...minimumProps,
			supportCaseCategories: [{ id: "case1", name: "category1" }]
		};

		const wrapper = mountWithContext(<NewSupportCaseModal {...props} />);
		let modalContent = TestUtils.getModalContents(wrapper);

		const button = modalContent.find("#oc-modal-action-button").find("button");

		expect(button.props().disabled).toBeTruthy();

		const select = modalContent.find("OcSelect").find("select");
		select.simulate("change", { target: { value: "case1" } });
		wrapper.update();
		expect(wrapper.instance().state.selectedCategoryId).toBe("case1");
		modalContent = TestUtils.getModalContents(wrapper);
		expect(
			modalContent
				.find("#oc-modal-action-button")
				.find("button")
				.props().disabled
		).toBeTruthy();

		const textArea = modalContent.find("#support-requests-text-area");
		textArea.simulate("change", { target: { value: "some description" } });
		wrapper.update();

		modalContent = TestUtils.getModalContents(wrapper);
		expect(
			modalContent
				.find("#oc-modal-action-button")
				.find("button")
				.props().disabled
		).toBeFalsy();
	});

	it("should render single reason", () => {
		const props = {
			...minimumProps,
			supportCaseCategories: [{ id: "case1", name: "category1" }]
		};

		const wrapper = mountWithContext(<NewSupportCaseModal {...props} />);
		const modalContent = TestUtils.getModalContents(wrapper);

		const options = modalContent.find(".custom-select").find("option");

		expect(options.length).toBe(2);
		expect(options.at(1).props().value).toBe("case1");
		expect(options.at(1).props().children).toBe("category1");
	});
});

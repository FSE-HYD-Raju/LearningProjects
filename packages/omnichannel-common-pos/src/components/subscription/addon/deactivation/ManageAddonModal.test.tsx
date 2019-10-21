import * as React from "react";
import {
	mountWithContext,
	shallowWithContext,
} from "../../../../testUtils";
import { Product } from "../../../../redux";
import ManageAddonModal, { ManageAddonModalProps } from "./ManageAddonModal";

describe("ManageAddonModal", () => {
	let minProps: ManageAddonModalProps;

	beforeEach(() => {
		minProps = {
			addon: {
				id: "dummy-product-id",
				name: "Some Add-on name",
				commercialEnrichments: [
					{
						names: {
							name: "Some Add-on extended name"
						},
						descriptions: {
							"short-description": "Some Add-on short description"
						}
					}
				]
			} as any as Product,
			showModal: true,
			msisdn: "3920991234",
			actions: {
				closeModal: jest.fn(),
				deactivateAddon: jest.fn()
			}
		};
	});

	it("succeeds at shallow mount with props", () => {
		const wrapper = shallowWithContext(<ManageAddonModal {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with props", () => {
		mountWithContext(<ManageAddonModal {...minProps}/>);
	});

	it("should render modal with right fields", () => {
		const wrapper = mountWithContext(<ManageAddonModal {...minProps}/>);
		expect(wrapper.find(".ManageAddonModal-phone-number").props().children).toBe("3920991234");
		expect(wrapper.find(".ManageAddonModal-name").props().children).toBe("Some Add-on extended name");
		expect(wrapper.find(".ManageAddonModal-description").props().children).toBe("Some Add-on short description");
	});

	it("should show disclaimer text after click on 'Deactivate' button", () => {
		const wrapper = mountWithContext(<ManageAddonModal {...minProps}/>);

		expect(wrapper.find(".ManageAddonModal-disclaimer").length).toBe(0);
		wrapper.find("#oc-modal-action-button").find("button").simulate("click");

		expect(wrapper.find(".ManageAddonModal-disclaimer").length).toBe(1);
	});

	it("should call closeModal after click on 'Close' button", () => {
		const wrapper = mountWithContext(<ManageAddonModal {...minProps}/>);

		expect(minProps.actions.closeModal).toHaveBeenCalledTimes(0);
		wrapper.find("#oc-modal-cancel-button").find("button").simulate("click");
		expect(minProps.actions.closeModal).toHaveBeenCalledTimes(1);

		wrapper.find("#oc-modal-action-button").find("button").simulate("click");
		wrapper.find("#oc-modal-cancel-button").find("button").simulate("click");
		expect(minProps.actions.closeModal).toHaveBeenCalledTimes(2);
	});

	it("should deactivate add-on after click on 'Confirm' button", () => {
		const wrapper = mountWithContext(<ManageAddonModal {...minProps}/>);

		expect(minProps.actions.closeModal).toHaveBeenCalledTimes(0);
		expect(minProps.actions.deactivateAddon).toHaveBeenCalledTimes(0);

		wrapper.find("#oc-modal-action-button").find("button").simulate("click");
		wrapper.find("#oc-modal-action-button").find("button").simulate("click");

		expect(minProps.actions.closeModal).toHaveBeenCalledTimes(1);
		expect(minProps.actions.deactivateAddon).toHaveBeenCalledTimes(1);
	});
});

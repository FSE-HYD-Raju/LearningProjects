import * as React from "react";
import { mountWithContext, shallowWithContext, TestUtils } from "../../testUtils";
import { ActivateSimModal, ActivateSimModalProps } from "./ActivateSimModal";
import { SimCardActivationInfo } from "./ActivateSimCard";

const { getModalContents } = TestUtils;

const simCardActivationInfo: SimCardActivationInfo[] = [
	{
		iccid: "8939883295001002529",
		orderReference: "CH231020181631",
		tocTocUrl:
			"http://toctoc.com?token=eyJhbGciOiJIUzI1NiJ9.eyJPcmRlcklkIjoiSGFyZEJfSG9tZURlbGl2ZXJ5XzE1MzgzODM2MzkifQ.q3DNQrYZpAVufkDU6CwCDhqnOe4f8n6v3-JEjwxq3zA",
		iccidVerification: true
	}
];

describe("ActivateSimModal", () => {
	let props: ActivateSimModalProps;
	beforeEach(() => {
		props = {
			show: true
		} as ActivateSimModalProps;
	});

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(<ActivateSimModal {...props} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		mountWithContext(<ActivateSimModal {...props} />);
	});

	it("disables Activate button when input is not a 5-digits string", () => {
		const wrapper = mountWithContext(<ActivateSimModal {...props} />);
		let modalContents = getModalContents(wrapper);
		modalContents.find("input").simulate("change", { target: { value: "eeee" } });
		modalContents = getModalContents(wrapper);
		const btn = modalContents.find("#oc-modal-action-button").hostNodes();
		expect(btn.prop("disabled")).toEqual(true);
	});

	it("should disable Activate button when input is less then 5-digits", () => {
		const wrapper = mountWithContext(<ActivateSimModal {...props} />);
		let modalContents = getModalContents(wrapper);
		modalContents.find("input").simulate("change", { target: { value: "1234" } });
		modalContents = getModalContents(wrapper);
		const btn = modalContents.find("#oc-modal-action-button").hostNodes();
		expect(btn.prop("disabled")).toEqual(true);
	});

	it("should enable Activate button when input is 5-digits", () => {
		const wrapper = mountWithContext(<ActivateSimModal {...props} />);
		let modalContents = getModalContents(wrapper);
		modalContents.find("input").simulate("change", { target: { value: "12345" } });
		modalContents = getModalContents(wrapper);
		const btn = modalContents.find("#oc-modal-action-button").hostNodes();
		expect(btn.prop("disabled")).toEqual(false);
	});

	it("should show invalidIccidMessage in case of wrong inputted last digits", () => {
		props = {
			show: true,
			simCardActivationInfo
		} as ActivateSimModalProps;

		const wrapper = mountWithContext(<ActivateSimModal {...props} />);

		let modalContents = getModalContents(wrapper);
		modalContents.find("input").simulate("change", { target: { value: "12345" } });

		expect(wrapper.instance().state.showIccidAlert).toBeFalsy();

		modalContents = getModalContents(wrapper);
		const btn = modalContents.find("#oc-modal-action-button").hostNodes();
		btn.simulate("click");
		wrapper.update();

		expect(wrapper.instance().state.showIccidAlert).toBeTruthy();
		expect(wrapper.find(".ActivateSimModal-error-alert").find("span").props().children).toBe("Invalid last ICCID's digits");
	});

	it("should call closeModal after click on Cancel button", () => {
		const closeModal = jest.fn();
		props = ({
			show: true,
			closeModal
		} as any) as ActivateSimModalProps;

		const wrapper = mountWithContext(<ActivateSimModal {...props} />);

		const modalContents = getModalContents(wrapper);
		const btn = modalContents.find("#oc-modal-cancel-button").hostNodes();
		btn.simulate("click");

		expect(closeModal).toBeCalled();
	});

	it("should call simIccVerification() after Activate click for right inputted iccid and sim_iccid verification", () => {
		const simIccVerification = jest.fn();
		props = ({
			show: true,
			simCardActivationInfo,
			simIccVerification
		} as any) as ActivateSimModalProps;

		const wrapper = mountWithContext(<ActivateSimModal {...props} />);

		let modalContents = getModalContents(wrapper);
		modalContents.find("input").simulate("change", { target: { value: "02529" } });

		modalContents = getModalContents(wrapper);
		const btn = modalContents.find("#oc-modal-action-button").hostNodes();
		btn.simulate("click");

		expect(wrapper.instance().state.verifying).toBeTruthy();
		expect(simIccVerification).toBeCalledWith({
			iccid: simCardActivationInfo[0].iccid,
			orderRefId: simCardActivationInfo[0].orderReference,
			successFlag: true
		});
	});

	it("should open TocToc url in new tab after Activate click for right inputted iccid and video verification", () => {
		const spy = jest.spyOn(window, "open");

		const closeModal = jest.fn();
		props = ({
			show: true,
			simCardActivationInfo: [
				{
					...simCardActivationInfo[0],
					iccidVerification: false
				}
			],
			closeModal
		} as any) as ActivateSimModalProps;

		const wrapper = mountWithContext(<ActivateSimModal {...props} />);

		let modalContents = getModalContents(wrapper);
		modalContents.find("input").simulate("change", { target: { value: "02529" } });

		modalContents = getModalContents(wrapper);
		const btn = modalContents.find("#oc-modal-action-button").hostNodes();
		btn.simulate("click");

		expect(closeModal).toBeCalled();
		expect(spy).toBeCalledWith(
			"http://toctoc.com?token=eyJhbGciOiJIUzI1NiJ9.eyJPcmRlcklkIjoiSGFyZEJfSG9tZURlbGl2ZXJ5XzE1MzgzODM2MzkifQ.q3DNQrYZpAVufkDU6CwCDhqnOe4f8n6v3-JEjwxq3zA",
			"_blank"
		);
	});

	it("should show error alert in case of failure simIccVerification response", () => {
		const wrapper = mountWithContext(<ActivateSimModal {...props} />);
		wrapper.setState({
			verifying: true
		});

		wrapper.setProps({
			verificationResponse: {
				attributes: {
					result: "Failure"
				}
			}
		});
		expect(wrapper.instance().state.verifying).toBeFalsy();
		expect(wrapper.instance().state.showVerificationAlert).toBeTruthy();
		expect(wrapper.find(".ActivateSimModal-error-alert").find("span").props().children).toBe("Error during ICCID validation");
	});

	it("should close modal in case of successful simIccVerification response", () => {
		const closeModal = jest.fn();
		props = ({
			show: true,
			closeModal
		} as any) as ActivateSimModalProps;

		const wrapper = mountWithContext(<ActivateSimModal {...props} />);
		wrapper.setState({
			verifying: true
		});

		wrapper.setProps({
			verificationResponse: {
				attributes: {
					result: "Success"
				}
			}
		});

		expect(closeModal).toBeCalled();
	});
});

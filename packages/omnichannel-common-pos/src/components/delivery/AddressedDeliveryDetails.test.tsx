import * as React from "react";
import AddressedDeliveryDetails, { AddressedDeliveryDetailsProps } from "./AddressedDeliveryDetails";
import { deepShallowWithContext, MockDataMaker, shallowWithContextAndLifecycle } from "../../testUtils";
import ChangeAddressButton from "./ChangeAddressButton";
import ChangeDeliveryAddressContainerECare from "./ChangeDeliveryAddressContainerECare";

describe("AddressedDeliveryDetails", () => {
	let propsWithPostalAddress: AddressedDeliveryDetailsProps;
	beforeEach(() => {
		propsWithPostalAddress = {
			postalAddress: MockDataMaker.postalAddress.make(),
			isPostalAddressUpdated: false,
			showingChangeAddressForm: false,
			actions: {
				resetIsPostalAddressUpdated: jest.fn(),
				setDeliveryAddressFormState: jest.fn(),
				validateProposedDeliveryAddress: Boolean,
			},
		};
	});

	const isEditFormShown = (wrapper: any) => wrapper.find(ChangeDeliveryAddressContainerECare).exists();
	const isEditButtonShown = (wrapper: any) => wrapper.find(ChangeAddressButton).exists();
	const isPostalAddressShown = (wrapper: any) => wrapper.find(".ChangeSim-postal-address").exists();

	it("when has postal address should render change button, text and no edit form container", () => {
		const wrapper = deepShallowWithContext(<AddressedDeliveryDetails {...propsWithPostalAddress} />);
		expect(isEditFormShown(wrapper)).toBeFalsy();
		expect(isEditButtonShown(wrapper)).toBeTruthy();
		expect(isPostalAddressShown(wrapper)).toBeTruthy();
	});
	it("when no postal address should render only edit form container", () => {
		const wrapper = deepShallowWithContext(
			<AddressedDeliveryDetails {...{ ...propsWithPostalAddress, postalAddress: undefined, showingChangeAddressForm: true }} />
		);
		expect(isEditFormShown(wrapper)).toBeTruthy();
		expect(isEditButtonShown(wrapper)).toBeFalsy();
		expect(isPostalAddressShown(wrapper)).toBeFalsy();
	});
	it("should hide edit form after address updated", () => {
		const wrapper = shallowWithContextAndLifecycle(<AddressedDeliveryDetails {...{ ...propsWithPostalAddress, showingChangeAddressForm: false }} />);
		expect(propsWithPostalAddress.actions.resetIsPostalAddressUpdated).not.toBeCalled();
		expect(isEditFormShown(wrapper)).toBeFalsy();
		wrapper.find(ChangeAddressButton).simulate("click");
		expect(propsWithPostalAddress.actions.setDeliveryAddressFormState).toBeCalled();
		wrapper.update();
		expect(propsWithPostalAddress.actions.resetIsPostalAddressUpdated).toBeCalled();
		wrapper.setProps({ ...propsWithPostalAddress, showingChangeAddressForm: true });
		expect(isEditFormShown(wrapper)).toBeTruthy();
		wrapper.setProps({ ...propsWithPostalAddress, isPostalAddressUpdated: true });
		wrapper.update();
		expect(isEditFormShown(wrapper)).toBeFalsy();
	});
	it("should hide edit form after address updated. When address was recently updated", () => {
		const wrapper = shallowWithContextAndLifecycle(<AddressedDeliveryDetails {...{ ...propsWithPostalAddress, isPostalAddressUpdated: true }} />);
		expect(propsWithPostalAddress.actions.resetIsPostalAddressUpdated).toBeCalled();
		(propsWithPostalAddress.actions.resetIsPostalAddressUpdated as any).mockClear();
		// simulate app state change: reset isPostalAddressUpdated
		wrapper.setProps({ ...propsWithPostalAddress, isPostalAddressUpdated: false, showingChangeAddressForm: false });
		wrapper.update();

		expect(isEditFormShown(wrapper)).toBeFalsy();
		wrapper.find(ChangeAddressButton).simulate("click");
		expect(propsWithPostalAddress.actions.setDeliveryAddressFormState).toBeCalled();
		wrapper.setProps({ ...propsWithPostalAddress, showingChangeAddressForm: true });
		wrapper.update();
		expect(propsWithPostalAddress.actions.resetIsPostalAddressUpdated).toBeCalled();
		expect(isEditFormShown(wrapper)).toBeTruthy();
		wrapper.setProps({ ...propsWithPostalAddress, isPostalAddressUpdated: true });
		wrapper.update();
		expect(isEditFormShown(wrapper)).toBeFalsy();
	});
});

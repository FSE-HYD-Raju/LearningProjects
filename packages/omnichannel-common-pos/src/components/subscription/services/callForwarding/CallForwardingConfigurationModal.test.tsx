import * as React from "react";
import { mountWithContext, shallowWithContext } from "../../../../testUtils";
import CallForwardingConfigurationModal, { CallForwardingConfigurationModalProps } from "./CallForwardingConfigurationModal";

describe("CallForwardingConfigurationModal", () => {
	const minProps: CallForwardingConfigurationModalProps = {
		agreementId: "agreement-id",
		customerId: "customer-id",
		actions: {
			submitCallForwardingConfiguration: jest.fn()
		},
		callForwardingReasonCode: "reason-code",
		callForwardingConfigurationErrors: undefined,
		services: [],
		showModal: false,
		toggleModal: jest.fn()
	};

	it("succeeds at shallow mount with min props", () => {
		const wrapper = shallowWithContext(<CallForwardingConfigurationModal {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with min props", () => {
		mountWithContext(<CallForwardingConfigurationModal {...minProps} />);
	});
});

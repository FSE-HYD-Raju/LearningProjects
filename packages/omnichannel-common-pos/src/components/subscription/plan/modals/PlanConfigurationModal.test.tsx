import * as React from "react";

import { attachWithContext, shallowWithContext } from "../../../../testUtils";
import { PlanConfigurationModal, PlanConfigurationModalProps } from "./PlanConfigurationModal";
import { MsisdnConfig, Product } from "../../../../redux/types";

describe("PlanConfigurationModal", () => {
	const minimumProps: PlanConfigurationModalProps = {
		currentProduct: {
			name: "Data 21Mb/s"
		} as any as Product,
		actions: {
			handleBack: jest.fn(),
			handleClose: jest.fn(),
			proceedToPayment: jest.fn(),
			setInputtedCharacteristic: jest.fn(),
			toggleProductOffering: jest.fn(),
			selectProductOffering: jest.fn(),
		},
		toggleMsisdnModal: jest.fn(),
		productNeedsMsisdnConfiguration: false,
		msisdnConfig: {} as any as MsisdnConfig,
		msisdnModalVisible: false,
		msisdnReservationRequired: false,
		userOpened: false,
	};

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(
			<PlanConfigurationModal {...minimumProps} />
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		attachWithContext(<PlanConfigurationModal {...minimumProps} />);
	});
});

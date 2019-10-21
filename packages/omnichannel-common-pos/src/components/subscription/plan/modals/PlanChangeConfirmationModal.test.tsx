import * as React from "react";
import { attachWithContext, shallowWithContext } from "../../../../testUtils";

import PlanChangeConfirmationModal, { PlanChangeConfirmationModalProps } from "./PlanChangeConfirmationModal";
import { Basket } from "../../../../redux/types";

describe("PlanChangeConfirmationModal", () => {
	const minimumProps: PlanChangeConfirmationModalProps = {
		actions: {
			handleBack: jest.fn(),
			handleClose: jest.fn(),
			pay: jest.fn(),
		},
		initializedBasket: {} as any as Basket,
	};

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(
			<PlanChangeConfirmationModal {...minimumProps} />
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		attachWithContext(<PlanChangeConfirmationModal {...minimumProps} />);
	});
});

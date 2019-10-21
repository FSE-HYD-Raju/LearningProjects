import * as React from "react";
import { attachWithContext, shallowWithContext } from "../../../../testUtils";

import PlanChangeResultModal, { PlanChangeResultModalProps } from "./PlanChangeResultModal";

describe("PlanChangeResultModal", () => {
	const minimumProps: PlanChangeResultModalProps = {
		paymentInfo: {
			paymentCompleted: true,
			paymentForm: "",
			paymentErrorCode: "",
		},
		actions: {
			handleBack: jest.fn(),
			handleClose: jest.fn(),
		},
	};

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(
			<PlanChangeResultModal {...minimumProps} />
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		attachWithContext(<PlanChangeResultModal {...minimumProps} />);
	});
});

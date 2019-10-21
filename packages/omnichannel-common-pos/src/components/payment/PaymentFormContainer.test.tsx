import * as React from "react";
import { shallowWithContext } from "../../testUtils";

import PaymentFormContainer from "./PaymentFormContainer";

describe("PaymentFormContainer", () => {
	const minimumProps = {
		paymentForm: {
			__html: "<form class=\"PaymentForm\"><form>"
		},
		actions: {
			persistToStorage: jest.fn()
		}
	};

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(
			<PaymentFormContainer {...minimumProps} />
		);
		expect(wrapper).toMatchSnapshot();
	});
});

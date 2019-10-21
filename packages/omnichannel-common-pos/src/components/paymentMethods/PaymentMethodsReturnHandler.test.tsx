import * as React from "react";
import { mockRouterProps, mountWithContext } from "../../testUtils";
import PaymentMethodsReturnHandler, { PaymentMethodsReturnHandlerProps } from "./PaymentMethodsReturnHandler";
import { User } from "../../redux";

describe("PaymentMethodsReturnHandler", () => {
	const minimumProps: PaymentMethodsReturnHandlerProps = {
		contextualPaymentMethodId: "credit-card",
		location: mockRouterProps.location,
		history: mockRouterProps.history,
		match: mockRouterProps.match,
		staticContext: mockRouterProps.staticContext,
		actions: {
			paymentMethodsVerificationToaster: jest.fn(),
			validatePaymentResultAfterReturningFromTheSIA: jest.fn(),
			historyPush: jest.fn(),
		},
	};

	const context = {
		intl: {
			formatMessage: () => ""
		}
	};

	it("succeeds at deep mount with minimum props", () => {
		mountWithContext(<PaymentMethodsReturnHandler {...minimumProps} />, { context });
	});

	it("should call validatePaymentMethodAfterReturningFromSIA with proper params", () => {
		const updatedProps = {
			...minimumProps,
			user: ({
				id: "a-user",
				customerAccountId: "a-customer",
			} as any) as User,
			location: ({
				pathname: "http://localhost:4002/digilife/financials/payment-methods/registered",
			} as any),
		};
		const validateFuncSpy = updatedProps.actions.validatePaymentResultAfterReturningFromTheSIA;
		mountWithContext(<PaymentMethodsReturnHandler {...updatedProps} />, { context });

		expect(validateFuncSpy).toBeCalled();
	});
});

"use strict";

import { getParsedValue } from "../../utils";
import { ConsulValues } from "../consul/consul.types";
import { PaymentState } from "./payment.reducers";

const extractPaymentValues = (payload: ConsulValues): Partial<PaymentState> => {
	return {
		paymentUseCases: getParsedValue(payload.payment_use_case_configuration)
	} as Partial<PaymentState>;
};
export { extractPaymentValues };

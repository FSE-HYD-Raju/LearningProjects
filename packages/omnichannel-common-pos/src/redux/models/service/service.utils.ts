"use strict";

import { get, isEmpty } from "lodash";
import { ConsulValues } from "../consul/consul.types";

export function extractValues(payload: ConsulValues) {
	const values = {};
	const cf = get(payload, "services/call_forwarding");
	const callForwardingReasonCode = get(payload, "services/reason_code");
	if (!isEmpty(cf) && !isEmpty(callForwardingReasonCode)) {
		Object.assign(values, {
			callForwardingServices: JSON.parse(cf),
			callForwardingReasonCode
		});
	}

	return values;
}

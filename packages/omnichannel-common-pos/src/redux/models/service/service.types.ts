"use strict";

import { CallForwardingServiceModify } from "../../types";

export type ServiceItem = {
	key: string;
	values: Array<string>;
};

export type ServiceState = {
	callForwardingServices: ServiceItem | undefined;
	callForwardingReasonCode?: string;
	callForwardingConfigurationErrors?: object;
	callForwardingConfigurationResult?: CallForwardingServiceModify;
};

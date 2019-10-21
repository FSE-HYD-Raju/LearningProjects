"use strict";

import { AxiosResponse } from "axios";
import ErrorContainer from "./ErrorContainer";
import { OmnichannelApiResponse } from "../types";

export default class BaseService {

	static validateResp(response: AxiosResponse<any> | ErrorContainer | OmnichannelApiResponse, message?: string) {
		if (ErrorContainer.has(response)) {
			console.error(message || response);
			throw response || message;
		}
	}
}

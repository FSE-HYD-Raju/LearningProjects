import * as React from "react";

import { B2CFunctionCustomizationPoints, withFunctionCustomization } from "../../../customization";
import { FormattedMessage } from "../../../channelUtils";

const getMessageBundle = withFunctionCustomization(
	B2CFunctionCustomizationPoints.TOASTER_ERROR_ACTIONS_MESSAGE_INJECTOR,
	() => {
		return {};
	}
);

class ToastErrorUtil {
	static getErrorMessage(error: any): React.ReactNode {
		const messageBundle = getMessageBundle();
		const key = error.data && error.data.errors && error.data.errors.length > 0 && error.data.errors[0].code;

		return key && messageBundle[key] ? (
			<FormattedMessage {...messageBundle[key]} />
	) : messageBundle[error.status] ? (
			<FormattedMessage {...messageBundle[error.status]} />
		) : (
			<FormattedMessage {...messageBundle.defaultToastError} />
		);
	}
}

export default ToastErrorUtil;

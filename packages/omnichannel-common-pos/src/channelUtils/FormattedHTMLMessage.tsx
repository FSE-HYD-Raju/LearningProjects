"use strict";

import * as React from "react";
import { omit } from "lodash";
import { FormattedHTMLMessage as IntlFormattedHTMLMessage, FormattedMessage } from "react-intl";

import IntlContainer from "./IntlContainer";

export interface FormattedHTMLMessageProps extends FormattedMessage.Props {
	wrapperType?: "wrapper";
}

const FormattedHTMLMessageWrapper: React.FC<FormattedHTMLMessageProps> = (props) => {
	const messageProps = omit(props, "wrapperType");
	return (
		<IntlContainer>
			<IntlFormattedHTMLMessage {...messageProps} />
		</IntlContainer>
	);
};

FormattedHTMLMessageWrapper.defaultProps = {
	wrapperType: "wrapper"
};

export default FormattedHTMLMessageWrapper;
export type FormattedHTMLMessageDescriptor = FormattedMessage.MessageDescriptor;

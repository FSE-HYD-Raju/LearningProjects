"use strict";

import * as React from "react";
import { omit } from "lodash";
import { FormattedMessage as IntlFormattedMessage } from "react-intl";

import IntlContainer from "./IntlContainer";

interface FormattedMessageProps extends IntlFormattedMessage.Props {
	wrapperType?: "wrapper";
	className?: string; // Optional class name. Applied to a <span> with resulting message if present
}

/**
 * A wrapper on react-intl FormattedMessage that bundles it into IntlContainer (to ease usage).
 *
 * Please note that if className prop is passed - custom render function is discarded.
 *
 * Actually there is no need in className when custom render function is passed as one can provide any html
 * directly into that function.
 */
const FormattedMessage: React.FC<FormattedMessageProps> = (props) => {
	const messageProps = omit(props, "wrapperType", "className");

	if (props.className) {
		return (
			<IntlContainer>
				<IntlFormattedMessage {...messageProps} >
					{(txt) => (
						<span className={props.className}>
							{txt}
						</span>
					)}
				</IntlFormattedMessage>
			</IntlContainer>
		);
	}

	return (
		<IntlContainer>
			<IntlFormattedMessage {...messageProps} />
		</IntlContainer>
	);
};
FormattedMessage.displayName = "FormattedMessageWrapper";

FormattedMessage.defaultProps = {
	wrapperType: "wrapper"
};

export default FormattedMessage;
export type FormattedMessageDescriptor = IntlFormattedMessage.MessageDescriptor;
export {
	FormattedMessageProps,
};

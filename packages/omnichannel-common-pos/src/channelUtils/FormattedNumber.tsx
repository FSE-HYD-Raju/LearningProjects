"use strict";

import * as React from "react";
import { omit } from "lodash";
import { FormattedNumber as IntlFormattedNumber } from "react-intl";

import IntlContainer from "./IntlContainer";

export interface FormattedNumberProps extends IntlFormattedNumber.Props {
	wrapperType?: "wrapper";
	ignoreSpaces?: boolean;
	replaceNonBreakingSpace?: boolean;
}

const FormattedNumberWrapper: React.FC<FormattedNumberProps> = (props) => {
	const messageProps = omit(props, "wrapperType");
		// This will replace Non Breaking Space with Normal Space.
		return (<IntlContainer>
					<IntlFormattedNumber {...messageProps} >
						{(txt: string) => (
							<span>
								{ props.ignoreSpaces ? (txt.replace(/\s/g, "")) : (props.replaceNonBreakingSpace ? (txt.replace(/\s/g, " ")) : txt) }
							</span>
						)}
					</IntlFormattedNumber>
				</IntlContainer>
		);
};

FormattedNumberWrapper.defaultProps = {
	wrapperType: "wrapper",
	replaceNonBreakingSpace: false,
};

export default FormattedNumberWrapper;

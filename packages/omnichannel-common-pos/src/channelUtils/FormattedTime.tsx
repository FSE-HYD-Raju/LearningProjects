"use strict";

import * as React from "react";
import { omit } from "lodash";
import { FormattedTime as IntlFormattedTime } from "react-intl";

import IntlContainer from "./IntlContainer";

export interface FormattedTimeProps extends IntlFormattedTime.Props {
	wrapperType?: "wrapper";
}

const FormattedTimeWrapper: React.FC<FormattedTimeProps> = (props) => {
	const messageProps = omit(props, "wrapperType");
	return (
		<IntlContainer>
			<IntlFormattedTime {...messageProps} />
		</IntlContainer>
	);
};

FormattedTimeWrapper.defaultProps = {
	wrapperType: "wrapper"
};

export default FormattedTimeWrapper;

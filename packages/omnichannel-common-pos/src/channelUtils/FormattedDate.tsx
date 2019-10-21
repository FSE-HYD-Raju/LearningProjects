"use strict";

import * as React from "react";
import { omit } from "lodash";
import { FormattedDate as IntlFormattedDate } from "react-intl";

import IntlContainer from "./IntlContainer";

export interface FormattedDateProps extends ReactIntl.FormattedDate.Props {
	wrapperType?: "wrapper";
}

const FormattedDateWrapper: React.FC<FormattedDateProps> = (props) => {
	const messageProps = omit(props, "wrapperType");
	return (
		<IntlContainer>
			<IntlFormattedDate {...messageProps} />
		</IntlContainer>
	);
};

FormattedDateWrapper.defaultProps = {
	wrapperType: "wrapper"
};

export default FormattedDateWrapper;

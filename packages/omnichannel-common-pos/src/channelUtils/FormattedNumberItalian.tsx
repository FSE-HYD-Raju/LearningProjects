"use strict";

import * as React from "react";
import { omit } from "lodash";
import { FormattedNumber as IntlFormattedNumber } from "react-intl";
import { ContextType, contextTypesValidationMap } from "../types";

export interface FormattedNumberProps extends IntlFormattedNumber.Props {
	wrapperType?: "wrapper";
}

const FormattedNumberItalian: React.FC<FormattedNumberProps> = (props, context: ContextType) => {
	const messageProps = omit(props, "wrapperType");

	const { formatNumber } = context.intl;

	const getFormattedString = (props: any): any => {
		return formatNumber(props.value, {
				style: "currency",
				currency: props.currency,
				minimumFractionDigits: props.minimumFractionDigits,
				maximumFractionDigits: props.maximumFractionDigits
			}
		);
	};
	const formattedString = getFormattedString(messageProps).replace(/\s/g, "");

	return (
		<span>{formattedString}</span>
	);
};

FormattedNumberItalian.contextTypes = contextTypesValidationMap;
FormattedNumberItalian.defaultProps = {
	wrapperType: "wrapper"
};
export default FormattedNumberItalian;

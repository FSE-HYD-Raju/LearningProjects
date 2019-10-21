import * as React from "react";
import { FormattedMessage, FormattedMessageDescriptor } from "../../channelUtils/index";
import defaultUnitOfMeasureMessages from "./intl/UnitOfMeasure.messages";
import OcCurrency from "../ocComponents/OcCurrency";
import { UnitOfMeasureEnum, UnitOfMeasureType } from "../../redux/types";

interface Props {
	unit?: UnitOfMeasureType;
	value?: number;
	currency?: string; // is only valid in case of unit === UnitOfMeasureEnum.MONETARY
	messages?: Record<UnitOfMeasureType, FormattedMessageDescriptor>; // accepts custom messages
}

/**
 * This component is thought to substitute the one from UnitOfMeasure.js
 *
 * Accepts a map that contains messages for any unit.
 * If no messages prop is passed - defaults to UnitOfMeasure.messages.ts
 */
const UnitOfMeasure: React.FC<Props> = (props: Props) => {
	const { unit, value, currency } = props;

	if (!unit || unit.toUpperCase() === UnitOfMeasureEnum.SERVICE_SPECIFIC) {
		return <span>{value}</span>;
	}

	const messageKey = unit.toUpperCase();
	const messages = props.messages || defaultUnitOfMeasureMessages;

	if (messageKey === UnitOfMeasureEnum.MONETARY) {
		return <OcCurrency cost={value} currency={currency} />;
	}

	if (!messages.hasOwnProperty(messageKey)) {
		return <span>{value}</span>;
	}

	// @ts-ignore
	const message: FormattedMessageDescriptor = messages || defaultUnitOfMeasureMessages ? messages[messageKey] : [messageKey];

	return (
		<FormattedMessage
			{...message}
			values={{value}}
		/>
	);
};

export default UnitOfMeasure;

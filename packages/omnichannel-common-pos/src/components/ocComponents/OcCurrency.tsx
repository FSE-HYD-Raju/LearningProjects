import * as React from "react";
import { CSSProperties } from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { AppState } from "../../redux/reducers";
import { BillingInterval } from "../../redux/types/BillingInterval";
import ocCurrencyMessages from "./OcCurrency.messages";
import { FormattedMessage } from "../../channelUtils";
import OcCurrencyShortIntervalNameMessages from "./OcCurrencyShortIntervalName.messages";
import FormattedNumber, { FormattedNumberProps } from "../../channelUtils/FormattedNumber";
import { getIntervalsMessageMap, MessageMap } from "./OcCurrency.utils";

interface OcCurrencyProps {
	cost?: number;
	currency?: string;
	round?: boolean;
	id?: string; // TODO: avoid passing html attributes through props
	className?: string; // TODO: avoid passing html attributes through props
	style?: CSSProperties; // TODO: avoid passing html attributes through props
	allowUndefined?: boolean;
	doNotShowZero?: boolean;
	noPriceReturnValue?: any;
	recurringInterval?: BillingInterval;
	showFullIntervalName?: boolean;
	ignoreSpaces?: boolean;
	replaceNonBreakingSpace?: boolean;
}

interface FormattedNumberContainerProps extends FormattedNumberProps {
	allowUndefined?: boolean;
}
const mapStateToProps = (state: AppState, props: FormattedNumberContainerProps) => {
	const currency = props.allowUndefined ? props.currency || state.currency.selectedCurrency : props.currency;
	const value = props.allowUndefined ? (props.value === undefined ? 0 : props.value) : props.value;
	return {
		...props,
		currency,
		value
	};
};
const FormattedNumberContainer = connect(mapStateToProps)(FormattedNumber);

const recurringIntervalToMessageMap = getIntervalsMessageMap(OcCurrencyShortIntervalNameMessages);
const recurringIntervalToFullIntervalMessageMap = getIntervalsMessageMap(ocCurrencyMessages);

const recurringIntervalToMessage = (messageMap: MessageMap, recurringInterval: BillingInterval) => {
	return messageMap[recurringInterval.interval] || ocCurrencyMessages.recurringIntervalDefault;
};

const OcCurrency = (props: OcCurrencyProps) => {
	const {
		cost,
		currency,
		round,
		className,
		style,
		id,
		allowUndefined,
		doNotShowZero,
		noPriceReturnValue,
		recurringInterval,
		showFullIntervalName,
		ignoreSpaces,
		replaceNonBreakingSpace,
	} = props;

	if (((cost || (cost === 0 && !doNotShowZero)) && isFinite(cost) && currency) || allowUndefined) {
		return (
			<span className={classNames("oc-currency", className)} style={style} id={id}>
				<FormattedNumberContainer
					value={cost || 0}
					style="currency"
					currency={currency && currency.toUpperCase()}
					minimumFractionDigits={round ? 0 : 2}
					allowUndefined={allowUndefined}
					ignoreSpaces={ignoreSpaces}
					replaceNonBreakingSpace={replaceNonBreakingSpace}
				/>
				{recurringInterval && (
					<>
						<FormattedMessage className="recurring-interval-separator" {...ocCurrencyMessages.intervalSeparator} />
						<FormattedMessage
							{...recurringIntervalToMessage(
								showFullIntervalName ? recurringIntervalToFullIntervalMessageMap :
									recurringIntervalToMessageMap, recurringInterval
							)}
							values={{value: recurringInterval.interval}}
						/>
					</>
				)}
			</span>
		);
	} else {
		return noPriceReturnValue === undefined ? (
			<span className="oc-currency" style={style} id={id}>
				<FormattedMessage {...ocCurrencyMessages.noPrice} />
			</span>
		) : (
			noPriceReturnValue
		);
	}
};
export default OcCurrency;
export { OcCurrencyProps };

"use strict";

import cssns from "../../../../../utils/cssnsConfig";
import messages from "./FaF.messages";
import OcLoadingSpinner from "../../../../ocComponents/OcLoadingSpinner";
import { FC } from "react";
import { FormattedMessage } from "../../../../../channelUtils";

const { React } = cssns("FaFNumberModal");

interface FaFConfirmationProps {
	value: string;
	price?: string;
	containsErrors?: boolean;
	loadingIndicator?: boolean;
	hasEnoughBalance?: boolean;
	addOperation?: boolean;
}

const FaFConfirmation: FC<FaFConfirmationProps> = (props: FaFConfirmationProps) => {
	const {
			  value,
			  price,
			  loadingIndicator,
			  hasEnoughBalance,
			  addOperation,
			  containsErrors
		  } = props;

	// Show 1. loading indicator, 2. if has enough balance, then "normal" view 3. if not enough balance, then "error" view
	return loadingIndicator ? (
		<OcLoadingSpinner loading={loadingIndicator}/>
	) : hasEnoughBalance ? (
		<div className="confirmModal">
			{ containsErrors ? (
				<FormattedMessage
					{...messages.newNumberIsNotAccepted}
					values={{ number: value }}
				/>
			) : addOperation ? (
				<FormattedMessage
					{...messages.areYouSureAddToFaF}
					values={{ number: value }}
				/>
			) : (
				<FormattedMessage
					{...messages.removeNumber}
					values={{ number: value }}
				/>
			) }{" "}
			{ price && (
				<FormattedMessage
					{...messages.feeWillBeDeducted}
					values={{ price }}
				/>
			) }
		</div>
	) : (
		<div className="confirmModal">
			<FormattedMessage
				{...messages.addingNumberToFaF}
				values={{ number: value, price }}
			/>
		</div>
	);
};

export {
	FaFConfirmationProps
};

export default FaFConfirmation;

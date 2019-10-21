import * as React from "react";
import FormattedMessage from "../../channelUtils/FormattedMessage";
import changeSimModalMessages from "./ChangeSim.messages";
import OcCurrency from "../ocComponents/OcCurrency";
import { SimplePrice } from "../../redux/types";

interface ChangeSimFeeProps {
	feeAmount?: SimplePrice;
	feeTitle?: string;
}

const ChangeSimFee: React.FC<ChangeSimFeeProps> = props => {
	if (!props.feeAmount || !props.feeTitle) {
		return null;
	}
	return (
		<div className="ChangeSim-row ChangeSim-fee-container">
			<div className="ChangeSim-label"><FormattedMessage {...changeSimModalMessages.feeLabel} /></div>
			<div className="ChangeSim-data ChangeSim-fee-row">
				<span>{props.feeTitle}</span>
				<span className="ChangeSim-fee-amount">
					<OcCurrency
						cost={props.feeAmount.taxFreeAmount}
						currency={props.feeAmount.currency}
						ignoreSpaces={true}
						round={true}
					/>
				</span>
			</div>
		</div>
	);
};

export default ChangeSimFee;
export {
	ChangeSimFeeProps,
};

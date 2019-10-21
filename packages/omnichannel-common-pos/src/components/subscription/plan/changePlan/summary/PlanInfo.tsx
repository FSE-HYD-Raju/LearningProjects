import * as R from "react";
import { FormattedMessage as IntlFormattedMessage } from "react-intl";
import cssns from "../../../../../utils/cssnsConfig";
import FormattedMessage from "../../../../../channelUtils/FormattedMessage";
import messages from "./ChangePlanSummary.messages";
import OcCurrency from "../../../../ocComponents/OcCurrency";
import { Price } from "../../../../../redux/types/Price";
import { AllowanceInfo } from "../../../../../redux/types/Allowance";
import { AllowanceInfoRow } from "./AllowanceInfoRow";

const React = cssns("PlanInfo").React as typeof R;

interface PlanInfoProps {
	labelMessage: IntlFormattedMessage.MessageDescriptor;
	name: string;
	allowancesInfo: AllowanceInfo[];
	recurringFee: Price | undefined;
	activationFee: Price | undefined;
}

const PlanInfo: React.SFC<PlanInfoProps> = props => {
	const { labelMessage, name, allowancesInfo, recurringFee, activationFee } = props;

	return (
		<div className="plan-info">
			<div className="plan-name-container">
				<div className="plan-label">
					<FormattedMessage {...labelMessage} />
				</div>
				<div className="plan-name">{name}</div>
			</div>
			{allowancesInfo.length > 0 && (
				<div className="plan-services">
					{allowancesInfo.map((allowance: AllowanceInfo, index: number) => (
						<AllowanceInfoRow
							key={allowance.name + allowance.value + index}
							name={allowance.name}
							isUnlimited={allowance.isUnlimited}
							value={allowance.value}
							unitOfMeasure={allowance.unitOfMeasure}
						/>
					))}
				</div>
			)}
			<div className="plan-fees">
				{recurringFee && (
					<div className="plan-fee">
						<div className="plan-fee-label">
							<FormattedMessage {...messages.planRecurringFeeLabel} />
						</div>
						<div className="plan-fee-value">
							<OcCurrency
								cost={recurringFee.taxIncludedAmount}
								currency={recurringFee.currency}
								recurringInterval={recurringFee.recurringChargePeriod}
							/>
						</div>
					</div>
				)}
				{activationFee && (
					<div className="plan-fee">
						<div className="plan-fee-label">
							<FormattedMessage {...messages.planActivationFeeLabel} />
						</div>
						<div className="plan-fee-value">
							<OcCurrency cost={activationFee.taxIncludedAmount} currency={activationFee.currency} />
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export { PlanInfo, PlanInfoProps };

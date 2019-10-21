import { get } from "lodash";
import { ContextualPaymentMethod, InitializedAddon, PriceTypeEnum } from "../../../../redux/types";
import AddonActivationUtils from "./AddonActivation.utils";
import { FC } from "react";
import addonMessages from "../Addon.messages";
import OcCurrency from "../../../ocComponents/OcCurrency";
import cssns from "../../../../utils/cssnsConfig";
import classnames from "classnames";
import FormattedMessage from "../../../../channelUtils/FormattedMessage";

const { React } = cssns("AddonActivationModal");

interface AddonActivationBalanceProps {
	initializedAddon: InitializedAddon | undefined;
	selectedPaymentMethod: ContextualPaymentMethod | undefined;
}

const AddonActivationBalance: FC<AddonActivationBalanceProps> = props => {
	const { initializedAddon } = props;

	if (!initializedAddon) {
		return null;
	}
	const { selectedPaymentMethod } = props;
	if (!selectedPaymentMethod) {
		return null;
	}

	const totalFee = AddonActivationUtils.calculateAddonTotalFees(initializedAddon);

	const selectedPaymentMethodBalance = (selectedPaymentMethod && selectedPaymentMethod.balance) || 0;
	const remainingBalanceValue = selectedPaymentMethodBalance - totalFee;

	/* trusting that all basket items have the same currency. */
	const currency = get(initializedAddon, "basketItems[0].attributes.totalPrices[0].currency");
	const isNegativeBalance = remainingBalanceValue < 0;

	return (
		<div className="info-container">
			<div className="balance-table">
				<div className="balance-table-row">
					<span className="cost-type">
						<FormattedMessage {...addonMessages.configurationCurrentBalance}/>
					</span>
					<OcCurrency className="cost-value" cost={selectedPaymentMethodBalance} currency={currency} ignoreSpaces={true}/>
				</div>
				<div className="balance-table-row" data-test-name="total-fees-amount">
					<span className="cost-type">
						<FormattedMessage {...addonMessages.configurationTotalFees}/>
					</span>
					<OcCurrency className="cost-value red-label" cost={-1 * totalFee} currency={currency} ignoreSpaces={true}/>
				</div>
				<div className="balance-table-row remaining-balance">
					<span className="cost-type">
						<FormattedMessage {...addonMessages.configurationRemainingBalance}/>
					</span>
					<OcCurrency
						className={classnames({
							"cost-value": true,
							"red-label": isNegativeBalance,
						})}
						cost={remainingBalanceValue}
						currency={currency}
						ignoreSpaces={true}
					/>
				</div>
			</div>
		</div>
	);
};

export {
	AddonActivationBalance,
	AddonActivationBalanceProps
};

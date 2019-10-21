import { FC } from "react";
import { get } from "lodash";
import { BasketItem, InitializedAddon } from "../../../../redux/types";
import addonMessages from "../Addon.messages";
import OcCurrency from "../../../ocComponents/OcCurrency";
import cssns from "../../../../utils/cssnsConfig";
import FormattedMessage from "../../../../channelUtils/FormattedMessage";
import BasketUtil from "../../../../utils/BasketUtil";

const { React } = cssns("AddonActivationModal");

interface AddonActivationFeesProps {
	initializedAddon: InitializedAddon | undefined;
}

const AddonActivationFees: FC<AddonActivationFeesProps> = props => {
	const { initializedAddon } = props;
	if (!initializedAddon) {
		return null;
	}
	const basketItems = initializedAddon.basketItems;

	if (!basketItems) {
		return null;
	}

	return (
		<>
			{basketItems.map((item: BasketItem, index: number) => {
				const oneTimeFee = BasketUtil.getBasketItemOneTimePrice(item);
				const recurringFee = BasketUtil.getBasketItemRecurrentPrice(item);

				return (
					<div className="info-container new-section" key={`addon-activation-payment-method-${index}`}>
						<div className="label">
							<FormattedMessage {...addonMessages.configurationFees} />
						</div>

						<div className="fees">
							<div className="fee">
								<FormattedMessage {...addonMessages.configurationActivationFee} />
								{oneTimeFee && oneTimeFee.taxIncludedAmount ? (
									<OcCurrency
										className="fee-value"
										cost={oneTimeFee.taxIncludedAmount || 0}
										currency={oneTimeFee.currency}
										ignoreSpaces={true}
									/>
								) : (
									<span className="fee-value">
										<FormattedMessage {...addonMessages.configurationFree} />
									</span>
								)}
							</div>
							{recurringFee && (
								<div className="fee">
									<FormattedMessage
										{...addonMessages.configurationRecurrentFees}
										values={{
											period: get(recurringFee, "recurringChargePeriod.interval", "").toLowerCase(),
										}}
									/>
									<span className="fee-value">
										<OcCurrency
											cost={recurringFee.taxIncludedAmount}
											currency={recurringFee.currency}
											ignoreSpaces={true}
										/>
									</span>
								</div>
							)}
						</div>
					</div>
				);
			})}
		</>
	);
};

export { AddonActivationFees, AddonActivationFeesProps };

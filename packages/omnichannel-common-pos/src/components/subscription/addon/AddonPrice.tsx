import { FC } from "react";
import { PriceRange } from "../../../redux/types";
import cssns from "../../../utils/cssnsConfig";
import addonMessages from "./Addon.messages";
import OcCurrency from "../../ocComponents/OcCurrency";
import { FormattedMessage } from "../../../channelUtils";
const { React} = cssns("AddonPrice");

interface AddonPriceProps {
	range: PriceRange | undefined;
	justifyStart?: boolean;
}

const AddonPrice: FC<AddonPriceProps> = props => {
	const { range, justifyStart } = props;
	const min = range ? range.min : undefined;
	const max = range ? range.max : undefined;
	const currency = range ? range.currency : undefined;
	const containerClassName = "container" + (justifyStart ? " justify-start" : "");
	const showFrom = range && max && max !== min;
	return (
		<div className={containerClassName}>
			{showFrom && (
				<span className="starts-from-text">
						<FormattedMessage
							{...addonMessages.startsFrom}
							values={{
								currency: (<OcCurrency className="currency" cost={min} currency={currency}/>)
							}}
						/>
				</span>
			)}
			{!showFrom && (min && currency) && (
				<OcCurrency className="currency" cost={min} currency={currency}/>
			)}
		</div>
	);
};

AddonPrice.displayName = "AddonPrice";

export default AddonPrice;
export {
	AddonPriceProps
};

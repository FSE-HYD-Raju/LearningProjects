import cssns from "../../utils/cssnsConfig";
import OcCurrency from "../ocComponents/OcCurrency";
import classnames from "classnames";
import { SimplePrice } from "../../redux/types";
import FormattedMessage from "../../channelUtils/FormattedMessage";
import messages from "./ProductOfferingConfiguration.messages";
const { React } = cssns("ProductOfferingConfigurationPrice");

interface ProductOfferingConfigurationPriceProps {
	upfrontPrice?: SimplePrice;
	recurringPrice?: SimplePrice;
	selected?: boolean;
}

const ProductOfferingConfigurationPrice: React.FC<ProductOfferingConfigurationPriceProps> = (props: ProductOfferingConfigurationPriceProps) => {
	const { upfrontPrice, recurringPrice, selected } = props;

	return (
		<div className="container">
			{(upfrontPrice && upfrontPrice.taxFreeAmount && (
				<OcCurrency
					cost={upfrontPrice.taxFreeAmount}
					currency={upfrontPrice.currency}
					className={classnames({
						unselected: !selected
					})}
				/>
			)) ||
			(recurringPrice && recurringPrice.taxFreeAmount && (
				<span>
					<OcCurrency
						cost={recurringPrice.taxFreeAmount}
						currency={recurringPrice.currency}
						className={classnames({
							unselected: !selected
						})}
					/>
					<FormattedMessage {...messages.offeringConfigPriceMth} />
				</span>
			)) || (
				<span
					className={classnames({
						"oc-currency": true,
						unselected: !selected
					})}
				>
					<FormattedMessage {...messages.offeringConfigFree} />
				</span>
			)}
		</div>
	);
};

export default ProductOfferingConfigurationPrice;
export {
	ProductOfferingConfigurationPriceProps,
};

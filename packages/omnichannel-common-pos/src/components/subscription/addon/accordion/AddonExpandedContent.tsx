import messages from "../../../../commonMessages";
import { FC } from "react";
import { CharacteristicsContent } from "./CharacteristicsContent";
import AddonPrice from "../AddonPrice";
import cssns from "../../../../utils/cssnsConfig";
import { PriceTypeEnum, Product, ProductOffering } from "../../../../redux/types";
import ProductUtil from "../../../../utils/product/ProductUtil";
import ProductOfferingUtil from "../../../../utils/ProductOfferingUtil";
import { FormattedMessage } from "../../../../channelUtils";

const { React } = cssns("AddonsTabView");

interface AddonExpandedContentProps {
	addon: ProductOffering | Product;
}

const AddonExpandedContent: FC<AddonExpandedContentProps> = props => {
	const { addon } = props;

	if (!addon) {
		return <span />;
	}
	const name = ProductUtil.getProductName(addon) || " - ";
	const descriptionLong = ProductOfferingUtil.getCommercialEnrichmentValueFromPO(addon, "names", "long-name");
	const descriptionDetailed = ProductOfferingUtil.getCommercialEnrichmentValueFromPO(addon, "descriptions", "detailed");
	const upfrontPrice = ProductOfferingUtil.getPriceRange(addon, PriceTypeEnum.ONE_TIME);
	const recurringPrice = ProductOfferingUtil.getPriceRange(addon, PriceTypeEnum.RECURRENT);

	return (
		<div id={"addon-expanded-content-" + addon.id} className="addon-expanded-content">
			<div className="addon-expanded-content-addon-details">
				{(descriptionLong || descriptionDetailed) && (
					<div className="addon-expanded-content-addon-details-name">
						<div>{descriptionLong}</div>
						<div className="addon-expanded-content-addon-description">{descriptionDetailed}</div>
					</div>
				)}
				<div className="addon-expanded-content-addon-details-price">
					{ProductUtil.hasPrice(upfrontPrice) && (
						<div className="addon-expanded-content-addon-details-price-upfront">
							<FormattedMessage {...messages.subscriptionAddonActivationFee}/>
							<AddonPrice range={upfrontPrice} justifyStart={true}/>
						</div>
					)}
					{ProductUtil.hasPrice(recurringPrice) && (
						<div className="addon-expanded-content-addon-details-price-recurrent">
							<FormattedMessage {...messages.subscriptionAddonRecurringFee}/>
							<AddonPrice range={recurringPrice} justifyStart={true}/>
						</div>
					)}
				</div>
			</div>
			<CharacteristicsContent characteristics={(addon as Product).characteristics}/>
		</div>
	);
};

export {
	AddonExpandedContent,
	AddonExpandedContentProps,
};

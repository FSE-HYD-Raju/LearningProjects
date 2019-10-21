import {
	MsisdnSofReservationInfo,
	ProductOffering,
	ProductOfferingGroup,
	ProductPath,
} from "../../../../redux";

import { ContextType, contextTypesValidationMap } from "../../../../types";
import { default as ProductOfferingGroupSliderContainer } from "./configurablesubscription/ProductOfferingGroupSliderContainer";
import ProductOfferingGroupConfiguration from "./ProductOfferingGroupConfiguration";
import cssns from "../../../../utils/cssnsConfig";
import ConfigurableSubscriptionUtils from "./configurablesubscription/ConfigurableSubscription.utils";
import { ProductOfferingMsisdnConfigurationProps } from "../utils/ProductOfferingMsisdnConfigurationProps";
import { FC } from "react";

const { React } = cssns("ProductOfferingGroupsConfiguration");

interface ProductOfferingGroupsConfigurationProps extends ProductOfferingMsisdnConfigurationProps {
	productOfferingGroups?: ProductOfferingGroup[];
	path: ProductPath;
	product: ProductOffering;
	msisdnReservationRequired?: boolean;
	selectProductOffering: (path: ProductPath, value: string, productOfferings: ProductOffering[]) => void;
	isAddonVisible: boolean;
	onChangeEvent: (path: ProductPath, pog: ProductOfferingGroup, po: ProductOffering) => void;
}

const ProductOfferingGroupsConfiguration: FC<ProductOfferingGroupsConfigurationProps> =
	(props: ProductOfferingGroupsConfigurationProps, context: ContextType) => {
		const { productOfferingGroups, path, product } = props;
		if (!productOfferingGroups) {
			return null;
		}
		let productOfferingGroupsToDisplay = productOfferingGroups;
		let configurablesubscriptionComponent = null;

		if (ConfigurableSubscriptionUtils.isConfigurableSubscriptionProductOffering(product)) {
			productOfferingGroupsToDisplay = productOfferingGroups.filter(
				pog => !ConfigurableSubscriptionUtils.isAllowanceProductOfferingGroupForSlider(pog)
			);

			configurablesubscriptionComponent = (
				<div className="slider-container">
					<ProductOfferingGroupSliderContainer flux={context.flux} product={product} path={path} />
				</div>
			);
		}

		return (
			<div>
				{configurablesubscriptionComponent}
				{productOfferingGroupsToDisplay.map((pog: ProductOfferingGroup, pogIdx: number) => (
					<ProductOfferingGroupConfiguration
						key={`${pog.id}-${pogIdx}`}
						pog={pog}
						pogIdx={pogIdx}
						{...props}
					/>
				))}
			</div>
		);
	};

ProductOfferingGroupsConfiguration.contextTypes = contextTypesValidationMap;

export default ProductOfferingGroupsConfiguration;
export {
	ProductOfferingGroupsConfigurationProps,
};

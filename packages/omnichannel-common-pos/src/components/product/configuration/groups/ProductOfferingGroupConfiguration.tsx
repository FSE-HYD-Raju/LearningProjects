import getSelectedProductOfferingProperties from "./getSelectedProductOfferingProperties";
import { ProductOfferingGroup } from "../../../../redux";
import { isEmpty } from "lodash";
import ProductOfferingGroupMsisdnSelectionContainer from "./ProductOfferingGroupMsisdnSelectionContainer";
import ProductOfferingGroupSelect from "./ProductOfferingGroupSelect";
import { ContextType, contextTypesValidationMap } from "../../../../types";
import { ProductOfferingGroupsConfigurationProps } from "./ProductOfferingGroupsConfiguration";
import ProductOfferingGroupCheckbox from "./ProductOfferingGroupCheckbox";
import isCheckboxRendering from "./isProductOfferingGroupCheckboxRendering";
import cssns from "../../../../utils/cssnsConfig";
import { FC } from "react";

const { React } = cssns("ProductOfferingGroupConfiguration");

interface ProductOfferingGroupConfigurationProps extends ProductOfferingGroupsConfigurationProps {
	pog: ProductOfferingGroup;
	pogIdx: number;
	isAddonVisible: boolean;
}

const isMsisdnSelectionRendering = (pog: ProductOfferingGroup, needsMsisdnConfig?: boolean) =>
	pog && pog.msisdnGroup && needsMsisdnConfig;

const isSelectRendering = (pog: ProductOfferingGroup) => pog && pog.cardinality && (!pog.cardinality.min
	|| pog.cardinality.min === 1) && pog.cardinality.max === 1 && !pog.msisdnGroup;

const ProductOfferingGroupConfiguration: FC<ProductOfferingGroupConfigurationProps> = (props, context: ContextType) => {
	const {
		pog,
		pogIdx,
		path,
		product,
		msisdnConfig,
		toggleMsisdnModal,
		userOpened,
		selectProductOffering,
		msisdnReservationRequired,
		msisdnModalVisible,
		isAddonVisible,
		onChangeEvent,
	} = props;

	const { selectedProductId, upfrontPrice, recurringPrice } = getSelectedProductOfferingProperties(pog);
	let component = null;
	if (isMsisdnSelectionRendering(pog, !isEmpty(msisdnConfig))) {
		component = (
			<ProductOfferingGroupMsisdnSelectionContainer
				flux={context.flux}
				msisdnReservationRequired={msisdnReservationRequired}
				product={product}
				pog={pog}
				path={path}
				upfrontPrice={upfrontPrice}
				recurringPrice={recurringPrice}
				msisdnConfig={msisdnConfig}
				msisdnModalVisible={msisdnModalVisible}
				toggleMsisdnModal={toggleMsisdnModal}
				userOpened={userOpened}
			/>
		);
	} else if (isSelectRendering(pog)) {
		component = (
			<ProductOfferingGroupSelect
				pog={pog}
				path={path}
				selectedValue={selectedProductId || "0"}
				upfrontPrice={upfrontPrice}
				isAddonVisible={isAddonVisible}
				recurringPrice={recurringPrice}
				msisdnConfig={msisdnConfig}
				msisdnModalVisible={msisdnModalVisible}
				selectProductOffering={selectProductOffering}
				toggleMsisdnModal={toggleMsisdnModal}
				userOpened={userOpened}
			/>
		);
	} else if (isCheckboxRendering(pog)) {
		component = (
			<ProductOfferingGroupCheckbox
				pog={pog}
				path={path}
				onChangeEvent={onChangeEvent}
				isAddonVisible={props.isAddonVisible}
				toggleMsisdnModal={toggleMsisdnModal}
				userOpened={userOpened}
				msisdnConfig={msisdnConfig}
				msisdnModalVisible={msisdnModalVisible}
			/>
		);
	}
	return (
		<div className="group-container" key={`${pog.id}_${pogIdx}`}>
			{component}
		</div>
	);
};

ProductOfferingGroupConfiguration.contextTypes = contextTypesValidationMap;

export default ProductOfferingGroupConfiguration;
export {
	ProductOfferingGroupConfigurationProps,
};

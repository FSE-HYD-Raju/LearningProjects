import { ProductOffering, ProductPath, ProductOfferingGroup, PriceTypeEnum } from "../../../../redux";
import ProductOfferingUtil from "../../../../utils/ProductOfferingUtil";
import cssns from "../../../../utils/cssnsConfig";
import ProductOfferingConfigurationUtil from "../utils/ProductOfferingConfigurationUtil";
import PortIn from "../../portIn/PortIn";
import OcInput from "../../../ocComponents/OcInput";
import { FC } from "react";
import ProductOfferingConfigurationContainer from "../../ProductOfferingConfigurationContainer";
import { ContextType, contextTypesValidationMap } from "../../../../types";
import { ProductOfferingMsisdnConfigurationProps } from "../utils/ProductOfferingMsisdnConfigurationProps";

import ProductOfferingConfigurationPrice from "../../ProductOfferingConfigurationPrice";
const { React } = cssns("ProductOfferingGroupCheckbox");

export interface ProductOfferingGroupCheckboxOwnProps extends ProductOfferingMsisdnConfigurationProps {
	pog: ProductOfferingGroup;
	path: ProductPath;
	onChangeEvent: (path: ProductPath, pog: ProductOfferingGroup, po: ProductOffering) => void;
	isAddonVisible: boolean;
}

const getCheckboxId = (path: ProductPath, pog: ProductOfferingGroup, po: ProductOffering): string =>
	`pog_checkox_${ProductOfferingUtil.pathToStringFromPathType(path)}_${pog.id}_${po.id}`;

const ProductOfferingGroupCheckbox: FC<ProductOfferingGroupCheckboxOwnProps> = (props: ProductOfferingGroupCheckboxOwnProps, context: ContextType) => {
	const { pog, path, onChangeEvent } = props;
	const productOfferings = pog.productOfferings || [];
	const renderedProducts = productOfferings
		.filter(po => !(!props.isAddonVisible && ProductOfferingConfigurationUtil.isProductForRenderByCharacteristics(po)))
		.map(po => {
			const upfrontPrice = ProductOfferingUtil.getPrice(po, PriceTypeEnum.ONE_TIME);
			const recurringPrice = ProductOfferingUtil.getPrice(po, PriceTypeEnum.RECURRENT);

			const selected = Boolean(po.selected);
			const renderPortIn = !ProductOfferingConfigurationUtil.isProductForRenderByCharacteristics(po);
			const inputComponent = renderPortIn ? (
				<PortIn
					selected={po.selected === undefined ? "" : po.selected}
					onChange={() => onChangeEvent(path, pog, po)}
				/>
			) : (
				<OcInput
					id={getCheckboxId(path, pog, po)}
					type="checkbox"
					checked={selected}
					onChange={() => onChangeEvent(path, pog, po)}
					label={ProductOfferingUtil.getPOName(po)}
					className="port-in-input"
				/>
			);
			return (
				<div key={po.id}>
					<div className="port-in-container" key={po.id}>
						<div className="port-in-input-container">{inputComponent}</div>

						<div className="port-in-price">
							<ProductOfferingConfigurationPrice
								upfrontPrice={upfrontPrice}
								recurringPrice={recurringPrice}
								selected={selected}
							/>
						</div>

						{/*noprices && <span className='oc-currency'>{`0`}</span>*/}

						{/* render the selected POs under each checkbox */}
					</div>

					{selected && (// TODO: this should be re-engineered, checkbox shouldn't contain POC component
						<ProductOfferingConfigurationContainer
							flux={context.flux}
							isAddonVisible={props.isAddonVisible}
							msisdnConfig={props.msisdnConfig}
							toggleMsisdnModal={props.toggleMsisdnModal}
							userOpened={props.userOpened}
							msisdnModalVisible={props.msisdnModalVisible}
							path={path.concat({
								pog: pog.id
							})}
							product={po}
						/>
					)}
				</div>
			);
		});
	return (
		<div>
			{renderedProducts.length > 0 && <h4 className="group-title">{ProductOfferingUtil.getPOGName(pog)}</h4>}
			{renderedProducts}
		</div>
	);
};
ProductOfferingGroupCheckbox.contextTypes = contextTypesValidationMap;
export default ProductOfferingGroupCheckbox;

import ProductOfferingUtil from "../../../../utils/ProductOfferingUtil";
import cssns from "../../../../utils/cssnsConfig";
import {
	ProductOfferingGroup,
	SimplePrice,
	ProductOffering,
	ProductPath,
	AppState,
} from "../../../../redux";
import OcSelect from "../../../ocComponents/OcSelect";
import ProductOfferingConfigurationPrice from "../../ProductOfferingConfigurationPrice";
import ProductOfferingConfigurationContainer  from "../../ProductOfferingConfigurationContainer";
import { ProductOfferingMsisdnConfigurationProps } from "../utils/ProductOfferingMsisdnConfigurationProps";
import { FC } from "react";
import messages from "./ProductOfferingConfigurationMsisdnSelection.messages";
import { ContextType, contextTypesValidationMap } from "../../../../types";
import FormattedMessage from "../../../../channelUtils/FormattedMessage";
import { connect } from "react-redux";

const { React } = cssns("ProductOfferingGroupSelect");

export interface ProductOfferingGroupSelectOwnProps extends ProductOfferingMsisdnConfigurationProps {
	pog: ProductOfferingGroup;
	path: ProductPath;
	selectedValue: string;
	isAddonVisible: boolean;
	upfrontPrice?: SimplePrice;
	recurringPrice?: SimplePrice;
	commercialProductOfferingId: string;
	selectProductOffering: (path: ProductPath, value: string, productOfferings: ProductOffering[]) => void;
}

const getSelectId = (path: ProductPath, pog: ProductOfferingGroup): string =>
	`pog_select_${ProductOfferingUtil.pathToStringFromPathType(path)}_${pog.id}`;

const getNoneOptionId = (path: ProductPath, pog: ProductOfferingGroup): string =>
	`pog_select_${ProductOfferingUtil.pathToStringFromPathType(path)}_${pog.id}_option-none`;

const getOptionId = (path: ProductPath, pog: ProductOfferingGroup, po: ProductOffering): string =>
	`pog_select_${ProductOfferingUtil.pathToStringFromPathType(path)}_${pog.id}_option-${po.id}`;

const isNoneAllowedForGroup = (pog: ProductOfferingGroup): boolean => !(pog.cardinality && pog.cardinality.min);

const ProductOfferingGroupSelect: FC<ProductOfferingGroupSelectOwnProps> = (props: ProductOfferingGroupSelectOwnProps, context: ContextType) => {
	const {
		pog,
		path,
		selectedValue,
		upfrontPrice,
		recurringPrice,
		msisdnConfig,
		selectProductOffering,
		commercialProductOfferingId
	} = props;

	const productOfferings = pog.productOfferings || [];

	const onChangeSelectHandler = (event: any) =>
		selectProductOffering(
			path.concat({
				pog: pog.id
			}),
			event.target.value,
			productOfferings
		);
	const selectedProductOfferings = productOfferings.filter((po: ProductOffering) => po.selected);
	return (
		( pog.id != commercialProductOfferingId &&
		<div>
			<h4 className="group-title">{ProductOfferingUtil.getPOGName(pog)}</h4>
			<div className="pog-select-container">
				<OcSelect
					className="pog-select"
					id={getSelectId(path, pog)}
					key={pog.id}
					value={selectedValue}
					onChange={onChangeSelectHandler}
					placeholder={ProductOfferingUtil.getPOGName(pog)}
					required={pog.cardinality && pog.cardinality.min === 1}
				>
					{isNoneAllowedForGroup(pog) && (
						<FormattedMessage {...messages.none}>
							{(message) => <option id={getNoneOptionId(path, pog)} value="0">{message}</option>}
						</FormattedMessage>
					)}
					{productOfferings.map((po: ProductOffering) => {
						return (
							<option key={po.id} value={po.id} id={getOptionId(path, pog, po)}>
								{ProductOfferingUtil.getPOName(po)}
							</option>
						);
					})}
				</OcSelect>

				<div className="price">
					<ProductOfferingConfigurationPrice
						upfrontPrice={upfrontPrice}
						recurringPrice={recurringPrice}
						selected={true}
					/>
				</div>
			</div>

			{/* render the selected POs under the select */}

			{selectedProductOfferings.map((po: ProductOffering) => (
				<ProductOfferingConfigurationContainer
					flux={context.flux}
					isAddonVisible={props.isAddonVisible}
					key={po.id}
					path={path.concat({
						pog: pog.id
					})}
					product={po}
					msisdnConfig={msisdnConfig}
					msisdnModalVisible={props.msisdnModalVisible}
					toggleMsisdnModal={props.toggleMsisdnModal}
					userOpened={props.userOpened}
				/>
			))}
		</div>
	)
	);
};

const mapStateToProps = (state: AppState) => {
	return {
		commercialProductOfferingId: state.feature.commercialProductOfferingId,
	};
};

ProductOfferingGroupSelect.contextTypes = contextTypesValidationMap;

export default connect(mapStateToProps)(ProductOfferingGroupSelect);

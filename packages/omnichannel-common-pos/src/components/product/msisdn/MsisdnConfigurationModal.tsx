import { PureComponent } from "react";
import cssns from "../../../utils/cssnsConfig";
import { get } from "lodash";
import ProductOfferingUtil from "../../../utils/ProductOfferingUtil";
import {
	ProductOffering,
	ProductPath,
	BasketActionAddProductToBasketOptions,
	MsisdnWithCost,
} from "../../../redux";
import MsisdnSelectionContainer from "../../msisdnSelection/MsisdnSelectionContainer";
import { findMsisdnGroupFromProductOffering } from "../../../redux/models/msisdnSelection/msisdnSelection.utils";
import ComplexPriceComponent from "../../priceComponent/ComplexPriceComponent";
import { Configurations } from "../../../redux";

const { React } = cssns("MsisdnConfigurationModal");

interface MsisdnConfigurationModalActionProps {
	actions: {
		handleClose: () => void;
		selectProductOffering: (path: ProductPath, value: string, productOfferings: ProductOffering[]) => void;
		saveNumber: (path: ProductPath, key: string, value: string) => void;
		addProduct: (options: BasketActionAddProductToBasketOptions) => void;
	};
}

interface MsisdnConfigurationModalStateProps {
	product: ProductOffering;
	path: ProductPath;
	msisdnConfig: { msisdn?: string };
	userOpened?: boolean;
	selectedMsisdn?: MsisdnWithCost;
	priceAttribute: string;
	configurations: Configurations;
}

type MsisdnConfigurationModalProps = MsisdnConfigurationModalActionProps & MsisdnConfigurationModalStateProps;

interface MsisdnConfigurationModalState {}

class MsisdnConfigurationModal extends PureComponent<MsisdnConfigurationModalProps, MsisdnConfigurationModalState> {
	componentWillReceiveProps(newprops: MsisdnConfigurationModalProps) {
		const { product, userOpened } = newprops;

		/* User has tried to add a product to basket, but it required MSISDN configuration. If user has successfully
		configured the product, add the product to basket */
		if (this.props.product.id === product.id && !get(this.props, "msisdnConfig.msisdn")
			&& get(newprops, "msisdnConfig.msisdn") && !userOpened) {
			// addProduct && addProduct();
			// TODO: Support adding directly to basket
		}
	}

	saveNumber = (selectedNumberType: ProductOffering) => {
		const numberPath = ProductOfferingUtil.getPathToProductOfferingById(this.props.product, selectedNumberType.id);

		const pogPath = numberPath && numberPath.slice(0, -1);
		const msisdnPog = findMsisdnGroupFromProductOffering(this.props.product);
		const numberClassPOs = ProductOfferingUtil.getProductOfferings(msisdnPog);

		if (numberPath && pogPath && msisdnPog && this.props.selectedMsisdn && this.props.selectedMsisdn.msisdn) {
			this.props.actions.selectProductOffering(numberPath.slice(0, -1), selectedNumberType.id, numberClassPOs);

			this.props.actions.saveNumber(
				this.props.path || pogPath.slice(0, -1),
				"CH_NumberResource",
				this.props.selectedMsisdn.msisdn
			);
		}
	};

	render() {
		const { product, selectedMsisdn, priceAttribute, configurations } = this.props;
		if (selectedMsisdn && selectedMsisdn.productOffering &&
			product.attributes && product.attributes.productOfferingGroups) {
			const pogs = ProductOfferingUtil.updateProductOfferingGroupsWithSelectedMsisdn(
				ProductOfferingUtil.getProductOfferingGroups(product),
				selectedMsisdn.productOffering
			);

			// Now fill product with updated productOfferingGroups
			product.attributes.productOfferingGroups.splice(0, product.attributes.productOfferingGroups.length, ...pogs);
		}

		return product ? (
			<div className="modal-container">
				<div className="pattern-selector">
					<MsisdnSelectionContainer productId={product.id} />
				</div>
				<div className="price-component">
					<ComplexPriceComponent
						product={product}
						configurations={configurations}
						priceAttribute={priceAttribute}
					/>
				</div>
			</div>
		) : null;
	}
}

export default MsisdnConfigurationModal;
export {
	MsisdnConfigurationModalActionProps,
	MsisdnConfigurationModalStateProps,
	MsisdnConfigurationModalProps,
	MsisdnConfigurationModalState
};

import { isEmpty } from "lodash";
import ProductOfferingUtil from "../../utils/ProductOfferingUtil";
import cssnsConfig from "../../utils/cssnsConfig";
import OcCurrency from "../ocComponents/OcCurrency";
import messages from "./Basket.messages";
import { ProductOffering } from "../../redux/types";
import FormattedMessage from "../../channelUtils/FormattedMessage";
import OcInput from "../ocComponents/OcInput";
import OcModal from "../ocComponents/OcModal";

const { React } = cssnsConfig("BasketDiscountModal");

interface BasketDiscountModalStateProps {
	discounts?: Array<ProductOffering>;
	selectedDiscount?: ProductOffering;
}

interface BasketDiscountModalActionProps {
	actions: {
		selectDiscount: (discount: ProductOffering) => void;
		applyDiscountToBasket: () => void;
		toggleDiscountModal: () => void;
		closeModal: () => void;
	};
}

type BasketDiscountModalProps = BasketDiscountModalStateProps & BasketDiscountModalActionProps;

const BasketDiscountModal = (props: BasketDiscountModalProps) => {
	const renderDiscountPrice = (discount = props.selectedDiscount) => {
		const price = ProductOfferingUtil.getUpfrontPriceRange(discount);
		return (
			<span className="oc-currency">
				<FormattedMessage {...messages.discountPricePrefix} />
				<OcCurrency cost={price.max} currency={price.currency} />
			</span>
		);
	};

	return (
		<OcModal
			showModal={true}
			smallModal={true}
			title={<FormattedMessage {...messages.selectDiscount}/>}
			onClose={() => {props.actions.closeModal(); }}
			onOk={() => {props.actions.applyDiscountToBasket(); }}
			okDisabled={isEmpty(props.selectedDiscount)}
			okButtonLabel={<FormattedMessage {...messages.done}/>}
		>
			{props.discounts && props.discounts.length > 0 ? (
				<div className="container">
					<b><FormattedMessage {...messages.availableDiscounts}/></b>
					<div className="discounts-container">
						{props.discounts.map((discount: ProductOffering) => {
							return (
								<div
									className="discount-item"
									key={discount.id}
									onClick={() => {props.actions.selectDiscount(discount); }}
								>
									<OcInput
										key={discount.id}
										type="radio"
										checked={props.selectedDiscount && props.selectedDiscount.id === discount.id}
										label={discount.attributes && discount.attributes.name}
									/>
									{renderDiscountPrice(discount)}
								</div>
							);
						})}
					</div>
				</div>
			) : (<FormattedMessage {...messages.noAvailableDiscounts} />)}
		</OcModal>
	);
};

export default BasketDiscountModal;
export {
	BasketDiscountModalProps,
	BasketDiscountModalStateProps,
	BasketDiscountModalActionProps,
};

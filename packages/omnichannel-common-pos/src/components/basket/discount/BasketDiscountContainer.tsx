import { PureComponent } from "react";
import { isEmpty } from "lodash";
import cssns from "../../../utils/cssnsConfig";
import { Basket, BasketItem, ProductOffering } from "../../../redux/types";
import FormattedMessage from "../../../channelUtils/FormattedMessage";
import BasketDiscountModal from "../BasketDiscountModal";
import ProductOfferingUtil from "../../../utils/ProductOfferingUtil";
import OcCurrency from "../../ocComponents/OcCurrency";
import messages from "../Basket.messages";

const { React } = cssns("BasketDiscountContainer");

interface BasketDiscountContainerStateProps {
	activeBasket: Basket;
	selectedDiscount?: ProductOffering;
	basketItems: Array<BasketItem>;
	discounts?: Array<ProductOffering>;
	selectedCurrency: string;
}

interface BasketDiscountContainerActionProps {
	actions: {
		fetchDiscounts: (s: string) => void;
		removeSelectedDiscount: () => void;
		applyDiscountToBasket: (discount: ProductOffering) => void;
	};
}

interface BasketDiscountContainerState {
	selectedDiscount?: ProductOffering;
	showDiscountModal: boolean;
}

type BasketDiscountContainerProps = BasketDiscountContainerStateProps & BasketDiscountContainerActionProps;

class BasketDiscountContainer extends PureComponent<BasketDiscountContainerProps, BasketDiscountContainerState> {
	static displayName = "BasketDiscountContainer";

	constructor(props: BasketDiscountContainerProps) {
		super(props);
		this.state = {
			selectedDiscount: undefined,
			showDiscountModal: false
		};
	}

	componentWillReceiveProps(props: BasketDiscountContainerProps) {
		if (props.selectedCurrency !== this.props.selectedCurrency) {
			this.updateDiscounts();
		}
	}

	componentDidMount() {
		this.updateDiscounts();
	}

	updateDiscounts = () => {
		if (this.props.activeBasket) {
			if (this.props.actions.fetchDiscounts) {
				this.props.actions.fetchDiscounts(this.props.activeBasket.id);
			}
		}
	};

	toggleDiscountModal = () => {
		if (!this.state.showDiscountModal) {
			this.updateDiscounts();
		}
		this.setState({
			showDiscountModal: !this.state.showDiscountModal
		});
	};

	closeDiscountModal = () => {
		this.setState({
			showDiscountModal: false
		});
	};

	setSelectedDiscount = (discount: ProductOffering) => {
		this.setState({
			selectedDiscount: discount
		});
	};

	removeSelectedDiscount = () => {
		if (this.props.actions.removeSelectedDiscount) {
			this.props.actions.removeSelectedDiscount();
		}
	};

	applyDiscountToBasket = () => {
		if (this.props.actions.applyDiscountToBasket && this.state.selectedDiscount) {
			this.props.actions.applyDiscountToBasket(this.state.selectedDiscount);
		}
		this.closeDiscountModal();
	};

	renderDiscountPrice = (discount: ProductOffering | undefined = this.props.selectedDiscount) => {
		const price = ProductOfferingUtil.getUpfrontPriceRange(discount);

		return (
			<span className="oc-currency">
				<FormattedMessage {...messages.discountPricePrefix} />
				<OcCurrency cost={price.max} currency={price.currency} />
			</span>
		);
	};

	render() {
		const {
			basketItems,
			discounts,
			selectedDiscount
		} = this.props;

		return (
			<div className="container">
				{!isEmpty(basketItems) && !isEmpty(discounts) ? this.props.selectedDiscount ? (
					<div className="discount-selection">
						<div className="inner-container">
							<span className="discount-label">
								<FormattedMessage {...messages.discount}/>
							</span>
							<div className="columns">
								<div className="discount-line">
									<b className="selected-discount-name">
										{selectedDiscount && selectedDiscount.attributes && selectedDiscount.attributes.name}
									</b>{" "}
									<b>
										{this.renderDiscountPrice(this.props.selectedDiscount)}
									</b>
								</div>

								<a
									className="change-discount-link"
									onClick={this.toggleDiscountModal}
								>
									<FormattedMessage {...messages.changeDiscount} />
								</a>

								<a
									onClick={() => this.removeSelectedDiscount()}
									className="remove-link"
								>
									<FormattedMessage {...messages.removeDiscount}/>
								</a>
							</div>
						</div>
					</div>
				) : (
					<a
						onClick={this.toggleDiscountModal}
						className="select-link"
					>
						<FormattedMessage {...messages.selectDiscountButton}/>
					</a>
				) : (<span />)}

				{this.state.showDiscountModal && (
					<BasketDiscountModal
						actions={{
							selectDiscount: this.setSelectedDiscount,
							closeModal: this.closeDiscountModal,
							applyDiscountToBasket: this.applyDiscountToBasket,
							toggleDiscountModal: this.toggleDiscountModal,
						}}
						discounts={this.props.discounts}
						selectedDiscount={this.state.selectedDiscount}
					/>
				)}
			</div>
		);
	}
}

export default BasketDiscountContainer;
export {
	BasketDiscountContainerProps,
	BasketDiscountContainerState,
	BasketDiscountContainerStateProps,
	BasketDiscountContainerActionProps
};

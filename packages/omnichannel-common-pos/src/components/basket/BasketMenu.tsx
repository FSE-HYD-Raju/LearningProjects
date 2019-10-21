import * as R from "react"; // Removing this causes TS compiler error
import cssns from "../../utils/cssnsConfig";
import OcCurrency from "../ocComponents/OcCurrency";
import { first, drop, get } from "lodash";
import { Link } from "react-router-dom";
import { Basket, BasketItem } from "../../redux/types";
import BasketUtil from "../../utils/BasketUtil";
import messages from "./Basket.messages";
import { isChannelPos } from "../../utils/Channel.utils";
import { commonShopRoutes } from "../../routes/commonRoutesMap";
import FormattedMessage from "../../channelUtils/FormattedMessage";
import { withCustomization } from "../../customization";
import { CommonCustomizationPoints } from "../../customization/points";
import ProductOfferingUtil from "../../utils/ProductOfferingUtil";

const React: typeof R = cssns("BasketMenu").React;

const getName = (product: BasketItem | undefined): string => {
	return (
		get(product, "attributes.name") ||
		get(product, "attributes.product.name")
	);
};

interface BasketMenuActionProps {
	actions: {
		toggleBasketMenu: () => void;
	};
}

interface BasketMenuStateProps {
	basketItems: Array<BasketItem>;
	showBasketMenuNotification: boolean;
	activeBasket: Basket;
	isUser: boolean;
}

interface BasketMenuActionButtonsStateProps {
	checkoutRoute: string;
}

interface BasketMenuActionButtonsActions {
	actions: {
		toggleBasketMenu: () => void;
	};
}

type BasketMenuActionButtonsProps = BasketMenuActionButtonsStateProps & BasketMenuActionButtonsActions;

type BasketMenuProps = BasketMenuActionProps & BasketMenuStateProps;

const BasketMenuActions: React.FC<BasketMenuActionButtonsProps> = props =>
	<div className="actions">
		<Link
			to={commonShopRoutes.BASKET.createLink()}
			className="btn btn-outline-primary basketMenu-button"
			id="basket-menu-go-to-basket"
			onClick={props.actions.toggleBasketMenu}
		>
			<FormattedMessage {...messages.viewBasket} />
		</Link>
		<Link
			to={props.checkoutRoute}
			className="btn btn-primary basketMenu-button"
			id="goToCheckoutFromBasketMenu"
			onClick={props.actions.toggleBasketMenu}
		>
			<FormattedMessage {...messages.goToCheckout}/>
		</Link>
	</div>;

const CustomizedBasketMenuActions = withCustomization<BasketMenuActionButtonsProps>(CommonCustomizationPoints.BASKET_POPUP_FOOTER_ACTIONS, BasketMenuActions);

const BasketMenu: React.FC<BasketMenuProps> = props => {
	const {
		basketItems,
		showBasketMenuNotification,
		activeBasket,
		isUser,
		actions
	} = props;

	const totalUpfrontPrice = get(activeBasket, "attributes.totalUpfrontPrice");
	const basketCurrency = BasketUtil.getBasketCurrency(activeBasket);
	const totalRecurringPrice = BasketUtil.getPrice(activeBasket, "RECURRENT");

	/*
    	TODO:
		Back end data (basketItems) are not guaranteed to be in order.
		To show last item added data needs 'created time' or some time stamp data.
		Timo created a tasks for this.
    */

	const rowCount = basketItems && basketItems.length;
	const lastItemAdded: BasketItem | undefined = first(basketItems);
	const restOfTheItems = drop(basketItems);
	const countPlaceholder = "1 ×";
	const checkoutRoute = isUser ? commonShopRoutes.CHECKOUT.createLink() : commonShopRoutes.CHECKOUT_LOGIN_MODAL.createLink();

	return (
		<div className="BasketMenu">
			{rowCount > 0 && (
				<div>
					{showBasketMenuNotification && (
						<div className="notification">
							<i className="fa fa-check-circle notification-icon" />
							<span className="notification-text">
								<FormattedMessage {...messages.itemAdded} />
							</span>
							<i
								className="fa fa-times notification-close"
								onClick={props.actions.toggleBasketMenu}
							/>
						</div>
					)}

					<ul className="products">
						<li className="product">
							<span className="product-count">
								{countPlaceholder}
							</span>
							<span className="product-name">
							{(lastItemAdded &&
								lastItemAdded.attributes &&
								lastItemAdded.attributes.product &&
								ProductOfferingUtil.getPOName(lastItemAdded.attributes.product)) ||
								getName(lastItemAdded)}
							</span>
						</li>
						{restOfTheItems && restOfTheItems.map((basketItem, idx) => {
							return (
								<li
									key={`BasketMenu-items-${idx}`}
									className="product"
								>
										<span className="product-count">
											{countPlaceholder}
										</span>
									<span className="product-name">
											{(basketItem &&
												basketItem.attributes &&
												basketItem.attributes.product &&
												ProductOfferingUtil.getPOName(basketItem.attributes.product)) ||
												getName(basketItem)}
										</span>
								</li>
							);
						})}
					</ul>

					<div className="fee-upfront">
						<span className="fee-label">
							<FormattedMessage {...messages.upfront}/>
						</span>

						<span className="fee-amount">
							{totalUpfrontPrice && (
								<OcCurrency
									cost={totalUpfrontPrice}
									currency={basketCurrency}
								/>
							)}
						</span>
					</div>

					<div className="fees">
						<div className="fee-monthly">
							<span className="fee-label">
								<FormattedMessage {...messages.monthly}/>
							</span>

							<span className="fee-amount">
								{totalRecurringPrice && (
									<OcCurrency
										cost={totalRecurringPrice.taxFreeAmount}
										currency={totalRecurringPrice.currency}
									/>
								)}
							</span>
						</div>
					</div>

					{!isChannelPos() && (
						<CustomizedBasketMenuActions actions={props.actions} checkoutRoute={checkoutRoute}/>
					)}
				</div>
			)}
		</div>
	);
};

BasketMenu.displayName = "BasketMenu";

export { BasketMenuActionProps, BasketMenuStateProps, BasketMenuProps };
export default BasketMenu;

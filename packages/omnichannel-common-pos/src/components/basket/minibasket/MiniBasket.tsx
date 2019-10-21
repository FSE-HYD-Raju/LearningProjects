import { debounce, isEmpty } from "lodash";
import { Link } from "react-router-dom";
import { FC } from "react";
import BasketItems from "./BasketItems";
import BasketDiscountContainerRedux from "../discount/BasketDiscountContainerRedux";
import cssns from "../../../utils/cssnsConfig";
import {
	BasketActionDiscardBasket,
	Price,
	BasketActionRemoveFromBasket,
	BasketItem
} from "../../../redux/types";
import { ContextType, contextTypesValidationMap } from "../../../types";
import ActiveAgreementSelectContainer from "../ActiveAgreementSelectContainer";
import FormattedMessage from "../../../channelUtils/FormattedMessage";
import { commonServiceDeskRoutes } from "../../../routes/commonRoutesMap";
import messages from "./Basket.messages";

import MiniBasketErrorContainer from "./MiniBasketErrorContainer";
import { MiniBasketErrorType } from "../../../redux/models/basketError/basketError.types";

const { React } = cssns("MiniBasket");

interface MiniBasketStateProps {
	basketItems: Array<BasketItem>;
	referenceNumber: string;
	activeBasketId: string;
	activeCustomerId?: string;
	customerAccountId?: string;
	hideCheckoutButton?: boolean;
	basketLifeCycleStatusOpen: boolean;
	upfrontCost: Price;
	monthlyCost: Price;
	miniBasketErrors: Array<MiniBasketErrorType>;
}

type RemoveBasketErrors = () => void;
type ResetAddressWithBasketItemIdEntries = () => void;

interface MiniBasketActionProps {
	actions: {
		discardBasket: BasketActionDiscardBasket;
		removeFromBasket: BasketActionRemoveFromBasket;
		removeBasketErrors: RemoveBasketErrors;
		resetAddressWithBasketItemIdEntries: ResetAddressWithBasketItemIdEntries;
	};
}

type MiniBasketProps = MiniBasketStateProps & MiniBasketActionProps;

const MiniBasket: FC<MiniBasketProps> = (props: MiniBasketProps, context: ContextType) => {
	const discardBasket = (props: MiniBasketProps) => {
		const {
			activeBasketId: basketId,
			activeCustomerId: customerId
		} = props;
		if (customerId) {
			props.actions.discardBasket(basketId, customerId);
			props.actions.resetAddressWithBasketItemIdEntries();
		}
	};

	const {
		basketItems,
		monthlyCost,
		upfrontCost,
		referenceNumber,
		basketLifeCycleStatusOpen
	} = props;

	if (isEmpty(props.basketItems)) {
		return (
			<div className="MiniBasket w-box empty-basket">
				<h3>
					<FormattedMessage {...messages.minibasketTitle}/>
				</h3>
				<ActiveAgreementSelectContainer flux={context.flux}/>
				<div className="empty-basket-message">
					<i className="fa fa-shopping-cart empty-basket-icon"/>
					<FormattedMessage {...messages.minibasketEmpty}/>
				</div>
			</div>
		);
	}

	const removeBasketItem = debounce((basketItem: BasketItem) => {
				props.actions.removeFromBasket(basketItem, props.activeBasketId, false);
			},
		400,
		{ leading: true, trailing: false }
	);

	return (
		<div className="MiniBasket w-box">
			{referenceNumber && (
				<h5 className="reference-number">
					<FormattedMessage
						{...messages.miniBasketWithRefNumber}
						values={{
							referenceNumberMessage: (
								<span className="reference-number-text">
										<FormattedMessage
											{...messages.referenceNumber}
											values={{referenceNumber: props.referenceNumber}}
										/>
									</span>
							)
						}}
					/>
				</h5>
			)}
			{!referenceNumber && (
				<header className="header">
					<h3>
						<FormattedMessage  {...messages.minibasketTitle}/>
					</h3>
					<a
						id="minibasket-clear-basket-button"
						className="clear-button pointer"
						onClick={e => {
							e.preventDefault();
							discardBasket(props);
							props.actions.removeBasketErrors();
						}}
					>
						<i className="fa fa-trash btn-icon-left"/>
						<FormattedMessage  {...messages.clearBasket}/>
					</a>
				</header>
			)}

			<ActiveAgreementSelectContainer flux={context.flux}/>

			{
				props.miniBasketErrors && (
					<MiniBasketErrorContainer/>
				)
			}

			<BasketItems
				basketItems={basketItems}
				displayRemovalButton={basketLifeCycleStatusOpen}
				removeBasketItem={removeBasketItem}
				monthlyCost={monthlyCost}
				upfrontCost={upfrontCost}
			/>

			{!props.hideCheckoutButton && props.miniBasketErrors.length === 0 && (
				<footer>
					<Link
						to={commonServiceDeskRoutes.SERVICE_DESK_CHECKOUT.createLink()}
						className="btn btn-primary"
						id="minibasket-go-to-checkout-button"
					>
						<FormattedMessage {...messages.goToCheckout} />
					</Link>
					<BasketDiscountContainerRedux flux={context.flux}/>
				</footer>
			)}
		</div>
	);
};

MiniBasket.contextTypes = contextTypesValidationMap;

export default MiniBasket;
export {
	MiniBasketProps,
	MiniBasketStateProps,
	MiniBasketActionProps,
	RemoveBasketErrors
};

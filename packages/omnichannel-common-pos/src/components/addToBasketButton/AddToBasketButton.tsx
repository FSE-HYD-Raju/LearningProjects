import { isEmpty } from "lodash";
import { Link } from "react-router-dom";
import messages from "./AddToBasketButton.messages";
import { ProductOffering } from "../../redux/types";
import FormattedMessage from "../../channelUtils/FormattedMessage";
import cssns from "../../utils/cssnsConfig";
import { OcButton, OcButtonType } from "../ocComponents/button/OcButton";

const { React } = cssns("AddToBasketButton");

export interface AddToBasketButtonStateProps {
	product: ProductOffering;
	allowedToAddToBasket: boolean;
	updatingBasket: boolean;
	buyNowButtonEnabled?: boolean;
	isProductInBasket: boolean;
    disableMaxSubscriptionsInBasketMessage?: boolean;
}

const AddToBasketButton: React.FC<AddToBasketButtonStateProps> = (props: AddToBasketButtonStateProps) => {
	const { buyNowButtonEnabled } = props;
	const buttonId = `add-to-basket-${!isEmpty(props.product) ? props.product.id : "1"}`;
	const addMessage = buyNowButtonEnabled ? messages.buyNow : messages.addToBasket;
	const buttonMessage = (
		<span>
			{props.isProductInBasket ? (
				<span className="button-text">
					<i className="fa fa-check" />
					<FormattedMessage {...messages.inBasket} />
				</span>
			) : (
				<span>
					<FormattedMessage {...addMessage} />
				</span>
			)}
		</span>
	);

	return (
		<div className="container">
			{!props.allowedToAddToBasket && !props.disableMaxSubscriptionsInBasketMessage && (
				<div className="basket-full-container">
					<FormattedMessage {...messages.maximumSubscriptionNumbers} />{" "}
					<Link
						to={{
							pathname: "/basket",
							state: {scrollToTop: true}
						}}
						id="page-check-basket-link"
					>
						<FormattedMessage {...messages.checkBasket} />
					</Link>
				</div>
			)}
			<div className="submit-button-container">
				<OcButton
					htmlBtnType="submit"
					buttonType={OcButtonType.PRIMARY}
					id={buttonId}
					disabled={props.updatingBasket || !props.allowedToAddToBasket}
				>
					{buttonMessage}
				</OcButton>
			</div>
		</div>
	);
};
export default AddToBasketButton;

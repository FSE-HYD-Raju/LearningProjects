import {
	cssns,
	Basket,
	BasketActionGetBasketIncludeBasketItems,
	BasketActionRemoveFromBasket,
	BasketCheckoutSteps,
	contextTypesValidationMap,
	ContextType,
	MiniBasketContainer,
} from "omnichannel-common-pos";
import { debounce } from "lodash";
import { Component } from "react";
import { RouteComponentProps } from "react-router";

const CheckoutContainerRoutes = require("../routes/posCheckout/CheckoutContainerRoutes");
const CheckoutWizard = require("./CheckoutWizard");
const { React } = cssns("CheckoutContainer");

interface CheckoutContainerStateProps {
	activeBasket?: Basket;
	orderBasket?: Basket;
	viewportSize: string;
	checkoutSteps?: BasketCheckoutSteps;
	selectedCurrency: string;
}

interface CheckoutContainerActionProps {
	actions: {
		clearOrderBasket: () => void;
		getBasketIncludeBasketItems: BasketActionGetBasketIncludeBasketItems;
		removeFromBasket: BasketActionRemoveFromBasket
	};
}

type CheckoutContainerProps = CheckoutContainerStateProps & CheckoutContainerActionProps & RouteComponentProps<any>;

class CheckoutContainer extends Component<CheckoutContainerProps> {
	static displayName = "CheckoutContainer";
	static contextTypes = contextTypesValidationMap;

	constructor(props: CheckoutContainerProps, context: ContextType) {
		super(props, context);
	}

	componentWillReceiveProps(newProps: CheckoutContainerProps) {
		if (this.props.activeBasket && this.props.orderBasket) {
			this.props.actions.clearOrderBasket();
		}
		if (newProps.selectedCurrency !== this.props.selectedCurrency) {
			const basketId = this.props.activeBasket && this.props.activeBasket.id;
			if (basketId) {
				this.props.actions.getBasketIncludeBasketItems(basketId);
			}
		}
	}

	// TODO: should it be left like this?
	saveCheckoutConfigurationToBasket = () => {}; /*redirectUrl*/
	/*phase*/

	removeBasketItem = () => {
		debounce(basketItem => {
				const basketId = this.props.activeBasket && this.props.activeBasket.id;
				if (basketId) {
					this.props.actions.removeFromBasket(basketItem, basketId, false);
				}
			},
			400,
			{ leading: true, trailing: false }
		);
	};

	render() {
		const clientWidth = this.props.viewportSize;

		return (
			<div className="this">
				<div className="wizard-container">
					<div>
						<CheckoutWizard
							clientWidth={clientWidth}
							saveCheckoutConfigurationToBasket={this.saveCheckoutConfigurationToBasket}
							checkoutSteps={this.props.checkoutSteps}
						/>
					</div>
					<CheckoutContainerRoutes
						flux={this.context.flux}
						saveCheckoutConfigurationToBasket={this.saveCheckoutConfigurationToBasket}
					/>
				</div>
				<div className="mini-basket-container">
					<MiniBasketContainer flux={this.context.flux}/>
				</div>
			</div>
		);
	}
}

export default CheckoutContainer;
export {
	CheckoutContainerStateProps,
	CheckoutContainerActionProps,
	CheckoutContainerProps,
};

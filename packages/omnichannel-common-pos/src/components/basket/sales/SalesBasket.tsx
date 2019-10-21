import { Cancelable, debounce } from "lodash";
import { Component } from "react";
import MiniBasketContainer from "../minibasket/MiniBasketContainer";
import cssns from "../../../utils/cssnsConfig";
import {
	BasketActionGetBasketIncludeBasketItems,
	BasketActionRemoveFromBasket
} from "../../../redux/types/fluxActions";
import { ContextType, contextTypesValidationMap } from "../../../types";
import { BasketItem } from "../../../redux/types";

const { React } = cssns("SalesBasketTable");

interface SalesBasketStateProps {
	selectedCurrency: string;
	locale: string;
	activeBasketId?: string;
}

interface SalesBasketActionProps {
	actions: {
		getBasketIncludeBasketItems: BasketActionGetBasketIncludeBasketItems;
		removeFromBasket: BasketActionRemoveFromBasket;
	};
}

type SalesBasketProps = SalesBasketStateProps & SalesBasketActionProps;

class SalesBasket extends Component<SalesBasketProps> {
	static displayName = "SalesBasket";
	static contextTypes = contextTypesValidationMap;

	constructor(props: SalesBasketProps, context: ContextType) {
		super(props, context);
	}

	componentWillReceiveProps(props: SalesBasketProps) {
		if (this.currencyHasChanged(props) || this.languageHasChanged(props)) {
			if (this.props.activeBasketId) {
				this.props.actions.getBasketIncludeBasketItems(this.props.activeBasketId);
			}
		}
	}
	currencyHasChanged = (newProps: SalesBasketProps) => {
		return (
			newProps.selectedCurrency !== this.props.selectedCurrency
		);
	};

	languageHasChanged = (newProps: SalesBasketProps) => {
		return newProps.locale !== this.props.locale;
	};

	removeBasketItem = () => debounce(
		(basketItem: BasketItem) => {
			const basketId = this.props.activeBasketId;
			if (basketId) {
				this.props.actions.removeFromBasket(basketItem, basketId, false);
			}
		},
		400,
		{ leading: true, trailing: false }
	);

	render() {
		return (
			<MiniBasketContainer flux={this.context.flux} />
		);
	}
}

export default SalesBasket;
export {
	SalesBasketProps,
	SalesBasketStateProps,
	SalesBasketActionProps,
	Cancelable,
};

// @flow
import PropTypes from "prop-types";
import React from "react";
import CheckoutPayment from "./CheckoutPayment";
import CheckoutNoPayment from "./CheckoutNoPayment";
import { get } from "lodash";
import type {
	BasketStoreType,
	PaymentActionsType,
	PaymentStoreState,
	ContextType
} from "omnichannel-flow-pos";

import { Flux, contextTypesValidationMap } from "omnichannel-common-pos";

const { BasketActions } = Flux;

type Props = {
	BasketStore: BasketStoreType,
	PaymentStore: PaymentStoreState,
	BasketActions: BasketActions,
	PaymentActions: PaymentActionsType,
};

const POSCheckoutPayment = (props: Props, context: ContextType) => {
	const submittedBasket = get(props, "BasketStore.submittedBasket");
	const activeBasket = get(props, "BasketStore.activeBasket");
	const basket = submittedBasket ? submittedBasket : activeBasket;
	const upfrontPrices = get(basket, "attributes.upfrontPrices");

	return (
		<div>
			{!upfrontPrices ? (
				<CheckoutNoPayment
					BasketStore={props.BasketStore}
					BasketActions={props.BasketActions}
				/>
			) : (
				<CheckoutPayment
					BasketStore={props.BasketStore}
					BasketActions={props.BasketActions}
					PaymentActions={props.PaymentActions}
					PaymentStore={props.PaymentStore}
					selectedCurrency={context.flux.reduxStore.getState().currency.selectedCurrency}
					error={context.flux.reduxStore.getState().error.error}
				/>
			)}
		</div>
	);
};
POSCheckoutPayment.contextTypes = contextTypesValidationMap;

POSCheckoutPayment.propTypes = {
	PaymentStore: PropTypes.object,
	BasketStore: PropTypes.object,
	BasketActions: PropTypes.object,
	PaymentActions: PropTypes.object,
};

export default POSCheckoutPayment;

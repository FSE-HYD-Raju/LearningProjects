import * as R from "react";
import cssns from "../../utils/cssnsConfig";
import { PaymentByBalanceDetails } from "./PaymentByBalanceDetails";
import { ChargingBalances, ProductOffering } from "../../redux/types";
import PaymentMessages from "./Payment.messages";
import FormattedMessage from "../../channelUtils/FormattedMessage";
import PriceUtil from "../../utils/PriceUtil";
import ProductOfferingUtil from "../../utils/ProductOfferingUtil";
const React = cssns("PaymentDetails").React as typeof R;

interface PaymentDetailsProps {
	selectedPaymentMethod: string | undefined;
	feeProduct?: ProductOffering;
	mainBalance?: ChargingBalances;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = props => {
	switch (props.selectedPaymentMethod) {
		case "balance":
		case "residual-credit":
			return (
				<PaymentByBalanceDetails
					fees={[{ price: (props.feeProduct && ProductOfferingUtil.getUpfrontPrice(props.feeProduct)) || PriceUtil.getZeroPrice() }]}
					mainBalance={props.mainBalance}
					notEnoughBalanceText={<FormattedMessage {...PaymentMessages.notEnoughBalanceForChangeSim} />}
				/>
			);
		default:
			return null;
	}
};

export default PaymentDetails;
export { PaymentDetailsProps };

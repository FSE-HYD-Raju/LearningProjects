import * as React from "react";
import { Route } from "react-router-dom";
import { contextTypesValidationMap, ContextType } from "omnichannel-common-pos";
import {
	default as CashPaymentCompletedContainer,
	CashPaymentCompletedContainerOwnProps
} from "../../checkout/CashPaymentCompleted/CashPaymentCompletedContainer";

const CashSuccessRoute: React.FC = (props: {}, context: ContextType) => {
	const flux = context.flux;
	const cashPaymentProps: CashPaymentCompletedContainerOwnProps = {
		flux
	};
	return (
		<Route
			key="cash_success"
			path="/payment/cash_success"
			render={() => {
				return (
					<CashPaymentCompletedContainer {...cashPaymentProps} />
				);
			}}
		/>
	);
};

CashSuccessRoute.contextTypes = contextTypesValidationMap;

export default CashSuccessRoute;

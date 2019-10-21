import * as React from "react";
import { Route } from "react-router-dom";
import { ContextType, contextTypesValidationMap } from "omnichannel-common-pos";
import CheckoutReduxContainer from "../../checkout/CheckoutReduxContainer";

const PosCheckoutRoute: React.FC = (props: {}, context: ContextType) => {
	return (
		<Route
			key="checkout"
			path="/servicedesk/checkout"
			render={() => (
				<CheckoutReduxContainer flux={context.flux} />
			)}
		/>
	);
};
PosCheckoutRoute.contextTypes = contextTypesValidationMap;

export default PosCheckoutRoute;

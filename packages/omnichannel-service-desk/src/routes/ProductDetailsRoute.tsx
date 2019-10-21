import * as React from "react";
import { Route } from "react-router-dom";
import ProductTableDetailsContainer from "../components/ProductTable/ProductTableDetailsContainer";
import { contextTypesValidationMap, ProductOffering, ContextType } from "omnichannel-common-pos";

interface Props {
	product: ProductOffering
}

const ProductDetailsRoute = (props: Props, context: ContextType) => {
	const { product } = props;

	return (
		<Route
			path="/servicedesk/shop/:category/:sku/:tabId?"
			render={routeProps => (
				<ProductTableDetailsContainer {...routeProps} product={product} flux={context.flux}/>
			)}
		/>
	);
};

ProductDetailsRoute.contextTypes = contextTypesValidationMap;

export default ProductDetailsRoute;

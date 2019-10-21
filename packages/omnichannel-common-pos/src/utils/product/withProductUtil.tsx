import * as React from "react";
import ProductUtil from "./ProductUtil";

const withProductUtil = (Wrapped: React.ComponentClass<any>) => {
	return class ProductUtilComponent extends React.Component<any> { // eslint-disable-line
		static displayName = `withProductUtil.${Wrapped.displayName}`;
		render() {
			return <Wrapped {...this.props} productUtil={ProductUtil} />;
		}
	};
};

export default withProductUtil;

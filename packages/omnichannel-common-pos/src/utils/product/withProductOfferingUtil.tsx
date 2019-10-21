import * as React from "react";
import ProductOfferingUtil from "../ProductOfferingUtil";

const withProductOfferingUtil = (Wrapped: React.ComponentClass<any>) => {
	return class ProductOfferingUtilComponent extends React.Component<any> {
		static displayName = `withProductOfferingUtil.${Wrapped.displayName}`;
		render() {
			return (
				<Wrapped
					{...this.props}
					productOfferingUtil={ProductOfferingUtil}
				/>
			);
		}
	};
};

export default withProductOfferingUtil;

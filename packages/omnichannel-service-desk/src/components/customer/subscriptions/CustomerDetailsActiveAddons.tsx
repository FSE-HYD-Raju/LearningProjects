import * as React from "react";
import {
	Product,
	SpecSubTypeEnum,
	SpecTypeEnum,
	ContextType,
	contextTypesValidationMap,
	AddonsTabLifecycleFilter,
} from "omnichannel-common-pos";
import AddonsViewContentPosContainer from "./AddonsViewContentPosContainer";
import messages from "./CustomerDetailsAddons.messages";
import PosPlansContainer from "./PosPlansContainer";

interface CustomerDetailsActiveAddonsProps {
	selectedProduct: Product;
	agreementId: string;
	styles?: object;
	subscription: Product;
}

class CustomerDetailsActiveAddons extends React.Component<CustomerDetailsActiveAddonsProps> {
	static displayName = "CustomerDetailsActiveAddons";
	static contextTypes = contextTypesValidationMap;

	constructor(props: CustomerDetailsActiveAddonsProps, context: ContextType) {
		super(props, context);
	}

	render() {
		const { selectedProduct } = this.props;

		const activeAddons =
			selectedProduct &&
			selectedProduct.childProducts &&
			selectedProduct.childProducts.filter((cp: Product) => {
				return cp.specType === SpecTypeEnum.PRODUCT && cp.specSubType === SpecSubTypeEnum.ADDITIONAL;
			}) || [];

		return (
			<div style={{ width: "90%", ...this.props.styles}}>
				<AddonsViewContentPosContainer
					flux={this.context.flux}
					agreementId={this.props.agreementId}
					product={this.props.selectedProduct}
					addons={activeAddons}
					lifecycleFilter={AddonsTabLifecycleFilter.ACTIVE}
					showActions={true}
					activeHeader={messages.addonsActiveHeader}
					inactiveHeader={messages.addonsInactiveHeader}
				/>
				<PosPlansContainer
					flux={this.context.flux}
					subscription={this.props.subscription}
				/>
			</div>
		);
	}
}

export {
	CustomerDetailsActiveAddonsProps,
	CustomerDetailsActiveAddons
};

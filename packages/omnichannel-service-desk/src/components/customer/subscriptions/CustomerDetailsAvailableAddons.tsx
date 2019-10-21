import * as React from "react";
import {
	Product,
	contextTypesValidationMap,
	ContextType,
	ProductOffering,
	AddonsTabLifecycleFilter
} from "omnichannel-common-pos";
import AddonsViewContentPosContainer from "./AddonsViewContentPosContainer";
import messages from "./CustomerDetailsAddons.messages";

interface CustomerDetailsAvailableAddonsProps {
	selectedProduct: Product;
	agreementId: string;
	availableAddons: Array<ProductOffering>;
	styles?: object;
}

class CustomerDetailsAvailableAddons extends React.Component<CustomerDetailsAvailableAddonsProps> {
	static displayName = "CustomerDetailsActiveAddons";
	static contextTypes = contextTypesValidationMap;

	constructor(props: CustomerDetailsAvailableAddonsProps, context: ContextType) {
		super(props, context);
	}

	render() {
		const { availableAddons } = this.props;
		return (
			<div style={this.props.styles}>
				<AddonsViewContentPosContainer
					flux={this.context.flux}
					agreementId={this.props.agreementId}
					product={this.props.selectedProduct}
					addons={availableAddons}
					lifecycleFilter={AddonsTabLifecycleFilter.AVAILABLE}
					showActions={true}
					activeHeader={messages.availableAddonsActiveHeader}
					inactiveHeader={messages.availableAddonsInactiveHeader}
				/>
			</div>
		);
	}
}

export {
	CustomerDetailsAvailableAddons,
	CustomerDetailsAvailableAddonsProps
};

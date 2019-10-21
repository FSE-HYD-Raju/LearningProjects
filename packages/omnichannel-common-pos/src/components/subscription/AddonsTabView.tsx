import * as React from "react";
import ProductServicesByActivityContainer from "./services/ProductServicesByActivityContainer";
import ProductLoansListContainer from "../productLoans/list/ProductLoansListContainer";
import AddonsViewContentContainer from "./addon/AddonsViewContentContainer";
import { Product } from "../../redux/types";
import { ContextType, contextTypesValidationMap } from "../../types";
import { CommonCustomizationPoints, withCustomization } from "../../customization";

interface AddonsTabViewOwnProps {
	isServicePlanViewEligible: boolean;
	selectedProduct: Product;
	agreementId: string;
	lifecycleFilter: string;
}

type AddonsTabViewProps = AddonsTabViewOwnProps;

class AddonsTabView extends React.PureComponent<AddonsTabViewProps> {

	static displayName: string = "AddonsTabView";
	static contextTypes: React.ValidationMap<ContextType> = contextTypesValidationMap;

	constructor(props: AddonsTabViewProps, context: ContextType) {
		super(props, context);
	}

	render() {
		return (
			<div className="AddonsTabView" data-customizable>
				<AddonsViewContentContainer
					flux={this.context.flux}
					product={this.props.selectedProduct}
					agreementId={this.props.agreementId}
					lifecycleFilter={this.props.lifecycleFilter}
					showActions={this.props.isServicePlanViewEligible}
				/>
				<ProductLoansListContainer
					agreementId={this.props.agreementId}
					selectedSubscriptionProduct={this.props.selectedProduct}
					lifecycleFilter={this.props.lifecycleFilter}
				/>
				<ProductServicesByActivityContainer
					flux={this.context.flux}
					agreementId={this.props.agreementId}
					product={this.props.selectedProduct}
					lifecycleFilter={this.props.lifecycleFilter}
				/>
			</div>
		);
	}
}

const AddonsTabViewWithCustomization = withCustomization<AddonsTabViewOwnProps>(CommonCustomizationPoints.ADDONS_TAB_CONTENT, AddonsTabView);
export {
	AddonsTabViewWithCustomization as AddonsTabView,
	AddonsTabView as AddonsTabViewBaseline,
	AddonsTabViewOwnProps,
	AddonsTabViewProps
};

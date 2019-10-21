import cssns from "../../../../utils/cssnsConfig";
import { PureComponent, ComponentType } from "react";
import { Product } from "../../../../redux/types";
import { FormattedMessage } from "../../../../channelUtils";
import messages from "../Plans.messages";

const { React } = cssns("Plans");

interface RowRendererProps {
	plan: Product;
	showChangePlanAction: boolean;
	showConfigurePlanAction: boolean;
	subscription: Product;
	actions: {
		onChangePlan: (plan: Product) => void;
		onConfigurePlan: (plan: Product) => void;
	};
}

interface PlansListViewProps {
	plans: Array<Product>;
	showChangePlanAction: (plan: Product) => boolean;
	showConfigurePlanAction: (plan: Product) => boolean;
	subscription: Product;
	rowRenderer: ComponentType<RowRendererProps>;
	actions: {
		onChangePlan: (plan: Product) => void;
		onConfigurePlan: (plan: Product) => void;
	};
}

class PlansListView extends PureComponent<PlansListViewProps> {

	render() {
		const PlanRow: ComponentType<RowRendererProps> = this.props.rowRenderer;

		return (
			<div className="list-items" data-customizable>
				{(!this.props.plans || this.props.plans.length === 0) && <FormattedMessage {...messages.noPlans}/>}
				{this.props.plans.length > 0 && this.props.plans.map((plan: Product) => {
					return (
						<PlanRow
							key={plan.id}
							plan={plan}
							showChangePlanAction={this.props.showChangePlanAction(plan)}
							showConfigurePlanAction={this.props.showConfigurePlanAction(plan)}
							subscription={this.props.subscription}
							actions={{
								onChangePlan: this.props.actions.onChangePlan,
								onConfigurePlan: this.props.actions.onConfigurePlan
							}}
						/>
					);
				})}
			</div>
		);
	}
}

export {
	PlansListView,
	PlansListViewProps,
	RowRendererProps
};

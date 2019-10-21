import * as R from "react";
import { ChangePlanSummaryModalContainer } from "./changePlan/summary/ChangePlanSummaryModalContainer";
import cssns from "../../../utils/cssnsConfig";
import { PlansListView, RowRendererProps } from "./list/PlansListView";
import { Product } from "../../../redux/types/Product";
import PlanRow from "./list/PlanRow";
const React = cssns("SubscriptionPlans").React as typeof R;

interface SubscriptionPlansOwnProps {
	subscription: Product;
	rowRenderer?: R.ComponentType<RowRendererProps>;
	changePlanRedirectUrl: string;
}
interface SubscriptionPlansStateProps {
	plans: Product[];
	showChangePlanAction: (plan: Product) => boolean;
	showConfigurePlanAction: (plan: Product) => boolean;
}
interface SubscriptionPlansActionProps {
	actions: {
		onChangePlan: (agreementId: string, plan: Product, changePlanRedirectUrl: string) => void;
		onConfigurePlan: (plan: Product) => void;
		getAvailablePlansToChangePlan: (agreementId: string) => void;
	};
}
interface SubscriptionPlansProps extends SubscriptionPlansOwnProps, SubscriptionPlansStateProps, SubscriptionPlansActionProps {}
class SubscriptionPlans extends React.Component<SubscriptionPlansProps> {
	componentDidMount() {
		this.props.actions.getAvailablePlansToChangePlan(this.props.subscription.agreementId);
	}
	render() {
		const {
			plans,
			rowRenderer,
			subscription,
			showChangePlanAction,
			showConfigurePlanAction,
			actions,
			changePlanRedirectUrl,
		} = this.props;
		return (
			<div className="main-container">
				<PlansListView
					plans={plans}
					rowRenderer={rowRenderer || PlanRow}
					showChangePlanAction={showChangePlanAction}
					showConfigurePlanAction={showConfigurePlanAction}
					subscription={subscription}
					actions={{
						onChangePlan: (plan: Product) => actions.onChangePlan(subscription.agreementId, plan, changePlanRedirectUrl),
						onConfigurePlan: actions.onConfigurePlan,
					}}
				/>
			</div>
		);
	}
}

export { SubscriptionPlans, SubscriptionPlansOwnProps, SubscriptionPlansStateProps, SubscriptionPlansActionProps, SubscriptionPlansProps };

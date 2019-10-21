import cssns from "../../../../utils/cssnsConfig";
import { PureComponent } from "react";
import { FormattedMessage } from "../../../../channelUtils";
import messages from "../Plans.messages";
import { CommonCustomizationPoints, withCustomization } from "../../../../customization";
import { RowRendererProps } from "./PlansListView";
import PlanUtils from "../Plan.utils";
import { OverlayTrigger } from "react-bootstrap";
import { ProductDescriptionPopover } from "./ProductDescriptionPopover";
import PlanListViewHeaders from "./PlanListViewHeaders";
import { OcButton, OcButtonSize, OcButtonType } from "../../../ocComponents/button/OcButton";

const { React } = cssns("Plans");

interface PlanRowProp extends RowRendererProps {}

class PlanRow extends PureComponent<PlanRowProp> {

	handleChangeClick = () => {
		if (this.props.actions && this.props.actions.onChangePlan) {
			this.props.actions.onChangePlan(this.props.plan);
		}
	}

	handleConfigureClick = () => {
		if (this.props.actions && this.props.actions.onConfigurePlan) {
			this.props.actions.onConfigurePlan(this.props.plan);
		}
	}

	render() {
		const { plan, showChangePlanAction, showConfigurePlanAction } = this.props;
		const name = plan.name || "-";
		const recurringFee = PlanUtils.calculatePlanFee(plan);

		return (
			<div className="plan-container" id={`plan-${plan.id}-container`}>
				<PlanListViewHeaders/>
				<OverlayTrigger
					overlay={<ProductDescriptionPopover plan={plan}/>}
					trigger={["focus", "hover"]}
					placement="bottom"
					container={this}
				>
					<div className="list-item-column name">{name}</div>
				</OverlayTrigger>
				<div className="list-item-column fee">
					<FormattedMessage
						{...messages.plansListingRecurringFee}
						values={{
							rate: recurringFee.rate as string,
							period: recurringFee.period
						}}
					/>
				</div>
				<div className="list-item-column actions">
					{showChangePlanAction  && (
						<OcButton
							id={`buttonChangePlan-${plan.id}`}
							buttonSize={OcButtonSize.SMALL}
							buttonType={OcButtonType.PRIMARY}
							onClick={this.handleChangeClick}
						>
							<FormattedMessage {...messages.changePlan} />
						</OcButton>
					)}
					{showConfigurePlanAction && (
						<OcButton
							id={`buttonConfigurePlan-${plan.id}`}
							buttonSize={OcButtonSize.SMALL}
							buttonType={OcButtonType.PRIMARY}
							onClick={this.handleConfigureClick}
						>
							<FormattedMessage {...messages.configurePlan} />
						</OcButton>
					)}
				</div>
			</div>
		);
	}
}

export default withCustomization<PlanRowProp>(CommonCustomizationPoints.PLAN_LIST_ROW, PlanRow);

export {
	PlanRowProp,
	PlanRow as PlanRowBaseline
};

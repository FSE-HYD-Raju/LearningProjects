import * as R from "react";
import ProductOfferingUtil from "../../../utils/ProductOfferingUtil";
import { FC } from "react";
import cssns from "../../../utils/cssnsConfig";
import messages from "./Plans.messages";
import { ContextType, contextTypesValidationMap } from "../../../types";
import PriceItem from "./PriceItem";
import { PriceTypeEnum, ProductOffering } from "../../../redux/types";
import { OcButton, OcButtonType } from "../../ocComponents/button/OcButton";

const React = cssns("PlanListItem").React as typeof R;

interface PlanListItemProps {
	active: boolean;
	plan: ProductOffering;
	newPlan?: boolean;
}

const PlanListItem: FC<PlanListItemProps> = (props: PlanListItemProps, context: ContextType) => {
	const { active, plan, newPlan } = props;
	const { formatMessage } = context.intl;

	return (
		<div className="main-container" data-test-name="PlanListItem">
			<div className="activeness-indicator" >
				{active && <i className="fa fa-chevron-up" />}
				{!active && <i className="fa fa-chevron-down" />}
			</div>
			<div className="centered-item">
				<span className="item-name">{plan.attributes && plan.attributes.name}</span>
			</div>
			<div className="centered-item">
				<PriceItem
					type="activation"
					price={ProductOfferingUtil.getPrice(plan, PriceTypeEnum.ONE_TIME)}
				/>
			</div>
			<div className="centered-item">
				<PriceItem
					type="monthly"
					price={ProductOfferingUtil.getPrice(plan, PriceTypeEnum.RECURRENT)}
				/>
			</div>
			<div className="last-item">
				<OcButton
					id={`change-plan-buttonSelectAlternatePlan-${plan.id}`}
					className="item-select"
					buttonType={OcButtonType.PRIMARY}
				>
					{!newPlan ? (formatMessage({...messages.select})) : (formatMessage({...messages.buyNow}))}
				</OcButton>
			</div>
		</div>
	);
};

PlanListItem.contextTypes = contextTypesValidationMap;

export default PlanListItem;
export {
	PlanListItemProps
};

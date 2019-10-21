import * as R from "react";
import cssns from "../../../utils/cssnsConfig";
import FormattedMessage from "../../../channelUtils/FormattedMessage";
import messages from "./Plans.messages";
import { FC } from "react";
import { ProductOffering } from "../../../redux/types";
import PlanUtils from "./Plan.utils";
import { OcButton, OcButtonType } from "../../ocComponents/button/OcButton";

const React = cssns("PlanDetails").React as typeof R;

interface PlanDetailsProps {
	selectToComparison: (plan: ProductOffering) => void;
	plan: ProductOffering;
}

const PlanDetails: FC<PlanDetailsProps> = (props: PlanDetailsProps) => {
	const { selectToComparison, plan } = props;

	const productTypeText = (
		<span className="product-type">
				<FormattedMessage {...PlanUtils.getMessage(plan)} />
			</span>
	);

	const offeringName = (
		<span className="plan-details-name">{plan.attributes && plan.attributes.name}</span>
	);

	const offeringTypeText = plan.type === "UPGRADE" ? (
			<FormattedMessage {...messages.offeringTypeUpgrade} />
		) : plan.type === "DOWNGRADE" ? (
			<FormattedMessage {...messages.offeringTypeDowngrade} />
		) : ("");

	return (
		<div className="plan-details">
			<FormattedMessage
				{...messages.offeringActionToOfferingName}
				values={{
					offeringName,
					offeringAction: offeringTypeText
				}}
			/>
			{selectToComparison && (
				<OcButton
					id={`buttonSelectToComparison-${plan.id}`}
					buttonType={OcButtonType.LINK}
					onClick={() => { selectToComparison(plan); }}
				>
					<FormattedMessage
						{...messages.compareToCurrent}
						values={{ productType: productTypeText }}
					/>
				</OcButton>
			)}
		</div>
	);
};

export default PlanDetails;
export {
	PlanDetailsProps
};

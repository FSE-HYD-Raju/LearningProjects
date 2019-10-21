import * as R from "react";
import cssns from "../../../../../utils/cssnsConfig";
import FormattedMessage from "../../../../../channelUtils/FormattedMessage";
import messages from "./ChangePlanSummary.messages";
import { UnitOfMeasureEnum } from "../../../../../redux/types/UnitOfMeasure";
import UnitOfMeasure from "../../../../unitOfMeasure/UnitOfMeasure";

const React = cssns("AllowanceInfoRow").React as typeof R;

interface AllowanceInfoRowProps {
	name: string;
	isUnlimited: boolean;
	value: number;
	unitOfMeasure: UnitOfMeasureEnum;
}
const AllowanceInfoRow = (props: AllowanceInfoRowProps) => (
	<div className="container">
		<div className="label">{props.name}</div>
		<div className="value">
			{props.isUnlimited ? (
				<div className="size" data-test-name="value">
					<FormattedMessage {...messages.unlimitedService} />
				</div>
			) : (
				<div className="size" data-test-name="value">
					<span className="size-value">{props.value}</span>
					<UnitOfMeasure unit={props.unitOfMeasure} />
				</div>
			)}
		</div>
	</div>
);
export { AllowanceInfoRow, AllowanceInfoRowProps };

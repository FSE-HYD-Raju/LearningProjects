import cssns from "../../../utils/cssnsConfig";
import { FC, RefObject } from "react";
import { FormattedMessageDescriptor } from "../../../channelUtils";
import { FormFieldType } from "../../FormFieldType";
import { CommonCustomizationPoints, withCustomization } from "../../../customization";
import FormattedMessage from "../../../channelUtils/FormattedMessage";
import PriceHolder from "../../prices/PriceHolder";
import OcInput from "../../ocComponents/OcInput";
import withFormal from "../../ocComponents/withFormal";

const Form = require("react-formal");
const FormalOcInput = withFormal(OcInput);

const { React } = cssns("RecurringTopUpModelConfigurationForm");

interface RecurringTopUpAmountProps {
	className?: string;
	id: string;
	name: string;
	message: FormattedMessageDescriptor;
	fieldRef?: RefObject<FormFieldType>;
	events?: Array<string>;
	values?: Array<number>;
	topUpAmountPresetsPerRow: number;
	onClick: (price: number) => void;
	currency?: string;
}

const RecurringTopUpAmount: FC<RecurringTopUpAmountProps> = props => {
	return (
		<div className={props.className || ""}>
			<Form.Field
				type={FormalOcInput}
				id={props.id}
				name={props.name}
				label={<FormattedMessage {...props.message} />}
				ref={props.fieldRef}
				events={props.events}
			/>
			{props.values && (
				<PriceHolder
					twoRowsView={props.values.length > props.topUpAmountPresetsPerRow}
					prices={props.values}
					onClick={props.onClick}
					currency={props.currency}
				/>
			)}
		</div>
	);
};

const RecurringTopUpAmountCustom = withCustomization(CommonCustomizationPoints.RECURRING_TOPUP_AMOUNT, RecurringTopUpAmount);

export {
	RecurringTopUpAmountProps,
	RecurringTopUpAmountCustom as RecurringTopUpAmount,
	RecurringTopUpAmount as RecurringTopUpAmountBaseline,
};

import * as React from "react";
import FormattedMessage from "../../channelUtils/FormattedMessage";
import changeSimModalMessages from "./ChangeSim.messages";
import ProductOfferingUtil from "../../utils/ProductOfferingUtil";
import { PriceTypeEnum, ProductOffering } from "../../redux/types";
import { ContextType, contextTypesValidationMap } from "../../types";
import OcSelect from "../ocComponents/OcSelect";
import CurrencyUtil from "../../utils/CurrencyUtil";

interface ChangeSimReasonSelectionStateProps {
	reasons: ProductOffering[];
	selectedReason: ProductOffering | undefined;
}

interface ChangeSimReasonSelectionActionProps {
	actions: {
		onSelectReason: (selectedReason: ProductOffering) => void;
	};
}

type ChangeSimReasonSelectionProps = ChangeSimReasonSelectionStateProps & ChangeSimReasonSelectionActionProps;

class ChangeSimReasonSelection extends React.Component<ChangeSimReasonSelectionProps> {
	static contextTypes = contextTypesValidationMap;

	constructor(props: ChangeSimReasonSelectionProps, context: ContextType) {
		super(props, context);
	}

	onSelectReason = (e: any) => {
		const selectedReason = this.props.reasons.find(reason => reason.id === e.target.value);
		if (!selectedReason) {
			return;
		}
		this.props.actions.onSelectReason(selectedReason);
	};

	render() {
		const { selectedReason, reasons } = this.props;
		return (
			<div className="ChangeSim-row ChangeSim-reason-selection">
				<div className="ChangeSim-label">
					<FormattedMessage {...changeSimModalMessages.reasonLabel} />
					<i className="fa fa-asterisk ChangeSim-required-field-icon" />
				</div>
				<div className="ChangeSim-data">
					<OcSelect
						id="change-sim-reason-select"
						name="change-sim-reason-select"
						defaultValue={selectedReason && selectedReason.id}
						onChange={this.onSelectReason}
						placeholder={this.context.intl.formatMessage({...changeSimModalMessages.selectReasonPlaceholder})}
						noLabel={true}
					>
						{reasons.map(reason => {
							const result = ProductOfferingUtil.getSimplePrice(reason, PriceTypeEnum.ONE_TIME).taxFreeAmount;
							const currency = ProductOfferingUtil.getSimplePrice(reason, PriceTypeEnum.ONE_TIME).currency;
							return (
								<option
									id={`change-sim-reason-option-${reason.id}`}
									value={reason.id}
									key={`change-sim-reason-option-${reason.id}`}
								>
									{ProductOfferingUtil.getPOName(reason)}
									{result !== undefined && currency && !isNaN(result) && (
										"  (" + CurrencyUtil.getFormattedString(this.context, result, currency) + ")"
									)}

								</option>
							);
						})}
					</OcSelect>
				</div>
			</div>
		);
	}
}

export default ChangeSimReasonSelection;
export {
	ChangeSimReasonSelectionProps,
	ChangeSimReasonSelectionStateProps,
	ChangeSimReasonSelectionActionProps,
};

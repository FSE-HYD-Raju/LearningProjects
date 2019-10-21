import cssns from "../../utils/cssnsConfig";
import { get } from "lodash";
import { ContextType, contextTypesValidationMap } from "../../types";
import classnames from "classnames";
import OcInput from "../ocComponents/OcInput";
import FormattedMessage from "../../channelUtils/FormattedMessage";
import { FC } from "react";
import messages from "../../commonMessages";
import CheckoutRecurringTopUpConfigurationContainer from "./recurringTopUp/CheckoutRecurringTopUpConfigurationContainer";

const { React } = cssns("CreditCardStorageSelection");

interface CreditCardStorageSelectionProps {
	parentClass?: string;
}

const CreditCardStorageSelection: FC<CreditCardStorageSelectionProps> = (props: CreditCardStorageSelectionProps, context: ContextType) => {
	const classes = classnames({
		container: true,
		[props.parentClass || ""]: props.parentClass
	});

	return (
		<div className={classes}>
			<div className="credit-card-storage-description">
				<FormattedMessage {...messages.creditCardStorageSelectionDescription} />
			</div>
			<div className="payment-recurring-top-up-container">
				<CheckoutRecurringTopUpConfigurationContainer />
			</div>
		</div>
	);
};

CreditCardStorageSelection.contextTypes = contextTypesValidationMap;

export default CreditCardStorageSelection;
export {
	CreditCardStorageSelectionProps
};

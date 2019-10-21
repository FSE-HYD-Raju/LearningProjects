import * as React from "react";
import FormattedMessage from "../../channelUtils/FormattedMessage";
import PaymentMessages from "./Payment.messages";
import { OcAlert, OcAlertType } from "../../components/ocComponents/alert/OcAlert";

interface BalanceErrorProps {
	error: string;
}

const BalanceError: React.FC<BalanceErrorProps> = (props: BalanceErrorProps) => {
	return props.error === "balance-limit-surpassed" ? (
		<OcAlert alertType={OcAlertType.DANGER}>
			<FormattedMessage {...PaymentMessages.balanceIsTooLow} />
		</OcAlert>
	) : (
		<span />
	);
};

export default BalanceError;
export {
	BalanceErrorProps,
};

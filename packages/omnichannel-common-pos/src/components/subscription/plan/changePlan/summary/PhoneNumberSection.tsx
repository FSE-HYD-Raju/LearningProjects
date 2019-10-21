import * as R from "react";
import cssns from "../../../../../utils/cssnsConfig";
import messages from "./ChangePlanSummary.messages";
import FormattedMessage from "../../../../../channelUtils/FormattedMessage";

const React = cssns("ChangePlanSummary").React as typeof R;

interface PhoneNumberSectionProps {
	phoneNumber: string;
}
const PhoneNumberSection = (props: PhoneNumberSectionProps) => (
	<div className="section phone-number-section">
		<div className="label">
			<FormattedMessage {...messages.phoneNumberLabel} />
		</div>
		<div className="value">{props.phoneNumber}</div>
	</div>
);

export { PhoneNumberSection, PhoneNumberSectionProps };

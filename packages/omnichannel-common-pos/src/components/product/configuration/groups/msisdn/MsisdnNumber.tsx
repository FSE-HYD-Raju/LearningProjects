import cssns from "../../../../../utils/cssnsConfig";
import { MsisdnConfiguration } from "../../../../../redux";
import { FC } from "react";
import messages from "../ProductOfferingConfigurationMsisdnSelection.messages";
import FormattedMessage from "../../../../../channelUtils/FormattedMessage";

const { React } = cssns("MsisdnNumber");

interface MsisdnNumberProps {
	mandatoryConfiguration: MsisdnConfiguration | undefined;
}

const isNoneOfMsisdnNumbersSelected = (mandatoryConfiguration?: MsisdnConfiguration): boolean => {
	return Boolean(mandatoryConfiguration && !mandatoryConfiguration.msisdn);
};

const MsisdnNumber: FC<MsisdnNumberProps> = props => {
	const { mandatoryConfiguration } = props;
	const msisdnNumbers = [mandatoryConfiguration && mandatoryConfiguration.msisdn];

	return (
		<span className="this">
			{msisdnNumbers}
			{isNoneOfMsisdnNumbersSelected(mandatoryConfiguration) && (
				<FormattedMessage {...messages.noNumberSelected} />
			)}
		</span>
	);
};

export default MsisdnNumber;
export {
	MsisdnNumberProps,
};

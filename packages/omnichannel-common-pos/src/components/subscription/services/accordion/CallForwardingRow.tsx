import cssns from "../../../../utils/cssnsConfig";
import { Service } from "../../../../redux/types";
import { FC } from "react";
import ProductServicesUtils from "../ProductServices.utils";
import FormattedMessage from "../../../../channelUtils/FormattedMessage";
import serviceMessages from "../Services.messages";
import { CommonCustomizationPoints, withCustomization } from "../../../../customization";
import messages from "../../../../commonMessages";
import { OcButton, OcButtonSize, OcButtonType } from "../../../ocComponents";

const { React } = cssns("AddonsTabView");

interface CallForwardingRowProps {
	callForwardingServices: Array<Service>;
	onClick: () => void;
	serviceStateTransitionByActionName: Record<string, Array<string> | string>;
}

const CallForwardingRow: FC<CallForwardingRowProps> = (props: CallForwardingRowProps) => {
	const { callForwardingServices } = props;

	const lifecycleStatus = ProductServicesUtils.getCallForwardingStaus(callForwardingServices);

	return (
		<div className="list-item" id="addon-item-call-forwarding" data-customizable>
			<div className="list-item-column name">
				<FormattedMessage {...messages.servicesNameLabel} />
				<span className="call-forwarding-description">
					<FormattedMessage {...serviceMessages.configureCallForwarding}/>
				</span>
			</div>
			<div className="list-item-column fees">
				<span className="customer-subscription-services-free-addon">
					<FormattedMessage {...serviceMessages.freePrice}/>
				</span>
			</div>
			<div className="list-item-column expiration"/>
			<div className={`list-item-column status status-${lifecycleStatus}`}>
				<FormattedMessage{...serviceMessages.lifecycleStatusRow} values={{ lifecycleStatus }}/>
			</div>
			<div className="list-item-column actions">
				<OcButton
					buttonType={OcButtonType.PRIMARY}
					buttonSize={OcButtonSize.SMALL}
					id={"buttonConfigureCallforwaring"}
					key={"button-configure-call-forwaring-key"}
					onClick={props.onClick}
				>
					<FormattedMessage {...messages.configureButtonLabel} />
				</OcButton>
			</div>
		</div>
	);
};

const CallForwardingRowCustomization = withCustomization<CallForwardingRowProps>(
	CommonCustomizationPoints.CALL_FORWARDING_ROW, CallForwardingRow);

export {
	CallForwardingRowCustomization as CallForwardingRow,
	CallForwardingRow as CallForwardingRowBaseline,
	CallForwardingRowProps
};

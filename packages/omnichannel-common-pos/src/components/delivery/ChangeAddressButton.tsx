import * as R from "react";
import cssns from "../../utils/cssnsConfig";
import FormattedMessage from "../../channelUtils/FormattedMessage";
import classnames from "classnames";
import messages from "./deliverySelection.messages";
import { OcButton, OcButtonType } from "../ocComponents";
const React = cssns("ChangeAddressButton").React as typeof R;

export interface ChangeAddressButtonProps {
	onClick: () => void;
	show: boolean;
}

const getBtnClasses = (show: boolean) => {
	return classnames({
		"ChangeSim-change-address-btn": true,
		"ChangeSim-hidden": show
	});
};

const ChangeAddressButton: React.FC<ChangeAddressButtonProps> = props => (
	<OcButton
		buttonType={OcButtonType.LINK}
		className={getBtnClasses(props.show)}
		onClick={() => props.onClick()}
	>
		<FormattedMessage {...messages.changeAddressButtonLabel} />
	</OcButton>
);

export default ChangeAddressButton;

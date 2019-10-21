"use strict";

import * as React from "react";
import { FormattedMessage, OcButton, OcButtonSize, OcButtonType } from "omnichannel-common-pos";
import messages from "../../../index.messages";

export interface ChangePlanButtonStoreProps {
	handleClick: () => void;
}

const ChangePlanButton: React.FC<ChangePlanButtonStoreProps> = props => {
	return (
		<div>
			<OcButton id={"button-change-subscription"} buttonSize={OcButtonSize.SMALL} buttonType={OcButtonType.PRIMARY} onClick={props.handleClick}>
				<FormattedMessage {...messages.changePlan}/>
			</OcButton>
		</div>
	);
};

export default ChangePlanButton;

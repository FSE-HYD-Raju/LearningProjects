import * as React from "react";
import { FormattedMessage, FormattedMessageDescriptor } from "../../channelUtils";

export interface OcDropDownItemProps {
	icon?: string;
	message: FormattedMessageDescriptor;
	action: () => void;
}

const OcDropDownItem: React.FC<OcDropDownItemProps> = props => {
	const { message, icon, action } = props;
	return (
		<p>
			<a onClick={action} href="javascript:;">
				{icon && <i className={icon} />}
				<FormattedMessage {...message} />
			</a>
		</p>
	);
};

export default OcDropDownItem;
